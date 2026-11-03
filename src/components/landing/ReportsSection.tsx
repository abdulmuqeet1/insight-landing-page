import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  FileWarning,
  PieChart,
  Banknote,
  FileText,
  Clock,
  Landmark,
  Scale,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  {
    icon: TrendingUp,
    label: "Revenue Trends",
    value: "+24.8% YoY",
    desc: "Track revenue growth over time, categorized by product line, service tier, or business location.",
  },
  {
    icon: FileWarning,
    label: "Outstanding Invoices (AR Aging)",
    value: "1–90+ Days",
    desc: "View unpaid invoices segmented by 1–30, 31–60, 61–90, and 90+ days overdue for proactive debt recovery.",
  },
  {
    icon: PieChart,
    label: "Expense Categorization",
    value: "COA Grouped",
    desc: "Breakdown of operating expenses by chart of accounts categories to spot budget creep immediately.",
  },
  {
    icon: Banknote,
    label: "Recent Payments & Cash Application",
    value: "Auto-Allocated",
    desc: "Real-time ledger of inbound customer collections and outbound vendor disbursements.",
  },
  {
    icon: FileText,
    label: "Customer Statements",
    value: "Balance Forward",
    desc: "Professional balance-forward and open-item statements ready to send directly to your clients.",
  },
  {
    icon: Clock,
    label: "Vendor Payables (AP Aging)",
    value: "Net Terms",
    desc: "Monitor upcoming supplier bills and cash liabilities to optimize payment cycles and vendor terms.",
  },
  {
    icon: Landmark,
    label: "Tax Summary & Regional Compliance",
    value: "Tax-Ready",
    desc: "Automated sales tax, VAT, and regional compliance reporting (including GCC VAT and regional tax schedules).",
  },
  {
    icon: Scale,
    label: "Executive Balance Sheet & P&L",
    value: "Balanced Dr = Cr",
    desc: "True double-entry financial statements showing your business's true net worth, assets, and retained earnings.",
  },
];

export function ReportsSection() {
  const [selected, setSelected] = useState<number | null>(0);
  const active = selected !== null ? reports[selected] : null;
  const ActiveIcon = active?.icon;

  return (
    <section className="bg-secondary/40 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          ACCOUNTING INTELLIGENCE
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Complete financial truth. Always in balance, always up to date.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Click any report to explore. Every metric is pulled dynamically from strict debit and
          credit journal lines, giving you institutional accuracy on demand.
        </p>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-[520px] place-items-center [aspect-ratio:1]">
        <div className="relative h-full w-full">
          {/* orbit rings */}
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-border/70" />
          <div className="pointer-events-none absolute inset-[24%] rounded-full border border-border/50" />

          {/* rotating ring of report icons */}
          <div
            className={cn(
              "group/orbit absolute inset-0 animate-[orbit-spin_50s_linear_infinite] hover:[animation-play-state:paused]",
              selected !== null && "[animation-play-state:paused]",
            )}
          >
            {reports.map((r, i) => {
              const Icon = r.icon;
              const angle = (i / reports.length) * Math.PI * 2 - Math.PI / 2;
              const R = 46;
              const x = 50 + R * Math.cos(angle);
              const y = 50 + R * Math.sin(angle);
              const dimmed = selected !== null && selected !== i;
              return (
                <div
                  key={r.label}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <button
                    onClick={() => setSelected(i)}
                    aria-label={r.label}
                    title={r.label}
                    className={cn(
                      "group grid h-14 w-14 place-items-center soul-card !rounded-2xl text-accent transition-all duration-500",
                      "animate-[orbit-spin-rev_50s_linear_infinite] group-hover/orbit:[animation-play-state:paused] hover:scale-110 hover:text-primary",
                      selected !== null && "[animation-play-state:paused]",
                      dimmed ? "scale-80 opacity-40 blur-[0.5px]" : "opacity-100",
                      selected === i && "scale-110 text-primary ring-2 ring-primary/40 shadow-xl",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* center detail card */}
          <AnimatePresence>
            {active && ActiveIcon && (
              <motion.div
                key={active.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 z-10 grid aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 place-content-center soul-card p-6 text-center shadow-2xl shadow-shell/25"
              >
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <ActiveIcon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-primary">
                  {active.value}
                </p>
                <h3 className="mt-1 text-sm font-bold text-foreground">{active.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{active.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* idle center hint */}
          {!active && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-dashed border-border text-center">
              <span className="px-2 text-[11px] font-medium text-muted-foreground">
                Tap any report
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
