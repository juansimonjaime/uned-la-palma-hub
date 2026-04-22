import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index.tsx";
import ElCentro from "./pages/ElCentro.tsx";
import Tutorias from "./pages/Tutorias.tsx";
import Servicios from "./pages/Servicios.tsx";
import Cuid from "./pages/Cuid.tsx";
import Extension from "./pages/Extension.tsx";
import Noticias from "./pages/Noticias.tsx";
import Contacto from "./pages/Contacto.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/el-centro" element={<ElCentro />} />
            <Route path="/tutorias" element={<Tutorias />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/cuid" element={<Cuid />} />
            <Route path="/extension-universitaria" element={<Extension />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
