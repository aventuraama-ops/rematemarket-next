"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";


const WHATSAPP_URL = "https://wa.me/51987654321";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.71A12.96 12.96 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16.003 3Zm0 23.6c-1.99 0-3.94-.54-5.64-1.55l-.4-.24-3.97 1.01 1.06-3.87-.26-.41A10.55 10.55 0 0 1 5.4 16c0-5.85 4.76-10.6 10.6-10.6S26.6 10.15 26.6 16s-4.76 10.6-10.6 10.6Zm5.83-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-.99 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.77-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.6-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61 0 1.54 1.12 3.03 1.28 3.24.16.21 2.21 3.38 5.36 4.74.75.32 1.34.52 1.79.66.75.24 1.43.21 1.97.13.6-.09 1.88-.77 2.14-1.51.26-.74.26-1.37.18-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="top"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver al inicio"
            className="grid size-[52px] place-items-center rounded-full border border-foreground/10 bg-white text-foreground shadow-[0_10px_24px_-10px_rgba(0,0,0,0.25)] transition-colors hover:bg-foreground/5"
          >
            <ArrowUp className="size-5" strokeWidth={2.4} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="grid size-14 place-items-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)]"
        style={{ backgroundColor: "#25D366" }}
      >
        <WhatsAppIcon className="size-7" />
      </motion.a>
    </div>
  );
}
