"use client";

import { useEffect, useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardShellProps {
  header?: ReactNode;
  children?: ReactNode;
  rightPanel?: ReactNode;
}

const SIDEBAR_SHADOW =
  "drop-shadow(6px 0 20px rgba(0,0,0,0.22)) drop-shadow(2px 0 5px rgba(0,0,0,0.12))";

export default function DashboardShell({
  header,
  children,
  rightPanel,
}: DashboardShellProps) {
  const [expanded, setExpanded] = useState(true);   // desktop collapse state
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer state
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport: below 1024px we switch to the mobile drawer layout.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Leaving mobile? make sure the drawer isn't left "open".
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  // On mobile the sidebar is a full drawer (never the icon-strip).
  const collapsed = isMobile ? false : !expanded;

  const ToggleIcon = isMobile
    ? mobileOpen
      ? X
      : Menu
    : expanded
      ? PanelLeftClose
      : PanelLeftOpen;

  function handleToggle() {
    if (isMobile) setMobileOpen((v) => !v);
    else setExpanded((v) => !v);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#edf1ed]">
      {/* ── Mobile backdrop ── */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
          aria-hidden
        />
      )}

      {/* ── Left sidebar ── icon-strip on desktop, slide-in drawer on mobile */}
      <aside
        className="shrink-0 overflow-hidden"
        style={
          isMobile
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 248,
                zIndex: 50,
                transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.34s cubic-bezier(0.4,0,0.2,1)",
                filter: SIDEBAR_SHADOW,
              }
            : {
                width: expanded ? 236 : 64,
                transition: "width 0.38s cubic-bezier(0.4,0,0.2,1)",
                filter: SIDEBAR_SHADOW,
              }
        }
      >
        <DashboardSidebar
          collapsed={collapsed}
          onNavigate={isMobile ? () => setMobileOpen(false) : undefined}
        />
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

          {/* ── Toggle button ── (collapse on desktop, open drawer on mobile) */}
          <button
            type="button"
            aria-label={
              isMobile
                ? mobileOpen
                  ? "Close menu"
                  : "Open menu"
                : expanded
                  ? "Collapse sidebar"
                  : "Expand sidebar"
            }
            onClick={handleToggle}
            className="group relative flex shrink-0 items-center justify-center"
            style={{ width: 56, height: "100%" }}
          >
            <span
              className="absolute inset-x-2 inset-y-3.5 rounded-xl transition-all duration-200
                         group-hover:bg-[rgba(22,197,100,0.12)] group-active:bg-[rgba(22,197,100,0.20)]"
            />
            <ToggleIcon
              className="relative h-4.5 w-4.5 transition-colors duration-200"
              style={{
                color: isMobile
                  ? mobileOpen
                    ? "#16c564"
                    : "#0d1f13"
                  : expanded
                    ? "#16c564"
                    : "#8a9a8e",
              }}
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

        <main className="hide-scrollbar flex-1 overflow-y-auto">
          {children}

          {/* On mobile/tablet the right panel stacks below the content */}
          {rightPanel && isMobile && (
            <div className="border-t border-black/6">{rightPanel}</div>
          )}
        </main>
      </div>

      {/* ── Right panel ── (desktop only; stacked into <main> on mobile) */}
      {rightPanel && !isMobile && (
        <aside className="w-68 shrink-0">{rightPanel}</aside>
      )}
    </div>
  );
}
