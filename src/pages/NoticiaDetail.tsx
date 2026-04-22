import { ArrowLeft, Bell } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { getNews } from "@/data/news";

const NoticiaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getNews(slug) : undefined;

  if (!item) return <Navigate to="/noticias" replace />;

  return (
    <>
      <SEO
        title={`${item.title} — UNED La Palma`}
        description={item.excerpt}
        path={`/noticias/${item.slug}`}
      />
      <article className="container-prose py-12 md:py-16 max-w-4xl">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a Noticias
        </Link>

        <header className="mt-8 reveal">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Bell className="h-3 w-3" /> {item.date}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-primary leading-[1.1]">
            {item.title}
          </h1>
        </header>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-muted reveal">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        <div className="mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed reveal">
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {item.contact && (
            <p className="text-sm text-muted-foreground border-t border-border pt-5">
              <strong className="text-primary">Contacto:</strong>{" "}
              <a href={`mailto:${item.contact}`} className="text-secondary hover:underline">
                {item.contact}
              </a>
            </p>
          )}
        </div>

        <div className="mt-12">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-primary transition-smooth hover:border-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a Noticias
          </Link>
        </div>
      </article>
    </>
  );
};

export default NoticiaDetail;