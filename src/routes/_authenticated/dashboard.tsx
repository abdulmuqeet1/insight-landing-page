import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, LogOut, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Wize Accounts" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("full_name, company, plan")
        .eq("id", user.id)
        .maybeSingle();
      return { email: user.email, ...data };
    },
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  }

  const name = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight">Wize Accounts</span>
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">
          Hi {name} 👋
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Your Wize Accounts workspace is ready. This is where your dashboard, invoices and reports
          will live.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="soul-card p-5">
            <p className="text-xs text-muted-foreground">Company</p>
            <p className="mt-1 font-semibold">{profile?.company ?? "—"}</p>
          </div>
          <div className="soul-card p-5">
            <p className="text-xs text-muted-foreground">Current plan</p>
            <p className="mt-1 font-semibold capitalize">{profile?.plan ?? "starter"}</p>
          </div>
          <div className="soul-card p-5">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="mt-1 truncate font-semibold">{profile?.email ?? "—"}</p>
          </div>
        </div>

        <div className="mt-8 soul-card flex items-center justify-between p-6">
          <div>
            <h2 className="font-semibold">Finish setting up your workspace</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first invoice, connect a bank account, and invite your team.
            </p>
          </div>
          <Button className="gap-1">
            Get started <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}