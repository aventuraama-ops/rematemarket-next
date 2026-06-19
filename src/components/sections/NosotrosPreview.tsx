"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { CTA } from "@/components/shared/CTA";
import { Reveal } from "@/components/shared/Reveal";
import aboutImg from "@/assets/hero-warehouse.jpg";

const benefits = [
  "Importadores Directos sin intermediarios",
  "Precios de Remate por unidad y mayor",
  "Envíos rápidos y seguros a nivel nacional",
  "Atención personalizada y asesoría",
];

export function NosotrosPreview() {
  return (
    <section className="bg-soft py-20 lg:py-28">
      <div className="container-rm">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-ink shadow-2xl">
              <Image
                src={aboutImg}
                alt="Almacén Remate Market"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            </div>
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 rounded-2xl bg-white p-6 shadow-xl lg:-right-8"
            >
              <p className="font-display text-4xl font-black text-primary">+5k</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Clientes Satisfechos</p>
            </motion.div>
          </Reveal>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <h2 className="text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
                ¿Quiénes somos en <span className="text-gradient-orange">Remate Market</span>?
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
                Somos una empresa dedicada a la importación directa de productos de alta demanda, garantizando precios competitivos y stock real. Nuestro objetivo es ser el aliado estratégico de emprendedores, revendedores y clientes retail en todo el Perú.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-[15px] font-medium text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <CTA href="/nosotros" variant="outline" withArrow>
                  Conoce nuestra historia
                </CTA>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
