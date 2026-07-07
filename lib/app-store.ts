"use client";

import type {
  AuthUser,
  CourseProgress,
  DashboardStats,
  Enrollment,
  UserProfile,
} from "@/lib/domain";
import { courses } from "@/lib/landing-data";

const USER_KEY = "madarsa_user";
const PROFILE_KEY = "madarsa_user_profile";
const ENROLLMENT_KEY = "madarsa_enrolled_courses";
const PROGRESS_KEY = "madarsa_course_progress";
export const STORE_EVENT = "madarsa-store-updated";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function removeKey(key: string) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(STORE_EVENT));
}

function makeId(email: string) {
  return `mock_${email.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_") || "user"}`;
}

function splitName(name: string, email: string) {
  const cleanName = name.trim() || email.split("@")[0] || "Student";
  const parts = cleanName.split(/\s+/);
  return {
    firstName: parts[0] ?? "Student",
    lastName: parts.slice(1).join(" "),
    name: cleanName,
  };
}

export function getInitials(nameOrEmail: string) {
  const label = nameOrEmail.trim() || "Student";
  const parts = label.includes("@") ? [label[0] ?? "S"] : label.split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ST";
}

export function createMockUser(email: string, name?: string): AuthUser {
  const normalizedEmail = email.trim().toLowerCase();
  const clean = splitName(name ?? "", normalizedEmail);
  return {
    id: makeId(normalizedEmail),
    name: clean.name,
    email: normalizedEmail,
  };
}

export function getCurrentUser(): AuthUser | null {
  const user = readJson<Partial<AuthUser> | null>(USER_KEY, null);
  if (!user || typeof user.email !== "string") return null;
  const normalized = createMockUser(user.email, typeof user.name === "string" ? user.name : undefined);
  return {
    ...normalized,
    id: typeof user.id === "string" && user.id ? user.id : normalized.id,
  };
}

export function saveCurrentUser(user: AuthUser) {
  writeJson(USER_KEY, user);
  const profile = getUserProfile();
  if (!profile || profile.email !== user.email) saveUserProfile(createProfileFromUser(user));
}

export function clearCurrentUser() {
  removeKey(USER_KEY);
}

export function createProfileFromUser(user: AuthUser): UserProfile {
  const parts = splitName(user.name, user.email);
  return {
    ...user,
    name: parts.name,
    firstName: parts.firstName,
    lastName: parts.lastName,
    phone: "+91 98765 43210",
    bio: "Passionate web developer learning React & Next.js on Madarsa Tech Academy.",
    location: "Mumbai, India",
    role: "Full Stack Developer in progress",
    joinedAt: "July 2026",
  };
}

export function getUserProfile(): UserProfile | null {
  const user = getCurrentUser();
  if (!user) return null;
  const profile = readJson<Partial<UserProfile> | null>(PROFILE_KEY, null);
  if (!profile || profile.email !== user.email) return createProfileFromUser(user);
  const base = createProfileFromUser(user);
  return {
    ...base,
    ...profile,
    id: user.id,
    email: typeof profile.email === "string" ? profile.email : user.email,
    name: typeof profile.name === "string" && profile.name.trim() ? profile.name : base.name,
  };
}

export function saveUserProfile(profile: UserProfile) {
  const name = `${profile.firstName} ${profile.lastName}`.trim() || profile.name;
  const user: AuthUser = {
    id: profile.id || makeId(profile.email),
    name,
    email: profile.email.trim().toLowerCase(),
  };
  writeJson(PROFILE_KEY, { ...profile, ...user, name });
  writeJson(USER_KEY, user);
}

function normalizeEnrollment(value: unknown): Enrollment | null {
  if (typeof value === "string") return { slug: value, enrolledAt: new Date().toISOString() };
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<Enrollment>;
  if (typeof item.slug !== "string") return null;
  return {
    slug: item.slug,
    enrolledAt: typeof item.enrolledAt === "string" ? item.enrolledAt : new Date().toISOString(),
  };
}

export function getEnrollments(): Enrollment[] {
  const raw = readJson<unknown[]>(ENROLLMENT_KEY, []);
  const seen = new Set<string>();
  return raw
    .map(normalizeEnrollment)
    .filter((item): item is Enrollment => Boolean(item))
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
}

export function addEnrollment(slug: string): Enrollment {
  const enrollments = getEnrollments();
  const existing = enrollments.find((item) => item.slug === slug);
  if (existing) return existing;
  const next = { slug, enrolledAt: new Date().toISOString() };
  writeJson(ENROLLMENT_KEY, [...enrollments, next]);
  ensureProgress(slug);
  return next;
}

export function isCourseEnrolled(slug: string): boolean {
  return getEnrollments().some((item) => item.slug === slug);
}

export function getEnrolledSlugs(): string[] {
  return getEnrollments().map((item) => item.slug);
}

function normalizeProgress(value: unknown): CourseProgress | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<CourseProgress>;
  if (typeof item.slug !== "string") return null;
  const course = courses.find((c) => c.slug === item.slug);
  const totalLessons =
    typeof item.totalLessons === "number" && item.totalLessons > 0
      ? item.totalLessons
      : course?.lessons ?? 0;
  const completedLessons = Math.max(
    0,
    Math.min(
      totalLessons,
      typeof item.completedLessons === "number" ? item.completedLessons : 0,
    ),
  );
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  return {
    slug: item.slug,
    totalLessons,
    completedLessons,
    percent,
    hoursStudied: typeof item.hoursStudied === "number" ? item.hoursStudied : 0,
    completed: percent >= 100,
    certificateIssued: Boolean(item.certificateIssued) || percent >= 100,
  };
}

export function getAllProgress(): CourseProgress[] {
  return readJson<unknown[]>(PROGRESS_KEY, [])
    .map(normalizeProgress)
    .filter((item): item is CourseProgress => Boolean(item));
}

export function saveCourseProgress(progress: CourseProgress) {
  const all = getAllProgress().filter((item) => item.slug !== progress.slug);
  writeJson(PROGRESS_KEY, [...all, normalizeProgress(progress) ?? progress]);
}

export function getCourseProgress(slug: string): CourseProgress {
  return ensureProgress(slug);
}

function ensureProgress(slug: string): CourseProgress {
  const existing = getAllProgress().find((item) => item.slug === slug);
  if (existing) return existing;
  const course = courses.find((item) => item.slug === slug);
  const totalLessons = course?.lessons ?? 0;
  const progress: CourseProgress = {
    slug,
    completedLessons: 0,
    totalLessons,
    percent: 0,
    hoursStudied: 0,
    completed: false,
    certificateIssued: false,
  };
  saveCourseProgress(progress);
  return progress;
}

export function getDashboardStats(): DashboardStats {
  const enrollments = getEnrollments();
  const progress = enrollments.map((item) => getCourseProgress(item.slug));
  const enrolled = enrollments.length;
  const completed = progress.filter((item) => item.completed).length;
  const certificates = progress.filter((item) => item.certificateIssued).length;
  const lessonsDone = progress.reduce((sum, item) => sum + item.completedLessons, 0);
  const hoursStudied = progress.reduce((sum, item) => sum + item.hoursStudied, 0);
  const averageProgress =
    enrolled > 0 ? Math.round(progress.reduce((sum, item) => sum + item.percent, 0) / enrolled) : 0;
  return {
    enrolled,
    completed,
    certificates,
    averageProgress,
    lessonsDone,
    hoursStudied,
    streakDays: enrolled > 0 ? 3 : 0,
    totalXp: lessonsDone * 20 + completed * 180,
  };
}

export function getEnrolledCourses() {
  const enrollments = getEnrollments();
  return enrollments
    .map((item) => {
      const course = courses.find((c) => c.slug === item.slug);
      return course ? { enrollment: item, course, progress: getCourseProgress(item.slug) } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
