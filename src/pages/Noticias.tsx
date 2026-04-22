import { ArrowRight, Bell, ExternalLink, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { news } from "@/data/news";

const Noticias = () => (
  <>
    <SEO
      title="Noticias y Avisos — UNED La Palma"
      description="Información oficial, convocatorias y actividades del Centro Asociado UNED La Palma. Becas, cursos, graduaciones y eventos académicos."
      path="/noticias"
    />
    <PageHeader
      eyebrow="Actualidad"
      title="Noticias y Avisos"
      subtitle="Información oficial, convocatorias y actividades del Centro Asociado UNED La Palma."
    />

    <section className="container-prose py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n, i) => (
          <Link
            key={n.title}
            to={`/noticias/${n.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover reveal"
            style={{ animationDelay: `${0.06 * i}s` }}
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={n.image}
                alt={n.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Bell className="h-3 w-3" /> {n.date}
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-primary leading-snug">{n.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{n.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                Leer más <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="bg-muted/40 py-16">
      <div className="container-prose text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
          Síguenos también en
        </h2>
        <p className="mt-3 text-muted-foreground">
          Mantente al día con todos los contenidos del Centro Asociado.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.youtube.com/channel/UCeuK5Vd7uOqreFxPViVGerQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:brightness-110"
          >
            <Youtube className="h-4 w-4" /> Canal de YouTube UNED La Palma →
          </a>
          <a
            href="http://noticias-unedlapalma.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-primary transition-smooth hover:border-secondary"
          >
            <ExternalLink className="h-4 w-4" /> Blog de Noticias →
          </a>
        </div>
      </div>
    </section>
  </>
);

export default Noticias;
