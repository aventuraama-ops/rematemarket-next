"use client";

import { ShieldCheck, Truck, Headphones, Container, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";
import { Reveal } from "@/components/shared/Reveal";
import ventilador from "@/assets/product-ventilador.jpg";

const trust = [
  { icon: ShieldCheck, label: "Compra segura" },
  { icon: Truck, label: "Envíos a todo el Perú" },
  { icon: Headphones, label: "Atención personalizada" },
  { icon: Container, label: "+1200 clientes atendidos" },
];

export function ActiveImport() {
  return (
    <section
      id="importacion"
      className="relative isolate overflow-hidden bg-ink py-24 text-white lg:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-25" />
      <div className="absolute -left-32 top-1/3 -z-10 size-[480px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 -z-10 size-[520px] rounded-full bg-primary/10 blur-[160px]" />

      <div className="container-rm">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionTag variant="orange">Importación activa</SectionTag>
              <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.04] tracking-tight md:text-[56px]">
                Únete a nuestra próxima{" "}
                <span className="text-gradient-orange">Importación</span>{" "}
                <span className="text-white/85">(Compra Conjunta)</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                Nosotros elegimos un producto ganador de alta demanda, tú te sumas a la
                importación y aseguras precio de fábrica real.
              </p>
              <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                Información real de stock en 24 hrs. Obtienes un costo que no encontrarás en ninguna tienda local, ideal para maximizar tus ganancias.
              </p>
            </Reveal>

            {/* Pricing panel */}
            <Reveal delay={0.15}>
              <div className="glass-dark mt-8 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-3xl">
                {[
                  { label: "Precio campaña", value: "S/ 189" },
                  { label: "Ahorro estimado", value: "32%" },
                  { label: "Ganancia potencial", value: "+45%" },
                ].map((m) => (
                  <div key={m.label} className="p-5">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {m.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-gradient-orange md:text-3xl">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTA href="/checkout">Cotiza y separa tu cupo</CTA>
                <div className="flex items-center gap-2 text-[12.5px] text-white/60">
                  <span className="relative grid size-2.5 place-items-center">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/70" />
                    <span className="size-2.5 rounded-full bg-primary" />
                  </span>
                  Campañas abiertas con cupos limitados
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap gap-2.5">
                {trust.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-medium text-white/85"
                  >
                    <Icon className="size-3.5 text-primary" /> {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right product card */}
          <div className="relative lg:col-span-5">
            <Reveal delay={0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="glass-dark relative overflow-hidden rounded-[32px] p-6 shadow-lift"
              >
                <div className="absolute -inset-px rounded-[32px] bg-gradient-to-br from-primary/40 via-transparent to-primary/20 opacity-60 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px" />

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" />
                    Campaña actual
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[10.5px] font-semibold text-white/75">
                    <Clock className="size-3" /> Cierre inminente
                  </span>
                </div>

                <div className="relative mt-6 aspect-square rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
                  <Image
                    src={ventilador}
                    alt="Ventilador de Torre"
                    width={500}
                    height={500}
                    className="absolute inset-0 size-full object-contain animate-float-soft p-4"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Producto destacado
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                    Ventiladores de Torre
                  </h3>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[12px] text-white/65">
                      <span>Cupos reservados</span>
                      <span className="font-bold text-primary">85%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full gradient-orange"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
