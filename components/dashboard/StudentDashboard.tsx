"use client";

import { ArrowRight, CheckCircle2, LogOut, Sparkles } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-green-700">
              Dashboard
            </p>
            <h1 className="text-[20px] font-extrabold text-ink">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h1>
            {user?.email && <p className="mt-0.5 text-[12.5px] text-muted">{user.email}</p>}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border-2 border-line px-4 py-2 text-[13px] font-bold text-ink transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
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
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-5 py-2.5 text-[13.5px] font-bold text-white shadow-md transition hover:-translate-y-0.5"
            >
              Confirm Enrollment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <h2 className="mb-4 text-[16px] font-extrabold text-ink">My Courses</h2>

        {enrolledCourses.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-line p-10 text-center">
            <p className="mb-4 text-[14px] text-muted">
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
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
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
      </main>
    </div>
  );
}
