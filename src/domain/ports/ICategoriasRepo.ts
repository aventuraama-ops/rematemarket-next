// src/domain/ports/ICategoriasRepo.ts
// Puerto de salida: contrato que el núcleo necesita.
// La UI llama al usecase; el usecase llama a este puerto.
// La implementación concreta vive en infrastructure/.

import type { Categoria } from "@/domain/entities/Categoria";

export interface ICategoriasRepo {
  /** Devuelve todas las categorías activas, ordenadas por `orden`. */
  getAll(): Promise<Categoria[]>;

  /** Busca una categoría por su slug. Null si no existe. */
  getBySlug(slug: string): Promise<Categoria | null>;
}
