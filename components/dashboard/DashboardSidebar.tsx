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

function NavButton({ item, index }: { item: NavItem; index: number }) {
  const { label, icon: Icon, active } = item;
  return (
    <button
      type="button"
      style={{
        padding: "10px 12px",
        borderRadius: 10,
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
      className={`relative flex w-full items-center gap-3 text-left text-[13.5px] transition-colors duration-150 ${
        active
          ? "font-bold text-white"
          : "font-semibold text-white/55 hover:bg-white/[0.06]"
      }`}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
          style={{ width: 3, height: 17, backgroundColor: ACCENT }}
        />
      )}
      <Icon
        className="h-[18px] w-[18px] shrink-0"
        style={{ color: active ? ACCENT : "rgba(255,255,255,0.45)" }}
      />
      <span className="truncate">{label}</span>
    </button>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-2 px-3 uppercase"
      style={{
        fontSize: "9.5px",
        fontWeight: 700,
        letterSpacing: "0.13em",
        color: "rgba(255,255,255,0.22)",
      }}
    >
      {children}
    </p>
  );
}

export default function DashboardSidebar() {
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
          background:
            "radial-gradient(circle, rgba(22,197,100,0.2), transparent 70%)",
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
          background:
            "radial-gradient(circle, rgba(22,197,100,0.1), transparent 70%)",
          animation: "orbFloatReverse 11s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Logo */}
      <div className="relative flex items-center gap-2.5 px-4 py-5">
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
        <span
          className="text-white"
          style={{ fontWeight: 800, fontSize: "17px" }}
        >
          EduLearn
        </span>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-2">
        <GroupLabel>Main</GroupLabel>
        <div className="space-y-1">
          {MAIN_NAV.map((item, i) => (
            <NavButton key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-white/10" />

        <GroupLabel>Account</GroupLabel>
        <div className="space-y-1">
          {ACCOUNT_NAV.map((item, i) => (
            <NavButton key={item.label} item={item} index={MAIN_NAV.length + i} />
          ))}
        </div>
      </nav>

      {/* User card */}
      <div
        className="relative flex items-center gap-2.5"
        style={{
          margin: 12,
          padding: "12px 13px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
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
        <div className="min-w-0 flex-1">
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
          className="h-4 w-4 shrink-0"
          style={{ color: "rgba(255,255,255,0.38)" }}
        />
      </div>
    </div>
  );
}
