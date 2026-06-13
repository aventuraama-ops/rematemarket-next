export function SectionTag({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange";
}) {
  const styles = {
    light:
      "bg-primary/10 text-primary border border-primary/20",
    dark: "bg-white/10 text-white border border-white/15",
    orange: "gradient-orange text-white",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles[variant]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
