import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-12 sm:pb-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>Intelligent bookkeeping with a real double-entry general ledger</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          The modern accounting workspace built for fast-moving businesses.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg sm:leading-relaxed"
        >
          Create branded invoices, track bills and expenses, sync bank transactions, manage
          inventory, and generate accountant-ready financial statements in seconds—powered by an
          autonomous AI bookkeeper.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="group h-12 rounded-full px-7 shadow-lg shadow-primary/20"
            asChild
          >
            <Link to="/signup">
              Start Free Trial
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-6 bg-card hover:bg-muted/60"
            asChild
          >
            <a href="#product">
              <Play className="mr-1.5 h-4 w-4 fill-primary/20 text-primary" />
              View Interactive Demo
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            14-day free trial
          </span>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Instant setup
          </span>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Export your data anytime
          </span>
        </motion.div>
      </div>
    </section>
  );
}
