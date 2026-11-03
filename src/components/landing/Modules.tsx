import { motion } from "motion/react";
import {
  FileText,
  CreditCard,
  Receipt,
  Wallet,
  BookOpenCheck,
  Landmark,
  Users,
  Building2,
  Package,
  BarChart3,
  FileSignature,
  Sparkles,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const modules = [
  {
    icon: FileText,
    title: "Invoicing",
    sub: "Fast, branded invoice generation & status tracking",
  },
  {
    icon: CreditCard,
    title: "Payments",
    sub: "Auto-allocated collections & customer credit tracking",
  },
  {
    icon: Receipt,
    title: "Expenses",
    sub: "Categorized spend management with receipt capture",
  },
  {
    icon: Wallet,
    title: "Bills & AP",
    sub: "Vendor bill management, due dates & PO matching",
  },
  {
    icon: BookOpenCheck,
    title: "General Ledger",
    sub: "Full double-entry ledger with period closing gates",
  },
  {
    icon: Landmark,
    title: "Bank Feeds",
    sub: "Plaid integration & automated rule-based reconciliation",
  },
  {
    icon: Users,
    title: "Customers",
    sub: "Complete debtor history, credit terms & statements",
  },
  {
    icon: Building2,
    title: "Vendors",
    sub: "Supplier database, open payables & purchase records",
  },
  {
    icon: Package,
    title: "Inventory",
    sub: "Perpetual FIFO costing, stock tracking & reorder alerts",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    sub: "14+ standard financial statements & tax summaries",
  },
  {
    icon: FileSignature,
    title: "Visual Templates",
    sub: "Customizable PDF branding for all business documents",
  },
  {
    icon: Sparkles,
    title: "AI Bookkeeper",
    sub: "Natural language drafting, receipt scanning & audits",
  },
  {
    icon: Globe2,
    title: "Multi-Currency",
    sub: "Live FX rates & automated unrealized gain/loss revaluations",
  },
  {
    icon: ShieldCheck,
    title: "User Roles",
    sub: "Secure granular access for Admin, Accountant & Staff",
  },
];

export function Modules() {
  return (
    <section className="bg-secondary/40 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          A purpose-built module for every financial workflow
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Everything works together under one roof, backed by a strict general ledger.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.04 }}
              className="group flex items-start gap-3.5 soul-card p-4 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">{m.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{m.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
