// ─── Lightweight client-side auth state ───────────────────────────────────────
// Mock auth backed by localStorage — there is no real backend yet. Login/SignUp
// flip this flag on submit; the enrollment bill reads it to decide whether to
// send the user to checkout or to the login/signup screen first.

const AUTH_KEY = "madarsa_auth";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function setLoggedIn(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, "true");
}

export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
}
