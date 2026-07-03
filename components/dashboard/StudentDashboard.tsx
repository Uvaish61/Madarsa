"use client";

import { ArrowRight, Award, BookOpen, CheckCircle, GraduationCap, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActionCard from "@/components/dashboard/ActionCard";
import CourseCard from "@/components/dashboard/CourseCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { enrollInCourse, getEnrolledSlugs } from "@/lib/enrollment";
import { courses, type CourseItem } from "@/lib/landing-data";

export default function StudentDashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f4f2]">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} collapsed={sidebarCollapsed} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          activeNav={activeNav}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
          sidebarCollapsed={sidebarCollapsed}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {pendingCourse && (
            <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#e8ebe8] bg-[#e8f8f2] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-[#20c997]" />
                <p className="text-sm font-semibold text-[#111111]">
                  Complete your enrollment in{" "}
                  <span className="font-bold">{pendingCourse.title}</span> to start learning.
                </p>
              </div>
              <button
                type="button"
                onClick={confirmPendingEnroll}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1a4731] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] sm:w-auto"
              >
                Confirm Enrollment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mb-8 grid grid-cols-3 gap-4">
            <StatCard icon={BookOpen} value="1" label="Enrolled Courses" badge="Active" />
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

          <div className="grid grid-cols-2 gap-4">
            <ActionCard
              icon={GraduationCap}
              title="Explore more courses"
              subtitle="See what else you can learn next"
              onClick={() => router.push("/#courses")}
            />
            <ActionCard
              icon={MessageCircle}
              title="Need help?"
              subtitle="Talk to our support team"
              onClick={() => router.push("/#contact")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
