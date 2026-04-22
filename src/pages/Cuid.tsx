import { ArrowRight, CheckCircle2, Globe2, Info } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const languages = [
  { lang: "Inglés", levels: "A1 · A2 · B1 · B2 · C1" },
  { lang: "Alemán", levels: "A1 · A2 · B1" },
];

const Cuid = () => (
  <>
    <SEO
      title="CUID — Cursos de Idiomas | UNED La Palma"
      description="Cursos de inglés y alemán del CUID UNED en La Palma. Niveles oficiales del Marco Común Europeo de Referencia con metodología a distancia y tutorías presenciales."
      path="/cuid"
    />
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

      <div className="mt-12 rounded-2xl border border-secondary/30 bg-secondary/5 p-6 md:p-8 reveal">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
            <Info className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold tracking-tight text-primary">Más idiomas a distancia</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Además de inglés y alemán, el CUID UNED ofrece otros idiomas a distancia. Consulta la oferta completa en el
              campus virtual.
            </p>
            <a
              href="https://www.uned.es/universidad/inicio/estudios/cuid.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-smooth hover:brightness-110"
            >
              Ver todos los idiomas CUID <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Cuid;