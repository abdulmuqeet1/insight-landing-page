import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const prompts = [
  "Create an invoice for Acme for 20 development hours and 10 design hours.",
  "Summarize this expense file and suggest a category.",
  "Which invoices are overdue this month?",
  "Show me total expenses by category.",
  "Draft a payment reminder for unpaid invoices.",
  "Prepare a quick revenue summary for this month.",
];

export function AISection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3 py-1 text-xs font-semibold uppercase text-ai">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant · Beta
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ask questions. Draft faster. Stay in control.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Use AutoBooks AI to help draft invoices, summarize files, organize
            business data, and answer questions from your current workspace. AI
            helps with the admin work, while you review before anything is saved.
          </p>
        </div>

        <div className="space-y-3">
          {prompts.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3 soul-card p-4 text-sm"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ai/10 text-ai">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-foreground/85">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
