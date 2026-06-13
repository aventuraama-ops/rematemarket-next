import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartStoreProvider } from "@/providers/store-provider";
import { FloatingActions } from "@/components/shared/FloatingActions";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Remate Market Importaciones",
  description: "Importadora Directa: Stock Real y Precios de Remate",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans antialiased min-h-screen bg-background text-foreground flex flex-col`}>
        <CartStoreProvider>
          {children}
          <FloatingActions />
        </CartStoreProvider>
      </body>
    </html>
  );
}

