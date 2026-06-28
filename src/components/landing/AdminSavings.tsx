import { motion } from "motion/react";

const cards = [
  { title: "Chasing receipts", time: "45 min / week", body: "Receipts arrive late, get misplaced, or need follow-up before records are complete." },
  { title: "Cleaning records", time: "1 hr / week", body: "Manual categorization, duplicates, and inconsistent entries slow down financial review." },
  { title: "Preparing invoices", time: "1–2 hrs / week", body: "Creating invoices, checking payments, and answering customer questions takes time." },
  { title: "Explaining the numbers", time: "1 hr / week", body: "Pulling financial data together and understanding what changed can interrupt focused work." },
];

export function AdminSavings() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Less admin. More control.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Disconnected tools create small tasks that add up every week. AutoBooks
          brings the work into one place so your team spends less time chasing
          records and more time running the business.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-2xl font-extrabold text-primary">{c.time}</p>
            <h3 className="mt-2 text-base font-bold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
          </motion.div>
        ))}
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
