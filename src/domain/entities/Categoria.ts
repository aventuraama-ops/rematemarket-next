// src/domain/entities/Categoria.ts
// Entidad pura de negocio. Sin deps externas, sin React.

export type Categoria = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  totalProductos: number;
  orden: number;
  activo: boolean;
};
