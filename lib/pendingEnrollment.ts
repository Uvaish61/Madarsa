// ─── Pending checkout intent ────────────────────────────────────────────────
// When a guest clicks Enroll, we stash which course (and price) they were
// trying to buy so the post-login redirect can send them straight to
// /checkout instead of losing that intent. Mock/localStorage-backed — no
// backend yet.

const PENDING_ENROLLMENT_KEY = "mta_pending_enrollment";

export type PendingEnrollment = {
  courseId: string;
  price: string;
};

export function getPendingEnrollment(): PendingEnrollment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_ENROLLMENT_KEY);
    return raw ? (JSON.parse(raw) as PendingEnrollment) : null;
  } catch {
    return null;
  }
}

export function setPendingEnrollment(data: PendingEnrollment): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_ENROLLMENT_KEY, JSON.stringify(data));
}

export function clearPendingEnrollment(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PENDING_ENROLLMENT_KEY);
}
