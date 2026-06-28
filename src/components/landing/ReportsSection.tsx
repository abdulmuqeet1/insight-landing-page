import { motion } from "motion/react";
import {
  TrendingUp, FileWarning, PieChart, Banknote,
  UserCheck, Truck, Landmark, LayoutGrid,
} from "lucide-react";

const reports = [
  { icon: TrendingUp, label: "Revenue trend" },
  { icon: FileWarning, label: "Outstanding invoices" },
  { icon: PieChart, label: "Expense categories" },
  { icon: Banknote, label: "Recent payments" },
  { icon: UserCheck, label: "Customer activity" },
  { icon: Truck, label: "Vendor activity" },
  { icon: Landmark, label: "Tax summary" },
  { icon: LayoutGrid, label: "Business overview" },
];

export function ReportsSection() {
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
          AutoBooks gives small teams a clear view of revenue, expenses,
          customers, invoices, and payments without jumping between spreadsheets.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {reports.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold">{r.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
