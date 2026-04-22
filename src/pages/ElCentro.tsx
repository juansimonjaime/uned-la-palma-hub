import { Award, BookOpen, Building2, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const stats = [
  { icon: Users, value: "1.200+", label: "Estudiantes matriculados" },
  { icon: BookOpen, value: "30+", label: "Grados y másteres" },
  { icon: Building2, value: "2", label: "Sedes en la isla" },
  { icon: Award, value: "50+", label: "Años de trayectoria" },
];

const ElCentro = () => (
  <>
    <PageHeader
      eyebrow="El Centro"
      title="Conoce el Centro Asociado UNED La Palma"
      subtitle="Acercamos la formación universitaria pública a distancia a toda la isla, con un equipo humano y académico al servicio del estudiante."
    />
    <section className="container-prose py-16 md:py-20 grid md:grid-cols-2 gap-12">
      <div className="reveal">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Nuestra misión</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          El Centro Asociado de la UNED en La Palma es la representación institucional de la Universidad Nacional de Educación a Distancia en la isla. Nuestra misión es facilitar el acceso a la educación superior pública mediante tutorías presenciales, recursos académicos, biblioteca y un acompañamiento cercano durante toda la trayectoria del estudiante.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Trabajamos en colaboración con la Sede Central de la UNED y con instituciones locales para ofrecer una experiencia universitaria completa, conciliable con la vida laboral y familiar.
        </p>
      </div>
      <div className="reveal reveal-delay-1">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Equipo humano</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Contamos con un equipo de profesorado tutor especializado, personal de administración y servicios, así como órganos de gobierno que velan por el correcto funcionamiento del centro.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-foreground/80">
          <li>· Director/a del Centro Asociado</li>
          <li>· Secretaría académica y administrativa</li>
          <li>· Profesorado tutor por áreas de conocimiento</li>
          <li>· Coordinación de extensión universitaria</li>
          <li>· Servicio de biblioteca y atención al estudiante</li>
        </ul>
      </div>
    </section>
    <section className="bg-muted/40 py-16">
      <div className="container-prose grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={label}
            className="rounded-xl bg-card border border-border p-6 text-center shadow-card reveal"
            style={{ animationDelay: `${0.06 * i}s` }}
          >
            <Icon className="mx-auto h-7 w-7 text-secondary" />
            <div className="mt-3 text-3xl font-bold tracking-tight text-primary">{value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default ElCentro;