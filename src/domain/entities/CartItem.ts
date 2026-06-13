// src/domain/entities/CartItem.ts
// Entidad del carrito. Pura, sin deps.

import type { UnidadVenta } from "@/domain/entities/Producto";

export type CartItem = {
  productoId: string;
  sku: string;
  nombre: string;
  categoriaSlug: string;
  categoriaNombre: string;
  imagen: string;
  unidad: UnidadVenta;
  cantidad: number;
  precioUnitario: number;   // precio según la unidad seleccionada (ya calculado)
  subtotal: number;         // cantidad * precioUnitario
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalSoles: number;
};

export function buildCart(items: CartItem[]): Cart {
  const totalItems = items.reduce((s, i) => s + i.cantidad, 0);
  const totalSoles = items.reduce((s, i) => s + i.subtotal, 0);
  return { items, totalItems, totalSoles };
}
