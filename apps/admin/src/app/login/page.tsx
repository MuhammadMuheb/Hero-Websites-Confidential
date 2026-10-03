import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/LoginForm";
import { getSessionUser } from "@/lib/auth/session";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/");

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-primary-dark p-12 text-white lg:flex">
        <Logo />
        <div>
          <h1 className="max-w-md text-[32px] font-semibold leading-10 tracking-tight">{BRAND.tagline}.</h1>
          <p className="mt-3 max-w-md text-white/70">Manage your websites and the people who can access them.</p>
        </div>
        <p className="text-[13px] text-white/50">
          &copy; {new Date().getFullYear()} {BRAND.name}
        </p>
      </section>

      <section className="flex items-center justify-center bg-canvas px-4 py-12">
        <div className="w-full max-w-sm">
          <Logo tone="dark" className="mb-8 lg:hidden" />
          <h2 className="text-[24px] font-semibold tracking-tight">Sign in</h2>
          <p className="mt-1 text-ink-muted">Invite-only access. There is no public registration.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
