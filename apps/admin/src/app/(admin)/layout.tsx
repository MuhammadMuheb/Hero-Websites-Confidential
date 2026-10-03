import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return <AppShell user={{ name: user.displayName, email: user.email, role: user.role }}>{children}</AppShell>;
}
