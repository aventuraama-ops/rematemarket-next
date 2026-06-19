"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingCart,
  ArrowRight,
  PackageX,
  Check,
  ChevronRight,
} from "lucide-react";

import { FloatingActions } from "@/components/shared/FloatingActions";
import { ProductCardB2B } from "@/components/shared/ProductCardB2B";
import { FiltrosSidebar } from "@/components/shared/FiltrosSidebar";

// Hexagonal
import { getProductos } from "@/application/usecases/getProductos";
import { getCategorias } from "@/application/usecases/getCategorias";
import { ProductosRepoMock } from "@/infrastructure/mock/ProductosRepoMock";
import { CategoriasRepoMock } from "@/infrastructure/mock/CategoriasRepoMock";
import type { Producto, UnidadVenta } from "@/domain/entities/Producto";
import { getPrecio } from "@/domain/entities/Producto";
import type { Categoria } from "@/domain/entities/Categoria";

// Carrito
import { useCartStore } from "@/providers/store-provider";

const productosRepo = new ProductosRepoMock();
const categoriasRepo = new CategoriasRepoMock();

// ─── Tipos de filtros locales ──────────────────────────────────────────────────
type Filtros = {
  busqueda: string;
  categoriaSlug: string; // "" = todas
  enRemate: boolean;
  soloStock: boolean;
};

function formatSoles(n: number) {
  return `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
}

// ─── Página ───────────────────────────────────────────────────────────────────
function CarritoContent() {
  const searchParams = useSearchParams();
  const initCategoria = searchParams.get("categoria") || "";

  const addItem = useCartStore((state) => state.addItem);
  const cart = useCartStore((state) => state.cart);
  const cartIsEmpty = useCartStore((state) => state.isEmpty);

  const [allProductos, setAllProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    busqueda: "",
    categoriaSlug: initCategoria,
    enRemate: false,
    soloStock: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastId, setToastId] = useState<string | null>(null);

  // Cargar datos al montar
  useEffect(() => {
    getProductos(productosRepo).then(setAllProductos);
    getCategorias(categoriasRepo).then(setCategorias);
  }, []);

  // Filtrado en cliente con useMemo
  const productos = useMemo(() => {
    let r = [...allProductos];
    if (filtros.categoriaSlug) r = r.filter((p) => p.categoriaSlug === filtros.categoriaSlug);
    if (filtros.enRemate) r = r.filter((p) => p.enRemate);
    if (filtros.soloStock) r = r.filter((p) => p.stock > 0);
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      r = r.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.categoriaNombre.toLowerCase().includes(q)
      );
    }
    return r;
  }, [allProductos, filtros]);

  // Handler para agregar al carrito desde una card
  const handleAdd = (producto: Producto, unidad: UnidadVenta, cantidad: number) => {
    addItem({
      productoId: producto.id,
      sku: producto.sku,
      nombre: producto.nombre,
      categoriaSlug: producto.categoriaSlug,
      categoriaNombre: producto.categoriaNombre,
      imagen: producto.imagenes[0] ?? "",
      unidad,
      cantidad,
      precioUnitario: getPrecio(producto, unidad),
    });
    // Mini feedback
    setToastId(producto.id);
    setTimeout(() => setToastId(null), 2000);
  };

  const setFiltro = <K extends keyof Filtros>(k: K, v: Filtros[K]) =>
    setFiltros((f) => ({ ...f, [k]: v }));

  const limpiarFiltros = () =>
    setFiltros({ busqueda: "", categoriaSlug: "", enRemate: false, soloStock: true });

  const filtrosActivos =
    filtros.categoriaSlug !== "" || filtros.enRemate || !filtros.soloStock || filtros.busqueda !== "";

  // Para evitar hydration error con el cart
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full">
      {/* ── Hero compacto ink ─────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink pt-[120px] pb-10 text-white md:pt-[140px] md:pb-14">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 -left-16 size-[320px] rounded-full bg-primary/20 blur-[110px]" />
        </div>
        <div className="container-rm">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="size-3" />
            <span className="text-white/80">Catálogo</span>
          </nav>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            <span className="size-1.5 rounded-full bg-primary" /> Stock disponible en Lima
          </p>
          <h1 className="mt-3 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Nuestro{" "}
            <span className="bg-gradient-to-r from-primary to-[#E85B10] bg-clip-text text-transparent">
              catálogo
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-white/60">
            Explora, agrega productos a tu lista y genera tu cotización en segundos.
          </p>
        </div>
      </section>

      {/* ── Barra de búsqueda ─────────────────────────────────────── */}
      <div className="sticky top-[78px] z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container-rm flex h-14 items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={filtros.busqueda}
              onChange={(e) => setFiltro("busqueda", e.target.value)}
              placeholder="Buscar productos…"
              className="h-9 w-full rounded-full border border-border bg-soft pl-9 pr-4 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {filtros.busqueda && (
              <button
                onClick={() => setFiltro("busqueda", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Botón filtros (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="relative flex items-center gap-1.5 rounded-full border border-border bg-soft px-4 py-2 text-[13px] font-medium transition-colors hover:bg-muted md:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {filtrosActivos && (
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-primary" />
            )}
          </button>

          {/* Contador resultados */}
          <span className="hidden shrink-0 text-[13px] text-muted-foreground md:block">
            {productos.length} producto{productos.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Layout: sidebar + grid ─────────────────────────────────── */}
      <section className="py-10 lg:py-14">
        <div className="container-rm flex gap-8">
          
          {/* ── SIDEBAR (desktop) ── */}
          <aside className="hidden w-60 shrink-0 md:block">
            <FiltrosSidebar
              categorias={categorias}
              filtros={filtros}
              setFiltro={setFiltro}
              limpiarFiltros={limpiarFiltros}
              filtrosActivos={filtrosActivos}
            />
          </aside>

          {/* ── GRID ── */}
          <div className="flex-1">
            {productos.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
                <PackageX className="mb-4 size-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold">Sin resultados</h3>
                <p className="mt-1 text-sm text-muted-foreground">Prueba cambiando los filtros.</p>
                <button
                  onClick={limpiarFiltros}
                  className="mt-4 text-sm font-medium text-primary underline underline-offset-4"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCardB2B
                      producto={p}
                      onAdd={handleAdd}
                    />
                    {/* Toast rápido por producto */}
                    <AnimatePresence>
                      {toastId === p.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-1.5 text-[12px] font-semibold text-primary"
                        >
                          <Check className="size-3.5" /> Agregado
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <FloatingActions />

      {/* ── Drawer filtros mobile ─────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-background p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-bold">Filtros</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="grid size-8 place-items-center rounded-full border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>
              <FiltrosSidebar
                categorias={categorias}
                filtros={filtros}
                setFiltro={setFiltro}
                limpiarFiltros={limpiarFiltros}
                filtrosActivos={filtrosActivos}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Barra flotante del carrito ────────────────────────────── */}
      <AnimatePresence>
        {mounted && !cartIsEmpty && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/95 px-5 py-3.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-8 items-center justify-center rounded-full bg-primary">
                  <ShoppingCart className="size-4 text-white" />
                  <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-foreground text-[9px] font-bold text-background">
                    {cart.totalItems}
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] text-muted-foreground">Total estimado</p>
                  <p className="text-[15px] font-black text-primary">{formatSoles(cart.totalSoles)}</p>
                </div>
              </div>
              <Link href="/cotizar">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="gradient-orange flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_-4px_rgba(255,107,26,0.55)]"
                >
                  Generar cotización <ArrowRight className="size-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CarritoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CarritoContent />
    </Suspense>
  );
}
