import type { ICategoriasRepository } from "../../domain/repositories/ICategoriasRepository";
import type { Categoria } from "../../domain/entities/Categoria";

const mockCategorias: Categoria[] = [
  {
    id: "cat-lic",
    slug: "licores",
    nombre: "Licores",
    descripcion: "Licores premium de importación directa: whisky, vodka, ron y más. Precios de distribuidor.",
    imagenUrl: "/assets/campaign-container.jpg", // TODO: reemplazar por imagen real de licores
    totalProductos: 3,
    orden: 1,
    activo: true,
  },
  {
    id: "cat-cal",
    slug: "calzados",
    nombre: "Calzados",
    descripcion: "Zapatillas y sandalias de temporada a precios de importación directa.",
    imagenUrl: "/assets/cat-calzados.jpg",
    totalProductos: 2,
    orden: 2,
    activo: true,
  },
  {
    id: "cat-jug",
    slug: "juguetes",
    nombre: "Juguetes",
    descripcion: "Motos y artículos de entretenimiento importados para todas las edades.",
    imagenUrl: "/assets/cat-juguetes.jpg",
    totalProductos: 1,
    orden: 3,
    activo: true,
  },
  {
    id: "cat-hog",
    slug: "hogar",
    nombre: "Productos del Hogar",
    descripcion: "Muebles y artículos para el hogar. Algunos productos en reposición.",
    imagenUrl: "/assets/cat-muebles.jpg",
    totalProductos: 1,
    orden: 4,
    activo: true,
  },
  {
    id: "cat-tec",
    slug: "tecnologia",
    nombre: "Tecnología",
    descripcion: "Cases, accesorios y productos tecnológicos a precios de importación directa.",
    imagenUrl: "/assets/cat-accesorios.jpg",
    totalProductos: 1,
    orden: 5,
    activo: true,
  },
  {
    id: "cat-sal",
    slug: "salud",
    nombre: "Salud",
    descripcion: "Productos de salud y bienestar importados. Fajas, etiqueta azul y suplementos.",
    imagenUrl: "/assets/campaign-container.jpg", // TODO: imagen real de salud
    totalProductos: 1, // Solo Etiqueta Azul visible (péptidos pendientes)
    orden: 6,
    activo: true,
  },
  {
    id: "cat-muj",
    slug: "productos-para-la-mujer",
    nombre: "Productos para la Mujer",
    descripcion: "Fajas, accesorios y productos de moda femenina de importación directa.",
    imagenUrl: "/assets/product-sandalias.jpg", // placeholder
    totalProductos: 1,
    orden: 7,
    activo: true,
  },
  {
    id: "cat-hom",
    slug: "productos-para-el-hombre",
    nombre: "Productos para el Hombre",
    descripcion: "Próximamente: accesorios y artículos masculinos a precios de importación.",
    imagenUrl: "/assets/product-moto.jpg", // placeholder
    totalProductos: 0,
    orden: 8,
    activo: true, // Mostrar la categoría aunque esté vacía (Coming Soon)
  },
  {
    id: "cat-ofi",
    slug: "oficina",
    nombre: "Oficina",
    descripcion: "Suministros y artículos para oficina y negocios.",
    imagenUrl: "/assets/campaign-container.jpg", // placeholder
    totalProductos: 1,
    orden: 9,
    activo: true,
  }
];

export class CategoriasRepoMock implements ICategoriasRepository {
  async getAll(): Promise<Categoria[]> {
    return mockCategorias.filter(c => c.activo).sort((a, b) => a.orden - b.orden);
  }
}
