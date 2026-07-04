import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard · Madarsa Tech Academy",
  description: "Track your enrolled courses and continue learning.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardShell sidebar={<DashboardSidebar />} />
    </ProtectedRoute>
  );
}
