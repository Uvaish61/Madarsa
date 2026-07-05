import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page not found · Madarsa Tech Academy",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-[0_12px_28px_-10px_var(--green-600)]">
          <Compass className="h-8 w-8" />
        </div>
        <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-green-700">
          404
        </p>
        <h1 className="mt-1 text-[26px] font-extrabold leading-tight text-ink">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-6 py-3 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_var(--green-600)] transition hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
