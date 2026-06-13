"use client";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { CTA } from "@/components/shared/CTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Package, CreditCard, Truck, RotateCcw, MessageCircle } from "lucide-react";

// TODO: InsForge — SELECT * FROM faqs WHERE publicada ORDER BY categoria, orden
const categorias = [
  {
    icon: Package,
    titulo: "Pedidos",
    items: [
      {
        q: "¿Cuánto es la compra mínima?",
        a: "Desde 1 unidad. Tenemos descuentos por docena y cajón cerrado.",
      },
      {
        q: "¿Puedo modificar mi pedido después de cotizar?",
        a: "Sí, mientras no hayas hecho el adelanto. Escríbenos por WhatsApp.",
      },
    ],
  },
  {
    icon: CreditCard,
    titulo: "Pagos",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Yape, Plin, transferencias bancarias, VISA/Mastercard y pago contra entrega en Lima.",
      },
      {
        q: "¿Emiten boleta y factura?",
        a: "Sí, ambos. Indícanos al momento de cotizar qué necesitas.",
      },
    ],
  },
  {
    icon: Truck,
    titulo: "Envíos",
    items: [
      {
        q: "¿Hacen envíos a provincia?",
        a: "Sí, a todo el Perú vía Shalom, Olva, Marvisur y courier directo.",
      },
      {
        q: "¿En cuánto tiempo llega mi pedido?",
        a: "Stock: 24-48h Lima, 1-4 días provincias. Campañas: plazo anunciado al abrir cupos.",
      },
    ],
  },
  {
    icon: RotateCcw,
    titulo: "Devoluciones",
    items: [
      {
        q: "¿Aceptan devoluciones?",
        a: "Sí, dentro de los 7 días si el producto llega con falla de fábrica.",
      },
      {
        q: "¿Qué pasa si llega un producto dañado en transporte?",
        a: "Lo reemplazamos sin costo. Solo necesitamos foto y guía de la agencia.",
      },
    ],
  },
];

export default function AyudaPage() {
  return (
    <div className="pb-24 bg-background">
      <PageHero
        eyebrow="Centro de ayuda"
        title="Resolvemos tus dudas"
        highlight="en minutos"
        description="Las preguntas más comunes sobre pedidos, pagos, envíos y devoluciones. Y si no está aquí, WhatsApp atiende en horario extendido."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Ayuda" }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-rm max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 0.05}>
                <a
                  href={`#${c.titulo.toLowerCase()}`}
                  className="block rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift hover:border-primary/30"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/10">
                    <c.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{c.titulo}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-muted-foreground">
                    {c.items.length} preguntas
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 space-y-16">
            {categorias.map((c) => (
              <div key={c.titulo} id={c.titulo.toLowerCase()} className="scroll-mt-32">
                <Reveal>
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                    <div className="grid size-10 place-items-center rounded-lg bg-primary/10">
                      <c.icon className="size-5 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl font-black tracking-tight text-ink md:text-3xl">
                      {c.titulo}
                    </h2>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <Accordion type="single" collapsible className="w-full">
                    {c.items.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`${c.titulo}-${i}`}
                        className="border-border bg-white rounded-2xl mb-4 px-6 shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all"
                      >
                        <AccordionTrigger className="text-left text-base font-bold text-ink hover:text-primary py-5">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground font-medium text-[15px] leading-relaxed pb-5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-24 overflow-hidden rounded-[40px] bg-gradient-to-br from-ink to-[#1a1a1a] p-10 text-center text-white md:p-20 relative shadow-glow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#25D366]/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <MessageCircle
                  className="mx-auto size-14 text-[#25D366]"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <h3 className="mt-6 font-display text-3xl font-black md:text-4xl tracking-tight">
                  ¿No encontraste tu respuesta?
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-white/70 font-medium text-lg mb-8">
                  Nuestro equipo te atiende por WhatsApp de lunes a sábado.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/51987654321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-[#20bd5a] shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  >
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
