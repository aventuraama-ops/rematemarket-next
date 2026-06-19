"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductoBySlug } from "@/application/usecases/getProductoBySlug";
import { ProductosRepoMock } from "@/infrastructure/mock/ProductosRepoMock";
import type { Producto } from "@/domain/entities/Producto";
import { ChevronLeft, ShoppingCart, Flame } from "lucide-react";
import { useCartStore } from "@/providers/store-provider";

const productosRepo = new ProductosRepoMock();

export default function ProductoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const addItem = useCartStore((state) => state.addItem);

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getProductoBySlug(productosRepo, slug).then((data) => {
        setProducto(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
        <h1 className="mb-4 text-4xl font-black">Producto no encontrado</h1>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          Volver atrás
        </button>
      </div>
    );
  }

  // Imágenes (mock: usando placeholders de campaña si no hay foto real)
  const imageUrl = producto.imagenes?.[0] || "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-background pb-20 pt-10">
      <div className="container-rm">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" /> Volver al catálogo
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* GALERÍA DE IMÁGENES */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-soft border border-border">
              {producto.enRemate && (
                <span className="absolute left-6 top-6 z-10 inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-black tracking-widest text-white shadow-md">
                  EN REMATE
                </span>
              )}
              {producto.imagenes.length > 0 ? (
                 <Image
                 src={imageUrl}
                 alt={producto.nombre}
                 fill
                 className="object-contain p-8"
               />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground/50">
                  Sin imagen disponible
                </div>
              )}
            </div>
          </div>

          {/* INFO Y CHECKOUT */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              {producto.categoriaNombre}
            </div>
            <h1 className="text-balance font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              {producto.nombre}
            </h1>
            
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">SKU: {producto.sku}</span>
              {producto.stock > 0 && producto.stock <= 5 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  <Flame className="size-3" /> ¡Solo {producto.stock} unidades!
                </span>
              )}
            </div>

            <p className="mt-8 text-lg leading-relaxed text-ink/70">
              {producto.descripcion}
            </p>

            {/* PRECIOS Y VOLUMEN */}
            <div className="mt-10 rounded-2xl border border-border bg-soft p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Precios por volumen
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-4 text-center shadow-sm border border-border">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase">Unidad</div>
                  <div className="mt-1 text-2xl font-black text-primary">
                    S/ {producto.precioUnitario?.toFixed(2)}
                  </div>
                </div>
                {producto.precioDocena ? (
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm border border-border">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Docena</div>
                    <div className="mt-1 text-2xl font-black text-ink">
                      S/ {producto.precioDocena.toFixed(2)}
                    </div>
                  </div>
                ) : null}
                {producto.precioCajon ? (
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm border border-border">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Cajón</div>
                    <div className="mt-1 text-2xl font-black text-ink">
                      S/ {producto.precioCajon.toFixed(2)}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* SPECS */}
            {(producto.descripcion || producto.notaProducto) && (
              <div className="mt-8 border-t border-border pt-8">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">
                  Especificaciones Técnicas
                </h3>
                <div className="prose prose-sm prose-orange">
                  <p>{producto.notaProducto || producto.descripcion}</p>
                </div>
              </div>
            )}

            {/* ACCIÓN PRINCIPAL */}
            <div className="mt-auto pt-10">
              <button
                onClick={() => {
                  addItem({
                    productoId: producto.id,
                    sku: producto.sku,
                    nombre: producto.nombre,
                    categoriaSlug: producto.categoriaSlug,
                    categoriaNombre: producto.categoriaNombre,
                    imagen: producto.imagenes[0] ?? "",
                    unidad: "unidad", // Por defecto unidad, luego se podría hacer un selector
                    cantidad: 1,
                    precioUnitario: producto.precioUnitario,
                  });
                  router.push("/carrito");
                }}
                disabled={producto.stock === 0}
                className="gradient-orange flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-5 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                <ShoppingCart className="size-5" />
                {producto.stock > 0 ? "Añadir al Carrito" : "Agotado temporalmente"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
