import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import SettingsContent from "@/components/dashboard/SettingsContent";
import SettingsTopbar from "@/components/dashboard/SettingsTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Settings · Madarsa Tech Academy",
  description: "Manage your account, notifications, appearance, and security settings.",
};

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardShell header={<SettingsTopbar />}>
        <SettingsContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}
