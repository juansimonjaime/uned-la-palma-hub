import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/el-centro", label: "El Centro" },
  { to: "/tutorias", label: "Tutorías" },
  { to: "/servicios", label: "Servicios" },
  { to: "/cuid", label: "CUID" },
  { to: "/extension-universitaria", label: "Extensión" },
  { to: "/contacto", label: "Contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-2 text-sm font-medium transition-colors hover:text-primary",
      isActive
        ? "text-primary after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-accent after:rounded-full"
        : "text-foreground/80",
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-primary">UNED La Palma</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Centro Asociado</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-muted transition-colors"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border/60 bg-background transition-[max-height] duration-300 ease-smooth",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="container-prose flex flex-col py-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "py-2.5 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;