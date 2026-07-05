"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardShellProps {
  header?: ReactNode;
  children?: ReactNode;
  rightPanel?: ReactNode;
}

export default function DashboardShell({
  header,
  children,
  rightPanel,
}: DashboardShellProps) {
  const [expanded, setExpanded] = useState(true);
  const ToggleIcon = expanded ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex h-screen overflow-hidden bg-[#edf1ed]">
      {/* ── Left sidebar ── collapses to 64 px icon-strip */}
      <aside
        className="shrink-0 overflow-hidden"
        style={{
          width: expanded ? 236 : 64,
          transition: "width 0.38s cubic-bezier(0.4,0,0.2,1)",
          filter:
            "drop-shadow(6px 0 20px rgba(0,0,0,0.22)) drop-shadow(2px 0 5px rgba(0,0,0,0.12))",
        }}
      >
        <DashboardSidebar collapsed={!expanded} />
      </aside>

      {/* ── Center column ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ════ Header — curved card ════ */}
        <div
          className="relative flex shrink-0 items-center"
          style={{
            height: 68,
            /* Rounded bottom corners — mirrors sidebar's 22 px language */
            borderRadius: "0 0 22px 22px",
            /* Layered glass: green tint near toggle → neutral white → right edge */
            background:
              "linear-gradient(110deg, rgba(22,197,100,0.10) 0%, rgba(255,255,255,0.88) 28%, rgba(237,241,237,0.96) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            /* "floating card" depth — heavier at bottom to lift it off content */
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.10), 0 3px 10px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
            zIndex: 10,
          }}
        >
          {/* Subtle green left-wash behind toggle area */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full"
            style={{
              width: 90,
              borderRadius: "0 0 0 22px",
              background:
                "linear-gradient(90deg, rgba(22,197,100,0.07), transparent)",
            }}
          />

          {/* ── Toggle button ── */}
          <button
            type="button"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setExpanded((v) => !v)}
            className="group relative flex shrink-0 items-center justify-center"
            style={{ width: 56, height: "100%" }}
          >
            <span
              className="absolute inset-x-2 inset-y-3.5 rounded-xl transition-all duration-200
                         group-hover:bg-[rgba(22,197,100,0.12)] group-active:bg-[rgba(22,197,100,0.20)]"
            />
            <ToggleIcon
              className="relative h-4.5 w-4.5 transition-colors duration-200"
              style={{ color: expanded ? "#16c564" : "#8a9a8e" }}
            />
          </button>

          {/* Thin vertical divider */}
          <div
            className="shrink-0"
            style={{ width: 1, height: 26, background: "rgba(0,0,0,0.09)" }}
          />

          {/* Header slot */}
          <div className="flex min-w-0 flex-1">{header}</div>
        </div>

        <main className="hide-scrollbar flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* ── Right panel ── */}
      <aside className="w-68 shrink-0">{rightPanel}</aside>
    </div>
  );
}
