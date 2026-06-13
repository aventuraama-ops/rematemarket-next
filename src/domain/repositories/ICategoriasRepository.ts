import type { Categoria } from "../entities/Categoria";

export interface ICategoriasRepository {
  getAll(): Promise<Categoria[]>;
}
