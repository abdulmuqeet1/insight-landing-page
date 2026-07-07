import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "What is AutoBooks?",
    a: "AutoBooks is a clean accounting workspace for small teams. Create invoices, track expenses, manage customers and vendors, record payments, organize documents, and understand your numbers — all in one connected place instead of scattered spreadsheets and tools.",
  },
  {
    q: "Do I need accounting experience to use it?",
    a: "No. AutoBooks is built for founders and small teams, not accountants. The workflows guide you through invoicing, expenses and reports with plain language, so you can stay on top of your finances without a bookkeeping background.",
  },
  {
    q: "Does AutoBooks replace my accountant?",
    a: "It doesn't replace them — it makes working with them easier. AutoBooks keeps your invoices, expenses and records organized and export-ready, so handoffs and conversations with your accountant are faster and based on up-to-date information.",
  },
  {
    q: "How does the AI assistant work?",
    a: "The AI assistant helps you draft invoices, categorize expenses and organize records faster. It suggests and speeds up the busywork, but you always review everything before it's saved — you stay in control of your books.",
  },
  {
    q: "Is my financial data secure?",
    a: "Security is a priority. Your data is encrypted in transit and at rest, access is scoped to your workspace, and we follow industry best practices to keep your business information private and protected.",
  },
  {
    q: "Can I create professional, branded invoices?",
    a: "Yes. AutoBooks includes branded PDF invoice templates so your documents look professional from day one. You can track what's paid, pending and overdue from a single dashboard.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — you can start with a 14-day free trial, no credit card required to explore the product. Cancel anytime.",
  },
  {
    q: "Can I import my existing data?",
    a: "Yes. You can bring in your existing customers, vendors and records so you don't have to start from scratch when moving to AutoBooks.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-block rounded-full border border-border bg-card px-4 py-1 text-sm">
            FAQ
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Everything you need to know about AutoBooks. Can't find an answer?
            Reach out and our team will help.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="soul-card border-none px-5"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}