import type { ICategoriasRepository } from "../../domain/repositories/ICategoriasRepository";
import type { Categoria } from "../../domain/entities/Categoria";

const mockCategorias: Categoria[] = [
  { id: "cat-mot", slug: "motos", nombre: "Motos y accesorios", descripcion: "Motos de trabajo, minimotos y accesorios de protección importados directamente.", imagenUrl: "/assets/product-moto.jpg", totalProductos: 124, orden: 1, activo: true },
  { id: "cat-cal", slug: "calzados", nombre: "Calzados", descripcion: "Zapatillas, sandalias y calzado de temporada con precios de importación directa.", imagenUrl: "/assets/cat-calzados.jpg", totalProductos: 86, orden: 2, activo: true },
  { id: "cat-jug", slug: "juguetes", nombre: "Juguetes", descripcion: "Juguetes educativos, didácticos y de entretenimiento para todas las edades.", imagenUrl: "/assets/cat-juguetes.jpg", totalProductos: 152, orden: 3, activo: true },
  { id: "cat-hog", slug: "hogar", nombre: "Muebles para el Hogar", descripcion: "Muebles funcionales y modernos para sala, cocina y exteriores a precios de remate.", imagenUrl: "/assets/cat-muebles.jpg", totalProductos: 68, orden: 4, activo: true },
  { id: "cat-acc", slug: "accesorios", nombre: "Accesorios", descripcion: "Accesorios de moda, tecnología y lifestyle con la mejor relación precio-calidad.", imagenUrl: "/assets/cat-accesorios.jpg", totalProductos: 210, orden: 5, activo: true },
  { id: "cat-ele", slug: "electrodomesticos", nombre: "Electrodomésticos", descripcion: "Ventiladores, pequeños electrodomésticos y equipos del hogar de marcas reconocidas.", imagenUrl: "/assets/product-ventilador.jpg", totalProductos: 94, orden: 6, activo: true }
];

export class CategoriasRepoMock implements ICategoriasRepository {
  async getAll(): Promise<Categoria[]> {
    return mockCategorias.filter(c => c.activo).sort((a, b) => a.orden - b.orden);
  }
}
