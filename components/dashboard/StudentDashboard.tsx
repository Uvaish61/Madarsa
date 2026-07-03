"use client";

import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, LogOut, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseLogo from "@/components/CourseLogo";
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

  const enrolledCourses = enrolledSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is CourseItem => Boolean(c));

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

        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft-sm sm:p-5">
            <BookOpen className="mb-2 h-5 w-5 text-green-700" />
            <p className="text-[22px] font-extrabold text-ink sm:text-[26px]">
              {enrolledCourses.length}
            </p>
            <p className="text-[11.5px] font-semibold text-muted sm:text-[12.5px]">
              Enrolled Courses
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft-sm sm:p-5">
            <CheckCircle2 className="mb-2 h-5 w-5 text-green-700" />
            <p className="text-[22px] font-extrabold text-ink sm:text-[26px]">0</p>
            <p className="text-[11.5px] font-semibold text-muted sm:text-[12.5px]">
              Completed
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft-sm sm:p-5">
            <GraduationCap className="mb-2 h-5 w-5 text-green-700" />
            <p className="text-[22px] font-extrabold text-ink sm:text-[26px]">0</p>
            <p className="text-[11.5px] font-semibold text-muted sm:text-[12.5px]">
              Certificates
            </p>
          </div>
        </div>

        <h2 className="mb-4 text-[16px] font-extrabold text-ink">My Courses</h2>

        {enrolledCourses.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-line bg-white/60 p-10 text-center sm:p-14">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
              <BookOpen className="h-6 w-6 text-green-700" />
            </div>
            <p className="mb-1 text-[15px] font-extrabold text-ink">No courses yet</p>
            <p className="mb-5 text-[13.5px] text-muted">
              Start learning by enrolling in a course.
            </p>
            <Link
              href="/#courses"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-5 py-2.5 text-[13.5px] font-bold text-white shadow-md transition hover:-translate-y-0.5"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <div
                key={course.slug}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-32 w-full">
                  <CourseLogo title={course.title} />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-[14.5px] font-extrabold text-ink">
                    {course.title}
                  </h3>
                  <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-paper-2">
                    <div className="h-full w-0 rounded-full bg-green-600" />
                  </div>
                  <div className="mb-3 flex items-center justify-between text-[12px] text-muted">
                    <span>0% complete</span>
                    <span className="flex items-center gap-1 text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Enrolled
                    </span>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-2.5 text-[13px] font-bold text-white transition hover:opacity-95"
                  >
                    Continue Learning
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
