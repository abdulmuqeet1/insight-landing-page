import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, FileText, Receipt, BarChart3, Users, Sparkles } from "lucide-react";
import { WarpShader } from "@/components/ui/warp-shader";
import { cn } from "@/lib/utils";
import dashboard from "@/assets/wizeaccounts-dashboard.png?format=webp";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    title: "Executive Financial Command Center",
    description:
      "Instant clarity on cash flow, revenue trends, pending receivables, upcoming payables, and category-level expense breakdowns with zero manual math.",
    badge: "Real-Time Ledger",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: FileText,
    title: "Branded Invoicing & Faster Collections",
    description:
      "Convert estimates into polished, professional invoices with one click. Send PDF documents, track view/payment statuses, and maintain complete customer balances.",
    badge: "1-Click PDF & Status",
  },
  {
    id: "expenses",
    label: "Expenses & Bills",
    icon: Receipt,
    title: "Seamless Accounts Payable",
    description:
      "Snap receipts with AI OCR, log vendor bills against purchase orders, categorize operating costs, and eliminate double payments before they happen.",
    badge: "AI OCR & PO Matching",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    title: "Real-Time Accountant-Grade Financials",
    description:
      "Generate mathematically balanced Profit & Loss statements, Balance Sheets, Cash Flow statements, and Aging reports directly from your General Ledger.",
    badge: "Dr = Cr Balanced",
  },
  {
    id: "customers",
    label: "Customers & Vendors",
    icon: Users,
    title: "360° Contact & Transaction Histories",
    description:
      "Keep contact profiles, credit limits, open balances, payment terms, and past transactions linked to every invoice and bill you generate.",
    badge: "Complete Audit Trail",
  },
  {
    id: "ai",
    label: "AI Assistant",
    icon: Sparkles,
    title: "Your Autonomous AI Bookkeeper",
    description:
      "Chat directly with your financial engine. Draft invoices, audit duplicate expenses, categorize receipts, and forecast runway using natural language.",
    badge: "Human-in-the-Loop",
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState("dashboard");

  return (
    <section id="product" className="relative px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl rounded-[2rem]">
        {/* notch dipping down from the container's top edge, tabs nested inside */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 items-start sm:flex">
          {/* left fillet */}
          <div
            className="notch-fillet-bl h-[26px] w-[26px] bg-background"
            style={{ "--r": "26px" } as CSSProperties}
          />
          {/* tab pill carved out of the container (page-bg colored) */}
          <div className="pointer-events-auto -mt-px flex items-center gap-1 rounded-b-[26px] bg-background px-3 pb-3 pt-1.5">
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
                      ? "bg-primary text-primary-foreground shadow-sm"
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
            className="notch-fillet-br h-[26px] w-[26px] bg-background"
            style={{ "--r": "26px" } as CSSProperties}
          />
        </div>

        {/* the shader container */}
        <div className="relative overflow-hidden rounded-[2rem] p-2 pt-14 sm:p-4 sm:pt-16">
          {/* animated water shader background */}
          <div className="absolute inset-0 -z-10">
            <WarpShader />
            <div className="absolute inset-0 bg-shell/30" />
          </div>

          <div className="px-4 pt-6 text-center sm:px-10">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              One unified workspace for your entire financial workflow
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-white/80 sm:text-base">
              Say goodbye to disconnected spreadsheets and clunky legacy software. Everything from
              customer quotes to balance sheets connects seamlessly in real time.
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

          {/* app screen & active tab callout */}
          <div className="relative mt-8 px-3 pb-6 sm:mt-10 sm:px-10 sm:pb-10">
            {/* active tab spotlight banner */}
            <div className="mx-auto mb-4 max-w-3xl rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
              <AnimatePresence mode="wait">
                {(() => {
                  const current = tabs.find((t) => t.id === active) ?? tabs[0];
                  return (
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center gap-1.5"
                    >
                      <div className="inline-flex items-center gap-2">
                        <span className="rounded-full bg-primary/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground ring-1 ring-white/20">
                          {current.badge}
                        </span>
                        <h3 className="text-base font-bold text-white sm:text-lg">
                          {current.title}
                        </h3>
                      </div>
                      <p className="max-w-xl text-xs text-white/85 sm:text-sm">
                        {current.description}
                      </p>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            <div className="relative rounded-[28px] bg-card shadow-2xl shadow-shell/30">
              {/* preview */}
              <div className="overflow-hidden rounded-[28px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={dashboard}
                    alt={`Wize Accounts ${active} view`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
