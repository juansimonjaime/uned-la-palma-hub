#!/usr/bin/env python3
"""Consolida los fragmentos de /data/fragments/*.csv en /data/municipios.csv.

Unifica el esquema (La Palma usa "importancia_agricola" en vez de nivel) y aplica
las decisiones finales de nivel (A/B/C) definidas en DECISIONES, con su
justificación, que es la que se recoge en informe.md.
"""
import csv
import glob
import os

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ORDEN_ISLAS = ["La Palma", "Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Gomera", "El Hierro"]
CAMPOS = ["isla", "municipio", "slug", "nivel", "justificacion_nivel", "cultivos_principales",
          "superficie_cultivada_ha", "altitud_y_orografia", "clima_viento_humedad",
          "problemas_sanidad_vegetal_documentados", "notas", "fuentes"]

# Decisiones finales de nivel: slug -> (nivel, justificación). Lo que no esté aquí
# conserva el nivel propuesto por la investigación (sin la marca [VERIFICAR]).
DECISIONES = {
    # Tenerife: 22 municipios a nivel B. Pasan a C los que la investigación marcó como "B débil"
    # (sin superficie cultivada confirmada y con agricultura pequeña o residual): se citan en el hub.
    "el-rosario": ("C", "Agricultura de medianías pequeña (papa, forraje, cereal) y sin superficie confirmada; municipio mayoritariamente residencial. Se menciona en el hub de Tenerife."),
    "la-guancha": ("C", "Unas 300 ha labradas según fuente sin fecha; papa y viña de medianías en parcelas pequeñas. Se menciona en el hub de Tenerife."),
    "san-juan-de-la-rambla": ("C", "Municipio muy pequeño (platanera de costa y papa) sin superficie confirmada. Se menciona en el hub de Tenerife."),
    "el-tanque": ("C", "Papa y viña de medianías en poca superficie, sin dato confirmado. Se menciona en el hub de Tenerife."),
    "santiago-del-teide": ("C", "Viña (~44 ha) y almendro de secano; superficie cultivada reducida. Se menciona en el hub de Tenerife."),
    "fasnia": ("C", "Viña y papa de medianías sin superficie confirmada; tomate bajo invernadero (no tratable con dron). Se menciona en el hub de Tenerife."),
    "arafo": ("C", "Unas 100 ha cultivadas estimadas (viña 37,8 ha, cítricos 17,2 ha, platanera 8,7 ha, campaña 2016). Se menciona en el hub de Tenerife."),
    "puerto-de-la-cruz": ("C", "Municipio urbano de 8,7 km2 con platanera residual. Se menciona en el hub de Tenerife."),
    "santa-cruz-de-tenerife": ("C", "219 ha cultivadas en 2013, en su mayoría autoconsumo en Anaga. Se menciona en el hub de Tenerife."),
    # Gran Canaria: 12 municipios a nivel B.
    "firgas": ("C", "Sin dato de superficie; papa, millo y hortalizas de medianías en parcelas pequeñas. Se menciona en el hub de Gran Canaria."),
    "santa-brigida": ("C", "Viña de secano de Monte Lentiscal y huerta de regadío en un municipio residencial, sin superficie confirmada. Se menciona en el hub."),
    "aguimes": ("C", "El grueso es tomate y pepino de exportación bajo invernadero (no tratable con dron); olivar de Temisas de poca superficie. Se menciona en el hub."),
    "santa-lucia-de-tirajana": ("C", "Tomate, pepino y flores bajo invernadero (no tratables con dron); olivar pequeño. Se menciona en el hub de Gran Canaria."),
    "valleseco": ("C", "Papa, millo y manzana de medianías sin superficie confirmada; parcelas pequeñas. Se menciona en el hub de Gran Canaria."),
    "ingenio": ("C", "Hortalizas y tomate residual en invernadero; sin superficie confirmada. Se menciona en el hub de Gran Canaria."),
    "las-palmas-de-gran-canaria": ("C", "Municipio urbano; viña de Bandama y platanera de Tenoya-Tamaraceite sin superficie confirmada. Se menciona en el hub."),
    "tejeda": ("C", "Almendro de secano y viña de altura (11 ha); microexplotaciones. Se menciona en el hub de Gran Canaria."),
    "artenara": ("C", "53,5 ha cultivadas (ISTAC 2019), microexplotaciones de secano. Se menciona en el hub de Gran Canaria."),
    "teror": ("B", "Papa, millo, legumbres y hortalizas de medianías al aire libre en un municipio agrícola histórico; superficie municipal pendiente [VERIFICAR]."),
    "vega-de-san-mateo": ("B", "Papa, hortalizas y frutales de medianías al aire libre, mercado agrícola de referencia; superficie municipal pendiente [VERIFICAR]."),
    "valsequillo": ("B", "Fresa, cítricos, almendro, papa y hortalizas de medianías; parte de la fresa bajo túnel [VERIFICAR]; superficie pendiente."),
    # Lanzarote: 6 B, Arrecife C.
    "haria": ("B", "Viña de la DO Lanzarote (zona Haría-Ye), huerta del valle y cebolla; superficie municipal pendiente [VERIFICAR]."),
    # Fuerteventura: 2 B. El tomate de exportación va bajo cubierta y no se trata con dron.
    "pajara": ("C", "Tomate de exportación bajo invernadero (no tratable con dron) y gavias de secano; se menciona en el hub de Fuerteventura."),
    "la-oliva": ("C", "Sin dato de superficie cultivada; gavias y aloe de poca extensión. Se menciona en el hub de Fuerteventura."),
    "puerto-del-rosario": ("C", "Unas 150 ha estimadas en el Parque Agrario [VERIFICAR]; agricultura pequeña. Se menciona en el hub de Fuerteventura."),
    # La Gomera: 3 B.
    "valle-gran-rey": ("B", "Platanera en terrazas del valle y frutales subtropicales; superficie municipal pendiente [VERIFICAR]."),
    "agulo": ("C", "Municipio muy pequeño con platanera en terrazas; sin superficie confirmada. Se menciona en el hub de La Gomera."),
    "alajero": ("C", "Agricultura de secano reducida; sin superficie confirmada. Se menciona en el hub de La Gomera."),
    "san-sebastian-de-la-gomera": ("C", "Capital insular con platanera puntual; sin superficie confirmada. Se menciona en el hub de La Gomera."),
    # El Hierro: Frontera B.
    "valverde": ("C", "Viña de Echedo y huerta sin superficie confirmada; la agricultura herreña se concentra en El Golfo (Frontera). Se menciona en el hub."),
}


def leer_fragmentos():
    filas = []
    for ruta in sorted(glob.glob(os.path.join(RAIZ, "data", "fragments", "*.csv"))):
        with open(ruta, encoding="utf-8", newline="") as f:
            for row in csv.DictReader(f, delimiter=";"):
                fila = {c: (row.get(c) or "").strip() for c in CAMPOS if c in row}
                fila["isla"] = row["isla"].strip()
                fila["municipio"] = row["municipio"].strip()
                fila["slug"] = row["slug"].strip()
                if "importancia_agricola" in row:  # La Palma
                    fila["nivel"] = "A"
                    fila["justificacion_nivel"] = ("Encargo: los 14 municipios de La Palma van a nivel A. "
                                                   "Importancia agrícola relativa: " + row["importancia_agricola"].strip())
                else:
                    fila["nivel"] = row.get("nivel_propuesto", "").replace("[VERIFICAR]", "").strip()
                    fila["justificacion_nivel"] = row.get("justificacion_nivel", "").strip()
                if fila["slug"] in DECISIONES:
                    nivel, just = DECISIONES[fila["slug"]]
                    fila["nivel"] = nivel
                    fila["justificacion_nivel"] = just + " | Propuesta inicial de la investigación: " + fila["justificacion_nivel"]
                for c in CAMPOS:
                    fila.setdefault(c, "")
                filas.append(fila)
    filas.sort(key=lambda r: (ORDEN_ISLAS.index(r["isla"]) if r["isla"] in ORDEN_ISLAS else 99, r["municipio"]))
    return filas


def main():
    filas = leer_fragmentos()
    salida = os.path.join(RAIZ, "data", "municipios.csv")
    with open(salida, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CAMPOS, delimiter=";", lineterminator="\n")
        w.writeheader()
        for fila in filas:
            w.writerow({c: fila[c].replace(";", ",") for c in CAMPOS})
    resumen = {}
    for fila in filas:
        resumen.setdefault(fila["isla"], {}).setdefault(fila["nivel"], []).append(fila["municipio"])
    print(f"{len(filas)} municipios -> {os.path.relpath(salida, RAIZ)}")
    for isla in ORDEN_ISLAS:
        if isla in resumen:
            partes = [f"{n}: {len(m)}" for n, m in sorted(resumen[isla].items())]
            print(f"  {isla}: " + ", ".join(partes))
            for n, m in sorted(resumen[isla].items()):
                print(f"     {n} -> {', '.join(m)}")


if __name__ == "__main__":
    main()
