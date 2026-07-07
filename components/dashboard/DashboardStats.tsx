"use client";

import { useEffect, useState } from "react";
import { Award, BookOpen, CheckCircle, type LucideIcon } from "lucide-react";
import { getDashboardStats, STORE_EVENT } from "@/lib/app-store";
import type { DashboardStats as DashboardStatsModel } from "@/lib/domain";

type Theme = {
  color: string; // solid accent
  rgb: string; // "r,g,b" for rgba() tints
  glow: string; // hover box-shadow
};

const THEMES: Record<"green" | "blue" | "orange", Theme> = {
  green: {
    color: "#16c564",
    rgb: "22,197,100",
    glow:
      "0 2px 8px rgba(0,0,0,0.05), 0 18px 40px -8px rgba(22,197,100,0.4)",
  },
  blue: {
    color: "#3b82f6",
    rgb: "59,130,246",
    glow:
      "0 2px 8px rgba(0,0,0,0.05), 0 18px 40px -8px rgba(59,130,246,0.4)",
  },
  orange: {
    color: "#f97316",
    rgb: "249,115,22",
    glow:
      "0 2px 8px rgba(0,0,0,0.05), 0 18px 40px -8px rgba(249,115,22,0.4)",
  },
};

type StatCardProps = {
  theme: "green" | "blue" | "orange";
  icon: LucideIcon;
  value: string;
  label: string;
  badge?: string;
  progress: number; // 0–100
  enterDelay: number; // ms
};

function StatCard({
  theme,
  icon: Icon,
  value,
  label,
  badge,
  progress,
  enterDelay,
}: StatCardProps) {
  const t = THEMES[theme];
  return (
    <div className="stat-card-enter" style={{ animationDelay: `${enterDelay}ms` }}>
      <div
        className="stat-card relative cursor-pointer overflow-hidden bg-white p-3 sm:p-[20px_22px]"
        style={
          {
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.06)",
            "--stat-glow": t.glow,
          } as React.CSSProperties
        }
      >
        {/* Top-right orb */}
        <div
          className="pointer-events-none absolute right-0 top-0"
          style={{
            width: 120,
            height: 120,
            transform: "translate(30%, -30%)",
            background: `radial-gradient(circle, rgba(${t.rgb},0.18), transparent 70%)`,
          }}
        />

        {/* Icon + badge row */}
        <div className="relative flex items-start justify-between gap-1">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-[38px] sm:w-[38px]"
            style={{
              borderRadius: 11,
              background: `rgba(${t.rgb},0.11)`,
              border: `1px solid rgba(${t.rgb},0.2)`,
            }}
          >
            <Icon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" style={{ color: t.color }} />
          </div>
          {badge && (
            <span
              className="truncate whitespace-nowrap text-[9px] sm:text-[10.5px]"
              style={{
                fontWeight: 700,
                background: "rgba(22,197,100,0.11)",
                color: "#14a35a",
                padding: "3px 7px",
                borderRadius: 999,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Number */}
        <div
          className="relative mt-2 text-[24px] sm:mt-[14px] sm:text-[40px]"
          style={{
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          <span
            className="inline-block origin-left"
            style={{
              animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: `${enterDelay + 120}ms`,
            }}
          >
            {value}
          </span>
        </div>

        {/* Label */}
        <p
          className="relative mt-0.5 truncate text-[10.5px] sm:mt-[2px] sm:text-[12.5px]"
          style={{ color: "#7a8c81" }}
        >
          {label}
        </p>

        {/* Bottom progress bar */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: 3, background: "rgba(0,0,0,0.05)" }}
        >
          <div
            className="h-full"
            style={
              {
                "--pct": `${progress}%`,
                background: `linear-gradient(90deg, rgba(${t.rgb},0.7), ${t.color})`,
                animation: "progressFill 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
                animationDelay: `${enterDelay + 250}ms`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsModel>(() => getDashboardStats());

  useEffect(() => {
    const refresh = () => setStats(getDashboardStats());
    refresh();
    window.addEventListener(STORE_EVENT, refresh);
    return () => window.removeEventListener(STORE_EVENT, refresh);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <StatCard
          theme="green"
          icon={BookOpen}
          value={String(stats.enrolled)}
          label="Enrolled Courses"
          badge={stats.enrolled > 0 ? "Active" : undefined}
          progress={stats.enrolled > 0 ? 100 : 0}
          enterDelay={50}
        />
        <StatCard
          theme="blue"
          icon={CheckCircle}
          value={String(stats.completed)}
          label="Completed"
          progress={stats.enrolled > 0 ? stats.averageProgress : 0}
          enterDelay={150}
        />
        <StatCard
          theme="orange"
          icon={Award}
          value={String(stats.certificates)}
          label="Certificates"
          progress={stats.certificates > 0 ? 100 : 0}
          enterDelay={250}
        />
    </div>
  );
}
