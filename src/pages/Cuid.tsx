import { CheckCircle2, Globe2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const languages = [
  { lang: "Inglés", levels: "A1 · A2 · B1 · B2 · C1" },
  { lang: "Francés", levels: "A1 · A2 · B1 · B2" },
  { lang: "Alemán", levels: "A1 · A2 · B1" },
  { lang: "Italiano", levels: "A1 · A2 · B1" },
  { lang: "Español para extranjeros", levels: "A1 · A2 · B1 · B2" },
  { lang: "Chino", levels: "A1 · A2" },
];

const Cuid = () => (
  <>
    <PageHeader
      eyebrow="CUID"
      title="Centro Universitario de Idiomas a Distancia"
      subtitle="Aprende idiomas con metodología UNED: cursos cuatrimestrales o anuales, certificados oficiales y exámenes presenciales en La Palma."
    />
    <section className="container-prose py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">¿Por qué estudiar idiomas en el CUID?</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Cursos reconocidos por el Marco Común Europeo de Referencia (MCER).",
              "Material didáctico online y plataforma multimedia interactiva.",
              "Tutorías a distancia y presenciales en el centro asociado.",
              "Exámenes oficiales con certificado universitario.",
              "Becas y precios públicos asequibles.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-foreground/85 leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal reveal-delay-1">
          {languages.map((l) => (
            <div key={l.lang} className="rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:border-secondary">
              <Globe2 className="h-5 w-5 text-accent" />
              <h3 className="mt-3 font-bold tracking-tight text-primary">{l.lang}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l.levels}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Cuid;