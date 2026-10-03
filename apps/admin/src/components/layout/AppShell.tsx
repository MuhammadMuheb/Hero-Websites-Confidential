"use client";

import clsx from "clsx";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ToastProvider } from "@/components/ui/Toast";
import type { Role } from "@/lib/types";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export interface ShellUser {
  name: string;
  email: string;
  role: Role;
}

export function AppShell({ children, user }: { children: ReactNode; user: ShellUser }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-canvas">
        {/* Desktop sidebar */}
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-40 hidden transition-[width] duration-200 lg:block",
            collapsed ? "w-sidebar-collapsed" : "w-sidebar",
          )}
        >
          <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <aside className="absolute inset-y-0 left-0 w-sidebar max-w-[85%]">
              <Sidebar collapsed={false} onToggleCollapse={() => undefined} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className={clsx("flex min-h-screen flex-col transition-[padding] duration-200", collapsed ? "lg:pl-sidebar-collapsed" : "lg:pl-sidebar")}>
          <TopBar onOpenMenu={() => setMobileOpen(true)} user={user} />
          <main className="mx-auto w-full max-w-content flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
