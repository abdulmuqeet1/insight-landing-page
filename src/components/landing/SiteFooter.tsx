import { BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FooterWordmark } from "./FooterWordmark";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Invoicing & Quotes", href: "/#features" },
      { label: "Bills & Expenses", href: "/#features" },
      { label: "General Ledger", href: "/#features" },
      { label: "Bank Reconciliation", href: "/#features" },
      { label: "Financial Reports", href: "/#features" },
      { label: "PDF Template Editor", href: "/#features" },
      { label: "AI Assistant", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Blog & Updates", to: "/blog" },
      { label: "Security & Compliance", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "mailto:support@wizeaccounts.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation & Guides", href: "#" },
      { label: "Migration from QuickBooks", href: "#" },
      { label: "Migration from Xero", href: "#" },
      { label: "Accountant Handoff Guide", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-shell px-8 py-14 text-shell-foreground">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold">Wize Accounts</span>
            </div>
            <p className="mt-4 text-sm text-shell-foreground/80 leading-relaxed">
              The modern, intelligent accounting workspace built for ambitious businesses.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-shell-foreground/90 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase text-xs">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {"to" in l && l.to ? (
                      <Link
                        to={l.to}
                        className="text-xs sm:text-sm text-shell-foreground/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={"href" in l ? l.href : "#"}
                        className="text-xs sm:text-sm text-shell-foreground/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-shell-foreground/60 sm:flex-row">
          <p>© 2026 Wize Accounts Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">
              GDPR Compliance
            </a>
          </div>
        </div>

        <FooterWordmark />
      </div>
    </footer>
  );
}
