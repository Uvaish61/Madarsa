"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardShellProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
  rightPanel?: ReactNode;
}

export default function DashboardShell({
  sidebar,
  header,
  children,
  rightPanel,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const ToggleIcon = sidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex h-screen overflow-hidden bg-[#edf1ed]">
      {/* Left sidebar — width collapses + 3D perspective swing on inner content */}
      <aside
        className="shrink-0 overflow-hidden"
        style={{
          width: sidebarOpen ? 236 : 0,
          transition: "width 0.42s cubic-bezier(0.4,0,0.2,1)",
          /* shadow lives on aside so overflow:hidden can't clip it */
          filter: sidebarOpen
            ? "drop-shadow(8px 0 24px rgba(0,0,0,0.28)) drop-shadow(3px 0 6px rgba(0,0,0,0.14))"
            : "none",
        }}
      >
        {/* Inner 236px-wide panel gets the 3D door swing */}
        <div
          style={{
            width: 236,
            height: "100%",
            transformOrigin: "left center",
            transform: sidebarOpen
              ? "perspective(900px) rotateY(0deg) translateX(0px)"
              : "perspective(900px) rotateY(-18deg) translateX(-32px)",
            opacity: sidebarOpen ? 1 : 0,
            transition:
              "transform 0.42s cubic-bezier(0.34,1.08,0.64,1), opacity 0.22s ease",
          }}
        >
          {sidebar}
        </div>
      </aside>

      {/* Center column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ── Header row ── */}
        <div
          className="relative flex shrink-0 items-center"
          style={{
            height: 66,
            /* green tint fades right so it echoes the sidebar */
            background:
              "linear-gradient(90deg, rgba(22,197,100,0.07) 0%, rgba(237,241,237,0.96) 26%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 4px 28px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.65) inset",
          }}
        >
          {/* Gradient accent line at the very bottom */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, rgba(22,197,100,0.35) 0%, rgba(0,0,0,0.07) 28%, transparent 65%)",
            }}
          />

          {/* ── Toggle button ── */}
          <button
            type="button"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => setSidebarOpen((v) => !v)}
            className="group relative flex shrink-0 items-center justify-center"
            style={{ width: 52, height: "100%" }}
          >
            {/* Hover pill behind the icon */}
            <span
              className="absolute inset-x-2 inset-y-3.5 rounded-xl transition-all duration-200 group-hover:bg-[rgba(22,197,100,0.1)] group-active:bg-[rgba(22,197,100,0.18)]"
            />
            <ToggleIcon
              className="relative h-4.5 w-4.5 transition-colors duration-200"
              style={{ color: sidebarOpen ? "#16c564" : "#7a8c81" }}
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

      {/* Right panel */}
      <aside className="w-[272px] shrink-0">{rightPanel}</aside>
    </div>
  );
}
