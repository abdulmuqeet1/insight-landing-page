import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Wize Accounts" },
      {
        name: "description",
        content:
          "Why we built Wize Accounts: a connected accounting workspace for small teams and founders who want to stay on top of their finances without drowning in admin.",
      },
      { property: "og:title", content: "Our Story — Wize Accounts" },
      {
        property: "og:description",
        content:
          "Why we built Wize Accounts: one connected workspace for invoices, expenses, payments and reports — so your business explains itself as it runs.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/our-story" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Our Story — Wize Accounts",
          description:
            "Why we built Wize Accounts: a connected accounting workspace for small teams.",
          url: "/our-story",
          publisher: {
            "@type": "Organization",
            name: "Wize Accounts",
          },
        }),
      },
    ],
  }),
  component: OurStory,
});

const sections = [
  {
    title: "The problem",
    body: [
      "Running a business used to mean building a team. Today, more small teams and solo founders operate real companies with just a handful of people. Automation and the internet make it possible to sell, deliver and operate a business without a big back office.",
      "But most finance tools still assume you have one. Invoicing lives in one place. Expenses in another. Receipts end up scattered across inboxes and folders, and transactions sit inside separate dashboards. To understand how your business is actually doing, you have to jump between tools, reconcile numbers by hand and piece the story together yourself.",
      "For a small team, that overhead adds up fast. You're not lacking information — you're lacking a system that keeps everything connected.",
    ],
  },
  {
    title: "The idea",
    body: [
      "We didn't want to build yet another finance tool. We wanted to build a workspace where everything stays connected without you having to hold it together.",
      "Wize Accounts keeps the moving parts of your business — invoices, payments, expenses, customers, vendors and documents — in one place, reflecting what's actually happening. Instead of forcing you to pull information out, it surfaces the right information at the right time: what's paid, what's pending, what's overdue and what needs your attention.",
      "It doesn't replace your accountant. It sits in between and keeps everything organized and export-ready, so conversations are easier and decisions are based on up-to-date numbers.",
    ],
  },
  {
    title: "What we're focused on",
    body: [
      "Wize Accounts is built for founders and small teams who run real businesses and want to stay on top of their finances without spending their days managing admin.",
      "We focus on reducing manual, repetitive work, keeping business data consistent and reliable, and making it easy to understand what's happening and why. Where AI helps, it drafts and speeds up the busywork — but you always stay in control and review before anything is saved.",
      "Our goal is simple: your business should stay organized and explain itself as it runs.",
    ],
  },
];

function OurStory() {
  return (
    <main className="[overflow-x:clip]">
      <SmoothScroll />
      <Navbar />

      <section className="px-6 pt-36 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-block rounded-full border border-border bg-card px-4 py-1 text-sm">
            Our Story
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Why we started Wize Accounts
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            Small teams deserve finance software that works quietly in the
            background — keeping everything connected so you can focus on the
            business, not the admin.
          </p>
        </div>
      </section>

      <article className="px-6 pb-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((s) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="soul-card p-7 sm:p-9"
            >
              <h2 className="text-2xl font-bold tracking-tight">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center">
            <p className="text-lg font-semibold">
              Your business should stay organized and explain itself as it runs.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">— The Wize Accounts team</p>
            <div className="mt-8">
              <Button size="lg" className="group rounded-full px-6" asChild>
                <Link to="/">
                  Explore Wize Accounts
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}