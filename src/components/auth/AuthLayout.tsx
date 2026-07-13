import { BookOpen, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const highlights = [
  { icon: Zap, text: "Invoices, expenses and reports in one clean workspace" },
  { icon: Sparkles, text: "AI that drafts documents and chases payments for you" },
  { icon: ShieldCheck, text: "Bank-grade security with a 14-day free trial" },
];

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-shell p-10 text-shell-foreground lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 20% 10%, color-mix(in oklab, var(--shell-accent) 45%, transparent) 0%, transparent 60%), radial-gradient(50% 40% at 90% 90%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 55%)",
          }}
        />
        <Link to="/" className="relative flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">AutoBooks</span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-extrabold leading-tight">
            Bring your business finances into one clean workspace.
          </h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  <h.icon className="h-4 w-4 text-shell-accent" />
                </span>
                <span className="text-sm text-shell-foreground/85">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-shell-muted">
          &copy; {new Date().getFullYear()} AutoBooks. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col justify-center px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <Link
            to="/"
            className="mb-8 flex items-center gap-2 lg:hidden"
            aria-label="AutoBooks home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight">AutoBooks</span>
          </Link>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}