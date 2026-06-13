"use client";

import { use } from "react";
import Link from "next/link";
import { mockProductos } from "@/infrastructure/mock/productos";
import { ProductB2BCard } from "@/components/ui/ProductB2BCard";

export default function CategoriaVitrinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  // Filtramos los productos según el slug de la categoría y ordenamos por stock decreciente
  const productosFiltrados = mockProductos
    .filter(p => p.categoriaSlug === resolvedParams.slug)
    .sort((a, b) => b.stock - a.stock);

  // Fallback de nombre si no hay productos (usualmente se buscaría en la DB de categorías)
  const categoriaNombre = productosFiltrados.length > 0 ? productosFiltrados[0].categoriaNombre : resolvedParams.slug.toUpperCase();

  return (
    <div className="bg-soft min-h-screen pb-24 pt-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <header className="mb-10 text-center md:text-left">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2 justify-center md:justify-start">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link> 
            <span className="text-border">/</span> 
            <Link href="/categorias" className="hover:text-primary transition-colors">Categorías</Link> 
            <span className="text-border">/</span> 
            <span className="text-primary">{categoriaNombre}</span>
          </div>
          <h1 className="text-4xl font-black text-ink mb-4 tracking-tight">{categoriaNombre}</h1>
        </header>

        {/* Vitrina Pura */}
        <main>
          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <ProductB2BCard key={producto.id} product={producto} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-border">
              <h3 className="font-bold text-lg text-ink mb-2">No hay productos disponibles</h3>
              <p className="text-muted-foreground">Actualmente no tenemos productos en esta categoría.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
