import { motion } from "motion/react";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WarpShader } from "@/components/ui/warp-shader";

export function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-20 text-center shadow-2xl ring-1 ring-white/10"
      >
        <div className="absolute inset-0 -z-10">
          <WarpShader />
          <div className="absolute inset-0 bg-shell/50" />
        </div>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
          Bring clarity, precision, and speed to your business finances.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/85 text-sm sm:text-base leading-relaxed">
          Join hundreds of small businesses that run cleaner books, get paid faster, and eliminate
          hours of weekly admin with Wize Accounts.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Button
            size="lg"
            className="group rounded-full px-8 h-12 shadow-lg shadow-black/20 text-sm font-bold"
            asChild
          >
            <Link to="/signup">
              Start Your 14-Day Free Trial
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-white/10 px-7 h-12 text-white hover:bg-white/20 hover:text-white text-sm font-bold"
            asChild
          >
            <a href="#product">
              <Play className="mr-1.5 h-4 w-4 fill-white/20" />
              Schedule a Live Walkthrough
            </a>
          </Button>
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/70">
          <CheckCircle2 className="h-3.5 w-3.5 text-shell-accent" />
          No credit card required · Setup in under 2 minutes · Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}
