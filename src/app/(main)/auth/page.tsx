"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (val: string) => {
    setPassword(val);
    const hasMinLength = val.length >= 8;
    const hasNumber = /\d/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNoSpaces = !/\s/.test(val);
    const hasNoInvalidChars = !/[\\¡¿"ºª·'´çñÑ]/.test(val);

    if (!hasMinLength || !hasNumber || !hasUpper || !hasLower || !hasNoSpaces || !hasNoInvalidChars) {
      setPasswordError("Mín. 8 caracteres, 1 número, 1 mayúscula, 1 minúscula, sin espacios ni caracteres especiales.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-screen bg-soft flex">
      {/* Mitad Izquierda: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative">
        <Link href="/" className="absolute top-8 left-6 sm:left-12 lg:left-24 text-muted-foreground hover:text-primary flex items-center gap-2 font-bold text-sm transition-colors">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-ink mb-2">Inicia sesión o regístrate para comprar</h1>
            <p className="text-muted-foreground text-sm font-semibold">
              Únete a Club Remate y accede a precios de importación directa.
            </p>
          </div>

          {/* Toggle Login/Registro */}
          <div className="flex p-1 bg-white border border-border rounded-xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={clsx("flex-1 py-2 text-sm font-bold rounded-lg transition-all", isLogin ? "bg-ink text-white shadow-sm" : "text-muted-foreground hover:text-ink")}
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={clsx("flex-1 py-2 text-sm font-bold rounded-lg transition-all", !isLogin ? "bg-ink text-white shadow-sm" : "text-muted-foreground hover:text-ink")}
            >
              Crear Cuenta
            </button>
          </div>

          {/* Formulario */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Nombre</label>
                    <input type="text" className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Tus nombres" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Apellidos</label>
                    <input type="text" className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Tus apellidos" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Doc.</label>
                    <select className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      <option value="DNI">DNI</option>
                      <option value="CE">CE</option>
                      <option value="RUC">RUC</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Número</label>
                    <input type="text" className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="N° de Documento" required />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Correo Electrónico</label>
              <input type="email" className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="tucorreo@ejemplo.com" required />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Celular</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">+51</span>
                  <input type="tel" className="w-full bg-white border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="987 654 321" required />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-ink uppercase tracking-wider mb-1">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                className={clsx(
                  "w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors",
                  passwordError && !isLogin ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                )} 
                placeholder="••••••••" 
                required 
              />
              {!isLogin && passwordError && (
                <p className="text-[10px] text-destructive mt-1 font-semibold">{passwordError}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-3 pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" required />
                    <div className="w-4 h-4 rounded border-2 border-border bg-white peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                    <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-ink transition-colors leading-tight">
                    Acepto los términos y condiciones del <span className="font-bold text-primary">programa de beneficios</span>.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" required />
                    <div className="w-4 h-4 rounded border-2 border-border bg-white peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                    <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-ink transition-colors leading-tight">
                    Acepto los términos y condiciones de la web.
                  </span>
                </label>
              </div>
            )}

            <button type="submit" className="w-full py-4 mt-6 rounded-xl bg-ink text-white font-bold text-sm hover:bg-primary hover:shadow-glow transition-all">
              {isLogin ? "Ingresar a mi cuenta" : "Completar Registro"}
            </button>
          </form>
        </div>
      </div>

      {/* Mitad Derecha: Imagen y Marketing */}
      <div className="hidden lg:flex w-1/2 relative bg-ink items-center justify-center p-12 overflow-hidden">
        {/* Usamos un color/gradiente por ahora como placeholder de la "imagen humanizada" */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-ink opacity-90 z-0"></div>
        
        <div className="relative z-10 max-w-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
            <span className="font-black text-3xl">R</span>
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">Comienza a importar hoy mismo.</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Notificaciones en tiempo real</h4>
                <p className="text-sm text-white/70">Mantente al tanto del estado de tu pedido y envíos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Revisión de boletas</h4>
                <p className="text-sm text-white/70">Accede a tu historial de compras y facturación detallada.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Acceso a sorteos y Club Remate</h4>
                <p className="text-sm text-white/70">Guarda tus direcciones y participa en sorteos exclusivos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
