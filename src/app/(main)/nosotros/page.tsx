"use client";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";
import { Target, Heart, Shield } from "lucide-react";

const numeros = [
  { v: "5,000+", l: "Clientes satisfechos" },
  { v: "12", l: "Años importando" },
  { v: "24", l: "Ciudades atendidas" },
  { v: "180+", l: "Contenedores/año" },
];

const valores = [
  {
    icon: Target,
    titulo: "Stock real, no maquetas",
    desc: "Lo que ves en la web está físicamente en nuestro almacén, listo para despachar.",
  },
  {
    icon: Heart,
    titulo: "Trato directo y cercano",
    desc: "Atención por WhatsApp en horario extendido. Sin call centers, sin tickets eternos.",
  },
  {
    icon: Shield,
    titulo: "Importación transparente",
    desc: "Te mostramos el origen, el tiempo y el costo real. Sin sobreprecios ocultos.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="pb-24 bg-background">
      <PageHero
        eyebrow="Nuestra historia"
        title="Importamos directo para que tú"
        highlight="vendas mejor"
        description="Más de una década conectando fábricas asiáticas con comerciantes peruanos, sin intermediarios y con stock real en nuestro almacén Lima."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-[32px] shadow-lift border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero-warehouse.jpg"
                  alt="Almacén Remate Market en Lima"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <SectionTag>Cómo empezamos</SectionTag>
                <h2 className="text-balance font-display text-3xl font-black tracking-tight text-ink md:text-5xl">
                  De un puesto en Mesa Redonda a{" "}
                  <span className="text-primary">importadora nacional</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-[15px] leading-relaxed font-medium">
                    Empezamos en 2013 trayendo lotes pequeños desde Guangzhou para
                    abastecer nuestro propio puesto. Hoy importamos contenedores
                    completos y abastecemos a más de 5,000 comerciantes en todo el Perú.
                  </p>
                  <p className="text-muted-foreground text-[15px] leading-relaxed font-medium">
                    La fórmula nunca cambió: precios honestos, stock real y entrega
                    cuando lo prometemos.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white lg:py-24 rounded-[40px] mx-4 lg:mx-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-rm relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {numeros.map((n, i) => (
              <Reveal key={n.l} delay={i * 0.05}>
                <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <div className="font-display text-4xl font-black text-primary md:text-5xl mb-3 drop-shadow-md">
                    {n.v}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                    {n.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionTag>Lo que nos mueve</SectionTag>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-ink md:text-5xl">
                Tres principios <span className="text-primary">no negociables</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 0.06}>
                <div className="h-full rounded-[24px] border border-border bg-white p-8 shadow-sm hover:shadow-lift transition-all hover:border-primary/30 group">
                  <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <v.icon className="size-7 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{v.titulo}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground font-medium">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-20 flex flex-col items-center gap-4">
              <CTA href="/cotizar">Trabaja con nosotros</CTA>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
