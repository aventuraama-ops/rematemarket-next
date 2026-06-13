"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

type SnapState = "idle" | "snapping" | "done";

export default function SorteoPage() {
  // --- MAGNETIC CAPSULE LOGIC ---
  const handleMagneticMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    
    // Core conic-gradient center
    const mx = (rx * 100).toFixed(1) + '%';
    const my = (ry * 100).toFixed(1) + '%';
    el.style.setProperty('--mx', mx);
    el.style.setProperty('--my', my);
    
    // Aura position (mapped to be slightly outside)
    const ax = (-30 + rx * 160).toFixed(1) + '%';
    const ay = (-30 + ry * 160).toFixed(1) + '%';
    el.style.setProperty('--mg-x', ax);
    el.style.setProperty('--mg-y', ay);
  };

  const handleMagneticLeave = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--mx', '92%');
    el.style.setProperty('--my', '50%');
    el.style.setProperty('--mg-x', '100%');
    el.style.setProperty('--mg-y', '50%');
  };

  // --- SNAP FLASH CAPSULE LOGIC ---
  const [step1, setStep1] = useState<SnapState>("idle");
  const [step2, setStep2] = useState<SnapState>("idle");
  const [step3, setStep3] = useState<SnapState>("idle");

  const handleSnap = (step: number, currentState: SnapState, setter: (state: SnapState) => void) => {
    if (currentState !== "idle") return;
    
    setter("snapping");
    setTimeout(() => {
      setter("done");
    }, 700);
  };

  return (
    <div className="container-rm pb-[120px] pt-10">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between mb-20 relative gap-10 lg:gap-0">
        {/* Left Content */}
        <div className="flex-1 w-full max-w-[550px] relative z-10 text-center lg:text-left">
          <div className="micro-capsule inline-flex items-center gap-2 px-4 py-1.5 mb-6">
            <span style={{ color: "var(--orange-01)" }}>✨</span> SORTEO EXCLUSIVO
          </div>
          <h1 className="ds-hero-title text-[40px] md:text-[52px] leading-[1.1] m-0">
            Participa Gratis y<br/>
            Gana <span style={{ color: "var(--orange-03)", background: "-webkit-linear-gradient(0deg, #FF9500, #FF2A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Premios ÉPICOS</span>
          </h1>
          <p className="ds-hero-sub text-[16px] md:text-[17px] text-white/70 max-w-[450px] my-6 mx-auto lg:mx-0">
            Únete al <strong style={{ color: "var(--orange-02)", fontWeight: 600 }}>Club Remate</strong>, sigue nuestras redes y participa automáticamente en los próximos sorteos exclusivos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-8">
            {/* Magnetic CTA */}
            <div 
              className="magnetic-capsule inline-flex items-center justify-center h-16 px-10 gap-4 cursor-pointer" 
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <span className="mag-aura"></span>
              <span className="lglow-text text-[16px] font-bold tracking-wide">QUIERO PARTICIPAR →</span>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex ml-2.5">
                <div className="w-9 h-9 rounded-full bg-[#444] border-2 border-black -ml-2.5 z-30 flex items-center justify-center text-sm">👩</div>
                <div className="w-9 h-9 rounded-full bg-[#555] border-2 border-black -ml-2.5 z-20 flex items-center justify-center text-sm">👨</div>
                <div className="w-9 h-9 rounded-full bg-[#666] border-2 border-black -ml-2.5 z-10 flex items-center justify-center text-sm">👩‍🦱</div>
              </div>
              <div className="text-sm text-white/60 text-left">
                <strong style={{ color: "var(--orange-03)" }}>+3,287</strong> personas ya<br/>participan
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="flex-1 w-full relative h-[400px] lg:h-[550px] flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          <div className="ds-hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] opacity-80"></div>
          <Image 
            src="/hero-sorteo.png" 
            alt="Premios Épicos" 
            fill
            className="object-contain z-10 lg:scale-125 lg:translate-x-10"
            priority
          />
        </div>
      </section>

      {/* 2. ASI DE FACIL PARTICIPAS */}
      <section className="mb-[100px]">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-10 flex items-center justify-center lg:justify-start gap-3">
          Así de fácil <span style={{ color: "var(--orange-03)" }}>participas</span> ✨
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          
          {/* Step 1 */}
          <div 
            className={`snap-capsule w-full lg:flex-1 h-[100px] px-6 flex items-center gap-5 cursor-pointer bg-white/5 border border-[#FF6A00]/30 relative ${step1 === "snapping" ? "snapping" : ""} ${step1 === "done" ? "snap-done" : ""}`} 
            onClick={() => handleSnap(1, step1, setStep1)}
            style={{ cursor: step1 === "idle" ? "pointer" : "default" }}
          >
            <span className="snap-aura"></span>
            <span className="snap-flash"></span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF2A00] flex items-center justify-center text-xs font-bold absolute -top-3 left-6 border-2 border-black">1</div>
            <div className="text-[32px]" style={{ color: "var(--orange-01)" }}>📸</div>
            <div className="relative z-10">
              <div className="lglow-text text-[16px] font-semibold text-white">
                {step1 === "done" ? "✓ ¡Instagram seguido!" : "Síguenos en Instagram"}
              </div>
              <div className="text-[13px] text-white/50">@rematemarket</div>
            </div>
          </div>

          <div className="hidden lg:block text-[24px]" style={{ color: "var(--orange-04)" }}>→</div>
          <div className="block lg:hidden text-[24px]" style={{ color: "var(--orange-04)" }}>↓</div>

          {/* Step 2 */}
          <div 
            className={`snap-capsule w-full lg:flex-1 h-[100px] px-6 flex items-center gap-5 cursor-pointer bg-white/5 border border-[#FF6A00]/30 relative ${step2 === "snapping" ? "snapping" : ""} ${step2 === "done" ? "snap-done" : ""}`} 
            onClick={() => handleSnap(2, step2, setStep2)}
            style={{ cursor: step2 === "idle" ? "pointer" : "default" }}
          >
            <span className="snap-aura"></span>
            <span className="snap-flash"></span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF2A00] flex items-center justify-center text-xs font-bold absolute -top-3 left-6 border-2 border-black">2</div>
            <div className="text-[32px]" style={{ color: "var(--orange-01)" }}>🎵</div>
            <div className="relative z-10">
              <div className="lglow-text text-[16px] font-semibold text-white">
                {step2 === "done" ? "✓ ¡TikTok seguido!" : "Síguenos en TikTok"}
              </div>
              <div className="text-[13px] text-white/50">@rematemarket</div>
            </div>
          </div>

          <div className="hidden lg:block text-[24px]" style={{ color: "var(--orange-04)" }}>→</div>
          <div className="block lg:hidden text-[24px]" style={{ color: "var(--orange-04)" }}>↓</div>

          {/* Step 3 */}
          <div 
            className={`snap-capsule w-full lg:flex-1 h-[100px] px-6 flex items-center gap-5 cursor-pointer bg-white/5 border border-[#FF6A00]/30 relative ${step3 === "snapping" ? "snapping" : ""} ${step3 === "done" ? "snap-done" : ""}`} 
            onClick={() => handleSnap(3, step3, setStep3)}
            style={{ cursor: step3 === "idle" ? "pointer" : "default" }}
          >
            <span className="snap-aura"></span>
            <span className="snap-flash"></span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF2A00] flex items-center justify-center text-xs font-bold absolute -top-3 left-6 border-2 border-black">3</div>
            <div className="text-[32px]" style={{ color: "var(--orange-01)" }}>✉️</div>
            <div className="relative z-10">
              <div className="lglow-text text-[16px] font-semibold text-white">
                {step3 === "done" ? "✓ ¡Correo registrado!" : "Regístrate con tu correo"}
              </div>
              <div className="text-[13px] text-white/50">y confirma tu participación</div>
            </div>
          </div>

        </div>
        <div className="text-center mt-6 text-[14px] text-white/50">
          Es 100% gratis y sin costo alguno.
        </div>
      </section>

      {/* 3. PROXIMOS PREMIOS */}
      <section className="mb-[100px]">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-10 flex items-center justify-center lg:justify-start gap-3">
          Próximos <span style={{ color: "var(--orange-03)" }}>premios</span> ✨
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="hidden lg:flex w-10 h-10 rounded-full border border-[#FF6A00]/50 items-center justify-center cursor-pointer text-[#FF9500]">‹</div>
          
          <div className="flex flex-col sm:flex-row gap-6 flex-1 w-full">
            {/* Prize 1 */}
            <div className="surface-b reflection-top flex-1 p-8 border border-[#FF6A00]/20 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left w-full">
              <div className="h-[140px] w-full relative mb-6">
                <Image 
                  src="/sorteo-prizes/macmini.png" 
                  alt="Mac Mini M2" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_30px_rgba(255,106,0,0.2)]" 
                />
              </div>
              <h3 className="text-[18px] font-bold m-0 mb-2">Mac Mini M2</h3>
              <p className="text-[14px] text-white/50 m-0">512GB SSD</p>
            </div>
            
            {/* Prize 2 */}
            <div className="surface-b reflection-top flex-1 p-8 border border-[#FF6A00]/20 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left w-full">
              <div className="h-[140px] w-full relative mb-6">
                <Image 
                  src="/sorteo-prizes/drone.png" 
                  alt="Drone DJI Mini 4" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_30px_rgba(255,106,0,0.2)]" 
                />
              </div>
              <h3 className="text-[18px] font-bold m-0 mb-2">Drone DJI Mini 4</h3>
              <p className="text-[14px] text-white/50 m-0">Vuela como profesional</p>
            </div>

            {/* Prize 3 */}
            <div className="surface-b reflection-top flex-1 p-8 border border-[#FF6A00]/20 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left w-full">
              <div className="h-[140px] w-full relative mb-6">
                <Image 
                  src="/sorteo-prizes/tv-8k.png" 
                  alt="Televisor 8K" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_30px_rgba(255,106,0,0.2)]" 
                />
              </div>
              <h3 className="text-[18px] font-bold m-0 mb-2">Televisor 8K</h3>
              <p className="text-[14px] text-white/50 m-0">75" Ultra HD</p>
            </div>
          </div>
          
          <div className="hidden lg:flex w-10 h-10 rounded-full border border-[#FF6A00]/50 items-center justify-center cursor-pointer text-[#FF9500]">›</div>
        </div>
      </section>

      {/* 4. BENEFICIOS */}
      <section className="mb-[60px]">
        <h2 className="text-[24px] md:text-[28px] font-bold mb-8 flex items-center justify-center lg:justify-start gap-3">
          Beneficios de ser parte del <span style={{ color: "var(--orange-03)" }}>Club Remate</span> ✨
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="surface-a reflection-top p-6 flex items-start gap-4 rounded-2xl border border-white/5">
            <div className="text-[24px]" style={{ color: "var(--orange-03)" }}>♡</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 mb-1.5 text-white">Sorteos exclusivos</h4>
              <p className="text-[13px] text-white/50 m-0 leading-snug">Participa primero en nuestros sorteos.</p>
            </div>
          </div>
          
          <div className="surface-a reflection-top p-6 flex items-start gap-4 rounded-2xl border border-white/5">
            <div className="text-[24px]" style={{ color: "var(--orange-03)" }}>👑</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 mb-1.5 text-white">Acceso anticipado</h4>
              <p className="text-[13px] text-white/50 m-0 leading-snug">Recibe ofertas antes que el público general.</p>
            </div>
          </div>
          
          <div className="surface-a reflection-top p-6 flex items-start gap-4 rounded-2xl border border-white/5">
            <div className="text-[24px]" style={{ color: "var(--orange-03)" }}>🏷️</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 mb-1.5 text-white">Remates especiales</h4>
              <p className="text-[13px] text-white/50 m-0 leading-snug">Accede a liquidaciones de stock premium.</p>
            </div>
          </div>
          
          <div className="surface-a reflection-top p-6 flex items-start gap-4 rounded-2xl border border-white/5">
            <div className="text-[24px]" style={{ color: "var(--orange-03)" }}>👥</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 mb-1.5 text-white">Comunidad VIP</h4>
              <p className="text-[13px] text-white/50 m-0 leading-snug">Beneficios futuros y sorpresas especiales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROXIMO SORTEO (COUNTDOWN) */}
      <section className="mb-[60px]">
        <div className="surface-b reflection-top flex flex-col lg:flex-row items-center justify-between p-8 md:p-10 rounded-2xl border border-[#FF6A00]/30 gap-8 lg:gap-0">
          <div className="text-center lg:text-left">
            <h2 className="text-[24px] font-bold m-0 mb-2">Próximo sorteo</h2>
            <p className="text-[16px] text-white/50 m-0">30 de Junio 2025</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="counter-capsule w-full sm:w-[100px] py-4 bg-white/5 rounded-xl flex flex-col items-center">
              <span className="counter-value text-[32px] md:text-[36px]" style={{ color: "var(--orange-01)" }}>23</span>
              <span className="counter-label text-xs uppercase tracking-wider text-white/50">Días</span>
            </div>
            <div className="counter-capsule w-full sm:w-[100px] py-4 bg-white/5 rounded-xl flex flex-col items-center">
              <span className="counter-value text-[32px] md:text-[36px]" style={{ color: "var(--orange-01)" }}>14</span>
              <span className="counter-label text-xs uppercase tracking-wider text-white/50">Horas</span>
            </div>
            <div className="counter-capsule w-full sm:w-[100px] py-4 bg-white/5 rounded-xl flex flex-col items-center">
              <span className="counter-value text-[32px] md:text-[36px]" style={{ color: "var(--orange-01)" }}>36</span>
              <span className="counter-label text-xs uppercase tracking-wider text-white/50">Min</span>
            </div>
            <div className="counter-capsule w-full sm:w-[100px] py-4 bg-white/5 rounded-xl flex flex-col items-center">
              <span className="counter-value text-[32px] md:text-[36px]" style={{ color: "var(--orange-01)" }}>28</span>
              <span className="counter-label text-xs uppercase tracking-wider text-white/50">Seg</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA WITH HEARTBEAT */}
      <section className="mb-10">
        <div className="surface-a reflection-top flex flex-col md:flex-row items-center justify-between p-8 md:p-10 rounded-2xl border border-[#FF6A00]/30 gap-6 md:gap-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-[40px] drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]">🎁</div>
            <div>
              <h2 className="text-[20px] font-bold m-0 mb-1">Más sorteos. <span style={{ color: "var(--orange-03)" }}>Más premios.</span></h2>
              <p className="text-[14px] text-white/50 m-0">Más razones para estar en Remate Market.</p>
            </div>
          </div>
          
          {/* Heartbeat Capsule */}
          <div className="heartbeat-capsule cursor-pointer h-14 px-8 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6A00] to-[#FF2A00] rounded-full border-none w-full md:w-auto">
            <span className="hb-aura"></span>
            <span className="lglow-text text-[16px] font-bold text-white tracking-wide">QUIERO PARTICIPAR AHORA →</span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER LINE */}
      <div className="text-center p-5 rounded-full bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 text-[13px] text-white/40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Tu información está protegida. Nunca compartimos tus datos.
      </div>

    </div>
  );
}
