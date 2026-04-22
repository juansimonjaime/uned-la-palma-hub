import { BookOpen, FileText, Headphones, Laptop, Library, MessageSquare, Users, Wifi } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const services = [
  { icon: Library, title: "Biblioteca", desc: "Servicio de préstamo, consulta de fondos UNED y acceso a bases de datos académicas." },
  { icon: Laptop, title: "Aulas AVIP", desc: "Aulas con tecnología de webconferencia para tutorías en directo y grabadas." },
  { icon: Headphones, title: "Aulas de exámenes", desc: "Convocatorias presenciales en febrero, junio y septiembre con apoyo técnico." },
  { icon: Wifi, title: "Conectividad WiFi", desc: "Acceso a internet de alta velocidad en todas las dependencias del centro." },
  { icon: Users, title: "Orientación al estudiante", desc: "Asesoramiento académico, COIE y atención a la diversidad funcional." },
  { icon: BookOpen, title: "Salas de estudio", desc: "Espacios silenciosos disponibles en horario de apertura para preparar exámenes." },
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
