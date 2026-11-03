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
    title: "Invoicing & Accounts Receivable",
    subtitle: "Create polished, professional invoices that get paid on time.",
    bullets: [
      "Automated payment status tracking (Draft, Sent, Partial, Paid, Overdue)",
      "Multi-currency invoicing with live exchange rates",
      "One-click credit notes and refund allocations",
      "Automatic balance-due and customer ledger updates",
      "Print-ready and shareable PDF exports",
    ],
  },
  {
    icon: ClipboardList,
    title: "Quotations & Sales Orders",
    subtitle: "Win clients and manage commitments before invoicing begins.",
    bullets: [
      "Send branded estimates with custom terms and validity dates",
      "1-click conversion: Quote → Sales Order → Final Invoice",
      "Fulfillment tracking and partial order deliveries",
      "Customer-linked order history and audit trails",
      "Live margin preview before sending",
    ],
  },
  {
    icon: Receipt,
    title: "Expenses & Vendor Bills (AP)",
    subtitle: "Take control of company spending and vendor payables.",
    bullets: [
      "Log vendor bills and match against Purchase Orders",
      "Receipt image capture with automatic category tagging",
      "Due-date tracking to avoid late payment penalties",
      "Split expenses across business classes and locations",
      "Debit notes and vendor credit management",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Cash Application",
    subtitle: "Settle transactions with real-time subledger synchronization.",
    bullets: [
      "Record customer payments and auto-allocate across open invoices",
      "Support for Bank Transfers, Stripe, Credit Cards, Checks, and Cash",
      "Automatic journal entry posting (Dr Bank / Cr Accounts Receivable)",
      "Real-time cash position and uncleared transaction view",
      "Overpayment handling and customer credit tracking",
    ],
  },
  {
    icon: Users,
    title: "Customer & Vendor Hub",
    subtitle: "Clean relationship tracking connected to every dollar.",
    bullets: [
      "Complete customer & supplier balance forward statements",
      "Configurable credit limits and custom payment terms",
      "Dedicated contact cards with tax IDs and billing addresses",
      "Open item vs. historical transaction breakdown",
      "Instant statements for customer collections",
    ],
  },
  {
    icon: BarChart3,
    title: "Real-Time Financial Reports",
    subtitle: "Executive financial visibility without waiting for month-end.",
    bullets: [
      "Instant Profit & Loss (P&L), Balance Sheet, and Trial Balance",
      "Accounts Receivable (AR) and Accounts Payable (AP) Aging reports",
      "Cash Flow statement (Operating, Investing, Financing activities)",
      "Comparative period-over-period financial analysis",
      "Export clean datasets directly to Excel, CSV, or PDF",
    ],
  },
  {
    icon: FileSignature,
    title: "Visual PDF Template Designer",
    subtitle: "Stand out with invoices and documents designed to reflect your brand.",
    bullets: [
      "Custom company logo upload, size, and position tuning",
      "Custom brand palette, accent colors, and typography",
      "Dynamic line-item tables with tax, discount, and SKU toggles",
      "Customizable footer notes, bank transfer details, and terms",
      "Reusable templates across Invoices, Quotes, and POs",
    ],
  },
  {
    icon: Sparkles,
    title: "Autonomous AI Assistant",
    subtitle: "Natural language bookkeeping that acts as your on-demand finance analyst.",
    bullets: [
      "Draft customer invoices and vendor bills from quick chat prompts",
      "Upload receipts or statement PDFs for instant OCR extraction",
      "Run anomaly scans for duplicate charges and overdue invoices",
      'Ask complex business questions ("What was our net margin last month?")',
      "Every AI action requires human review before posting to the ledger",
    ],
    ai: true,
  },
  {
    icon: DatabaseZap,
    title: "Frictionless Data Migration",
    subtitle: "Bring your historical books over without starting from scratch.",
    bullets: [
      "Dedicated migration pipelines for QuickBooks, Xero, Excel, and CSV",
      "Staged validation preview: catch errors before importing",
      "Clean cutover date balancing with opening balance journals",
      "Batch rollback support if you need to make changes",
      "Pre-built field mapping for Chart of Accounts and Contacts",
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          POWERFUL CAPABILITIES
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Engineered for simplicity. Built on serious accounting math.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
          Everything small teams, agencies, and growing companies need to stay profitable,
          organized, and compliant.
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
              className="group soul-card flex flex-col p-6 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_color-mix(in_oklab,var(--shell)_60%,transparent)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    f.ai ? "bg-ai/10 text-ai" : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {f.ai && (
                  <span className="rounded-full bg-ai/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ai ring-1 ring-ai/20">
                    Beta
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{f.subtitle}</p>
              <ul className="mt-4 space-y-2 border-t border-border/40 pt-4 flex-1">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-xs leading-relaxed text-foreground/85"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{b}</span>
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
