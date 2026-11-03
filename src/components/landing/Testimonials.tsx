import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Before Wize Accounts, we wasted hours bouncing between spreadsheet templates, manual invoice numbering, and our bank portal. Now our quotes turn into invoices with one click, and bank reconciliation takes five minutes at the end of the week.",
    name: "Marcus Vance",
    role: "Founder at Studio Apex (Design Agency, 12 employees)",
  },
  {
    text: "Most modern accounting tools are either toy invoice generators with no real ledger, or bloated 15-year-old software that costs a fortune. Wize Accounts strikes the perfect balance: a beautiful modern UI backed by a genuine, balanced double-entry ledger.",
    name: "Elena Rostova",
    role: "Operations Director at Northwind Logistics",
  },
  {
    text: "The AI assistant is shockingly capable. I uploaded a batch of vendor receipts, and it accurately extracted the vendor, date, line items, and tax, then staged them for my approval. It feels like having a junior bookkeeper on staff.",
    name: "Tariq Al-Mansoor",
    role: "Managing Partner at Horizon Ventures",
  },
  {
    text: "Our accountant was skeptical when we told him we were switching away from QuickBooks. But when he saw the clean Trial Balance, proper period lock dates, and balanced P&L exports, he was blown away. Year-end taxes were painless.",
    name: "Sarah Jenkins",
    role: "Co-Founder at Craft & Code Labs",
  },
  {
    text: "We do business in both USD and Euros. Having live exchange rates and automatic unrealized FX revaluation built into our regular dashboard saved us thousands in foreign exchange reporting errors.",
    name: "Liam O'Connor",
    role: "Managing Director at GlobalRoute Media",
  },
  {
    text: "The branded PDF invoice builder made our billing look like an enterprise company from day one. Clients consistently comment on how clean and clear our invoices and payment instructions look.",
    name: "Priya Sharma",
    role: "Principal Consultant at Elevate Advisory",
  },
];

function Column({ items, duration }: { items: typeof testimonials; duration: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-col"
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="mb-5 soul-card p-6 border border-border/40 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-foreground/85">"{t.text}"</p>
            <div className="mt-4 border-t border-border/40 pt-3">
              <p className="text-xs sm:text-sm font-bold text-foreground">{t.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t.role}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          CUSTOMER STORIES
        </div>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Trusted by founders, agency leads, and finance teams
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
          See why modern businesses choose Wize Accounts over clunky legacy software.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] md:grid-cols-2 lg:grid-cols-3 max-h-[640px]">
        <Column items={testimonials.slice(0, 2)} duration={28} />
        <Column items={testimonials.slice(2, 4)} duration={32} />
        <div className="hidden lg:block">
          <Column items={testimonials.slice(4, 6)} duration={30} />
        </div>
      </div>
    </section>
  );
}
