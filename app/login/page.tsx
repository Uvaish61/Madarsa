import type { Metadata } from "next";
import Login from "@/components/auth/Login";

export const metadata: Metadata = {
  title: "Sign in · Madarsa Tech Academy",
  description: "Sign in to your Madarsa Tech Academy account to continue learning.",
};

export default function LoginPage() {
  return <Login />;
}
