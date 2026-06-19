import type { IProductosRepository } from "@/domain/repositories/IProductosRepository";
import type { Producto } from "@/domain/entities/Producto";

export async function getProductoBySlug(
  repo: IProductosRepository,
  slug: string
): Promise<Producto | null> {
  return await repo.getBySlug(slug);
}
