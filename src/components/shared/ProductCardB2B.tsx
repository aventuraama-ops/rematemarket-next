import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import type { Producto, UnidadVenta } from "@/domain/entities/Producto";
import { getPrecio } from "@/domain/entities/Producto";
import { Badge } from "@/components/ui/badge";

type Props = {
  producto: Producto;
  /** Si se provee, muestra botón "Agregar" en vez de "Ver producto" */
  onAdd?: (producto: Producto, unidad: UnidadVenta, cantidad: number) => void;
};

export function ProductCardB2B({ producto, onAdd }: Props) {
  const precioUnitario = getPrecio(producto, "unidad");
  const precioDocena = getPrecio(producto, "docena");
  const imagenPrincipal = producto.imagenes[0] || "/placeholder.png";
  const sinStock = producto.stock === 0;

  return (
    <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-lift ${
      sinStock ? "opacity-60" : ""
    }`}>
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {producto.enRemate && producto.descuentoPct ? (
          <Badge variant="destructive" className="font-bold text-[11px]">
            -{producto.descuentoPct}% Remate
          </Badge>
        ) : null}
        {sinStock ? (
          <Badge variant="secondary" className="text-[11px]">Sin stock</Badge>
        ) : null}
      </div>

      {/* Imagen */}
      <Link
        href={`/producto/${producto.slug}`}
        className="relative aspect-square overflow-hidden bg-soft p-4"
      >
        <img
          src={imagenPrincipal}
          alt={producto.nombre}
          className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/producto/${producto.slug}`}
          className="line-clamp-2 text-[14px] font-bold tracking-tight hover:text-primary"
        >
          {producto.nombre}
        </Link>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{producto.categoriaNombre}</p>

        <div className="mt-auto pt-3">
          {/* Precios escalonados */}
          <div className="flex flex-col gap-0.5 rounded-lg bg-soft px-3 py-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">Unidad</span>
              <span className="font-semibold">S/ {precioUnitario.toFixed(2)}</span>
            </div>
            {precioDocena ? (
              <div className="flex items-center justify-between text-[13px] font-bold text-primary">
                <span>Docena</span>
                <span>S/ {precioDocena.toFixed(2)}</span>
              </div>
            ) : null}
          </div>

          {/* Acción */}
          {onAdd ? (
            <motion.button
              whileHover={sinStock ? {} : { scale: 1.02 }}
              whileTap={sinStock ? {} : { scale: 0.97 }}
              disabled={sinStock}
              onClick={() => !sinStock && onAdd(producto, "unidad", 1)}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
                sinStock
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "gradient-orange text-white shadow-[0_6px_20px_-6px_rgba(255,107,26,0.5)] hover:shadow-[0_10px_28px_-6px_rgba(255,107,26,0.65)]"
              }`}
            >
              <ShoppingCart className="size-4" />
              {sinStock ? "Sin stock" : "Agregar"}
            </motion.button>
          ) : (
            <Link
              href={`/producto/${producto.slug}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <Eye className="size-4" /> Ver producto
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
