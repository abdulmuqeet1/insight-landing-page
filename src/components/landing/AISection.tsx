import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Bot } from "lucide-react";

interface PromptItem {
  prompt: string;
  response: string;
  action: string;
  impact: string;
}

const prompts: PromptItem[] = [
  {
    prompt:
      "Create an invoice for TechCorp for 40 development hours and 15 consulting hours at standard rates.",
    response:
      "Staged Draft Invoice INV-1089 for TechCorp ($6,225.00 total: 40 hrs @ $120/hr dev + 15 hrs @ $95/hr consulting). Net-14 payment terms applied.",
    action: "Staged: Invoice Generation",
    impact: "Debit Accounts Receivable / Credit Service Revenue",
  },
  {
    prompt:
      "Categorize this uploaded receipt from Amazon Web Services under Software & Cloud Infrastructure.",
    response:
      "Receipt parsed: AWS EMEA ($428.60, Tax: $0.00, Date: Yesterday). Mapped to COA account 6140 (Software & Cloud Infrastructure).",
    action: "Staged: Expense OCR",
    impact: "Debit Cloud Infrastructure / Credit Corporate Card",
  },
  {
    prompt:
      "Which vendor bills are due this week, and how will paying them impact our cash balance?",
    response:
      "3 vendor bills due this week totaling $3,450.00. Current bank balance is $42,180.00. Forecasted post-disbursement cash is $38,730.00.",
    action: "Analysis: AP Cash Impact",
    impact: "3 open bills flagged for scheduled payment",
  },
  {
    prompt:
      "Check our books for potential duplicate transactions or unusually high expense outliers this month.",
    response:
      "Audit complete. 1 duplicate flag detected: 'Figma Subscription $45.00' logged twice on Oct 2nd and Oct 4th. No unauthorized outliers found.",
    action: "Audit: Anomaly Detection",
    impact: "Duplicate transaction staged for deletion",
  },
  {
    prompt: "Draft a polite payment reminder email for invoice INV-1042 that is 7 days past due.",
    response:
      "Drafted personalized email for Horizon Partners regarding INV-1042 ($2,800.00, due Oct 27). Includes secure 1-click Stripe payment link.",
    action: "Draft: Collections Notice",
    impact: "Pending your approval to send",
  },
  {
    prompt:
      "What is our current burn rate and how many months of cash runway do we have based on current receivables?",
    response:
      "Average net monthly burn is $8,420.00. Available cash + receivables due in 30 days ($64,900.00) gives 7.7 months of runway.",
    action: "Executive Forecast: Runway",
    impact: "Based on real-time subledger balances",
  },
];

export function AISection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = prompts[activeIdx];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Explanatory Copy */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ai ring-1 ring-ai/20">
              <Sparkles className="h-3.5 w-3.5" /> AI ASSISTANT · BUILT FOR ACCURACY
            </span>
            <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight">
              Ask questions in plain English. Get balanced accounting actions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm sm:text-base leading-relaxed">
              Wize Accounts AI isn't a generic chatbot—it is an autonomous bookkeeper connected
              directly to your financial engine. It drafts invoices, categorizes expenses,
              summarizes balance sheets, and flags anomalies. Crucially, you retain 100% control:
              nothing is committed to your permanent ledger until you review and approve it.
            </p>

            <div className="mt-8 space-y-3 border-t border-border/40 pt-6">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Strict Human-in-the-Loop review before posting</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Zero hallucinations — grounded strictly in your General Ledger</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Prompts & Staged Action Simulator */}
          <div className="space-y-4 lg:col-span-7">
            {/* Live AI Staged Action Card */}
            <div className="rounded-2xl border border-ai/20 bg-card p-5 shadow-xl ring-1 ring-ai/10 backdrop-blur">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-ai/10 text-ai">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-ai">
                    Staged Action Preview
                  </span>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20">
                  Pending Human Approval
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 space-y-3"
                >
                  <div className="rounded-lg bg-muted/50 p-3 text-xs">
                    <span className="font-bold text-foreground">Prompt:</span>{" "}
                    <span className="text-muted-foreground italic">"{activeItem.prompt}"</span>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                    {activeItem.response}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px]">
                    <span className="font-semibold text-primary">{activeItem.action}</span>
                    <span className="text-muted-foreground font-mono">{activeItem.impact}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prompt Selector List */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                Click any prompt to simulate:
              </p>
              {prompts.map((p, i) => (
                <button
                  key={p.prompt}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left flex items-start gap-3 rounded-xl p-3 text-xs transition-all ${
                    activeIdx === i
                      ? "bg-ai/10 text-foreground ring-1 ring-ai/40 font-semibold shadow-sm"
                      : "soul-card hover:bg-card/90 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                      activeIdx === i ? "bg-ai text-white" : "bg-ai/10 text-ai"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 leading-snug">{p.prompt}</span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                      activeIdx === i ? "translate-x-0.5 text-ai" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
