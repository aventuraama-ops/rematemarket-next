"use client";

import { motion } from "framer-motion";
import { Tag, ShieldCheck, Users, Truck } from "lucide-react";
import Image from "next/image";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";
import heroImg from "@/assets/hero-warehouse.jpg";
import productStack from "@/assets/hero-product-stack.png";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const avatars = [avatar1, avatar2, avatar3];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-ink pt-[78px] text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImg}
          alt="Almacén de importaciones"
          className="size-full object-cover opacity-55"
          width={1920}
          height={1200}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/55" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-40 -left-32 size-[480px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -bottom-40 right-0 size-[520px] rounded-full bg-primary/15 blur-[160px]" />
      </div>

      <div className="container-rm py-20 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-6">
            <SectionTag variant="dark">Importadora directa</SectionTag>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance font-display text-[44px] font-extrabold leading-[1.02] tracking-tight md:text-[60px] lg:text-[68px]"
            >
              Tu Importadora Directa:{" "}
              <span className="text-gradient-orange">Stock Real</span> y{" "}
              <span className="text-gradient-orange">Precios de Remate</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 md:text-[17px]"
            >
              Compra al por mayor y menor directamente de nuestro catálogo importado, sin
              intermediarios, sin tarifas ocultas y con stock listo para entrega inmediata en
              todo el país. Una unidad al precio publicado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <CTA href="/importa-con-nosotros">Ver campañas activas</CTA>
              <CTA href="/categorias" variant="ghost-dark">
                Explorar stock
              </CTA>
            </motion.div>

            {/* Social proof — avatars + text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Cliente satisfecho"
                    width={40}
                    height={40}
                    className="size-10 rounded-full border-2 border-ink object-cover ring-1 ring-white/20"
                  />
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">+5,000 clientes satisfechos</p>
                <p className="mt-0.5 text-[12.5px] text-white/55">
                  Importamos lo que necesitas, cuando lo necesitas
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — product stack + floating cards */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
              {/* Soft glow behind */}
              <div className="absolute inset-x-10 bottom-6 top-10 -z-10 rounded-[40%] bg-primary/20 blur-3xl" />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-0 size-full animate-float-soft"
              >
                <Image
                  src={productStack}
                  alt="Productos importados Remate Market"
                  width={1500}
                  height={1200}
                  priority
                  className="size-full object-contain"
                />
              </motion.div>

              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                className="absolute left-[-12px] top-2 z-10 hidden w-[220px] rounded-xl bg-white p-3.5 shadow-lift md:block"
              >
                <div className="flex items-start gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                    <Tag className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold leading-tight text-foreground">
                      Precios de Remate
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-foreground/55">
                      1 unidad al precio publicado
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.55 }}
                className="absolute right-[-8px] top-0 z-10 hidden w-[220px] rounded-xl bg-[#1a1a1a] p-3.5 shadow-lift md:block"
              >
                <div className="flex items-start gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold leading-tight text-white">
                      Pago 100% seguro
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-white/65">
                      Protegemos tu compra
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.55 }}
                className="absolute -left-3 bottom-2 z-10 hidden w-[240px] rounded-xl bg-white p-3.5 shadow-lift md:block"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-primary/12 text-primary">
                    <Truck className="size-3.5" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55">
                    Envío Nacional
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-2 text-[15px] font-extrabold text-primary">A todo el Perú</p>
                <p className="mt-0.5 text-[11px] text-foreground/55">
                  Despachos diarios garantizados
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.55 }}
                className="absolute -right-2 bottom-6 z-10 hidden w-[210px] rounded-xl bg-white p-3.5 shadow-lift md:block"
              >
                <div className="flex items-start gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                    <Users className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold leading-tight text-primary">
                      Club Remate
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-foreground/55">
                      Únete a los beneficios
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
