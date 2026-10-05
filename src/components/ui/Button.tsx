import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-dark";

type Props = {
  variant?: Variant;
  href?: string;
  external?: boolean;
  active?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 font-medium text-[15px] leading-none whitespace-nowrap transition-[transform,filter,box-shadow] duration-200 active:translate-y-px cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "text-ink bg-[linear-gradient(180deg,#F2B45A,#D98E2B)] shadow-[inset_0_1px_0_rgba(255,240,210,0.6),inset_0_-2px_0_rgba(42,27,18,0.18),0_6px_16px_rgba(26,15,8,0.18)] hover:brightness-105",
  secondary:
    "text-ink border border-line bg-[linear-gradient(180deg,#EDE6D8,#CFC6B6)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] hover:brightness-[1.03]",
  "ghost-dark":
    "text-cream border border-cream/40 bg-transparent hover:bg-cream/10",
};

export function Button({
  variant = "primary",
  href,
  external,
  active,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {active ? (
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber shadow-[0_0_8px_2px_rgba(242,180,90,0.7)]"
        />
      ) : null}
      {children}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !external;
    if (isInternal) {
      return (
        <Link href={href} className={cls}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
