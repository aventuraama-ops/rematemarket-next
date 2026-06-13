"use client";

import { ShoppingBag, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";
import { mockProductos } from "@/infrastructure/mock/productos";
import type { Producto } from "@/domain/entities/Producto";

const MotionLink = motion.create(Link);

// Images mapping (since we don't have dynamic DB images yet)
import motoImg from "@/assets/product-moto.jpg";
import sillaImg from "@/assets/product-silla.jpg";
import zapatillasImg from "@/assets/product-zapatillas.jpg";
import sandaliasImg from "@/assets/product-sandalias.jpg";
import cascoImg from "@/assets/product-casco.jpg";
import defaultImg from "@/assets/campaign-container.jpg";

const getImageForSku = (sku: string) => {
  if (sku.includes("MOT")) return motoImg;
  if (sku.includes("HOG")) return sillaImg;
  if (sku.includes("CAL")) return sandaliasImg;
  if (sku.includes("TEC")) return cascoImg;
  return defaultImg; // Licores and others use default for now
};

function badgeClass(tone: "stock" | "remate" | "last" | "agotado" | "urgente") {
  switch (tone) {
    case "remate": return "bg-primary text-white";
    case "last": return "bg-ink text-white";
    case "agotado": return "bg-red-600 text-white";
    case "urgente": return "bg-orange-500 text-white animate-pulse";
    default: return "bg-foreground/5 text-foreground";
  }
}

function ProductCard({ p, index }: { p: Producto; index: number }) {
  const image = getImageForSku(p.sku);
  const isOutOfStock = p.stock === 0;
  const isUrgent = p.stock > 0 && p.stock <= 2;
  
  let badgeTone: "stock" | "remate" | "last" | "agotado" | "urgente" = "stock";
  let badgeText = "En Stock";
  
  if (isOutOfStock) {
    badgeTone = "agotado";
    badgeText = "Agotado";
  } else if (isUrgent) {
    badgeTone = "urgente";
    badgeText = `¡Solo ${p.stock}!`;
  } else if (p.enRemate) {
    badgeTone = "remate";
    badgeText = "En Remate";
  }

  return (
    <Reveal delay={index * 0.05}>
        <MotionLink
          href={`/producto/${p.slug}`}
          whileHover={!isOutOfStock ? { y: -6 } : {}}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/5 bg-card shadow-card transition-shadow duration-300 hover:shadow-lift ${isOutOfStock ? "opacity-70 grayscale hover:grayscale-0 cursor-not-allowed" : ""}`}
        >
          <div className="relative aspect-square overflow-hidden bg-soft">
            {p.enRemate && !isOutOfStock ? (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
                -15%
              </span>
            ) : null}
            <span
              className={`absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider ${badgeClass(badgeTone)}`}
            >
              {badgeText}
            </span>
            <Image
              src={image}
              alt={p.nombre}
              width={500}
              height={500}
              className="absolute inset-0 size-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {p.categoriaNombre}
            </p>
            <h3 className="mt-2 line-clamp-2 text-[15.5px] font-semibold leading-snug text-foreground">
              {p.nombre}
            </h3>
            <div className="mt-auto flex items-end justify-between pt-5">
              <div>
                <p className="font-display text-2xl font-extrabold tracking-tight text-primary">
                  S/ {p.precioUnitario.toFixed(2)}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Llevando 1 unidad
                </p>
              </div>
              <button
                className={`grid size-10 place-items-center rounded-full transition-all duration-300 ${isOutOfStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-ink text-white hover:bg-primary"}`}
                aria-label="Cotizar"
                disabled={isOutOfStock}
              >
                <ShoppingBag className="size-4" />
              </button>
            </div>
          </div>
        </MotionLink>
    </Reveal>
  );
}

export function FeaturedProducts() {
  const featured = mockProductos.filter((p) => p.destacado).slice(0, 4);
  const liquidation = mockProductos.filter((p) => p.enRemate || p.stock <= 2).slice(0, 4);

  return (
    <section id="productos" className="bg-soft py-20 lg:py-28">
      <div className="container-rm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionTag>Productos Estrella</SectionTag>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Nuestros Productos{" "}
              <span className="text-gradient-orange">Estrella en Stock</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Una unidad al precio publicado. Disponibilidad inmediata. Ventas por unidad, docena o cajón con grandes descuentos.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* Liquidation */}
        {liquidation.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <Flame className="size-3.5" /> Liquidación y Urgencia
                </span>
              </div>
              <h3 className="mt-4 max-w-2xl text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
                ¡Últimas unidades{" "}
                <span className="text-gradient-orange">a punto de agotarse</span>!
              </h3>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {liquidation.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
