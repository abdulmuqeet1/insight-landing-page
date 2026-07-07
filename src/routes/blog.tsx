import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AutoBooks" },
      {
        name: "description",
        content:
          "Guides, product updates and finance tips for small teams from the AutoBooks team. Fresh articles coming soon.",
      },
      { property: "og:title", content: "Blog — AutoBooks" },
      {
        property: "og:description",
        content:
          "Guides, product updates and finance tips for small teams from the AutoBooks team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "AutoBooks Blog",
          description:
            "Guides, product updates and finance tips for small teams from the AutoBooks team.",
          url: "/blog",
          publisher: { "@type": "Organization", name: "AutoBooks" },
        }),
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <main className="[overflow-x:clip]">
      <SmoothScroll />
      <Navbar />

      <section className="px-6 pt-36 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-block rounded-full border border-border bg-card px-4 py-1 text-sm">
            Blog
          </div>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            The AutoBooks blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            Guides, product updates and finance tips for small teams. We're
            working on our first articles — check back soon.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="soul-card flex flex-col items-center gap-4 p-12 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Newspaper className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-bold">No posts yet</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Our team is writing the first stories on invoicing, expenses,
              reporting and running finances for modern small teams. Stay tuned.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}