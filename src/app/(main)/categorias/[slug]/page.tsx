import Link from "next/link";
import { mockProductos } from "@/infrastructure/mock/productos";
import { CategoriasRepoMock } from "@/infrastructure/mock/CategoriasRepoMock";
import { ProductB2BCard } from "@/components/ui/ProductB2BCard";
import { Clock } from "lucide-react";

const categoriasRepo = new CategoriasRepoMock();

export async function generateStaticParams() {
  const categorias = await categoriasRepo.getAll();
  return categorias.map(cat => ({ slug: cat.slug }));
}

export default async function CategoriaVitrinaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const categorias = await categoriasRepo.getAll();
  const categoria = categorias.find(c => c.slug === resolvedParams.slug);
  const categoriaNombre = categoria?.nombre || resolvedParams.slug.toUpperCase();

  // Filtramos los productos según el slug de la categoría, ocultamos pendientes y ordenamos por stock decreciente
  const productosFiltrados = mockProductos
    .filter(p => p.categoriaSlug === resolvedParams.slug && !p.pendiente)
    .sort((a, b) => b.stock - a.stock);

  return (
    <div className="bg-soft min-h-screen pb-24 pt-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <header className="mb-10 text-center md:text-left">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2 justify-center md:justify-start">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link> 
            <span className="text-border">/</span> 
            <Link href="/categorias" className="hover:text-primary transition-colors">Categorías</Link> 
            <span className="text-border">/</span> 
            <span className="text-primary">{categoriaNombre}</span>
          </div>
          <h1 className="text-4xl font-black text-ink mb-4 tracking-tight">{categoriaNombre}</h1>
          {categoria?.descripcion && (
            <p className="max-w-2xl text-muted-foreground">{categoria.descripcion}</p>
          )}
        </header>

        {/* Vitrina Pura */}
        <main>
          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <ProductB2BCard key={producto.id} product={producto} />
              ))}
            </div>
          ) : resolvedParams.slug === "productos-para-el-hombre" ? (
             <div className="text-center py-24 bg-white rounded-[32px] border border-border shadow-sm">
               <span className="inline-flex items-center justify-center size-16 rounded-2xl bg-orange-50 text-primary mb-6 ring-1 ring-primary/20">
                 <Clock className="size-8" />
               </span>
               <h3 className="font-display font-extrabold text-3xl text-ink mb-3">Próximamente</h3>
               <p className="text-[15px] max-w-md mx-auto text-muted-foreground">Estamos preparando el mejor catálogo de artículos para el hombre a precios de importador. ¡Mantente atento!</p>
             </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-border">
              <h3 className="font-bold text-lg text-ink mb-2">No hay productos disponibles</h3>
              <p className="text-muted-foreground">Actualmente no tenemos productos visibles en esta categoría.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
