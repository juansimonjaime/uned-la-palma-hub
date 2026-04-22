import { useState } from "react";
import { Award, BookOpen, Building2, FileText, Mail, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "directivo", label: "Equipo Directivo" },
  { id: "pas", label: "PAS" },
  { id: "tutores", label: "Tutores" },
  { id: "cifras", label: "El Centro en Cifras" },
  { id: "transparencia", label: "Portal de Transparencia" },
  { id: "representantes", label: "Representantes" },
];

const directivo = [
  { name: "Yapci Bienes Pérez", cargo: "Director/a" },
  { name: "Yéssica Martín Pérez", cargo: "Secretaria" },
  { name: "Pedro Nicolás Martín Acosta", cargo: "Coordinador Académico" },
  { name: "José Antonio Fernández Arozena", cargo: "Coordinador Tecnológico" },
  { name: "Eva Medina Fuentes", cargo: "Coordinadora Extensión Los Llanos de Aridane" },
  { name: "Francisco Javier Neris Paz", cargo: "Coordinador" },
];

const pas = [{ name: "Carmen Luisa Díaz Alonso", cargo: "Limpiadora" }];

const stats = [
  { icon: Users, value: "1.200+", label: "Estudiantes matriculados" },
  { icon: BookOpen, value: "30+", label: "Grados y másteres" },
  { icon: Building2, value: "2", label: "Sedes en la isla" },
  { icon: Award, value: "50+", label: "Años de trayectoria" },
];

const documents = [
  {
    title: "IGAE Informe Cuentas 2018",
    url: "https://www.unedlapalma.es/images/documentos/IGAE%20informe%20%20Cuentas%202018.pdf",
  },
  {
    title: "IGAE Informe Cuentas 2017",
    url: "https://www.unedlapalma.es/images/documentos/IGAE%20informe%20Cuentas%202017.pdf",
  },
  {
    title: "IGAE Informe adicional Cuentas 2016",
    url: "https://www.unedlapalma.es/images/documentos/IGAE%20informe%20adicional%20Cuentas%202016.pdf",
  },
  {
    title: "IGAE Informe de recomendaciones Cuentas 2017",
    url: "https://www.unedlapalma.es/images/documentos/IGAE%20informe%20de%20recomendaciones%20Cuentas%202017.pdf",
  },
  {
    title: "Informe definitivo Cuentas 2016",
    url: "https://www.unedlapalma.es/images/documentos/INFORME%20DEFINITIVO%20UNED%20LA%20PALMA%20cuentas%202016.pdf",
  },
];

const PersonCard = ({ name, cargo }: { name: string; cargo: string }) => (
  <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-secondary hover:shadow-card-hover">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <User className="h-6 w-6" />
    </span>
    <div>
      <div className="font-bold tracking-tight text-primary">{name}</div>
      <div className="mt-1 text-sm font-medium text-accent-foreground">
        <span className="text-accent">{cargo}</span>
      </div>
    </div>
  </div>
);

const ElCentro = () => {
  const [active, setActive] = useState("directivo");

  return (
    <>
      <SEO
        title="El Centro Asociado — UNED La Palma"
        description="Conoce el equipo directivo, PAS, tutores y portal de transparencia del Centro Asociado UNED La Palma. Más de 1.200 estudiantes y 50 años de trayectoria."
        path="/el-centro"
      />
      <PageHeader
        eyebrow="El Centro"
        title="Conoce el Centro Asociado UNED La Palma"
        subtitle="Acercamos la formación universitaria pública a distancia a toda la isla, con un equipo humano y académico al servicio del estudiante."
      />

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-prose">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActive(t.id);
                  document.getElementById("tab-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "relative whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors",
                  active === t.id
                    ? "text-primary after:absolute after:left-2 after:right-2 after:bottom-0 after:h-0.5 after:bg-accent after:rounded-full"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id="tab-content" className="container-prose py-16 md:py-20">
        {active === "directivo" && (
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Equipo Directivo</h2>
            <p className="mt-3 text-muted-foreground">
              Las personas que dirigen y coordinan el Centro Asociado UNED La Palma.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {directivo.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>
        )}

        {active === "pas" && (
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              Personal de Administración y Servicios
            </h2>
            <p className="mt-3 text-muted-foreground">
              El equipo de PAS garantiza el funcionamiento diario del centro.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {pas.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>
        )}

        {active === "tutores" && (
          <div className="reveal max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Profesorado Tutor</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              El Centro Asociado UNED La Palma cuenta con un equipo de profesores tutores especializados en distintas
              áreas de conocimiento. Para consultar el listado actualizado de tutores y sus horarios de atención, accede
              a la sección de Tutorías.
            </p>
            <Link
              to="/tutorias"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
            >
              Ver Tutorías →
            </Link>
          </div>
        )}

        {active === "cifras" && (
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">El Centro en Cifras</h2>
            <p className="mt-3 text-muted-foreground">Datos que reflejan la dimensión y trayectoria del centro.</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-xl bg-card border border-border p-6 text-center shadow-card"
                >
                  <Icon className="mx-auto h-7 w-7 text-secondary" />
                  <div className="mt-3 text-3xl font-bold tracking-tight text-primary">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "transparencia" && (
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Portal de Transparencia</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
              En cumplimiento de la Ley 19/2013 de transparencia, acceso a la información pública y buen gobierno, el
              Centro Asociado UNED La Palma pone a disposición de los ciudadanos los siguientes documentos:
            </p>
            <ul className="mt-8 space-y-3">
              {documents.map((d) => (
                <li key={d.title}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-secondary hover:shadow-card-hover"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <div className="font-bold tracking-tight text-primary">{d.title}</div>
                      <div className="mt-1 text-sm font-semibold text-accent">Descargar PDF →</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "representantes" && (
          <div className="reveal max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              Representantes de los Estudiantes
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Los representantes de los estudiantes son el canal de comunicación entre el alumnado y los órganos de
              gobierno del centro. Para contactar con el Delegado de Estudiantes:
            </p>
            <a
              href="mailto:dgestudiantes@palma.uned.es"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
            >
              <Mail className="h-4 w-4" /> dgestudiantes@palma.uned.es
            </a>
          </div>
        )}
      </section>
    </>
  );
};

export default ElCentro;
