import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, FileWarning, PieChart, Banknote,
  UserCheck, Truck, Landmark, LayoutGrid, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  { icon: TrendingUp, label: "Revenue trend", value: "+18.4%", desc: "Month-over-month revenue growth across all customers, with a clear view of seasonal peaks and dips." },
  { icon: FileWarning, label: "Outstanding invoices", value: "$12,480", desc: "Track everything sent but unpaid, grouped by how overdue each invoice is so you can follow up first." },
  { icon: PieChart, label: "Expense categories", value: "9 groups", desc: "See where money goes by category, from software to vendor bills, in one breakdown." },
  { icon: Banknote, label: "Recent payments", value: "$8,210", desc: "A live feed of money received, matched automatically to the right customer and invoice." },
  { icon: UserCheck, label: "Customer activity", value: "142 active", desc: "Understand which customers drive revenue and which have gone quiet over time." },
  { icon: Truck, label: "Vendor activity", value: "37 vendors", desc: "Review purchase history and bills per vendor to keep spending under control." },
  { icon: Landmark, label: "Tax summary", value: "Q ready", desc: "A clean, exportable summary that keeps you ready for tax review and accountant handoff." },
  { icon: LayoutGrid, label: "Business overview", value: "All-in-one", desc: "The complete financial snapshot of your business, updated as records change." },
];

export function ReportsSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? reports[selected] : null;
  const ActiveIcon = active?.icon;

  return (
    <section className="bg-secondary/40 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Reports
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          See what is paid, pending, and costing you money
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Tap any report to bring it into focus. Wize Accounts gives small teams a
          clear view of revenue, expenses, customers, invoices, and payments.
        </p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-[480px] place-items-center [aspect-ratio:1]">
        <div className="relative h-full w-full">
          {/* orbit rings */}
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-border/70" />
          <div className="pointer-events-none absolute inset-[24%] rounded-full border border-border/50" />

          {/* rotating ring of report icons */}
          <div
            className={cn(
              "group/orbit absolute inset-0 animate-[orbit-spin_46s_linear_infinite] hover:[animation-play-state:paused]",
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
                    className={cn(
                      "group grid h-14 w-14 place-items-center soul-card !rounded-2xl text-accent transition-all duration-500",
                      "animate-[orbit-spin-rev_46s_linear_infinite] group-hover/orbit:[animation-play-state:paused] hover:scale-110 hover:text-primary",
                      selected !== null && "[animation-play-state:paused]",
                      dimmed ? "scale-75 opacity-30 blur-[1px]" : "opacity-100",
                      selected === i && "scale-110 text-primary ring-2 ring-primary/40",
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
                key="detail"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 z-10 grid aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 place-content-center soul-card p-5 text-center shadow-2xl shadow-shell/20"
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
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-primary">{active.value}</p>
                <h3 className="mt-1 text-sm font-bold">{active.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{active.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* idle center hint */}
          {!active && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-dashed border-border text-center">
              <span className="px-2 text-[11px] font-medium text-muted-foreground">Tap a report</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
