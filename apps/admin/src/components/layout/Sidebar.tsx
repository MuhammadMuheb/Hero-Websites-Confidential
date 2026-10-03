"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { MAIN_NAV } from "@/lib/nav";
import { BRAND } from "@/lib/brand";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ collapsed, onToggleCollapse, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-primary-dark text-white">
      <div className={clsx("flex h-topbar shrink-0 items-center border-b border-white/10", collapsed ? "justify-center" : "px-4")}>
        <Link href="/" aria-label={`${BRAND.name} home`} onClick={onNavigate}>
          <Logo collapsed={collapsed} />
        </Link>
      </div>

      <nav aria-label="Main" className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">{BRAND.product}</p>}
        {MAIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={clsx(
                "flex h-10 items-center gap-3 rounded-control px-3 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                active ? "bg-primary text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon name={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-white/10 p-3 lg:block">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-control text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
        >
          <Icon name="chevron" className={collapsed ? "-rotate-90" : "rotate-90"} size={16} />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </div>
  );
}
