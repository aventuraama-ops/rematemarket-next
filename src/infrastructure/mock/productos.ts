import type { Producto } from "@/domain/entities/Producto";

export const mockProductos: Producto[] = [
  // 1. Licores (+400 stock)
  {
    id: "p-lic-1", sku: "LIC-001", slug: "whisky-blue-label",
    nombre: "Whisky Importado Blue Label 750ml",
    descripcion: "Whisky premium escocés. Caja sellada original.",
    categoriaId: "cat-lic", categoriaNombre: "Licores", categoriaSlug: "licores",
    precioUnitario: 850, precioDocena: 790, precioCajon: 700,
    stock: 420,
    imagenes: [],
    destacado: true, enRemate: false
  },
  {
    id: "p-lic-2", sku: "LIC-002", slug: "vodka-ruso-1l",
    nombre: "Vodka Ruso Premium 1L",
    descripcion: "Vodka triple destilado, importado.",
    categoriaId: "cat-lic", categoriaNombre: "Licores", categoriaSlug: "licores",
    precioUnitario: 120, precioDocena: 95, precioCajon: 80,
    stock: 500,
    imagenes: [],
    destacado: false, enRemate: false
  },

  // 2. Salud (Stock 3)
  {
    id: "p-sal-1", sku: "SAL-001", slug: "proteina-sintetizada-2kg",
    nombre: "Proteína Sintetizada Whey 2Kg",
    descripcion: "Proteína aislada de alta absorción.",
    categoriaId: "cat-sal", categoriaNombre: "Salud", categoriaSlug: "salud",
    precioUnitario: 210, precioDocena: 190, precioCajon: 170,
    stock: 3, // Regla de UI: urgencia
    imagenes: [],
    destacado: true, enRemate: true
  },

  // 3. Calzados (Stock 2)
  {
    id: "p-cal-1", sku: "CAL-001", slug: "sandalias-verano-eva",
    nombre: "Sandalias EVA Verano",
    descripcion: "Sandalias ultra ligeras antideslizantes.",
    categoriaId: "cat-cal", categoriaNombre: "Calzados", categoriaSlug: "calzados",
    precioUnitario: 45, precioDocena: 38, precioCajon: 32,
    stock: 2, // Regla de UI: urgencia
    imagenes: [],
    destacado: false, enRemate: false
  },

  // 4. Juguetes (Stock 1, incluye moto)
  {
    id: "p-jug-1", sku: "MOT-001", slug: "moto-mini-motocross",
    nombre: "Moto Mini Motocross Infantil 48cc",
    descripcion: "Moto para niños con motor a gasolina. Placeholder pricing.",
    categoriaId: "cat-jug", categoriaNombre: "Juguetes", categoriaSlug: "juguetes",
    precioUnitario: 1050, precioDocena: 980, precioCajon: 900,
    stock: 1, // Regla de UI: urgencia
    imagenes: [],
    destacado: true, enRemate: false
  },

  // 5. Hogar (Stock 1)
  {
    id: "p-hog-1", sku: "HOG-001", slug: "silla-descanso-playera",
    nombre: "Silla de Descanso / Playera",
    descripcion: "Silla plegable resistente al sol y humedad.",
    categoriaId: "cat-hog", categoriaNombre: "Productos para el hogar", categoriaSlug: "hogar",
    precioUnitario: 160, precioDocena: 145, precioCajon: 120,
    stock: 1, // Regla de UI: urgencia
    imagenes: [],
    destacado: false, enRemate: false
  },

  // 6. Silueta & Control / Mujer (Stock 1, JSON Tallas)
  {
    id: "p-sil-1", sku: "SIL-001", slug: "faja-moldeadora-colombiana",
    nombre: "Faja Moldeadora Alta Compresión",
    descripcion: "Faja reductora uso diario y post-quirúrgico.",
    categoriaId: "cat-sil", categoriaNombre: "Silueta & Control", categoriaSlug: "silueta-control",
    precioUnitario: 120, precioDocena: 105, precioCajon: 90,
    stock: 1, // Regla de UI: urgencia
    imagenes: [],
    destacado: true, enRemate: false,
    tablaDeMedidas: [
      { "talla": "XS / 30", "cintura_cms": "62-68", "cadera_cms": "81-89", "peso_lb": "101-111" },
      { "talla": "S / 32", "cintura_cms": "69-75", "cadera_cms": "90-97", "peso_lb": "112-125" },
      { "talla": "M / 34", "cintura_cms": "76-82", "cadera_cms": "98-105", "peso_lb": "126-140" },
      { "talla": "L / 36", "cintura_cms": "83-89", "cadera_cms": "106-115", "peso_lb": "141-155" },
      { "talla": "XL", "cintura_cms": "90+", "cadera_cms": "115+", "peso_lb": "156+" }
    ]
  },

  // 7. Tecnología y Deportes (Stock 0)
  {
    id: "p-tec-1", sku: "TEC-001", slug: "auriculares-bluetooth-pro",
    nombre: "Auriculares Inalámbricos Pro",
    descripcion: "Cancelación de ruido activa, batería 24h.",
    categoriaId: "cat-tec", categoriaNombre: "Tecnología", categoriaSlug: "tecnologia",
    precioUnitario: 180, precioDocena: 150, precioCajon: 130,
    stock: 0, // Regla de UI: Agotado
    imagenes: [],
    destacado: false, enRemate: false
  }
];
