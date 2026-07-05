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

type NavItem = { label: string; icon: LucideIcon; active?: boolean };

const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "My Courses", icon: BookOpen },
  { label: "Certificates", icon: Award },
  { label: "Progress", icon: BarChart2 },
];

const ACCOUNT_NAV: NavItem[] = [
  { label: "Settings", icon: Settings },
  { label: "Profile", icon: User },
];

const ACCENT = "#16c564";

/* ─── Shared transition timing ─── */
const LABEL_TRANSITION = "max-width 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease";
const PAD_TRANSITION = "padding 0.32s cubic-bezier(0.4,0,0.2,1)";

function NavButton({
  item,
  index,
  collapsed,
}: {
  item: NavItem;
  index: number;
  collapsed: boolean;
}) {
  const { label, icon: Icon, active } = item;

  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      style={{
        /* center icon in 64px strip; restore left-aligned layout when expanded */
        padding: collapsed ? "10px 0" : "10px 12px",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0 : 10,
        transition: `${PAD_TRANSITION}, gap 0.32s cubic-bezier(0.4,0,0.2,1)`,
        animation: "slideIn 0.4s ease-out both",
        animationDelay: `${index * 60}ms`,
        ...(active
          ? {
              background:
                "linear-gradient(135deg, rgba(22,197,100,0.2), rgba(22,197,100,0.07))",
              border: "1px solid rgba(22,197,100,0.18)",
            }
          : { border: "1px solid transparent" }),
      }}
      className={`relative text-left text-[13.5px] transition-colors duration-150 ${
        active
          ? "font-bold text-white"
          : "font-semibold text-white/55 hover:bg-white/6"
      }`}
    >
      {/* Left active bar — hides when collapsed, replaced by bottom dot */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
          style={{
            width: 3,
            height: 17,
            backgroundColor: ACCENT,
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* Active dot indicator for collapsed state */}
      {active && (
        <span
          className="absolute rounded-full"
          style={{
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            background: ACCENT,
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
          color: active ? ACCENT : "rgba(255,255,255,0.45)",
        }}
      />

      {/* Label slides + fades out */}
      <span
        style={{
          overflow: "hidden",
          maxWidth: collapsed ? 0 : 160,
          opacity: collapsed ? 0 : 1,
          whiteSpace: "nowrap",
          transition: LABEL_TRANSITION,
          fontSize: "13.5px",
        }}
      >
        {label}
      </span>
    </button>
  );
}

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
        letterSpacing: "0.13em",
        color: "rgba(255,255,255,0.22)",
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

export default function DashboardSidebar({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0b1f13, #0e2c1a, #0a1e10)",
        borderRadius: "0 22px 22px 0",
        borderRight: "1px solid rgba(22,197,100,0.18)",
      }}
    >
      {/* Animated orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: -40,
          left: -40,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(22,197,100,0.2), transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -50,
          right: -50,
          width: 220,
          height: 220,
          background: "radial-gradient(circle, rgba(22,197,100,0.1), transparent 70%)",
          animation: "orbFloatReverse 11s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* ── Logo ── */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{
          gap: collapsed ? 0 : 10,
          padding: collapsed ? "20px 0" : "20px 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          transition: `${PAD_TRANSITION}, gap 0.32s cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        <div
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #16c564, #0fa04d)",
            boxShadow: "0 4px 16px rgba(22,197,100,0.45)",
          }}
        >
          <GraduationCap className="h-5 w-5 text-white" />
        </div>

        {/* Brand name slides out */}
        <span
          className="text-white"
          style={{
            fontWeight: 800,
            fontSize: "17px",
            overflow: "hidden",
            maxWidth: collapsed ? 0 : 120,
            opacity: collapsed ? 0 : 1,
            whiteSpace: "nowrap",
            transition: LABEL_TRANSITION,
          }}
        >
          EduLearn
        </span>
      </div>

      {/* ── Nav ── */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-2">
        <GroupLabel collapsed={collapsed}>Main</GroupLabel>
        <div className="space-y-1">
          {MAIN_NAV.map((item, i) => (
            <NavButton key={item.label} item={item} index={i} collapsed={collapsed} />
          ))}
        </div>

        <div className="my-4 h-px bg-white/10" />

        <GroupLabel collapsed={collapsed}>Account</GroupLabel>
        <div className="space-y-1">
          {ACCOUNT_NAV.map((item, i) => (
            <NavButton
              key={item.label}
              item={item}
              index={MAIN_NAV.length + i}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      {/* ── User card ── */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{
          margin: 12,
          padding: collapsed ? "12px 0" : "12px 13px",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 10,
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: `${PAD_TRANSITION}, gap 0.32s cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        <div
          className="flex shrink-0 items-center justify-center rounded-full text-white"
          style={{
            width: 34,
            height: 34,
            background: "linear-gradient(135deg, #16c564, #0fa04d)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          UK
        </div>

        {/* Name + email slide out */}
        <div
          className="overflow-hidden"
          style={{
            minWidth: 0,
            maxWidth: collapsed ? 0 : 140,
            opacity: collapsed ? 0 : 1,
            flex: collapsed ? "0 0 auto" : "1 1 auto",
            transition: LABEL_TRANSITION,
          }}
        >
          <p
            className="truncate text-white"
            style={{ fontSize: "12.5px", fontWeight: 700 }}
          >
            Uvaish Khan
          </p>
          <p
            className="truncate"
            style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.38)" }}
          >
            uvaishkhan@gmail.com
          </p>
        </div>

        <MoreVertical
          className="shrink-0"
          style={{
            width: 16,
            height: 16,
            color: "rgba(255,255,255,0.38)",
            maxWidth: collapsed ? 0 : 16,
            opacity: collapsed ? 0 : 1,
            overflow: "hidden",
            transition: LABEL_TRANSITION,
          }}
        />
      </div>
    </div>
  );
}
