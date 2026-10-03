"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { login, loginWithGoogle } from "@/app/actions/auth";
import { googleConfigured, googleIdToken } from "@/lib/firebase/client";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const r = await login({ email: String(form.get("email") ?? ""), password: String(form.get("password") ?? "") });
      if (!r.ok) return setError(r.error);
      router.replace("/");
      router.refresh();
    });
  };

  const onGoogle = () => {
    setError(null);
    startTransition(async () => {
      let idToken: string;
      try {
        idToken = await googleIdToken();
      } catch (e) {
        const code = (e as { code?: string })?.code;
        if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
        return setError("Google sign-in could not be started. Please try again.");
      }
      const r = await loginWithGoogle({ idToken });
      if (!r.ok) return setError(r.error);
      router.replace("/");
      router.refresh();
    });
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@isekaidigital.com" />
      </Field>
      <Field label="Password" htmlFor="password">
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      {error && (
        <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
      {googleConfigured() && (
        <>
          <p className="text-center text-[12px] text-ink-muted">or</p>
          <Button type="button" variant="secondary" className="w-full" disabled={pending} onClick={onGoogle}>
            Continue with Google
          </Button>
        </>
      )}
    </form>
  );
}
