import type { Metadata } from "next";
import CertificatesContent from "@/components/dashboard/CertificatesContent";
import CertificatesTopbar from "@/components/dashboard/CertificatesTopbar";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Certificates · Madarsa Tech Academy",
  description: "View and download your earned certificates and track upcoming ones.",
};

export default function CertificatesPage() {
  return (
    <ProtectedRoute>
      <DashboardShell header={<CertificatesTopbar />}>
        <CertificatesContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}
