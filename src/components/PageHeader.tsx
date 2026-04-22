interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <section className="bg-primary text-primary-foreground">
    <div className="container-prose py-16 md:py-20">
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3 reveal">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight reveal reveal-delay-1">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-primary-foreground/80 leading-relaxed reveal reveal-delay-2">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHeader;