import { getPendingEnrollment } from "@/lib/pendingEnrollment";

// Where Login/SignUp should send the user after a successful (mock) auth.
// Auth state itself lives in context/AuthContext.tsx — this is just routing.
export function getPostAuthRedirectTarget(): string {
  if (typeof window === "undefined") return "/dashboard";
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  // EnrollButton sends guests to /login?redirect=checkout and stashes what
  // they were trying to buy in localStorage — resume straight into checkout.
  if (redirect === "checkout") {
    const pendingEnrollment = getPendingEnrollment();
    return pendingEnrollment ? `/checkout?course=${pendingEnrollment.courseId}` : "/dashboard";
  }

  // Older callers (EnrollBill, course-detail Enroll) still use redirect=/dashboard
  // plus a `pending` course slug forwarded from the login/signup URL.
  const target = redirect || "/dashboard";
  const pending = params.get("pending");
  return pending ? `${target}?pending=${pending}` : target;
}
