import clsx from "clsx";
import { BRAND } from "@/lib/brand";

interface LogoProps {
  collapsed?: boolean;
  tone?: "light" | "dark";
  className?: string;
}

/** Text-based brand mark. Swap for an <Image> once the final logo asset exists. */
export function Logo({ collapsed = false, tone = "light", className }: LogoProps) {
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-control bg-gold text-[15px] font-bold text-primary-dark"
      >
        i
      </span>
      {!collapsed && (
        <span className={clsx("text-[17px] font-semibold tracking-tight", tone === "light" ? "text-white" : "text-primary-dark")}>
          {BRAND.name}
        </span>
      )}
    </span>
  );
}
