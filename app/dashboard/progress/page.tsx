import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProgressContent from "@/components/dashboard/ProgressContent";
import ProgressTopbar from "@/components/dashboard/ProgressTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Progress · Madarsa Tech Academy",
  description: "Track your learning hours, streak, skills, and achievements.",
};

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <DashboardShell header={<ProgressTopbar />}>
        <ProgressContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}
