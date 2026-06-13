import { X, Check } from "lucide-react";
import type { Categoria } from "@/domain/entities/Categoria";

type Filtros = {
  busqueda?: string;
  categoriaSlug?: string;
  enRemate?: boolean;
  soloStock?: boolean;
};

type Props = {
  categorias: Categoria[];
  filtros: Filtros;
  setFiltro: (k: "categoriaSlug" | "enRemate" | "soloStock", v: any) => void;
  limpiarFiltros: () => void;
  filtrosActivos: boolean;
};

export function FiltrosSidebar({
  categorias,
  filtros,
  setFiltro,
  limpiarFiltros,
  filtrosActivos,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Limpiar filtros */}
      {filtrosActivos && (
        <button
          onClick={limpiarFiltros}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 py-2 text-[12px] font-semibold text-primary"
        >
          <X className="size-3.5" /> Limpiar filtros
        </button>
      )}

      {/* Categorías */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Categoría
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setFiltro("categoriaSlug", "")}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-left transition-all ${
                filtros.categoriaSlug === "" || !filtros.categoriaSlug
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-foreground hover:bg-soft"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  filtros.categoriaSlug === "" || !filtros.categoriaSlug
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
              Todas las categorías
            </button>
          </li>
          {categorias.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setFiltro("categoriaSlug", cat.slug)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-left transition-all ${
                  filtros.categoriaSlug === cat.slug
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground hover:bg-soft"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    filtros.categoriaSlug === cat.slug
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
                {cat.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-border" />

      {/* Disponibilidad */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Disponibilidad
        </h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] hover:bg-soft">
            <div
              onClick={() => setFiltro("soloStock", !filtros.soloStock)}
              className={`flex size-4 shrink-0 items-center justify-center rounded border transition-all ${
                filtros.soloStock ? "border-primary bg-primary" : "border-border"
              }`}
            >
              {filtros.soloStock && <Check className="size-3 text-white" />}
            </div>
            <span>Solo con stock</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] hover:bg-soft">
            <div
              onClick={() => setFiltro("enRemate", !filtros.enRemate)}
              className={`flex size-4 shrink-0 items-center justify-center rounded border transition-all ${
                filtros.enRemate ? "border-primary bg-primary" : "border-border"
              }`}
            >
              {filtros.enRemate && <Check className="size-3 text-white" />}
            </div>
            <span>Solo en remate</span>
          </label>
        </div>
      </div>
    </div>
  );
}
