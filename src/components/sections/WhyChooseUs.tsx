"use client";

import { Factory, Layers, Boxes, Container } from "lucide-react";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";

const benefits = [
  {
    icon: Factory,
    title: "Somos Importadores Directos",
    desc: "Sin intermediarios, lo que nos permite ofrecerte el precio más bajo del mercado en todas tus compras.",
    chip: "Precios directos",
  },
  {
    icon: Layers,
    title: "Sin Pedidos Mínimos",
    desc: "Compra desde 1 unidad al precio publicado o aprovecha nuestros descuentos escalonados por docena y cajón.",
    chip: "Flexibilidad",
    extras: ["1 UNIDAD", "DOCENA", "CAJÓN"],
  },
  {
    icon: Boxes,
    title: "Stock Real y Tangible",
    desc: "No esperes meses. Lo que ves en la web, lo tenemos en nuestro almacén listo para despachar hoy mismo.",
    chip: "Stock real",
  },
  {
    icon: Container,
    title: "Campañas Exclusivas",
    desc: "Accede a oportunidades únicas de inversión sumándote a nuestros contenedores de Club Remate.",
    chip: "Compra grupal",
  },
];

export function WhyChooseUs() {
  return (
    <section id="mayoristas" className="relative isolate overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="absolute -top-40 left-1/2 -z-10 size-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px]" />

      <div className="container-rm">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionTag variant="dark">¿Por qué elegirnos?</SectionTag>
            <h2 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.06] tracking-tight md:text-5xl lg:text-[56px]">
              El mejor aliado para tus{" "}
              <span className="text-gradient-orange">compras y tu negocio</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="glass-dark group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl gradient-orange text-white shadow-glow">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
                      {b.chip}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold leading-snug tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/65">{b.desc}</p>
                    {b.extras ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {b.extras.map((e) => (
                          <span
                            key={e}
                            className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-primary"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
