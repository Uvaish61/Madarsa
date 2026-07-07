"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart2,
  Bell,
  Check,
  Lock,
  Moon,
  Pencil,
  RefreshCw,
  Star,
  Sun,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createProfileFromUser, getInitials, getUserProfile, STORE_EVENT } from "@/lib/app-store";
import type { UserProfile } from "@/lib/domain";

// ─── Shared white card base ───────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: 24,
  border: "1px solid rgba(0,0,0,0.06)",
  overflow: "hidden",
  position: "relative",
  cursor: "default",
};

// ─── Accent colour swatches ───────────────────────────────────────────────────
const ACCENT_COLORS = [
  { from: "#16c564", to: "#0d9444" },
  { from: "#6366f1", to: "#4f46e5" },
  { from: "#f97316", to: "#ea580c" },
  { from: "#3b82f6", to: "#2563eb" },
  { from: "#ec4899", to: "#db2777" },
  { from: "#eab308", to: "#ca8a04" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        border: "none",
        background: checked
          ? "linear-gradient(135deg, #16c564, #0d9444)"
          : "#dde5de",
        boxShadow: checked ? "0 2px 8px rgba(22,197,100,0.3)" : "none",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.25s ease, box-shadow 0.25s ease",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          transform: checked ? "translateX(18px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

function CardHeader({
  icon: Icon,
  iconBg,
  iconBorder,
  iconColor,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
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
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>
          {title}
        </p>
        <p style={{ fontSize: 11, color: "#b0bdb4" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
  noBorder,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: noBorder ? "13px 0 0" : "13px 0",
        borderBottom: noBorder ? "none" : "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0d1f13", marginBottom: 2 }}>
          {label}
        </p>
        <p style={{ fontSize: 11, color: "#b0bdb4" }}>{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Section 1: Profile Hero ──────────────────────────────────────────────────

function ProfileHeroCard({ profile }: { profile: UserProfile }) {
  return (
    <div
      className="stat-card-enter"
      style={{
        background: "linear-gradient(145deg, #0b1f13, #0f2818)",
        borderRadius: 22,
        border: "1px solid rgba(22,197,100,0.18)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        overflow: "hidden",
        position: "relative",
        animationDelay: "0ms",
      }}
    >
      {/* Green shimmer top edge */}
      <div className="settings-shimmer" style={{ height: 2 }} />

      {/* Orb top-right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(22,197,100,0.12), transparent 70%)",
        }}
      />
      {/* Orb bottom-center */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -30,
          left: "42%",
          width: 120,
          height: 120,
          background: "radial-gradient(circle, rgba(22,197,100,0.07), transparent 70%)",
        }}
      />

      {/* Content row */}
      <div style={{ display: "flex", position: "relative" }}>
        {/* ── Left: avatar + info ── */}
        <div
          style={{
            flex: 1,
            padding: "26px 28px",
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 20,
                background: "linear-gradient(135deg, #16c564, #0d7a3e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                color: "#fff",
                animation: "avatarPulse 3s ease-in-out infinite",
              }}
            >
              {getInitials(profile.name || profile.email)}
            </div>
            {/* Edit button */}
            <button
              type="button"
              className="settings-avatar-edit"
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                width: 26,
                height: 26,
                borderRadius: 8,
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
              <Pencil style={{ width: 11, height: 11, color: "#16c564" }} />
            </button>
          </div>

          {/* Text info */}
          <div>
            <p
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              YOUR ACCOUNT
            </p>
            <p
              style={{
                fontSize: 21,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                marginBottom: 4,
              }}
            >
              {profile.name}
            </p>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
              {profile.email}
            </p>
            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "rgba(22,197,100,0.15)",
                  border: "1px solid rgba(22,197,100,0.25)",
                  color: "#4ade80",
                }}
              >
                <Check style={{ width: 9, height: 9 }} />
                Active Learner
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "rgba(234,179,8,0.12)",
                  border: "1px solid rgba(234,179,8,0.22)",
                  color: "#fbbf24",
                }}
              >
                <Star style={{ width: 9, height: 9 }} />
                Rising Star
              </span>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 1,
            background: "rgba(255,255,255,0.07)",
            margin: "20px 0",
            flexShrink: 0,
          }}
        />

        {/* ── Right: rank + XP ── */}
        <div
          style={{
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
            minWidth: 220,
            flexShrink: 0,
          }}
        >
          {/* Global Rank */}
          <div>
            <p
              style={{
                fontSize: 9.5,
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
                  width: 44,
                  height: 44,
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
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                  Rising Star
                </p>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)" }}>
                  Top 15% this month
                </p>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <p
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.28)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                XP PROGRESS
              </p>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>
                320 / 500
              </span>
            </div>
            <div
              style={{
                height: 5,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #16c564, #4ade80)",
                  borderRadius: 999,
                  ["--pct" as string]: "64%",
                  animation: "progressFill 0.8s ease-out both",
                  animationDelay: "400ms",
                } as React.CSSProperties}
              />
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>
              180 XP to{" "}
              <span style={{ fontWeight: 700, color: "#fbbf24" }}>Expert</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: Personal Information ─────────────────────────────────────────

function PersonalInfoCard({
  profile,
  onChange,
  onSave,
  saved,
}: {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  onSave: () => void;
  saved: boolean;
}) {
  const update = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...profile, [field]: event.target.value };
    if (field === "firstName" || field === "lastName") {
      next.name = `${next.firstName} ${next.lastName}`.trim() || next.name;
    }
    onChange(next);
  };

  return (
    <div
      className="settings-card stat-card-enter"
      style={{ ...CARD, animationDelay: "60ms" }}
    >
      <CardHeader
        icon={User}
        iconBg="linear-gradient(135deg, rgba(22,197,100,0.13), rgba(22,197,100,0.04))"
        iconBorder="rgba(22,197,100,0.18)"
        iconColor="#16c564"
        title="Personal Information"
        subtitle="Update your name and contact details"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            First Name
          </label>
          <input type="text" className="settings-input" value={profile.firstName} onChange={update("firstName")} />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            Last Name
          </label>
          <input type="text" className="settings-input" value={profile.lastName} onChange={update("lastName")} />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            className="settings-input"
            value={profile.email}
            onChange={update("email")}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            className="settings-input"
            value={profile.phone}
            onChange={update("phone")}
          />
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            color: "#5a6b5f",
            marginBottom: 5,
          }}
        >
          Bio
        </label>
        <textarea
          className="settings-input"
          rows={2}
          style={{ resize: "none" }}
          value={profile.bio}
          onChange={update("bio")}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
        <button
          type="button"
          onClick={onSave}
          style={{
            padding: "10px 18px",
            borderRadius: 11,
            border: "none",
            background: "linear-gradient(135deg, #16c564, #0d9444)",
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 5px 18px rgba(22,197,100,0.28)",
          }}
        >
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Section 3A: Notifications ────────────────────────────────────────────────

function NotificationsCard() {
  const [toggles, setToggles] = useState([true, true, true, false, false]);

  const rows = [
    { label: "Course Updates",    desc: "New lessons and announcements" },
    { label: "Streak Reminders",  desc: "Daily nudge to keep your streak" },
    { label: "Achievement Alerts", desc: "When you unlock a badge" },
    { label: "Weekly Report",     desc: "Summary of your progress" },
    { label: "Marketing Emails",  desc: "Promotions and new courses" },
  ];

  function flip(i: number) {
    setToggles((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div
      className="settings-card stat-card-enter"
      style={{ ...CARD, animationDelay: "120ms" }}
    >
      <CardHeader
        icon={Bell}
        iconBg="linear-gradient(135deg, rgba(99,102,241,0.13), rgba(99,102,241,0.04))"
        iconBorder="rgba(99,102,241,0.18)"
        iconColor="#6366f1"
        title="Notifications"
        subtitle="Manage your alerts"
      />
      {rows.map((row, i) => (
        <ToggleRow
          key={row.label}
          label={row.label}
          desc={row.desc}
          checked={toggles[i]}
          onChange={() => flip(i)}
          noBorder={i === rows.length - 1}
        />
      ))}
    </div>
  );
}

// ─── Section 3B: Appearance ───────────────────────────────────────────────────

function AppearanceCard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accentIdx, setAccentIdx] = useState(0);
  const [language, setLanguage] = useState("en");

  return (
    <div
      className="settings-card stat-card-enter"
      style={{ ...CARD, animationDelay: "180ms" }}
    >
      <CardHeader
        icon={Sun}
        iconBg="linear-gradient(135deg, rgba(249,115,22,0.13), rgba(249,115,22,0.04))"
        iconBorder="rgba(249,115,22,0.18)"
        iconColor="#f97316"
        title="Appearance"
        subtitle="Theme and display options"
      />

      {/* Theme Mode */}
      <div style={{ marginBottom: 16 }}>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: "#0d1f13",
            marginBottom: 10,
          }}
        >
          Theme Mode
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {/* Light option */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            style={{
              flex: 1,
              padding: "12px 10px",
              borderRadius: 12,
              textAlign: "center",
              cursor: "pointer",
              border: `1.5px solid ${theme === "light" ? "#16c564" : "rgba(0,0,0,0.08)"}`,
              background: theme === "light" ? "rgba(22,197,100,0.05)" : "#fff",
              position: "relative",
              transition: "border-color 0.15s ease, background 0.15s ease",
            }}
          >
            {theme === "light" && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#16c564",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check style={{ width: 8, height: 8, color: "#fff" }} />
              </span>
            )}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "#f0f4f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 6px",
              }}
            >
              <Sun style={{ width: 13, height: 13, color: "#aaa" }} />
            </div>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: "#0d1f13" }}>Light</p>
          </button>

          {/* Dark option */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className="settings-theme-dark"
            style={{
              flex: 1,
              padding: "12px 10px",
              borderRadius: 12,
              textAlign: "center",
              cursor: "pointer",
              border: `1.5px solid ${theme === "dark" ? "#16c564" : "rgba(0,0,0,0.08)"}`,
              background: theme === "dark" ? "rgba(22,197,100,0.05)" : "#fff",
              position: "relative",
              transition: "border-color 0.15s ease, background 0.15s ease",
            }}
          >
            {theme === "dark" && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#16c564",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check style={{ width: 8, height: 8, color: "#fff" }} />
              </span>
            )}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 6px",
              }}
            >
              <Moon style={{ width: 13, height: 13, color: "#94a3b8" }} />
            </div>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: "#5a6b5f" }}>Dark</p>
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div style={{ marginBottom: 16 }}>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: "#0d1f13",
            marginBottom: 10,
          }}
        >
          Accent Color
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          {ACCENT_COLORS.map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAccentIdx(i)}
              className="settings-color-swatch"
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                border: accentIdx === i ? "2px solid #fff" : "2px solid transparent",
                outline: accentIdx === i ? `2px solid ${color.from}` : "none",
                outlineOffset: "1px",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: "#0d1f13",
            marginBottom: 8,
          }}
        >
          Language
        </p>
        <select
          className="settings-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English (US)</option>
          <option value="hi">Hindi</option>
          <option value="ur">Urdu</option>
        </select>
      </div>
    </div>
  );
}

// ─── Section 4A: Security ─────────────────────────────────────────────────────

function SecurityCard() {
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div
      className="settings-card stat-card-enter"
      style={{ ...CARD, animationDelay: "240ms" }}
    >
      <CardHeader
        icon={Lock}
        iconBg="linear-gradient(135deg, rgba(59,130,246,0.13), rgba(59,130,246,0.04))"
        iconBorder="rgba(59,130,246,0.18)"
        iconColor="#3b82f6"
        title="Security"
        subtitle="Password and access settings"
      />

      <ToggleRow
        label="Two-Factor Auth"
        desc="Extra layer of security"
        checked={twoFA}
        onChange={() => setTwoFA((v) => !v)}
      />
      <ToggleRow
        label="Login Alerts"
        desc="Notify on new device login"
        checked={loginAlerts}
        onChange={() => setLoginAlerts((v) => !v)}
        noBorder
      />

      {/* Password inputs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 14,
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            Current Password
          </label>
          <input
            type="password"
            className="settings-input"
            defaultValue="••••••••"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: "#5a6b5f",
              marginBottom: 5,
            }}
          >
            New Password
          </label>
          <input
            type="password"
            className="settings-input"
            placeholder="Enter new password"
          />
        </div>
      </div>

      {/* Update Password button */}
      <button
        type="button"
        className="settings-update-pwd"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 16px",
          borderRadius: 10,
          border: "1.5px solid rgba(59,130,246,0.2)",
          background: "rgba(59,130,246,0.06)",
          fontSize: 12.5,
          fontWeight: 700,
          color: "#3b82f6",
          cursor: "pointer",
          marginTop: 14,
        }}
      >
        <Lock style={{ width: 12, height: 12 }} />
        Update Password
      </button>
    </div>
  );
}

// ─── Section 4B: Learning Preferences ────────────────────────────────────────

function LearningPrefsCard() {
  const [autoPlay, setAutoPlay] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [dailyGoal, setDailyGoal] = useState("30");

  return (
    <div
      className="settings-card stat-card-enter"
      style={{ ...CARD, animationDelay: "300ms" }}
    >
      <CardHeader
        icon={BarChart2}
        iconBg="linear-gradient(135deg, rgba(22,197,100,0.13), rgba(22,197,100,0.04))"
        iconBorder="rgba(22,197,100,0.18)"
        iconColor="#16c564"
        title="Learning Preferences"
        subtitle="Customize your study experience"
      />

      <ToggleRow
        label="Auto-play Next Lesson"
        desc="Continues automatically"
        checked={autoPlay}
        onChange={() => setAutoPlay((v) => !v)}
      />
      <ToggleRow
        label="Show Subtitles"
        desc="Display captions in videos"
        checked={subtitles}
        onChange={() => setSubtitles((v) => !v)}
      />

      {/* Daily Goal row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 13,
        }}
      >
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#0d1f13", marginBottom: 2 }}>
            Daily Goal
          </p>
          <p style={{ fontSize: 11, color: "#b0bdb4" }}>Set your learning target</p>
        </div>
        <select
          className="settings-select"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          style={{ width: "auto", minWidth: 108 }}
        >
          <option value="15">15 min</option>
          <option value="30">30 min</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>
    </div>
  );
}

// ─── Section 5: Danger Zone ───────────────────────────────────────────────────

function DangerZoneCard() {
  return (
    <div
      className="stat-card-enter"
      style={{
        borderRadius: 20,
        border: "1.5px solid rgba(239,68,68,0.14)",
        boxShadow: "0 4px 12px rgba(239,68,68,0.05)",
        overflow: "hidden",
        animationDelay: "360ms",
      }}
    >
      {/* Red shimmer top bar */}
      <div className="settings-shimmer-danger" style={{ height: 3 }} />

      {/* Inner content */}
      <div style={{ padding: "22px 24px", background: "#fff" }}>
        {/* Header */}
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
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle style={{ width: 15, height: 15, color: "#ef4444" }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 2 }}>
              Danger Zone
            </p>
            <p style={{ fontSize: 11.5, color: "#b0bdb4" }}>
              These actions are permanent and cannot be undone
            </p>
          </div>
        </div>

        {/* Action rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Reset Progress */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 16px",
              borderRadius: 13,
              background: "#fef9f6",
              border: "1px solid rgba(249,115,22,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <RefreshCw style={{ width: 15, height: 15, color: "#f97316" }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>
                  Reset Learning Progress
                </p>
                <p style={{ fontSize: 11.5, color: "#9aa59f" }}>
                  Clears all XP, streaks, and lesson history
                </p>
              </div>
            </div>
            <button
              type="button"
              className="settings-reset-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                borderRadius: 10,
                border: "1.5px solid rgba(249,115,22,0.3)",
                background: "#fff",
                fontSize: 12.5,
                fontWeight: 700,
                color: "#ea580c",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <RefreshCw style={{ width: 12, height: 12 }} />
              Reset Progress
            </button>
          </div>

          {/* Delete Account */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 16px",
              borderRadius: 13,
              background: "#fef7f7",
              border: "1px solid rgba(239,68,68,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Trash2 style={{ width: 15, height: 15, color: "#ef4444" }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0d1f13", marginBottom: 2 }}>
                  Delete Account
                </p>
                <p style={{ fontSize: 11.5, color: "#9aa59f" }}>
                  Permanently removes your account and all data
                </p>
              </div>
            </div>
            <button
              type="button"
              className="settings-delete-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                fontSize: 12.5,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Trash2 style={{ width: 12, height: 12 }} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SettingsContent() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    user ? getUserProfile() ?? createProfileFromUser(user) : null,
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => setProfile(user ? getUserProfile() ?? createProfileFromUser(user) : null);
    refresh();
    window.addEventListener(STORE_EVENT, refresh);
    return () => window.removeEventListener(STORE_EVENT, refresh);
  }, [user]);

  if (!user || !profile) return null;

  function handleSave() {
    if (!profile) return;
    updateProfile(profile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  return (
    <div
      style={{
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <ProfileHeroCard profile={profile} />
      <PersonalInfoCard
        profile={profile}
        onChange={(next) => {
          setSaved(false);
          setProfile(next);
        }}
        onSave={handleSave}
        saved={saved}
      />

      {/* Row: Notifications + Appearance */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <NotificationsCard />
        <AppearanceCard />
      </div>

      {/* Row: Security + Learning Preferences */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SecurityCard />
        <LearningPrefsCard />
      </div>

      <DangerZoneCard />
    </div>
  );
}
