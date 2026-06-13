"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Tag, Truck, Users } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white py-24 lg:py-32">
      {/* Background Grid & Halo */}
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, .04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, .04) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at top, #000 30%, transparent 75%)" }}></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 blur-[80px] -top-[200px] -right-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              Importadora Directa
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-balance">
              Tu Importadora <br />
              Directa: <span className="text-primary">Stock Real</span> y <span className="text-primary">Precios de Remate.</span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              Compra al por mayor y menor directamente de nuestro catálogo importado, sin intermediarios, sin tarifas ocultas y con stock listo para entrega inmediata en todo el país.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/categorias" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold shadow-glow hover:scale-105 transition-transform duration-300 animate-pulse-ring">
                Ver campañas activas <ArrowRight size={18} />
              </Link>
              <Link href="/categorias" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                Explorar stock <ArrowRight size={18} />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-ink"></div>
                <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-ink"></div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-ink"></div>
              </div>
              <div>
                <p className="font-bold text-sm">+1,200 clientes satisfechos</p>
                <p className="text-xs text-gray-400">Importamos lo que necesitas, cuando lo necesitas</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Composition (Image & Cards) */}
        <div className="flex-1 relative w-full h-[500px]">
           {/* Replace this empty div with a realistic mock using Framer Motion to float cards like in the image */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
           >
              {/* Central Box / Product representation */}
              <div className="w-full h-full max-w-md mx-auto relative flex items-center justify-center">
                 {/* This would be the boxes and products image, for now a placeholder stylized */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-3xl"></div>
                 
                 {/* Floating Card 1 */}
                 <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -left-10 bg-white text-ink p-4 rounded-2xl shadow-lift w-56 border border-border"
                 >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Tag size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight">Hasta 50% dscto.</p>
                        <p className="text-[10px] text-muted-foreground mt-1">en nuestra próxima campaña de importación</p>
                      </div>
                    </div>
                 </motion.div>

                 {/* Floating Card 2 */}
                 <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 -left-4 bg-white text-ink p-4 rounded-2xl shadow-lift w-64 border border-border"
                 >
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <Truck size={14} className="text-primary" /> Tu pedido en camino
                    </div>
                    <div className="h-1.5 w-full bg-soft rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-primary w-2/3"></div>
                    </div>
                    <p className="font-black text-primary text-lg">S/ 3,870.00</p>
                    <p className="text-[10px] text-muted-foreground">Lima → Arequipa · Entrega est.: 6-7 días</p>
                 </motion.div>

                 {/* Floating Card 3 */}
                 <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-4 top-20 bg-ink-2 text-white p-4 rounded-2xl shadow-lift w-48 border border-white/10"
                 >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 text-primary flex items-center justify-center shrink-0">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight">Pago 100% seguro</p>
                        <p className="text-[10px] text-gray-400 mt-1">Protegemos tu compra de principio a fin</p>
                      </div>
                    </div>
                 </motion.div>
                 
                 {/* Floating Card 4 */}
                 <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute bottom-20 -right-8 bg-white text-ink p-4 rounded-2xl shadow-lift w-52 border border-border"
                 >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight text-primary">Campañas exclusivas</p>
                        <p className="text-[10px] text-muted-foreground mt-1">de importación · Ahorra más, importa mejor</p>
                      </div>
                    </div>
                 </motion.div>

              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
