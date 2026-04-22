import { CalendarDays, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const events = [
  { date: "15 May", title: "Jornadas de Astronomía en La Palma", place: "Sede S/C de La Palma", desc: "Ciclo de conferencias sobre el cielo de Canarias y los grandes telescopios del Roque de los Muchachos." },
  { date: "02 Jun", title: "Curso de Verano: Vulcanología y Sociedad", place: "Los Llanos de Aridane", desc: "Aproximación científica y social a la erupción de Cumbre Vieja y sus consecuencias." },
  { date: "20 Jun", title: "Encuentro de Literatura Canaria", place: "Sede S/C de La Palma", desc: "Mesas redondas con autoras y autores de las islas, abierto al público general." },
  { date: "10 Jul", title: "Taller de Inteligencia Artificial Aplicada", place: "Aula AVIP · S/C", desc: "Introducción práctica a herramientas de IA generativa para el ámbito profesional." },
];

const Extension = () => (
  <>
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
  </>
);

export default Extension;