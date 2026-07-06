"use client";

import {
  Award,
  Calendar,
  Camera,
  Check,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Flame,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";

// ─── Shared white card base ───────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: 22,
  border: "1px solid rgba(0,0,0,0.06)",
  overflow: "hidden",
  position: "relative",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CardHeader({
  icon: Icon,
  iconBg,
  iconBorder,
  iconColor,
  title,
  subtitle,
  right,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  title: string;
  subtitle: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          border: `1px solid ${iconBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon style={{ width: 15, height: 15, color: iconColor }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>
          {title}
        </p>
        <p style={{ fontSize: 11, color: "#b0bdb4" }}>{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

// ─── Section 1: Hero card ─────────────────────────────────────────────────────

const CHIPS = [
  {
    label: "Active Learner",
    icon: Check,
    bg: "rgba(22,197,100,0.15)",
    border: "rgba(22,197,100,0.25)",
    color: "#4ade80",
    fill: false,
  },
  {
    label: "Rising Star",
    icon: Star,
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.22)",
    color: "#fbbf24",
    fill: true,
  },
  {
    label: "3-Day Streak",
    icon: Flame,
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.22)",
    color: "#fb923c",
    fill: true,
  },
  {
    label: "React Dev",
    icon: Code2,
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.22)",
    color: "#a5b4fc",
    fill: false,
  },
];

const MINI_STATS = [
  { value: "320", label: "Total XP", color: "#fff" },
  { value: "1", label: "Courses", color: "#4ade80" },
  { value: "3", label: "Streak", color: "#fb923c" },
  { value: "1", label: "Certs", color: "#fbbf24" },
];

function HeroCard() {
  return (
    <div
      className="profile-hero-card"
      style={{
        background: "linear-gradient(145deg, #0a1e10, #0f2c18, #152a0e)",
        borderRadius: 22,
        border: "1px solid rgba(22,197,100,0.16)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Shimmer top edge */}
      <div className="settings-shimmer" style={{ height: 2 }} />

      {/* Background dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(22,197,100,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: -60,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(22,197,100,0.09)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -50,
          left: "42%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(234,179,8,0.06)",
          filter: "blur(24px)",
        }}
      />

      {/* Content row */}
      <div style={{ display: "flex", position: "relative" }}>
        {/* ── Section A: avatar + info ── */}
        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            minWidth: 0,
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              className="profile-avatar-ring"
              style={{
                width: 94,
                height: 94,
                borderRadius: 24,
                background:
                  "linear-gradient(135deg, rgba(22,197,100,0.3), rgba(22,197,100,0.1))",
                padding: 3,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 21,
                  background: "linear-gradient(135deg, #16c564, #0d7a3e, #095c2e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                UK
              </div>
            </div>
            <button
              type="button"
              className="profile-camera-btn"
              aria-label="Change photo"
              style={{
                position: "absolute",
                bottom: -6,
                right: -6,
                width: 28,
                height: 28,
                borderRadius: 9,
                background: "#fff",
                border: "2px solid #0a1e10",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Camera style={{ width: 12, height: 12, color: "#16c564" }} />
            </button>
          </div>

          {/* Info */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                Uvaish Khan
              </p>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #16c564, #0d9444)",
                  boxShadow: "0 2px 8px rgba(22,197,100,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check style={{ width: 11, height: 11, color: "#fff" }} />
              </span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
              uvaishkhan@gmail.com
            </p>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.28)", marginBottom: 12 }}>
              Full Stack Developer in progress · Mumbai, India · Joined July 2026
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    background: chip.bg,
                    border: `1px solid ${chip.border}`,
                    color: chip.color,
                  }}
                >
                  <chip.icon
                    style={{ width: 9, height: 9 }}
                    className={chip.fill ? "fill-current" : undefined}
                  />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "22px 0" }} />

        {/* ── Section B: rank + XP ── */}
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
            minWidth: 210,
            flexShrink: 0,
          }}
        >
          {/* Rank */}
          <div style={{ marginBottom: 18 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              GLOBAL RANK
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #eab308, #ca8a04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                  animation: "rankGlow 2.5s ease-in-out infinite",
                }}
              >
                #42
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                  Rising Star
                </p>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)" }}>
                  Top 15% · July 2026
                </p>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                Progress to Expert
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>
                320 / 500 XP
              </span>
            </div>
            <div
              style={{
                width: 170,
                height: 6,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={
                  {
                    height: "100%",
                    background: "linear-gradient(90deg, #16c564, #4ade80)",
                    borderRadius: 999,
                    ["--pct" as string]: "64%",
                    animation: "progressFill 0.8s ease-out both",
                    animationDelay: "400ms",
                  } as React.CSSProperties
                }
              />
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
              180 XP remaining to unlock{" "}
              <span style={{ fontWeight: 700, color: "#fbbf24" }}>Expert</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "22px 0" }} />

        {/* ── Section C: mini stats ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            flexShrink: 0,
          }}
        >
          {MINI_STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "14px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                borderTop: i >= 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <p style={{ fontSize: 19, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: stat.color === "#fff" ? "rgba(255,255,255,0.32)" : stat.color,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section 2 · Left column ──────────────────────────────────────────────────

const INFO_ROWS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: User, label: "Full Name", value: "Uvaish Khan" },
  { icon: Mail, label: "Email Address", value: "uvaishkhan@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Location", value: "Mumbai, India" },
  { icon: Calendar, label: "Member Since", value: "July 2026" },
];

function AboutCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "60ms" }}>
      <CardHeader
        icon={User}
        iconBg="linear-gradient(135deg, rgba(22,197,100,0.13), rgba(22,197,100,0.04))"
        iconBorder="rgba(22,197,100,0.18)"
        iconColor="#16c564"
        title="About"
        subtitle="Personal information"
        right={
          <button
            type="button"
            className="profile-edit-info-btn"
            aria-label="Edit personal information"
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              background: "#f7faf7",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Pencil style={{ width: 12, height: 12, color: "#5a6b5f" }} />
          </button>
        }
      />

      {INFO_ROWS.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0",
            borderBottom: i < INFO_ROWS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "#f5f7f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <row.icon style={{ width: 14, height: 14, color: "#5a6b5f" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 10.5, color: "#b0bdb4", marginBottom: 2 }}>{row.label}</p>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0d1f13" }}>{row.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BioCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "120ms" }}>
      <CardHeader
        icon={FileText}
        iconBg="linear-gradient(135deg, rgba(99,102,241,0.13), rgba(99,102,241,0.04))"
        iconBorder="rgba(99,102,241,0.18)"
        iconColor="#6366f1"
        title="Bio"
        subtitle="A short introduction"
      />
      <p style={{ fontSize: 13, color: "#3a4a3f", lineHeight: 1.75 }}>
        Passionate web developer diving deep into React &amp; Next.js on EduLearn. I
        love building clean, performant interfaces and learning modern full-stack
        patterns every day. Currently working toward becoming a complete full-stack
        JavaScript developer.
      </p>
    </div>
  );
}

const SOCIALS: {
  key: string;
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  border: string;
  bg: string;
  hoverBg: string;
}[] = [
  {
    key: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/uvaishkhan",
    color: "#6366f1",
    border: "rgba(99,102,241,0.18)",
    bg: "rgba(99,102,241,0.04)",
    hoverBg: "rgba(99,102,241,0.07)",
  },
  {
    key: "github",
    icon: Github,
    label: "GitHub",
    value: "github.com/uvaishkhan",
    color: "#333",
    border: "rgba(0,0,0,0.08)",
    bg: "#fafafa",
    hoverBg: "#f0f4f0",
  },
  {
    key: "website",
    icon: Globe,
    label: "Website",
    value: "uvaishkhan.dev",
    color: "#3b82f6",
    border: "rgba(59,130,246,0.18)",
    bg: "rgba(59,130,246,0.04)",
    hoverBg: "rgba(59,130,246,0.07)",
  },
];

function SocialCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "180ms" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 16 }}>
        Social &amp; Web
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SOCIALS.map((social) => (
          <div
            key={social.key}
            className="profile-social-row"
            style={
              {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 11,
                border: `1.5px solid ${social.border}`,
                background: social.bg,
                cursor: "pointer",
                ["--social-hover-bg" as string]: social.hoverBg,
              } as React.CSSProperties
            }
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "#fff",
              }}
            >
              <social.icon style={{ width: 14, height: 14, color: social.color }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10.5, color: "#b0bdb4", marginBottom: 1 }}>
                {social.label}
              </p>
              <p
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: social.color,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {social.value}
              </p>
            </div>
            <ExternalLink
              style={{ width: 13, height: 13, color: social.color, flexShrink: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 2 · Right column ─────────────────────────────────────────────────

function RankXPCard() {
  return (
    <div
      className="stat-card-enter"
      style={{
        borderRadius: 20,
        padding: 22,
        background: "linear-gradient(145deg, #0b1f13, #17341f)",
        border: "1px solid rgba(22,197,100,0.15)",
        overflow: "hidden",
        position: "relative",
        animationDelay: "60ms",
      }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          top: -30,
          right: -30,
          width: 130,
          height: 130,
          background: "radial-gradient(circle, rgba(234,179,8,0.14), transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #eab308, #ca8a04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
              animation: "rankGlow 2.5s ease-in-out infinite",
            }}
          >
            #42
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
              Rising Star
            </p>
            <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)" }}>
              Top 15% this month
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: "#4ade80", lineHeight: 1 }}>
            320
          </p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", marginTop: 2 }}>
            Total XP
          </p>
        </div>
      </div>

      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 8,
          position: "relative",
        }}
      >
        <div
          style={
            {
              height: "100%",
              background: "linear-gradient(90deg, #16c564, #4ade80)",
              borderRadius: 999,
              ["--pct" as string]: "64%",
              animation: "progressFill 0.8s ease-out both",
              animationDelay: "400ms",
            } as React.CSSProperties
          }
        />
      </div>
      <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", position: "relative" }}>
        180 XP away from <span style={{ fontWeight: 700, color: "#fbbf24" }}>Expert</span> rank
      </p>
    </div>
  );
}

const LEARNING_STATS = [
  {
    value: "6h",
    label: "Study Time",
    color: "#16c564",
    bg: "rgba(22,197,100,0.06)",
    border: "rgba(22,197,100,0.16)",
  },
  {
    value: "12",
    label: "Lessons Done",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.16)",
  },
  {
    value: "3",
    label: "Day Streak",
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.16)",
  },
  {
    value: "1",
    label: "Certificates",
    color: "#eab308",
    bg: "rgba(234,179,8,0.06)",
    border: "rgba(234,179,8,0.18)",
  },
];

function LearningStatsCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "120ms" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 16 }}>
        Learning Stats
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {LEARNING_STATS.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: 14,
              borderRadius: 13,
              background: stat.bg,
              border: `1px solid ${stat.border}`,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 11, color: "#7a8c81", marginTop: 6 }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SKILLS = [
  { label: "JSX & Components", pct: 65, c1: "#16c564", c2: "#4ade80" },
  { label: "React Hooks", pct: 40, c1: "#6366f1", c2: "#a5b4fc" },
  { label: "Next.js Routing", pct: 20, c1: "#f97316", c2: "#fdba74" },
  { label: "State Management", pct: 10, c1: "#3b82f6", c2: "#93c5fd" },
];

function SkillsCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "180ms" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 18 }}>
        Skills
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {SKILLS.map((skill, i) => (
          <div key={skill.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${skill.c1}, ${skill.c2})`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#2e3d33" }}>
                  {skill.label}
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: skill.c1 }}>
                {skill.pct}%
              </span>
            </div>
            <div style={{ height: 5, background: "#f0f4f0", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={
                  {
                    height: "100%",
                    background: `linear-gradient(90deg, ${skill.c1}, ${skill.c2})`,
                    borderRadius: 3,
                    ["--pct" as string]: `${skill.pct}%`,
                    animation: "progressFill 0.8s ease-out both",
                    animationDelay: `${i * 100}ms`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Activity heatmap ─────────────────────────────────────────────────────────

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

// level 0-4 maps to the color scale; "future" cells render an empty dashed cell
type HeatCell = { level: 0 | 1 | 2 | 3 | 4; future?: boolean };

const HEATMAP: { week: string; days: HeatCell[] }[] = [
  { week: "W1", days: [0, 0, 1, 0, 0, 0, 0].map((level) => ({ level: level as 0 })) },
  { week: "W2", days: [0, 1, 0, 0, 1, 0, 0].map((level) => ({ level: level as 0 | 1 })) },
  {
    week: "W3",
    days: [0, 1, 2, 1, 1, 0, 0].map((level) => ({ level: level as 0 | 1 | 2 })),
  },
  {
    week: "W4",
    days: [1, 1, 4, 3, 1, 0, 0].map((level) => ({ level: level as 0 | 1 | 3 | 4 })),
  },
  {
    week: "W5",
    days: [2, 3, 4, 4, 3, 0, 0].map((level) => ({ level: level as 0 | 2 | 3 | 4 })),
  },
  {
    week: "W6",
    days: [
      { level: 3 },
      { level: 2 },
      { level: 2 },
      { level: 1 },
      { level: 1 },
      { level: 0, future: true },
      { level: 0, future: true },
    ],
  },
];

const HEAT_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "rgba(22,197,100,0.08)",
  1: "rgba(22,197,100,0.35)",
  2: "rgba(22,197,100,0.6)",
  3: "rgba(22,197,100,0.9)",
  4: "#16c564",
};

function ActivityCard() {
  return (
    <div className="stat-card-enter" style={{ ...CARD, animationDelay: "240ms" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13" }}>Activity</p>
        <p style={{ fontSize: 11, color: "#9aa59f" }}>Last 7 weeks</p>
      </div>

      {/* Day labels */}
      <div style={{ display: "flex", gap: 4, marginBottom: 6, marginLeft: 26 }}>
        {DAY_LABELS.map((day, i) => (
          <span
            key={i}
            style={{
              width: 11,
              fontSize: 9,
              fontWeight: 600,
              color: "#b0bdb4",
              textAlign: "center",
            }}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Grid rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {HEATMAP.map((row) => (
          <div key={row.week} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                width: 22,
                fontSize: 9.5,
                fontWeight: 600,
                color: "#b0bdb4",
                flexShrink: 0,
              }}
            >
              {row.week}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {row.days.map((cell, i) => (
                <span
                  key={i}
                  className="profile-heat-cell"
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 3,
                    background: cell.future ? "transparent" : HEAT_COLORS[cell.level],
                    border: cell.future ? "1.5px dashed rgba(0,0,0,0.1)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
          marginTop: 14,
        }}
      >
        <span style={{ fontSize: 10, color: "#b0bdb4" }}>Less</span>
        {[0, 1, 2, 4].map((level) => (
          <span
            key={level}
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: HEAT_COLORS[level as 0 | 1 | 2 | 4],
            }}
          />
        ))}
        <span style={{ fontSize: 10, color: "#b0bdb4" }}>More</span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProfileContent() {
  return (
    <div
      style={{
        padding: "22px 26px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <HeroCard />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 16 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AboutCard />
          <BioCard />
          <SocialCard />
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RankXPCard />
          <LearningStatsCard />
          <SkillsCard />
          <ActivityCard />
        </div>
      </div>
    </div>
  );
}
