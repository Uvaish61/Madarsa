import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProfileContent from "@/components/dashboard/ProfileContent";
import ProfileTopbar from "@/components/dashboard/ProfileTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Profile · Madarsa Tech Academy",
  description: "View and manage your EduLearn profile, rank, skills, and activity.",
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <DashboardShell header={<ProfileTopbar />}>
        <ProfileContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}
