import type { Metadata } from "next";
import DashboardCourses from "@/components/dashboard/DashboardCourses";
import DashboardQuickLinks from "@/components/dashboard/DashboardQuickLinks";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard · Madarsa Tech Academy",
  description: "Track your enrolled courses and continue learning.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardShell
        header={<DashboardTopbar />}
        rightPanel={<DashboardRightPanel />}
      >
        <div className="space-y-8 p-6">
          <DashboardStats />
          <DashboardCourses />
          <DashboardQuickLinks />
        </div>
      </DashboardShell>
    </ProtectedRoute>
  );
}
