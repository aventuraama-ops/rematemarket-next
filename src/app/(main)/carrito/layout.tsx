import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo — Remate Market Importaciones",
  description:
    "Explora todos nuestros productos importados, filtra por categoría, precio o remate y arma tu cotización al instante.",
  openGraph: {
    title: "Catálogo de productos — Remate Market",
  },
};

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
