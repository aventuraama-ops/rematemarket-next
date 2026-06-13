"use client";

import { ArrowUpRight, AlertTriangle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";
import { mockProductos } from "@/infrastructure/mock/productos";

const MotionLink = motion.create(Link);

// Images
import juguetesImg from "@/assets/cat-juguetes.jpg";
import calzadosImg from "@/assets/cat-calzados.jpg";
import mueblesImg from "@/assets/cat-muebles.jpg";
import defaultImg from "@/assets/campaign-container.jpg";

export function Categories() {
  // Aggregate stock by category
  const categoryStats = mockProductos.reduce((acc, p) => {
    if (!acc[p.categoriaId]) {
      acc[p.categoriaId] = {
        id: p.categoriaId,
        name: p.categoriaNombre,
        slug: p.categoriaSlug,
        totalStock: 0,
      };
    }
    acc[p.categoriaId].totalStock += p.stock;
    return acc;
  }, {} as Record<string, { id: string; name: string; slug: string; totalStock: number }>);

  // Sort by decreasing stock
  const sortedCats = Object.values(categoryStats).sort((a, b) => b.totalStock - a.totalStock);

  // Helper to map category id to image
  const getImageForCategory = (id: string) => {
    switch (id) {
      case "cat-jug": return juguetesImg;
      case "cat-cal": return calzadosImg;
      case "cat-hog": return mueblesImg;
      default: return defaultImg; // Temporary placeholder for missing images
    }
  };

  return (
    <section id="categorias" className="bg-background py-20 lg:py-28">
      <div className="container-rm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionTag>Catálogo Real</SectionTag>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Nuestro Stock por <span className="text-gradient-orange">Categorías</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Stock rigurosamente ordenado por disponibilidad. Evita quedarte sin tu producto.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedCats.map((c, i) => {
            const isOutOfStock = c.totalStock === 0;
            const isUrgent = c.totalStock === 1 || c.totalStock === 2;
            const image = getImageForCategory(c.id);

            return (
              <Reveal key={c.id} delay={i * 0.08}>
                <MotionLink 
                  href={`/categorias/${c.slug}`}
                  whileHover={!isOutOfStock ? { y: -6 } : {}}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={`group relative block aspect-[4/5] overflow-hidden rounded-[28px] shadow-card lg:aspect-[3/4] ${isOutOfStock ? "opacity-60 grayscale hover:grayscale-0 cursor-not-allowed" : ""}`}
                >
                    <Image
                      src={image}
                      alt={c.name}
                      width={400}
                      height={500}
                      className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                    
                    {/* Urgency / Out of Stock Badges */}
                    {isOutOfStock && (
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                        <AlertCircle className="size-3.5" />
                        Agotado
                      </div>
                    )}
                    {isUrgent && (
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-orange-500/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm animate-pulse">
                        <AlertTriangle className="size-3.5" />
                        Solo {c.totalStock} en stock
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                          {c.totalStock} unidades
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                          {c.name}
                        </h3>
                      </div>
                      <span className={`grid size-11 place-items-center rounded-full bg-white text-ink transition-all duration-300 ${!isOutOfStock ? "group-hover:bg-primary group-hover:text-white" : ""}`}>
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                </MotionLink>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
