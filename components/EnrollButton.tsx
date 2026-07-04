"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import { useAuth } from "@/context/AuthContext";
import { courses, type Locale } from "@/lib/landing-data";
import { setPendingEnrollment } from "@/lib/pendingEnrollment";

const DEFAULT_CLASSES =
  "flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-2.5 text-[12.5px] font-bold text-white shadow-[0_5px_14px_-5px_var(--green-600)] transition-all duration-200 hover:shadow-[0_8px_20px_-6px_var(--green-600)] hover:opacity-95";

export default function EnrollButton({
  courseId,
  price,
  locale,
  className,
}: {
  courseId: string;
  price: string;
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const isFree = price === "Free";
  const label =
    locale === "en"
      ? isFree ? "Enroll Free" : "Enroll Now"
      : isFree ? "مفت داخلہ" : "ابھی داخلہ";

  const course = courses.find((c) => c.slug === courseId);

  function handleClick() {
    if (!user) {
      // Not signed in — remember what they were buying and come back to checkout after.
      setPendingEnrollment({ courseId, price });
      router.push("/login?redirect=checkout");
      return;
    }
    // Signed in — open the checkout as a popup over the blurred page instead of
    // navigating away to a separate /checkout screen.
    setCheckoutOpen(true);
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className ?? DEFAULT_CLASSES}>
        {label}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>

      {course && (
        <CheckoutModal
          course={course}
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
