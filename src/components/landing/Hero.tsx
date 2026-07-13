import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboard from "@/assets/autobooks-dashboard.png?format=webp";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-0">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Run your finances without scattered spreadsheets
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          The business finance stack for modern small teams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          Create invoices, track expenses, manage customers and vendors, record
          payments, organize documents, and understand your business from one
          clean accounting workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="group rounded-full px-6" asChild>
            <a href="#pricing">
              Start free trial
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-6 bg-card" asChild>
            <a href="#product">
              <Play className="mr-1 h-4 w-4" />
              View demo
            </a>
          </Button>
        </motion.div>

        <p className="mt-4 text-xs text-muted-foreground">
          14-day free trial · Cancel anytime
        </p>
      </div>

      {/* product screenshot emerging in the middle of the hero */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-16 max-w-6xl px-6"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-shell/20 ring-1 ring-black/5">
          <img
            src={dashboard}
            alt="AutoBooks accounting dashboard showing revenue, outstanding invoices, expenses and recent invoices"
            className="w-full"
            width={1902}
            height={991}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        {/* fade bottom into next section */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-40 bg-gradient-to-b from-transparent to-background" />
      </motion.div>
    </section>
  );
}
