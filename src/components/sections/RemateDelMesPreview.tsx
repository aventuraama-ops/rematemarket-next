"use client";

import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import { CTA } from "@/components/shared/CTA";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";
import { mockProductos } from "@/infrastructure/mock/productos";

export function RemateDelMesPreview() {
  const remates = mockProductos.filter((p) => p.enRemate && !p.pendiente);

  if (remates.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-rm">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Reveal>
            <SectionTag variant="orange">Ofertas por tiempo limitado</SectionTag>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Remate del Mes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <CTA href="/remate-del-mes" variant="ghost-dark" withArrow>
              Ver todos los remates
            </CTA>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {remates.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-square bg-soft">
                  {p.imagenes[0] && (
                    <Image
                      src={p.imagenes[0]}
                      alt={p.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Remate
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Tag className="size-3.5" />
                    {p.categoriaNombre}
                  </div>
                  <h3 className="text-[15px] font-bold leading-tight text-ink line-clamp-2">
                    {p.nombre}
                  </h3>
                  <div className="mt-auto pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-red-600">
                        S/ {p.precioUnitario}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
