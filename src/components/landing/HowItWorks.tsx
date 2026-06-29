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

function Divider() {
  return (
    <div className="relative my-10 flex items-center justify-center" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="absolute grid h-2.5 w-2.5 place-items-center">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          How it works
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything connected in one accounting workspace
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title}>
              {i > 0 && <Divider />}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <div className="flex items-center gap-5">
                  <span className="font-display text-6xl font-extrabold leading-none text-primary/15 sm:text-7xl">
                    0{i + 1}
                  </span>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="md:pl-8">
                  <h3 className="text-xl font-bold sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
