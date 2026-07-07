"use client";

// ─── Shared checkout bill ─────────────────────────────────────────────────────
// The single source of truth for the order summary + purchase action. Rendered
// inside two shells: CheckoutModal (portal popup) and the /checkout page (deep-
// link / post-login resume). No standalone bill logic lives anywhere else.

import { BadgeCheck, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addEnrollment } from "@/lib/app-store";
import type { CourseItem } from "@/lib/landing-data";
import { clearPendingEnrollment } from "@/lib/pendingEnrollment";
import { formatINR, toAmount } from "@/lib/pricing";

export default function CheckoutBill({ course }: { course: CourseItem }) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const isFree = course.price === "Free";
  const total = isFree ? 0 : toAmount(course.price);
  const original = course.originalPrice ? toAmount(course.originalPrice) : null;
  const savings = original ? original - total : 0;

  function handleCompletePurchase() {
    setProcessing(true);
    // Simulate a payment round-trip — no real payment gateway wired up yet.
    setTimeout(() => {
      addEnrollment(course.slug);
      clearPendingEnrollment();
      router.push("/dashboard");
    }, 900);
  }

  return (
    <>
      {/* Bill lines */}
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

        {savings > 0 && (
          <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-center text-[12px] font-bold text-green-700 ring-1 ring-green-100">
            You save {formatINR(savings)} on this course
          </p>
        )}
      </div>

      {/* Trust row */}
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

      {/* Complete purchase */}
      <div className="border-t border-line px-5 py-4">
        <button
          type="button"
          onClick={handleCompletePurchase}
          disabled={processing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-3.5 text-[14.5px] font-extrabold text-white shadow-[0_6px_18px_-6px_var(--green-600)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? "Processing…" : isFree ? "Enroll for Free" : "Complete Purchase"}
        </button>
        <p className="mt-2.5 text-center text-[11.5px] text-muted">
          {isFree ? "No credit card required" : "One-time payment · 7-day money-back guarantee"}
        </p>
      </div>
    </>
  );
}
