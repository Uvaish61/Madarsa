export default function RankWidget() {
  return (
    <div
      style={{ animation: "slideRight 0.5s ease-out both", animationDelay: "300ms" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 18,
          padding: 18,
          background: "linear-gradient(135deg, #0d1f13, #16321e)",
          border: "1px solid rgba(22,197,100,0.15)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}
      >
        {/* Gold orb */}
        <div
          className="pointer-events-none absolute right-0 top-0"
          style={{
            width: 120,
            height: 120,
            transform: "translate(30%,-30%)",
            background: "radial-gradient(circle, rgba(234,179,8,0.12), transparent 70%)",
          }}
        />

        {/* Label */}
        <p
          className="relative uppercase"
          style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}
        >
          Your Rank
        </p>

        {/* Rank row */}
        <div className="relative mt-3 flex items-center gap-3">
          <div
            className="flex shrink-0 items-center justify-center text-white"
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #eab308, #ca8a04)",
              fontSize: "22px",
              fontWeight: 700,
              animation: "rankGlow 2.5s ease-in-out infinite",
            }}
          >
            #42
          </div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
              Rising Star
            </p>
            <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.45)" }}>
              Top 15% this month
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="relative mt-4">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
              XP Progress
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#eab308" }}>
              320 / 500 XP
            </span>
          </div>
          <div
            className="mt-1.5 overflow-hidden rounded-full"
            style={{ height: 5, background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-full rounded-full"
              style={
                {
                  "--pct": "64%",
                  background: "linear-gradient(90deg, #ca8a04, #eab308)",
                  animation: "progressFill 0.9s cubic-bezier(0.34,1.56,0.64,1) both",
                  animationDelay: "400ms",
                } as React.CSSProperties
              }
            />
          </div>
          <p className="mt-2" style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.3)" }}>
            180 XP to next rank:{" "}
            <span style={{ fontWeight: 700, color: "#eab308" }}>Expert</span>
          </p>
        </div>
      </div>
    </div>
  );
}
