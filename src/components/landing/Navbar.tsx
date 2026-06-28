import { useEffect, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-4xl items-center justify-between gap-2 rounded-full px-3 py-2 transition-all duration-300",
          "bg-shell text-shell-foreground shadow-lg shadow-shell/20 ring-1 ring-white/10",
          scrolled && "backdrop-blur-md",
        )}
      >
        <a href="#top" className="flex shrink-0 items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold tracking-tight">AutoBooks</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-shell-foreground/80 transition-colors hover:bg-white/10 hover:text-shell-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            className="rounded-full px-3 py-1.5 text-sm text-shell-foreground/80 transition-colors hover:text-shell-foreground"
          >
            Login
          </a>
          <Button size="sm" className="rounded-full" asChild>
            <a href="#pricing">Start free trial</a>
          </Button>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-20 rounded-2xl bg-shell p-3 text-shell-foreground shadow-xl ring-1 ring-white/10 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
          <Button className="mt-2 w-full rounded-full" asChild>
            <a href="#pricing">Start free trial</a>
          </Button>
        </div>
      )}
    </header>
  );
}
