"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/app/actions/auth";
import { Icon } from "@/components/ui/Icon";
import type { ShellUser } from "./AppShell";

const ROLE_LABEL = { super_admin: "Super Admin", admin: "Admin", contributor: "Contributor" } as const;

function initials(name: string, email: string) {
  const src = (name || email).trim();
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function TopBar({ onOpenMenu, user }: { onOpenMenu: () => void; user: ShellUser }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <header className="sticky top-0 z-30 flex h-topbar shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:gap-3 sm:px-4">
      <button type="button" onClick={onOpenMenu} aria-label="Open navigation" className="shrink-0 rounded-control p-2 text-ink-muted hover:bg-canvas hover:text-ink lg:hidden">
        <Icon name="menu" />
      </button>
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden min-w-0 text-right leading-tight sm:block">
          <p className="max-w-[16rem] truncate text-[13px] font-medium text-ink">{user.name || user.email}</p>
          <p className="max-w-[16rem] truncate text-xs text-ink-muted">
            {ROLE_LABEL[user.role]} &middot; {user.email}
          </p>
        </div>
        <span aria-hidden="true" className="hidden h-8 w-8 place-items-center rounded-full bg-primary-soft text-[13px] font-semibold text-primary sm:grid">
          {initials(user.name, user.email)}
        </span>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await logout();
              router.replace("/login");
              router.refresh();
            })
          }
          className="rounded-control border border-line px-3 py-1.5 text-[13px] font-medium text-ink-muted hover:bg-canvas hover:text-ink disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
