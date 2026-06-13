import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionTag } from "@/components/shared/SectionTag";
import { Reveal } from "@/components/shared/Reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  highlight?: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[120px] pb-20 text-white md:pt-[160px] md:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -top-32 -left-24 size-[420px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -bottom-32 -right-24 size-[460px] rounded-full bg-primary/15 blur-[160px]" />
      </div>

      <div className="container-rm">
        {crumbs?.length ? (
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-white/55"
            >
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <ChevronRight className="size-3" />
                  ) : null}
                </span>
              ))}
            </nav>
          </Reveal>
        ) : null}

        <Reveal>
          <SectionTag variant="dark">{eyebrow}</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-gradient-orange">{highlight}</span>
              </>
            ) : null}
          </h1>
        </Reveal>

        {description ? (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-balance text-base text-white/65 md:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}

        {children ? (
          <Reveal delay={0.22}>
            <div className="mt-10">{children}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
