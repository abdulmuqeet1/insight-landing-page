import { motion } from "motion/react";
import {
  FileText, CreditCard, Receipt, Wallet, Users, Truck,
  Package, BarChart3, FileSignature, Sparkles, DatabaseZap, ShieldCheck,
} from "lucide-react";

const modules = [
  { icon: FileText, title: "Invoicing", sub: "Invoice management" },
  { icon: CreditCard, title: "Payments", sub: "Money received" },
  { icon: Receipt, title: "Expenses", sub: "Business costs" },
  { icon: Wallet, title: "Bills", sub: "Vendor payables" },
  { icon: Users, title: "Customers", sub: "Revenue history" },
  { icon: Truck, title: "Vendors", sub: "Purchase history" },
  { icon: Package, title: "Products", sub: "Items and services" },
  { icon: BarChart3, title: "Reports", sub: "Financial overview" },
  { icon: FileSignature, title: "Templates", sub: "Branded documents" },
  { icon: Sparkles, title: "AI Assistant", sub: "Faster admin work" },
  { icon: DatabaseZap, title: "Data Migration", sub: "Import and export" },
  { icon: ShieldCheck, title: "Users & Roles", sub: "Team access" },
];

export function Modules() {
  return (
    <section className="bg-secondary/40 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          A module for every workflow
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A connected workspace for daily accounting workflows.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {modules.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{m.title}</p>
                <p className="truncate text-xs text-muted-foreground">{m.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
