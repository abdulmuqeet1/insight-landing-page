import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowUp, Plus } from "lucide-react";
import invoiceImg from "@/assets/ai-cards/invoice.jpg";
import expenseImg from "@/assets/ai-cards/expense.jpg";
import revenueImg from "@/assets/ai-cards/revenue.jpg";
import reminderImg from "@/assets/ai-cards/reminder.jpg";
import overdueImg from "@/assets/ai-cards/overdue.jpg";
import reportImg from "@/assets/ai-cards/report.jpg";

const items = [
  { img: invoiceImg, label: "Invoice", prompt: "Create an invoice for Acme Studios — 20 dev hours and 10 design hours." },
  { img: expenseImg, label: "Expense", prompt: "Summarize this expense receipt and suggest the right category." },
  { img: revenueImg, label: "Revenue", prompt: "Show me revenue by month for this year with the growth rate." },
  { img: reminderImg, label: "Reminder", prompt: "Draft a friendly payment reminder for all unpaid invoices." },
  { img: overdueImg, label: "Overdue", prompt: "Which invoices are overdue this month, and by how much?" },
  { img: reportImg, label: "Report", prompt: "Build a financial report I can send straight to my accountant." },
];

export function CreateWithAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const vpRef = useRef({ w: 1280, h: 800 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      vpRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // cycle the "centered" prompt shown in the AI textbox
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.5, 1);
    return 240 + (vpRef.current.w - 240) * t;
  });
  const height = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.5, 1);
    return 66 + (vpRef.current.h - 66) * t;
  });
  const radius = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const topY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const botY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.46, 0.62], [0, 1]);
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
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[110px] whitespace-nowrap text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
        >
          with one click
        </motion.p>

        {/* expanding Create button → fullscreen panel */}
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-accent shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--shell)_70%,transparent)]"
        >
          {/* collapsed label */}
          <motion.span
            style={{ opacity: labelOpacity }}
            className="pointer-events-none inline-flex items-center gap-2 whitespace-nowrap px-6 text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl"
          >
            <Sparkles className="h-6 w-6" />
            Create
          </motion.span>

          {/* expanded experience */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="pointer-events-none absolute inset-0 bg-shell/70" />
            <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
                  <Sparkles className="h-3.5 w-3.5" /> AutoBooks AI
                </span>
                <h3 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Create anything with one click
                </h3>
              </div>

              {/* floating image cards looping left → right */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <div className="flex w-max animate-[card-marquee_34s_linear_infinite] gap-5 py-2">
                  {[...items, ...items].map((it, i) => {
                    const isActive = i % items.length === active;
                    return (
                      <div
                        key={i}
                        className={`relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl ring-1 transition-all duration-500 ${
                          isActive
                            ? "scale-105 ring-white/70 shadow-2xl"
                            : "scale-95 opacity-70 ring-white/10"
                        }`}
                      >
                        <img
                          src={it.img}
                          alt={it.label}
                          width={512}
                          height={640}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-shell/80 via-shell/10 to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {it.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ChatGPT-like AI textbox */}
              <div className="w-full max-w-2xl px-2">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-2.5 pl-4 backdrop-blur-md">
                  <Plus className="h-5 w-5 shrink-0 text-white/60" />
                  <div className="min-h-[1.5rem] flex-1 text-left text-sm text-white sm:text-base">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-block"
                    >
                      {items[active].prompt}
                      <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/80" />
                    </motion.span>
                  </div>
                  <button
                    type="button"
                    aria-label="Send prompt"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-shell"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}