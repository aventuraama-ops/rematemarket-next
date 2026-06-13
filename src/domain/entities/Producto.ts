// src/domain/entities/Producto.ts
// Entidad pura de negocio. Sin deps externas, sin React.

export type UnidadVenta = "unidad" | "docena" | "cajon";

export type Producto = {
  id: string;
  sku: string;
  slug: string;
  nombre: string;
  descripcion: string;
  categoriaId: string;
  categoriaNombre: string;
  categoriaSlug: string;
  precioUnitario: number;      // en PEN
  precioDocena?: number;
  precioCajon?: number;
  unidadesPorCajon?: number;
  stock: number;
  imagenes: string[];           // URLs
  destacado: boolean;
  enRemate: boolean;
  descuentoPct?: number;        // 0-99
  campaniaId?: string;
  tablaDeMedidas?: Record<string, string>[];
};

/** Calcula el precio según la unidad de venta */
export function getPrecio(p: Producto, unidad: UnidadVenta): number {
  if (unidad === "docena" && p.precioDocena) return p.precioDocena;
  if (unidad === "cajon" && p.precioCajon) return p.precioCajon;
  return p.precioUnitario;
}

/** Calcula el porcentaje de descuento entre precio actual y precio anterior */
export function calcDescuento(precioActual: number, precioAnterior: number): number {
  if (!precioAnterior || precioAnterior <= precioActual) return 0;
  return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
}
