import { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { plans } from "@/lib/plans";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Simple, transparent pricing that grows with your business
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          No hidden transaction surcharges. No artificial lock-in. 14 days free on all plans.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-bold transition-all",
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition-all",
              billingCycle === "annual"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>Annual billing</span>
            <span className="rounded-full bg-shell-accent/20 px-2 py-0.5 text-[10px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
        {plans.map((p, i) => {
          const isAnnual = billingCycle === "annual";
          const displayPrice = isAnnual ? p.annualPrice : p.price;
          const billingNote = isAnnual
            ? `$${p.annualPriceValue} billed annually (save 20%)`
            : "billed monthly";

          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col justify-between soul-card p-8 transition-transform hover:-translate-y-1",
                p.popular &&
                  "ring-2 ring-primary shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--primary)_55%,transparent)] bg-card",
              )}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
                    {p.name}
                  </h3>
                </div>

                <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Ideal for:</strong> {p.idealFor}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">
                    {displayPrice}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">/ month</span>
                </div>
                <p className="mt-1 text-xs text-primary font-semibold">{billingNote}</p>

                <Button
                  className="mt-6 w-full rounded-full h-11 text-sm font-bold shadow-sm"
                  variant={p.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/signup" search={{ plan: p.id }}>
                    Start 14-Day Free Trial
                  </Link>
                </Button>

                <div className="mt-8 border-t border-border/50 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Features Included:
                  </p>
                  <ul className="space-y-3">
                    {p.features.map((f, idx) => {
                      const isHeader = f.startsWith("Everything in Starter");
                      return (
                        <li
                          key={idx}
                          className={cn(
                            "flex items-start gap-2.5 text-xs leading-relaxed",
                            isHeader
                              ? "font-bold text-primary pb-1"
                              : "text-foreground/85 font-medium",
                          )}
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-border/30 pt-4 text-center">
                <span className="text-[11px] text-muted-foreground">
                  Includes full access · Upgrade or downgrade anytime
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-xs font-medium text-muted-foreground">
        14-day free trial · No credit card required · Cancel anytime in 1 click
      </p>
    </section>
  );
}
