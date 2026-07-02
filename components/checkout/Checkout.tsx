"use client";

import { ArrowRight, BadgeCheck, Lock, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { enrollInCourse } from "@/lib/enrollment";
import { courses, type CourseItem } from "@/lib/landing-data";
import { clearPendingEnrollment } from "@/lib/pendingEnrollment";
import { formatINR, toAmount } from "@/lib/pricing";

export default function Checkout() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseItem | null | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("course");
    setCourse(courses.find((c) => c.slug === slug) ?? null);
  }, []);

  function handleCompletePurchase() {
    if (!course) return;
    setProcessing(true);
    // Simulate a payment round-trip — no real payment gateway wired up yet.
    setTimeout(() => {
      enrollInCourse(course.slug);
      clearPendingEnrollment();
      router.push("/dashboard");
    }, 900);
  }

  if (course === undefined) return null;

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-5">
        <div className="max-w-sm text-center">
          <p className="mb-4 text-[15px] font-semibold text-ink">
            We couldn&apos;t find that course.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-5 py-2.5 text-[13.5px] font-bold text-white shadow-md transition hover:-translate-y-0.5"
          >
            Back to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isFree = course.price === "Free";
  const total = isFree ? 0 : toAmount(course.price);
  const original = course.originalPrice ? toAmount(course.originalPrice) : null;
  const savings = original ? original - total : 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        <div className="border-b border-line px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-green-700">
            Checkout
          </p>
          <h1 className="mt-0.5 text-[18px] font-extrabold leading-tight text-ink">
            {course.title}
          </h1>
        </div>

        <div className="px-5 py-4">
          <div className="space-y-3 text-[13.5px]">
            <div className="flex items-center justify-between">
              <span className="text-muted">Course fee</span>
              <span className="font-semibold text-ink">
                {isFree ? "Free" : formatINR(original ?? total)}
              </span>
            </div>

            {savings > 0 && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted">
                  <Sparkles className="h-3.5 w-3.5 text-green-600" />
                  Discount
                </span>
                <span className="font-semibold text-green-700">− {formatINR(savings)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-muted">Platform fee</span>
              <span className="font-semibold text-green-700">₹0</span>
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-line pt-4">
            <span className="text-[14px] font-bold text-ink">Total payable</span>
            <span className="text-[24px] font-extrabold leading-none text-ink">
              {isFree ? "Free" : formatINR(total)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-line px-5 py-3 text-[11.5px] text-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            Secure
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
            Lifetime access
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-green-600" />
            Encrypted
          </span>
        </div>

        <div className="border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={handleCompletePurchase}
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-3.5 text-[14.5px] font-extrabold text-white shadow-[0_6px_18px_-6px_var(--green-600)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {processing ? "Processing…" : "Complete Purchase"}
          </button>
          <p className="mt-2.5 text-center text-[11.5px] text-muted">
            {isFree ? "No credit card required" : "One-time payment · 7-day money-back guarantee"}
          </p>
        </div>
      </div>
    </div>
  );
}
