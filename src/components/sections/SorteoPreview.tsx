"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { CTA } from "@/components/shared/CTA";
import { Reveal } from "@/components/shared/Reveal";

export function SorteoPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-ink py-24 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -left-40 top-0 size-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 size-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container-rm relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/20 text-primary ring-1 ring-primary/30 shadow-[0_0_40px_rgba(255,107,0,0.3)]">
              <Gift className="size-8" />
            </div>
            <h2 className="text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Sorteo Exclusivo <span className="text-gradient-orange">Mensual</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
              Participa en nuestro sorteo mensual exclusivo para clientes y seguidores. Podrás ganar productos de importación, vales de descuento y más sorpresas.
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="mt-10">
              <CTA href="/sorteo" variant="solid" className="min-w-[200px] text-[15px] !py-3.5 shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                Participar Ahora
              </CTA>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
