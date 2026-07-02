// ─── Lightweight client-side enrollment state ─────────────────────────────────
// Mock enrollment store backed by localStorage — mirrors lib/auth.ts since there
// is no real backend/checkout yet. The dashboard reads this to build "My Courses".

const ENROLLMENT_KEY = "madarsa_enrolled_courses";

export function getEnrolledSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ENROLLMENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isEnrolled(slug: string): boolean {
  return getEnrolledSlugs().includes(slug);
}

export function enrollInCourse(slug: string): void {
  if (typeof window === "undefined") return;
  const slugs = getEnrolledSlugs();
  if (!slugs.includes(slug)) {
    window.localStorage.setItem(ENROLLMENT_KEY, JSON.stringify([...slugs, slug]));
  }
}
