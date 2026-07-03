"use client";

import { Bell, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { theme } from "@/constants/theme";

interface DashboardHeaderProps {
  activeNav: string;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onLogout?: () => void;
}

export default function DashboardHeader({
  activeNav,
  onToggleSidebar,
  sidebarCollapsed,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header
      style={{ borderColor: theme.border }}
      className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-8"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#111111]/60 transition-colors hover:bg-[#f3f4f2] hover:text-[#111111]"
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px]" />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" />
          )}
        </button>
        <div>
          <p
            style={{ color: theme.accent }}
            className="text-xs font-bold uppercase tracking-widest"
          >
            {activeNav || "Dashboard"}
          </p>
          <h1 className="text-xl font-bold text-[#111111]">Welcome back, Uvaish Khan</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          style={{ borderColor: theme.border }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border text-[#111111]/70 transition-colors hover:bg-[#f3f4f2]"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={onLogout}
          style={{ borderColor: theme.border }}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-semibold text-[#111111]/70 transition-colors hover:bg-[#f3f4f2]"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </header>
  );
}
