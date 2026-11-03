import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { CompetitiveEdge } from "@/components/landing/CompetitiveEdge";
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
      { title: "Wize Accounts — The modern accounting workspace built for fast-moving businesses" },
      {
        name: "description",
        content:
          "Create branded invoices, track bills and expenses, sync bank transactions, manage inventory, and generate accountant-ready financial statements in seconds—powered by an autonomous AI bookkeeper.",
      },
      {
        property: "og:title",
        content: "Wize Accounts — The modern accounting workspace built for fast-moving businesses",
      },
      {
        property: "og:description",
        content:
          "Create branded invoices, track bills and expenses, sync bank transactions, manage inventory, and generate accountant-ready financial statements in seconds.",
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
            "The modern accounting workspace built for fast-moving businesses. Create branded invoices, track bills, sync bank transactions, and generate accountant-ready statements.",
          offers: {
            "@type": "Offer",
            price: "15",
            priceCurrency: "USD",
            description: "14-day free trial on all plans",
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
      <CompetitiveEdge />
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
