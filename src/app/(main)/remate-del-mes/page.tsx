"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { CTA } from "@/components/shared/CTA";

// TODO: InsForge — reemplazar por SELECT * FROM productos WHERE en_remate
const productosRemate = [
  { nombre: "Casco para moto", precio: 89, precioOld: 137, descuento: 35 },
  { nombre: "Sandalias verano", precio: 24, precioOld: 48, descuento: 50 },
  { nombre: "Ventilador torre", precio: 159, precioOld: 265, descuento: 40 },
  { nombre: "Silla plegable", precio: 49, precioOld: 70, descuento: 30 },
  { nombre: "Zapatillas urbanas", precio: 79, precioOld: 144, descuento: 45 },
  { nombre: "Lámpara LED", precio: 39, precioOld: 87, descuento: 55 },
  { nombre: "Coche juguete", precio: 29, precioOld: 73, descuento: 60 },
  { nombre: "Mesa plegable", precio: 119, precioOld: 183, descuento: 35 },
];

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function RemateDelMesPage() {
  // Calculamos fecha a 11 dias y horas según el mock original
  const [targetDate] = useState(() => Date.now() + 1000 * 60 * 60 * 24 * 11 + 1000 * 60 * 60 * 23 + 1000 * 60 * 59);
  const { d, h, m, s } = useCountdown(targetDate);

  return (
    <div className="pb-24 bg-background">
      <PageHero
        eyebrow="Campaña activa"
        title="Remate del mes:"
        highlight="hasta 60% OFF"
        description="Stock limitado de productos seleccionados a precios de remate. La campaña cierra cuando se acaben los cupos."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Remate del Mes" }]}
      >
        <div className="grid grid-cols-4 gap-2 md:max-w-md md:gap-3">
          {[
            { v: d, l: "Días" },
            { v: h, l: "Horas" },
            { v: m, l: "Min" },
            { v: s, l: "Seg" },
          ].map((x) => (
            <div
              key={x.l}
              className="bg-white/10 backdrop-blur-md rounded-xl px-2 py-3 text-center md:px-3 md:py-4 border border-white/10 shadow-sm"
            >
              <div className="font-display text-2xl font-black tabular-nums text-white md:text-4xl drop-shadow-md">
                {String(x.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/70 font-bold">
                {x.l}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productosRemate.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 0.04}>
                <article className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift hover:border-primary/30">
                  <div className="relative aspect-square overflow-hidden bg-soft p-8 flex items-center justify-center">
                    <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-black text-white shadow-md">
                      -{p.descuento}%
                    </span>
                    <div className="w-full h-full bg-border/40 rounded-xl flex items-center justify-center text-muted-foreground/50 font-bold uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform duration-500">
                      Imagen Producto
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-ink mb-3 line-clamp-2">{p.nombre}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-primary">
                        S/ {p.precio}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground line-through">
                        S/ {p.precioOld}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 rounded-[40px] bg-gradient-to-br from-ink to-[#1a1a1a] p-10 text-center text-white md:p-20 relative overflow-hidden shadow-glow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black md:text-5xl mb-6 tracking-tight">
                  ¿Listo para asegurar tu cupo?
                </h3>
                <p className="mx-auto max-w-xl text-white/70 text-lg font-medium mb-10">
                  Reserva con un adelanto y cancela el saldo al recibir.
                </p>
                <div className="flex justify-center">
                  <CTA href="/cotizar">Cotizar ahora</CTA>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
