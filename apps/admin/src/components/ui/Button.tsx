import clsx from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark border-transparent",
  secondary: "bg-surface text-ink border-line hover:bg-canvas",
  ghost: "bg-transparent text-ink-muted border-transparent hover:bg-canvas hover:text-ink",
  danger: "bg-danger text-white border-transparent hover:opacity-90",
};
const SIZES: Record<Size, string> = { sm: "h-8 px-3 text-[13px]", md: "h-9 px-4 text-sm" };

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function buttonClasses(variant: Variant = "secondary", size: Size = "md", className?: string) {
  return clsx(
    "inline-flex items-center justify-center gap-1.5 rounded-control border font-medium transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant, size, className, children, href }: CommonProps & { href: string }) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
