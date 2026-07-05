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
      {/* ── Left sidebar ── collapses to icon-strip at 64px */}
      <aside
        className="shrink-0 overflow-hidden"
        style={{
          width: expanded ? 236 : 64,
          transition: "width 0.38s cubic-bezier(0.4,0,0.2,1)",
          filter: "drop-shadow(6px 0 20px rgba(0,0,0,0.22)) drop-shadow(2px 0 5px rgba(0,0,0,0.12))",
        }}
      >
        <DashboardSidebar collapsed={!expanded} />
      </aside>

      {/* ── Center column ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header row */}
        <div
          className="relative flex shrink-0 items-center"
          style={{
            height: 66,
            background:
              "linear-gradient(90deg, rgba(22,197,100,0.07) 0%, rgba(237,241,237,0.96) 26%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 4px 28px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.65) inset",
          }}
        >
          {/* Gradient accent bottom line */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(22,197,100,0.35) 0%, rgba(0,0,0,0.07) 28%, transparent 65%)",
            }}
          />

          {/* Toggle button */}
          <button
            type="button"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setExpanded((v) => !v)}
            className="group relative flex shrink-0 items-center justify-center"
            style={{ width: 52, height: "100%" }}
          >
            <span className="absolute inset-x-2 inset-y-3.5 rounded-xl transition-all duration-200 group-hover:bg-[rgba(22,197,100,0.1)] group-active:bg-[rgba(22,197,100,0.18)]" />
            <ToggleIcon
              className="relative h-4.5 w-4.5 transition-colors duration-200"
              style={{ color: expanded ? "#16c564" : "#7a8c81" }}
            />
          </button>

          {/* Thin vertical divider */}
          <div
            className="shrink-0"
            style={{ width: 1, height: 28, background: "rgba(0,0,0,0.08)" }}
          />

          {/* Header slot */}
          <div className="flex min-w-0 flex-1">{header}</div>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* ── Right panel ── */}
      <aside className="w-68 shrink-0">{rightPanel}</aside>
    </div>
  );
}
