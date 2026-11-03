import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Landmark,
  Scale,
  Globe2,
  Package,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Pillar {
  id: string;
  badge: string;
  headline: string;
  body: string;
  icon: typeof Landmark;
  highlights: { title: string; desc: string }[];
  visual: {
    type: "banking" | "ledger" | "fx" | "inventory";
  };
}

const pillars: Pillar[] = [
  {
    id: "banking",
    badge: "BANKING & RECONCILIATION",
    headline: "Connect your bank. Reconcile transactions with zero guesswork.",
    body: "Stop manually cross-referencing paper bank statements against spreadsheets. Wize Accounts connects securely with thousands of financial institutions worldwide via Plaid. Inbound deposits and outbound payments are automatically matched to open customer invoices and vendor bills using intelligent confidence matching.",
    icon: Landmark,
    highlights: [
      {
        title: "Direct Plaid Bank Sync",
        desc: "Seamlessly pull checking, savings, and credit card transactions in real time.",
      },
      {
        title: "Smart Rule Engine",
        desc: "Set up automated rules to categorize recurring expenses and match routine supplier debits.",
      },
      {
        title: "Zero-Difference Reconciliation Session",
        desc: "Interactive reconciliation view guarantees your ledger balance matches your real-world bank balance down to the cent.",
      },
    ],
    visual: { type: "banking" },
  },
  {
    id: "ledger",
    badge: "CORE INTEGRITY",
    headline: "Real accounting precision. No hidden calculation shortcuts.",
    body: "Behind our clean, minimalist interface lies a strict double-entry general ledger engineered to commercial standards. Every transaction maintains exact debit-credit equilibrium with high-precision decimal math.",
    icon: Scale,
    highlights: [
      {
        title: "Configurable Chart of Accounts",
        desc: "Standardized 5-tier account hierarchy (Assets, Liabilities, Equity, Revenue, Expense) customizable for your industry.",
      },
      {
        title: "Closing Date Password Gate",
        desc: "Freeze historical fiscal periods so finalized tax filings and closed quarters can never be accidentally modified.",
      },
      {
        title: "Multi-Dimensional Tagging",
        desc: "Tag journal lines by Class (department/business unit) and Location (office/branch) for granular departmental profitability reporting.",
      },
      {
        title: "Complete Audit Trail",
        desc: "Every transaction creation, modification, or reversal is permanently logged with timestamps, user identities, and IP addresses.",
      },
    ],
    visual: { type: "ledger" },
  },
  {
    id: "currency",
    badge: "GLOBAL COMMERCE",
    headline: "Invoice in any currency. Report with accurate exchange gains & losses.",
    body: "Running an international agency, remote SaaS, or import/export business? Wize Accounts handles cross-border transactions natively without currency calculation errors.",
    icon: Globe2,
    highlights: [
      {
        title: "150+ Supported Currencies",
        desc: "Issue customer invoices in EUR, GBP, AED, SAR, or CAD while maintaining your home base currency in USD.",
      },
      {
        title: "Live Exchange Rates & Manual Overrides",
        desc: "Real-time exchange rate sync with the flexibility to set negotiated contract rates.",
      },
      {
        title: "IAS 21 / ASC 830 Unrealized FX Revaluation",
        desc: "Automatically calculate and post period-end unrealized foreign exchange gains and losses on open accounts receivable and payable.",
      },
    ],
    visual: { type: "fx" },
  },
  {
    id: "inventory",
    badge: "INVENTORY & COSTING",
    headline: "Track stock, cost layers, and margins automatically upon every sale.",
    body: "Never lose track of product costs or inventory values. Wize Accounts features a perpetual inventory engine with First-In, First-Out (FIFO) lot valuation layers.",
    icon: Package,
    highlights: [
      {
        title: "Perpetual Cost Layering",
        desc: "Automatically compute Cost of Goods Sold (COGS) based on actual vendor purchase costs when an invoice is issued.",
      },
      {
        title: "Stock Movement Journal",
        desc: "Full immutable audit log of purchases, sales, returns, and inventory write-offs.",
      },
      {
        title: "Reorder Level Alerts",
        desc: "Know exactly when stock is running low before you run out of customer orders.",
      },
    ],
    visual: { type: "inventory" },
  },
];

export function CompetitiveEdge() {
  const [activeTab, setActiveTab] = useState(0);
  const current = pillars[activeTab];

  return (
    <section className="relative px-6 py-24 overflow-hidden border-t border-border/40 bg-card/40">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            THE WIZE ACCOUNTS ADVANTAGE
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Institutional accounting power. Consumer-grade simplicity.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
            Unlike shallow invoice makers that fall apart at tax time, Wize Accounts is engineered
            with the strict controls certified accountants and growing companies require.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{p.badge.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Showcase */}
        <div className="mt-10 rounded-3xl border border-border/60 bg-card p-6 sm:p-10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid gap-10 lg:grid-cols-12 lg:items-center"
            >
              {/* Copy Side */}
              <div className="lg:col-span-7">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {current.badge}
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  {current.headline}
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {current.body}
                </p>

                <div className="mt-8 space-y-4 border-t border-border/40 pt-6">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground">{h.title}</h4>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Mockup Visual Side */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-shell p-6 text-white shadow-2xl ring-1 ring-white/10">
                  {current.visual.type === "banking" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Landmark className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Plaid Bank Feed · Live
                          </span>
                        </div>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          Connected
                        </span>
                      </div>

                      <div className="rounded-xl bg-white/5 p-3 text-xs space-y-2 border border-white/10">
                        <div className="flex justify-between items-center text-white/70">
                          <span>Chase Business Checking (...4820)</span>
                          <span className="font-mono text-emerald-400 font-bold">$42,910.45</span>
                        </div>
                        <div className="h-px bg-white/10 my-1" />
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">Statement Balance:</span>
                          <span className="font-mono">$42,910.45</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">General Ledger Balance:</span>
                          <span className="font-mono">$42,910.45</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 p-2 rounded-lg">
                          <span>Reconciliation Difference:</span>
                          <span className="font-mono">$0.00 (Balanced)</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="rounded-lg bg-white/5 p-2.5 flex items-center justify-between border border-white/10">
                          <div>
                            <p className="font-semibold text-white">Stripe Inbound Deposit</p>
                            <p className="text-[10px] text-white/60">
                              Matched to INV-1038 (Acme Corp)
                            </p>
                          </div>
                          <span className="text-emerald-400 font-mono font-bold">+$3,450.00</span>
                        </div>
                        <div className="rounded-lg bg-white/5 p-2.5 flex items-center justify-between border border-white/10">
                          <div>
                            <p className="font-semibold text-white">AWS Cloud Services</p>
                            <p className="text-[10px] text-white/60">
                              Matched to Vendor Bill #VB-902
                            </p>
                          </div>
                          <span className="text-amber-300 font-mono font-bold">-$428.60</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {current.visual.type === "ledger" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Strict Double-Entry Journal
                          </span>
                        </div>
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/90">
                          Journal #JE-4902
                        </span>
                      </div>

                      <div className="rounded-xl bg-white/5 p-3 text-xs space-y-2 border border-white/10">
                        <div className="grid grid-cols-12 gap-1 text-[10px] font-bold uppercase text-white/60 pb-1 border-b border-white/10">
                          <span className="col-span-6">Account Name</span>
                          <span className="col-span-3 text-right">Debit ($)</span>
                          <span className="col-span-3 text-right">Credit ($)</span>
                        </div>
                        <div className="grid grid-cols-12 gap-1 text-[11px] font-mono">
                          <span className="col-span-6 text-white font-sans">1010 Cash at Bank</span>
                          <span className="col-span-3 text-right text-emerald-400 font-bold">
                            5,000.00
                          </span>
                          <span className="col-span-3 text-right text-white/40">0.00</span>
                        </div>
                        <div className="grid grid-cols-12 gap-1 text-[11px] font-mono">
                          <span className="col-span-6 text-white font-sans">
                            1200 Accounts Receivable
                          </span>
                          <span className="col-span-3 text-right text-white/40">0.00</span>
                          <span className="col-span-3 text-right text-emerald-400 font-bold">
                            5,000.00
                          </span>
                        </div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-emerald-400">Ledger Equilibrium:</span>
                          <span className="font-mono text-emerald-400">Dr $5,000 = Cr $5,000</span>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white/10 p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-amber-400" />
                          <div>
                            <p className="font-semibold text-white">Period Closing Lock</p>
                            <p className="text-[10px] text-white/60">
                              Q3 Closed & Password Protected
                            </p>
                          </div>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold">Active</span>
                      </div>
                    </div>
                  )}

                  {current.visual.type === "fx" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Globe2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Multi-Currency Revaluation
                          </span>
                        </div>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          150+ Currencies
                        </span>
                      </div>

                      <div className="rounded-xl bg-white/5 p-3 text-xs space-y-2 border border-white/10">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">Invoice INV-1092:</span>
                          <span className="font-mono font-bold text-white">€10,000.00 EUR</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">Booking FX Rate (at creation):</span>
                          <span className="font-mono text-white/80">1.065 USD / EUR</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">Current Spot FX Rate:</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            1.082 USD / EUR
                          </span>
                        </div>
                        <div className="h-px bg-white/10 my-1" />
                        <div className="flex justify-between items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 p-2 rounded-lg">
                          <span>Unrealized FX Gain (IAS 21):</span>
                          <span className="font-mono">+$170.00 USD</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-white/70 leading-relaxed">
                        Automatic revaluation journal generated at month-end closing to ensure
                        balance sheet compliance under international accounting standards.
                      </p>
                    </div>
                  )}

                  {current.visual.type === "inventory" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Perpetual FIFO Cost Layers
                          </span>
                        </div>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/90">
                          Automatic COGS
                        </span>
                      </div>

                      <div className="rounded-xl bg-white/5 p-3 text-xs space-y-2 border border-white/10">
                        <p className="font-bold text-white text-xs mb-1">
                          Item: Enterprise Server Unit
                        </p>
                        <div className="flex justify-between items-center text-[11px] bg-white/5 p-1.5 rounded">
                          <span className="text-white/70">Batch A (10 units):</span>
                          <span className="font-mono text-white">$450.00 / unit (Layer 1)</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] bg-white/5 p-1.5 rounded">
                          <span className="text-white/70">Batch B (15 units):</span>
                          <span className="font-mono text-white">$485.00 / unit (Layer 2)</span>
                        </div>
                        <div className="h-px bg-white/10 my-1" />
                        <div className="flex justify-between items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 p-2 rounded-lg">
                          <span>Invoice for 12 units → COGS:</span>
                          <span className="font-mono">$5,470.00 (FIFO)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span>Inventory journal posted: Dr COGS / Cr Finished Goods</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
