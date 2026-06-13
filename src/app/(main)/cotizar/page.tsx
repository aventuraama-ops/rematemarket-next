"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FloatingActions } from "@/components/shared/FloatingActions";
import { CTA } from "@/components/shared/CTA";

import {
  Check,
  ChevronLeft,
  ShoppingCart,
  ChevronRight,
  Package,
  Trash2,
  Plus,
  Minus,
  User,
  Truck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { useCartStore } from "@/providers/store-provider";
import type { CartItem } from "@/domain/entities/CartItem";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatSoles(n: number) {
  return `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
}

const UNIDAD_LABEL: Record<CartItem["unidad"], string> = {
  unidad: "Unidad",
  docena: "Docena",
  cajon: "Cajón",
};

const STEPS = [
  { id: 1, label: "Carrito", icon: ShoppingCart },
  { id: 2, label: "Contacto", icon: User },
  { id: 3, label: "Entrega", icon: Truck },
  { id: 4, label: "Resumen", icon: MessageCircle },
];

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
  tipo: "minorista" | "mayorista";
  modo: "recojo" | "envio";
  agencia: string;
  notas: string;
};

// ─── Página principal ─────────────────────────────────────────────────────────
export default function CotizarPage() {
  const { items, cart, isEmpty, updateQuantity, removeItem, clearCart } = useCartStore((state) => state);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    telefono: "",
    email: "",
    ciudad: "",
    tipo: "minorista",
    modo: "recojo",
    agencia: "",
    notas: "",
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isEmpty && step > 1) setStep(1);
  }, [isEmpty, step]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const enviarWhatsApp = () => {
    const itemsText = items
      .map(
        (i) =>
          `• ${i.nombre} (${UNIDAD_LABEL[i.unidad]}) x${i.cantidad} = ${formatSoles(i.subtotal)}`
      )
      .join("%0A");

    const msg =
      `*Cotización Remate Market*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*Productos:%0A*${itemsText}%0A` +
      `*Total estimado:* ${formatSoles(cart.totalSoles)}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*Nombre:* ${form.nombre}%0A` +
      `*WhatsApp:* ${form.telefono}%0A` +
      `${form.email ? `*Email:* ${form.email}%0A` : ""}` +
      `*Ciudad:* ${form.ciudad} (${form.tipo})%0A` +
      `*Entrega:* ${form.modo === "recojo" ? "Recojo en almacén Lima" : `Envío · ${form.agencia || "por confirmar"}`}%0A` +
      `${form.notas ? `*Notas:* ${form.notas}` : ""}`;

    window.open(`https://wa.me/51987654321?text=${msg}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="w-full">
      {/* ── Hero compacto ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink pt-[120px] pb-14 text-white md:pt-[140px] md:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-24 -left-16 size-[360px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[400px] rounded-full bg-primary/10 blur-[140px]" />
        </div>
        <div className="container-rm">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="size-3" />
            <span className="text-white/80">Cotizar</span>
          </nav>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            <span className="size-1.5 rounded-full bg-primary" /> Cotización sin costo
          </p>
          <h1 className="mt-4 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Genera tu{" "}
            <span className="bg-gradient-to-r from-primary to-[#E85B10] bg-clip-text text-transparent">
              cotización
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/60">
            Revisa tu carrito, completa tus datos y te enviamos el precio final por WhatsApp en minutos.
          </p>
        </div>
      </section>

      {/* ── Wizard ────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="container-rm">
          <div className="mx-auto max-w-3xl">

            {/* Steps indicator */}
            <div className="mb-10 flex items-center justify-between">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isPast = step > s.id;
                const isCurrent = step === s.id;
                return (
                  <div key={s.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`grid size-10 place-items-center rounded-full transition-all duration-300 ${
                          isPast
                            ? "bg-primary text-white"
                            : isCurrent
                              ? "bg-gradient-to-br from-primary to-[#E85B10] text-white shadow-[0_8px_24px_-4px_rgba(255,107,26,0.5)]"
                              : "bg-soft text-muted-foreground"
                        }`}
                      >
                        {isPast ? <Check className="size-4" /> : <Icon className="size-4" />}
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider ${
                          step >= s.id ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 rounded-full transition-all duration-500 ${
                          step > s.id ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border bg-card p-7 shadow-card md:p-10"
              >
                {/* PASO 1: Carrito ─────────────────────────────────── */}
                {step === 1 && (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <ShoppingCart className="size-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">Tu carrito de cotización</h2>
                        <p className="text-[13px] text-muted-foreground">
                          Revisa los productos antes de continuar
                        </p>
                      </div>
                    </div>

                    {isEmpty ? (
                      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
                        <div className="grid size-16 place-items-center rounded-full bg-soft">
                          <ShoppingCart className="size-7 text-muted-foreground/50" />
                        </div>
                        <div>
                          <h3 className="font-bold">El carrito está vacío</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Explora el catálogo y agrega productos para cotizar.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <CTA href="/categorias" className="!px-5 !py-2.5 !text-[13px]">
                            Ver categorías
                          </CTA>
                          <CTA
                            href="/remate-del-mes"
                            variant="ghost-light"
                            withArrow={false}
                            className="!px-5 !py-2.5 !text-[13px]"
                          >
                            Remate del mes
                          </CTA>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Lista de items */}
                        <ul className="space-y-3">
                          <AnimatePresence>
                            {items.map((item) => (
                              <CartItemRow
                                key={`${item.productoId}-${item.unidad}`}
                                item={item}
                                onIncrease={() =>
                                  updateQuantity(item.productoId, item.unidad, item.cantidad + 1)
                                }
                                onDecrease={() =>
                                  updateQuantity(item.productoId, item.unidad, item.cantidad - 1)
                                }
                                onRemove={() => removeItem(item.productoId, item.unidad)}
                              />
                            ))}
                          </AnimatePresence>
                        </ul>

                        {/* Totales */}
                        <div className="mt-6 rounded-2xl bg-soft p-5">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Productos ({cart.totalItems} unid.)</span>
                            <span>{formatSoles(cart.totalSoles)}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[12px] text-muted-foreground/70">
                            <span>Envío</span>
                            <span>Se cotiza en el paso siguiente</span>
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                            <span className="font-semibold">Total estimado</span>
                            <span className="text-2xl font-black text-primary">
                              {formatSoles(cart.totalSoles)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={clearCart}
                          className="mt-3 text-[12px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                          Vaciar carrito
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* PASO 2: Contacto ────────────────────────────────── */}
                {step === 2 && (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <User className="size-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">¿Cómo te contactamos?</h2>
                        <p className="text-[13px] text-muted-foreground">
                          Te responderemos por WhatsApp en menos de 24h
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <Field label="Nombre completo">
                        <input
                          className="ipt"
                          value={form.nombre}
                          onChange={(e) => set("nombre", e.target.value)}
                          placeholder="Tu nombre y apellido"
                          autoComplete="name"
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="WhatsApp *">
                          <input
                            className="ipt"
                            value={form.telefono}
                            onChange={(e) => set("telefono", e.target.value)}
                            placeholder="+51 9XX XXX XXX"
                            type="tel"
                            autoComplete="tel"
                          />
                        </Field>
                        <Field label="Email (opcional)">
                          <input
                            className="ipt"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="tu@email.com"
                            type="email"
                            autoComplete="email"
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Ciudad">
                          <input
                            className="ipt"
                            value={form.ciudad}
                            onChange={(e) => set("ciudad", e.target.value)}
                            placeholder="Lima, Arequipa, Cusco…"
                            autoComplete="address-level2"
                          />
                        </Field>
                        <Field label="Tipo de comprador">
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {(
                              [
                                { v: "minorista", l: "Minorista" },
                                { v: "mayorista", l: "Mayorista" },
                              ] as const
                            ).map((o) => (
                              <button
                                key={o.v}
                                type="button"
                                onClick={() => set("tipo", o.v)}
                                className={`rounded-xl border py-2.5 text-[13px] font-medium transition-all ${
                                  form.tipo === o.v
                                    ? "border-primary bg-primary/8 text-foreground"
                                    : "border-border text-muted-foreground hover:border-foreground/20"
                                }`}
                              >
                                {o.l}
                              </button>
                            ))}
                          </div>
                        </Field>
                      </div>
                    </div>
                  </div>
                )}

                {/* PASO 3: Entrega ─────────────────────────────────── */}
                {step === 3 && (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Truck className="size-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">¿Cómo prefieres recibirlo?</h2>
                        <p className="text-[13px] text-muted-foreground">
                          El costo de envío se cotiza junto con los productos
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <Field label="Modalidad de entrega">
                        <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {(
                            [
                              {
                                v: "recojo",
                                l: "Recojo en almacén",
                                sub: "Gratis · Lima (dirección por coordinar)",
                              },
                              {
                                v: "envio",
                                l: "Envío a provincias",
                                sub: "Shalom, Olva u otra agencia",
                              },
                            ] as const
                          ).map((o) => (
                            <button
                              key={o.v}
                              type="button"
                              onClick={() => set("modo", o.v)}
                              className={`group flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all ${
                                form.modo === o.v
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-foreground/20"
                              }`}
                            >
                              <div className="flex w-full items-center justify-between">
                                <span className="text-[14px] font-semibold">{o.l}</span>
                                <div
                                  className={`size-4 rounded-full border-2 transition-all ${
                                    form.modo === o.v
                                      ? "border-primary bg-primary"
                                      : "border-muted-foreground/30"
                                  }`}
                                />
                              </div>
                              <span className="text-[12px] text-muted-foreground">{o.sub}</span>
                            </button>
                          ))}
                        </div>
                      </Field>

                      {form.modo === "envio" && (
                        <Field label="Agencia de transporte preferida">
                          <select
                            className="ipt"
                            value={form.agencia}
                            onChange={(e) => set("agencia", e.target.value)}
                          >
                            <option value="">Selecciona una agencia…</option>
                            <option>Shalom</option>
                            <option>Olva Courier</option>
                            <option>Marvisur</option>
                            <option>Cruz del Sur Cargo</option>
                            <option>Otra</option>
                          </select>
                        </Field>
                      )}

                      <Field label="Notas adicionales (opcional)">
                        <textarea
                          className="ipt min-h-24 resize-none"
                          value={form.notas}
                          onChange={(e) => set("notas", e.target.value)}
                          placeholder="Color específico, urgencia, fecha objetivo de entrega…"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {/* PASO 4: Resumen ─────────────────────────────────── */}
                {step === 4 && (
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <MessageCircle className="size-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">Revisa y envía por WhatsApp</h2>
                        <p className="text-[13px] text-muted-foreground">
                          Confirma que todo está correcto antes de enviar
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Productos */}
                      <div className="rounded-2xl border border-border bg-soft p-5">
                        <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                          Productos a cotizar
                        </h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li
                              key={`${item.productoId}-${item.unidad}`}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="font-medium">
                                {item.nombre}{" "}
                                <span className="text-muted-foreground">
                                  ({UNIDAD_LABEL[item.unidad]}) ×{item.cantidad}
                                </span>
                              </span>
                              <span className="font-bold">{formatSoles(item.subtotal)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <span className="text-sm font-semibold">Total estimado</span>
                          <span className="text-lg font-black text-primary">
                            {formatSoles(cart.totalSoles)}
                          </span>
                        </div>
                      </div>

                      {/* Datos de contacto */}
                      <div className="rounded-2xl border border-border bg-soft p-5">
                        <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                          Tus datos
                        </h3>
                        <div className="space-y-1.5 text-sm">
                          <Row k="Nombre" v={form.nombre || "—"} />
                          <Row k="WhatsApp" v={form.telefono || "—"} />
                          {form.email && <Row k="Email" v={form.email} />}
                          <Row k="Ciudad" v={`${form.ciudad || "—"} (${form.tipo})`} />
                          <Row
                            k="Entrega"
                            v={
                              form.modo === "recojo"
                                ? "Recojo en almacén Lima"
                                : `Envío · ${form.agencia || "agencia por confirmar"}`
                            }
                          />
                          {form.notas && <Row k="Notas" v={form.notas} />}
                        </div>
                      </div>

                      <p className="text-[12px] text-muted-foreground">
                        Al hacer clic en "Enviar por WhatsApp" abriremos la app con tu cotización
                        pre-llenada. Solo confirma el mensaje y te respondemos en menos de 24 horas.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navegación del wizard */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button
                      onClick={prev}
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-soft hover:text-foreground"
                    >
                      <ChevronLeft className="size-4" />
                      Atrás
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length ? (
                    step === 1 && isEmpty ? (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide opacity-40 gradient-orange text-white">
                        Continuar <ArrowRight className="size-4" />
                      </span>
                    ) : (
                      <CTA onClick={next} as="button" className="!px-7 !py-3 !text-[13px]">
                        Continuar <ArrowRight className="size-4" />
                      </CTA>
                    )
                  ) : (
                    <motion.button
                      onClick={enviarWhatsApp}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="gradient-orange inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_32px_-8px_rgba(255,107,26,0.55)] transition-shadow hover:shadow-[0_14px_40px_-8px_rgba(255,107,26,0.7)]"
                    >
                      <MessageCircle className="size-5" />
                      Enviar por WhatsApp
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Garantías debajo del wizard */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Sin cobro inmediato", "Respuesta en 24h", "Precio de fábrica"].map((g) => (
                <span
                  key={g}
                  className="flex items-center gap-1.5 text-[12px] text-muted-foreground"
                >
                  <Check className="size-3.5 text-primary" />
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FloatingActions />

      {/* Estilos del input */}
      <style>{`
        .ipt {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.7rem 0.9rem;
          font-size: 14px;
          font-family: inherit;
          color: var(--color-foreground);
          transition: border-color .2s, box-shadow .2s;
        }
        .ipt:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 12%, transparent);
        }
      `}</style>
    </div>
  );
}

// ─── Componente: fila de carrito ──────────────────────────────────────────────
function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 rounded-xl border border-border bg-background p-3"
    >
      {/* Imagen */}
      <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-soft">
        {item.imagen ? (
          <img src={item.imagen} alt={item.nombre} className="size-full object-contain p-1" />
        ) : (
          <Package className="m-auto size-6 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-tight">{item.nombre}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {item.categoriaNombre} · {UNIDAD_LABEL[item.unidad]}
        </p>
        <p className="mt-1 text-[13px] font-bold text-primary">{formatSoles(item.subtotal)}</p>
      </div>

      {/* Controles */}
      <div className="flex flex-col items-end justify-between gap-2">
        <button
          onClick={onRemove}
          className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-soft hover:text-foreground"
          aria-label="Eliminar"
        >
          <Trash2 className="size-3.5" />
        </button>
        <div className="flex items-center gap-1 rounded-full border border-border bg-soft px-1 py-0.5">
          <button onClick={onDecrease} className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-foreground/10" aria-label="Disminuir">
            <Minus className="size-3" />
          </button>
          <span className="min-w-[18px] text-center text-[12px] font-bold">{item.cantidad}</span>
          <button onClick={onIncrease} className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-foreground/10" aria-label="Aumentar">
            <Plus className="size-3" />
          </button>
        </div>
      </div>
    </motion.li>
  );
}

// ─── Helpers de UI ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        {k}
      </span>
      <span className="text-right text-[13px] font-medium text-foreground">{v}</span>
    </div>
  );
}
