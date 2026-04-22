import { Link } from "react-router-dom";
import { ExternalLink, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const unedLinks = [
  { label: "Campus UNED", href: "http://portal.uned.es/portal/page?_pageid=93,1652697&_dad=portal&_schema=PORTAL" },
  { label: "Admisión y Matrícula", href: "https://app.uned.es/portal/admision-matricula-por-internet" },
  { label: "Becas y Ayudas", href: "https://www.uned.es/universidad/inicio/estudiantes/becas-y-ayudas.html" },
  { label: "Repositorio de Exámenes", href: "http://www.calatayud.uned.es/Examenes/examenes_step_1.asp" },
  { label: "INTECCA", href: "https://www.intecca.uned.es/inteccainfo/" },
  { label: "Fundación UNED", href: "https://www.fundacion.uned.es/" },
  { label: "UNED Sénior", href: "https://www.uned.es/universidad/inicio/estudios/uned-senior.html" },
];

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Enlaces rápidos</h3>
          <ul className="space-y-2 text-sm text-footer-foreground/80">
            <li><Link to="/el-centro" className="hover:text-accent transition-colors">El Centro</Link></li>
            <li><Link to="/tutorias" className="hover:text-accent transition-colors">Tutorías</Link></li>
            <li><Link to="/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
            <li><Link to="/cuid" className="hover:text-accent transition-colors">Idiomas (CUID)</Link></li>
            <li><Link to="/extension-universitaria" className="hover:text-accent transition-colors">Extensión Universitaria</Link></li>
            <li><Link to="/noticias" className="hover:text-accent transition-colors">Noticias</Link></li>
          </ul>

          <h4 className="mt-7 text-xs font-bold uppercase tracking-wider text-accent/90 mb-3">UNED General</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-footer-foreground/70">
            {unedLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                >
                  {l.label}
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-footer-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span>Sede S/C de La Palma · Sede Los Llanos de Aridane</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" /> 922 411 338 · 922 462 230
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" /> info@lapalma.uned.es
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Redes sociales</h3>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-footer-foreground/15 hover:border-accent hover:text-accent transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-footer-foreground/60 leading-relaxed">
            Síguenos para conocer convocatorias, eventos académicos y actividades de extensión universitaria.
          </p>
        </div>
      </div>
      <div className="border-t border-footer-foreground/10">
        <div className="container-prose py-10">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-accent mb-6">
            Instituciones colaboradoras
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-6">
            {[
              { src: "https://www.unedlapalma.es/images/cabildo.JPG", alt: "Cabildo de La Palma", href: "https://cabildodelapalma.es/" },
              { src: "https://www.unedlapalma.es/images/cobcanarias.JPG", alt: "Gobierno de Canarias", href: "https://www.gobiernodecanarias.org/principal/" },
              { src: "https://www.unedlapalma.es/images/escudito.JPG", alt: "Ayuntamiento de Santa Cruz de La Palma", href: "https://sede.santacruzdelapalma.es/" },
              { src: "https://www.unedlapalma.es/images/otroescudiro.JPG", alt: "Ayuntamiento de Los Llanos de Aridane", href: "https://www.aridane.org/city/" },
            ].map((i) => (
              <a
                key={i.alt}
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg bg-white/95 p-4 transition-transform hover:-translate-y-0.5 hover:bg-white"
                aria-label={i.alt}
              >
                <img src={i.src} alt={i.alt} className="h-16 w-auto object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-footer-foreground/10">
        <div className="container-prose py-5 text-center text-xs text-footer-foreground/60">
          © 2025 Centro Asociado UNED La Palma · Powered by UNED
        </div>
      </div>
    </footer>
  );
};

export default Footer;