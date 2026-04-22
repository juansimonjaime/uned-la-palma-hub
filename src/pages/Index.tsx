import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import heroImage from "@/assets/hero-lapalma.jpg";
import SEO from "@/components/SEO";
import AlertBanner from "@/components/AlertBanner";
import { news as allNews } from "@/data/news";

const quickLinks = [
  { icon: ClipboardList, title: "Tablón de Anuncios", desc: "Información oficial y comunicados del centro.", to: "/noticias" },
  { icon: CalendarDays, title: "Horario de Tutorías", desc: "Consulta los horarios por asignatura y cuatrimestre.", to: "/tutorias" },
  { icon: BookOpen, title: "Biblioteca", desc: "Servicio de préstamo, salas de estudio y recursos.", to: "/servicios" },
  { icon: MapPin, title: "Contacto y Sedes", desc: "Sedes en Santa Cruz y Los Llanos de Aridane.", to: "/contacto" },
];

const news = allNews.slice(0, 3);

const Index = () => {
  return (
    <>
      <SEO
        title="UNED La Palma — Centro Asociado | Estudia en La Palma"
        description="Centro Asociado de la UNED en La Palma, Canarias. Formación universitaria a distancia con apoyo presencial. Tutorías, biblioteca, extensión universitaria y cursos de idiomas."
        path="/"
      />
      <AlertBanner />
      {/* Hero */}
      <section className="relative isolate overflow-hidden" style={{ height: "80vh", minHeight: 560 }}>
        <img
          src={heroImage}
          alt="Costa de la isla de La Palma al atardecer"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="relative z-10 flex h-full items-center">
          <div className="container-prose text-center text-primary-foreground">
            <span className="inline-block rounded-full border border-accent/40 bg-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent reveal">
              Centro Asociado · La Palma, Canarias
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] reveal reveal-delay-1">
              Estudia con la UNED en La Palma
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-primary-foreground/85 leading-relaxed reveal reveal-delay-2">
              Formación universitaria a distancia, con apoyo presencial en tu isla.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 reveal reveal-delay-3">
              <Link
                to="/tutorias"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-card-hover transition-smooth hover:brightness-105 hover:-translate-y-0.5"
              >
                Ver Tutorías <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 bg-transparent px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary-foreground/10"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-20 md:py-24">
        <div className="container-prose">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Bienvenido</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-primary">Accesos Rápidos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map(({ icon: Icon, title, desc, to }, i) => (
              <Link
                key={title}
                to={to}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-secondary hover:shadow-card-hover reveal"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold tracking-tight text-primary">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                  Acceder <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container-prose">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Actualidad</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-primary">
                Últimas Noticias y Avisos
              </h2>
            </div>
            <Link to="/noticias" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:gap-2 transition-all">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <article
                key={n.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover reveal"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
                    <Bell className="h-3 w-3" /> {n.date}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-primary leading-snug">{n.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{n.excerpt}</p>
                  <Link to={`/noticias/${n.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                    Leer más <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Two Locations */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-prose pt-20 md:pt-24 pb-0">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Convocatorias destacadas</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Programas y formación</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { src: "https://www.unedlapalma.es/images/banners/414x530_becas_25.jpg", alt: "Becas UNED 2025/26" },
              { src: "https://www.unedlapalma.es/images/banners/445x300.jpg", alt: "Cursos de Verano UNED 2025" },
              { src: "https://www.unedlapalma.es/images/banners/1920x530_MASTERES.jpg", alt: "Másteres Oficiales UNED" },
              { src: "https://www.unedlapalma.es/images/banners/1080x1080_FP_CAS.jpg", alt: "Formación Permanente" },
              { src: "https://www.unedlapalma.es/images/banners/Taller_Meteo_UNED.jpg", alt: "Curso de Meteorología" },
              { src: "https://www.unedlapalma.es/images/banners/2019_banner_unidis.jpg", alt: "UNIDIS — Atención a la diversidad" },
            ].map((b) => (
              <Link
                key={b.alt}
                to="/noticias"
                className="group relative block overflow-hidden rounded-lg border border-accent/20 bg-primary-foreground/5 aspect-square transition-smooth hover:border-accent hover:-translate-y-0.5"
                aria-label={b.alt}
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="container-prose py-20 md:py-24">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Estamos cerca de ti</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Nuestras Sedes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-accent/30 rounded-2xl overflow-hidden">
            {[
              {
                name: "Sede Santa Cruz de La Palma",
                phone: "922 411 338",
                schedule: "10:30 – 14:00 / 16:30 – 20:00",
                address: "Avenida Tte. Gral. Gutiérrez Mellado, 26",
              },
              {
                name: "Sede Los Llanos de Aridane",
                phone: "922 462 230",
                schedule: "Consultar horario de atención",
                address: "Los Llanos de Aridane, La Palma",
              },
            ].map((s) => (
              <div key={s.name} className="bg-primary p-8 md:p-10">
                <div className="flex items-center gap-2 text-accent mb-3">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Sede</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{s.name}</h3>
                <ul className="mt-6 space-y-3 text-sm text-primary-foreground/85">
                  <li className="flex items-start gap-3">
                    <Clock className="h-4 w-4 mt-0.5 text-accent" />
                    <span>{s.schedule}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-4 w-4 mt-0.5 text-accent" />
                    <span>{s.phone}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-accent" />
                    <span>{s.address}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
