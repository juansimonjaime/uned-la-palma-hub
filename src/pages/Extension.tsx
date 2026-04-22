import { CalendarDays, MapPin, ArrowRight, GraduationCap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const events = [
  { date: "15 May", title: "Jornadas de Astronomía en La Palma", place: "Sede S/C de La Palma", desc: "Ciclo de conferencias sobre el cielo de Canarias y los grandes telescopios del Roque de los Muchachos." },
  { date: "02 Jun", title: "Curso de Verano: Vulcanología y Sociedad", place: "Los Llanos de Aridane", desc: "Aproximación científica y social a la erupción de Cumbre Vieja y sus consecuencias." },
  { date: "20 Jun", title: "Encuentro de Literatura Canaria", place: "Sede S/C de La Palma", desc: "Mesas redondas con autoras y autores de las islas, abierto al público general." },
  { date: "10 Jul", title: "Taller de Inteligencia Artificial Aplicada", place: "Aula AVIP · S/C", desc: "Introducción práctica a herramientas de IA generativa para el ámbito profesional." },
];

const Extension = () => (
  <>
    <SEO
      title="Extensión Universitaria — UNED La Palma"
      description="Cursos de verano, jornadas, conferencias y actividades culturales del Centro Asociado UNED La Palma, abiertos a toda la ciudadanía."
      path="/extension-universitaria"
    />
    <PageHeader
      eyebrow="Extensión Universitaria"
      title="Cursos, jornadas y actividades culturales"
      subtitle="La UNED en La Palma promueve actividades abiertas a toda la ciudadanía: cursos de verano, conferencias, talleres y eventos culturales."
    />
    <section className="container-prose py-16 space-y-5">
      {events.map((e, i) => (
        <article
          key={e.title}
          className="grid md:grid-cols-[140px_1fr] gap-6 rounded-xl border border-border bg-card p-6 md:p-7 shadow-card transition-smooth hover:border-secondary hover:shadow-card-hover reveal"
          style={{ animationDelay: `${0.05 * i}s` }}
        >
          <div className="flex md:flex-col items-center md:items-start justify-start gap-2 md:gap-1 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6">
            <CalendarDays className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold tracking-tight text-primary">{e.date}</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">2026</span>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-primary">{e.title}</h3>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
              <MapPin className="h-3.5 w-3.5" /> {e.place}
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
          </div>
        </article>
      ))}
    </section>
    <section className="container-prose pb-20">
      <div className="rounded-2xl border-2 border-secondary/40 bg-gradient-to-br from-secondary/10 via-card to-card p-8 md:p-10 shadow-card">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Matrícula</h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Para formalizar tu matrícula en los Cursos de Extensión Universitaria de la UNED, accede al portal oficial de extensión universitaria.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="https://extension.uned.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-base font-bold text-secondary-foreground shadow-card transition-smooth hover:bg-secondary/90 hover:shadow-card-hover"
              >
                Matricularme en Extensión Universitaria
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="https://extension.uned.es/tipologiacursos/extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline hover:text-secondary transition-smooth"
              >
                Ver todos los cursos de Extensión UNED →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Extension;