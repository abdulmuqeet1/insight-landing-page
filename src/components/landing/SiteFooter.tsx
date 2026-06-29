import { BookOpen } from "lucide-react";
import { FooterWordmark } from "./FooterWordmark";

const cols = [
  { title: "Product", links: ["Invoicing", "Payments", "Expenses", "Reports", "Templates"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact", "Security"] },
  { title: "Resources", links: ["Docs", "Guides", "Data migration", "Accountant handoff", "Support"] },
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
              <span className="text-lg font-bold">AutoBooks</span>
            </div>
            <p className="mt-4 text-sm text-shell-foreground/70">
              Simple accounting workflows for growing businesses.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-shell-foreground/70">
              <span className="h-2 w-2 rounded-full bg-shell-accent" />
              Operational
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-shell-foreground/70 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-shell-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} AutoBooks. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">GDPR</a>
          </div>
        </div>

        <FooterWordmark />
      </div>
    </footer>
  );
}
