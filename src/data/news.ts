export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
  contact?: string;
};

export const news: NewsItem[] = [
  {
    slug: "meteorologia",
    image: "https://www.unedlapalma.es/images/banners/Taller_Meteo_UNED.jpg",
    date: "Junio 2025",
    title: "Éxito del Curso Avanzado de Meteorología en la UNED de La Palma",
    excerpt:
      "El curso impartido por Roger P. Frey completó todas sus plazas y generó lista de espera. Se anuncia una segunda edición para octubre.",
    contact: "jfernandez@santa-cruz.uned.es",
    body: [
      "El Centro Asociado UNED La Palma celebró con gran éxito el Curso Avanzado de Meteorología impartido por Roger P. Frey, completando todas las plazas disponibles y generando una notable lista de espera.",
      "Dada la alta demanda y el interés despertado entre estudiantes, profesionales y aficionados a la meteorología en la isla, se anuncia una segunda edición prevista para el mes de octubre de 2025.",
      "Para más información o para reservar plaza en la próxima edición, los interesados pueden contactar a través del correo jfernandez@santa-cruz.uned.es.",
    ],
  },
  {
    slug: "graduacion-2024",
    image: "https://www.unedlapalma.es/images/Uned_La_Palma_1.png",
    date: "Abril 2025",
    title: "Emotiva ceremonia de graduación del curso académico 2023-2024",
    excerpt:
      "El Centro Asociado celebró el acto de graduación en la sede de Los Llanos de Aridane, reuniendo a estudiantes, familias y autoridades.",
    body: [
      "El Centro Asociado UNED La Palma celebró el pasado mes de abril el acto de graduación correspondiente al curso académico 2023-2024 en su sede de Los Llanos de Aridane.",
      "La ceremonia reunió a estudiantes recién graduados, familiares, profesorado tutor, personal del centro y autoridades locales en una jornada cargada de emoción y reconocimiento al esfuerzo realizado.",
      "Desde la dirección del centro se quiso poner en valor el compromiso de todo el alumnado con la formación universitaria a distancia y la importancia de la UNED como motor de igualdad de oportunidades en La Palma.",
    ],
  },
  {
    slug: "becas-2025",
    image: "https://www.unedlapalma.es/images/banners/414x530_becas_25.jpg",
    date: "Mayo 2025",
    title: "Becas UNED 2025/26 — Plazo ampliado hasta el 30 de mayo",
    excerpt:
      "El Ministerio de Educación amplía el plazo de solicitud de becas. Curso académico 2025/2026.",
    body: [
      "El Ministerio de Educación, Formación Profesional y Deportes ha ampliado el plazo de solicitud de becas para el curso académico 2025/2026 hasta el 30 de mayo.",
      "Esta ampliación permite que más estudiantes puedan acceder a las ayudas oficiales para cursar estudios universitarios en la UNED.",
      "Los estudiantes interesados pueden tramitar su solicitud a través de la sede electrónica del Ministerio. Desde el Centro Asociado UNED La Palma se ofrece orientación y acompañamiento durante todo el proceso.",
    ],
  },
  {
    slug: "masteres-2025",
    image: "https://www.unedlapalma.es/images/banners/1920x530_MASTERES.jpg",
    date: "Mayo 2025",
    title: "Preinscripción abierta para Másteres Oficiales",
    excerpt:
      "Del 19 de mayo al 9 de julio. Consulta las excepciones de plazo para algunos másteres específicos.",
    body: [
      "Ya está abierto el periodo de preinscripción para los Másteres Oficiales de la UNED, del 19 de mayo al 9 de julio de 2025.",
      "Algunos programas concretos disponen de plazos de preinscripción específicos, por lo que se recomienda consultar la información detallada en la web oficial de la UNED.",
      "El Centro Asociado UNED La Palma ofrece asesoramiento personalizado para orientar a los futuros estudiantes en la elección del máster que mejor se ajuste a su perfil profesional y académico.",
    ],
  },
  {
    slug: "cursos-verano-2025",
    image: "https://www.unedlapalma.es/images/banners/445x300.jpg",
    date: "Junio 2025",
    title: "Cursos de Verano UNED 2025 — 36ª edición",
    excerpt:
      "164 cursos en 60 sedes, del 10 de junio al 26 de septiembre, en formato presencial y online.",
    body: [
      "La UNED celebra la 36ª edición de sus Cursos de Verano con una oferta de 164 cursos repartidos en 60 sedes de toda España.",
      "Las actividades se desarrollarán entre el 10 de junio y el 26 de septiembre de 2025, con modalidades presencial, online y mixta para facilitar la participación.",
      "Los Cursos de Verano UNED son reconocidos por su rigor académico y por reunir a profesorado universitario y profesionales de prestigio en torno a temáticas de actualidad.",
    ],
  },
];

export const getNews = (slug: string) => news.find((n) => n.slug === slug);