import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowUp, Plus } from "lucide-react";
import invoiceImg from "@/assets/ai-cards/invoice.jpg?format=webp";
import expenseImg from "@/assets/ai-cards/expense.jpg?format=webp";
import revenueImg from "@/assets/ai-cards/revenue.jpg?format=webp";
import reminderImg from "@/assets/ai-cards/reminder.jpg?format=webp";
import overdueImg from "@/assets/ai-cards/overdue.jpg?format=webp";
import reportImg from "@/assets/ai-cards/report.jpg?format=webp";

const cards = [
  {
    img: invoiceImg,
    badge: "Instant Invoice",
    desc: "Drafted and calculated with taxes in 2 seconds",
  },
  {
    img: expenseImg,
    badge: "Smart Expense",
    desc: "Receipt scanned, parsed, and categorized automatically",
  },
  {
    img: revenueImg,
    badge: "Cash Forecast",
    desc: "30/60/90-day cash runway projection based on live receivables",
  },
  {
    img: overdueImg,
    badge: "Anomaly Check",
    desc: "Flagged duplicate vendor bill before double payment",
  },
  {
    img: reminderImg,
    badge: "Collections Note",
    desc: "Personalized overdue payment reminders ready to send",
  },
  {
    img: reportImg,
    badge: "P&L Summary",
    desc: "Instant breakdown of monthly margins for your leadership team",
  },
];

const promptExamples = [
  "Draft an invoice to Acme Corp for 30 engineering hours at $120/hr and 10 design hours at $95/hr with 14-day payment terms.",
  "Scan this attached supplier receipt, extract line items and taxes, and log it under Office & Software expenses.",
  "Which customer invoices are overdue by more than 30 days, and what is our total exposure?",
  "Generate a comparative P&L between this quarter and last quarter to see where operating expenses increased.",
];

export function CreateWithAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const vpRef = useRef({ w: 1280, h: 800 });
  const [activePrompt, setActivePrompt] = useState(0);

  useEffect(() => {
    const measure = () => {
      vpRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // cycle the prompt shown in the AI textbox
  useEffect(() => {
    const id = setInterval(() => {
      setActivePrompt((a) => (a + 1) % promptExamples.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.5, 1);
    return 300 + (vpRef.current.w - 300) * t;
  });
  const height = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.5, 1);
    return 66 + (vpRef.current.h - 66) * t;
  });
  const radius = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const topY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const botY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.66], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0.12, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* different background that appears once expanded */}
        <motion.div
          style={{ opacity: bgOpacity }}
          aria-hidden
          className="absolute inset-0 bg-shell"
        >
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,color-mix(in_oklab,var(--shell-accent)_45%,transparent),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_120%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_60%)]" />
        </motion.div>

        {/* top heading line */}
        <motion.p
          style={{ opacity: textOpacity, y: topY }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[150px] whitespace-nowrap text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
        >
          You can
        </motion.p>
        {/* bottom heading line */}
        <motion.p
          style={{ opacity: textOpacity, y: botY }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[110px] whitespace-nowrap text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
        >
          with one simple prompt.
        </motion.p>

        {/* expanding Create button → fullscreen panel */}
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-accent shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--shell)_70%,transparent)]"
        >
          {/* collapsed label */}
          <motion.span
            style={{ opacity: labelOpacity }}
            className="pointer-events-none inline-flex items-center gap-2 whitespace-nowrap px-6 text-xl font-extrabold tracking-tight text-primary-foreground sm:text-2xl"
          >
            <Sparkles className="h-5 w-5" />
            Create & Manage
          </motion.span>

          {/* expanded experience */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="pointer-events-none absolute inset-0 bg-shell/70" />
            <div className="relative flex flex-1 flex-col items-center justify-center gap-6 px-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-shell-accent" /> Wize Accounts AI Assistant
                </span>
                <h3 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Execute complex accounting tasks in seconds
                </h3>
              </div>

              {/* floating image cards looping left → right */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <div className="flex w-max animate-[card-marquee_36s_linear_infinite] gap-5 py-2">
                  {[...cards, ...cards].map((card, i) => (
                    <div
                      key={i}
                      className="group relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 bg-card/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:ring-white/40"
                    >
                      <img
                        src={card.img}
                        alt={card.badge}
                        width={512}
                        height={640}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-shell/95 via-shell/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-md">
                          {card.badge}
                        </span>
                        <p className="mt-1.5 text-xs text-white/80 line-clamp-2">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ChatGPT-like AI textbox */}
              <div className="w-full max-w-2xl px-2">
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 pl-4 backdrop-blur-md shadow-2xl">
                  <Plus className="h-5 w-5 shrink-0 text-white/60" />
                  <div className="min-h-[1.75rem] flex-1 text-left text-xs text-white sm:text-sm">
                    <motion.span
                      key={activePrompt}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-block font-mono leading-relaxed"
                    >
                      "{promptExamples[activePrompt]}"
                      <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/80" />
                    </motion.span>
                  </div>
                  <button
                    type="button"
                    aria-label="Send prompt"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-shell font-bold shadow hover:bg-white/90 transition-transform active:scale-95"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>

                {/* Quick prompt suggestions chips */}
                <div className="mt-3 hidden sm:flex flex-wrap items-center justify-center gap-2">
                  {promptExamples.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePrompt(idx)}
                      className={`rounded-full px-3 py-1 text-[11px] transition-all ${
                        activePrompt === idx
                          ? "bg-white text-shell font-semibold shadow"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      Prompt 0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
