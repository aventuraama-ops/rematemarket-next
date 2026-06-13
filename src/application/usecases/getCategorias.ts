import type { ICategoriasRepository } from "../../domain/repositories/ICategoriasRepository";
import type { Categoria } from "../../domain/entities/Categoria";

export async function getCategorias(repo: ICategoriasRepository): Promise<Categoria[]> {
  return await repo.getAll();
}
