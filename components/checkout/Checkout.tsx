"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutBill from "@/components/checkout/CheckoutBill";
import { courses, type CourseItem } from "@/lib/landing-data";

// Full-page checkout — the landing spot for deep-links (/checkout?course=X) and
// the post-login "resume my purchase" redirect. Shares CheckoutBill with the
// in-context CheckoutModal so there is only ever one bill implementation.
export default function Checkout() {
  const [course, setCourse] = useState<CourseItem | null | undefined>(undefined);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("course");
    setCourse(courses.find((c) => c.slug === slug) ?? null);
  }, []);

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

        {/* Shared bill body */}
        <CheckoutBill course={course} />
      </div>
    </div>
  );
}
