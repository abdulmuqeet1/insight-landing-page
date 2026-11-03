export type PlanId = "starter" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  priceValue: number;
  annualPrice: string;
  annualPriceValue: number;
  idealFor: string;
  desc: string;
  popular?: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$15",
    priceValue: 15,
    annualPrice: "$12",
    annualPriceValue: 144,
    idealFor: "Freelancers, solo consultants, and early-stage small businesses",
    desc: "Everything you need to invoice, record expenses, and stay organized.",
    features: [
      "Unlimited branded Invoices and Quotations",
      "Customer & Vendor management (up to 100 contacts)",
      "Expense tracking & receipt attachment storage",
      "Live Cash Flow & Revenue dashboard",
      "Core Financial Statements (P&L, Balance Sheet, AR/AP Aging)",
      "Custom PDF visual invoice template builder",
      "CSV/Excel data import & export",
      "Wize AI Assistant (standard usage credits)",
      "Single user account with secure session auth",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$39",
    priceValue: 39,
    annualPrice: "$31",
    annualPriceValue: 372,
    idealFor: "Growing businesses, agencies, service firms, and multi-team operations",
    desc: "Complete accounting engine with bank sync, inventory, and multi-currency.",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Unlimited customers, vendors, and transactions",
      "Automated Bank Feeds & Statement Reconciliation (Plaid)",
      "Full Double-Entry General Ledger & Period Closing Locks",
      "Multi-Currency engine with automatic FX revaluation",
      "Perpetual FIFO Inventory tracking & COGS accounting",
      "Multi-User collaboration with Role-Based Access (Admin, Accountant, Staff, Viewer)",
      "Advanced multi-dimensional tagging (Class & Location tracking)",
      "Priority AI Bookkeeper usage (OCR receipt scanning & anomaly audits)",
      "Dedicated data migration hub (QuickBooks & Xero staged import)",
      "Priority customer support & direct accountant invite",
    ],
  },
];

export function getPlan(id: string | null | undefined): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}
