# Brief de redacción – landings SEO Agrodrón Canarias

Este documento es la única referencia de estilo, estructura y límites para todas las páginas de `/paginas/`. Quien redacte una página lo lee entero antes de escribir y lo cumple al pie de la letra. Los datos locales salen de `/data/municipios.csv`, `/data/cultivos.csv` y las notas de `/data/notas/`.

## 1. Hechos de la empresa que SÍ se pueden afirmar

- Nombre: **Agrodrón Canarias**. Web: https://agrodroncanarias.es/. Base en **Santa Cruz de La Palma**. Fundada en **junio de 2025**.
- Servicio: **tratamientos agrícolas con dron**: pulverización de productos líquidos de uso permitido en el cultivo (abonos foliares, bioestimulantes, correctores de carencias y otros productos permitidos), aplicados con el **DJI Agras T50** (sistema líquido). En las páginas se habla de "tratamientos agrícolas con dron", "pulverización con dron", "abonado foliar con dron", "aplicaciones con dron" o "dron pulverizador". La lista exacta de productos que aplica Agrodrón está pendiente de confirmar con el responsable (consta en el informe, no en las páginas).
- Equipo adicional: **tolva para productos sólidos** (p. ej. abonos granulados). Se menciona una vez en la sección final de cada página, sin cifras, sin productos concretos y sin prometer resultados; nunca para plaguicidas ni nada vetado en el punto 2.
- Datos del T50 que se pueden citar (fuente: ficha técnica de DJI y distribuidores oficiales): depósito de pulverización de **40 litros**; caudal de hasta **16 L/min** con dos boquillas centrífugas y **24 L/min** con cuatro; radar de matriz en fase y visión binocular para **seguir el relieve y detectar obstáculos**; ajusta la velocidad de vuelo a la pendiente. NO citar anchura de pulverización ni hectáreas/hora (no confirmadas).
- Responsable: **piloto con más de 10 años de experiencia profesional**, con **certificados AESA/EASA (PDRA-S01, operador STS)** y **radiofonista**. No añadir otros títulos.
- Ámbito: **La Palma, sin desplazamiento**. **Resto de Canarias: servicio con desplazamiento y bajo consulta/disponibilidad.** Toda página fuera de La Palma lo dice de forma clara en el primer tercio de la página y otra vez en la FAQ o la llamada a la acción.
- Cómo se trabaja (descripción sobria, sin prometer resultados): se recogen los datos de la finca (ubicación, cultivo, superficie, accesos, obstáculos como cables, invernaderos o árboles altos); se planifica el vuelo sobre el mapa de la parcela y se comprueban las zonas geográficas de UAS (ENAIRE); se comprueban viento y condiciones antes de volar; se aplica el producto a la dosis que marca su etiqueta; se registra la aplicación. El dron solo trata **cultivo al aire libre**: lo que esté bajo malla o invernadero no se puede tratar desde el aire.
- Plagas y enfermedades: las páginas pueden describir los problemas documentados del municipio o del cultivo (con fuente) como contexto del agricultor, pero **el dron no se presenta como herramienta contra plagas**. Su papel es la nutrición foliar y la bioestimulación del cultivo (vigor, recuperación tras estrés por calor, viento, ceniza o sequía), siempre como finalidad del producto y nunca como resultado garantizado. El control de la plaga es asunto de los servicios de sanidad vegetal del Cabildo o del Gobierno de Canarias y de las herramientas que ellos indican (trampas, control biológico, labores), y así puede decirse.
- Llamada a la acción: pedir presupuesto en https://agrodroncanarias.es/contacto (enlace obligatorio). Si se quiere un texto como "cuéntanos finca, cultivo y superficie y te decimos si el dron encaja", bien; nada de plazos ni precios.

## 2. Lo que NO se puede afirmar nunca

- La palabra **fitosanitario** en cualquiera de sus formas, ni "fitos", ni plaguicida, pesticida, fungicida, insecticida, acaricida o herbicida, ni "fumigar" o "fumigación". Agrodrón no ofrece ese servicio en Canarias y el responsable no quiere que aparezca en ninguna página. Tampoco se cita el Real Decreto 1311/2012, el "plan de aplicación", la "aplicación aérea de productos", el "anexo VI", la nota MAPA–AESA ni la "autorización previa del órgano competente": todo eso pertenece al régimen de esos productos y no a este servicio.
- Que el dron combate, controla, elimina o previene una plaga o enfermedad; que un producto "trata" el picudo, la cochinilla, el mildiu, etc.
- Precios, tarifas, "desde X €", descuentos.
- Clientes, fincas tratadas, testimonios, casos de éxito, cifras de ahorro, "hemos tratado X hectáreas".
- Resultados agronómicos garantizados ("aumenta la cosecha", "la planta se recupera").
- Nada sobre normativa sin fuente oficial (ver punto 3).
- Datos locales que no estén en `/data/`. Si hace falta un dato que no está, se escribe cualitativo o se marca [VERIFICAR: qué hay que comprobar].

## 3. Normativa y condiciones: frases permitidas (con su fuente) y cómo usarlas

Como máximo un párrafo corto por página, redactado distinto cada vez. Solo estas afirmaciones:

1. "Agrodrón vuela en la **categoría específica** de AESA/EASA, en escenarios estándar (STS) o bajo el análisis de riesgo predefinido **PDRA-S01**, con piloto certificado." Fuente: AESA, ámbito drones (https://www.seguridadaerea.gob.es/es/ambitos/drones) y Reglamento de Ejecución (UE) 2019/947.
2. "Cada vuelo se planifica sobre el mapa de la parcela y se comprueban las **zonas geográficas de UAS** (cercanía de aeropuertos, zonas restringidas)." Fuente: mapa de zonas geográficas de UAS de ENAIRE (https://drones.enaire.es/).
3. "Solo se aplican **productos de uso permitido en el cultivo**, a la dosis que marca su etiqueta, y solo sobre cultivo al aire libre." Sin cita normativa: es la práctica de la empresa.
4. "Con viento fuerte, lluvia o niebla no se vuela; la ventana se decide en la finca el mismo día." Práctica operativa, sin cifra de viento (no confirmada).

Cómo se traduce para el agricultor: el dron pulveriza abonos foliares, bioestimulantes y otros productos permitidos sobre cultivos al aire libre; el agricultor aporta los datos de la parcela y el producto que quiere aplicar. Decirlo así, sin convertir la página en un texto jurídico.

## 4. Arquitectura, slugs y enlaces internos

| Tipo | Archivo | slug (frontmatter) | parent (frontmatter) | URL resultante |
|---|---|---|---|---|
| Hub de isla | `/paginas/islas/{isla}.md` | `dron-agricola-{isla}` | *(vacío)* | `https://agrodroncanarias.es/dron-agricola-{isla}/` |
| Municipio | `/paginas/{isla}/{municipio}.md` | `{municipio}` | `dron-agricola-{isla}` | `https://agrodroncanarias.es/dron-agricola-{isla}/{municipio}/` |
| Cultivo | `/paginas/cultivos/{cultivo}.md` | `dron-agricola-{cultivo}` | *(vacío)* | `https://agrodroncanarias.es/dron-agricola-{cultivo}/` |

Slugs de isla: `la-palma`, `tenerife`, `gran-canaria`, `lanzarote`, `fuerteventura`, `la-gomera`, `el-hierro`. Slugs de municipio: los de `/data/municipios.csv`. Slugs de cultivo: los de `/data/cultivos.csv` (`platanera`, `vina`, `aguacate`, `papa`, `tomate`, `frutales-subtropicales`, `citricos`, `almendro`, `horticolas`, `aloe-vera`, `flores-ornamentales`...).

Enlaces internos obligatorios (en markdown, con URL absoluta):
- Página de municipio → su hub de isla (1 enlace) y 1–2 páginas de cultivo de sus cultivos principales. Opcional: 1 municipio vecino.
- Hub de isla → todas sus páginas de municipio (niveles A/B) y 2–4 páginas de cultivo. Los municipios de nivel C se nombran en el texto del hub sin enlace.
- Página de cultivo → los hubs de las islas donde pesa ese cultivo (2–4) y 2–4 municipios destacados.
- El texto del enlace describe el destino ("tratamientos con dron en la platanera", "dron agrícola en Tijarafe"), nunca "aquí" ni "más información".

## 5. Frontmatter (obligatorio, exactamente estas claves, valores entre comillas dobles)

```
---
title: "Dron agrícola en Tazacorte | Agrodrón Canarias"
slug: "tazacorte"
meta_description: "Entre 120 y 155 caracteres, con la palabra clave y una razón concreta para pedir presupuesto."
keyword: "dron agrícola en Tazacorte"
keywords_secundarias: "pulverización con dron en Tazacorte, tratamiento con drones en platanera, abonado foliar con dron La Palma, dron pulverizador Tazacorte"
parent: "dron-agricola-la-palma"
nivel: "A"
isla: "La Palma"
municipio: "Tazacorte"
---
```

- `nivel`: `A` (municipios de La Palma), `B` (municipios de otras islas con página), `hub` (página de isla), `cultivo`.
- `title`: máximo **60 caracteres**, con la keyword al principio. Fórmulas: municipio → `Dron agrícola en {Municipio} | Agrodrón Canarias` (si pasa de 60, usar `| Agrodrón`); hub → `Dron agrícola en {Isla} | Agrodrón Canarias`; cultivo → `Dron agrícola para {cultivo} en Canarias | Agrodrón`.
- `keyword` principal: municipio → `dron agrícola en {Municipio}`; hub → `dron agrícola en {Isla}`; cultivo → `dron agrícola para {cultivo}` (ej. `dron agrícola para platanera`, `dron agrícola para viña`, `dron agrícola para papa`).
- `meta_description`: 120–155 caracteres, contiene la keyword tal cual, sin exclamaciones.
- En hubs y cultivos, `municipio` se deja vacío (`""`) y en cultivos `isla` también.

## 6. Reglas SEO que el script comprueba

- La keyword principal aparece **tal cual** (mayúsculas y tildes no importan) en: `title`, H1, primer párrafo tras el H1, al menos un H2 y `meta_description`. Una vez en cada sitio basta; no repetirla más de 5–6 veces en toda la página.
- Usar variantes reales en el cuerpo: "tratamiento con drones", "pulverización con dron", "dron pulverizador", "abonado foliar con dron", "bioestimulantes con dron", "tratamientos agrícolas con dron", "dron para plataneras".
- Un solo H1. Entre 5 y 8 H2. H3 solo para las preguntas de la FAQ y, si hace falta, para subapartados.
- Párrafos de 2–4 líneas (máximo ~70 palabras). Listas cuando haya tres o más elementos paralelos.
- Marcadores de imagen con alt: `[IMAGEN: descripción de la foto que debería ir aquí | alt: texto alternativo descriptivo con el lugar y el cultivo]`. Entre 2 y 4 por página; la primera justo después del primer párrafo.
- Sin exclamaciones. Sin emojis. Sin negritas en frases completas.

## 7. Estructura obligatoria y variantes de esqueleto

Toda página tiene: H1 → primer párrafo con la keyword y una razón local concreta → [IMAGEN] → entre 5 y 8 H2 → H2 "Preguntas frecuentes…" (con 4–6 H3 que terminan en `?`) → H2 de llamada a la acción con enlace a agrodroncanarias.es y la palabra "presupuesto" → bloque JSON-LD al final dentro de un fence ```json.

Para que ninguna página se parezca a otra, cada una usa UNO de estos esqueletos (se asigna en el encargo de cada redactor) y además ordena y titula sus H2 a su manera:

- **E1 – Del cultivo al dron**: cultivo dominante y cómo está plantado → problema fitosanitario documentado → por qué el dron encaja en esas parcelas → cómo se organiza un tratamiento → límites (malla, viento, productos permitidos) → otros cultivos del municipio → FAQ → CTA.
- **E2 – Del terreno al dron**: orografía y accesos (bancales, barrancos, pendientes) → qué cuesta tratar hoy esas fincas (mochila, tractor, atomizador) → qué cambia con el dron → cultivos y plagas del municipio → normativa aérea y productos permitidos en dos frases → FAQ → CTA.
- **E3 – Pregunta del agricultor**: H2 que son las preguntas reales ("¿Se puede fumigar con dron una finca de X?") → respuestas con datos del municipio → qué hace falta para contratar → qué cultivos tienen sentido y cuáles no → FAQ → CTA.
- **E4 – Por zonas**: el municipio dividido en zonas agrícolas (costa / medianías / cumbre, o barrios y pagos reales) con cultivo, pendiente y encaje del dron en cada una → plagas documentadas → cómo se trabaja → FAQ → CTA.
- **E5 – Calendario**: el año agrícola del municipio (épocas de riesgo documentadas de sus cultivos) → qué tratamientos encajan con dron en cada época → terreno y accesos → condiciones (viento, humedad) → normativa aérea y productos permitidos → FAQ → CTA.

Hubs de isla: visión de la agricultura de la isla con datos (ha, cultivos, % del archipiélago), mapa por comarcas, lista enlazada de municipios con página y mención de los que no la tienen, cultivos enlazados, condiciones de servicio (desplazamiento si no es La Palma), normativa aérea y productos permitidos, FAQ, CTA.

Páginas de cultivo: el cultivo en Canarias con datos (ha, islas, al aire libre vs cubierta), altura y marco de plantación y qué implica para el dron, plagas y enfermedades documentadas como contexto (épocas de riesgo), qué aplicaciones foliares tienen sentido con dron y qué queda fuera (malla, invernadero), enlaces a islas y municipios donde pesa el cultivo, FAQ, CTA.

## 8. Estilo

Escribe como un técnico agrícola canario con años de campo que le explica algo a un agricultor de confianza, de "tú". Directo, concreto, práctico. Primera línea ya con sustancia (un dato del municipio, una pendiente, una plaga, una finca típica), nada de introducciones.

Vocabulario del campo canario cuando encaje y sea correcto: finca, bancal, platanera, piña (de plátano), sorriba, tratamiento, cosecha, zafra, medianías, costa, cumbre, barranco, pago, caserío, parral, enarenado, gavia, zoco, hoyo (viña de Lanzarote), malla, cortavientos, cadena de riego, empaquetado.

Frases de longitud variada. Alguna muy corta. Cada párrafo aporta un dato, un ejemplo o una razón; si no aporta nada, se borra.

PROHIBIDO (el script lo detecta y la página se rechaza): "fitosanitario/a/os/as", "fitos", "plaguicida", "pesticida", "fungicida", "insecticida", "acaricida", "herbicida", "fumigar", "fumigación", "Real Decreto 1311/2012", "plan de aplicación", "aplicación aérea", "anexo VI", "MAPA–AESA", "órgano competente", "autorización previa", "En el mundo actual", "La agricultura moderna", "hoy en día", "en la actualidad", "sin duda", "en definitiva", "en resumen", "en conclusión", "cabe destacar", "es importante destacar", "revolucionario/a", "innovador/a", "vanguardia", "descubre", "sumérgete", "potencia al máximo", "la solución perfecta", "de última generación", "el futuro de la agricultura", exclamaciones, listas de tres adjetivos seguidos, conclusiones que repiten lo ya dicho, y cualquier párrafo que valga igual para otro municipio cambiando el nombre.

Tampoco: metáforas grandilocuentes, preguntas retóricas encadenadas, "imagina que…", "no te preocupes", "estamos aquí para ayudarte", "nuestro equipo de expertos", "soluciones integrales", "a medida" como coletilla.

Español de España (coger, vosotros/tú, ordenador). Tildes y mayúsculas correctas en topónimos: Los Llanos de Aridane, El Paso, Breña Alta, Fuencaliente de la Palma (en texto se puede decir Fuencaliente), San Andrés y Sauces, Villa de Mazo (o Mazo), Puntagorda, Garafía, Tijarafe, Puntallana, Barlovento, Tazacorte, Breña Baja, Santa Cruz de La Palma.

## 9. Anti-plantilla (regla dura)

- Ningún párrafo, frase de servicio, párrafo de normativa aérea, pregunta de FAQ ni CTA se repite entre páginas. Cada página redacta lo suyo desde cero con sus propios ejemplos.
- La descripción del T50 y de cómo se trabaja se cuenta en cada página desde el ángulo local (por qué el seguimiento de terreno importa en los bancales de Tijarafe; por qué el depósito de 40 L casa con fincas de platanera de 1 ha en Tazacorte; por qué el viento manda en Garafía). Nunca como ficha repetida.
- Las FAQ son locales: nombran el municipio, su cultivo o su problema. Una pregunta de precio se responde sin cifras: depende de superficie, cultivo, accesos y producto, y se cierra con el presupuesto.
- Al terminar, el redactor relee la página y reescribe cualquier frase que suene a texto genérico de IA. El script de similitud rechaza pares de páginas con más del 30 % de secuencias de 5 palabras compartidas.

## 10. Datos y fuentes dentro del texto

- Las cifras del municipio salen de `/data/municipios.csv` y `/data/notas/{isla}.md`. Se citan con la fuente en la frase ("según el Mapa de Cultivos de Canarias", "según el ISTAC", "datos del Cabildo de La Palma") y, si la nota lo indica, con el año.
- Lo que en los datos venga como [VERIFICAR] se mantiene en la página como `[VERIFICAR: dato]` o se omite. Nunca se "redondea" a una cifra inventada.
- Si un dato de los archivos contradice lo que el redactor cree saber, manda el archivo o se marca [VERIFICAR].

## 11. Longitud (sin frontmatter ni JSON-LD)

- Nivel A (municipios de La Palma): 900–1.300 palabras.
- Nivel B (municipios de otras islas) y hubs de isla: 700–1.000 palabras (tolerancia hasta 1.040 por la frase de la tolva en la llamada a la acción).
- Cultivos: 800–1.300 palabras.

## 12. Plantilla del bloque JSON-LD (adaptar nombres, URL, areaServed y FAQ; debe ser JSON válido)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Tratamientos agrícolas con dron en Tazacorte",
      "serviceType": "Tratamiento agrícola con dron (pulverización de abonos foliares y bioestimulantes)",
      "description": "Una o dos frases propias de la página.",
      "url": "https://agrodroncanarias.es/dron-agricola-la-palma/tazacorte/",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Agrodrón Canarias",
        "url": "https://agrodroncanarias.es/",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Santa Cruz de La Palma",
          "addressRegion": "Canarias",
          "addressCountry": "ES"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": "Tazacorte",
        "containedInPlace": { "@type": "AdministrativeArea", "name": "La Palma" }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Texto exacto de la pregunta H3",
          "acceptedAnswer": { "@type": "Answer", "text": "Texto de la respuesta sin markdown." }
        }
      ]
    }
  ]
}
```

Para hubs: `areaServed` es `{"@type": "AdministrativeArea", "name": "Tenerife", "containedInPlace": {"@type": "AdministrativeArea", "name": "Canarias"}}`. Para cultivos: `areaServed` es `{"@type": "AdministrativeArea", "name": "Canarias"}`. Las preguntas del JSON-LD son exactamente las H3 de la FAQ, con sus respuestas.

## 13. Comprobación antes de entregar una página

```
python3 scripts/control_calidad.py --solo paginas/la-palma/tazacorte.md
```
Debe dar 0 errores. Después, el control de similitud se pasa sobre el conjunto:
```
python3 scripts/similitud.py
```
