"use client";

// ─── Route guard ────────────────────────────────────────────────────────────
// Wrap any page that requires a signed-in session (e.g. /dashboard, /checkout).
// Reads auth state from context/AuthContext.tsx; bounces guests who type the
// URL directly to /login, remembering where they were headed.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || user) return;
    const redirect = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
    router.replace(`/login?redirect=${redirect}`);
  }, [loading, user, router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
