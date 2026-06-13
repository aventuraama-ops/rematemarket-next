import type { Producto } from "../entities/Producto";

export interface IProductosRepository {
  getAll(): Promise<Producto[]>;
}
