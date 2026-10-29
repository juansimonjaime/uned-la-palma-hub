#!/usr/bin/env python3
"""Calendario de publicación: una página por día, hub de isla antes que sus municipios.

Orden basado en la sección 9 de informe.md. Para cada página indica la URL final en
WordPress, cuántas marcas [VERIFICAR] y marcadores [IMAGEN] le quedan y si está lista
para salir (0 de cada).

Uso: python3 scripts/calendario_publicacion.py --inicio 2026-10-30 [--por-dia 2] [--md data/calendario_publicacion.md]
"""
import argparse
import datetime as dt
import glob
import os
import re

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
BASE = "https://agrodroncanarias.es"

ORDEN = (
    ["islas/la-palma"]
    + ["la-palma/" + s for s in (
        "los-llanos-de-aridane", "tazacorte", "villa-de-mazo", "tijarafe", "el-paso", "garafia",
        "fuencaliente", "san-andres-y-sauces", "barlovento", "brena-alta", "puntagorda",
        "puntallana", "brena-baja", "santa-cruz-de-la-palma")]
    + ["cultivos/" + s for s in (
        "platanera", "vina", "aguacate", "papa", "frutales-subtropicales", "citricos",
        "almendro", "horticolas", "tomate", "flores-ornamentales")]
    + ["islas/tenerife"]
    + ["tenerife/" + s for s in (
        "la-orotava", "los-realejos", "icod-de-los-vinos", "garachico", "los-silos",
        "buenavista-del-norte", "tacoronte", "el-sauzal", "la-matanza-de-acentejo",
        "la-victoria-de-acentejo", "santa-ursula", "tegueste", "san-cristobal-de-la-laguna",
        "candelaria", "guimar", "arico", "granadilla-de-abona", "san-miguel-de-abona",
        "vilaflor-de-chasna", "arona", "adeje", "guia-de-isora")]
    + ["islas/gran-canaria"]
    + ["gran-canaria/" + s for s in (
        "galdar", "santa-maria-de-guia", "arucas", "moya", "teror", "telde", "valsequillo",
        "vega-de-san-mateo", "agaete", "la-aldea-de-san-nicolas", "mogan",
        "san-bartolome-de-tirajana")]
    + ["islas/lanzarote"]
    + ["lanzarote/" + s for s in ("tias", "yaiza", "tinajo", "teguise", "san-bartolome", "haria")]
    + ["islas/la-gomera"]
    + ["la-gomera/" + s for s in ("hermigua", "valle-gran-rey", "vallehermoso")]
    + ["islas/el-hierro", "el-hierro/frontera"]
    + ["islas/fuerteventura", "fuerteventura/antigua", "fuerteventura/tuineje"]
)


def frontmatter(texto):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", texto, flags=re.S)
    fm = {}
    for linea in m.group(1).splitlines():
        if ":" in linea:
            k, v = linea.split(":", 1)
            fm[k.strip()] = v.strip().strip('"')
    return fm


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inicio", required=True, help="fecha de la primera página, AAAA-MM-DD")
    ap.add_argument("--por-dia", type=int, default=1, help="páginas publicadas cada día")
    ap.add_argument("--limite", type=int, default=None, help="solo se programan las N primeras; el resto queda sin fecha")
    ap.add_argument("--md", default=None)
    args = ap.parse_args()

    todas = sorted(os.path.relpath(p, os.path.join(RAIZ, "paginas")).replace(os.sep, "/")[:-3]
                   for p in glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True))
    assert sorted(ORDEN) == todas, (set(ORDEN) ^ set(todas), len(ORDEN), len(todas))

    dia0 = dt.date.fromisoformat(args.inicio)
    filas = []
    for n, rel in enumerate(ORDEN):
        with open(os.path.join(RAIZ, "paginas", rel + ".md"), encoding="utf-8") as f:
            texto = f.read()
        fm = frontmatter(texto)
        cuerpo = re.sub(r"```.*?```", " ", texto, flags=re.S)
        url = f"{BASE}/{fm['parent']}/{fm['slug']}/" if fm.get("parent") else f"{BASE}/{fm['slug']}/"
        ver = len(re.findall(r"\[VERIFICAR", cuerpo))
        pend = len(re.findall(r"\[IMAGEN:", cuerpo))
        fotos = len(re.findall(r"!\[[^\]]*\]\(/imagenes/", cuerpo))
        programada = args.limite is None or n < args.limite
        fecha = dia0 + dt.timedelta(days=n // args.por_dia) if programada else "sin fecha (fase 2)"
        filas.append((n + 1, fecha, rel, fm.get("nivel", ""), url, ver, pend, fotos))

    listas = sum(1 for f in filas if f[5] == 0 and f[6] == 0)
    con_fecha = [f for f in filas if not isinstance(f[1], str)]
    print(f"{len(con_fecha)} de {len(filas)} páginas programadas, del {con_fecha[0][1]} al {con_fecha[-1][1]}. Listas para salir (0 [VERIFICAR] y 0 [IMAGEN]): {listas}")
    if args.md:
        with open(args.md, "w", encoding="utf-8", newline="\n") as f:
            f.write(f"# Calendario de publicación ({args.por_dia} página(s) por día)\n\n")
            f.write(f"Programadas {len(con_fecha)} de {len(filas)} páginas, del {con_fecha[0][1]} al {con_fecha[-1][1]}. Orden: hub de isla antes que sus municipios; La Palma y cultivos primero (informe.md, sección 9).\n\n")
            if len(con_fecha) < len(filas):
                f.write("Fase 1: La Palma (hub y 14 municipios) y las 10 páginas de cultivo. El resto queda sin fecha hasta revisar en Google Search Console, 4-6 semanas después, qué páginas reciben visitas; entonces se decide si se publican las demás islas, despacio o solo con sus hubs.\n\n")
            f.write(f"Una página está lista cuando no le quedan marcas [VERIFICAR] ni marcadores [IMAGEN]. Ahora mismo hay {listas} de {len(filas)}.\n\n")
            f.write("| Nº | Fecha | Página | Nivel | URL final | [VERIFICAR] | [IMAGEN] sin foto | Fotos | Lista |\n|---|---|---|---|---|---|---|---|---|\n")
            for d, fecha, rel, niv, url, ver, pend, fotos in filas:
                f.write(f"| {d} | {fecha} | {rel} | {niv} | {url} | {ver} | {pend} | {fotos} | {'sí' if ver == 0 and pend == 0 else 'no'} |\n")


if __name__ == "__main__":
    main()
