"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  GraduationCap,
  LogOut,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseCard from "@/components/dashboard/CourseCard";
import StatCard from "@/components/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { enrollInCourse, getEnrolledSlugs } from "@/lib/enrollment";
import { courses, type CourseItem } from "@/lib/landing-data";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [ready, setReady] = useState(false);
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([]);
  const [pendingCourse, setPendingCourse] = useState<CourseItem | null>(null);

  // Auth itself is guarded by <ProtectedRoute> in app/dashboard/page.tsx — this
  // only needs to load this page's own data once mounted.
  useEffect(() => {
    const pendingSlug = new URLSearchParams(window.location.search).get("pending");
    const alreadyEnrolled = getEnrolledSlugs();
    if (pendingSlug && !alreadyEnrolled.includes(pendingSlug)) {
      const course = courses.find((c) => c.slug === pendingSlug);
      if (course) setPendingCourse(course);
    }

    setEnrolledSlugs(alreadyEnrolled);
    setReady(true);
  }, []);

  function confirmPendingEnroll() {
    if (!pendingCourse) return;
    enrollInCourse(pendingCourse.slug);
    setEnrolledSlugs(getEnrolledSlugs());
    setPendingCourse(null);
    router.replace("/dashboard");
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (!ready) return null;

  const initials = (user?.name ?? "S")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-[14px] font-extrabold text-white shadow-soft-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-green-700">
                Dashboard
              </p>
              <h1 className="truncate text-[18px] font-extrabold text-ink sm:text-[20px]">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </h1>
              {user?.email && (
                <p className="truncate text-[12.5px] text-muted">{user.email}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-line px-3.5 py-2 text-[13px] font-bold text-ink transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-8">
        {pendingCourse && (
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border-2 border-green-200 bg-green-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-green-700" />
              <p className="text-[14px] font-semibold text-ink">
                Complete your enrollment in{" "}
                <span className="font-extrabold">{pendingCourse.title}</span> to start
                learning.
              </p>
            </div>
            <button
              type="button"
              onClick={confirmPendingEnroll}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-5 py-2.5 text-[13.5px] font-bold text-white shadow-md transition hover:-translate-y-0.5 sm:w-auto"
            >
              Confirm Enrollment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mb-8 grid grid-cols-3 gap-4">
          <StatCard
            icon={BookOpen}
            value="1"
            label="Enrolled Courses"
            badge="Active"
          />
          <StatCard icon={CheckCircle} value="0" label="Completed" />
          <StatCard icon={Award} value="0" label="Certificates" />
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#111111]">My Courses</h2>
            <Link href="/#courses" className="text-sm font-medium text-[#20c997]">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard title="React & Next.js" progress={0} enrolled />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link
            href="/#courses"
            className="group flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-soft-sm transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <GraduationCap className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-[13.5px] font-extrabold text-ink">Explore more courses</p>
                <p className="text-[12px] text-muted">See what else you can learn next</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-green-700" />
          </Link>
          <Link
            href="/#contact"
            className="group flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-soft-sm transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <MessageCircle className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-[13.5px] font-extrabold text-ink">Need help?</p>
                <p className="text-[12px] text-muted">Talk to our support team</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-green-700" />
          </Link>
        </div>
      </main>
    </div>
  );
}
