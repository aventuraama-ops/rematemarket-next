import type { Producto } from "@/domain/entities/Producto";

export const mockProductos: Producto[] = [

  // ── LICORES (3 productos — categoría cat-lic) ─────────────────────
  {
    id: "p-lic-1", sku: "LIC-001", slug: "whisky-importado-blue-label",
    nombre: "Whisky Importado Blue Label 750ml",
    descripcion: "Whisky premium escocés de 12 años. Caja sellada original de importación directa.",
    categoriaId: "cat-lic", categoriaNombre: "Licores", categoriaSlug: "licores",
    precioUnitario: 850,
    preciosPorVolumen: [
      { etiqueta: "1 botella", cantidad: 1, precio: 850 },
      { etiqueta: "Caja (12 botellas)", cantidad: 12, precio: 790 },
    ],
    stock: 420, imagenes: ["/assets/product-licor-whisky.jpg"],
    destacado: true, enRemate: false,
  },
  {
    id: "p-lic-2", sku: "LIC-002", slug: "vodka-ruso-premium-1l",
    nombre: "Vodka Ruso Premium 1L",
    descripcion: "Vodka triple destilado de importación directa. Ideal para tiendas y distribuidores.",
    categoriaId: "cat-lic", categoriaNombre: "Licores", categoriaSlug: "licores",
    precioUnitario: 120,
    preciosPorVolumen: [
      { etiqueta: "1 botella", cantidad: 1, precio: 120 },
      { etiqueta: "Caja (12 botellas)", cantidad: 12, precio: 95 },
    ],
    stock: 500, imagenes: ["/assets/campaign-container.jpg"],
    destacado: false, enRemate: false,
  },
  {
    id: "p-lic-3", sku: "LIC-003", slug: "ron-premium-importado",
    nombre: "Ron Premium Importado 750ml",
    descripcion: "Ron añejado de alta calidad, importado directamente de destilería certificada.",
    categoriaId: "cat-lic", categoriaNombre: "Licores", categoriaSlug: "licores",
    precioUnitario: 95,
    preciosPorVolumen: [
      { etiqueta: "1 botella", cantidad: 1, precio: 95 },
      { etiqueta: "Caja (12 botellas)", cantidad: 12, precio: 80 },
    ],
    stock: 350, imagenes: ["/assets/campaign-container.jpg"],
    destacado: false, enRemate: false,
  },

  // ── SALUD (cat-sal) ────────────────────────────────────────────────
  // Etiqueta Azul
  {
    id: "p-sal-1", sku: "SAL-001", slug: "etiqueta-azul",
    nombre: "Etiqueta Azul — Producto de Salud Premium",
    descripcion: "Producto de salud importado de alta demanda. Precio incluye IGV.",
    categoriaId: "cat-sal", categoriaNombre: "Salud", categoriaSlug: "salud",
    precioUnitario: 900,
    preciosPorVolumen: [
      { etiqueta: "1 und (venta)", cantidad: 1, precio: 900 },
      { etiqueta: "Caja (6 und)", cantidad: 6, precio: 5000 },
      { etiqueta: "10 cajas", cantidad: 60, precio: 4500 },
      { etiqueta: "100 cajas", cantidad: 600, precio: 4400 },
    ],
    stock: 24, imagenes: ["/assets/campaign-container.jpg"],
    destacado: true, enRemate: false,
  },
  // Péptidos — PENDIENTE (no mostrar en UI)
  {
    id: "p-sal-2", sku: "SAL-002", slug: "peptidos-tipo-a",
    nombre: "Péptidos Tipo A",
    descripcion: "Suplemento de péptidos de alta biodisponibilidad.",
    categoriaId: "cat-sal", categoriaNombre: "Salud", categoriaSlug: "salud",
    precioUnitario: 0, // Precio pendiente de confirmar
    stock: 0, imagenes: [],
    destacado: false, enRemate: false,
    pendiente: true, // ← NO mostrar en UI hasta confirmar precios
  },
  {
    id: "p-sal-3", sku: "SAL-003", slug: "peptidos-tipo-b",
    nombre: "Péptidos Tipo B",
    descripcion: "Péptidos bioactivos importados.",
    categoriaId: "cat-sal", categoriaNombre: "Salud", categoriaSlug: "salud",
    precioUnitario: 0,
    stock: 0, imagenes: [],
    destacado: false, enRemate: false,
    pendiente: true,
  },
  {
    id: "p-sal-4", sku: "SAL-004", slug: "peptidos-tipo-c",
    nombre: "Péptidos Tipo C",
    descripcion: "Péptidos especializados de importación.",
    categoriaId: "cat-sal", categoriaNombre: "Salud", categoriaSlug: "salud",
    precioUnitario: 0,
    stock: 0, imagenes: [],
    destacado: false, enRemate: false,
    pendiente: true,
  },

  // ── CALZADOS (cat-cal) — Zapatillas + Sandalias ────────────────────
  {
    id: "p-cal-1", sku: "CAL-001", slug: "zapatillas-deportivas",
    nombre: "Zapatillas Deportivas Importadas",
    descripcion: "Zapatillas urbanas de alta calidad con suela antideslizante. Importación directa.",
    categoriaId: "cat-cal", categoriaNombre: "Calzados", categoriaSlug: "calzados",
    precioUnitario: 50,
    precioDocena: 45,
    precioCajon: 40,
    preciosPorVolumen: [
      { etiqueta: "1 und", cantidad: 1, precio: 50 },
      { etiqueta: "Docena (12)", cantidad: 12, precio: 45 },
      { etiqueta: "Ciento (100)", cantidad: 100, precio: 40 },
    ],
    stock: 200, imagenes: ["/assets/product-zapatillas.jpg"],
    destacado: true, enRemate: false,
  },
  {
    id: "p-cal-2", sku: "CAL-002", slug: "sandalias-eva-verano",
    nombre: "Sandalias EVA Verano",
    descripcion: "Sandalias ultra ligeras antideslizantes. Modelos y tallas en proceso de completar.",
    categoriaId: "cat-cal", categoriaNombre: "Calzados", categoriaSlug: "calzados",
    precioUnitario: 30,
    precioDocena: 25,
    precioCajon: 20,
    preciosPorVolumen: [
      { etiqueta: "1 und", cantidad: 1, precio: 30 },
      { etiqueta: "Docena (12)", cantidad: 12, precio: 25 },
      { etiqueta: "Ciento (100)", cantidad: 100, precio: 20 },
    ],
    stock: 150, imagenes: ["/assets/product-sandalias.jpg"],
    destacado: false, enRemate: false,
    notaProducto: "Modelos y tallas: en proceso de completar catálogo completo.",
  },

  // ── JUGUETES (cat-jug) — Moto ──────────────────────────────────────
  {
    id: "p-jug-1", sku: "MOT-001", slug: "moto-semiprofesional",
    nombre: "Moto Semiprofesional",
    descripcion: "Moto importada de alta calidad. Incluye casco y guantes de regalo.",
    categoriaId: "cat-jug", categoriaNombre: "Juguetes", categoriaSlug: "juguetes",
    precioUnitario: 650,
    preciosPorVolumen: [
      { etiqueta: "1 und",  cantidad: 1,  precio: 650 },
      { etiqueta: "6 und",  cantidad: 6,  precio: 620 },
      { etiqueta: "12 und", cantidad: 12, precio: 600 },
      { etiqueta: "24 und", cantidad: 24, precio: 590 },
    ],
    stock: 18, imagenes: ["/assets/product-moto.jpg"],
    destacado: true, enRemate: false,
    notaProducto: "Precio incluye casco y guantes de regalo.",
  },

  // ── HOGAR / MUEBLES (cat-hog) — AGOTADO ───────────────────────────
  {
    id: "p-hog-1", sku: "HOG-001", slug: "silla-descanso-playera",
    nombre: "Silla de Descanso / Playera",
    descripcion: "Silla plegable resistente al sol y humedad.",
    categoriaId: "cat-hog", categoriaNombre: "Productos del Hogar", categoriaSlug: "hogar",
    precioUnitario: 160,
    stock: 0, // AGOTADO
    imagenes: ["/assets/product-silla.jpg"],
    destacado: false, enRemate: false,
  },

  // ── TECNOLOGÍA (cat-tec) — Cases de Celular ───────────────────────
  {
    id: "p-tec-1", sku: "TEC-001", slug: "cases-celular-surtidos",
    nombre: "Cases para Celular (Surtido)",
    descripcion: "Cases importados para los modelos más populares. Alta resistencia y diseño moderno.",
    categoriaId: "cat-tec", categoriaNombre: "Tecnología", categoriaSlug: "tecnologia",
    precioUnitario: 10,
    precioDocena: 8,
    precioCajon: 6,
    preciosPorVolumen: [
      { etiqueta: "1 und",        cantidad: 1,   precio: 10 },
      { etiqueta: "Docena (12)",  cantidad: 12,  precio: 8  },
      { etiqueta: "Ciento (100)", cantidad: 100, precio: 6  },
    ],
    stock: 500, imagenes: ["/assets/product-casco.jpg"],
    destacado: true, enRemate: false,
  },

  // ── CONTÓMETROS (cat-ofi) — categoría nueva ───────────────────────
  {
    id: "p-ofi-1", sku: "OFI-001", slug: "contometros-caja",
    nombre: "Contómetros (Caja de 20 und)",
    descripcion: "Contómetros de oficina importados. Por caja vienen 20 unidades.",
    categoriaId: "cat-ofi", categoriaNombre: "Oficina", categoriaSlug: "oficina",
    precioUnitario: 90, // precio de 1 caja (20 und)
    preciosPorVolumen: [
      { etiqueta: "1 caja (20 und)",  cantidad: 1,   precio: 90 },
      { etiqueta: "10 cajas",         cantidad: 10,  precio: 80 },
      { etiqueta: "100 cajas",        cantidad: 100, precio: 75 },
    ],
    stock: 300, imagenes: ["/assets/campaign-container.jpg"],
    destacado: false, enRemate: false,
    notaProducto: "Por caja vienen 20 unidades.",
  },

  // ── PRODUCTOS PARA LA MUJER (cat-muj) — Fajas ─────────────────────
  {
    id: "p-muj-1", sku: "MUJ-001", slug: "faja-form-x",
    nombre: "Faja Form X — Moldeadora Alta Compresión",
    descripcion: "Faja Form X de alta compresión. Moldea la cintura y reduce hasta 7 cm del contorno abdominal. Elimina la retención de líquidos. Ideal para mejorar la postura y para uso post parto. Elimina la flacidez y pega la piel al músculo. Importación directa.",
    categoriaId: "cat-muj", categoriaNombre: "Productos para la Mujer", categoriaSlug: "productos-para-la-mujer",
    precioUnitario: 150,
    preciosPorVolumen: [
      { etiqueta: "1 und",   cantidad: 1,   precio: 150 },
      { etiqueta: "6 und",   cantidad: 6,   precio: 110 },
      { etiqueta: "100 und", cantidad: 100, precio: 90  },
    ],
    stock: 45, imagenes: ["/assets/product-sandalias.jpg"], // TODO: reemplazar con foto real Form X
    destacado: true, enRemate: false,
    notaProducto: "Tallas disponibles hasta L. Consultar disponibilidad de XL.",
    tablaDeMedidas: [
      { talla: "XS / 30", cintura_cms: "62-68", cadera_cms: "81-89",   peso_lb: "101-111" },
      { talla: "S / 32",  cintura_cms: "69-75", cadera_cms: "90-97",   peso_lb: "112-125" },
      { talla: "M / 34",  cintura_cms: "76-82", cadera_cms: "98-105",  peso_lb: "126-140" },
      { talla: "L / 36",  cintura_cms: "83-89", cadera_cms: "106-115", peso_lb: "141-155" },
    ],
  },

  // ── PRODUCTOS PARA EL HOMBRE (cat-hom) — VACÍO POR AHORA ─────────
  // Pendiente confirmación del jefe. Categoría creada pero sin productos.
  // Agregar cuando se defina el catálogo.
];
