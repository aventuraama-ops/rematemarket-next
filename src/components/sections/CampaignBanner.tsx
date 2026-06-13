"use client";

import Image from "next/image";
import campaignImg from "@/assets/campaign-container.jpg";
import { SectionTag } from "@/components/shared/SectionTag";
import { CTA } from "@/components/shared/CTA";
import { Reveal } from "@/components/shared/Reveal";

export function CampaignBanner() {
  return (
    <section id="campanas" className="bg-background py-20 lg:py-28">
      <div className="container-rm">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] bg-ink p-8 text-white shadow-lift md:p-14 lg:p-16">
            <div className="absolute inset-0 -z-10">
              <Image
                src={campaignImg}
                alt="Contenedor de campaña de importación"
                className="size-full object-cover opacity-40"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
              <div className="absolute -bottom-32 -right-20 size-[420px] rounded-full bg-primary/30 blur-[140px]" />
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionTag variant="orange">Campañas de importación</SectionTag>
                <h2 className="mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
                  ¿Quieres comprar a{" "}
                  <span className="text-gradient-orange">precio de fábrica</span> antes de que
                  llegue al país?
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-base">
                  Únete a nuestras Campañas de importación de Club Remate. Nosotros seleccionamos un producto
                  ganador de alta demanda, tú reservas tu cupo en nuestro contenedor y aseguras
                  el precio más bajo del mercado.
                </p>
              </div>

              <div className="flex lg:col-span-4 lg:justify-end">
                <CTA href="/importa-con-nosotros">Separar mi cupo</CTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
