import { Accessibility, ArrowRight, Briefcase, Clock, ExternalLink, FileText, Headphones, Laptop, Library, MapPin, MessageSquare, Users, Wifi } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const services = [
  { icon: Laptop, title: "Aulas AVIP", desc: "Aulas con tecnología de webconferencia para tutorías en directo y grabadas." },
  { icon: Headphones, title: "Aulas de exámenes", desc: "Convocatorias presenciales en febrero, junio y septiembre con apoyo técnico." },
  { icon: Wifi, title: "Conectividad WiFi", desc: "Acceso a internet de alta velocidad en todas las dependencias del centro." },
  { icon: Users, title: "Orientación al estudiante", desc: "Asesoramiento académico, COIE y atención a la diversidad funcional." },
];

const Servicios = () => (
  <>
    <SEO
      title="Servicios al Estudiante — UNED La Palma"
      description="Biblioteca, aulas AVIP, salas de exámenes, conectividad WiFi y orientación académica en el Centro Asociado UNED La Palma."
      path="/servicios"
    />
    <PageHeader
      eyebrow="Servicios"
      title="Servicios al Estudiante"
      subtitle="Recursos académicos, tecnológicos y de orientación pensados para acompañarte en cada etapa de tus estudios."
    />
    <section className="container-prose py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(({ icon: Icon, title, desc }, i) => (
        <div
          key={title}
          className="rounded-xl border border-border bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:border-secondary hover:shadow-card-hover reveal"
          style={{ animationDelay: `${0.05 * i}s` }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-lg font-bold tracking-tight text-primary">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      ))}
    </section>

    {/* Biblioteca Universitaria */}
    <section className="container-prose pb-4">
      <div className="reveal rounded-2xl border border-border bg-card p-8 md:p-10 shadow-card">
        <div className="grid md:grid-cols-[auto,1fr] gap-6 items-start">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Library className="h-7 w-7" />
          </span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Servicio</span>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-primary">Biblioteca Universitaria</h2>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-secondary" /> Plaza de España Nº1, Santa Cruz de La Palma
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Reservas</h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground/85 leading-relaxed">
                  <li>· Pueden hacer reservas estudiantes, tutores y PAS.</li>
                  <li>· Máximo de 2 ejemplares en reserva simultánea.</li>
                  <li>
                    · La Biblioteca no hace reservas de documentos en "ESTANTERÍA", excluidos de préstamo o ya
                    prestados al mismo usuario.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Horario de préstamo (periodo lectivo)</h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                    <span>Lunes a jueves: 10:00 – 13:00 y 16:30 – 20:00</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                    <span>Viernes: 10:00 – 13:00</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs italic text-muted-foreground">
                  Las salas de estudio mantienen el mismo horario que el préstamo.
                </p>
              </div>
            </div>

            <a
              href="http://biblio15.uned.es/recomendada.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:brightness-110"
            >
              Acceder al catálogo UNED <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* COIE + UNIDIS */}
    <section className="container-prose py-10 grid gap-6 md:grid-cols-2">
      <div className="reveal rounded-2xl border border-border bg-card p-8 shadow-card">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
          <Briefcase className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-primary">
          COIE — Centro de Orientación e Información de Empleo
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Servicio de orientación académica y laboral para estudiantes de la UNED en La Palma.
        </p>
        <div className="mt-5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Horario de atención académica</h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
              <span>Martes: 17:00 – 19:00 (Sede Los Llanos de Aridane)</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
              <span>Miércoles: 17:00 – 19:00 (Sede Santa Cruz de La Palma)</span>
            </li>
          </ul>
        </div>
        <a
          href="http://coie-server.uned.es"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
        >
          Acceder al COIE <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="reveal rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
        <div className="aspect-[16/7] overflow-hidden bg-muted">
          <img
            src="https://www.unedlapalma.es/images/banners/2019_banner_unidis.jpg"
            alt="UNIDIS — Atención a Universitarios con Discapacidad"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Accessibility className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-xl font-bold tracking-tight text-primary">
            UNIDIS — Atención a Universitarios con Discapacidad
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
            Centro de Atención a Universitarios con Discapacidad adscrito al Vicerrectorado de Estudiantes e Inclusión
            de la UNED. Garantiza igualdad de oportunidades para estudiantes con discapacidad.
          </p>
          <a
            href="https://www.uned.es/universidad/inicio/unidad/unidis.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-secondary bg-card px-5 py-3 text-sm font-semibold text-secondary transition-smooth hover:bg-secondary hover:text-secondary-foreground"
          >
            Más información <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>

    {/* Carta de Servicios + Quejas */}
    <section className="container-prose pb-20 grid gap-6 md:grid-cols-2">
      <div className="reveal rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 to-accent/5 p-8 shadow-card">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent">
          <FileText className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-primary">Carta de Servicios</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Documento que recoge los compromisos de calidad del Centro Asociado UNED La Palma con sus estudiantes y
          usuarios.
        </p>
        <a
          href="https://www.unedlapalma.es/images/documentos/24-25/Carta_de_Servicios_del_centro_de_La_Palma_edicin_5.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:brightness-110"
        >
          <FileText className="h-4 w-4" /> Descargar Carta de Servicios (PDF) →
        </a>
      </div>

      <div className="reveal rounded-2xl border border-secondary/30 bg-card p-8 shadow-card">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
          <MessageSquare className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-primary">Quejas y Sugerencias</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          ¿Tienes alguna queja, sugerencia o felicitación? Ayúdanos a mejorar utilizando nuestro formulario oficial.
        </p>
        <a
          href="https://docs.google.com/forms/d/1wKK5ovaSREDo7KrF5wGD1QIUATxtDdfndZGrS4ux3x0/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
        >
          Acceder al formulario →
        </a>
      </div>
    </section>
  </>
);

export default Servicios;
