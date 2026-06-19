"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { CTA } from "@/components/shared/CTA";
import { ProductCardB2B } from "@/components/shared/ProductCardB2B";
import { getProductos } from "@/application/usecases/getProductos";
import { ProductosRepoMock } from "@/infrastructure/mock/ProductosRepoMock";
import type { Producto } from "@/domain/entities/Producto";
import { useRouter } from "next/navigation";
import { Flame, Package } from "lucide-react";
import { useCartStore } from "@/providers/store-provider";

const productosRepo = new ProductosRepoMock();

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function RemateDelMesPage() {
  const router = useRouter();
  const [targetDate] = useState(() => Date.now() + 1000 * 60 * 60 * 24 * 11 + 1000 * 60 * 60 * 23 + 1000 * 60 * 59);
  const { d, h, m, s } = useCountdown(targetDate);

  const addItem = useCartStore((state) => state.addItem);

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getProductos(productosRepo).then(setProductos);
  }, []);

  // Filtrado Hexagonal
  const remates = productos.filter((p) => p.enRemate);
  const ultimosStock = productos.filter((p) => p.stock > 0 && p.stock <= 5);
  const tendencias = productos.filter((p) => p.destacado);

  const handleProductAction = (p: Producto, unidad: any, cantidad: number) => {
    addItem({
      productoId: p.id,
      sku: p.sku,
      nombre: p.nombre,
      categoriaSlug: p.categoriaSlug,
      categoriaNombre: p.categoriaNombre,
      imagen: p.imagenes[0] ?? "",
      unidad,
      cantidad,
      precioUnitario: p.precioUnitario,
    });
    router.push("/carrito");
  };

  return (
    <div className="pb-24 bg-background">
      <PageHero
        eyebrow="Campaña activa"
        title="Remate del mes:"
        highlight="hasta 60% OFF"
        description="Stock limitado de productos seleccionados a precios de remate. La campaña cierra cuando se acaben los cupos."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Remate del Mes" }]}
      >
        <div className="grid grid-cols-4 gap-2 md:max-w-md md:gap-3">
          {[
            { v: d, l: "Días" },
            { v: h, l: "Horas" },
            { v: m, l: "Min" },
            { v: s, l: "Seg" },
          ].map((x) => (
            <div
              key={x.l}
              className="bg-white/10 backdrop-blur-md rounded-xl px-2 py-3 text-center md:px-3 md:py-4 border border-white/10 shadow-sm"
            >
              <div className="font-display text-2xl font-black tabular-nums text-white md:text-4xl drop-shadow-md">
                {String(x.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/70 font-bold">
                {x.l}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-rm flex flex-col gap-24">
          
          {/* SECCIÓN: ÚLTIMOS PRODUCTOS EN STOCK (FOMO) */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                  <Flame className="size-3.5" /> Urgencia
                </span>
              </div>
              <h2 className="text-3xl font-black md:text-4xl tracking-tight text-ink mb-10">
                Últimos productos <span className="text-red-500">en stock</span>
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {remates.slice(0, 8).map((p, i) => (
                <Reveal key={p.id} delay={i * 0.04}>
                  <ProductCardB2B producto={p} onAdd={(p, u, c) => handleProductAction(p, u, c)} />
                </Reveal>
              ))}
            </div>
          </div>



          {/* SECCIÓN: PRODUCTOS EN TENDENCIA */}
          {tendencias.length > 0 && (
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                    <Package className="size-3.5" /> Destacados
                  </span>
                </div>
                <h2 className="text-3xl font-black md:text-4xl tracking-tight text-ink mb-10">
                  Productos en <span className="text-blue-500">tendencia</span>
                </h2>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tendencias.slice(0, 4).map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.04}>
                    <ProductCardB2B producto={p} onAdd={(p, u, c) => handleProductAction(p, u, c)} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* BANNER FINAL */}
          <Reveal delay={0.2}>
            <div className="rounded-[40px] bg-gradient-to-br from-ink to-[#1a1a1a] p-10 text-center text-white md:p-20 relative overflow-hidden shadow-glow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black md:text-5xl mb-6 tracking-tight">
                  ¿Listo para asegurar tu cupo?
                </h3>
                <p className="mx-auto max-w-xl text-white/70 text-lg font-medium mb-10">
                  Reserva con un adelanto y cancela el saldo al recibir.
                </p>
                <div className="flex justify-center">
                  <CTA href="/carrito">Ir al Carrito</CTA>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
