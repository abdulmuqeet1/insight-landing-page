import { motion } from "motion/react";
import {
  FileText,
  ClipboardList,
  Receipt,
  CreditCard,
  Users,
  BarChart3,
  FileSignature,
  Sparkles,
  DatabaseZap,
  Check,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Invoicing",
    body: "Create professional invoices, send them to customers, and track their status from draft to paid.",
    bullets: ["Invoice status tracking", "Branded PDF templates", "Customer history", "Payment records", "Printable documents"],
  },
  {
    icon: ClipboardList,
    title: "Quotations & Sales Orders",
    body: "Prepare quotes and sales orders before work begins, then turn business activity into clean records.",
    bullets: ["Quotation management", "Sales order tracking", "Customer-linked documents", "PDF previews", "Reusable layouts"],
  },
  {
    icon: Receipt,
    title: "Expenses & Bills",
    body: "Track business costs, vendor bills, receipts, and purchases in one organized place.",
    bullets: ["Expense categories", "Vendor records", "Bill tracking", "Purchase orders", "Cost summaries"],
  },
  {
    icon: CreditCard,
    title: "Payments",
    body: "Record payments received and keep customer balances easier to follow.",
    bullets: ["Payment references", "Invoice payment status", "Customer payment history", "Paid and pending views", "Cash flow visibility"],
  },
  {
    icon: Users,
    title: "Customers & Vendors",
    body: "Keep the people and companies you work with connected to invoices, bills, payments, and documents.",
    bullets: ["Customer profiles", "Vendor profiles", "Invoice history", "Bill history", "Contact details"],
  },
  {
    icon: BarChart3,
    title: "Reports",
    body: "See the numbers that matter without digging through spreadsheets.",
    bullets: ["Revenue overview", "Expense breakdown", "Outstanding invoices", "Recent payments", "Business summaries"],
  },
  {
    icon: FileSignature,
    title: "PDF Templates",
    body: "Create polished invoices, quotations, and printable business documents with your own branding.",
    bullets: ["Company logo", "Custom layout", "Line items", "Totals and tax", "Print and export ready"],
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    body: "Use AI to speed up repetitive finance work while staying in control.",
    bullets: ["Draft invoices", "Summarize uploaded files", "Help organize records", "Answer business questions", "Review before saving"],
    ai: true,
  },
  {
    icon: DatabaseZap,
    title: "Data Migration",
    body: "Move business data into AutoBooks without starting from scratch.",
    bullets: ["Import business records", "Export data", "Migration workflow", "Review before commit", "Accountant-friendly handoff"],
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Features
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything you need to manage business finances
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A connected workspace for daily accounting workflows.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group soul-card p-6 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_color-mix(in_oklab,var(--shell)_60%,transparent)]"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  f.ai ? "bg-ai/10 text-ai" : "bg-primary/10 text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-bold">
                {f.title}
                {f.ai && (
                  <span className="rounded-full bg-ai/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-ai">
                    Beta
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <ul className="mt-4 space-y-1.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
