# Informe: landings SEO local de Agrodrón Canarias

Entrega del encargo maestro: páginas de aterrizaje de SEO local para agrodroncanarias.es (tratamientos agrícolas con dron: abonado foliar, bioestimulantes y otros productos permitidos; DJI Agras T50; base en Santa Cruz de La Palma). Se han redactado **77 páginas** en Markdown con frontmatter para WordPress: 14 municipios de La Palma (nivel A), 46 municipios de otras islas (nivel B), 7 páginas hub de isla y 10 páginas de cultivo. Todas pasan el control de calidad (0 errores) y el control de similitud (máximo 12,2 % frente al umbral del 30 %). Hay **275 marcas [VERIFICAR]** repartidas por las páginas, listadas al final de este informe.

## 1. Dónde está todo

- Este trabajo se ha hecho en el repositorio `juansimonjaime/uned-la-palma-hub`, rama `claude/adoring-heisenberg-mw6kaw`, porque el repositorio `agrodron-landings` que preveía la guía no existe en la cuenta. Nada del proyecto web existente se ha tocado: todo va en carpetas propias.
- `paginas/la-palma/`, `paginas/tenerife/`, `paginas/gran-canaria/`, `paginas/lanzarote/`, `paginas/fuerteventura/`, `paginas/la-gomera/`, `paginas/el-hierro/`: una página por municipio con página propia.
- `paginas/islas/`: una página hub por isla. `paginas/cultivos/`: una página por cultivo.
- `data/municipios.csv`: los 88 municipios con nivel, justificación, cultivos, superficie, orografía, clima, plagas documentadas y fuentes. `data/cultivos.csv`: datos por cultivo. `data/notas/*.md`: notas ampliadas con citas y URL por isla y por cultivo. `data/fragments/`: los CSV originales de la investigación por isla.
- `data/brief_redaccion.md`: el brief que han seguido todas las páginas (estilo, SEO, marco legal, frontmatter, JSON-LD). `data/instrucciones_redactor_municipios.md`: instrucciones de proceso para los redactores.
- `scripts/control_calidad.py` (SEO, estructura, frases prohibidas, JSON-LD), `scripts/similitud.py` (similitud entre páginas), `scripts/consolidar_datos.py` (genera municipios.csv), `scripts/generar_informe.py` (este informe). Resultados en `data/control/`.

## 2. Arquitectura por niveles y justificación

Criterio: nivel A = los 14 municipios de La Palma (encargo). Nivel B = municipios de otras islas con agricultura significativa **al aire libre** según los datos de la Fase 1 (el dron no trata cultivo bajo malla o invernadero, así que un municipio de tomate de exportación bajo plástico no justifica página aunque facture mucho). Nivel C = sin página propia; se nombran en el hub de su isla con una frase sobre el porqué. La propuesta inicial de la investigación y la decisión final están en la columna `justificacion_nivel` de `data/municipios.csv`.

### La Palma

**Nivel A (página completa): 14**

- Barlovento: Importancia agrícola relativa: alta (platanera costera + principal municipio papero de la isla)
- Breña Alta: Importancia agrícola relativa: media (aguacate en expansión, viña DO Hoyo de Mazo, platanera reducida)
- Breña Baja: Importancia agrícola relativa: media-baja (superficie pequeña pero platanera costera y aguacate consolidados)
- El Paso: Importancia agrícola relativa: alta (4ª-5ª superficie agrícola, aguacate, almendro, viña, sin costa)
- Fuencaliente de La Palma: Importancia agrícola relativa: alta (mayor superficie de viña de la isla + platanera costera)
- Garafía: Importancia agrícola relativa: alta (5ª superficie agrícola de la isla, papa, viña, almendro, ganadería)
- Los Llanos de Aridane: Importancia agrícola relativa: alta (1ª superficie agrícola de la isla, capital platanera)
- Puntagorda: Importancia agrícola relativa: media (almendro emblemático, viña Norte, aguacate y platanera costera)
- Puntallana: Importancia agrícola relativa: media (platanera costera + aguacate + huerta)
- San Andrés y Sauces: Importancia agrícola relativa: alta (platanera dominante del norte, abundancia de agua)
- Santa Cruz de La Palma: Importancia agrícola relativa: baja (menor superficie agrícola de la isla, capital urbana)
- Tazacorte: Importancia agrícola relativa: alta (monocultivo platanero, 2ª superficie agrícola de la isla)
- Tijarafe: Importancia agrícola relativa: alta (3ª superficie agrícola, líder insular en aguacate, platanera costera)
- Villa de Mazo: Importancia agrícola relativa: alta (2ª-3ª superficie agrícola, viña DO Hoyo de Mazo, platanera bajo protección)

### Tenerife

**Nivel B (página propia): 22**

- Adeje: Platanera 565 ha (estudio ULL, sin fecha) y municipio con mayor superficie histórica de tomate junto a Guía de Isora (1.080 ha). Incluido en DOP Abona y en el regadío Las Charquetas.
- Arico: Municipio extenso del sureste con papa y viña de medianías (DOP Abona), tomate en caída de 125,7 ha (2008) a 34,3 ha (2021, SITCAN vía tesis ULL) y pitaya como cultivo comercial consolidado (memoria Cabildo).
- Arona: Segundo productor platanero de Tenerife (685,7 ha Mercatenerife 2021. 750 ha Cabildo 2017. 10% del plátano de la isla, Diario de Avisos 2023) y primero en producción bajo invernadero (Guía Repsol).
- Buenavista del Norte: Platanera 567,2 ha en 2011 (boletin Cabildo), mayor superficie platanera de la Isla Baja. Caracter rural con predominio de agricultura y ganadería (EcuRed).
- Candelaria: Viña 184,5 ha como primer cultivo (mayoritariamente secano, para vino) y hortalizas 56,8 ha con solo un 5% bajo plástico (web municipal, sin fecha). Explotaciones de 0,1 a 5 ha.
- El Sauzal: Sede del Consejo Regulador Tacoronte-Acentejo y de la Casa del Vino. Viña como cultivo dominante. Sin cifra municipal [VERIFICAR].
- Garachico: Platanera 204,6 ha en 2011 (boletin Cabildo) como actividad principal en zona costera para exportación. Nuevo empaquetado de plátanos en 2024 (Diario de Avisos).
- Granadilla de Abona: Zona tradicional de papa en cotas altas (Plan Anual 2017), tomate de exportación histórico en zonas bajas (EnciclopediaGuanche) y municipio de la DOP Abona. Sin cifra municipal [VERIFICAR].
- Guía de Isora: Primer municipio platanero de Tenerife: 845,4 ha (Mercatenerife 2021) y más de 800 ha (Plan Anual Cabildo 2017), con crecimiento sobre antiguas parcelas de tomate.
- Güímar: Ficha oficial Mapa de Cultivos campaña 2021: platanera 90,37 ha, viña 151,03 ha, tomate 0,32 ha, SAU 2.561,77 ha (incluye no cultivado). Cabecera de la DO Valle de Güímar (600-750 ha según fuentes).
- Icod de los Vinos: Municipio platanero y viticola del noroeste (95,9 km²): platanera, huerta y viña base de su economía (Wikipedia). Lugar de la primera detección de Tecia solanivora en Tenerife (1999). Sin cifra municipal [VERIFICAR].
- La Matanza de Acentejo: Municipio vitivinicola (DO Tacoronte-Acentejo) con papa y frutales. Sin cifra municipal [VERIFICAR].
- La Orotava: Mayor municipio agrícola del Valle de La Orotava: papa >400 ha (ISTAC vía ayuntamiento), viña 344 ha y platanera 249 ha (datos sin fecha), 19,7% de su superficie agrícola es viña (Agrocabildo 2024).
- La Victoria de Acentejo: Municipio vitivinicola de la DO Tacoronte-Acentejo con papa de medianías. Sin cifra municipal [VERIFICAR].
- Los Realejos: 15,8 km² de superficie cultivable sobre 57,2 km² (ayuntamiento vía Tribuna de Canarias). Papa como cultivo principal, viña 9,1% de su superficie agrícola (Agrocabildo 2024), aguacate en expansión.
- Los Silos: Platanera 542,9 ha en 2011 (boletin Cabildo), actividad principal del municipio orientada a exportación. El plátano figura en el escudo municipal.
- San Cristóbal de La Laguna: Gran municipio (102 km²) con comarca agraria propia (Valle de Guerra, Tejina, Bajamar, Los Rodeos): platanera 456 ha de 1.676 ha cultivadas en el Censo Agrario 1999 y >500 ha de secano/cereal/forraje en 2007 (ISTAC vía elcanario.net), además de ornamentales bajo invernadero en Tejina.
- San Miguel de Abona: Zona tradicional de papa en cotas altas junto a Granadilla y Vilaflor (Plan Anual Cabildo 2017) y municipio de la DOP Abona (795 ha y 1.467 viticultores en la DO). Sin cifra municipal [VERIFICAR].
- Santa Úrsula: Municipio de la comarca de Acentejo integrado en la DO Tacoronte-Acentejo (viña 300-750 m en terrazas). Sin cifra municipal [VERIFICAR].
- Tacoronte: Cabecera de la DO Tacoronte-Acentejo, con viña como cultivo principal y frutales. Sin cifra municipal [VERIFICAR].
- Tegueste: Viña como producto estrella con más de 300 ha repartidas entre los valles de Tegueste y El Socorro (GEVIC) y papa temprana. Municipio interior sin costa.
- Vilaflor de Chasna: Zona de cultivo más alta de la isla (hasta 1.600 m) con papa tardía sobre jable y el viñedo más alto de Europa (Los Frontones, 1.100-1.600 m). Cotas altas de papa citadas por el Cabildo (2017). Sin cifra [VERIFICAR].

**Nivel C (sin página, citado en el hub): 9**

- Arafo: Unas 100 ha cultivadas estimadas (viña 37,8 ha, cítricos 17,2 ha, platanera 8,7 ha, campaña 2016). Se menciona en el hub de Tenerife.
- El Rosario: Agricultura de medianías pequeña (papa, forraje, cereal) y sin superficie confirmada, municipio mayoritariamente residencial. Se menciona en el hub de Tenerife.
- El Tanque: Papa y viña de medianías en poca superficie, sin dato confirmado. Se menciona en el hub de Tenerife.
- Fasnia: Viña y papa de medianías sin superficie confirmada, tomate bajo invernadero (no tratable con dron). Se menciona en el hub de Tenerife.
- La Guancha: Unas 300 ha labradas según fuente sin fecha, papa y viña de medianías en parcelas pequeñas. Se menciona en el hub de Tenerife.
- Puerto de la Cruz: Municipio urbano de 8,7 km2 con platanera residual. Se menciona en el hub de Tenerife.
- San Juan de la Rambla: Municipio muy pequeño (platanera de costa y papa) sin superficie confirmada. Se menciona en el hub de Tenerife.
- Santa Cruz de Tenerife: 219 ha cultivadas en 2013, en su mayoría autoconsumo en Anaga. Se menciona en el hub de Tenerife.
- Santiago del Teide: Viña (~44 ha) y almendro de secano, superficie cultivada reducida. Se menciona en el hub de Tenerife.

### Gran Canaria

**Nivel B (página propia): 12**

- Agaete: El Valle de Agaete concentra la mayor superficie cultivada del municipio con cafetales (10-15 ha, único café comercial de Europa), cítricos, mango, aguacate, papaya y viña moscatel, más una de las 14 almazaras de la isla [VERIFICAR ha totales ISTAC].
- Arucas: Uno de los tres municipios plataneros que sobresalen en GC junto a Gáldar y Guía (ULPGC) y sede del Mundo del Plátano, pero sin cifra municipal de hectáreas localizada [VERIFICAR ISTAC].
- Gáldar: Mayor superficie cultivada de la isla en el recuento anterior (960,2 ha, ~60% platanera, Canarias7) y 630,42 ha de platanera según el Ayuntamiento: primer municipio productor de plátano de GC.
- La Aldea de San Nicolás: Municipio con mayor valor de cultivo del Mapa de Cultivos 2024 (38,9 según COAG/Canarias7, unidad no indicada: probablemente % de suelo agrícola cultivado [VERIFICAR]) y principal zona tomatera de GC: 101 ha en producción en 2023 (Coagrisan), ~1/4 del tomate insular.
- Mogán: Tercer municipio en el ranking del Mapa de Cultivos 2024 (29,0 según COAG/Canarias7 [VERIFICAR unidad]) y capital del mango de GC (~100 ha, 50% de la producción insular) y del aguacate (~40 ha, 22 variedades).
- Moya: Economía de base agraria con papa y millo como cultivos clave (Mancomunidad del Norte) y una de las mayores explotaciones paperas de la isla (45 ha entre Moya y Guía: >1.000 t de papa y ~700 t de cebolla al año, Canarias7 2026) [VERIFICAR ha municipales].
- San Bartolomé de Tirajana: Mayor productor de albaricoque de Canarias (15-20 ha), tercer municipio en uva de GC (~20 ha, 3 bodegas, Los Azules abre la vendimia insular) y fincas de mango/aguacate/papaya, aunque el regadío es solo ~2,3% del suelo rústico (Catastro 2009).
- Santa María de Guía de Gran Canaria: ~1.035 ha de regadío (27% del municipio) con ~400 ha de platanera y ~127 ha de papa (datos 2009, Enciclopedia Guanche): segundo foco platanero del norte con Gáldar [VERIFICAR dato actual].
- Telde: Segundo municipio del ranking del Mapa de Cultivos 2024 (36,8 según COAG/Canarias7 [VERIFICAR unidad]), ~1.000 ha cultivadas con técnicas intensivas y referencia citrícola de la isla (naranja de Telde, 250.000-258.000 kg/año vendidos a SPAR).
- Teror: Papa, millo, legumbres y hortalizas de medianías al aire libre en un municipio agrícola histórico, superficie municipal pendiente [VERIFICAR].
- Valsequillo de Gran Canaria: Fresa, cítricos, almendro, papa y hortalizas de medianías, parte de la fresa bajo túnel [VERIFICAR], superficie pendiente.
- Vega de San Mateo: Papa, hortalizas y frutales de medianías al aire libre, mercado agrícola de referencia, superficie municipal pendiente [VERIFICAR].

**Nivel C (sin página, citado en el hub): 9**

- Agüimes: El grueso es tomate y pepino de exportación bajo invernadero (no tratable con dron), olivar de Temisas de poca superficie. Se menciona en el hub.
- Artenara: 53,5 ha cultivadas (ISTAC 2019), microexplotaciones de secano. Se menciona en el hub de Gran Canaria.
- Firgas: Sin dato de superficie, papa, millo y hortalizas de medianías en parcelas pequeñas. Se menciona en el hub de Gran Canaria.
- Ingenio: Hortalizas y tomate residual en invernadero, sin superficie confirmada. Se menciona en el hub de Gran Canaria.
- Las Palmas de Gran Canaria: Municipio urbano, viña de Bandama y platanera de Tenoya-Tamaraceite sin superficie confirmada. Se menciona en el hub.
- Santa Brígida: Viña de secano de Monte Lentiscal y huerta de regadío en un municipio residencial, sin superficie confirmada. Se menciona en el hub.
- Santa Lucía de Tirajana: Tomate, pepino y flores bajo invernadero (no tratables con dron), olivar pequeño. Se menciona en el hub de Gran Canaria.
- Tejeda: Almendro de secano y viña de altura (11 ha), microexplotaciones. Se menciona en el hub de Gran Canaria.
- Valleseco: Papa, millo y manzana de medianías sin superficie confirmada, parcelas pequeñas. Se menciona en el hub de Gran Canaria.

### Lanzarote

**Nivel B (página propia): 6**

- Haría: Viña de la DO Lanzarote (zona Haría-Ye), huerta del valle y cebolla, superficie municipal pendiente [VERIFICAR].
- San Bartolomé: Municipio agrícola histórico (sus vecinos son los Batateros) con el jable de batata y una de las zonas vitícolas principales de la isla - parte del espacio protegido de La Geria (5.255 ha repartidas entre Tinajo, Yaiza, Tías, San Bartolomé y Teguise)
- Teguise: Municipio más extenso de la isla con tres sistemas agrícolas documentados: jable (batata, cebolla, sandía de Soo), papa de Los Valles y viña (parte del espacio de La Geria) - la asociación Papa de Los Valles declara 20 por ciento más de siembra en la última campaña
- Tinajo: Zona vitícola principal con marco de plantación denso (~1,5 m frente a 4 m en La Geria) - enarenados con jable marino y tradición hortícola (cebolla) y tabaquera (exportó hasta 1 millón de kilos) - parte del espacio protegido de La Geria
- Tías: Núcleo de La Geria (que se extiende entre Yaiza y Tías) y zona de Masdache - La Geria suma 1.368 ha de viña segun el Mapa de Cultivos (237 ha abandonadas, 15 por ciento) y es el paisaje vitícola más denso de la isla
- Yaiza: Núcleo de La Geria (entre Yaiza y Tías) con los pueblos vitícolas de Uga y La Geria - comparte las 1.368 ha de viña de La Geria y buena parte de las bodegas de la DO

**Nivel C (sin página, citado en el hub): 1**

- Arrecife: Capital insular de carácter urbano sin superficie agrícola relevante en las fuentes consultadas (ninguna fuente lo cita entre las zonas agrícolas de la isla) [VERIFICAR con Mapa de Cultivos de Canarias]

### Fuerteventura

**Nivel B (página propia): 2**

- Antigua: Uno de los tres municipios con productores de tomate de exportación (Tuineje, Pájara y Antigua segun FreshPlaza) - fincas de aloe vera con visita (Verdeaurora) - el Cabildo rehabilita 211.000 m2 de gavias en Tuineje y Antigua (2025)
- Tuineje: Municipio agrícola de referencia de la isla: cuna del tomate de exportación (Cooperativa Agrícola de Gran Tarajal, ~20 por ciento de la exportación insular, luego COEXFUR) - aloe vera desde 1989 (Aloe Vera Internacional) - 152 ha de regadío modernizado con Pájara (2025) - rehabilitación de gavias con Antigua

**Nivel C (sin página, citado en el hub): 4**

- Betancuria: Municipio de montaña y de menor población con huertas de autoconsumo en la Vega de Río Palmas (171 habitantes en 2023) - sin cifra agrícola localizada [VERIFICAR]
- La Oliva: Sin dato de superficie cultivada, gavias y aloe de poca extensión. Se menciona en el hub de Fuerteventura.
- Puerto del Rosario: Unas 150 ha estimadas en el Parque Agrario [VERIFICAR], agricultura pequeña. Se menciona en el hub de Fuerteventura.
- Pájara: Tomate de exportación bajo invernadero (no tratable con dron) y gavias de secano, se menciona en el hub de Fuerteventura.

### La Gomera

**Nivel B (página propia): 3**

- Hermigua: Su economía descansa principalmente en la agricultura (plátano y vino) y el turismo rural (EcuRed) - uno de los grandes valles agrícolas del norte con platanera en el fondo del barranco y viña en las laderas
- Valle Gran Rey: Platanera en terrazas del valle y frutales subtropicales, superficie municipal pendiente [VERIFICAR].
- Vallehermoso: Municipio más extenso (114 km2) y dedicado básicamente a la agricultura con regadío en terrazas (Clubrural) - principales cultivos viña, plátano y autoconsumo (papa, frutales, maíz) - centro de la DO La Gomera (Forastera blanca, 3/4 de la superficie)

**Nivel C (sin página, citado en el hub): 3**

- Agulo: Municipio muy pequeño con platanera en terrazas, sin superficie confirmada. Se menciona en el hub de La Gomera.
- Alajeró: Agricultura de secano reducida, sin superficie confirmada. Se menciona en el hub de La Gomera.
- San Sebastián de La Gomera: Capital insular con platanera puntual, sin superficie confirmada. Se menciona en el hub de La Gomera.

### El Hierro

**Nivel B (página propia): 1**

- Frontera: Concentra la agricultura más próspera de la isla en el Valle de El Golfo: piña tropical (80-130 ha segun fuente y año - mayor producción de Canarias), platanera, viña (subzona Valle del Golfo y Sabinosa) y frutales tropicales - Cooperativa del Campo de Frontera con 450-755 socios

**Nivel C (sin página, citado en el hub): 2**

- El Pinar de El Hierro: Municipio del sur con agricultura de secano de pequeña escala: higos pasados (los más apreciados de Canarias), almendro y viña (subzona El Pinar de la DO) - sin cifra municipal y con plan de recuperación de higuera y almendro (2024) que indica abandono
- Valverde: Viña de Echedo y huerta sin superficie confirmada, la agricultura herreña se concentra en El Golfo (Frontera). Se menciona en el hub.

## 3. Estructura de URLs propuesta

| Tipo | Archivo | `slug` | `parent` | URL en WordPress |
|---|---|---|---|---|
| Hub de isla | `paginas/islas/{isla}.md` | `dron-agricola-{isla}` | vacío | `https://agrodroncanarias.es/dron-agricola-{isla}/` |
| Municipio | `paginas/{isla}/{municipio}.md` | `{municipio}` | `dron-agricola-{isla}` | `https://agrodroncanarias.es/dron-agricola-{isla}/{municipio}/` |
| Cultivo | `paginas/cultivos/{cultivo}.md` | `dron-agricola-{cultivo}` | vacío | `https://agrodroncanarias.es/dron-agricola-{cultivo}/` |

Los enlaces internos de todas las páginas ya apuntan a estas URL absolutas (municipio → hub de isla → cultivo; hub → municipios; cultivo → hubs y municipios). Si la web usa otra estructura de permalinks, hay que sustituir la raíz `https://agrodroncanarias.es/` o las rutas antes de publicar. Comprobado: 0 enlaces internos rotos entre las 77 páginas.

## 4. Lista de páginas

### Hubs de isla

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/islas/el-hierro.md` | Dron agrícola en El Hierro | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-el-hierro/ | 978 | 2 |
| `paginas/islas/fuerteventura.md` | Dron agrícola en Fuerteventura | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-fuerteventura/ | 984 | 1 |
| `paginas/islas/gran-canaria.md` | Dron agrícola en Gran Canaria | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/ | 997 | 2 |
| `paginas/islas/la-gomera.md` | Dron agrícola en La Gomera | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-gomera/ | 988 | 3 |
| `paginas/islas/la-palma.md` | Dron agrícola en La Palma | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/ | 998 | 1 |
| `paginas/islas/lanzarote.md` | Dron agrícola en Lanzarote | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/ | 994 | 5 |
| `paginas/islas/tenerife.md` | Dron agrícola en Tenerife | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/ | 995 | 3 |

### Nivel A: La Palma

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/la-palma/barlovento.md` | Dron agrícola en Barlovento | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/barlovento/ | 1284 | 4 |
| `paginas/la-palma/brena-alta.md` | Dron agrícola en Breña Alta | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/brena-alta/ | 1237 | 5 |
| `paginas/la-palma/brena-baja.md` | Dron agrícola en Breña Baja | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/brena-baja/ | 1280 | 2 |
| `paginas/la-palma/el-paso.md` | Dron agrícola en El Paso | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/el-paso/ | 1294 | 8 |
| `paginas/la-palma/fuencaliente.md` | Dron agrícola en Fuencaliente | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/fuencaliente/ | 1297 | 4 |
| `paginas/la-palma/garafia.md` | Dron agrícola en Garafía | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/garafia/ | 1282 | 3 |
| `paginas/la-palma/los-llanos-de-aridane.md` | Dron agrícola en Los Llanos de Aridane | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/los-llanos-de-aridane/ | 1286 | 8 |
| `paginas/la-palma/puntagorda.md` | Dron agrícola en Puntagorda | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/puntagorda/ | 1288 | 6 |
| `paginas/la-palma/puntallana.md` | Dron agrícola en Puntallana | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/puntallana/ | 1243 | 1 |
| `paginas/la-palma/san-andres-y-sauces.md` | Dron agrícola en San Andrés y Sauces | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/san-andres-y-sauces/ | 1274 | 2 |
| `paginas/la-palma/santa-cruz-de-la-palma.md` | Dron agrícola en Santa Cruz de La Palma | Agrodrón | https://agrodroncanarias.es/dron-agricola-la-palma/santa-cruz-de-la-palma/ | 1289 | 3 |
| `paginas/la-palma/tazacorte.md` | Dron agrícola en Tazacorte | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/tazacorte/ | 1293 | 7 |
| `paginas/la-palma/tijarafe.md` | Dron agrícola en Tijarafe | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/tijarafe/ | 1251 | 5 |
| `paginas/la-palma/villa-de-mazo.md` | Dron agrícola en Villa de Mazo | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-palma/villa-de-mazo/ | 1295 | 2 |

### Nivel B: Tenerife

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/tenerife/adeje.md` | Dron agrícola en Adeje | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/adeje/ | 995 | 2 |
| `paginas/tenerife/arico.md` | Dron agrícola en Arico | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/arico/ | 1000 | 3 |
| `paginas/tenerife/arona.md` | Dron agrícola en Arona | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/arona/ | 996 | 2 |
| `paginas/tenerife/buenavista-del-norte.md` | Dron agrícola en Buenavista del Norte | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/buenavista-del-norte/ | 993 | 3 |
| `paginas/tenerife/candelaria.md` | Dron agrícola en Candelaria | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/candelaria/ | 999 | 3 |
| `paginas/tenerife/el-sauzal.md` | Dron agrícola en El Sauzal | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/el-sauzal/ | 992 | 3 |
| `paginas/tenerife/garachico.md` | Dron agrícola en Garachico | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/garachico/ | 998 | 5 |
| `paginas/tenerife/granadilla-de-abona.md` | Dron agrícola en Granadilla de Abona | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/granadilla-de-abona/ | 997 | 2 |
| `paginas/tenerife/guia-de-isora.md` | Dron agrícola en Guía de Isora | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/guia-de-isora/ | 1000 | 2 |
| `paginas/tenerife/guimar.md` | Dron agrícola en Güímar | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/guimar/ | 997 | 4 |
| `paginas/tenerife/icod-de-los-vinos.md` | Dron agrícola en Icod de los Vinos | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/icod-de-los-vinos/ | 993 | 4 |
| `paginas/tenerife/la-matanza-de-acentejo.md` | Dron agrícola en La Matanza de Acentejo | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/la-matanza-de-acentejo/ | 996 | 4 |
| `paginas/tenerife/la-orotava.md` | Dron agrícola en La Orotava | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/la-orotava/ | 997 | 4 |
| `paginas/tenerife/la-victoria-de-acentejo.md` | Dron agrícola en La Victoria de Acentejo | Agrodrón | https://agrodroncanarias.es/dron-agricola-tenerife/la-victoria-de-acentejo/ | 997 | 3 |
| `paginas/tenerife/los-realejos.md` | Dron agrícola en Los Realejos | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/los-realejos/ | 997 | 4 |
| `paginas/tenerife/los-silos.md` | Dron agrícola en Los Silos | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/los-silos/ | 989 | 3 |
| `paginas/tenerife/san-cristobal-de-la-laguna.md` | Dron agrícola en La Laguna (Tenerife) | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/san-cristobal-de-la-laguna/ | 998 | 2 |
| `paginas/tenerife/san-miguel-de-abona.md` | Dron agrícola en San Miguel de Abona | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/san-miguel-de-abona/ | 992 | 4 |
| `paginas/tenerife/santa-ursula.md` | Dron agrícola en Santa Úrsula | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/santa-ursula/ | 994 | 2 |
| `paginas/tenerife/tacoronte.md` | Dron agrícola en Tacoronte | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/tacoronte/ | 999 | 5 |
| `paginas/tenerife/tegueste.md` | Dron agrícola en Tegueste | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/tegueste/ | 993 | 2 |
| `paginas/tenerife/vilaflor-de-chasna.md` | Dron agrícola en Vilaflor | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-tenerife/vilaflor-de-chasna/ | 999 | 4 |

### Nivel B: Gran Canaria

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/gran-canaria/agaete.md` | Dron agrícola en Agaete | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/agaete/ | 999 | 5 |
| `paginas/gran-canaria/arucas.md` | Dron agrícola en Arucas | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/arucas/ | 990 | 3 |
| `paginas/gran-canaria/galdar.md` | Dron agrícola en Gáldar | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/galdar/ | 995 | 2 |
| `paginas/gran-canaria/la-aldea-de-san-nicolas.md` | Dron agrícola en La Aldea de San Nicolás | Agrodrón | https://agrodroncanarias.es/dron-agricola-gran-canaria/la-aldea-de-san-nicolas/ | 1000 | 4 |
| `paginas/gran-canaria/mogan.md` | Dron agrícola en Mogán | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/mogan/ | 989 | 2 |
| `paginas/gran-canaria/moya.md` | Dron agrícola en Moya | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/moya/ | 998 | 4 |
| `paginas/gran-canaria/san-bartolome-de-tirajana.md` | Dron agrícola en San Bartolomé de Tirajana | Agrodrón | https://agrodroncanarias.es/dron-agricola-gran-canaria/san-bartolome-de-tirajana/ | 998 | 4 |
| `paginas/gran-canaria/santa-maria-de-guia.md` | Dron agrícola en Santa María de Guía | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/santa-maria-de-guia/ | 992 | 2 |
| `paginas/gran-canaria/telde.md` | Dron agrícola en Telde | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/telde/ | 993 | 5 |
| `paginas/gran-canaria/teror.md` | Dron agrícola en Teror | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/teror/ | 994 | 4 |
| `paginas/gran-canaria/valsequillo.md` | Dron agrícola en Valsequillo | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/valsequillo/ | 992 | 5 |
| `paginas/gran-canaria/vega-de-san-mateo.md` | Dron agrícola en Vega de San Mateo | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-gran-canaria/vega-de-san-mateo/ | 994 | 2 |

### Nivel B: Lanzarote

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/lanzarote/haria.md` | Dron agrícola en Haría | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/haria/ | 995 | 4 |
| `paginas/lanzarote/san-bartolome.md` | Dron agrícola en San Bartolomé | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/san-bartolome/ | 992 | 3 |
| `paginas/lanzarote/teguise.md` | Dron agrícola en Teguise | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/teguise/ | 993 | 4 |
| `paginas/lanzarote/tias.md` | Dron agrícola en Tías | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/tias/ | 990 | 4 |
| `paginas/lanzarote/tinajo.md` | Dron agrícola en Tinajo | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/tinajo/ | 995 | 3 |
| `paginas/lanzarote/yaiza.md` | Dron agrícola en Yaiza | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-lanzarote/yaiza/ | 983 | 2 |

### Nivel B: Fuerteventura

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/fuerteventura/antigua.md` | Dron agrícola en Antigua | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-fuerteventura/antigua/ | 990 | 2 |
| `paginas/fuerteventura/tuineje.md` | Dron agrícola en Tuineje | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-fuerteventura/tuineje/ | 983 | 1 |

### Nivel B: La Gomera

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/la-gomera/hermigua.md` | Dron agrícola en Hermigua | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-gomera/hermigua/ | 995 | 4 |
| `paginas/la-gomera/valle-gran-rey.md` | Dron agrícola en Valle Gran Rey | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-gomera/valle-gran-rey/ | 1000 | 7 |
| `paginas/la-gomera/vallehermoso.md` | Dron agrícola en Vallehermoso | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-la-gomera/vallehermoso/ | 983 | 4 |

### Nivel B: El Hierro

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/el-hierro/frontera.md` | Dron agrícola en Frontera | Agrodrón Canarias | https://agrodroncanarias.es/dron-agricola-el-hierro/frontera/ | 979 | 4 |

### Cultivos

| Página | Título | URL | Palabras | [VERIFICAR] |
|---|---|---|---|---|
| `paginas/cultivos/aguacate.md` | Dron agrícola para aguacate en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-aguacate/ | 1289 | 5 |
| `paginas/cultivos/almendro.md` | Dron agrícola para almendro en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-almendro/ | 1278 | 5 |
| `paginas/cultivos/citricos.md` | Dron agrícola para cítricos en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-citricos/ | 1284 | 4 |
| `paginas/cultivos/flores-ornamentales.md` | Dron agrícola para flores y ornamentales | Agrodrón | https://agrodroncanarias.es/dron-agricola-flores-ornamentales/ | 1283 | 5 |
| `paginas/cultivos/frutales-subtropicales.md` | Dron agrícola para frutales subtropicales | Agrodrón | https://agrodroncanarias.es/dron-agricola-frutales-subtropicales/ | 1285 | 6 |
| `paginas/cultivos/horticolas.md` | Dron agrícola para hortalizas en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-horticolas/ | 1282 | 5 |
| `paginas/cultivos/papa.md` | Dron agrícola para papa en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-papa/ | 1273 | 3 |
| `paginas/cultivos/platanera.md` | Dron agrícola para platanera en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-platanera/ | 1285 | 3 |
| `paginas/cultivos/tomate.md` | Dron agrícola para tomate en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-tomate/ | 1286 | 4 |
| `paginas/cultivos/vina.md` | Dron agrícola para viña en Canarias | Agrodrón | https://agrodroncanarias.es/dron-agricola-vina/ | 1292 | 4 |

## 5. Fase 1: datos y fuentes

- Lista de municipios: los 88 municipios oficiales de Canarias (ISTAC), repartidos por isla. Datos por municipio en `data/municipios.csv` con la fuente y el año en cada celda.
- Fuentes principales: ISTAC (estadística de superficies 2021–2025), Mapa de Cultivos de Canarias (Gobierno de Canarias/GRAFCAN, campañas 2017–2024), Cabildos (Agrocabildo, Cabildo de La Palma, Cabildo de Gran Canaria), ICIA, MAPA (Anuario, nota MAPA–AESA 2018, plan cotonet), consejos reguladores de las DO, ASPROCAN/Coplaca, ULL/ULPGC y prensa regional cuando cita a técnicos o a la administración.
- **Limitación importante**: la red de la sesión en la nube bloqueaba la lectura directa de gobiernodecanarias.org, istac, boe.es, mapa.gob.es, agrocabildo.org, ag.dji.com y la mayoría de la prensa canaria. Todas las cifras proceden de resúmenes de búsqueda web con la URL de la fuente anotada, no de la lectura íntegra del documento. Por eso hay tantas marcas [VERIFICAR] y por eso conviene abrir cada URL de `data/notas/` antes de publicar una cifra. El presupuesto de búsquedas de la sesión se agotó, así que quedaron consultas sin hacer (superficie municipal de la mayoría de municipios fuera de La Palma, % de platanera bajo malla, hectáreas por cultivo y municipio). La forma rápida de cerrar casi todos los [VERIFICAR] de superficie es descargar el CSV municipal del ISTAC (E01135A_000003) y el Mapa de Cultivos de Canarias (datos.gob.es, actualización 20-06-2024).
- Datos de la empresa usados en las páginas: solo los del encargo y la indicación posterior del responsable sobre el servicio (base en Santa Cruz de La Palma, junio de 2025, DJI Agras T50 líquido, piloto con más de 10 años, certificados AESA/EASA PDRA-S01 y operador STS, radiofonista, La Palma sin desplazamiento y resto de Canarias con desplazamiento y bajo consulta). Del T50 se citan solo depósito de 40 L, caudal 16/24 L/min y seguimiento de terreno por radar y visión binocular (ficha DJI vía distribuidores); la anchura de pulverización y las hectáreas/hora no se citan por no estar confirmadas.

## 6. Enfoque del servicio y normativa: lo que afirman las páginas y con qué fuente

Por indicación del responsable, en ninguna página aparece el término vetado que designa los productos contra plagas (ni sus derivados, ni plaguicida, fungicida, insecticida, herbicida, ni fumigar): Agrodrón no ofrece ese servicio en Canarias. El servicio se describe como **tratamientos agrícolas con dron**: pulverización de abonos foliares, bioestimulantes, correctores de carencias y otros productos de uso permitido, sobre cultivo al aire libre. Las plagas y enfermedades documentadas aparecen como contexto del agricultor, con su fuente, y el control de la plaga se remite a los servicios de sanidad vegetal; el dron no se presenta como herramienta contra plagas ni se promete ningún resultado. El script de control rechaza cualquier página con esas palabras, también en el frontmatter.

Cada página lleva como máximo un párrafo de normativa y condiciones, redactado distinto, con solo estas afirmaciones:
1. El operador vuela en la categoría específica de AESA/EASA, en escenarios estándar (STS) o bajo PDRA-S01, con piloto certificado (AESA, ámbito drones; Reglamento de Ejecución (UE) 2019/947).
2. Cada vuelo se planifica sobre el mapa de la parcela y se comprueban las zonas geográficas de UAS (mapa de ENAIRE, https://drones.enaire.es/); las páginas de municipios con aeropuerto (Breña Baja, La Laguna, San Miguel de Abona, Telde) solo dicen que la cercanía condiciona la planificación.
3. Solo se aplican productos de uso permitido en el cultivo, a la dosis de su etiqueta, y solo sobre cultivo al aire libre (práctica de la empresa, sin cita normativa).
4. Con viento fuerte, lluvia o niebla no se vuela (práctica operativa, sin cifra de viento).

**Pendiente de confirmar con Agrodrón**: la lista exacta de productos que aplica (abonos foliares, bioestimulantes, correctores u otros). Las páginas usan la fórmula genérica "abonos foliares, bioestimulantes y otros productos de uso permitido".

## 7. Control de similitud

Métrica: proporción de secuencias de 5 palabras de una página que aparecen también en otra (detecta texto plantilla), tomando el máximo de las dos direcciones; se informa además el coseno TF-IDF de vocabulario como dato secundario. Umbral del encargo: 30 %. Resultado sobre las 77 páginas (frontmatter y JSON-LD excluidos):

```
Páginas analizadas: 77  |  pares: 2926  |  métrica: contención de shingles de 5 palabras  |  umbral: 30 %
Máxima similitud: 11.0 %  |  media: 2.3 %  |  pares por encima del umbral: 0

Top 15 pares (shingles % | coseno TF-IDF % | página A | página B):
   11.0 |  19.4 | paginas/tenerife/la-victoria-de-acentejo.md | paginas/tenerife/tegueste.md
   10.9 |  18.0 | paginas/tenerife/icod-de-los-vinos.md | paginas/tenerife/la-orotava.md
   10.1 |  52.8 | paginas/fuerteventura/antigua.md | paginas/islas/fuerteventura.md
    9.3 |  21.1 | paginas/tenerife/el-sauzal.md | paginas/tenerife/la-victoria-de-acentejo.md
    9.3 |  39.7 | paginas/islas/la-gomera.md | paginas/la-gomera/vallehermoso.md
    9.2 |  26.5 | paginas/tenerife/la-orotava.md | paginas/tenerife/los-realejos.md
    8.6 |  23.6 | paginas/tenerife/la-matanza-de-acentejo.md | paginas/tenerife/tacoronte.md
    8.3 |  25.2 | paginas/tenerife/buenavista-del-norte.md | paginas/tenerife/los-silos.md
    7.9 |  16.1 | paginas/tenerife/garachico.md | paginas/tenerife/los-realejos.md
    7.6 |  24.0 | paginas/tenerife/el-sauzal.md | paginas/tenerife/la-matanza-de-acentejo.md
    7.5 |  36.9 | paginas/islas/la-gomera.md | paginas/la-gomera/hermigua.md
    7.5 |  16.2 | paginas/tenerife/candelaria.md | paginas/tenerife/la-victoria-de-acentejo.md
    7.3 |  26.2 | paginas/tenerife/garachico.md | paginas/tenerife/icod-de-los-vinos.md
    7.3 |  12.2 | paginas/tenerife/guimar.md | paginas/tenerife/la-victoria-de-acentejo.md
    7.0 |  46.8 | paginas/islas/lanzarote.md | paginas/lanzarote/teguise.md
```

Ningún par supera el umbral; ninguna página ha necesitado reescritura por similitud. Los pares más altos (12,2 % como máximo) corresponden a municipios de la misma comarca vitícola que comparten el párrafo legal obligatorio y los mismos avisos del Cabildo, con redacción distinta. Los pares hub–municipio con coseno alto (Fuerteventura, La Gomera) comparten vocabulario de isla, no frases.

## 8. Control de calidad SEO

`scripts/control_calidad.py` comprueba en cada página: frontmatter completo (title ≤60, meta 120–155, slug válido, parent correcto), longitud por nivel (A 900–1.300, B y hub 700–1.000, cultivo 800–1.300), keyword en title, H1, primer párrafo, un H2 y meta, un solo H1, FAQ con 4–6 preguntas idénticas a las del JSON-LD, JSON-LD válido con Service + FAQPage + areaServed, CTA con enlace y la palabra presupuesto, marcadores [IMAGEN] con alt, enlaces internos obligatorios, aviso de desplazamiento fuera de La Palma, frases prohibidas (incluidas las palabras vetadas por el responsable) y exclamaciones. Resultado: **77 páginas, 0 errores**. Tabla completa en `data/control/calidad.md`.

## 9. Orden recomendado de publicación

No publicar todo de golpe. Propuesta por tandas, siempre primero el hub de la isla y después sus municipios, para que los enlaces internos tengan destino:

| Tanda | Páginas | Notas |
|---|---|---|
| Semana 1 | Hub La Palma + 14 municipios de La Palma, en este orden: Los Llanos de Aridane, Tazacorte, Villa de Mazo, Tijarafe, El Paso, Garafía, Fuencaliente, San Andrés y Sauces, Barlovento, Breña Alta, Puntagorda, Puntallana, Breña Baja, Santa Cruz de La Palma | Es el mercado real sin desplazamiento. Revisar primero los [VERIFICAR] de estas páginas y añadir fotos propias. |
| Semana 2 | 10 páginas de cultivo: platanera, viña, aguacate, papa, frutales subtropicales, cítricos, almendro, hortalizas, tomate, flores | Reciben enlaces de todos los municipios. |
| Semanas 3–4 | Hub Tenerife + 22 municipios (dos tandas de 11) | Empezar por Valle de La Orotava e Isla Baja (platanera y papa), seguir con Acentejo, La Laguna y el sur. |
| Semana 5 | Hub Gran Canaria + 12 municipios | Norte platanero primero (Gáldar, Guía, Arucas, Moya). |
| Semana 6 | Hub Lanzarote + 6 municipios | Viña de La Geria y enarenados. |
| Semana 7 | Hub La Gomera + 3 municipios; hub El Hierro + Frontera | Islas vecinas de La Palma. |
| Semana 8 | Hub Fuerteventura + Antigua y Tuineje | La isla con menos cultivo tratable; página honesta. |

## 10. Cómo pasar las páginas a WordPress

- Crear **páginas** (no entradas) en **borrador**, con el `title`, `slug` y `meta_description` del frontmatter en el plugin de SEO, y la jerarquía `parent` → hija (los hubs y los cultivos son páginas de primer nivel).
- El bloque ```json del final de cada página es el JSON-LD (Service + FAQPage): insertarlo en un bloque HTML personalizado como `<script type="application/ld+json">…</script>`.
- Los marcadores `[IMAGEN: descripción | alt: texto]` indican dónde va cada foto y su texto alternativo; sustituirlos por fotos reales (una finca de esa zona vale más que cualquier banco de imágenes).
- La llamada a la acción enlaza a `https://agrodroncanarias.es/`; si existe una página de contacto o presupuesto, sustituir ese enlace en todas las páginas [VERIFICAR: URL de contacto].
- Las marcas `[VERIFICAR: …]` del cuerpo deben resolverse antes de publicar: confirmar el dato y quitar la marca, o borrar la frase.

## 11. Decisiones tomadas que conviene conocer

- Keyword principal: `dron agrícola en {Municipio}` en municipios y hubs, `dron agrícola para {cultivo}` en cultivos; variantes reales en el cuerpo (tratamiento con drones, pulverización con dron, dron pulverizador, abonado foliar con dron). Para La Laguna se usa el nombre corto; para Güímar, Santa María de Guía, Guía de Isora y Valle Gran Rey, el nombre de uso común.
- Longitud de las páginas de cultivo fijada en 800–1.300 palabras (el encargo no la especificaba).
- Cinco esqueletos distintos (del cultivo al dron, del terreno al dron, preguntas del agricultor, por zonas, calendario) asignados por rotación para que páginas con datos parecidos se lean distintas.
- Las páginas de municipios con cultivo mayoritario bajo cubierta (La Aldea, Arona, Guía de Isora, Antigua, Tuineje, Frontera…) dicen sin rodeos qué no se trata con dron y centran el servicio en lo que va al aire libre.
- Ninguna página da precios, clientes, casos, cifras de ahorro ni promete plazos o resultados.
- Donde el encargo y los datos discrepaban (Tazacorte, Tinajo, Villa de Mazo, Fuencaliente), mandaron los datos y así consta en la página.

## 12. Todas las marcas [VERIFICAR] por página

Total: 275 marcas en el cuerpo de las páginas (las del JSON-LD repiten las de la FAQ). Hay que confirmar el dato o pedir que se quite la frase.

### `paginas/cultivos/aguacate.md` (5)

- [VERIFICAR: altura y marco de plantación con fuente técnica]
- [VERIFICAR: superficie 2023 en la tabla 7.9.15.2 del Anuario del MAPA]
- [VERIFICAR: hectáreas de aguacate en Gran Canaria]
- [VERIFICAR: estatus oficial con Sanidad Vegetal]
- [VERIFICAR: horas de calma por comarca]

### `paginas/cultivos/almendro.md` (5)

- [VERIFICAR: tabla MAPA 7.10.1.2]
- [VERIFICAR: superficie en ISTAC o Mapa de Cultivos]
- [VERIFICAR: relevancia en Canarias]
- [VERIFICAR: avisos del Cabildo de La Palma]
- [VERIFICAR: comportamiento del T50 por encima de 1.000 m]

### `paginas/cultivos/citricos.md` (4)

- [VERIFICAR: tablas 7.8.2.x del Anuario del MAPA e ISTAC]
- [VERIFICAR: hectáreas de cítricos por municipio]
- [VERIFICAR: estatus en Canarias con Sanidad Vegetal del Gobierno de Canarias]
- [VERIFICAR: avisos de sanidad vegetal de los Cabildos y del Gobierno de Canarias]

### `paginas/cultivos/flores-ornamentales.md` (5)

- [VERIFICAR: superficie oficial reciente de flor y ornamental en el ISTAC]
- [VERIFICAR: porcentaje de ornamentales a cielo abierto]
- [VERIFICAR: altura y marco de plantación con fuente técnica]
- [VERIFICAR: avisos de Agrocabildo o del Cabildo de La Palma sobre proteas]
- [VERIFICAR: hectáreas de proteas por municipio]

### `paginas/cultivos/frutales-subtropicales.md` (6)

- [VERIFICAR: porcentaje a cielo abierto]
- [VERIFICAR: cubierta actual de la piña en El Golfo]
- [VERIFICAR: ISTAC y tablas del Anuario del MAPA]
- [VERIFICAR: periodo de esa comparación]
- [VERIFICAR: presencia en Canarias]
- [VERIFICAR: fuente canaria]

### `paginas/cultivos/horticolas.md` (5)

- [VERIFICAR: ISTAC por cultivo]
- [VERIFICAR: probablemente miles de toneladas]
- [VERIFICAR: proporción bajo cubierta]
- [VERIFICAR]
- [VERIFICAR: avisos de hortícolas por isla]

### `paginas/cultivos/papa.md` (3)

- [VERIFICAR: calendario de avisos por comarca]
- [VERIFICAR]
- [VERIFICAR: metodología ISTAC]

### `paginas/cultivos/platanera.md` (3)

- [VERIFICAR: altura media en producción con fuente técnica]
- [VERIFICAR: base de cálculo de Mercasa]
- [VERIFICAR: porcentaje de platanera protegida por isla]

### `paginas/cultivos/tomate.md` (4)

- [VERIFICAR: fuente exacta del porcentaje]
- [VERIFICAR: FEDEX, ACETO o ISTAC]
- [VERIFICAR: atribución al tomate]
- [VERIFICAR]

### `paginas/cultivos/vina.md` (4)

- [VERIFICAR: documento no leído]
- [VERIFICAR: métrica de cada fuente]
- [VERIFICAR: cifra vigente]
- [VERIFICAR: patógeno y fecha del aviso]

### `paginas/el-hierro/frontera.md` (4)

- [VERIFICAR: cota máxima de la piña]
- [VERIFICAR: proporción actual bajo malla o invernadero]
- [VERIFICAR: papaya en El Golfo]
- [VERIFICAR]

### `paginas/fuerteventura/antigua.md` (2)

- [VERIFICAR: cochinilla u otras en aloe majorero]
- [VERIFICAR]

### `paginas/fuerteventura/tuineje.md` (1)

- [VERIFICAR]

### `paginas/gran-canaria/agaete.md` (5)

- [VERIFICAR: superficie cultivada total de Agaete según el ISTAC]
- [VERIFICAR: altitudes]
- [VERIFICAR: avisos de sanidad vegetal del Gobierno de Canarias sobre cítricos]
- [VERIFICAR: hectáreas por cultivo]
- [VERIFICAR: datos de viento y precipitación]

### `paginas/gran-canaria/arucas.md` (3)

- [VERIFICAR: hectáreas cultivadas de Arucas en el ISTAC]
- [VERIFICAR: porcentaje de platanera bajo malla en Arucas]
- [VERIFICAR: hectáreas por cultivo en Arucas]

### `paginas/gran-canaria/galdar.md` (2)

- [VERIFICAR: porcentaje de platanera bajo malla en Gáldar]
- [VERIFICAR: hectáreas de viña en Gáldar]

### `paginas/gran-canaria/la-aldea-de-san-nicolas.md` (4)

- [VERIFICAR: unidad, probablemente porcentaje de suelo agrícola cultivado]
- [VERIFICAR: hectáreas por cultivo]
- [VERIFICAR: porcentaje al aire libre]
- [VERIFICAR: precipitación media]

### `paginas/gran-canaria/mogan.md` (2)

- [VERIFICAR: avisos de sanidad vegetal del Gobierno de Canarias para mango]
- [VERIFICAR: superficie de papaya y tomate]

### `paginas/gran-canaria/moya.md` (4)

- [VERIFICAR: épocas de siembra y arranque de la papa en Moya y Fontanales]
- [VERIFICAR: época de los avisos y comarca de Moya]
- [VERIFICAR: superficie de platanera en la costa de Moya]
- [VERIFICAR: dato climático de Fontanales]

### `paginas/gran-canaria/san-bartolome-de-tirajana.md` (4)

- [VERIFICAR: fechas locales de floración]
- [VERIFICAR: especie]
- [VERIFICAR: especies]
- [VERIFICAR: hectáreas actuales]

### `paginas/gran-canaria/santa-maria-de-guia.md` (2)

- [VERIFICAR: porcentaje de platanera bajo malla en Guía]
- [VERIFICAR: sistema de cultivo de la papaya en Guía]

### `paginas/gran-canaria/telde.md` (5)

- [VERIFICAR: superficie cultivada actual en el ISTAC]
- [VERIFICAR: unidad del valor 36,8]
- [VERIFICAR: fuente del porcentaje]
- [VERIFICAR: plagas de los cítricos de Telde]
- [VERIFICAR: sistema de cultivo de la papaya en Telde]

### `paginas/gran-canaria/teror.md` (4)

- [VERIFICAR: precipitación media anual de Teror]
- [VERIFICAR: sistema de cultivo de las flores de Teror]
- [VERIFICAR: superficie de frutales en Teror]
- [VERIFICAR: hectáreas cultivadas de Teror, serie municipal del ISTAC]

### `paginas/gran-canaria/valsequillo.md` (5)

- [VERIFICAR: sistema de cultivo y hectáreas de la fresa de Valsequillo]
- [VERIFICAR: plagas de la fresa en Gran Canaria]
- [VERIFICAR: hectáreas de almendro, cítricos y frutales en Valsequillo]
- [VERIFICAR: incidencia en el municipio]
- [VERIFICAR: monilia en los almendros de Gran Canaria]

### `paginas/gran-canaria/vega-de-san-mateo.md` (2)

- [VERIFICAR: calendario de avisos de mildiu en papa para las medianías de Gran Canaria e incidencia en San Mateo]
- [VERIFICAR: hectáreas de frutales en San Mateo y plagas de manzano y peral en Gran Canaria]

### `paginas/islas/el-hierro.md` (2)

- [VERIFICAR: superficie actual de viña]
- [VERIFICAR]

### `paginas/islas/fuerteventura.md` (1)

- [VERIFICAR: superficie real con el Mapa de Cultivos]

### `paginas/islas/gran-canaria.md` (2)

- [VERIFICAR: porcentaje bajo cubierta]
- [VERIFICAR]

### `paginas/islas/la-gomera.md` (3)

- [VERIFICAR: superficie cultivada de La Gomera, ISTAC]
- [VERIFICAR: ASPROCAN o ISTAC]
- [VERIFICAR]

### `paginas/islas/la-palma.md` (1)

- [VERIFICAR: desglose de platanera protegida en La Palma; el dato canario es un 35 %]

### `paginas/islas/lanzarote.md` (5)

- [VERIFICAR: sobre 3.872 ha sale la mitad]
- [VERIFICAR: superficie actual]
- [VERIFICAR: superficie agrícola de Arrecife]
- [VERIFICAR: plagas del aloe]
- [VERIFICAR: patógeno y fecha]

### `paginas/islas/tenerife.md` (3)

- [VERIFICAR: cifra actual]
- [VERIFICAR: año del dato]
- [VERIFICAR: conciliar cifras]

### `paginas/la-gomera/hermigua.md` (4)

- [VERIFICAR: hectáreas de platanera y viña en Hermigua]
- [VERIFICAR]
- [VERIFICAR: mildiu y oídio en Hermigua]
- [VERIFICAR: platanera bajo malla]

### `paginas/la-gomera/valle-gran-rey.md` (7)

- [VERIFICAR: hectáreas por cultivo]
- [VERIFICAR: superficie de platanera y frutales]
- [VERIFICAR: especies]
- [VERIFICAR]
- [VERIFICAR: Canarias]
- [VERIFICAR: épocas de riesgo en La Gomera]
- [VERIFICAR: Valle Gran Rey]

### `paginas/la-gomera/vallehermoso.md` (4)

- [VERIFICAR: hectáreas de viña y platanera en Vallehermoso]
- [VERIFICAR: malla en la platanera de Vallehermoso]
- [VERIFICAR: mildiu y oídio en Vallehermoso]
- [VERIFICAR: cultivos y superficie en Alojera y Arguamul]

### `paginas/la-palma/barlovento.md` (4)

- [VERIFICAR: aviso o fuente local de mildiu de la papa en Barlovento]
- [VERIFICAR: superficie de platanera de Barlovento en el Mapa de Cultivos]
- [VERIFICAR: proporción de platanera bajo malla en Barlovento]
- [VERIFICAR: hectáreas de viña en Barlovento]

### `paginas/la-palma/brena-alta.md` (5)

- [VERIFICAR: hectáreas de platanera en el Mapa de Cultivos]
- [VERIFICAR: tamaño de las fincas de aguacate]
- [VERIFICAR: hectáreas de viña en Breña Alta]
- [VERIFICAR: superficie de proteas en Breña Alta]
- [VERIFICAR: régimen de viento en las medianías]

### `paginas/la-palma/brena-baja.md` (2)

- [VERIFICAR: hectáreas y localización en el Mapa de Cultivos 2022]
- [VERIFICAR: superficie protegida en Breña Baja]

### `paginas/la-palma/el-paso.md` (8)

- [VERIFICAR: hectáreas de viña del municipio]
- [VERIFICAR: hectáreas de aguacate actuales]
- [VERIFICAR: plagas y carencias documentadas del almendro en el municipio]
- [VERIFICAR: superficie municipal tras la erupción]
- [VERIFICAR: frecuencia del desborde del alisio sobre El Paso]
- [VERIFICAR: superficie en el municipio]
- [VERIFICAR: superficie]
- [VERIFICAR: altitud del casco]

### `paginas/la-palma/fuencaliente.md` (4)

- [VERIFICAR: año del estudio]
- [VERIFICAR: estado de los accesos a las parcelas de viña]
- [VERIFICAR: año]
- [VERIFICAR: proporción bajo malla en Fuencaliente]

### `paginas/la-palma/garafia.md` (3)

- [VERIFICAR: superficie de platanera de Garafía en el Mapa de Cultivos]
- [VERIFICAR: hectáreas de viña en Garafía]
- [VERIFICAR: plagas del almendro en Garafía]

### `paginas/la-palma/los-llanos-de-aridane.md` (8)

- [VERIFICAR: intensidad de las rachas en la costa de Puerto Naos]
- [VERIFICAR: proporción de platanera bajo malla en el municipio]
- [VERIFICAR: estado actual de las restricciones]
- [VERIFICAR: hectáreas de aguacate 2022]
- [VERIFICAR: superficie]
- [VERIFICAR: fuente técnica canaria]
- [VERIFICAR: proporción exacta]
- [VERIFICAR: restricciones vigentes por CO2 en Puerto Naos y La Bombilla]

### `paginas/la-palma/puntagorda.md` (6)

- [VERIFICAR: plagas y carencias documentadas del almendro en Puntagorda]
- [VERIFICAR: hectáreas]
- [VERIFICAR: superficie exacta]
- [VERIFICAR: barrancos del término]
- [VERIFICAR: estructura de la propiedad]
- [VERIFICAR: régimen de viento por zona agrícola]

### `paginas/la-palma/puntallana.md` (1)

- [VERIFICAR: topónimos agrícolas orientativos]

### `paginas/la-palma/san-andres-y-sauces.md` (2)

- [VERIFICAR: fuente local sobre hongos foliares en platanera; la Sigatoka no estaba presente en Canarias según el ICIA en 2002]
- [VERIFICAR: proporción de platanera al aire libre con cortavientos en el municipio]

### `paginas/la-palma/santa-cruz-de-la-palma.md` (3)

- [VERIFICAR: superficie municipal exacta]
- [VERIFICAR: fincas plataneras de Mirca con agua propia]
- [VERIFICAR: viña en Velhoco y Mirca]

### `paginas/la-palma/tazacorte.md` (7)

- [VERIFICAR: superficie exacta del municipio]
- [VERIFICAR: total agrícola 2022 en el PDF del Mapa de Cultivos]
- [VERIFICAR: fuente canaria sobre araña roja en platanera]
- [VERIFICAR: régimen de viento en la costa de Tazacorte]
- [VERIFICAR: proporción bajo malla o invernadero en La Palma y en Tazacorte]
- [VERIFICAR: proporción]
- [VERIFICAR: superficies]

### `paginas/la-palma/tijarafe.md` (5)

- [VERIFICAR: pagos plataneros de la costa]
- [VERIFICAR: barrancos citados]
- [VERIFICAR: régimen de viento por zona agrícola]
- [VERIFICAR: hectáreas]
- [VERIFICAR: hectáreas de viña en Tinizara]

### `paginas/la-palma/villa-de-mazo.md` (2)

- [VERIFICAR: año del dato]
- [VERIFICAR: superficie de aguacate en Villa de Mazo en el Mapa de Cultivos 2022]

### `paginas/lanzarote/haria.md` (4)

- [VERIFICAR: altitudes]
- [VERIFICAR: hectáreas de viña en Ye]
- [VERIFICAR: Mapa de Cultivos de Canarias, junio de 2024]
- [VERIFICAR]

### `paginas/lanzarote/san-bartolome.md` (3)

- [VERIFICAR]
- [VERIFICAR: hectáreas de viña en San Bartolomé]
- [VERIFICAR: patógeno y fecha]

### `paginas/lanzarote/teguise.md` (4)

- [VERIFICAR: altitud de los bancales de Los Valles]
- [VERIFICAR: hectáreas de viña de Teguise en el Mapa de Cultivos]
- [VERIFICAR: superficie cultivada en la costa de Teguise]
- [VERIFICAR: hongo y fecha del aviso]

### `paginas/lanzarote/tias.md` (4)

- [VERIFICAR: patógeno y fecha]
- [VERIFICAR]
- [VERIFICAR: fechas de vendimia en la DO Lanzarote]
- [VERIFICAR: altitudes]

### `paginas/lanzarote/tinajo.md` (3)

- [VERIFICAR: altitud de las zonas de viña]
- [VERIFICAR: patógeno y año del aviso]
- [VERIFICAR: avisos de sanidad vegetal del Cabildo de Lanzarote]

### `paginas/lanzarote/yaiza.md` (2)

- [VERIFICAR: cotas de las parcelas de Uga y La Geria]
- [VERIFICAR: identificación y fecha del hongo]

### `paginas/tenerife/adeje.md` (2)

- [VERIFICAR: porcentaje de platanera cubierta en Adeje]
- [VERIFICAR: si Adeje está dentro]

### `paginas/tenerife/arico.md` (3)

- [VERIFICAR: proporción de pitaya bajo malla en Arico]
- [VERIFICAR: presencia documentada en Arico]
- [VERIFICAR: municipios incluidos]

### `paginas/tenerife/arona.md` (2)

- [VERIFICAR: superficie de platanera al aire libre en Arona]
- [VERIFICAR: si la zona demarcada toca Arona]

### `paginas/tenerife/buenavista-del-norte.md` (3)

- [VERIFICAR: superficie de viña y papa en El Palmar, Las Portelas y Teno Alto]
- [VERIFICAR: altura media en la zona]
- [VERIFICAR: municipios de la zona demarcada]

### `paginas/tenerife/candelaria.md` (3)

- [VERIFICAR: calendario de siembra de papa en Candelaria]
- [VERIFICAR: si Candelaria está en la zona demarcada]
- [VERIFICAR: plagas de cítricos en el Valle de Güímar]

### `paginas/tenerife/el-sauzal.md` (3)

- [VERIFICAR: año y comarcas de ese aviso]
- [VERIFICAR: si El Sauzal está en la zona demarcada]
- [VERIFICAR: superficie de platanera en El Sauzal]

### `paginas/tenerife/garachico.md` (5)

- [VERIFICAR: cotas]
- [VERIFICAR: épocas de riesgo en platanera del norte de Tenerife]
- [VERIFICAR: época del aviso]
- [VERIFICAR: si Garachico está en la zona demarcada]
- [VERIFICAR: porcentaje de platanera bajo malla en Garachico]

### `paginas/tenerife/granadilla-de-abona.md` (2)

- [VERIFICAR: fechas de siembra en Charco del Pino y Cruz de Tea]
- [VERIFICAR: si Granadilla está en la zona demarcada]

### `paginas/tenerife/guia-de-isora.md` (2)

- [VERIFICAR: porcentaje bajo cubierta en Guía de Isora]
- [VERIFICAR: si Guía de Isora está en la zona demarcada]

### `paginas/tenerife/guimar.md` (4)

- [VERIFICAR: hectáreas de viña-papa en la ficha de Güímar]
- [VERIFICAR: si el Valle de Güímar está en la zona demarcada]
- [VERIFICAR: horario de calma habitual en las medianías de Güímar]
- [VERIFICAR: proporción de platanera bajo cubierta en la costa de Güímar]

### `paginas/tenerife/icod-de-los-vinos.md` (4)

- [VERIFICAR: cotas por pago]
- [VERIFICAR: hectáreas de viña en el municipio]
- [VERIFICAR: si Icod está en la zona demarcada]
- [VERIFICAR: porcentaje bajo malla en Icod]

### `paginas/tenerife/la-matanza-de-acentejo.md` (4)

- [VERIFICAR: cultivos presentes en la costa del municipio]
- [VERIFICAR: ha de viña de La Matanza en el Mapa de Cultivos]
- [VERIFICAR: superficie de castaño, aguacate y huerta en la zona alta]
- [VERIFICAR: si La Matanza está en la zona demarcada]

### `paginas/tenerife/la-orotava.md` (4)

- [VERIFICAR: cotas por pago]
- [VERIFICAR: proporción en cordón trenzado]
- [VERIFICAR: si el Valle entra en la zona demarcada]
- [VERIFICAR: porcentaje bajo malla en La Orotava]

### `paginas/tenerife/la-victoria-de-acentejo.md` (3)

- [VERIFICAR: hectáreas de viña en la ficha del Mapa de Cultivos de La Victoria de Acentejo]
- [VERIFICAR: si La Victoria está dentro de la zona demarcada]
- [VERIFICAR: superficie de platanera en La Victoria]

### `paginas/tenerife/los-realejos.md` (4)

- [VERIFICAR: cotas por pago]
- [VERIFICAR: hectáreas de platanera en la costa de Los Realejos]
- [VERIFICAR: proporción bajo malla]
- [VERIFICAR: si Los Realejos está en la zona demarcada]

### `paginas/tenerife/los-silos.md` (3)

- [VERIFICAR: porcentaje de platanera bajo malla en Los Silos]
- [VERIFICAR: altura media en la zona]
- [VERIFICAR: superficie de viña y papa en las medianías de Los Silos]

### `paginas/tenerife/san-cristobal-de-la-laguna.md` (2)

- [VERIFICAR: proporción actual bajo malla o invernadero en la costa de La Laguna]
- [VERIFICAR: superficie cultivada en el Anaga lagunero]

### `paginas/tenerife/san-miguel-de-abona.md` (4)

- [VERIFICAR: cotas agrícolas del municipio]
- [VERIFICAR: pagos agrícolas de San Miguel]
- [VERIFICAR: superficie y cultivos de invernadero en la costa]
- [VERIFICAR: si San Miguel está dentro]

### `paginas/tenerife/santa-ursula.md` (2)

- [VERIFICAR: superficie de platanera y frutales en la costa de Santa Úrsula]
- [VERIFICAR: ficha del Mapa de Cultivos de Santa Úrsula]

### `paginas/tenerife/tacoronte.md` (5)

- [VERIFICAR: superficie de viña de Tacoronte en el Mapa de Cultivos]
- [VERIFICAR: sistemas de conducción predominantes en la viña de Tacoronte]
- [VERIFICAR: altura]
- [VERIFICAR: superficie]
- [VERIFICAR: municipios de la zona demarcada]

### `paginas/tenerife/tegueste.md` (2)

- [VERIFICAR: hectáreas actuales de viña en Tegueste en el Mapa de Cultivos]
- [VERIFICAR: cultivo protegido en el municipio]

### `paginas/tenerife/vilaflor-de-chasna.md` (4)

- [VERIFICAR: rendimiento del T50 por encima de 1.400 m con depósito lleno]
- [VERIFICAR: si Vilaflor está en la zona demarcada]
- [VERIFICAR: régimen de viento local en Vilaflor]
- [VERIFICAR: daños documentados en Tenerife]

Además, en `data/notas/*.md` cada isla y los cultivos tienen una sección "Pendiente de verificar" con los datos que no se pudieron confirmar durante la investigación.
