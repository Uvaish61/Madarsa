import type { CourseItem } from "@/lib/landing-data";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type UserProfile = AuthUser & {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  location: string;
  role: string;
  joinedAt: string;
};

export type Course = CourseItem;

export type Enrollment = {
  slug: string;
  enrolledAt: string;
};

export type CourseProgress = {
  slug: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  hoursStudied: number;
  completed: boolean;
  certificateIssued: boolean;
};

export type DashboardStats = {
  enrolled: number;
  completed: number;
  certificates: number;
  averageProgress: number;
  lessonsDone: number;
  hoursStudied: number;
  streakDays: number;
  totalXp: number;
};
