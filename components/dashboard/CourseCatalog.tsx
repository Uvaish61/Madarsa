"use client";

import { BookOpen, CheckCircle, Clock, Star } from "lucide-react";
import Link from "next/link";
import CourseLogo from "@/components/CourseLogo";
import { theme } from "@/constants/theme";
import { courses } from "@/lib/landing-data";

interface CourseCatalogProps {
  enrolledSlugs: string[];
}

export default function CourseCatalog({ enrolledSlugs }: CourseCatalogProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#111111]">Explore Courses</h2>
        <p className="mt-1 text-sm text-[#888888]">
          Browse the full catalog and pick what you want to learn next.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const enrolled = enrolledSlugs.includes(course.slug);
          return (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              style={{ borderColor: theme.border }}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-colors duration-150 hover:border-[#20c997]"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <CourseLogo title={course.title} />
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10.5px] font-bold text-white backdrop-blur-sm">
                  {course.badge.en}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 font-bold text-[#111111]">{course.title}</h3>
                <p className="mb-3 text-xs text-[#888888]">{course.level.en}</p>

                <div className="mb-4 flex items-center gap-3 text-xs text-[#888888]">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#111111]">
                    {course.price === "Free" ? "Free" : course.price}
                  </span>
                  {enrolled ? (
                    <span
                      style={{ color: theme.accent }}
                      className="flex items-center gap-1 text-xs font-semibold"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Enrolled
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#20c997] group-hover:underline">
                      View course →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
