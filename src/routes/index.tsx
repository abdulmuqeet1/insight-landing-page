import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { CreateWithAI } from "@/components/landing/CreateWithAI";
import { AdminSavings } from "@/components/landing/AdminSavings";
import { Modules } from "@/components/landing/Modules";
import { AISection } from "@/components/landing/AISection";
import { ReportsSection } from "@/components/landing/ReportsSection";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ, faqs } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SiteFooter } from "@/components/landing/SiteFooter";
import dashboardWebp from "@/assets/wizeaccounts-dashboard.png?format=webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wize Accounts — The business finance stack for modern small teams" },
      {
        name: "description",
        content:
          "Create invoices, track expenses, manage customers and vendors, record payments, and understand your business from one clean accounting workspace.",
      },
      { property: "og:title", content: "Wize Accounts — Accounting workspace for small teams" },
      {
        property: "og:description",
        content:
          "Invoices, payments, expenses, customers, vendors, reports, and AI-assisted workflows in one connected accounting workspace.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      // Preload the hero screenshot (the LCP element) so it starts fetching
      // before the component tree hydrates.
      { rel: "preload", as: "image", href: dashboardWebp, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Wize Accounts",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Wize Accounts is a clean accounting workspace for small teams: invoices, expenses, payments, customers, vendors, reports and AI-assisted workflows.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "14-day free trial",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="[overflow-x:clip]">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <Features />
      <CreateWithAI />
      <AdminSavings />
      <Modules />
      <AISection />
      <ReportsSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
