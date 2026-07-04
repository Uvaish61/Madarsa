import { Flame } from "lucide-react";

const STREAK_LENGTH = 7;
const ACTIVE = 3;

export default function StreakWidget() {
  return (
    <div
      style={{ animation: "slideRight 0.5s ease-out both", animationDelay: "200ms" }}
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
        {/* Orb */}
        <div
          className="pointer-events-none absolute right-0 top-0"
          style={{
            width: 110,
            height: 110,
            transform: "translate(30%,-30%)",
            background: "radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)",
          }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between">
          <div>
            <p
              className="uppercase"
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#b0bdb4",
              }}
            >
              Current Streak
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#0d1f13",
                  lineHeight: 1,
                  animation: "countUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
                  animationDelay: "250ms",
                  display: "inline-block",
                }}
              >
                3
              </span>
              <span style={{ fontSize: "13px", color: "#7a8c81" }}>days</span>
            </div>
          </div>

          {/* Animated flame icon from lucide-react */}
          <Flame
            style={{
              width: 38,
              height: 38,
              color: "#f97316",
              animation: "flamePulse 1.5s ease-in-out infinite",
              willChange: "transform, filter",
            }}
          />
        </div>

        {/* Dots */}
        <div className="relative mt-4 flex items-center" style={{ gap: 6 }}>
          {Array.from({ length: STREAK_LENGTH }, (_, i) => {
            const active = i < ACTIVE;
            return (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  ...(active
                    ? {
                        background: "linear-gradient(135deg, #f97316, #fb923c)",
                        boxShadow: "0 2px 6px rgba(249,115,22,0.35)",
                      }
                    : {
                        background: "#f0f4f0",
                        border: "2px dashed #d0dbd2",
                      }),
                }}
              />
            );
          })}
        </div>

        {/* Caption */}
        <p className="relative mt-3" style={{ fontSize: "11px", color: "#b0bdb4" }}>
          Keep going! 🔥 Best:{" "}
          <span style={{ fontWeight: 700, color: "#f97316" }}>7 days</span>
        </p>
      </div>
    </div>
  );
}
