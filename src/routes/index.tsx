import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { AdminSavings } from "@/components/landing/AdminSavings";
import { Modules } from "@/components/landing/Modules";
import { AISection } from "@/components/landing/AISection";
import { ReportsSection } from "@/components/landing/ReportsSection";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoBooks — The business finance stack for modern small teams" },
      {
        name: "description",
        content:
          "Create invoices, track expenses, manage customers and vendors, record payments, and understand your business from one clean accounting workspace.",
      },
      { property: "og:title", content: "AutoBooks — Accounting workspace for small teams" },
      {
        property: "og:description",
        content:
          "Invoices, payments, expenses, customers, vendors, reports, and AI-assisted workflows in one connected accounting workspace.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <Features />
      <AdminSavings />
      <Modules />
      <AISection />
      <ReportsSection />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
