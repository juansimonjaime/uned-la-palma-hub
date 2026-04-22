import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const sedes = [
  {
    name: "Sede Santa Cruz de La Palma",
    address: "Avenida Tte. Gral. Gutiérrez Mellado, 26 — 38700 S/C de La Palma",
    phone: "922 411 338",
    email: "info@lapalma.uned.es",
    schedule: "Lunes a viernes · 10:30 – 14:00 / 16:30 – 20:00",
  },
  {
    name: "Sede Los Llanos de Aridane",
    address: "Los Llanos de Aridane — La Palma",
    phone: "922 462 230",
    email: "llanos@lapalma.uned.es",
    schedule: "Consultar horario de atención",
  },
];

const Contacto = () => (
  <>
    <SEO
      title="Contacto y Sedes — UNED La Palma"
      description="Contacta con el Centro Asociado UNED La Palma. Sedes en Santa Cruz de La Palma y Los Llanos de Aridane: teléfonos, correos y horarios de atención."
      path="/contacto"
    />
    <PageHeader
      eyebrow="Contacto"
      title="Estamos para ayudarte"
      subtitle="Visítanos, llámanos o escríbenos. Contamos con dos sedes para acercar la UNED a toda la isla de La Palma."
    />
    <section className="container-prose py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      {sedes.map((s, i) => (
        <div
          key={s.name}
          className="rounded-xl border border-border bg-card p-8 shadow-card transition-smooth hover:border-secondary hover:shadow-card-hover reveal"
          style={{ animationDelay: `${0.08 * i}s` }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sede</span>
          <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-primary">{s.name}</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <span className="text-foreground/85">{s.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <a href={`tel:${s.phone.replace(/ /g, "")}`} className="text-foreground/85 hover:text-secondary">{s.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <a href={`mailto:${s.email}`} className="text-foreground/85 hover:text-secondary">{s.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <span className="text-foreground/85">{s.schedule}</span>
            </li>
          </ul>
        </div>
      ))}
    </section>
    <section className="container-prose pb-20">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card reveal">
        <div className="flex items-center gap-2 text-secondary">
          <Video className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Webcam</span>
        </div>
        <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-primary">
          Plaza de España en directo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Imagen en directo de la Plaza de España de Santa Cruz de La Palma, junto a nuestra sede principal.
        </p>
        <a
          href="https://www.unedlapalma.es/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 block overflow-hidden rounded-xl border border-border"
          aria-label="Abrir webcam de la Plaza de España"
        >
          <img
            src="https://www.unedlapalma.es/images/La_Plaza_de_Espana.jpg"
            alt="Webcam de la Plaza de España, Santa Cruz de La Palma"
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>
      </div>
    </section>
  </>
);

export default Contacto;