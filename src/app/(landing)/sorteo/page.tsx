"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

type SnapState = "idle" | "snapping" | "done";

export default function SorteoPage() {
  const handleMagneticMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", (rx * 100).toFixed(1) + "%");
    el.style.setProperty("--my", (ry * 100).toFixed(1) + "%");
    el.style.setProperty("--mg-x", (-30 + rx * 160).toFixed(1) + "%");
    el.style.setProperty("--mg-y", (-30 + ry * 160).toFixed(1) + "%");
  };

  const handleMagneticLeave = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", "92%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--mg-x", "100%");
    el.style.setProperty("--mg-y", "50%");
  };

  const [step1, setStep1] = useState<SnapState>("idle");
  const [step2, setStep2] = useState<SnapState>("idle");
  const [step3, setStep3] = useState<SnapState>("idle");

  const handleSnap = (_step: number, currentState: SnapState, setter: (s: SnapState) => void) => {
    if (currentState !== "idle") return;
    setter("snapping");
    setTimeout(() => setter("done"), 700);
  };

  return (
    <div className="container-rm pb-[120px] pt-10">

      {/* 1. HERO */}
      <section className="flex flex-col lg:flex-row items-center justify-between mb-20 relative gap-10 lg:gap-0">
        <div className="flex-1 w-full max-w-[550px] relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-bold uppercase tracking-widest text-orange-600">
            <span>✨</span> SORTEO EXCLUSIVO
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold leading-[1.1] m-0 text-ink">
            Participa Gratis y<br/>
            Gana <span style={{ background: "linear-gradient(135deg, #FF9500, #FF2A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Premios ÉPICOS</span>
          </h1>
          <p className="text-[16px] md:text-[17px] text-ink/60 max-w-[450px] my-6 mx-auto lg:mx-0 leading-relaxed">
            Únete al <strong className="text-orange-500 font-semibold">Club Remate</strong>, sigue nuestras redes y participa automáticamente en los próximos sorteos exclusivos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-8">
            <div
              className="magnetic-capsule inline-flex items-center justify-center h-16 px-10 gap-4 cursor-pointer"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <span className="mag-aura"></span>
              <span className="lglow-text text-[16px] font-bold tracking-wide text-white">QUIERO PARTICIPAR →</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex ml-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white -ml-2.5 z-30 flex items-center justify-center text-sm">👩</div>
                <div className="w-9 h-9 rounded-full bg-orange-200 border-2 border-white -ml-2.5 z-20 flex items-center justify-center text-sm">👨</div>
                <div className="w-9 h-9 rounded-full bg-orange-300 border-2 border-white -ml-2.5 z-10 flex items-center justify-center text-sm">👩‍🦱</div>
              </div>
              <div className="text-sm text-ink/60 text-left">
                <strong className="text-orange-500">+3,287</strong> personas ya<br/>participan
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[400px] lg:h-[550px] flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <Image src="/hero-sorteo.png" alt="Premios Épicos" fill className="object-contain z-10 lg:scale-125 lg:translate-x-10" priority />
        </div>
      </section>

      {/* 2. ASÍ DE FÁCIL PARTICIPAS */}
      <section className="mb-[100px]">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-10 flex items-center justify-center lg:justify-start gap-3 text-ink">
          Así de fácil <span className="text-orange-500">participas</span> ✨
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          {[
            { n: 1, emoji: "📸", done: "✓ ¡Instagram seguido!", idle: "Síguenos en Instagram", sub: "@rematemarket", state: step1, set: setStep1 },
            { n: 2, emoji: "🎵", done: "✓ ¡TikTok seguido!", idle: "Síguenos en TikTok", sub: "@rematemarket", state: step2, set: setStep2 },
            { n: 3, emoji: "✉️", done: "✓ ¡Correo registrado!", idle: "Regístrate con tu correo", sub: "y confirma tu participación", state: step3, set: setStep3 },
          ].map((s, idx) => (
            <div key={s.n} className="contents lg:flex lg:flex-row lg:items-center lg:flex-1 lg:gap-4 w-full">
              {idx > 0 && (
                <>
                  <div className="hidden lg:block text-[24px] text-orange-400">→</div>
                  <div className="block lg:hidden text-[24px] text-orange-400">↓</div>
                </>
              )}
              <div
                className={`w-full lg:flex-1 h-[100px] px-6 flex items-center gap-5 cursor-pointer bg-gray-50 border border-orange-200 rounded-2xl relative transition-all hover:border-orange-400 hover:bg-orange-50 ${s.state === "done" ? "border-green-400 bg-green-50" : ""}`}
                onClick={() => handleSnap(s.n, s.state, s.set)}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF2A00] flex items-center justify-center text-xs font-bold absolute -top-3 left-6 text-white border-2 border-white shadow-sm">{s.n}</div>
                <div className="text-[32px]">{s.emoji}</div>
                <div>
                  <div className="text-[16px] font-semibold text-ink">{s.state === "done" ? s.done : s.idle}</div>
                  <div className="text-[13px] text-ink/50">{s.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 text-[14px] text-ink/40">Es 100% gratis y sin costo alguno.</div>
      </section>

      {/* 3. PRÓXIMOS PREMIOS */}
      <section className="mb-[100px]">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-10 flex items-center justify-center lg:justify-start gap-3 text-ink">
          Próximos <span className="text-orange-500">premios</span> ✨
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="hidden lg:flex w-10 h-10 rounded-full border border-orange-200 bg-orange-50 items-center justify-center cursor-pointer text-orange-500 hover:bg-orange-100">‹</div>
          <div className="flex flex-col sm:flex-row gap-6 flex-1 w-full">
            {[
              { src: "/sorteo-prizes/macmini.png", name: "Mac Mini M2", sub: "512GB SSD" },
              { src: "/sorteo-prizes/drone.png", name: "Drone DJI Mini 4", sub: "Vuela como profesional" },
              { src: "/sorteo-prizes/tv-8k.png", name: "Televisor 8K", sub: '75" Ultra HD' },
            ].map((p) => (
              <div key={p.name} className="flex-1 p-8 border border-orange-100 bg-white rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left w-full shadow-sm hover:shadow-md hover:border-orange-300 transition-all">
                <div className="h-[140px] w-full relative mb-6">
                  <Image src={p.src} alt={p.name} fill className="object-contain drop-shadow-[0_10px_20px_rgba(255,106,0,0.15)]" />
                </div>
                <h3 className="text-[18px] font-bold m-0 mb-2 text-ink">{p.name}</h3>
                <p className="text-[14px] text-ink/50 m-0">{p.sub}</p>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex w-10 h-10 rounded-full border border-orange-200 bg-orange-50 items-center justify-center cursor-pointer text-orange-500 hover:bg-orange-100">›</div>
        </div>
      </section>

      {/* 4. BENEFICIOS */}
      <section className="mb-[60px]">
        <h2 className="text-[24px] md:text-[28px] font-bold mb-8 flex items-center justify-center lg:justify-start gap-3 text-ink">
          Beneficios de ser parte del <span className="text-orange-500">Club Remate</span> ✨
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "♡", title: "Sorteos exclusivos", desc: "Participa primero en nuestros sorteos." },
            { icon: "👑", title: "Acceso anticipado", desc: "Recibe ofertas antes que el público general." },
            { icon: "🏷️", title: "Remates especiales", desc: "Accede a liquidaciones de stock premium." },
            { icon: "👥", title: "Comunidad VIP", desc: "Beneficios futuros y sorpresas especiales." },
          ].map((b) => (
            <div key={b.title} className="p-6 flex items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50 hover:bg-orange-100 hover:border-orange-300 transition-all">
              <div className="text-[24px] text-orange-500 flex-shrink-0">{b.icon}</div>
              <div>
                <h4 className="text-[15px] font-bold m-0 mb-1.5 text-ink">{b.title}</h4>
                <p className="text-[13px] text-ink/60 m-0 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COUNTDOWN */}
      <section className="mb-[60px]">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-10 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 gap-8 lg:gap-0">
          <div className="text-center lg:text-left">
            <h2 className="text-[24px] font-bold m-0 mb-2 text-ink">Próximo sorteo</h2>
            <p className="text-[16px] text-ink/50 m-0">30 de Junio 2026</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            {[{ v: "23", l: "Días" }, { v: "14", l: "Horas" }, { v: "36", l: "Min" }, { v: "28", l: "Seg" }].map((x) => (
              <div key={x.l} className="w-full sm:w-[100px] py-4 bg-white border border-orange-200 rounded-xl flex flex-col items-center shadow-sm">
                <span className="text-[32px] md:text-[36px] font-black text-orange-500 leading-none">{x.v}</span>
                <span className="text-xs uppercase tracking-wider text-ink/50 mt-1 font-semibold">{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 rounded-2xl border border-orange-200 bg-ink gap-6 md:gap-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-[40px] drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]">🎁</div>
            <div>
              <h2 className="text-[20px] font-bold m-0 mb-1 text-white">Más sorteos. <span className="text-orange-400">Más premios.</span></h2>
              <p className="text-[14px] text-white/50 m-0">Más razones para estar en Remate Market.</p>
            </div>
          </div>
          <div className="heartbeat-capsule cursor-pointer h-14 px-8 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6A00] to-[#FF2A00] rounded-full w-full md:w-auto">
            <span className="hb-aura"></span>
            <span className="lglow-text text-[16px] font-bold text-white tracking-wide">QUIERO PARTICIPAR AHORA →</span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER LINE */}
      <div className="text-center p-5 rounded-full bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-3 text-[13px] text-ink/40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Tu información está protegida. Nunca compartimos tus datos.
      </div>

    </div>
  );
}
