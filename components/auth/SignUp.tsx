"use client";

import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import FormField from "@/components/auth/FormField";
import SignupScene from "@/components/auth/SignupScene";
import { setLoggedIn } from "@/lib/auth";
import { isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/validators";

type Field = "firstName" | "lastName" | "email" | "password" | "confirmPassword";
type Errors = Partial<Record<Field, string>>;

export default function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: Field) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const validate = (): Errors => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    const next: Errors = {};

    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";

    if (!email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Enter a valid email address.";

    if (!password) next.password = "Create a password.";
    else if (password.length < MIN_PASSWORD_LENGTH) next.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;

    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";

    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // TODO: wire to real auth API. For now, mark the session as signed in and
    // return the user wherever they came from (e.g. the course they were buying).
    setLoggedIn();
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    router.push(redirect || "/");
  };

  return (
    <AuthShell
      activeTab="signup"
      title="Start your learning journey"
      subtitle="Create your free account and unlock a world of knowledge."
      scene={<SignupScene />}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="First name"
            placeholder="Ahmad"
            autoComplete="given-name"
            icon={User}
            value={values.firstName}
            onChange={setField("firstName")}
            error={errors.firstName}
          />
          <FormField
            id="lastName"
            label="Last name"
            placeholder="Raza"
            autoComplete="family-name"
            icon={User}
            value={values.lastName}
            onChange={setField("lastName")}
            error={errors.lastName}
          />
        </div>

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
          label="Create password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          icon={Lock}
          value={values.password}
          onChange={setField("password")}
          error={errors.password}
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          icon={Lock}
          value={values.confirmPassword}
          onChange={setField("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={submitting}
          className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_26px_-12px_var(--green-600)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Creating account…" : "Create Free Account"}
          {!submitting && (
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </button>

        <p className="text-center text-[12.5px] leading-5 text-muted">
          By creating an account you agree to our{" "}
          <Link href="/" className="font-semibold text-green-700 hover:underline">Terms</Link> and{" "}
          <Link href="/" className="font-semibold text-green-700 hover:underline">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
