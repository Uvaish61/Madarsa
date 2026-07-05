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
      {/* Left sidebar — width collapses to 0 on toggle */}
      <aside
        className="shrink-0 overflow-hidden"
        style={{
          width: sidebarOpen ? 236 : 0,
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Inner div keeps sidebar content at full 236px so it slides out cleanly */}
        <div style={{ width: 236, height: "100%" }}>{sidebar}</div>
      </aside>

      {/* Center column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header row: toggle button sits at the left edge, header fills the rest */}
        <div
          className="flex shrink-0 items-center"
          style={{
            height: 66,
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(237,241,237,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset",
          }}
        >
          {/* Toggle button */}
          <button
            type="button"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex shrink-0 items-center justify-center transition-colors duration-150 hover:bg-black/5 active:bg-black/9"
            style={{
              width: 52,
              height: "100%",
              borderRight: "1px solid rgba(0,0,0,0.06)",
              color: "#555",
            }}
          >
            <ToggleIcon className="h-4.5 w-4.5" />
          </button>

          {/* Header slot fills remaining space — strip its own border/bg since Shell owns those */}
          <div className="flex min-w-0 flex-1">{header}</div>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Right panel */}
      <aside className="w-[272px] shrink-0">{rightPanel}</aside>
    </div>
  );
}
