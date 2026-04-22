import { Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const schedule = [
  { subject: "Derecho Civil I", teacher: "Prof. M. Hernández", day: "Lunes", time: "17:00 – 18:30", room: "Aula 2 · S/C" },
  { subject: "Psicología General", teacher: "Prof. A. Pérez", day: "Martes", time: "18:00 – 19:30", room: "Aula 1 · S/C" },
  { subject: "Historia Contemporánea", teacher: "Prof. J. Rodríguez", day: "Miércoles", time: "17:30 – 19:00", room: "Aula 3 · L. Llanos" },
  { subject: "Economía Aplicada", teacher: "Prof. C. Martín", day: "Jueves", time: "19:00 – 20:30", room: "Aula 2 · S/C" },
  { subject: "Matemáticas I (ADE)", teacher: "Prof. F. González", day: "Viernes", time: "17:00 – 18:30", room: "Aula 1 · L. Llanos" },
  { subject: "Lengua Inglesa I", teacher: "Prof. L. Smith", day: "Lunes", time: "19:00 – 20:30", room: "Aula 4 · S/C" },
];

const Tutorias = () => (
  <>
    <PageHeader
      eyebrow="Tutorías"
      title="Horario de Tutorías Presenciales"
      subtitle="Consulta los horarios por asignatura del curso 2025-2026. Las tutorías se imparten en nuestras sedes de Santa Cruz y Los Llanos de Aridane."
    />
    <section className="container-prose py-16">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card reveal">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th className="px-5 py-4 font-semibold">Asignatura</th>
              <th className="px-5 py-4 font-semibold hidden md:table-cell">Profesor/a</th>
              <th className="px-5 py-4 font-semibold">Día</th>
              <th className="px-5 py-4 font-semibold">Hora</th>
              <th className="px-5 py-4 font-semibold hidden sm:table-cell">Aula</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, i) => (
              <tr key={s.subject} className={i % 2 ? "bg-muted/30" : ""}>
                <td className="px-5 py-4 font-semibold text-primary">{s.subject}</td>
                <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{s.teacher}</td>
                <td className="px-5 py-4">{s.day}</td>
                <td className="px-5 py-4 inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-secondary" /> {s.time}</td>
                <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell"><MapPin className="inline h-3.5 w-3.5 text-secondary mr-1" />{s.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        * El horario puede sufrir modificaciones. Consulta el tablón de anuncios o contacta con secretaría para información actualizada.
      </p>
    </section>
  </>
);

export default Tutorias;