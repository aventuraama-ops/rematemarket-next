import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ShoppingCart,
  FileText,
  MessageCircle,
  Tag,
  Sparkles,
  HelpCircle,
  Boxes,
} from "lucide-react";

// TODO: InsForge — reemplazar por búsqueda real sobre productos/categorías
const productosMock = [
  "Casco para moto",
  "Sandalias de verano",
  "Silla plegable",
  "Ventilador de torre",
  "Zapatillas urbanas",
  "Moto lineal 150cc",
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();

  // Atajo ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    onOpenChange(false);
    router.push(to);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Busca productos, categorías o ayuda…" />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>

        <CommandGroup heading="Acciones rápidas">
          <CommandItem onSelect={() => go("/cotizar")}>
            <FileText className="mr-2 size-4" />
            Cotizar un pedido
          </CommandItem>
          <CommandItem onSelect={() => go("/categorias")}>
            <Boxes className="mr-2 size-4" />
            Ver todas las categorías
          </CommandItem>
          <CommandItem onSelect={() => go("/remate-del-mes")}>
            <Sparkles className="mr-2 size-4" />
            Remate del mes
          </CommandItem>
          <CommandItem onSelect={() => go("/ayuda")}>
            <HelpCircle className="mr-2 size-4" />
            Centro de ayuda
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              window.open("https://wa.me/51987654321", "_blank");
            }}
          >
            <MessageCircle className="mr-2 size-4" />
            Escribir por WhatsApp
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Productos sugeridos">
          {productosMock.map((p) => (
            <CommandItem key={p} onSelect={() => go("/categorias")}>
              <Tag className="mr-2 size-4" />
              {p}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Carrito">
          <CommandItem onSelect={() => go("/cotizar")}>
            <ShoppingCart className="mr-2 size-4" />
            Ir a cotizar mi carrito
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
