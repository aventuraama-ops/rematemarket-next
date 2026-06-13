import { ActiveImport } from "@/components/sections/ActiveImport";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = {
  title: "Importa con Nosotros | Remate Market",
  description: "Únete a nuestras campañas de importación abierta y accede a precios de fábrica directos desde el contenedor.",
};

export default function ImportaConNosotrosPage() {
  return (
    <main className="flex flex-col min-h-screen pt-[78px]">
      <ActiveImport />
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}
