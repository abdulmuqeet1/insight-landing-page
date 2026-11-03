import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "What makes Wize Accounts different from basic invoicing tools?",
    a: 'Many modern apps are just "invoice makers" that don\'t keep real accounting records. Wize Accounts is a full double-entry accounting engine. Every invoice, expense, bill, or payment you record automatically posts balanced debits and credits to your General Ledger. You get a sleek, fast user experience without sacrificing the rigorous math your accountant requires.',
  },
  {
    q: "Do I need prior accounting experience to use Wize Accounts?",
    a: "Not at all. We designed Wize Accounts for business owners and operators, not just CPAs. Everyday workflows—like creating an invoice, recording an expense, or checking who owes you money—are intuitive and straightforward. The complex double-entry mechanics run silently behind the scenes.",
  },
  {
    q: "Does Wize Accounts replace my accountant?",
    a: 'No, it makes working with your accountant 10x faster and cheaper. Instead of handing your accountant messy spreadsheets and shoeboxes of receipts at tax time, you can grant them direct "Accountant" role access or export clean, standardized financial reports (P&L, Balance Sheet, General Ledger, Tax Summaries) in seconds.',
  },
  {
    q: "How does the AI Assistant work and is it reliable?",
    a: "Wize Accounts AI utilizes state-of-the-art LLMs (powered by Google Gemini and OpenAI) equipped with structured function calling. It reads your organization’s real-time financial context to perform bookkeeping actions like drafting invoices, parsing receipts, detecting anomalies, or summarizing reports. Crucially, the AI never blindly writes to your ledger without human review—every action is staged for your confirmation.",
  },
  {
    q: "Is my financial data secure and private?",
    a: "Yes. We enforce industry-standard 256-bit encryption in transit and at rest. Your organizational data is strictly isolated with role-based access controls (RBAC) and comprehensive audit logging. We never sell your business data, and your financial data is never used to train public machine learning models.",
  },
  {
    q: "Can I customize my invoice designs and templates?",
    a: "Absolutely. Our visual PDF template editor lets you upload your company logo, set your primary and accent brand colors, select custom typography, and configure table columns, payment instructions, and custom terms. All quotes, sales orders, purchase orders, and invoices will reflect your corporate identity.",
  },
  {
    q: "Can I import my existing data from QuickBooks, Xero, or spreadsheets?",
    a: "Yes. Wize Accounts includes a built-in Data Migration Hub. You can upload CSV, Excel, QuickBooks, or Xero export files. Our system provides a staged preview screen that validates your Chart of Accounts, Customers, Vendors, and opening balances before committing them to the database, ensuring a seamless migration with zero data loss.",
  },
  {
    q: "What happens after the 14-day free trial?",
    a: "You have full access to all features during your 14-day trial without needing to enter a credit card. At the end of the trial, you can choose either the Starter or Pro plan. If you choose not to subscribe, your account will simply pause—your records remain safe, and you can export your data at any time.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto mb-3 inline-block rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            FAQ
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground text-sm sm:text-base leading-relaxed">
            Everything you need to know about Wize Accounts. Need more help? Our team is always
            here.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3.5">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="soul-card border-none px-6 py-1">
              <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pt-1 pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
