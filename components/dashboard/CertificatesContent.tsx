import {
  CheckCircle,
  Code2,
  Download,
  GraduationCap,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  Share2,
  Star,
  type LucideIcon,
} from "lucide-react";
import CertificateCard from "@/components/dashboard/CertificateCard";

const CARD: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  padding: 18,
  border: "1px solid rgba(0,0,0,0.06)",
};

// ─── Right panel ────────────────────────────────────────────────────────────

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 uppercase"
      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", color: "#b0bdb4" }}
    >
      {children}
    </p>
  );
}

function ActionsCard() {
  return (
    <div style={CARD}>
      <PanelLabel>Actions</PanelLabel>
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          className="cert-action-btn flex w-full items-center justify-center gap-2.5 rounded-[11px] py-2.5 text-white"
          style={
            {
              background: "linear-gradient(135deg, #16c564, #0d9444)",
              boxShadow: "0 8px 20px rgba(22,197,100,0.28)",
              fontSize: 13,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              ["--cert-action-glow" as string]: "0 12px 26px rgba(22,197,100,0.4)",
            } as React.CSSProperties
          }
        >
          <Download style={{ width: 15, height: 15 }} />
          Download PDF
        </button>

        <button
          type="button"
          className="cert-action-btn flex w-full items-center justify-center gap-2.5 rounded-[11px] py-2.5"
          style={
            {
              border: "1px solid rgba(99,102,241,0.22)",
              background: "rgba(99,102,241,0.06)",
              color: "#6366f1",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              ["--cert-action-glow" as string]: "0 8px 18px rgba(99,102,241,0.18)",
            } as React.CSSProperties
          }
        >
          <Share2 style={{ width: 15, height: 15 }} />
          Share
        </button>

        <button
          type="button"
          className="cert-action-btn flex w-full items-center justify-center gap-2.5 rounded-[11px] py-2.5"
          style={
            {
              border: "1px solid rgba(212,175,55,0.25)",
              background: "rgba(218,165,32,0.07)",
              color: "#92700a",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              ["--cert-action-glow" as string]: "0 8px 18px rgba(212,175,55,0.22)",
            } as React.CSSProperties
          }
        >
          <LinkIcon style={{ width: 15, height: 15 }} />
          Verify Online
        </button>
      </div>
    </div>
  );
}

const DETAILS: { label: string; value: string }[] = [
  { label: "Issued by", value: "Madarsa Tech Academy" },
  { label: "Issue Date", value: "July 6, 2026" },
  { label: "Course", value: "React & Next.js" },
];

function DetailsCard() {
  return (
    <div style={CARD}>
      <PanelLabel>Details</PanelLabel>
      <div className="flex flex-col">
        {DETAILS.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between"
            style={{
              padding: "9px 0",
              borderBottom: i < DETAILS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <span style={{ fontSize: 12.5, color: "#7a8c81" }}>{row.label}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0d1f13" }}>{row.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between" style={{ padding: "9px 0" }}>
          <span style={{ fontSize: 12.5, color: "#7a8c81" }}>Status</span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full"
            style={{
              padding: "3px 10px",
              background: "rgba(22,197,100,0.1)",
              color: "#0d9444",
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            <CheckCircle style={{ width: 12, height: 12 }} />
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}

function XPCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[18px]"
      style={{
        padding: 18,
        background: "linear-gradient(135deg, #0d1f13, #17341f)",
        border: "1px solid rgba(22,197,100,0.15)",
      }}
    >
      <div
        className="pointer-events-none absolute"
        style={{ top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(234,179,8,0.14), transparent 70%)" }}
      />
      <div className="relative flex items-center gap-3.5">
        <div
          className="flex shrink-0 items-center justify-center rounded-[11px]"
          style={{ width: 38, height: 38, background: "rgba(234,179,8,0.14)" }}
        >
          <Star style={{ width: 17, height: 17, color: "#eab308" }} className="fill-current" />
        </div>
        <div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#fbbf24", animation: "rankGlow 2.5s infinite" }}>
            +180 XP
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>Awarded on completion</p>
        </div>
      </div>
    </div>
  );
}

// ─── Upcoming certificates ───────────────────────────────────────────────────

interface LockedCourse {
  title: string;
  bg: string;
  Icon: LucideIcon;
  iconColor: string;
  barFrom: string;
  barTo: string;
  delay: string;
}

const LOCKED: LockedCourse[] = [
  {
    title: "TypeScript Mastery",
    bg: "linear-gradient(145deg, #1e1b4b, #2e1065)",
    Icon: Code2,
    iconColor: "rgba(165,180,252,0.35)",
    barFrom: "#6366f1",
    barTo: "#a5b4fc",
    delay: "0ms",
  },
  {
    title: "Node.js Backend",
    bg: "linear-gradient(145deg, #052e16, #064e3b)",
    Icon: GraduationCap,
    iconColor: "rgba(74,222,128,0.35)",
    barFrom: "#16c564",
    barTo: "#4ade80",
    delay: "80ms",
  },
  {
    title: "Tailwind CSS Pro",
    bg: "linear-gradient(145deg, #0c4a6e, #1e3a5f)",
    Icon: LayoutGrid,
    iconColor: "rgba(125,211,252,0.35)",
    barFrom: "#0284c7",
    barTo: "#7dd3fc",
    delay: "160ms",
  },
];

function LockedCard({ course }: { course: LockedCourse }) {
  const { title, bg, Icon, iconColor, barFrom, barTo, delay } = course;
  return (
    <div
      className="cert-locked-card overflow-hidden rounded-[16px] bg-white"
      style={{
        border: "1.5px dashed rgba(0,0,0,0.08)",
        opacity: 0.7,
        cursor: "not-allowed",
        animationDelay: delay,
      }}
    >
      {/* thumbnail */}
      <div className="relative flex items-center justify-center" style={{ height: 70, background: bg }}>
        <Icon style={{ width: 30, height: 30, color: iconColor }} />
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 8, right: 8, width: 18, height: 18, background: "rgba(0,0,0,0.35)" }}
        >
          <Lock style={{ width: 10, height: 10, color: "#fff" }} />
        </div>
      </div>

      {/* body */}
      <div style={{ padding: "12px 14px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0d1f13" }}>{title}</p>
        <p style={{ fontSize: 10.5, color: "#9aa59f", marginTop: 2, marginBottom: 9 }}>
          Complete course to unlock
        </p>
        <div style={{ height: 4, background: "#f0f4f0", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "0%", background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }} />
        </div>
        <p style={{ fontSize: 10.5, color: "#b0bdb4", marginTop: 6 }}>0% complete</p>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function CertificatesContent() {
  return (
    <div className="flex flex-col gap-6.5 p-4 lg:p-[24px_28px_60px]">
      {/* Section 1 — Earned certificates */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0d1f13" }}>Earned Certificates</p>
          <span
            className="rounded-full"
            style={{
              padding: "3px 12px",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.25)",
              fontSize: 11,
              fontWeight: 700,
              color: "#92700a",
            }}
          >
            1 Certificate
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_268px] lg:gap-5">
          <CertificateCard />

          <div className="flex flex-col gap-3 lg:sticky lg:top-5">
            <ActionsCard />
            <DetailsCard />
            <XPCard />
          </div>
        </div>
      </section>

      {/* Section 2 — Upcoming (locked) certificates */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0d1f13" }}>Upcoming Certificates</p>
          <span
            className="rounded-full"
            style={{
              padding: "3px 12px",
              background: "rgba(0,0,0,0.05)",
              fontSize: 11,
              fontWeight: 700,
              color: "#7a8c81",
            }}
          >
3 Locked
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {LOCKED.map((course) => (
            <LockedCard key={course.title} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
