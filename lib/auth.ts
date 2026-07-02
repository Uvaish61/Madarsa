// Where Login/SignUp should send the user after a successful (mock) auth —
// defaults to the dashboard, and forwards a pending course slug if the user
// arrived here mid-purchase (see EnrollBill / LandingPage's enroll links).
// Auth state itself now lives in context/AuthContext.tsx.
export function getPostAuthRedirectTarget(): string {
  if (typeof window === "undefined") return "/dashboard";
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect") || "/dashboard";
  const pending = params.get("pending");
  return pending ? `${redirect}?pending=${pending}` : redirect;
}
