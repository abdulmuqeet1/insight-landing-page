import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$15",
    desc: "Best for getting started",
    popular: false,
    planId: "starter",
    features: [
      "Invoicing and payments", "Customers and vendors", "Expenses and bills",
      "Financial dashboard", "Basic reports", "PDF templates",
      "Import and export", "AI assistant access", "Team-ready workspace",
    ],
  },
  {
    name: "Pro",
    price: "$39",
    desc: "Best value for growing businesses",
    popular: true,
    planId: "pro",
    features: [
      "Everything in Starter", "More invoices and documents", "Advanced PDF templates",
      "User roles and permissions", "Advanced reports", "Data migration tools",
      "Priority support", "More AI usage", "Shareable document links",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pricing that matches how your business grows
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Start simple, upgrade when your workflow gets more complex.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "relative flex flex-col soul-card p-7 transition-transform hover:-translate-y-1",
              p.popular && "ring-1 ring-primary/40 shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
            )}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <p className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
              <span className="pb-1 text-sm text-muted-foreground">/month</span>
            </p>
            <Button
              className="mt-6 w-full rounded-full"
              variant={p.popular ? "default" : "outline"}
              asChild
            >
              <Link to="/signup" search={{ plan: p.planId as "starter" | "pro" }}>
                Start free trial
              </Link>
            </Button>
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground/85">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        14-day free trial · Cancel anytime
      </p>
    </section>
  );
}
