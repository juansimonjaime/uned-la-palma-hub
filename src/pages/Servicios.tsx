import { BookOpen, Headphones, Laptop, Library, Users, Wifi } from "lucide-react";
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
  </>
);

export default Servicios;