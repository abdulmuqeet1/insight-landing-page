import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CreditCard,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  MailCheck,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GoogleIcon } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { plans, getPlan, type PlanId } from "@/lib/plans";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";

const searchSchema = z.object({
  plan: z.enum(["starter", "pro"]).optional(),
  verified: z.string().optional(),
});

export const Route = createFileRoute("/signup")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Create your account · AutoBooks" },
      {
        name: "description",
        content: "Start your 14-day AutoBooks free trial. Pick a plan and create your account.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const STEPS = ["Plan", "Your details", "Verify email", "Payment"] as const;

const accountSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(80),
    company: z.string().trim().min(1, "Enter your company name").max(100),
    email: z.string().trim().email("Enter a valid email address").max(255),
    password: z.string().min(8, "Password must be at least 8 characters").max(72),
  });

function SignupPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<PlanId>(search.plan ?? "pro");

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { loginWithGoogle, user } = useAuth();

  // Detect confirmed session
  useEffect(() => {
    if (user) {
      // If user is set via Google Auth
      if (search.verified) {
        setStep(3);
      } else {
        navigate({ to: "/dashboard" });
      }
      return;
    }

    const resume = (session: import("@supabase/supabase-js").Session | null) => {
      if (!session) return;
      if (search.verified) {
        const meta = session.user.user_metadata ?? {};
        if (meta.plan === "starter" || meta.plan === "pro") setPlan(meta.plan);
        if (session.user.email) setEmail(session.user.email);
        setStep(3);
      } else {
        navigate({ to: "/dashboard" });
      }
    };
    supabase.auth.getSession().then(({ data }) => resume(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => resume(session));
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        await loginWithGoogle(tokenResponse.access_token);
        toast.success("Account created successfully!");
        navigate({ to: "/dashboard" });
      } catch (error) {
        toast.error("Could not sign up with Google. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google sign up was canceled or failed.");
    }
  });

  async function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = accountSchema.safeParse({ fullName, company, email, password });
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/signup?verified=1`,
        data: {
          full_name: parsed.data.fullName,
          company: parsed.data.company,
          plan,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      toast.error("This email is already registered. Try logging in instead.");
      return;
    }
    setStep(2);
  }

  async function handleResend() {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/signup?verified=1` },
    });
    if (error) toast.error(error.message);
    else toast.success("Confirmation email sent again.");
  }

  async function handleCheckVerified() {
    setLoading(true);
    const { data } = await supabase.auth.getUser();
    setLoading(false);
    if (data.user?.email_confirmed_at) {
      setStep(3);
    } else {
      toast.info("We haven't received your confirmation yet. Please click the link in your email.");
    }
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight">AutoBooks</span>
        </Link>
        <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
          Already have an account?{" "}
          <span className="font-semibold text-primary">Log in</span>
        </Link>
      </header>

      <div className="mx-auto w-full max-w-2xl px-6 pb-20 pt-4 sm:px-8">
        <Stepper current={step} />

        <div className="mt-10">
          {step === 0 && (
            <StepPlan
              plan={plan}
              setPlan={setPlan}
              onNext={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <div>
              <StepHeading
                title="Create your account"
                subtitle={`You're starting the ${getPlan(plan).name} plan — 14-day free trial.`}
              />

              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full gap-2"
                onClick={() => handleGoogle()}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="h-4 w-4" />
                )}
                Sign up with Google
              </Button>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or sign up with email
                <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleAccountSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jordan Rivera"
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Rivera Studio"
                      autoComplete="organization"
                    />
                    {errors.company && (
                      <p className="text-xs text-destructive">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
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
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(0)}
                    className="gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="flex-1 gap-1" disabled={loading}>
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Create account
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  By continuing you agree to our Terms and Privacy Policy.
                </p>
              </form>
            </div>
          )}

          {step === 2 && (
            <StepVerify
              email={email}
              loading={loading}
              onResend={handleResend}
              onCheck={handleCheckVerified}
            />
          )}

          {step === 3 && <StepPayment plan={plan} onDone={() => navigate({ to: "/dashboard" })} />}
        </div>
      </div>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  done ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function StepPlan({
  plan,
  setPlan,
  onNext,
}: {
  plan: PlanId;
  setPlan: (p: PlanId) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        title="Choose your plan"
        subtitle="Every plan starts with a 14-day free trial. Switch or cancel anytime."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map((p) => {
          const selected = plan === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              className={cn(
                "relative flex flex-col rounded-2xl p-5 text-left transition-all",
                "soul-card hover:-translate-y-1",
                selected && "ring-2 ring-primary",
              )}
            >
              {p.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">{p.name}</h3>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border transition-colors",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <p className="mt-3 flex items-end gap-1">
                <span className="text-3xl font-extrabold tracking-tight">{p.price}</span>
                <span className="pb-1 text-xs text-muted-foreground">/month</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <Button className="mt-6 w-full gap-1" onClick={onNext}>
        Continue with {getPlan(plan).name} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function StepVerify({
  email,
  loading,
  onResend,
  onCheck,
}: {
  email: string;
  loading: boolean;
  onResend: () => void;
  onCheck: () => void;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <MailCheck className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight">Verify your email</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        We sent a confirmation link to{" "}
        <span className="font-semibold text-foreground">{email}</span>. Open it on this device to
        verify your address and continue to payment.
      </p>

      <div className="mx-auto mt-8 max-w-sm space-y-3">
        <Button className="w-full" onClick={onCheck} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          I&apos;ve confirmed my email
        </Button>
        <Button variant="outline" className="w-full" onClick={onResend}>
          Resend confirmation email
        </Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Wrong address? Check your spam folder or resend the email.
      </p>
    </div>
  );
}

function StepPayment({ plan, onDone }: { plan: PlanId; onDone: () => void }) {
  const selected = getPlan(plan);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function onNumber(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }
  function onExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const fe: Record<string, string> = {};
    if (name.trim().length < 2) fe.name = "Enter the name on the card";
    if (number.replace(/\s/g, "").length < 15) fe.number = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) fe.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(cvc)) fe.cvc = "3–4 digits";
    if (zip.trim().length < 3) fe.zip = "Required";
    setErrors(fe);
    if (Object.keys(fe).length > 0) return;
    setSubmitting(true);
    // UI only — no real charge. Simulate a brief processing moment.
    setTimeout(() => {
      toast.success("You're all set! Welcome to AutoBooks.");
      onDone();
    }, 700);
  }

  return (
    <div>
      <StepHeading
        title="Add a payment method"
        subtitle="You won't be charged during your 14-day free trial. Cancel anytime before it ends."
      />

      <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3 text-sm">
        <span className="font-medium">{selected.name} plan</span>
        <span className="text-muted-foreground">
          {selected.price}/month after trial
        </span>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="cardName">Name on card</Label>
          <Input
            id="cardName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Rivera"
            autoComplete="cc-name"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cardNumber">Card number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              value={number}
              onChange={(e) => onNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
              autoComplete="cc-number"
              className="pl-10"
            />
            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="expiry">Expiry</Label>
            <Input
              id="expiry"
              value={expiry}
              onChange={(e) => onExpiry(e.target.value)}
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
            />
            {errors.expiry && <p className="text-xs text-destructive">{errors.expiry}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
            {errors.cvc && <p className="text-xs text-destructive">{errors.cvc}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="zip">ZIP</Label>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="94107"
              inputMode="numeric"
              autoComplete="postal-code"
            />
            {errors.zip && <p className="text-xs text-destructive">{errors.zip}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full gap-1" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Start free trial
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Your details are encrypted and secure.
        </p>
      </form>
    </div>
  );
}