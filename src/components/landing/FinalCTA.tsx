import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
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
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-16 text-center"
      >
        <div className="absolute inset-0 -z-10">
          <WarpShader />
          <div className="absolute inset-0 bg-shell/40" />
        </div>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Bring your business finances into one clean workspace
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/85">
          Create invoices, track expenses, manage customers and vendors, organize
          documents, and understand your numbers with Wize Accounts.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group rounded-full px-6">
            Start free trial
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/40 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
          >
            <Play className="mr-1 h-4 w-4" />
            View demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
