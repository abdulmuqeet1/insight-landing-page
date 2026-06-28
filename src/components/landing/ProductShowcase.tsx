import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Receipt,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";
import { WarpShader } from "@/components/ui/warp-shader";
import { cn } from "@/lib/utils";
import dashboard from "@/assets/autobooks-dashboard.png";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "ai", label: "AI Assistant", icon: Sparkles },
];

export function ProductShowcase() {
  const [active, setActive] = useState("dashboard");

  return (
    <section id="product" className="relative px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-1">
        {/* animated water shader background */}
        <div className="absolute inset-0 -z-10">
          <WarpShader />
          <div className="absolute inset-0 bg-shell/30" />
        </div>

        <div className="px-4 pt-10 text-center sm:px-10">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            One workspace for every part of your business
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-white/80 sm:text-base">
            Switch between the tools your team uses every day — all connected,
            all in one place.
          </p>

          {/* tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-white text-shell shadow-md"
                      : "bg-white/10 text-white/85 hover:bg-white/20",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* preview frame */}
        <div className="px-3 pb-10 pt-8 sm:px-10">
          <div className="overflow-hidden rounded-xl border border-white/20 bg-card shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
              <span className="ml-3 truncate text-xs text-muted-foreground">
                app.autobooks.com / {active}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={dashboard}
                alt={`AutoBooks ${active} view`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="w-full"
                loading="lazy"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
