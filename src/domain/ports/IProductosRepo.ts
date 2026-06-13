// src/domain/ports/IProductosRepo.ts
// Puerto de salida para productos.

import type { Producto } from "@/domain/entities/Producto";

export type FiltrosProducto = {
  categoriaSlug?: string;
  enRemate?: boolean;
  destacado?: boolean;
  enStock?: boolean;
  precioMin?: number;
  precioMax?: number;
  busqueda?: string;
};

export interface IProductosRepo {
  /** Lista productos según filtros. */
  getAll(filtros?: FiltrosProducto): Promise<Producto[]>;

  /** Busca un producto por slug. */
  getBySlug(slug: string): Promise<Producto | null>;

  /** Productos en remate activo. */
  getEnRemate(): Promise<Producto[]>;

  /** Productos destacados para el home. */
  getDestacados(): Promise<Producto[]>;
}
