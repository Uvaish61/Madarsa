"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Award,
  BarChart2,
  CheckCircle,
  ChevronRight,
  Clock,
  Code2,
  Flame,
  Plus,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

// ─── Shared card base (no boxShadow — .stat-card CSS class owns that) ─────────
const CARD: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: "22px",
  border: "1px solid rgba(0,0,0,0.06)",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
};

const CIRCUMFERENCE = 314; // 2π × r=50

// ─── Bar chart data ──────────────────────────────────────────────────────────
const BARS = [
  { day: "Mon", h: 43, active: true  },
  { day: "Tue", h: 68, active: true  },
  { day: "Wed", h: 28, active: true  },
  { day: "Thu", h: 90, active: true  },
  { day: "Fri", h: 52, active: true  },
  { day: "Sat", h: 13, active: false },
  { day: "Sun", h:  8, active: false },
];

// ─── Section 1: Stat cards ───────────────────────────────────────────────────

function HoursCard() {
  return (
    <div
      className="stat-card stat-card-enter"
      style={{
        ...CARD,
        animationDelay: "0ms",
        ["--stat-glow" as string]: "0 18px 50px rgba(22,197,100,0.15)",
      } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute" style={{ top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(22,197,100,0.11), transparent 70%)" }} />
      <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, rgba(22,197,100,0.15), rgba(22,197,100,0.04))", border: "1px solid rgba(22,197,100,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <Clock style={{ width: 16, height: 16, color: "#16c564" }} />
      </div>
      <p style={{ fontSize: 38, fontWeight: 800, color: "#0d1f13", letterSpacing: "-2px", lineHeight: 1, marginBottom: 4, animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "150ms" }}>6</p>
      <p style={{ fontSize: 12, color: "#7a8c81", marginBottom: 10 }}>Hours Studied</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", background: "rgba(22,197,100,0.08)", borderRadius: 999 }}>
        <TrendingUp style={{ width: 9, height: 9, color: "#16c564" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#16c564" }}>+2h this week</span>
      </div>
    </div>
  );
}

function LessonsCard() {
  return (
    <div
      className="stat-card stat-card-enter"
      style={{
        ...CARD,
        animationDelay: "60ms",
        ["--stat-glow" as string]: "0 18px 50px rgba(99,102,241,0.13)",
      } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute" style={{ top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(99,102,241,0.09), transparent 70%)" }} />
      <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.04))", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <CheckCircle style={{ width: 16, height: 16, color: "#6366f1" }} />
      </div>
      <p style={{ fontSize: 38, fontWeight: 800, color: "#0d1f13", letterSpacing: "-2px", lineHeight: 1, marginBottom: 4, animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "210ms" }}>12</p>
      <p style={{ fontSize: 12, color: "#7a8c81", marginBottom: 10 }}>Lessons Done</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", background: "rgba(99,102,241,0.08)", borderRadius: 999 }}>
        <TrendingUp style={{ width: 9, height: 9, color: "#6366f1" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1" }}>+4 this week</span>
      </div>
    </div>
  );
}

function StreakCard() {
  return (
    <div
      className="stat-card stat-card-enter"
      style={{
        ...CARD,
        animationDelay: "120ms",
        ["--stat-glow" as string]: "0 18px 50px rgba(249,115,22,0.12)",
      } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute" style={{ top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(249,115,22,0.09), transparent 70%)" }} />
      <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.04))", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <Flame style={{ width: 16, height: 16, color: "#f97316", animation: "flamePulse 1.6s ease-in-out infinite" }} />
      </div>
      <p style={{ fontSize: 38, fontWeight: 800, color: "#0d1f13", letterSpacing: "-2px", lineHeight: 1, marginBottom: 4, animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "270ms" }}>3</p>
      <p style={{ fontSize: 12, color: "#7a8c81", marginBottom: 10 }}>Day Streak</p>
      <p style={{ fontSize: 11, fontWeight: 600, color: "#f97316" }}>Best: 7 days</p>
    </div>
  );
}

function OverallProgressCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ringOffset = mounted ? 220 : CIRCUMFERENCE;

  return (
    <div
      className="stat-card stat-card-dark stat-card-enter"
      style={{
        ...CARD,
        background: "linear-gradient(145deg, #0b1f13, #17341f)",
        border: "1px solid rgba(22,197,100,0.15)",
        animationDelay: "180ms",
        ["--stat-glow" as string]: "0 18px 50px rgba(22,197,100,0.22)",
      } as React.CSSProperties}
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute" style={{ top: -20, right: -20, width: 120, height: 120, background: "radial-gradient(circle, rgba(22,197,100,0.15), transparent 70%)" }} />
      <div className="pointer-events-none absolute" style={{ bottom: -30, left: -30, width: 100, height: 100, background: "radial-gradient(circle, rgba(22,197,100,0.08), transparent 70%)" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {/* Ring */}
        <div style={{ position: "relative", width: 76, height: 76 }}>
          <svg width="76" height="76" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16c564" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
            {/* Progress arc */}
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ transition: "stroke-dashoffset 0.9s ease 0.5s" }}
            />
          </svg>
          {/* Center label */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 700, color: "#fff", animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "600ms" }}>
              30%
            </span>
          </div>
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center" }}>Overall Progress</p>

        {/* Bottom fill bar */}
        <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #16c564, #4ade80)",
              borderRadius: 999,
              ["--pct" as string]: "30%",
              animation: "progressFill 0.8s ease-out both",
              animationDelay: "900ms",
            } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Section 2A: Weekly Activity ─────────────────────────────────────────────

function WeeklyActivity() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, padding: "24px", cursor: "default", animationDelay: "240ms", boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 10px 36px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>Weekly Activity</p>
          <p style={{ fontSize: 11, color: "#b0bdb4" }}>Minutes studied · this week</p>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0d1f13", lineHeight: 1 }}>210</p>
            <p style={{ fontSize: 10, color: "#b0bdb4", marginTop: 2 }}>min total</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0d1f13", lineHeight: 1 }}>42</p>
            <p style={{ fontSize: 10, color: "#b0bdb4", marginTop: 2 }}>avg/day</p>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ height: 110, display: "flex", alignItems: "flex-end", gap: 8 }}>
        {BARS.map((bar, i) => (
          <div
            key={bar.day}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
            }}
          >
            {/* Bar */}
            <div
              className="progress-activity-bar"
              style={{
                width: "100%",
                height: bar.h,
                borderRadius: "6px 6px 0 0",
                transformOrigin: "bottom",
                animation: "barGrow 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
                animationDelay: `${i * 60}ms`,
                ...(bar.active
                  ? {
                      background: "linear-gradient(180deg, #22d46e, #0d9444)",
                      boxShadow: "0 4px 12px rgba(22,197,100,0.3)",
                    }
                  : {
                      background: "rgba(22,197,100,0.12)",
                      border: "1.5px dashed rgba(22,197,100,0.3)",
                    }),
              }}
            />
            {/* Day label */}
            <span
              style={{
                fontSize: 9.5,
                fontWeight: bar.day === "Sun" ? 700 : 600,
                color: bar.day === "Sun" ? "#16c564" : "#b0bdb4",
              }}
            >
              {bar.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 2B: Course Progress ─────────────────────────────────────────────

function CourseProgress() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, padding: "24px", cursor: "default", animationDelay: "300ms", boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 10px 36px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13" }}>Course Progress</p>
        <Link
          href="/dashboard/courses"
          style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, color: "#16c564", textDecoration: "none" }}
        >
          View all <ChevronRight style={{ width: 12, height: 12 }} />
        </Link>
      </div>

      {/* Enrolled course row */}
      <div
        className="progress-course-row"
        style={{
          padding: "13px 14px",
          borderRadius: 13,
          background: "#f8faf8",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Code2 style={{ width: 13, height: 13, color: "#7ee787" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>React &amp; Next.js</p>
            <p style={{ fontSize: 10, color: "#b0bdb4" }}>12 of 40 lessons</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#16c564", flexShrink: 0 }}>30%</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 5, background: "#e8ede9", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #16c564, #4ade80)",
              borderRadius: 999,
              ["--pct" as string]: "30%",
              animation: "progressFill 0.8s ease-out both",
              animationDelay: "400ms",
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Add course row */}
      <div
        className="progress-add-course"
        style={{
          padding: "13px 14px",
          borderRadius: 13,
          border: "2px dashed rgba(22,197,100,0.22)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(22,197,100,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Plus style={{ width: 13, height: 13, color: "#16c564" }} />
        </div>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: "#16c564" }}>Enroll in another course</p>
      </div>
    </div>
  );
}

// ─── Section 3A: Skills Breakdown ────────────────────────────────────────────

const SKILLS = [
  { label: "JSX & Components",   pct: 65, c1: "#16c564", c2: "#4ade80" },
  { label: "React Hooks",        pct: 40, c1: "#6366f1", c2: "#a5b4fc" },
  { label: "Next.js Routing",    pct: 20, c1: "#f97316", c2: "#fdba74" },
  { label: "State Management",   pct: 10, c1: "#3b82f6", c2: "#93c5fd" },
];

function SkillsBreakdown() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, padding: "24px", cursor: "default", animationDelay: "360ms", boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 10px 36px rgba(0,0,0,0.04)" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 18 }}>Skills Breakdown</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {SKILLS.map((skill, i) => (
          <div key={skill.label}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${skill.c1}, ${skill.c2})`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#2e3d33" }}>{skill.label}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: skill.c1 }}>{skill.pct}%</span>
            </div>
            <div style={{ height: 6, background: "#f0f4f0", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${skill.c1}, ${skill.c2})`,
                  borderRadius: 3,
                  ["--pct" as string]: `${skill.pct}%`,
                  animation: "progressFill 0.8s ease-out both",
                  animationDelay: `${420 + i * 80}ms`,
                } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 3B: Achievements ────────────────────────────────────────────────

function Achievements() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, padding: "24px", cursor: "default", animationDelay: "420ms", boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 10px 36px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13" }}>Achievements</p>
        <span style={{ fontSize: 11, color: "#7a8c81", background: "#f5f7f5", borderRadius: 999, padding: "3px 10px" }}>
          2 / 8 unlocked
        </span>
      </div>

      {/* Badge list */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>

        {/* Unlocked — First Lesson */}
        <div
          className="progress-badge-unlocked"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: "linear-gradient(135deg, rgba(22,197,100,0.12), rgba(22,197,100,0.04))",
            border: "1px solid rgba(22,197,100,0.2)",
            color: "#14a35a", cursor: "pointer",
            ["--badge-glow" as string]: "0 6px 18px rgba(22,197,100,0.18)",
          } as React.CSSProperties}
        >
          <Zap style={{ width: 12, height: 12 }} />
          First Lesson
        </div>

        {/* Unlocked — 3-Day Streak */}
        <div
          className="progress-badge-unlocked"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.2)",
            color: "#c2410c", cursor: "pointer",
            ["--badge-glow" as string]: "0 6px 18px rgba(249,115,22,0.18)",
          } as React.CSSProperties}
        >
          <Flame style={{ width: 12, height: 12, color: "#f97316" }} />
          3-Day Streak
        </div>

        {/* Locked badges */}
        {[
          { label: "First Certificate", icon: Award },
          { label: "Perfect Week",      icon: Activity },
          { label: "Top Learner",       icon: BarChart2 },
        ].map(({ label, icon: Icon }) => (
          <div
            key={label}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: "#f5f7f5",
              border: "1.5px dashed #d0dbd2",
              color: "#b0bdb4",
              cursor: "not-allowed",
              opacity: 0.6,
            }}
          >
            <Icon style={{ width: 12, height: 12 }} />
            {label}
          </div>
        ))}
      </div>

      {/* Next Unlock banner */}
      <div
        style={{
          padding: "16px 18px",
          borderRadius: 14,
          background: "linear-gradient(135deg, #0b1f13, #17341f)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Orb */}
        <div className="pointer-events-none absolute" style={{ top: -20, right: -20, width: 90, height: 90, background: "radial-gradient(circle, rgba(234,179,8,0.14), transparent 70%)" }} />

        {/* Left */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 6 }}>
            Next Unlock
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Award style={{ width: 11, height: 11, color: "#eab308" }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>First Certificate</span>
          </div>
          <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)" }}>Complete React &amp; Next.js</p>
        </div>

        {/* Right */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 26, fontWeight: 700, color: "#eab308", lineHeight: 1 }}>70%</p>
          <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>remaining</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function ProgressContent() {
  return (
    <div
      style={{
        padding: "28px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      {/* Section 1 — Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <HoursCard />
        <LessonsCard />
        <StreakCard />
        <OverallProgressCard />
      </div>

      {/* Section 2 — Weekly Activity + Course Progress */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <WeeklyActivity />
        <CourseProgress />
      </div>

      {/* Section 3 — Skills Breakdown + Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <SkillsBreakdown />
        <Achievements />
      </div>
    </div>
  );
}
