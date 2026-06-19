import "../../globals.css"; // We load Tailwind for the Navbar to work
import "./sorteo.css";     // We load the isolated Sorteo design system
import { Navbar } from "@/components/layout/Navbar";

export default function SorteoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar adapts to light mode automatically because of bg-soft in global Navbar */}
      <Navbar />
      
      {/* Sorteo Content wrapped in its specific scoping class */}
      <div className="ds-page-container pt-[78px] flex-1">
        {children}
      </div>
    </div>
  );
}
