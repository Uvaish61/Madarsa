"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import FormField from "@/components/auth/FormField";
import { isValidEmail } from "@/lib/validators";

type Field = "email" | "password";
type Errors = Partial<Record<Field, string>>;

export default function Login() {
  const router = useRouter();
  const [values, setValues] = useState<Record<Field, string>>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: Field) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const validate = (): Errors => {
    const { email, password } = values;
    const next: Errors = {};

    if (!email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Enter a valid email address.";

    if (!password) next.password = "Password is required.";

    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // TODO: wire to real auth API. For now, send the user on to the app.
    router.push("/");
  };

  return (
    <AuthShell
      activeTab="login"
      title="Welcome back"
      subtitle="Sign in to pick up where you left off and keep building."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={Mail}
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          icon={Lock}
          value={values.password}
          onChange={setField("password")}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13.5px] font-semibold text-muted">
            <input type="checkbox" className="h-4 w-4 rounded border-line accent-green-600" />
            Remember me
          </label>
          <Link href="/" className="text-[13.5px] font-bold text-green-700 hover:text-green-800">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_26px_-12px_var(--green-600)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Signing in…" : "Sign In"}
          {!submitting && (
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </button>
      </form>
    </AuthShell>
  );
}
