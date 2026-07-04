import { ChevronLeft, ChevronRight } from "lucide-react";

type Cell = { day: number; muted?: boolean; today?: boolean; activity?: boolean };

// July 2026 starts on Wednesday (offset 3). Static month view — deterministic,
// no Date() so it stays hydration-safe.
function buildCells(): Cell[] {
  const cells: Cell[] = [];
  // June tail (3 leading cells: Sun, Mon, Tue → June 28, 29, 30)
  [28, 29, 30].forEach((day) => cells.push({ day, muted: true }));
  // July 1–31
  for (let day = 1; day <= 31; day++) {
    cells.push({ day, today: day === 4, activity: day === 3 || day === 8 });
  }
  // August tail to complete the final week
  const remainder = cells.length % 7;
  if (remainder !== 0) {
    for (let day = 1; day <= 7 - remainder; day++) cells.push({ day, muted: true });
  }
  return cells;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const CELLS = buildCells();

function ChevronButton({
  icon: Icon,
  label,
}: {
  icon: typeof ChevronLeft;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center justify-center"
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#f7faf7",
      }}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: "#5a6b5f" }} />
    </button>
  );
}

export default function CalendarWidget() {
  return (
    <div
      style={{ animation: "widgetSlideRight 0.5s ease-out both", animationDelay: "100ms" }}
    >
      <div
        className="bg-white"
        style={{
          borderRadius: 18,
          padding: 18,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#0d1f13" }}>
            July 2026
          </span>
          <div className="flex gap-1.5">
            <ChevronButton icon={ChevronLeft} label="Previous month" />
            <ChevronButton icon={ChevronRight} label="Next month" />
          </div>
        </div>

        {/* Day-of-week row */}
        <div className="mt-4 grid grid-cols-7 gap-0.5 text-center">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              style={{ fontSize: "10px", fontWeight: 700, color: "#b0bdb4" }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date grid */}
        <div className="mt-1.5 grid grid-cols-7" style={{ gap: 2 }}>
          {CELLS.map((cell, i) => (
            <div
              key={i}
              className={`cal-day relative flex items-center justify-center ${
                cell.muted ? "cal-day--muted" : ""
              }`}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                fontSize: "11.5px",
                fontWeight: cell.today ? 700 : 500,
                cursor: "pointer",
                ...(cell.today
                  ? {
                      background: "linear-gradient(135deg, #16c564, #0d9444)",
                      color: "#fff",
                      boxShadow: "0 3px 10px rgba(22,197,100,0.4)",
                    }
                  : {}),
              }}
            >
              {cell.day}
              {cell.activity && (
                <span
                  className="absolute rounded-full"
                  style={{
                    bottom: 3,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    background: "#16c564",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
