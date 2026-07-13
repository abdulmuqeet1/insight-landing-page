export type PlanId = "starter" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  priceValue: number;
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
    desc: "Best for getting started",
    features: [
      "Invoicing and payments",
      "Customers and vendors",
      "Expenses and bills",
      "Financial dashboard",
      "AI assistant access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$39",
    priceValue: 39,
    desc: "Best value for growing businesses",
    popular: true,
    features: [
      "Everything in Starter",
      "Advanced PDF templates",
      "User roles and permissions",
      "Advanced reports",
      "Priority support",
    ],
  },
];

export function getPlan(id: string | null | undefined): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}