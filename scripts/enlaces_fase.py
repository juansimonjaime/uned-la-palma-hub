#!/usr/bin/env python3
"""Quita o recupera los enlaces internos a páginas que aún no están publicadas.

Con --quitar, en las páginas publicadas convierte en texto normal cada enlace a una página
que no está en la lista de publicadas, y guarda la lista en data/enlaces_pendientes.json.
Con --recuperar, vuelve a poner como enlace los que apuntan a páginas que ya se publican.

Publicadas = hub de La Palma, municipios de La Palma y cultivos (fase 1), más lo que se
pase con --tambien (por ejemplo --tambien islas/tenerife tenerife/).

Uso: python3 scripts/enlaces_fase.py --quitar
     python3 scripts/enlaces_fase.py --recuperar --tambien islas/tenerife tenerife/
"""
import argparse
import glob
import json
import os
import re

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
BASE = "https://agrodroncanarias.es"
FASE1 = ["islas/la-palma", "la-palma/", "cultivos/"]
PENDIENTES = os.path.join(RAIZ, "data", "enlaces_pendientes.json")


def paginas():
    out = {}
    for p in glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True):
        rel = os.path.relpath(p, os.path.join(RAIZ, "paginas")).replace(os.sep, "/")[:-3]
        out[rel] = p
    return out


def partes(texto):
    """Separa frontmatter, cuerpo y bloque JSON-LD; solo se toca el cuerpo."""
    m = re.match(r"^---\s*\n.*?\n---\s*\n", texto, flags=re.S)
    fm, resto = (texto[:m.end()], texto[m.end():]) if m else ("", texto)
    if "```json" in resto:
        i = resto.index("```json")
        return fm, resto[:i], resto[i:]
    return fm, resto, ""


def url_de(ruta):
    t = open(ruta, encoding="utf-8").read()
    fm = dict((k.strip(), v.strip().strip('"')) for k, v in
              (l.split(":", 1) for l in re.match(r"^---\s*\n(.*?)\n---", t, re.S).group(1).splitlines() if ":" in l))
    return f"{BASE}/{fm['parent']}/{fm['slug']}/" if fm.get("parent") else f"{BASE}/{fm['slug']}/"


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--quitar", action="store_true")
    g.add_argument("--recuperar", action="store_true")
    ap.add_argument("--tambien", nargs="*", default=[])
    args = ap.parse_args()
    prefijos = FASE1 + args.tambien
    publicada = lambda rel: any(rel == p or rel.startswith(p) for p in prefijos)

    pags = paginas()
    url_a_rel = {url_de(r): rel for rel, r in pags.items()}
    pendientes = json.load(open(PENDIENTES, encoding="utf-8")) if os.path.exists(PENDIENTES) else []

    if args.quitar:
        n = 0
        for rel, ruta in sorted(pags.items()):
            if not publicada(rel):
                continue
            fm, cuerpo, json_ld = partes(open(ruta, encoding="utf-8").read())
            nuevo, pos = "", 0
            for m in re.finditer(r"(?<!!)\[([^\]]+)\]\((https://agrodroncanarias\.es/[^)]+)\)", cuerpo):
                destino = url_a_rel.get(m.group(2))
                nuevo += cuerpo[pos:m.start()]
                if destino and not publicada(destino):
                    # el texto previo sirve para devolver el enlace exactamente a su sitio
                    pendientes.append({"pagina": rel, "antes": nuevo[-60:], "texto": m.group(1), "url": m.group(2), "destino": destino})
                    nuevo += m.group(1)
                    n += 1
                else:
                    nuevo += m.group(0)
                pos = m.end()
            nuevo += cuerpo[pos:]
            if nuevo != cuerpo:
                open(ruta, "w", encoding="utf-8", newline="\n").write(fm + nuevo + json_ld)
        json.dump(pendientes, open(PENDIENTES, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{n} enlaces convertidos en texto; {len(pendientes)} pendientes en total")
    else:
        quedan, n = [], 0
        # de atrás adelante, para que cada "antes" siga intacto cuando se recupera su enlace
        for e in reversed(pendientes):
            if not publicada(e["destino"]):
                quedan.append(e)
                continue
            ruta = pags[e["pagina"]]
            fm, cuerpo, json_ld = partes(open(ruta, encoding="utf-8").read())
            buscado = e["antes"] + e["texto"]
            if cuerpo.count(buscado) >= 1:
                cuerpo = cuerpo.replace(buscado, f"{e['antes']}[{e['texto']}]({e['url']})", 1)
                open(ruta, "w", encoding="utf-8", newline="\n").write(fm + cuerpo + json_ld)
                n += 1
            else:
                quedan.append(e)
        quedan.reverse()
        json.dump(quedan, open(PENDIENTES, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{n} enlaces recuperados; {len(quedan)} siguen pendientes")


if __name__ == "__main__":
    main()
