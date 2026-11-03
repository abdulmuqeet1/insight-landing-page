import { motion } from "motion/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ReceiptIcon, SparkleIcon, InvoiceIcon, ChartIcon } from "./AdminIcons";

const cards = [
  {
    title: "Chasing & Sorting Receipts",
    time: "45 min / week",
    problem:
      "Lost paper receipts, untagged credit card expenses, and missing tax details that create an audit nightmare at month-end.",
    fix: "Upload receipts via web or AI chat. OCR automatically pulls the date, merchant, tax, and category.",
    Icon: ReceiptIcon,
  },
  {
    title: "Manual Ledger Entry & Categorization",
    time: "1.5 hrs / week",
    problem:
      "Hand-typing journal entries, fixing unbalanced debits and credits, and guessing which account code applies.",
    fix: "Automated posting rules create balanced double-entry records every time an invoice, payment, or bill is saved.",
    Icon: SparkleIcon,
  },
  {
    title: "Creating Invoices & Tracking Collections",
    time: "1–2 hrs / week",
    problem:
      "Copy-pasting line items, checking if bank transfers arrived, and drafting awkward follow-up payment reminders.",
    fix: "1-click quote-to-invoice conversion, automatic subledger payment allocation, and real-time aging reports.",
    Icon: InvoiceIcon,
  },
  {
    title: "Prepping Reports for Your Accountant",
    time: "1 hr / week",
    problem:
      "Scrambling at year-end to assemble spreadsheets, reconcile bank statements, and explain mismatched balances.",
    fix: "Real-time P&L and Balance Sheet with period lockouts and audit trails, ready for clean export or CPA review.",
    Icon: ChartIcon,
  },
];

export function AdminSavings() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Less admin chaos. Total financial control.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Disjointed spreadsheets and legacy accounting tools cost small business owners 5+ hours
          every single week in manual data entry, reconciliation headaches, and chasing receipts.
          Wize Accounts automates the friction away.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {cards.map((c, i) => {
          const { Icon } = c;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden soul-card p-7 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* soft corner glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {c.time}
                    </span>
                    <h3 className="mt-2.5 text-xl font-bold tracking-tight text-foreground">
                      {c.title}
                    </h3>
                  </div>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/5 p-2.5 ring-1 ring-primary/10 transition-colors duration-300 group-hover:bg-primary/10">
                    <Icon />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-destructive/15 bg-destructive/5 p-3 text-xs leading-relaxed text-destructive/90">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-destructive">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      The Problem
                    </div>
                    <p className="mt-1 text-foreground/80">{c.problem}</p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-foreground">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      The Wize Accounts Fix
                    </div>
                    <p className="mt-1 text-foreground/90 font-medium">{c.fix}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl bg-shell p-8 text-center text-shell-foreground sm:flex-row sm:text-left shadow-xl ring-1 ring-white/10"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-shell-accent">
            TIME RECLAIMED
          </p>
          <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
            4 to 6 Hours Saved Every Week
          </p>
        </div>
        <p className="max-w-md text-sm text-shell-foreground/85 leading-relaxed">
          Stop spending your Sundays doing data entry. Reclaim up to 25 hours a month to focus on
          landing clients and growing your business.
        </p>
      </motion.div>
    </section>
  );
}
