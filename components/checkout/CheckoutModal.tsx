"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CheckoutBill from "@/components/checkout/CheckoutBill";
import type { CourseItem } from "@/lib/landing-data";

export default function CheckoutModal({
  course,
  open,
  onClose,
}: {
  course: CourseItem;
  open: boolean;
  onClose: () => void;
}) {
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

        {/* Shared bill body */}
        <CheckoutBill course={course} />
      </div>
    </div>,
    document.body
  );
}
