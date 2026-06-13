import { Phone, Mail, MapPin, Music2 } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Facebook = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const quick = [
  { label: "Inicio", href: "/" },
  { label: "Categorías", href: "/categorias" },
  { label: "Campañas", href: "/importa-con-nosotros" },
  { label: "Mayoristas", href: "/importa-con-nosotros" },
  { label: "Preguntas Frecuentes", href: "/ayuda" },
  { label: "Contacto", href: "#contacto" },
];

const cats = [
  { label: "Juguetes", href: "/categorias#juguetes" },
  { label: "Calzados", href: "/categorias#calzados" },
  { label: "Accesorios", href: "/categorias#accesorios" },
  { label: "Muebles Hogar", href: "/categorias#muebles" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Music2, label: "TikTok", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-rm border-t border-white/10 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(logo as any).src || logo}
              alt="Remate Market"
              className="h-10 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">
              Importamos lo que necesitas desde cualquier parte del mundo, con stock real,
              precios de fábrica y entrega inmediata en todo el Perú.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-white/75 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
              Enlaces rápidos
            </p>
            <ul className="mt-5 space-y-3">
              {quick.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/75 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
              Categorías
            </p>
            <ul className="mt-5 space-y-3">
              {cats.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/75 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
              Contacto
            </p>
            <ul className="mt-5 space-y-3 text-[14px] text-white/75">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href="tel:+51987654321" className="hover:text-primary">
                  +51 987 654 321
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href="mailto:hola@rematemarket.com.pe" className="hover:text-primary">
                  hola@rematemarket.com.pe
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                Lima, Perú · Lun a Vie 9:00 — 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] text-white/50 md:flex-row">
          <p>© 2026 Remate Market Importaciones. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white">Términos y condiciones</Link>
            <Link href="#" className="hover:text-white">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
