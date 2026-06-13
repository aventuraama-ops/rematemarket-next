"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";

const faqs = [
  {
    q: "¿Puedo comprar solo una unidad?",
    a: "Sí. Vendemos al por menor desde 1 unidad y al por mayor por docena o cajón cerrado, con descuentos automáticos por volumen.",
  },
  {
    q: "¿Hacen envíos a provincia?",
    a: "Sí, despachamos a todo el Perú a través de las principales agencias o courier directo a tu puerta.",
  },
  {
    q: "¿Cómo funcionan las campañas de importación?",
    a: "Lanzamos un producto ganador, reservas tu cupo con un adelanto, esperamos a que llegue el contenedor y al arribo cancelas el saldo y recibes tu mercadería.",
  },
  {
    q: "¿Cuánto demora la entrega?",
    a: "Para stock inmediato, entre 24 y 48 horas en Lima. Para provincias, depende de la agencia (1–4 días). En campañas, los plazos se anuncian al abrir cupos.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Transferencias bancarias, Yape, Plin, tarjetas (VISA/Mastercard) y, cuando aplica, pago contra entrega.",
  },
  {
    q: "¿Puedo comprar al por mayor?",
    a: "Sí. Tenemos tabla de descuentos por docena y cajón cerrado. Solicítanos cotización personalizada.",
  },
  {
    q: "¿El stock es real?",
    a: "100% real y tangible. Lo que ves en la web lo tenemos en nuestro almacén listo para despachar.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background py-24 lg:py-32">
      <div className="container-rm">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionTag>Preguntas frecuentes</SectionTag>
            <h2 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
              Todo lo que necesitas saber{" "}
              <span className="text-gradient-orange">antes de comprar</span> o importar
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-primary/30 bg-primary/[0.04]" : "border-foreground/10 bg-card"
                  } mb-3`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="text-[15.5px] font-semibold text-foreground md:text-base">
                      {f.q}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "gradient-orange text-white rotate-45" : "bg-foreground/5 text-foreground"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
