"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, TrendingUp, Truck, Star } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";

import { CategoriasRepoMock } from "@/infrastructure/mock/CategoriasRepoMock";
import type { Categoria } from "@/domain/entities/Categoria";

const categoriasRepo = new CategoriasRepoMock();

function CategoriaCard({ cat, index }: { cat: Categoria; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <Link
          href={`/carrito?categoria=${cat.slug}`}
          className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-lift"
        >
          {/* Imagen */}
          <div className="aspect-[4/3] overflow-hidden bg-soft relative">
            <img
              src={cat.imagenUrl}
              alt={cat.nombre}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Info */}
          <div className="flex items-center justify-between p-5 bg-white">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-ink">{cat.nombre}</h3>
              <p className="mt-0.5 text-[13px] text-muted-foreground font-semibold">
                {cat.totalProductos} productos · Stock disponible
              </p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
          </div>

          {/* Descripción en hover (overlay) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full rounded-b-2xl bg-ink px-5 py-4 text-[13px] text-white/80 transition-transform duration-300 group-hover:translate-y-0">
            {cat.descripcion}
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    categoriasRepo.getAll().then(setCategorias);
  }, []);

  return (
    <div className="pb-24 bg-background">
      {/* ── S1: Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Catálogo completo"
        title="Todas nuestras"
        highlight="categorías"
        description="Stock real disponible para entrega inmediata. Elige tu categoría, filtra productos y arma tu cotización con precios de importación directa."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Categorías" }]}
      />

      {/* ── S2: Grid de categorías ───────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-rm">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionTag>Explora por rubro</SectionTag>
                <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-ink md:text-4xl">
                  Elige tu <span className="text-primary">categoría</span>
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground font-semibold">
                {categorias.length} categorías · Stock disponible en Lima para entrega inmediata.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((cat, i) => (
              <CategoriaCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: Ventajas (sección ink) ───────────────────────────── */}
      <section className="bg-ink py-24 lg:py-32 rounded-[40px] mx-4 lg:mx-8 mb-20 relative overflow-hidden">
        <div className="container-rm relative z-10">
          <Reveal>
            <div className="mb-14 text-center">
              <SectionTag variant="dark">Por qué elegirnos</SectionTag>
              <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-white md:text-5xl">
                Importación directa,{" "}
                <span className="text-primary">sin intermediarios</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
                Trabajamos directo con fábricas. Tú recibes el precio de importación, no el precio de revendedor.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Package className="w-6 h-6" />, titulo: "Stock real", desc: "Todo lo que ves está en nuestro almacén en Lima. Sin preventa." },
              { icon: <TrendingUp className="w-6 h-6" />, titulo: "Precio de fábrica", desc: "Compramos contenedores completos y te pasamos el ahorro." },
              { icon: <CheckCircle2 className="w-6 h-6" />, titulo: "Desde 1 unidad", desc: "No necesitas comprar cajón. Una unidad al precio publicado." },
              { icon: <Truck className="w-6 h-6" />, titulo: "Envíos a todo Perú", desc: "Shalom, Olva y otros. Recojo gratuito en almacén Lima." },
            ].map((item, i) => (
              <Reveal key={item.titulo} delay={i * 0.06}>
                <div className="bg-white/5 border border-white/10 flex flex-col gap-4 rounded-2xl p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <span className="flex w-12 h-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="text-base font-bold text-white">{item.titulo}</h3>
                  <p className="text-[13.5px] leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Estadísticas */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-4 bg-white/10">
              {[
                { valor: "+800", etiqueta: "Clientes atendidos" },
                { valor: "6", etiqueta: "Categorías activas" },
                { valor: "+500", etiqueta: "Productos en stock" },
                { valor: "<1h", etiqueta: "Tiempo de respuesta" },
              ].map((stat) => (
                <div key={stat.etiqueta} className="flex flex-col items-center gap-1 bg-ink/80 px-6 py-8 text-center backdrop-blur-md">
                  <span className="text-4xl font-black tracking-tight text-white">{stat.valor}</span>
                  <span className="text-[12px] text-white/50 font-bold uppercase tracking-wider">{stat.etiqueta}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── S4: CTA de cotización ────────────────────────────────── */}
      <section className="py-10">
        <div className="container-rm">
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-white px-6 py-16 text-center md:px-14 shadow-sm hover:shadow-glow transition-all hover:border-primary/30">
              <SectionTag variant="orange">¿No encuentras lo que buscas?</SectionTag>
              <h2 className="max-w-2xl text-balance text-3xl font-black tracking-tight text-ink md:text-4xl">
                Cotizamos cualquier producto por{" "}
                <span className="text-primary">importación a pedido</span>
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground font-medium">
                Si tienes un producto en mente y no está en nuestro catálogo, lo importamos para ti.
                Cuéntanos qué necesitas y calculamos el precio de forma inmediata.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <CTA href="/cotizar">Cotizar mi pedido</CTA>
                <CTA href="https://wa.me/51987654321" variant="ghost-light">
                  <Star className="w-4 h-4" /> Hablar por WhatsApp
                </CTA>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {["Sin cobro inmediato", "Respuesta Inmediata", "Envío a todo Perú"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-ink">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
