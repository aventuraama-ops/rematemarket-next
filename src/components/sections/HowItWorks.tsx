"use client";

import { PackageSearch, Calculator, CreditCard, Truck, Megaphone, BookmarkCheck, Ship, HandCoins } from "lucide-react";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";

type ColData = {
  label: string;
  tone: "light" | "dark";
  steps: { icon: typeof PackageSearch; title: string; desc: string }[];
};

const colA: ColData = {
  label: "A · Stock Inmediato",
  tone: "light",
  steps: [
    { icon: PackageSearch, title: "Selecciona tu producto", desc: "Navega nuestras categorías y elige lo que necesitas." },
    { icon: Calculator, title: "Te cotizamos", desc: "Te damos el mejor precio incluso llevando solo 1 unidad." },
    { icon: CreditCard, title: "Lo pagas", desc: "Transferencias, tarjetas y contra entrega si aplica." },
    { icon: Truck, title: "Te entregamos", desc: "Despachamos en 24-48 h o a tu agencia preferida." },
  ],
};

const colB: ColData = {
  label: "B · Campañas de Importación",
  tone: "dark",

  steps: [
    { icon: Megaphone, title: "Lanzamos el producto", desc: "Elegimos un ganador y abrimos convocatoria." },
    { icon: BookmarkCheck, title: "Separas tu cupo", desc: "Aseguras tu cantidad con un adelanto mínimo." },
    { icon: Ship, title: "Llega el contenedor", desc: "Nos encargamos de la importación completa." },
    { icon: HandCoins, title: "Pagas y recibes", desc: "Cancelas saldo y entregamos tu mercadería." },
  ],
};

function Column({ data, side }: { data: ColData; side: "left" | "right" }) {
  const isDark = data.tone === "dark";
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] p-8 md:p-10 ${
        isDark ? "bg-ink text-white" : "bg-card text-foreground border border-foreground/5"
      } shadow-card`}
    >
      {isDark ? (
        <>
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </>
      ) : null}

      <div className="relative">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            isDark ? "bg-white/10 text-white border border-white/15" : "bg-primary/10 text-primary border border-primary/20"
          }`}
        >
          {data.label}
        </span>

        <ol className="mt-10 space-y-2">
          {data.steps.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === data.steps.length - 1;
            return (
              <Reveal key={s.title} delay={i * 0.06 + (side === "right" ? 0.1 : 0)}>
                <li className="relative flex gap-5 pb-6">
                  {/* Connector */}
                  {!isLast ? (
                    <span
                      className={`absolute left-[27px] top-[58px] h-[calc(100%-32px)] w-px ${
                        isDark ? "bg-white/15" : "bg-foreground/10"
                      }`}
                    />
                  ) : null}
                  <div
                    className={`relative grid size-14 shrink-0 place-items-center rounded-2xl text-[15px] font-extrabold ${
                      isDark
                        ? "bg-white/10 text-white border border-white/15"
                        : "bg-soft text-foreground border border-foreground/5"
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="absolute -bottom-1.5 -right-1.5 grid size-6 place-items-center rounded-full gradient-orange text-[11px] font-bold text-white shadow-glow">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <h4 className="text-[16px] font-bold tracking-tight">{s.title}</h4>
                    <p
                      className={`mt-1.5 text-[14px] leading-relaxed ${
                        isDark ? "text-white/65" : "text-muted-foreground"
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container-rm">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionTag>¿Cómo funciona?</SectionTag>
            <h2 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
              Compra rápida y segura:{" "}
              <span className="text-gradient-orange">dos formas inteligentes</span> de comprar
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Column data={colA} side="left" />
          <Column data={colB} side="right" />
        </div>
      </div>
    </section>
  );
}
