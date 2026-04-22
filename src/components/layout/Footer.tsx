import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

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
        <div className="container-prose py-5 text-center text-xs text-footer-foreground/60">
          © 2025 Centro Asociado UNED La Palma · Powered by UNED
        </div>
      </div>
    </footer>
  );
};

export default Footer;