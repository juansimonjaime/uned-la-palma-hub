import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const AlertBanner = () => {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-accent text-accent-foreground" role="alert">
      <div className="container-prose flex items-start gap-3 py-3 px-4 md:px-6">
        <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" aria-hidden />
        <p className="flex-1 text-sm font-medium leading-relaxed">
          <span className="font-bold">Aviso:</span> La sede de Santa Cruz de La Palma se encuentra actualmente cerrada. Los exámenes se realizan en la sede de Los Llanos de Aridane.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar aviso"
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-accent-foreground/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;