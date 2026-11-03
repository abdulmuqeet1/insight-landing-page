import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout, GoogleIcon } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Log in · Wize Accounts" },
      { name: "description", content: "Log in to your Wize Accounts accounting workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

function safeRedirect(path: string | undefined): string {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return "/dashboard";
}

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { loginWithGoogle, user } = useAuth();

  const dest = safeRedirect(redirect);

  // Already signed in → go to destination
  useEffect(() => {
    if (user) navigate({ to: dest });
  }, [user, dest, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fieldErrors[i.path[0] as string] = i.message));
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast.error(
        error.message.includes("Invalid login")
          ? "Incorrect email or password."
          : error.message,
      );
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: dest });
  }

  const handleGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        await loginWithGoogle(tokenResponse.access_token);
        toast.success("Welcome back!");
        navigate({ to: dest });
      } catch (error) {
        toast.error("Could not sign in with Google. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login was canceled or failed.");
    }
  });

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your Wize Accounts workspace.">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={() => handleGoogle()}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
        Continue with Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or log in with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Start free trial
        </Link>
      </p>
    </AuthLayout>
  );
}