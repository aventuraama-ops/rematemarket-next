import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotiza tu pedido — Remate Market Importaciones",
  description:
    "Arma tu carrito, completa tus datos y recibe una cotización por WhatsApp en minutos con precio, plazos y stock real.",
  openGraph: {
    title: "Cotiza tu pedido — Remate Market",
    description: "Cotización rápida por WhatsApp. Stock real, precio de importación directa.",
  },
};

export default function CotizarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
