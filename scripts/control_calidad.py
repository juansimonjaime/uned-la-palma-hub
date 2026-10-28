#!/usr/bin/env python3
"""Control de calidad SEO y de estilo de las páginas (paginas/**/*.md).

Comprueba por página: frontmatter completo, longitud de título (<=60) y meta
(<=155), formato del slug, número de palabras según nivel, keyword en título /
H1 / primer párrafo / algún H2 / meta, un único H1, FAQ con 4-6 preguntas,
llamada a la acción con enlace a agrodroncanarias.es, [IMAGEN] con alt,
bloque JSON-LD válido con Service + FAQPage + areaServed, enlaces internos,
frases prohibidas, exclamaciones, aviso de desplazamiento fuera de La Palma y
párrafos demasiado largos.

Uso: python3 scripts/control_calidad.py [--md salida.md] [--solo ruta]
"""
import argparse
import glob
import json
import os
import re
import sys

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
RANGOS = {"A": (900, 1300), "B": (700, 1000), "hub": (700, 1000), "cultivo": (800, 1200)}
PROHIBIDAS = [
    "en el mundo actual", "la agricultura moderna", "sin duda", "en definitiva",
    "revolucionari", "descubre", "potencia al máximo", "potencia al maximo",
    "hoy en día", "hoy en dia", "en la actualidad", "cabe destacar", "es importante destacar",
    "no es ningún secreto", "en resumen", "en conclusión", "en conclusion",
    "la solución perfecta", "la solucion perfecta", "de última generación", "de ultima generacion",
    "lleva tu finca al siguiente nivel", "el futuro de la agricultura", "innovador", "vanguardia",
    "sumérgete", "sumergete", "¡", "!",
]


def norm(s: str) -> str:
    s = s.lower()
    for a, b in (("á", "a"), ("é", "e"), ("í", "i"), ("ó", "o"), ("ú", "u"), ("ü", "u")):
        s = s.replace(a, b)
    return s


def parse_frontmatter(texto):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", texto, flags=re.S)
    if not m:
        return None, texto
    fm = {}
    for linea in m.group(1).splitlines():
        if ":" in linea:
            k, v = linea.split(":", 1)
            fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm, texto[m.end():]


def cuerpo_sin_codigo(cuerpo):
    return re.sub(r"```.*?```", " ", cuerpo, flags=re.S)


def contar_palabras(cuerpo):
    t = cuerpo_sin_codigo(cuerpo)
    t = re.sub(r"\[IMAGEN:[^\]]*\]", " ", t)
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    t = re.sub(r"[#*_>`|-]", " ", t)
    return len([p for p in t.split() if re.search(r"[a-záéíóúñ0-9]", p, flags=re.I)])


def revisar(ruta):
    rel = os.path.relpath(ruta, RAIZ)
    with open(ruta, encoding="utf-8") as f:
        texto = f.read()
    errores, avisos = [], []
    fm, cuerpo = parse_frontmatter(texto)
    if fm is None:
        return rel, ["sin frontmatter"], [], {}
    for campo in ("title", "slug", "meta_description", "keyword", "parent", "nivel"):
        if campo not in fm or not fm[campo]:
            errores.append(f"frontmatter sin {campo}")
    title = fm.get("title", "")
    meta = fm.get("meta_description", "")
    kw = fm.get("keyword", "")
    slug = fm.get("slug", "")
    nivel = fm.get("nivel", "")
    if len(title) > 60:
        errores.append(f"título {len(title)} caracteres (>60)")
    if len(meta) > 155:
        errores.append(f"meta {len(meta)} caracteres (>155)")
    if meta and len(meta) < 100:
        avisos.append(f"meta corta ({len(meta)})")
    if slug and not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
        errores.append(f"slug no válido: {slug}")
    palabras = contar_palabras(cuerpo)
    rango = RANGOS.get(nivel)
    if rango and not (rango[0] <= palabras <= rango[1]):
        errores.append(f"{palabras} palabras, fuera de {rango[0]}-{rango[1]} (nivel {nivel})")
    elif not rango:
        avisos.append(f"nivel desconocido '{nivel}' ({palabras} palabras)")

    sin_codigo = cuerpo_sin_codigo(cuerpo)
    h1 = re.findall(r"^# (.+)$", sin_codigo, flags=re.M)
    h2 = re.findall(r"^## (.+)$", sin_codigo, flags=re.M)
    h3 = re.findall(r"^### (.+)$", sin_codigo, flags=re.M)
    if len(h1) != 1:
        errores.append(f"{len(h1)} H1 (debe ser 1)")
    if len(h2) < 4:
        avisos.append(f"solo {len(h2)} H2")
    # primer párrafo: primer bloque de texto tras el H1 que no sea cabecera/imagen
    tras_h1 = sin_codigo.split("\n# ", 1)[-1].split("\n", 1)[-1] if h1 else sin_codigo
    primer = ""
    for bloque in re.split(r"\n\s*\n", tras_h1):
        b = bloque.strip()
        if b and not b.startswith("#") and not b.startswith("[IMAGEN") and not b.startswith("```"):
            primer = b
            break
    nk = norm(kw)
    if kw:
        if nk not in norm(title):
            errores.append("keyword no está en el título")
        if h1 and nk not in norm(h1[0]):
            errores.append("keyword no está en el H1")
        if nk not in norm(primer):
            errores.append("keyword no está en el primer párrafo")
        if not any(nk in norm(x) for x in h2):
            errores.append("keyword no está en ningún H2")
        if nk not in norm(meta):
            errores.append("keyword no está en la meta descripción")
    # FAQ
    faq_idx = None
    for i, x in enumerate(h2):
        if "pregunta" in norm(x) or "faq" in norm(x) or "dudas" in norm(x):
            faq_idx = i
    preguntas = [q for q in h3 if q.strip().endswith("?")]
    if faq_idx is None:
        errores.append("sin sección de preguntas frecuentes (H2)")
    if not (4 <= len(preguntas) <= 6):
        errores.append(f"{len(preguntas)} preguntas FAQ en H3 (deben ser 4-6)")
    # CTA
    if "agrodroncanarias.es" not in sin_codigo:
        errores.append("sin enlace a agrodroncanarias.es (CTA)")
    if not re.search(r"presupuesto", sin_codigo, flags=re.I):
        errores.append("no se menciona 'presupuesto' en la llamada a la acción")
    # imágenes
    imgs = re.findall(r"\[IMAGEN:([^\]]*)\]", sin_codigo)
    if not imgs:
        errores.append("sin marcadores [IMAGEN]")
    for im in imgs:
        if "alt:" not in im.lower():
            errores.append("[IMAGEN] sin texto alt")
    # JSON-LD
    bloques = re.findall(r"```json\s*\n(.*?)```", cuerpo, flags=re.S)
    if not bloques:
        errores.append("sin bloque JSON-LD")
    else:
        try:
            datos = json.loads(bloques[-1])
            dump = json.dumps(datos, ensure_ascii=False)
            if '"Service"' not in dump:
                errores.append("JSON-LD sin Service")
            if '"FAQPage"' not in dump:
                errores.append("JSON-LD sin FAQPage")
            if "areaServed" not in dump:
                errores.append("JSON-LD sin areaServed")
            nq = dump.count('"Question"')
            if nq != len(preguntas):
                avisos.append(f"JSON-LD con {nq} Question y {len(preguntas)} preguntas en texto")
        except json.JSONDecodeError as e:
            errores.append(f"JSON-LD no válido: {e}")
    # enlaces internos
    enlaces = re.findall(r"\]\((https?://agrodroncanarias\.es/[^)]+)\)", sin_codigo)
    if nivel in ("A", "B") and not any("dron-agricola-" in e and e.count("/") == 4 for e in enlaces):
        errores.append("municipio sin enlace a la página de su isla")
    if nivel in ("A", "B") and not any(re.search(r"/dron-agricola-(platanera|vina|aguacate|papa|tomate|frutales|citricos|almendro|horticolas|aloe|flores)", e) for e in enlaces):
        errores.append("municipio sin enlace a una página de cultivo")
    if nivel == "hub" and len([e for e in enlaces if e.count("/") == 5]) < 2:
        avisos.append("hub con menos de 2 enlaces a municipios")
    # desplazamiento fuera de La Palma
    fuera = "/la-palma/" not in rel and "/islas/la-palma.md" not in rel and "/cultivos/" not in rel
    if fuera and not re.search(r"desplazamiento", sin_codigo, flags=re.I):
        errores.append("página fuera de La Palma sin mención al desplazamiento")
    if fuera and not re.search(r"disponibilidad|bajo consulta", sin_codigo, flags=re.I):
        avisos.append("página fuera de La Palma sin mención a disponibilidad/consulta")
    # prohibidas
    nt = norm(sin_codigo)
    for p in PROHIBIDAS:
        if norm(p) in nt:
            errores.append(f"frase prohibida: '{p}'")
    # párrafos largos
    for bloque in re.split(r"\n\s*\n", sin_codigo):
        b = bloque.strip()
        if b and not b.startswith("#") and not b.startswith("[") and not b.startswith("-") and not b.startswith("|"):
            n = len(b.split())
            if n > 85:
                avisos.append(f"párrafo de {n} palabras (demasiado largo para móvil)")
    verificar = len(re.findall(r"\[VERIFICAR[^\]]*\]", texto))
    return rel, errores, avisos, {"palabras": palabras, "verificar": verificar, "nivel": nivel, "title": title}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", default=None)
    ap.add_argument("--solo", default=None)
    args = ap.parse_args()
    rutas = [args.solo] if args.solo else sorted(glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True))
    total_err = 0
    filas = []
    for r in rutas:
        rel, errores, avisos, info = revisar(r)
        total_err += len(errores)
        estado = "OK" if not errores else f"{len(errores)} error(es)"
        print(f"\n{rel}  [{info.get('nivel','?')}] {info.get('palabras','?')} palabras, {info.get('verificar',0)} [VERIFICAR]  -> {estado}")
        for e in errores:
            print(f"   ERROR  {e}")
        for a in avisos:
            print(f"   aviso  {a}")
        filas.append((rel, info.get("nivel", "?"), info.get("palabras", "?"), info.get("verificar", 0), len(errores), len(avisos)))
    print(f"\nPáginas: {len(rutas)} | errores totales: {total_err}")
    if args.md:
        with open(args.md, "w", encoding="utf-8") as f:
            f.write("| Página | Nivel | Palabras | [VERIFICAR] | Errores | Avisos |\n|---|---|---|---|---|---|\n")
            for fila in filas:
                f.write("| " + " | ".join(str(x) for x in fila) + " |\n")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    main()
