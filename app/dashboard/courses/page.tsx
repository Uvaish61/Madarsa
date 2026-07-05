import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import CoursesContent from "@/components/dashboard/CoursesContent";
import CoursesTopbar from "@/components/dashboard/CoursesTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "My Courses · Madarsa Tech Academy",
  description: "Browse your enrolled courses and discover new learning paths.",
};

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <DashboardShell header={<CoursesTopbar />}>
        <CoursesContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}
