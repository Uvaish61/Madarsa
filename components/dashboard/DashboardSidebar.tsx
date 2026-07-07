"use client";

import {
  Award,
  BarChart2,
  BookOpen,
  GraduationCap,
  LayoutGrid,
  MoreVertical,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/app-store";

type NavItem = { label: string; icon: LucideIcon; href: string };

const MAIN_NAV: NavItem[] = [
  { label: "Dashboard",    icon: LayoutGrid, href: "/dashboard" },
  { label: "My Courses",   icon: BookOpen,   href: "/dashboard/courses" },
  { label: "Certificates", icon: Award,      href: "/dashboard/certificates" },
  { label: "Progress",     icon: BarChart2,  href: "/dashboard/progress" },
];

const ACCOUNT_NAV: NavItem[] = [
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Profile",  icon: User,     href: "/dashboard/profile" },
];

const ACCENT = "#16c564";
const LABEL_T = "max-width 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease";
const PAD_T   = "padding 0.32s cubic-bezier(0.4,0,0.2,1)";
const GAP_T   = "gap 0.32s cubic-bezier(0.4,0,0.2,1)";

/* ─────────────────────── NavButton ─────────────────────── */
function NavButton({
  item,
  index,
  collapsed,
  pathname,
}: {
  item: NavItem;
  index: number;
  collapsed: boolean;
  pathname: string;
}) {
  const { label, icon: Icon, href } = item;
  const active =
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        padding: collapsed ? "10px 0" : "10px 12px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0 : 10,
        textDecoration: "none",
        transition: `${PAD_T}, ${GAP_T}`,
        animation: "slideIn 0.4s ease-out both",
        animationDelay: `${index * 60}ms`,
        ...(active
          ? {
              background:
                "linear-gradient(135deg, rgba(22,197,100,0.22), rgba(22,197,100,0.08))",
              border: "1px solid rgba(22,197,100,0.22)",
              boxShadow:
                "0 0 18px rgba(22,197,100,0.14), inset 0 1px 0 rgba(255,255,255,0.07)",
            }
          : {
              border: "1px solid transparent",
              boxShadow: "none",
            }),
      }}
      className={`relative text-left text-[13.5px] transition-all duration-150 ${
        active
          ? "font-bold text-white"
          : "font-semibold text-white/55 hover:border-white/6 hover:bg-white/5"
      }`}
    >
      {/* Left active bar (expanded only) */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
          style={{
            width: 3,
            height: 18,
            background: "linear-gradient(180deg, #20e57a, #16c564)",
            boxShadow: "0 0 8px rgba(22,197,100,0.6)",
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* Active dot (collapsed only) */}
      {active && (
        <span
          className="absolute rounded-full"
          style={{
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            background: ACCENT,
            boxShadow: "0 0 6px rgba(22,197,100,0.7)",
            opacity: collapsed ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      <Icon
        className="shrink-0"
        style={{
          width: 18,
          height: 18,
          color: active ? ACCENT : "rgba(255,255,255,0.40)",
          /* subtle glow on active icon */
          filter: active
            ? "drop-shadow(0 0 5px rgba(22,197,100,0.55))"
            : "none",
          transition: "filter 0.2s ease, color 0.2s ease",
        }}
      />

      {/* Label */}
      <span
        style={{
          overflow: "hidden",
          maxWidth: collapsed ? 0 : 160,
          opacity: collapsed ? 0 : 1,
          whiteSpace: "nowrap",
          transition: LABEL_T,
          fontSize: "13.5px",
        }}
      >
        {label}
      </span>
    </Link>
  );
}

/* ─────────────────────── GroupLabel ────────────────────── */
function GroupLabel({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <p
      className="overflow-hidden px-3 uppercase"
      style={{
        fontSize: "9.5px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.20)",
        maxHeight: collapsed ? 0 : 24,
        marginBottom: collapsed ? 0 : 8,
        opacity: collapsed ? 0 : 1,
        transition:
          "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease, margin-bottom 0.3s ease",
      }}
    >
      {children}
    </p>
  );
}

/* ─────────────────────── Main export ───────────────────── */
export default function DashboardSidebar({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const displayName = user?.name || "Student";
  const email = user?.email || "student@example.com";
  const initials = getInitials(displayName || email);
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #0d2217 0%, #0b1d13 40%, #071510 100%)",
        borderRadius: "0 22px 22px 0",
        /* right border: layered green glow */
        borderRight: "1px solid rgba(22,197,100,0.20)",
        boxShadow: "inset -1px 0 0 rgba(22,197,100,0.07)",
      }}
    >
      {/* ── Orb top-left ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: -48,
          left: -48,
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle at 40% 40%, rgba(22,197,100,0.22), transparent 65%)",
          animation: "orbFloat 8s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* ── Orb bottom-right ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -60,
          right: -60,
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle at 60% 60%, rgba(22,197,100,0.12), transparent 65%)",
          animation: "orbFloatReverse 11s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* ── Orb mid accent ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "38%",
          right: -30,
          width: 140,
          height: 140,
          background:
            "radial-gradient(circle, rgba(22,197,100,0.08), transparent 70%)",
          animation: "orbFloat 13s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* ════ Logo ════ */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{
          gap: collapsed ? 0 : 10,
          padding: collapsed ? "22px 0" : "20px 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          transition: `${PAD_T}, ${GAP_T}`,
        }}
      >
        {/* Icon with ring */}
        <div
          className="relative flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #1de070, #0fa04d)",
            boxShadow:
              "0 4px 18px rgba(22,197,100,0.50), inset 0 1px 0 rgba(255,255,255,0.20)",
          }}
        >
          <GraduationCap className="h-5 w-5 text-white" />
          {/* Subtle ring around logo icon */}
          <span
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          />
        </div>

        {/* Brand name */}
        <span
          className="text-white"
          style={{
            fontWeight: 800,
            fontSize: "17px",
            letterSpacing: "-0.3px",
            overflow: "hidden",
            maxWidth: collapsed ? 0 : 120,
            opacity: collapsed ? 0 : 1,
            whiteSpace: "nowrap",
            transition: LABEL_T,
          }}
        >
          Madarsa
        </span>
      </div>

      {/* Logo → nav gradient separator */}
      <div
        className="relative mx-4"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, rgba(22,197,100,0.30), rgba(22,197,100,0.08) 60%, transparent)",
          marginBottom: 12,
        }}
      />

      {/* ════ Nav ════ */}
      <nav className="relative flex-1 overflow-y-auto px-3 pb-2">
        <GroupLabel collapsed={collapsed}>Main</GroupLabel>
        <div className="space-y-1">
          {MAIN_NAV.map((item, i) => (
            <NavButton key={item.label} item={item} index={i} collapsed={collapsed} pathname={pathname} />
          ))}
        </div>

        {/* Gradient section divider */}
        <div
          className="my-4"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(22,197,100,0.18), rgba(255,255,255,0.06) 50%, transparent)",
          }}
        />

        <GroupLabel collapsed={collapsed}>Account</GroupLabel>
        <div className="space-y-1">
          {ACCOUNT_NAV.map((item, i) => (
            <NavButton
              key={item.label}
              item={item}
              index={MAIN_NAV.length + i}
              collapsed={collapsed}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>

      {/* ════ User card ════ */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{
          margin: 12,
          padding: collapsed ? "12px 0" : "11px 12px",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 10,
          borderRadius: 14,
          /* layered frosted-dark glass */
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.18)",
          transition: `${PAD_T}, ${GAP_T}`,
        }}
      >
        {/* Avatar with green ring */}
        <div
          className="shrink-0 p-0.5"
          style={{
            borderRadius: "50%",
            background: "linear-gradient(135deg, #16c564, #0a7a3a)",
            boxShadow: "0 0 10px rgba(22,197,100,0.35)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: 30,
              height: 30,
              background: "linear-gradient(135deg, #16c564, #0fa04d)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            {initials}
          </div>
        </div>

        {/* Name + email */}
        <div
          className="overflow-hidden"
          style={{
            minWidth: 0,
            maxWidth: collapsed ? 0 : 138,
            opacity: collapsed ? 0 : 1,
            flex: collapsed ? "0 0 auto" : "1 1 auto",
            transition: LABEL_T,
          }}
        >
          <p
            className="truncate text-white"
            style={{ fontSize: "12.5px", fontWeight: 700 }}
          >
            {displayName}
          </p>
          <p
            className="truncate"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.36)" }}
          >
            {email}
          </p>
        </div>

        <MoreVertical
          className="shrink-0"
          style={{
            width: 15,
            height: 15,
            color: "rgba(255,255,255,0.35)",
            maxWidth: collapsed ? 0 : 15,
            opacity: collapsed ? 0 : 1,
            overflow: "hidden",
            transition: LABEL_T,
          }}
        />
      </div>
    </div>
  );
}
