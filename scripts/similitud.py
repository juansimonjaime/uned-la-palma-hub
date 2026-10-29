#!/usr/bin/env python3
"""Control de similitud entre páginas (paginas/**/*.md).

Métrica principal: contención de shingles de 5 palabras (proporción de las
secuencias de 5 palabras de una página que aparecen también en otra), tomando
el máximo de las dos direcciones. Detecta texto plantilla (párrafos repetidos
cambiando solo el topónimo). Métrica secundaria: coseno TF-IDF de unigramas,
solo informativa (dos páginas sobre dron agrícola comparten vocabulario aunque
no compartan frases).

Umbral del encargo: 30 %. Uso:
    python3 scripts/similitud.py [--umbral 30] [--top 15] [--md salida.md]
"""
import argparse
import glob
import math
import os
import re
import sys
from collections import Counter

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
STOP = set("""a al algo ante antes como con contra cual cuando de del desde donde dos
el ella ellas ellos en entre era eran es esa esas ese eso esos esta estaba estaban
estamos estan estar este esto estos fue fueron ha hace hacia han hasta hay la las le
les lo los mas me mi mientras muy nada ni no nos nosotros o os otra otras otro otros
para pero poco por porque que quien se sea segun ser si sin sobre son su sus tambien
tanto te tiene tienen todo todos tu tus un una uno unos y ya""".split())


def limpiar(texto: str) -> str:
    # quitar frontmatter
    texto = re.sub(r"^---.*?---\s*", "", texto, count=1, flags=re.S)
    # quitar bloques de código (JSON-LD)
    texto = re.sub(r"```.*?```", " ", texto, flags=re.S)
    # quitar marcadores de imagen y enlaces (dejar texto del enlace)
    texto = re.sub(r"\[IMAGEN:[^\]]*\]", " ", texto)
    texto = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", texto)
    texto = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", texto)
    texto = re.sub(r"<[^>]+>", " ", texto)
    texto = texto.lower()
    texto = re.sub(r"[áàä]", "a", texto)
    texto = re.sub(r"[éèë]", "e", texto)
    texto = re.sub(r"[íìï]", "i", texto)
    texto = re.sub(r"[óòö]", "o", texto)
    texto = re.sub(r"[úùü]", "u", texto)
    texto = re.sub(r"[^a-zñ0-9\s]", " ", texto)
    return texto


def palabras(texto: str):
    return [p for p in texto.split() if p]


def shingles(tokens, n=5):
    return {" ".join(tokens[i:i + n]) for i in range(max(0, len(tokens) - n + 1))}


def contencion(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    return max(inter / len(a), inter / len(b))


def tfidf_coseno(docs):
    n = len(docs)
    df = Counter()
    tfs = []
    for toks in docs:
        toks = [t for t in toks if t not in STOP and len(t) > 2]
        tf = Counter(toks)
        tfs.append(tf)
        for t in tf:
            df[t] += 1
    vecs = []
    for tf in tfs:
        v = {t: (1 + math.log(c)) * math.log((n + 1) / (df[t] + 0.5)) for t, c in tf.items()}
        norma = math.sqrt(sum(x * x for x in v.values())) or 1.0
        vecs.append({t: x / norma for t, x in v.items()})
    return vecs


def coseno(u, v):
    if len(u) > len(v):
        u, v = v, u
    return sum(x * v.get(t, 0.0) for t, x in u.items())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--umbral", type=float, default=30.0)
    ap.add_argument("--top", type=int, default=15)
    ap.add_argument("--md", default=None, help="archivo markdown de salida")
    ap.add_argument("--n", type=int, default=5, help="tamaño del shingle")
    args = ap.parse_args()

    rutas = sorted(glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True))
    if len(rutas) < 2:
        print("Hacen falta al menos dos páginas en paginas/.")
        sys.exit(1)
    nombres = [os.path.relpath(r, RAIZ) for r in rutas]
    docs = []
    for r in rutas:
        with open(r, encoding="utf-8") as f:
            docs.append(palabras(limpiar(f.read())))
    sh = [shingles(d, args.n) for d in docs]
    vecs = tfidf_coseno(docs)

    pares = []
    for i in range(len(docs)):
        for j in range(i + 1, len(docs)):
            c = contencion(sh[i], sh[j]) * 100
            cs = coseno(vecs[i], vecs[j]) * 100
            pares.append((c, cs, nombres[i], nombres[j]))
    pares.sort(reverse=True)

    alertas = [p for p in pares if p[0] > args.umbral]
    lineas = []
    lineas.append(f"Páginas analizadas: {len(docs)}  |  pares: {len(pares)}  |  métrica: contención de shingles de {args.n} palabras  |  umbral: {args.umbral:.0f} %")
    maxc = pares[0][0] if pares else 0
    media = sum(p[0] for p in pares) / len(pares) if pares else 0
    lineas.append(f"Máxima similitud: {maxc:.1f} %  |  media: {media:.1f} %  |  pares por encima del umbral: {len(alertas)}")
    lineas.append("")
    lineas.append(f"Top {args.top} pares (shingles % | coseno TF-IDF % | página A | página B):")
    for c, cs, a, b in pares[: args.top]:
        marca = " <-- REESCRIBIR" if c > args.umbral else ""
        lineas.append(f"  {c:5.1f} | {cs:5.1f} | {a} | {b}{marca}")
    salida = "\n".join(lineas)
    print(salida)
    if args.md:
        with open(args.md, "w", encoding="utf-8") as f:
            f.write("```\n" + salida + "\n```\n")
    sys.exit(2 if alertas else 0)


if __name__ == "__main__":
    main()
