"use client";

import { BadgeCheck, Lock, ShieldCheck, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { enrollInCourse } from "@/lib/enrollment";
import type { CourseItem } from "@/lib/landing-data";
import { clearPendingEnrollment } from "@/lib/pendingEnrollment";
import { formatINR, toAmount } from "@/lib/pricing";

export default function CheckoutModal({
  course,
  open,
  onClose,
}: {
  course: CourseItem;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available in the browser.
  useEffect(() => setMounted(true), []);

  // Close on Escape + lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const isFree = course.price === "Free";
  const total = isFree ? 0 : toAmount(course.price);
  const original = course.originalPrice ? toAmount(course.originalPrice) : null;
  const savings = original ? original - total : 0;

  function handleCompletePurchase() {
    setProcessing(true);
    // Simulate a payment round-trip — no real payment gateway wired up yet.
    setTimeout(() => {
      enrollInCourse(course.slug);
      clearPendingEnrollment();
      router.push("/dashboard");
    }, 900);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={onClose} />

      {/* Checkout card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-green-700">
              Checkout
            </p>
            <h3 className="mt-0.5 text-[18px] font-extrabold leading-tight text-ink">
              {course.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-1.5 text-muted transition hover:bg-paper-2 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
            {processing ? "Processing…" : "Complete Purchase"}
          </button>
          <p className="mt-2.5 text-center text-[11.5px] text-muted">
            {isFree ? "No credit card required" : "One-time payment · 7-day money-back guarantee"}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
