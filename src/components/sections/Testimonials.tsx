"use client";

import { Star, BadgeCheck, Quote } from "lucide-react";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";

const testimonials = [
  {
    name: "Carlos R.",
    role: "Cliente Mayorista · Tienda Online",
    initials: "CR",
    text: "Pedí 2 docenas de Sandalias EVA para mi tienda. El margen de ganancia es excelente — compré a S/25 la unidad y las vendo a S/50. Entrega en 24h, sin complicaciones.",
    producto: "Sandalias EVA Verano",
  },
  {
    name: "María G.",
    role: "Cliente Retail · Club Remate",
    initials: "MG",
    text: "Compré una Silla Playera sin tener que llevar cajón completo. Calidad tal cual la describen. El precio de importación siendo clienta retail es un lujo.",
    producto: "Silla de Descanso / Playera",
  },
  {
    name: "Jorge A.",
    role: "Distribuidor",
    initials: "JA",
    text: "Compré mi primer lote de Zapatillas Deportivas para mi tienda y recuperé la inversión en menos de una semana. Atención de 10. Ya estoy en mi tercer pedido.",
    producto: "Zapatillas Deportivas",
  },
];

export function Testimonials() {
  return (
    <section className="bg-soft py-24 lg:py-32">
      <div className="container-rm">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionTag>Testimonios reales</SectionTag>
            <h2 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
              Clientes que ya{" "}
              <span className="text-gradient-orange">compran con nosotros</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Desde compradores minoristas hasta emprendedores y revendedores que ya importan con Remate Market.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl border border-foreground/5 bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="size-7 text-primary" />
                <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
                  {t.text}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                  <span className="size-3"><Star className="size-3 fill-primary" /></span> {t.producto}
                </div>

                <div className="mt-7 flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-primary" strokeWidth={0} />
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-foreground/5 pt-5">
                  <div className="grid size-11 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                    {t.initials}
                  </div>
                  <div className="flex-1">
                    <p className="flex items-center gap-1.5 text-[14px] font-bold text-foreground">
                      {t.name}
                      <BadgeCheck className="size-4 text-primary" />
                    </p>
                    <p className="text-[12px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
