import type { Metadata } from "next";
import SignUp from "@/components/auth/SignUp";

export const metadata: Metadata = {
  title: "Create your account · Madarsa Tech Academy",
  description: "Create your free Madarsa Tech Academy account and start learning.",
};

export default function SignUpPage() {
  return <SignUp />;
}
