function FlameIcon() {
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 38,
        height: 38,
        animation: "flamePulse 1.5s ease-in-out infinite",
        willChange: "transform, filter",
      }}
    >
      <path
        d="M19 4c0 0-1.5 4-4 6-2.5 2-4 5-3.5 8.5C12 22 13.5 24 16 25.5c-.5-2 0-4 1.5-5.5 .5 3 2 5.5 4.5 7 1.5-2 1.5-4.5 .5-6.5 2 1.5 3.5 4.5 3 7.5 1.5-1.5 2.5-3.8 2.5-6.5 0-4-2.5-7-5.5-9C22 13.5 20.5 10 19 4Z"
        fill="url(#flameG)"
      />
      <defs>
        <linearGradient id="flameG" x1="19" y1="4" x2="19" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const STREAK_LENGTH = 7;
const ACTIVE = 3;

export default function StreakWidget() {
  return (
    <div
      style={{ animation: "widgetSlideRight 0.5s ease-out both", animationDelay: "200ms" }}
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
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#b0bdb4" }}
            >
              Current Streak
            </p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#0d1f13",
                  lineHeight: 1,
                  animation: "statCountUp 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
                  animationDelay: "250ms",
                  display: "inline-block",
                }}
              >
                3
              </span>
              <span style={{ fontSize: "13px", color: "#7a8c81" }}>days</span>
            </div>
          </div>
          <FlameIcon />
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
