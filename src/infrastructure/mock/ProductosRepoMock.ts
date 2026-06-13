import type { IProductosRepository } from "../../domain/repositories/IProductosRepository";
import type { Producto } from "../../domain/entities/Producto";
import { mockProductos } from "./productos";

export class ProductosRepoMock implements IProductosRepository {
  async getAll(): Promise<Producto[]> {
    return mockProductos;
  }
}
