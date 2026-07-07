"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  Layers,
  Play,
  Plus,
  Server,
  Star,
  type LucideIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Filter = "All" | "In Progress" | "Completed";

interface SuggestedCourse {
  title: string;
  instructor: string;
  lessons: number;
  rating: number;
  reviews: string;
  thumbnailBg: string;
  themeColor: string;
  overlayOpacity: number;
  Icon: LucideIcon;
  badge: string | null;
  badgeBg: string;
  badgeColor: string;
  tags: { label: string; themed: boolean }[];
  animDelay: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FILTERS: Filter[] = ["All", "In Progress", "Completed"];

const SUGGESTED: SuggestedCourse[] = [
  {
    title: "TypeScript Mastery",
    instructor: "Alex Chen",
    lessons: 32,
    rating: 4.9,
    reviews: "2.1k",
    thumbnailBg: "linear-gradient(145deg, #1e1b4b, #2e1065)",
    themeColor: "#6366f1",
    overlayOpacity: 0.18,
    Icon: Code2,
    badge: "HOT",
    badgeBg: "rgba(234,179,8,0.22)",
    badgeColor: "#eab308",
    tags: [
      { label: "TypeScript", themed: true },
      { label: "Intermediate", themed: false },
    ],
    animDelay: "0ms",
  },
  {
    title: "Node.js Backend",
    instructor: "Maria Lopez",
    lessons: 45,
    rating: 4.8,
    reviews: "1.8k",
    thumbnailBg: "linear-gradient(145deg, #052e16, #064e3b)",
    themeColor: "#16c564",
    overlayOpacity: 0.2,
    Icon: Server,
    badge: null,
    badgeBg: "",
    badgeColor: "",
    tags: [
      { label: "Backend", themed: true },
      { label: "Intermediate", themed: false },
    ],
    animDelay: "60ms",
  },
  {
    title: "Tailwind CSS Pro",
    instructor: "Jake Wilson",
    lessons: 28,
    rating: 4.7,
    reviews: "890",
    thumbnailBg: "linear-gradient(145deg, #0c4a6e, #1e3a5f)",
    themeColor: "#0284c7",
    overlayOpacity: 0.18,
    Icon: Layers,
    badge: "NEW",
    badgeBg: "rgba(2,132,199,0.22)",
    badgeColor: "#7dd3fc",
    tags: [
      { label: "CSS", themed: true },
      { label: "Beginner", themed: false },
    ],
    animDelay: "120ms",
  },
  {
    title: "MongoDB Essentials",
    instructor: "Priya Sharma",
    lessons: 36,
    rating: 4.6,
    reviews: "1.2k",
    thumbnailBg: "linear-gradient(145deg, #1a2e05, #2d4a0a)",
    themeColor: "#4d7c0f",
    overlayOpacity: 0.18,
    Icon: Database,
    badge: null,
    badgeBg: "",
    badgeColor: "",
    tags: [
      { label: "Database", themed: true },
      { label: "Beginner", themed: false },
    ],
    animDelay: "180ms",
  },
];

const PATH_STEPS = [
  {
    label: "React",
    done: true,
    bg: "rgba(22,197,100,0.15)",
    border: "rgba(22,197,100,0.2)",
    color: "#4ade80",
    dot: "#16c564",
  },
  {
    label: "TypeScript",
    done: false,
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.2)",
    color: "#a5b4fc",
    dot: "#6366f1",
  },
  {
    label: "Node.js",
    done: false,
    bg: "rgba(22,197,100,0.08)",
    border: "rgba(22,197,100,0.14)",
    color: "rgba(255,255,255,0.5)",
    dot: "#4ade80",
  },
  {
    label: "MongoDB",
    done: false,
    bg: "rgba(163,230,53,0.08)",
    border: "rgba(163,230,53,0.15)",
    color: "rgba(255,255,255,0.5)",
    dot: "#84cc16",
  },
];

// ─── Suggested course card ───────────────────────────────────────────────────

function SuggestedCard({ course }: { course: SuggestedCourse }) {
  const {
    title,
    instructor,
    lessons,
    rating,
    reviews,
    thumbnailBg,
    themeColor,
    overlayOpacity,
    Icon,
    badge,
    badgeBg,
    badgeColor,
    tags,
    animDelay,
  } = course;

  return (
    <div
      className="stat-card-enter"
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 10px 32px rgba(0,0,0,0.04)",
        cursor: "pointer",
        transition:
          "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        animationDelay: animDelay,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-7px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 20px 60px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.05), 0 10px 32px rgba(0,0,0,0.04)";
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 120,
          background: thumbnailBg,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,${overlayOpacity}) 100%)`,
          }}
        />
        {/* Decorative orb bottom-left */}
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${themeColor}4d, transparent 70%)`,
          }}
        />
        {/* Technology icon */}
        <Icon
          style={{
            width: 44,
            height: 44,
            color: themeColor,
            opacity: 0.55,
            strokeWidth: 1.4,
            position: "relative",
            zIndex: 1,
          }}
        />
        {/* Optional badge */}
        {badge && (
          <div
            className="absolute"
            style={{
              top: 10,
              right: 10,
              fontSize: 9,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 999,
              background: badgeBg,
              color: badgeColor,
              zIndex: 2,
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "15px 16px" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0d1f13",
            marginBottom: 3,
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: 11, color: "#9aa59f", marginBottom: 10 }}>
          {instructor} · {lessons} lessons
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {tags.map((tag) => (
            <span
              key={tag.label}
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 999,
                color: tag.themed ? themeColor : "#5a6b5f",
                background: tag.themed ? `${themeColor}1a` : "#f0f4f0",
                border: `1px solid ${tag.themed ? `${themeColor}30` : "transparent"}`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Rating + price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star
              style={{
                width: 12,
                height: 12,
                color: "#eab308",
                fill: "#eab308",
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1f13" }}>
              {rating}
            </span>
            <span style={{ fontSize: 11, color: "#b0bdb4" }}>({reviews})</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0d1f13" }}>
            Free
          </span>
        </div>

        {/* Enroll button */}
        <button
          type="button"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 11,
            border: `1.5px solid ${themeColor}40`,
            background: "transparent",
            color: themeColor,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = `0 4px 12px ${themeColor}30`;
            el.style.background = `${themeColor}0d`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
            el.style.background = "transparent";
          }}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function CoursesContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 lg:gap-7.5 lg:p-[26px_28px_40px]">
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — ENROLLED COURSES
      ══════════════════════════════════════════════════════════════ */}
      <section>
        {/* Section header */}
        <div className="mb-4.5 flex flex-wrap items-center justify-between gap-3">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{ fontSize: 16, fontWeight: 700, color: "#0d1f13" }}
            >
              Enrolled Courses
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#14a35a",
                background: "rgba(22,197,100,0.11)",
                border: "1px solid rgba(22,197,100,0.2)",
                borderRadius: 999,
                padding: "2px 10px",
              }}
            >
              1 Active
            </span>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 15px",
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  fontFamily: "inherit",
                  ...(filter === f
                    ? {
                        background:
                          "linear-gradient(135deg, #16c564, #0d9444)",
                        color: "#fff",
                        border: "none",
                        boxShadow: "0 3px 12px rgba(22,197,100,0.35)",
                      }
                    : {
                        background: "#fff",
                        color: "#5a6b5f",
                        border: "1.5px solid rgba(0,0,0,0.08)",
                      }),
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 2-column grid on desktop; stacks on mobile/tablet */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_1fr] lg:gap-4.5">
          {/* ── LEFT: Enrolled course card ── */}
          <div
            className="course-card stat-card-enter"
            style={{
              background: "#fff",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.05)",
              animationDelay: "0ms",
            }}
          >
            {/* Code thumbnail */}
            <div
              style={{
                height: 160,
                background: "#0d1117",
                fontFamily: "var(--font-mono), 'DM Mono', monospace",
                fontSize: 12,
                lineHeight: 1.75,
                padding: "18px 20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Subtle green tint overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(22,197,100,0.05) 0%, rgba(22,197,100,0.02) 100%)",
                }}
              />

              {/* Live badge — top right */}
              <div
                className="absolute"
                style={{
                  top: 14,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  zIndex: 2,
                }}
              >
                <div
                  className="animate-pulseSoft rounded-full"
                  style={{ width: 7, height: 7, background: "#16c564" }}
                />
                <span
                  style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}
                >
                  Active
                </span>
              </div>

              {/* macOS traffic lights */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 14,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: "#febc2e",
                  }}
                />
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: "#28c840",
                  }}
                />
              </div>

              {/* Syntax-highlighted pseudo code */}
              <div
                style={{ position: "relative", zIndex: 1, color: "#c9d1d9" }}
              >
                <div>
                  <span style={{ color: "#ff7b72" }}>import</span>
                  {" "}
                  <span style={{ color: "#79c0ff" }}>React</span>
                  <span style={{ color: "#c9d1d9" }}>, </span>
                  <span style={{ color: "#79c0ff" }}>Next</span>
                  {" "}
                  <span style={{ color: "#ff7b72" }}>from</span>
                  {" "}
                  <span style={{ color: "#a5d6ff" }}>{"'edulearn'"}</span>
                </div>
                <div style={{ height: 6 }} />
                <div>
                  <span style={{ color: "#ff7b72" }}>const</span>
                  {" "}
                  <span style={{ color: "#7ee787" }}>App</span>
                  <span style={{ color: "#c9d1d9" }}>{" = () => ("}</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span style={{ color: "#7ee787" }}>{"<div>"}</span>
                </div>
                <div style={{ paddingLeft: 28 }}>
                  <span style={{ color: "#79c0ff" }}>Learn. Build. Ship.</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span style={{ color: "#7ee787" }}>{"</div>"}</span>
                </div>
                <div>
                  <span style={{ color: "#c9d1d9" }}>{")"}</span>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "18px 20px" }}>
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0d1f13",
                      letterSpacing: "-0.3px",
                      marginBottom: 2,
                    }}
                  >
                    React &amp; Next.js
                  </p>
                  <p style={{ fontSize: 11.5, color: "#9aa59f" }}>
                    by Sarah Johnson
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    background: "rgba(22,197,100,0.1)",
                    border: "1px solid rgba(22,197,100,0.2)",
                    borderRadius: 999,
                    flexShrink: 0,
                  }}
                >
                  <Check style={{ width: 10, height: 10, color: "#14a35a" }} />
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: "#14a35a" }}
                  >
                    Enrolled
                  </span>
                </div>
              </div>

              {/* Tags row */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {["Web Dev", "Beginner", "40 lessons"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#5a6b5f",
                      background: "#f0f4f0",
                      borderRadius: 999,
                      padding: "3px 9px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress section */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: "#5a6b5f" }}
                  >
                    12 of 40 lessons
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#16c564" }}
                  >
                    30%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#f0f4f0",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: mounted ? "30%" : "0%",
                      background: "linear-gradient(90deg, #16c564, #4ade80)",
                      borderRadius: 999,
                      transition: "width 0.8s ease 0.5s",
                    }}
                  />
                </div>
                <p
                  style={{ fontSize: 11, color: "#b0bdb4", marginTop: 5 }}
                >
                  ~14 hours remaining
                </p>
              </div>

              {/* Continue Learning button */}
              <button
                type="button"
                className="continue-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #16c564, #0d9444)",
                  color: "#fff",
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 5px 18px rgba(22,197,100,0.38)",
                  fontFamily: "inherit",
                }}
              >
                <Play
                  style={{ width: 13, height: 13, fill: "#fff", color: "#fff" }}
                />
                Continue Learning
              </button>
            </div>
          </div>

          {/* ── RIGHT: Empty state + mini stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Add another course card */}
            <button
              type="button"
              className="stat-card-enter"
              style={{
                borderRadius: 22,
                border: "2px dashed rgba(22,197,100,0.22)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                padding: "36px 24px",
                cursor: "pointer",
                minHeight: 200,
                background: "transparent",
                transition: "border-color 0.2s ease, background 0.2s ease",
                animationDelay: "60ms",
                width: "100%",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(22,197,100,0.5)";
                el.style.background = "rgba(22,197,100,0.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(22,197,100,0.22)";
                el.style.background = "transparent";
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(22,197,100,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus style={{ width: 22, height: 22, color: "#16c564" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0d1f13",
                    marginBottom: 6,
                  }}
                >
                  Add another course
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#9aa59f",
                    maxWidth: 180,
                    lineHeight: 1.5,
                  }}
                >
                  Explore suggested courses below to grow your skills
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span
                  style={{ fontSize: 12.5, fontWeight: 700, color: "#16c564" }}
                >
                  Browse courses
                </span>
                <ChevronRight
                  style={{ width: 13, height: 13, color: "#16c564" }}
                />
              </div>
            </button>

            {/* Mini stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {[
                {
                  value: "1",
                  label: "Enrolled",
                  color: "#0d1f13",
                  delay: "120ms",
                },
                {
                  value: "0",
                  label: "Completed",
                  color: "#0d1f13",
                  delay: "180ms",
                },
                {
                  value: "30%",
                  label: "Avg Progress",
                  color: "#16c564",
                  delay: "240ms",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card-enter"
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    animationDelay: stat.delay,
                  }}
                >
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: stat.color,
                      marginBottom: 2,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 11, color: "#9aa59f" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — SUGGESTED COURSES
      ══════════════════════════════════════════════════════════════ */}
      <section>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#16c564",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Recommended For You
            </p>
            <h2
              style={{ fontSize: 16, fontWeight: 700, color: "#0d1f13" }}
            >
              Suggested Courses
            </h2>
          </div>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 12.5,
              fontWeight: 700,
              color: "#16c564",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "gap 0.2s ease",
            }}
          >
            View all
            <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </div>

        {/* 1 col mobile → 2 col tablet → 4 col desktop (unchanged) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {SUGGESTED.map((course) => (
            <SuggestedCard key={course.title} course={course} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — LEARNING PATH BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section>
        <div
          className="stat-card-enter flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-6"
          style={{
            background: "linear-gradient(135deg, #0b1f13, #16321e)",
            borderRadius: 22,
            padding: "20px",
            border: "1px solid rgba(22,197,100,0.15)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            animationDelay: "100ms",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute"
            style={{
              top: -90,
              left: "50%",
              transform: "translateX(-50%)",
              width: 180,
              height: 180,
              background:
                "radial-gradient(circle, rgba(22,197,100,0.1), transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: -70,
              right: -70,
              width: 140,
              height: 140,
              background:
                "radial-gradient(circle, rgba(234,179,8,0.07), transparent 70%)",
            }}
          />

          {/* Left content */}
          <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "rgba(22,197,100,0.2)",
                  border: "1px solid rgba(22,197,100,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Play
                  style={{
                    width: 10,
                    height: 10,
                    color: "#16c564",
                    fill: "#16c564",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Recommended Path
              </span>
            </div>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.4px",
                marginBottom: 8,
              }}
            >
              Full Stack Web Developer
            </h3>

            <p
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 440,
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Based on your React progress — complete TypeScript → Node.js →
              MongoDB to become job-ready as a full-stack developer.
            </p>

            {/* Path steps */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {PATH_STEPS.map((step, i) => (
                <div
                  key={step.label}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 12px",
                      background: step.bg,
                      border: `1px solid ${step.border}`,
                      borderRadius: 999,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 999,
                        background: step.dot,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: step.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.label}
                    </span>
                    {step.done && (
                      <Check
                        style={{
                          width: 10,
                          height: 10,
                          color: step.color,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>
                  {i < PATH_STEPS.length - 1 && (
                    <div
                      style={{
                        width: 20,
                        height: 1,
                        background: "rgba(255,255,255,0.15)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div
            style={{
              flexShrink: 0,
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                marginBottom: 12,
              }}
            >
              3 courses · ~45 hours
            </p>
            <button
              type="button"
              className="continue-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                borderRadius: 13,
                border: "none",
                background: "linear-gradient(135deg, #16c564, #0d9444)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 22px rgba(22,197,100,0.45)",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              Start Learning Path
              <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
