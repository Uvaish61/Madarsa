import type { ReactNode } from "react";

interface DashboardShellProps {
  /** Fixed-width left column — 236px, does not shrink. */
  sidebar?: ReactNode;
  /** Sits on top of the center column, does not scroll. */
  header?: ReactNode;
  /** Fills the center column and scrolls independently. */
  children?: ReactNode;
  /** Fixed-width right column — 272px, does not shrink. */
  rightPanel?: ReactNode;
}

/**
 * Structural three-column shell for the dashboard: a fixed left sidebar, a
 * flexible center column (header + scrollable main), and a fixed right panel.
 * Full viewport height with the page itself locked from scrolling.
 */
export default function DashboardShell({
  sidebar,
  header,
  children,
  rightPanel,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#edf1ed]">
      {/* Left sidebar — fixed width, no shrink */}
      <aside className="w-[236px] shrink-0">{sidebar}</aside>

      {/* Center column — header on top, scrollable main below */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="shrink-0">{header}</header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Right panel — fixed width, no shrink */}
      <aside className="w-[272px] shrink-0">{rightPanel}</aside>
    </div>
  );
}
