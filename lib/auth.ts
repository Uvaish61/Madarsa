import { getPendingEnrollment } from "@/lib/pendingEnrollment";

// Where Login/SignUp should send the user after a successful (mock) auth.
// Auth state itself lives in context/AuthContext.tsx — this is just routing.
export function getPostAuthRedirectTarget(): string {
  if (typeof window === "undefined") return "/dashboard";
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  // "Resume my purchase": EnrollButton (landing) and the course-detail Enroll
  // stash the course in localStorage and send ?redirect=checkout. Resume the
  // user straight into checkout for whatever they were buying.
  if (redirect === "checkout") {
    const pending = getPendingEnrollment();
    return pending ? `/checkout?course=${pending.courseId}` : "/dashboard";
  }

  // Deep-link guard: ProtectedRoute captures the full path a guest tried to
  // reach (e.g. /checkout?course=X or /dashboard) before bouncing to login —
  // send them back there. Everything else defaults to the dashboard.
  return redirect || "/dashboard";
}
