import { motion } from "motion/react";

const testimonials = [
  { text: "Before Wize Accounts, invoicing and expense tracking were spread across too many tools. Now we can see what is paid, pending, and overdue in one place.", name: "Operations Lead", role: "Studio of 8" },
  { text: "Creating documents and tracking payments is much faster. The dashboard gives us the financial overview we used to build manually.", name: "Founder", role: "Agency" },
  { text: "Wize Accounts makes it easier to keep customer records, invoices, and reports organized without needing a complex accounting setup.", name: "Owner", role: "Retail business" },
  { text: "The AI assistant helps draft and organize work faster, but we still review everything before saving. That balance matters.", name: "Finance Manager", role: "Services firm" },
  { text: "We finally have one place for invoices, expenses and reports. Our monthly review takes a fraction of the time.", name: "Co-founder", role: "Consultancy" },
  { text: "Branded PDF templates made our invoices look professional from day one. Customers notice.", name: "Director", role: "Logistics" },
];

function Column({ items, duration }: { items: typeof testimonials; duration: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-col"
      >
        {/* duplicated set; each card carries its own bottom spacing so the
            seam between the two copies is perfectly uniform = seamless loop */}
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="mb-5 soul-card p-6"
          >
            <p className="text-sm text-foreground/85">"{t.text}"</p>
            <div className="mt-4">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
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
        <div className="mx-auto mb-4 inline-block rounded-full border border-border bg-card px-4 py-1 text-sm">
          Testimonials
        </div>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          What teams say about Wize Accounts
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] md:grid-cols-2 lg:grid-cols-3 max-h-[640px]">
        <Column items={testimonials.slice(0, 2)} duration={20} />
        <Column items={testimonials.slice(2, 4)} duration={26} />
        <div className="hidden lg:block">
          <Column items={testimonials.slice(4, 6)} duration={23} />
        </div>
      </div>
    </section>
  );
}
