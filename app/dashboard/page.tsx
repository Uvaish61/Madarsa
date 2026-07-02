import type { Metadata } from "next";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export const metadata: Metadata = {
  title: "Dashboard · Madarsa Tech Academy",
  description: "Track your enrolled courses and continue learning.",
};

export default function DashboardPage() {
  return <StudentDashboard />;
}
