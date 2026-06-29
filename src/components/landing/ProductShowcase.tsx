import { useState, type CSSProperties } from "react";
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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] p-2 sm:p-4">
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
        </div>

        {/* mobile tab row */}
        <div className="mt-8 flex gap-2 overflow-x-auto px-3 pb-1 scrollbar-none sm:hidden">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActive ? "bg-white text-shell shadow" : "bg-white/15 text-white/85",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* app screen with notched tab bar */}
        <div className="relative mt-14 px-3 pb-6 sm:mt-20 sm:px-10 sm:pb-10">
          <div className="relative rounded-[28px] bg-card shadow-2xl shadow-shell/30">
            {/* the notch: raised pill carrying the tabs, blended with concave fillets */}
            <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-full items-end sm:flex">
              {/* left fillet */}
              <div
                className="notch-fillet-l h-[22px] w-[22px] self-end bg-card"
                style={{ "--r": "22px" } as CSSProperties}
              />
              {/* pill */}
              <div className="pointer-events-auto flex items-center gap-1 rounded-t-[22px] bg-card px-2 pb-1 pt-2.5">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  const isActive = active === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActive(t.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-foreground/5 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {/* right fillet */}
              <div
                className="notch-fillet-r h-[22px] w-[22px] self-end bg-card"
                style={{ "--r": "22px" } as CSSProperties}
              />
            </div>

            {/* preview */}
            <div className="overflow-hidden rounded-[28px]">
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
      </div>
    </section>
  );
}
