'use client';

import { useEffect, useRef, useState } from 'react';

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const secondaryButtonClass =
    'flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-line text-sm font-bold text-ink transition-colors hover:bg-paper-tint';
  const primaryButtonClass =
    'flex h-11 w-full items-center justify-center rounded-[6px] bg-accent text-sm font-bold text-white transition-colors hover:bg-accent-hover';

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Account"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="text-ink"
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.1 3.4-6.8 7.5-6.8s7.5 2.7 7.5 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-x-4 top-[73px] z-50 rounded-2xl border border-line bg-white p-4 shadow-[0_16px_48px_rgba(45,51,57,0.18)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-72">
          <p className="text-sm font-bold text-ink">Welcome to Street Food Rome</p>
          <p className="mt-1 text-xs text-faint">Sign in to save tours and book faster.</p>

          <button type="button" className={`mt-4 ${secondaryButtonClass}`}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
            </svg>
            Continue With Google
          </button>

          <button type="button" className={`mt-2 ${secondaryButtonClass}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Continue With Phone
          </button>

          <button type="button" className={`mt-2 ${secondaryButtonClass}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sign In With Email
          </button>

          <button type="button" className={`mt-2 ${primaryButtonClass}`}>
            Create Account
          </button>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-faint">
            Sign-in isn&rsquo;t connected yet — coming soon.
          </p>
        </div>
      ) : null}
    </div>
  );
}
