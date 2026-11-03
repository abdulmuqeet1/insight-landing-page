import { motion } from "motion/react";
import {
  ReceiptIcon,
  SparkleIcon,
  InvoiceIcon,
  ChartIcon,
} from "./AdminIcons";

const cards = [
  { title: "Chasing receipts", time: "45 min / week", body: "Receipts arrive late, get misplaced, or need follow-up before records are complete.", Icon: ReceiptIcon },
  { title: "Cleaning records", time: "1 hr / week", body: "Manual categorization, duplicates, and inconsistent entries slow down financial review.", Icon: SparkleIcon },
  { title: "Preparing invoices", time: "1–2 hrs / week", body: "Creating invoices, checking payments, and answering customer questions takes time.", Icon: InvoiceIcon },
  { title: "Explaining the numbers", time: "1 hr / week", body: "Pulling financial data together and understanding what changed can interrupt focused work.", Icon: ChartIcon },
];

export function AdminSavings() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Less admin. More control.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Disconnected tools create small tasks that add up every week. Wize Accounts
          brings the work into one place so your team spends less time chasing
          records and more time running the business.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {cards.map((c, i) => {
          const { Icon } = c;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden soul-card p-8 hover:-translate-y-1.5"
            >
              {/* soft corner glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-primary">{c.time}</p>
                  <h3 className="mt-3 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">{c.body}</p>
                </div>
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-primary/5 p-3.5 ring-1 ring-primary/10 transition-colors duration-300 group-hover:bg-primary/10">
                  <Icon />
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
        className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl bg-shell p-8 text-center text-shell-foreground sm:flex-row sm:text-left"
      >
        <div>
          <p className="text-sm uppercase tracking-wider text-shell-muted">
            Weekly admin time
          </p>
          <p className="mt-1 text-4xl font-extrabold text-white">4–6 hours</p>
        </div>
        <p className="max-w-md text-sm text-shell-foreground/80">
          The hidden cost of scattered tools, manual recordkeeping, and
          disconnected financial workflows.
        </p>
      </motion.div>
    </section>
  );
}
