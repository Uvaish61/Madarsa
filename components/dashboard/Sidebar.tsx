"use client";

import {
  Award,
  BarChart2,
  BookOpen,
  GraduationCap,
  LayoutGrid,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
import { theme } from "@/constants/theme";

interface SidebarProps {
  activeNav: string;
  onNavChange: (item: string) => void;
  collapsed: boolean;
}

type NavItem = { key: string; label: string; icon: LucideIcon };

const MAIN_NAV: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "courses", label: "My Courses", icon: BookOpen },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "progress", label: "Progress", icon: BarChart2 },
];

const ACCOUNT_NAV: NavItem[] = [
  { key: "settings", label: "Settings", icon: Settings },
  { key: "profile", label: "Profile", icon: User },
];

function NavGroup({
  label,
  items,
  activeNav,
  onNavChange,
  collapsed,
  className,
}: {
  label: string;
  items: NavItem[];
  activeNav: string;
  onNavChange: (item: string) => void;
  collapsed: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {!collapsed && (
        <p className="mb-2 px-3 text-[10.5px] font-bold uppercase tracking-wider text-white/40">
          {label}
        </p>
      )}
      <div className="space-y-1">
        {items.map(({ key, label: itemLabel, icon: Icon }) => {
          const isActive = activeNav === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavChange(key)}
              title={collapsed ? itemLabel : undefined}
              style={
                isActive
                  ? { backgroundColor: `${theme.accent}33`, color: theme.accent }
                  : undefined
              }
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-150 ${
                isActive ? "" : "text-white/65 hover:bg-white/10"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{itemLabel}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar({ activeNav, onNavChange, collapsed }: SidebarProps) {
  return (
    <aside
      style={{ backgroundColor: theme.primary }}
      className={`flex h-full shrink-0 flex-col overflow-hidden transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div
          style={{ backgroundColor: theme.accent }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        >
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="truncate text-[16px] font-extrabold text-white">EduLearn</span>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <NavGroup
          label="Main"
          items={MAIN_NAV}
          activeNav={activeNav}
          onNavChange={onNavChange}
          collapsed={collapsed}
        />
        <NavGroup
          label="Account"
          items={ACCOUNT_NAV}
          activeNav={activeNav}
          onNavChange={onNavChange}
          collapsed={collapsed}
          className="mt-6"
        />
      </nav>

      {/* User */}
      <div className="flex items-center gap-2.5 border-t border-white/10 px-4 py-4">
        <div
          style={{ backgroundColor: theme.accent }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold text-white"
        >
          UK
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-white">Uvaish Khan</p>
            <p className="truncate text-[11.5px] text-white/55">uvaishkhan@gmail.com</p>
          </div>
        )}
      </div>
    </aside>
  );
}
