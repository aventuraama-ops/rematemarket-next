import type { IProductosRepository } from "../../domain/repositories/IProductosRepository";
import type { Producto } from "../../domain/entities/Producto";

export async function getProductos(repo: IProductosRepository): Promise<Producto[]> {
  return await repo.getAll();
}
