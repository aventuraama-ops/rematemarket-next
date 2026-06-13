"use client";

import Image from "next/image";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";
import { Reveal } from "@/components/shared/Reveal";
import bg from "@/assets/final-cta-bg.jpg";

export function FinalCTA() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-ink py-28 text-white lg:py-36"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="Almacén Remate Market"
          fill
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-[180px]" />
      </div>

      <div className="container-rm text-center">
        <Reveal>
          <SectionTag variant="dark">1 Unidad al Precio Publicado</SectionTag>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-7 max-w-4xl text-balance font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-[80px]">
            ¿Listo para comprar a verdaderos{" "}
            <span className="text-gradient-orange">precios de remate</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-white/70 md:text-lg">
            Empieza hoy mismo a comprar productos importados con stock real, precios
            competitivos y campañas exclusivas sin mínimos de compra.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/checkout">
              Cotiza tu pedido
            </CTA>
            <CTA href="/importa-con-nosotros" variant="ghost-dark">
              Ver campañas activas
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
