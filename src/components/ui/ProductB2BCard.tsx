"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";
import type { Producto } from "@/domain/entities/Producto";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export function ProductB2BCard({ product }: { product: Producto }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 2;
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (isOutOfStock) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={clsx(
      "group relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300",
      isOutOfStock ? "border-border opacity-75 grayscale" : "border-border hover:border-primary/30 hover:shadow-lift"
    )}>
      
      {/* Etiqueta de Stock */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isOutOfStock && (
          <span className="bg-ink text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Agotado</span>
        )}
        {isLowStock && (
          <span className="bg-destructive text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded animate-pulse">
            ¡Últimas {product.stock} unidades!
          </span>
        )}
      </div>

      {/* Imagen */}
      <div className="relative aspect-square bg-soft p-6 flex items-center justify-center overflow-hidden">
        {product.imagenes?.[0] ? (
          <Image 
            src={product.imagenes[0]} 
            alt={product.nombre} 
            fill 
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-border/50 rounded-xl flex items-center justify-center text-muted-foreground font-bold">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{product.categoriaNombre}</span>
        <h3 className="font-bold text-ink text-sm leading-tight mb-4 line-clamp-2">{product.nombre}</h3>

        {/* 3 Escalas de Precio */}
        <div className="mt-auto space-y-2 bg-soft rounded-xl p-3 border border-border/50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Unidad</span>
            <span className="font-bold">S/ {product.precioUnitario.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-primary font-semibold">x 12 docena</span>
            <span className="font-bold text-primary">S/ {(product.precioDocena || product.precioUnitario * 12).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[13px] border-t border-border/50 pt-2 mt-1">
            <span className="text-primary-dark font-black tracking-tight">x cajón</span>
            <span className="font-black text-primary-dark">S/ {(product.precioCajon || product.precioUnitario * 100).toFixed(2)}</span>
          </div>
        </div>

        {/* Botón Añadir */}
        <button 
          onClick={handleAdd}
          disabled={isOutOfStock || added}
          className={clsx(
            "mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all disabled:cursor-not-allowed group-hover:shadow-glow",
            added ? "bg-whatsapp text-white" : isOutOfStock ? "bg-ink text-white opacity-50" : "bg-ink hover:bg-primary text-white"
          )}
        >
          <ShoppingCart size={14} />
          {added ? "¡Añadido!" : isOutOfStock ? "Sin Stock" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
}
