import { Clock } from "lucide-react";

export default function DailyGoalWidget() {
  return (
    <div
      style={{ animation: "slideRight 0.5s ease-out both", animationDelay: "400ms" }}
    >
      <div
        className="relative overflow-hidden bg-white"
        style={{
          borderRadius: 18,
          padding: 18,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <p
              className="uppercase"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#b0bdb4" }}
            >
              Daily Goal
            </p>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0d1f13", marginTop: 2 }}>
              30 min learning
            </p>
          </div>

          {/* Conic-gradient ring */}
          <div
            className="relative flex shrink-0 items-center justify-center"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "conic-gradient(#16c564 0% 20%, #f0f4f0 20%)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-white"
              style={{ width: 30, height: 30 }}
            >
              <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#16c564" }}>
                20%
              </span>
            </div>
          </div>
        </div>

        {/* Progress detail row */}
        <div
          className="mt-4 flex items-center gap-2.5 rounded-xl"
          style={{ padding: "10px 12px", background: "rgba(22,197,100,0.06)" }}
        >
          <div
            className="flex shrink-0 items-center justify-center"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "rgba(22,197,100,0.12)",
            }}
          >
            <Clock className="h-4 w-4" style={{ color: "#16c564" }} />
          </div>
          <span
            className="flex-1"
            style={{ fontSize: "12.5px", fontWeight: 600, color: "#0d1f13" }}
          >
            6 min studied
          </span>
          <span style={{ fontSize: "12px", color: "#7a8c81" }}>of 30 min</span>
        </div>

        {/* 3px bar */}
        <div
          className="mt-3 overflow-hidden rounded-full"
          style={{ height: 3, background: "rgba(0,0,0,0.06)" }}
        >
          <div
            className="h-full rounded-full"
            style={
              {
                "--pct": "20%",
                background: "linear-gradient(90deg, rgba(22,197,100,0.7), #16c564)",
                animation: "progressFill 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
                animationDelay: "550ms",
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
