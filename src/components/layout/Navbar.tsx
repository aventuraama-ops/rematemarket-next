"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";
import { CTA } from "@/components/shared/CTA";
import { SearchDialog } from "@/components/shared/SearchDialog";
import { useCartStore } from "@/providers/store-provider";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.52 3.23-1.46 4.54-1.07 1.48-2.6 2.5-4.32 2.87-1.69.37-3.48.24-5.07-.44-1.57-.66-2.91-1.84-3.76-3.32-.82-1.44-1.15-3.13-.9-4.79.23-1.58 1.01-3.04 2.14-4.13 1.18-1.13 2.75-1.74 4.39-1.82 1.63-.07 3.24.41 4.58 1.34V6.9c-2.31-.54-4.78-.18-6.84 1.06-1.88 1.14-3.3 2.94-3.9 5.02-.59 2.05-.34 4.3.71 6.16.99 1.75 2.55 3.09 4.41 3.82 1.8.72 3.83.84 5.71.36 2-.51 3.69-1.8 4.79-3.51.98-1.53 1.48-3.32 1.48-5.12V0h-4.04z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const links: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Remate del Mes", href: "/remate-del-mes" },
  { label: "Categorías", href: "/categorias" },
  { label: "Importa con Nosotros", href: "/importa-con-nosotros" },
  { label: "Sorteo", href: "/sorteo" },
  { label: "Ayuda", href: "/ayuda" },
  { label: "Nosotros", href: "/nosotros" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Para evitar errores de hidratación, renderizamos el número del carrito solo en el cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const totalItems = useCartStore((state) => state.totalItems);
  const cartCount = mounted ? totalItems : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-foreground/8 bg-soft shadow-sm transition-all duration-300"
      >
        <div className="container-rm flex h-[78px] items-center justify-between gap-6">
          {/* 1. LOGO */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Remate Market">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(logo as any).src || logo}
              alt="Remate Market Importaciones"
              className="h-9 w-auto md:h-10"
              width={180}
              height={56}
            />
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {/* 2. LUPA */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-[13px] min-w-[220px] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Search className="size-4" />
              <span className="flex-1 text-left text-muted-foreground">Buscar productos...</span>
            </button>

            {/* 3-8. LINKS */}
            <nav className="flex items-center gap-6">
              {links.map((l) => {
                const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`text-[13px] transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-ink font-medium hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* 9. REDES SOCIALES (NO WHATSAPP) */}
            <div className="flex items-center gap-1.5 border-l border-border pl-6">
              <a
                href="#"
                className="grid size-8 place-items-center rounded-full bg-foreground/5 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <YoutubeIcon className="size-[18px]" />
              </a>
              <a
                href="#"
                className="grid size-8 place-items-center rounded-full bg-foreground/5 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                href="#"
                className="grid size-8 place-items-center rounded-full bg-foreground/5 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FacebookIcon className="size-[18px]" />
              </a>
              <a
                href="#"
                className="grid size-8 place-items-center rounded-full bg-foreground/5 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <TikTokIcon className="size-[16px]" />
              </a>
            </div>


            {/* 10. CARRITO */}
            <Link
              href="/carrito"
              aria-label="Ver carrito"
              className="relative ml-2 grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-foreground/10 hover:text-primary"
            >
              <ShoppingCart className="size-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 11. COTIZA TU PEDIDO */}
            <CTA href="/cotizar" withArrow={false} className="!ml-1 !px-6 !py-2.5 !text-[13px]">
              Cotiza tu pedido
            </CTA>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-foreground/20 xl:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-ink text-white"
            >
              <div className="flex items-center justify-between px-6 py-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(logo as any).src || logo}
                  alt="Remate Market"
                  className="h-8 w-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-11 place-items-center rounded-full border border-white/15"
                  aria-label="Cerrar menú"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 px-6 pb-4">
                {/* Redes sociales en menú mobile */}
                <div className="flex items-center gap-3 border-r border-white/15 pr-4">
                  <a href="#" className="text-white/60 hover:text-white"><YoutubeIcon className="size-5" /></a>
                  <a href="#" className="text-white/60 hover:text-white"><InstagramIcon className="size-5" /></a>
                  <a href="#" className="text-white/60 hover:text-white"><FacebookIcon className="size-5" /></a>
                  <a href="#" className="text-white/60 hover:text-white"><TikTokIcon className="size-4.5" /></a>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="grid size-11 place-items-center rounded-full border border-white/15"
                  aria-label="Buscar"
                >
                  <Search className="size-[18px]" />
                </button>
                <Link
                  href="/carrito"
                  onClick={() => setOpen(false)}
                  className="relative grid size-11 place-items-center rounded-full border border-white/15"
                  aria-label="Ver carrito"
                >
                  <ShoppingCart className="size-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              <nav className="flex-1 px-6 pt-2">
                <ul className="space-y-1">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-white/5 py-4 text-2xl font-bold tracking-tight"
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-6">
                <CTA href="/cotizar" className="w-full" onClick={() => setOpen(false)}>
                  Cotiza tu pedido
                </CTA>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
