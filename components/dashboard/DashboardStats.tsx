import { Award, BookOpen, CheckCircle, type LucideIcon } from "lucide-react";

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
        className="stat-card relative cursor-pointer overflow-hidden bg-white"
        style={
          {
            borderRadius: 18,
            padding: "20px 22px",
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
        <div className="relative flex items-start justify-between">
          <div
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: `rgba(${t.rgb},0.11)`,
              border: `1px solid rgba(${t.rgb},0.2)`,
            }}
          >
            <Icon className="h-[18px] w-[18px]" style={{ color: t.color }} />
          </div>
          {badge && (
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                background: "rgba(22,197,100,0.11)",
                color: "#14a35a",
                padding: "3px 9px",
                borderRadius: 999,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Number */}
        <div
          className="relative"
          style={{
            fontSize: "40px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginTop: 14,
          }}
        >
          <span
            className="inline-block origin-left"
            style={{
              animation: "statCountUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: `${enterDelay + 120}ms`,
            }}
          >
            {value}
          </span>
        </div>

        {/* Label */}
        <p
          className="relative"
          style={{ fontSize: "12.5px", color: "#7a8c81", marginTop: 2 }}
        >
          {label}
        </p>

        {/* Bottom progress bar */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: 3, background: "rgba(0,0,0,0.05)" }}
        >
          <div
            className="h-full origin-left"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, rgba(${t.rgb},0.7), ${t.color})`,
              animation: "statProgress 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: `${enterDelay + 250}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
          theme="green"
          icon={BookOpen}
          value="1"
          label="Enrolled Courses"
          badge="Active"
          progress={30}
          enterDelay={50}
        />
        <StatCard
          theme="blue"
          icon={CheckCircle}
          value="0"
          label="Completed"
          progress={0}
          enterDelay={150}
        />
        <StatCard
          theme="orange"
          icon={Award}
          value="0"
          label="Certificates"
          progress={0}
          enterDelay={250}
        />
    </div>
  );
}
