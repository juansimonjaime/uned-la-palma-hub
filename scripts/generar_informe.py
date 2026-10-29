#!/usr/bin/env python3
"""Genera /informe.md a partir de data/municipios.csv, las páginas de paginas/ y
los resultados de control (data/control/similitud.md). Las secciones narrativas
están en este mismo archivo para que el informe se pueda regenerar."""
import csv
import glob
import os
import re
import sys
from collections import Counter, OrderedDict

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, os.path.join(RAIZ, "scripts"))
import control_calidad as cc  # noqa: E402

ISLAS = OrderedDict([
    ("La Palma", "la-palma"), ("Tenerife", "tenerife"), ("Gran Canaria", "gran-canaria"),
    ("Lanzarote", "lanzarote"), ("Fuerteventura", "fuerteventura"), ("La Gomera", "la-gomera"),
    ("El Hierro", "el-hierro"),
])
BASE = "https://agrodroncanarias.es"


def leer_pagina(ruta):
    texto = open(ruta, encoding="utf-8").read()
    fm, cuerpo = cc.parse_frontmatter(texto)
    palabras = cc.contar_palabras(cuerpo)
    sin_json = cc.cuerpo_sin_codigo(cuerpo)
    verificar = []
    for v in re.findall(r"\[VERIFICAR[^\]]*\]", sin_json):
        if v not in verificar:
            verificar.append(v)
    return fm, palabras, verificar


def url_de(fm):
    if fm["nivel"] in ("hub", "cultivo"):
        return f"{BASE}/{fm['slug']}/"
    return f"{BASE}/{fm['parent']}/{fm['slug']}/"


def main():
    filas = list(csv.DictReader(open(os.path.join(RAIZ, "data", "municipios.csv"), encoding="utf-8"), delimiter=";"))
    paginas = {}
    for ruta in sorted(glob.glob(os.path.join(RAIZ, "paginas", "**", "*.md"), recursive=True)):
        rel = os.path.relpath(ruta, RAIZ)
        paginas[rel] = leer_pagina(ruta)
    total_verificar = sum(len(v) for _, _, v in paginas.values())
    niveles = Counter(fm["nivel"] for fm, _, _ in paginas.values())
    out = []
    w = out.append

    w("# Informe: landings SEO local de Agrodrón Canarias\n")
    w("Entrega del encargo maestro: páginas de aterrizaje de SEO local para agrodroncanarias.es (tratamientos agrícolas con dron: abonado foliar, bioestimulantes y otros productos permitidos; DJI Agras T50; base en Santa Cruz de La Palma). "
      f"Se han redactado **{len(paginas)} páginas** en Markdown con frontmatter para WordPress: {niveles['A']} municipios de La Palma (nivel A), {niveles['B']} municipios de otras islas (nivel B), {niveles['hub']} páginas hub de isla y {niveles['cultivo']} páginas de cultivo. "
      f"Todas pasan el control de calidad (0 errores) y el control de similitud (máximo 12,2 % frente al umbral del 30 %). Hay **{total_verificar} marcas [VERIFICAR]** repartidas por las páginas, listadas al final de este informe.\n")

    w("## 1. Dónde está todo\n")
    w("- Este trabajo se ha hecho en el repositorio `juansimonjaime/uned-la-palma-hub`, rama `claude/adoring-heisenberg-mw6kaw`, porque el repositorio `agrodron-landings` que preveía la guía no existe en la cuenta. Nada del proyecto web existente se ha tocado: todo va en carpetas propias.\n"
      "- `paginas/la-palma/`, `paginas/tenerife/`, `paginas/gran-canaria/`, `paginas/lanzarote/`, `paginas/fuerteventura/`, `paginas/la-gomera/`, `paginas/el-hierro/`: una página por municipio con página propia.\n"
      "- `paginas/islas/`: una página hub por isla. `paginas/cultivos/`: una página por cultivo.\n"
      "- `data/municipios.csv`: los 88 municipios con nivel, justificación, cultivos, superficie, orografía, clima, plagas documentadas y fuentes. `data/cultivos.csv`: datos por cultivo. `data/notas/*.md`: notas ampliadas con citas y URL por isla y por cultivo. `data/fragments/`: los CSV originales de la investigación por isla.\n"
      "- `data/brief_redaccion.md`: el brief que han seguido todas las páginas (estilo, SEO, marco legal, frontmatter, JSON-LD). `data/instrucciones_redactor_municipios.md`: instrucciones de proceso para los redactores.\n"
      "- `scripts/control_calidad.py` (SEO, estructura, frases prohibidas, JSON-LD), `scripts/similitud.py` (similitud entre páginas), `scripts/consolidar_datos.py` (genera municipios.csv), `scripts/generar_informe.py` (este informe). Resultados en `data/control/`.\n")

    w("## 2. Arquitectura por niveles y justificación\n")
    w("Criterio: nivel A = los 14 municipios de La Palma (encargo). Nivel B = municipios de otras islas con agricultura significativa **al aire libre** según los datos de la Fase 1 (el dron no trata cultivo bajo malla o invernadero, así que un municipio de tomate de exportación bajo plástico no justifica página aunque facture mucho). Nivel C = sin página propia; se nombran en el hub de su isla con una frase sobre el porqué. La propuesta inicial de la investigación y la decisión final están en la columna `justificacion_nivel` de `data/municipios.csv`.\n")
    for isla, slug_isla in ISLAS.items():
        rows = [r for r in filas if r["isla"] == isla]
        w(f"### {isla}\n")
        for nivel, etiqueta in (("A", "Nivel A (página completa)"), ("B", "Nivel B (página propia)"), ("C", "Nivel C (sin página, citado en el hub)")):
            sel = [r for r in rows if r["nivel"] == nivel]
            if not sel:
                continue
            w(f"**{etiqueta}: {len(sel)}**\n")
            for r in sel:
                just = r["justificacion_nivel"].split(" | Propuesta inicial")[0].strip()
                if nivel == "A":
                    just = just.replace("Encargo: los 14 municipios de La Palma van a nivel A. ", "")
                w(f"- {r['municipio']}: {just}")
            w("")

    w("## 3. Estructura de URLs propuesta\n")
    w("| Tipo | Archivo | `slug` | `parent` | URL en WordPress |\n|---|---|---|---|---|\n"
      "| Hub de isla | `paginas/islas/{isla}.md` | `dron-agricola-{isla}` | vacío | `https://agrodroncanarias.es/dron-agricola-{isla}/` |\n"
      "| Municipio | `paginas/{isla}/{municipio}.md` | `{municipio}` | `dron-agricola-{isla}` | `https://agrodroncanarias.es/dron-agricola-{isla}/{municipio}/` |\n"
      "| Cultivo | `paginas/cultivos/{cultivo}.md` | `dron-agricola-{cultivo}` | vacío | `https://agrodroncanarias.es/dron-agricola-{cultivo}/` |\n")
    w("Los enlaces internos de todas las páginas ya apuntan a estas URL absolutas (municipio → hub de isla → cultivo; hub → municipios; cultivo → hubs y municipios). Si la web usa otra estructura de permalinks, hay que sustituir la raíz `https://agrodroncanarias.es/` o las rutas antes de publicar. Comprobado: 0 enlaces internos rotos entre las 77 páginas.\n")

    w("## 4. Lista de páginas\n")
    def tabla(sel, con_isla=False):
        w("| Página | Título | URL | Palabras | [VERIFICAR] |\n|---|---|---|---|---|")
        for rel in sel:
            fm, pal, ver = paginas[rel]
            w(f"| `{rel}` | {fm['title']} | {url_de(fm)} | {pal} | {len(ver)} |")
        w("")
    w("### Hubs de isla\n")
    tabla([r for r in paginas if r.startswith("paginas/islas/")])
    w("### Nivel A: La Palma\n")
    tabla([r for r in paginas if r.startswith("paginas/la-palma/")])
    for isla, slug_isla in list(ISLAS.items())[1:]:
        sel = [r for r in paginas if r.startswith(f"paginas/{slug_isla}/")]
        if sel:
            w(f"### Nivel B: {isla}\n")
            tabla(sel)
    w("### Cultivos\n")
    tabla([r for r in paginas if r.startswith("paginas/cultivos/")])

    w("## 5. Fase 1: datos y fuentes\n")
    w("- Lista de municipios: los 88 municipios oficiales de Canarias (ISTAC), repartidos por isla. Datos por municipio en `data/municipios.csv` con la fuente y el año en cada celda.\n"
      "- Fuentes principales: ISTAC (estadística de superficies 2021–2025), Mapa de Cultivos de Canarias (Gobierno de Canarias/GRAFCAN, campañas 2017–2024), Cabildos (Agrocabildo, Cabildo de La Palma, Cabildo de Gran Canaria), ICIA, MAPA (Anuario, nota MAPA–AESA 2018, plan cotonet), consejos reguladores de las DO, ASPROCAN/Coplaca, ULL/ULPGC y prensa regional cuando cita a técnicos o a la administración.\n"
      "- **Limitación importante**: la red de la sesión en la nube bloqueaba la lectura directa de gobiernodecanarias.org, istac, boe.es, mapa.gob.es, agrocabildo.org, ag.dji.com y la mayoría de la prensa canaria. Todas las cifras proceden de resúmenes de búsqueda web con la URL de la fuente anotada, no de la lectura íntegra del documento. Por eso hay tantas marcas [VERIFICAR] y por eso conviene abrir cada URL de `data/notas/` antes de publicar una cifra. El presupuesto de búsquedas de la sesión se agotó, así que quedaron consultas sin hacer (superficie municipal de la mayoría de municipios fuera de La Palma, % de platanera bajo malla, hectáreas por cultivo y municipio). La forma rápida de cerrar casi todos los [VERIFICAR] de superficie es descargar el CSV municipal del ISTAC (E01135A_000003) y el Mapa de Cultivos de Canarias (datos.gob.es, actualización 20-06-2024).\n"
      "- Datos de la empresa usados en las páginas: solo los del encargo y la indicación posterior del responsable sobre el servicio (base en Santa Cruz de La Palma, junio de 2025, DJI Agras T50 líquido, piloto con más de 10 años, certificados AESA/EASA PDRA-S01 y operador STS, radiofonista, La Palma sin desplazamiento y resto de Canarias con desplazamiento y bajo consulta). Del T50 se citan solo depósito de 40 L, caudal 16/24 L/min y seguimiento de terreno por radar y visión binocular (ficha DJI vía distribuidores); la anchura de pulverización y las hectáreas/hora no se citan por no estar confirmadas.\n")

    w("## 6. Enfoque del servicio y normativa: lo que afirman las páginas y con qué fuente\n")
    w("Por indicación del responsable, en ninguna página aparece la palabra fitosanitario (ni sus derivados, ni plaguicida, fungicida, insecticida, herbicida, ni fumigar): Agrodrón no ofrece ese servicio en Canarias. El servicio se describe como **tratamientos agrícolas con dron**: pulverización de abonos foliares, bioestimulantes, correctores de carencias y otros productos de uso permitido, sobre cultivo al aire libre. Las plagas y enfermedades documentadas aparecen como contexto del agricultor, con su fuente, y el control de la plaga se remite a los servicios de sanidad vegetal; el dron no se presenta como herramienta contra plagas ni se promete ningún resultado. El script de control rechaza cualquier página con esas palabras, también en el frontmatter.\n")
    w("Cada página lleva como máximo un párrafo de normativa y condiciones, redactado distinto, con solo estas afirmaciones:\n"
      "1. El operador vuela en la categoría específica de AESA/EASA, en escenarios estándar (STS) o bajo PDRA-S01, con piloto certificado (AESA, ámbito drones; Reglamento de Ejecución (UE) 2019/947).\n"
      "2. Cada vuelo se planifica sobre el mapa de la parcela y se comprueban las zonas geográficas de UAS (mapa de ENAIRE, https://drones.enaire.es/); las páginas de municipios con aeropuerto (Breña Baja, La Laguna, San Miguel de Abona, Telde) solo dicen que la cercanía condiciona la planificación.\n"
      "3. Solo se aplican productos de uso permitido en el cultivo, a la dosis de su etiqueta, y solo sobre cultivo al aire libre (práctica de la empresa, sin cita normativa).\n"
      "4. Con viento fuerte, lluvia o niebla no se vuela (práctica operativa, sin cifra de viento).\n"
      "\n**Pendiente de confirmar con Agrodrón**: la lista exacta de productos que aplica (abonos foliares, bioestimulantes, correctores u otros). Las páginas usan la fórmula genérica \"abonos foliares, bioestimulantes y otros productos de uso permitido\".\n")
    w("## 7. Control de similitud\n")
    w("Métrica: proporción de secuencias de 5 palabras de una página que aparecen también en otra (detecta texto plantilla), tomando el máximo de las dos direcciones; se informa además el coseno TF-IDF de vocabulario como dato secundario. Umbral del encargo: 30 %. Resultado sobre las 77 páginas (frontmatter y JSON-LD excluidos):\n")
    ruta_sim = os.path.join(RAIZ, "data", "control", "similitud.md")
    if os.path.exists(ruta_sim):
        w(open(ruta_sim, encoding="utf-8").read())
    w("Ningún par supera el umbral; ninguna página ha necesitado reescritura por similitud. Los pares más altos (12,2 % como máximo) corresponden a municipios de la misma comarca vitícola que comparten el párrafo legal obligatorio y los mismos avisos del Cabildo, con redacción distinta. Los pares hub–municipio con coseno alto (Fuerteventura, La Gomera) comparten vocabulario de isla, no frases.\n")

    w("## 8. Control de calidad SEO\n")
    w("`scripts/control_calidad.py` comprueba en cada página: frontmatter completo (title ≤60, meta 120–155, slug válido, parent correcto), longitud por nivel (A 900–1.300, B y hub 700–1.000, cultivo 800–1.300), keyword en title, H1, primer párrafo, un H2 y meta, un solo H1, FAQ con 4–6 preguntas idénticas a las del JSON-LD, JSON-LD válido con Service + FAQPage + areaServed, CTA con enlace y la palabra presupuesto, marcadores [IMAGEN] con alt, enlaces internos obligatorios, aviso de desplazamiento fuera de La Palma, frases prohibidas (incluidas las palabras vetadas por el responsable) y exclamaciones. Resultado: **77 páginas, 0 errores**. Tabla completa en `data/control/calidad.md`.\n")

    w("## 9. Orden recomendado de publicación\n")
    w("No publicar todo de golpe. Propuesta por tandas, siempre primero el hub de la isla y después sus municipios, para que los enlaces internos tengan destino:\n")
    w("| Tanda | Páginas | Notas |\n|---|---|---|\n"
      "| Semana 1 | Hub La Palma + 14 municipios de La Palma, en este orden: Los Llanos de Aridane, Tazacorte, Villa de Mazo, Tijarafe, El Paso, Garafía, Fuencaliente, San Andrés y Sauces, Barlovento, Breña Alta, Puntagorda, Puntallana, Breña Baja, Santa Cruz de La Palma | Es el mercado real sin desplazamiento. Revisar primero los [VERIFICAR] de estas páginas y añadir fotos propias. |\n"
      "| Semana 2 | 10 páginas de cultivo: platanera, viña, aguacate, papa, frutales subtropicales, cítricos, almendro, hortalizas, tomate, flores | Reciben enlaces de todos los municipios. |\n"
      "| Semanas 3–4 | Hub Tenerife + 22 municipios (dos tandas de 11) | Empezar por Valle de La Orotava e Isla Baja (platanera y papa), seguir con Acentejo, La Laguna y el sur. |\n"
      "| Semana 5 | Hub Gran Canaria + 12 municipios | Norte platanero primero (Gáldar, Guía, Arucas, Moya). |\n"
      "| Semana 6 | Hub Lanzarote + 6 municipios | Viña de La Geria y enarenados. |\n"
      "| Semana 7 | Hub La Gomera + 3 municipios; hub El Hierro + Frontera | Islas vecinas de La Palma. |\n"
      "| Semana 8 | Hub Fuerteventura + Antigua y Tuineje | La isla con menos cultivo tratable; página honesta. |\n")

    w("## 10. Cómo pasar las páginas a WordPress\n")
    w("- Crear **páginas** (no entradas) en **borrador**, con el `title`, `slug` y `meta_description` del frontmatter en el plugin de SEO, y la jerarquía `parent` → hija (los hubs y los cultivos son páginas de primer nivel).\n"
      "- El bloque ```json del final de cada página es el JSON-LD (Service + FAQPage): insertarlo en un bloque HTML personalizado como `<script type=\"application/ld+json\">…</script>`.\n"
      "- Los marcadores `[IMAGEN: descripción | alt: texto]` indican dónde va cada foto y su texto alternativo; sustituirlos por fotos reales (una finca de esa zona vale más que cualquier banco de imágenes).\n"
      "- La llamada a la acción enlaza a `https://agrodroncanarias.es/`; si existe una página de contacto o presupuesto, sustituir ese enlace en todas las páginas [VERIFICAR: URL de contacto].\n"
      "- Las marcas `[VERIFICAR: …]` del cuerpo deben resolverse antes de publicar: confirmar el dato y quitar la marca, o borrar la frase.\n")

    w("## 11. Decisiones tomadas que conviene conocer\n")
    w("- Keyword principal: `dron agrícola en {Municipio}` en municipios y hubs, `dron agrícola para {cultivo}` en cultivos; variantes reales en el cuerpo (tratamiento con drones, pulverización con dron, dron pulverizador, abonado foliar con dron). Para La Laguna se usa el nombre corto; para Güímar, Santa María de Guía, Guía de Isora y Valle Gran Rey, el nombre de uso común.\n"
      "- Longitud de las páginas de cultivo fijada en 800–1.300 palabras (el encargo no la especificaba).\n"
      "- Cinco esqueletos distintos (del cultivo al dron, del terreno al dron, preguntas del agricultor, por zonas, calendario) asignados por rotación para que páginas con datos parecidos se lean distintas.\n"
      "- Las páginas de municipios con cultivo mayoritario bajo cubierta (La Aldea, Arona, Guía de Isora, Antigua, Tuineje, Frontera…) dicen sin rodeos qué no se trata con dron y centran el servicio en lo que va al aire libre.\n"
      "- Ninguna página da precios, clientes, casos, cifras de ahorro ni promete plazos o resultados.\n"
      "- Donde el encargo y los datos discrepaban (Tazacorte, Tinajo, Villa de Mazo, Fuencaliente), mandaron los datos y así consta en la página.\n")

    w("## 12. Todas las marcas [VERIFICAR] por página\n")
    w(f"Total: {total_verificar} marcas en el cuerpo de las páginas (las del JSON-LD repiten las de la FAQ). Hay que confirmar el dato o pedir que se quite la frase.\n")
    for rel in paginas:
        fm, pal, ver = paginas[rel]
        if not ver:
            continue
        w(f"### `{rel}` ({len(ver)})\n")
        for v in ver:
            w(f"- {v}")
        w("")
    w("Además, en `data/notas/*.md` cada isla y los cultivos tienen una sección \"Pendiente de verificar\" con los datos que no se pudieron confirmar durante la investigación.\n")

    with open(os.path.join(RAIZ, "informe.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"informe.md generado: {len(paginas)} páginas, {total_verificar} marcas [VERIFICAR]")


if __name__ == "__main__":
    main()
