import { motion } from "motion/react";
import { FilePlus2, ArrowDownUp, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: FilePlus2,
    title: "Create and send documents",
    body: "Create invoices, quotations, sales orders, purchase orders, and bills with your company branding.",
  },
  {
    icon: ArrowDownUp,
    title: "Track money in and out",
    body: "Record payments, expenses, bills, and customer activity so you always know what is paid, pending, or overdue.",
  },
  {
    icon: ClipboardCheck,
    title: "Stay ready for reports",
    body: "Keep business records organized for financial summaries, tax review, exports, and accountant handoff.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          How it works
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything connected in one accounting workspace
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="absolute right-5 top-5 text-5xl font-extrabold text-muted/70">
                {i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
