import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "ghost-dark" | "ghost-light" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold tracking-wide transition-all duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "gradient-orange text-white shadow-glow hover:shadow-[0_18px_44px_-10px_rgba(255,107,26,0.65)]",
  "ghost-dark":
    "border border-white/15 text-white hover:bg-white/10",
  "ghost-light":
    "border border-foreground/15 text-foreground hover:bg-foreground/5",
  outline:
    "border border-primary/40 text-primary hover:bg-primary/10",
};

// Create a motion component for Link
const MotionLink = motion.create(Link);

export const CTA = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  {
    children: ReactNode;
    variant?: Variant;
    withArrow?: boolean;
    href?: string;
  } & Omit<ComponentProps<typeof motion.button>, "children" | "href"> &
    Omit<ComponentProps<typeof MotionLink>, "children" | "href">
>(function CTA({ children, variant = "primary", withArrow = true, className, href, ...rest }, ref) {
  const content = (
    <>
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 320, damping: 22 },
    className: `${base} ${variants[variant]} ${className ?? ""}`,
  };

  if (href) {
    return (
      <MotionLink href={href} ref={ref as React.Ref<HTMLAnchorElement>} {...motionProps} {...(rest as any)}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} {...motionProps} {...(rest as any)}>
      {content}
    </motion.button>
  );
});
