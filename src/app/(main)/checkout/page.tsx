"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Si el carrito está vacío, regresar a categorías
    if (getTotalItems() === 0) {
      router.push("/categorias");
    }
  }, [getTotalItems, router]);

  // Cálculos de Total
  const subtotal = items.reduce((acc, item) => {
    // Determinar qué precio usar en base a la cantidad
    let priceToUse = item.producto.precioUnitario;
    if (item.cantidad >= 1000) priceToUse = item.producto.precioCajon ?? item.producto.precioUnitario;
    else if (item.cantidad >= 12) priceToUse = item.producto.precioDocena ?? item.producto.precioUnitario;
    
    return acc + (priceToUse * item.cantidad);
  }, 0);

  if (!mounted || getTotalItems() === 0) return null;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de generar el mensaje de WhatsApp con el pedido
    alert("Datos capturados exitosamente. Redirigiendo a WhatsApp...");
  };

  return (
    <div className="bg-soft min-h-screen pb-24 pt-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <header className="mb-10">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link> 
            <span className="text-border">/</span> 
            <span className="text-primary">Checkout</span>
          </div>
          <h1 className="text-4xl font-black text-ink mb-2 tracking-tight">Completa tu cotización</h1>
          <p className="text-muted-foreground">Revisa tu lista y completa tus datos para generar el pedido directo a WhatsApp.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Peaje Obligatorio de Datos (Izquierda) */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
              <div className="flex items-start gap-4 mb-8 p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <Info className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-primary mb-1 text-sm">Paso Obligatorio</h4>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    Para enviar la cotización y verificar el stock en tiempo real por WhatsApp, es necesario confirmar tus datos de contacto básicos.
                  </p>
                </div>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Nombre Completo</label>
                  <input type="text" className="w-full bg-soft border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Ingresa tu nombre y apellido" required />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Correo Electrónico</label>
                  <input type="email" className="w-full bg-soft border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="tucorreo@ejemplo.com" required />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Celular (WhatsApp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">+51</span>
                    <input type="tel" className="w-full bg-soft border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="987 654 321" required />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:brightness-110 hover:shadow-glow transition-all">
                    <MessageCircle size={20} />
                    Enviar Pedido por WhatsApp
                  </button>
                  <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4">
                    Te enviaremos el resumen exacto a tu chat
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Resumen del Pedido (Derecha) */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm sticky top-24">
              <h3 className="font-black text-xl text-ink mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.producto.id} className="flex gap-4 p-3 bg-soft rounded-2xl border border-border/50">
                    <div className="w-16 h-16 rounded-xl bg-white border border-border/50 flex items-center justify-center p-2 shrink-0">
                      {item.producto.imagenes && item.producto.imagenes.length > 0 ? (
                        <Image src={item.producto.imagenes[0]} alt={item.producto.nombre} width={40} height={40} className="object-contain" />
                      ) : (
                        <span className="text-[8px] text-muted-foreground font-bold">IMG</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-xs text-ink line-clamp-1 mb-1">{item.producto.nombre}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">Cant: {item.cantidad}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                  <span>Productos ({getTotalItems()})</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                  <span>Envío</span>
                  <span className="text-primary font-bold uppercase text-xs">Por coordinar</span>
                </div>
                
                <div className="flex justify-between items-end pt-4 mt-2 border-t border-border">
                  <span className="font-bold text-ink">Total Estimado</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">S/ {subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
