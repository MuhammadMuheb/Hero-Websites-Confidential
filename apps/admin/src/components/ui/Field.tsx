import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const CONTROL =
  "w-full rounded-control border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted/70 disabled:bg-canvas";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(CONTROL, "h-9", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(CONTROL, "py-2", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={clsx(CONTROL, "h-9", className)} {...rest}>
      {children}
    </select>
  );
}
