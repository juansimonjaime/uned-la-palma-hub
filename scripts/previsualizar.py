#!/usr/bin/env python3
"""Vista previa local de las landings, maquetadas como landing (no como artículo).

Convierte paginas/**/*.md en HTML con: cabecera con H1, primer párrafo, foto y botón de
presupuesto; franja de confianza con los datos que el brief permite afirmar; cuerpo por
secciones; preguntas frecuentes desplegables; franja final de presupuesto y botón fijo en
el móvil. El texto es el de las páginas, sin tocar. Quita el frontmatter y el JSON-LD y
reescribe los enlaces internos para navegar entre las páginas locales.

Uso: python3 scripts/previsualizar.py        (necesita: pip install markdown)
Abrir: previsualizacion/index.html
"""
import glob
import html
import os
import re
import shutil

import markdown

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SALIDA = os.path.join(RAIZ, "previsualizacion")
BASE = "https://agrodroncanarias.es"
CONTACTO = BASE + "/contacto"
FASE1 = ("islas/la-palma", "la-palma/", "cultivos/")

CSS = """
:root{--v:#1f4d3a;--v2:#2f6f52;--c:#e8b33c;--g:#f3f5f1;--t:#1d2521;--m:#5d6b63}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font:17px/1.65 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:var(--t);background:#fff}
a{color:var(--v2)}img{max-width:100%;height:auto;display:block}
.barra{background:#10291f;color:#cfe0d6;font-size:13px;padding:6px 18px}.barra a{color:#fff}
.nav{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;max-width:1100px;margin:0 auto}
.logo{font-weight:800;color:var(--v);text-decoration:none;font-size:18px}.logo span{color:var(--c)}
.btn{display:inline-block;background:var(--c);color:#1d2521;font-weight:700;padding:13px 22px;border-radius:999px;text-decoration:none;box-shadow:0 2px 0 rgba(0,0,0,.15)}
.btn:hover{filter:brightness(1.05)}.btn.peq{padding:9px 16px;font-size:15px}
.hero{background:linear-gradient(135deg,var(--v),var(--v2));color:#fff}
.hero .in{max-width:1100px;margin:0 auto;padding:44px 18px;display:grid;grid-template-columns:1.1fr .9fr;gap:36px;align-items:center}
.hero h1{font-size:clamp(1.7rem,3.4vw,2.6rem);line-height:1.15;margin:0 0 16px}
.hero p{color:#e3eee8;font-size:1.05rem;margin:0 0 22px}
.hero img{border-radius:16px;box-shadow:0 12px 30px rgba(0,0,0,.3);max-height:440px;width:100%;object-fit:cover}
.hero .sinfoto{border:2px dashed rgba(255,255,255,.35);border-radius:16px;min-height:220px;display:flex;align-items:center;justify-content:center;color:#cfe0d6;font-size:14px;text-align:center;padding:20px}
.nota{font-size:13px;color:#cfe0d6;margin-top:12px}
.confianza{background:var(--g)}.confianza ul{max-width:1100px;margin:0 auto;padding:18px;list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.confianza li{background:#fff;border-radius:12px;padding:14px;font-size:14.5px;line-height:1.4;border:1px solid #e1e7e2}
.confianza b{display:block;color:var(--v);font-size:15.5px;margin-bottom:2px}
main{max-width:780px;margin:0 auto;padding:10px 18px 40px}
main h2{color:var(--v);font-size:1.5rem;line-height:1.25;margin:2.4em 0 .6em;padding-top:.9em;border-top:3px solid var(--c);display:inline-block}
main h3{font-size:1.1rem;margin:1.6em 0 .4em}
main img{border-radius:12px;margin:1.4em 0;max-height:520px;width:100%;object-fit:cover}
main li{margin:.35em 0}
.faq details{border:1px solid #dfe6e1;border-radius:12px;padding:0 16px;margin:10px 0;background:#fff}
.faq summary{cursor:pointer;font-weight:700;padding:14px 0;list-style:none}.faq summary::after{content:'+';float:right;color:var(--v2);font-size:22px;line-height:1}
.faq details[open] summary::after{content:'−'}.faq details>*:not(summary){margin-top:0}
.cta{background:var(--v);color:#fff;margin-top:30px}.cta .in{max-width:780px;margin:0 auto;padding:40px 18px;text-align:center}
.cta h2{color:#fff;border:0;display:block;margin:0 0 12px;padding:0}.cta p{color:#e3eee8}.cta a:not(.btn){color:#fff}
.fijo{display:none}
footer{background:#10291f;color:#9fb6aa;font-size:13px;padding:22px 18px;text-align:center}
.meta{max-width:1100px;margin:0 auto;padding:10px 18px;font-size:13px;color:var(--m);border-bottom:1px solid #e6ebe7}
.ok{color:#14803c;font-weight:700}.no{color:#b45309;font-weight:700}
.idx{max-width:900px;margin:0 auto;padding:28px 18px}.idx h1{color:var(--v)}.idx h2{color:var(--v);margin-top:1.6em}
.idx li{margin:.3em 0}.fase{background:var(--c);color:#1d2521;border-radius:6px;padding:1px 7px;font-size:12px;font-weight:700}
@media (max-width:820px){.hero .in{grid-template-columns:1fr;padding:30px 18px}.confianza ul{grid-template-columns:1fr 1fr}
.fijo{display:block;position:fixed;left:12px;right:12px;bottom:12px;text-align:center;z-index:9}.fijo .btn{display:block}
body{padding-bottom:72px}.nav .btn{display:none}}
"""


def frontmatter(texto):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", texto, flags=re.S)
    fm = {}
    for linea in m.group(1).splitlines():
        if ":" in linea:
            k, v = linea.split(":", 1)
            fm[k.strip()] = v.strip().strip('"')
    return fm, texto[m.end():]


def documento(a_raiz, titulo, cuerpo):
    return (f"<!doctype html><html lang='es'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            f"<title>{html.escape(titulo)}</title><style>{CSS}</style></head><body>"
            f"<div class='barra'>Maqueta local · <a href='{a_raiz}index.html'>volver al índice</a> · el diseño final lo dará tu tema de WordPress</div>"
            f"{cuerpo}</body></html>")


def acordeon(seccion):
    """Convierte cada <h3>pregunta</h3> + respuesta en un <details> desplegable."""
    partes = re.split(r"(<h3>.*?</h3>)", seccion)
    out = partes[0]
    for i in range(1, len(partes), 2):
        pregunta = re.sub(r"</?h3>", "", partes[i])
        out += f"<details><summary>{pregunta}</summary>{partes[i + 1]}</details>"
    return f"<div class='faq'>{out}</div>"


def maquetar(cuerpo_html, fm, rel, a_raiz):
    h1 = re.search(r"<h1>(.*?)</h1>", cuerpo_html, flags=re.S)
    resto = cuerpo_html[h1.end():] if h1 else cuerpo_html
    trozos = re.split(r"(?=<h2>)", resto)
    intro, secciones = trozos[0], trozos[1:]

    primer_p = re.search(r"<p>(?!<img).*?</p>", intro, flags=re.S)
    lede = primer_p.group(0) if primer_p else ""
    intro = intro.replace(lede, "", 1)
    foto = re.search(r"<p><img[^>]*></p>", intro)
    if foto:
        intro = intro.replace(foto.group(0), "", 1)
        foto_html = re.search(r"<img[^>]*>", foto.group(0)).group(0)
    else:
        foto_html = "<div class='sinfoto'>Esta página aún no tiene foto propia.<br>Aquí iría una foto de la zona o del cultivo.</div>"

    fuera = not (rel.startswith("la-palma/") or rel == "islas/la-palma" or rel.startswith("cultivos/"))
    ambito = ("<b>Resto de Canarias</b>Con desplazamiento, bajo consulta y disponibilidad" if fuera
              else "<b>Base en Santa Cruz de La Palma</b>En La Palma, sin desplazamiento")
    confianza = ("<section class='confianza'><ul>"
                 "<li><b>Piloto certificado</b>Más de 10 años de experiencia, certificados AESA/EASA (PDRA-S01, operador STS)</li>"
                 "<li><b>DJI Agras T50</b>Depósito de 40 litros, sigue el relieve y detecta obstáculos</li>"
                 "<li><b>Solo al aire libre</b>Productos de uso permitido, a la dosis de su etiqueta</li>"
                 f"<li>{ambito}</li></ul></section>")

    i_faq = next((i for i, s in enumerate(secciones) if re.search(r"<h2>[^<]*(pregunta|frecuente|dudas)", s, flags=re.I)), None)
    cta = ""
    if i_faq is not None and i_faq + 1 < len(secciones):
        cta_sec = secciones.pop(i_faq + 1) if "presupuesto" in secciones[i_faq + 1].lower() else ""
        if cta_sec:
            cta = (f"<section class='cta'><div class='in'>{cta_sec}"
                   f"<p><a class='btn' href='{CONTACTO}'>Pedir presupuesto</a></p></div></section>")
    if i_faq is not None:
        secciones[i_faq] = acordeon(secciones[i_faq])
    if not cta:
        cta = f"<section class='cta'><div class='in'><h2>¿Encaja el dron en tu finca?</h2><p><a class='btn' href='{CONTACTO}'>Pedir presupuesto</a></p></div></section>"

    titulo = h1.group(1) if h1 else fm.get("title", "")
    return (f"<div class='nav'><a class='logo' href='{a_raiz}index.html'>Agrodrón <span>Canarias</span></a>"
            f"<a class='btn peq' href='{CONTACTO}'>Pedir presupuesto</a></div>"
            f"<section class='hero'><div class='in'><div><h1>{titulo}</h1>{lede}"
            f"<a class='btn' href='{CONTACTO}'>Pedir presupuesto</a>"
            f"<div class='nota'>Cuéntanos finca, cultivo y superficie y te decimos si el dron encaja.</div></div>"
            f"<div>{foto_html}</div></div></section>{confianza}"
            f"<main>{intro}{''.join(secciones)}</main>{cta}"
            f"<footer>Agrodrón Canarias · Santa Cruz de La Palma · agrodroncanarias.es</footer>"
            f"<div class='fijo'><a class='btn' href='{CONTACTO}'>Pedir presupuesto</a></div>")


def main():
    if os.path.isdir(SALIDA):
        shutil.rmtree(SALIDA)
    os.makedirs(SALIDA)
    shutil.copytree(os.path.join(RAIZ, "imagenes"), os.path.join(SALIDA, "imagenes"))

    paginas = []
    for ruta in sorted(glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True)):
        rel = os.path.relpath(ruta, os.path.join(RAIZ, "paginas")).replace(os.sep, "/")[:-3]
        fm, cuerpo = frontmatter(open(ruta, encoding="utf-8").read())
        paginas.append((rel, fm, cuerpo))

    destino = {}
    for rel, fm, _ in paginas:
        url = f"{BASE}/{fm['parent']}/{fm['slug']}/" if fm.get("parent") else f"{BASE}/{fm['slug']}/"
        destino[url] = rel + ".html"

    estados = {}
    for rel, fm, cuerpo in paginas:
        a_raiz = "../" * rel.count("/")
        sin_json = re.sub(r"```json.*?```", "", cuerpo, flags=re.S)
        pendientes = len(re.findall(r"\[VERIFICAR|\[IMAGEN:", sin_json))
        estados[rel] = pendientes

        md = re.sub(r"(?<!!)\[([^\]]+)\]\((https?://[^)]+)\)",
                    lambda m: f"[{m.group(1)}]({a_raiz}{destino[m.group(2)]})" if m.group(2) in destino else m.group(0), sin_json)
        md = re.sub(r"!\[([^\]]*)\]\(/imagenes/([^)]+)\)", lambda m: f"![{m.group(1)}]({a_raiz}imagenes/{m.group(2)})", md)
        cuerpo_html = markdown.markdown(md, extensions=["extra", "sane_lists"])

        estado = "<span class='ok'>lista</span>" if pendientes == 0 else f"<span class='no'>{pendientes} aviso(s) pendiente(s)</span>"
        url = BASE + "/" + (fm["parent"] + "/" if fm.get("parent") else "") + fm["slug"] + "/"
        meta = (f"<div class='meta'><b>SEO</b> · {html.escape(fm.get('title', ''))} · {html.escape(url)} · {estado}<br>"
                f"<i>{html.escape(fm.get('meta_description', ''))}</i></div>")
        out = os.path.join(SALIDA, rel + ".html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, "w", encoding="utf-8").write(documento(a_raiz, fm.get("title", rel), meta + maquetar(cuerpo_html, fm, rel, a_raiz)))

    nombres = {"islas": "Hubs de isla", "cultivos": "Cultivos", "la-palma": "La Palma", "tenerife": "Tenerife", "gran-canaria": "Gran Canaria",
               "lanzarote": "Lanzarote", "la-gomera": "La Gomera", "el-hierro": "El Hierro", "fuerteventura": "Fuerteventura"}
    orden = ["la-palma", "cultivos", "islas", "tenerife", "gran-canaria", "lanzarote", "la-gomera", "el-hierro", "fuerteventura"]
    idx = ("<div class='idx'><h1>Vista previa de las landings</h1>"
           "<p>Maqueta local con el texto real de cada página. <span class='fase'>FASE 1</span> marca las 25 páginas que se publican primero "
           "(La Palma y cultivos). En verde, las que ya no tienen avisos pendientes.</p>")
    for g in orden:
        idx += f"<h2>{nombres[g]}</h2><ul>"
        for rel, fm, _ in paginas:
            if rel.split("/")[0] != g:
                continue
            n = estados[rel]
            marca = "<span class='ok'>✓ lista</span>" if n == 0 else f"<span class='no'>{n} aviso(s)</span>"
            fase = " <span class='fase'>FASE 1</span>" if rel.startswith(FASE1) else ""
            idx += f"<li><a href='{rel}.html'>{html.escape(fm.get('title', rel))}</a> {marca}{fase}</li>"
        idx += "</ul>"
    open(os.path.join(SALIDA, "index.html"), "w", encoding="utf-8").write(documento("", "Vista previa", idx + "</div>"))
    print(f"{len(paginas)} páginas en {SALIDA}")


if __name__ == "__main__":
    main()
