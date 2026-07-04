import { ArrowRight } from "lucide-react";

type Entry = {
  medal: string;
  initials: string;
  avatarBg: string;
  name: string;
  xp: string;
  xpColor: string;
};

const TOP: Entry[] = [
  {
    medal: "🥇",
    initials: "AR",
    avatarBg: "linear-gradient(135deg, #a855f7, #7c3aed)",
    name: "Arjun R.",
    xp: "1200 XP",
    xpColor: "#eab308",
  },
  {
    medal: "🥈",
    initials: "SK",
    avatarBg: "linear-gradient(135deg, #f97316, #dc2626)",
    name: "Sara K.",
    xp: "980 XP",
    xpColor: "#94a3b8",
  },
  {
    medal: "🥉",
    initials: "MZ",
    avatarBg: "linear-gradient(135deg, #16c564, #0d9444)",
    name: "Moiz Z.",
    xp: "760 XP",
    xpColor: "#cd7c2a",
  },
];

function Avatar({
  initials,
  bg,
}: {
  initials: string;
  bg: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center text-white"
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: bg,
        fontSize: "10px",
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
  );
}

export default function LeaderboardWidget() {
  return (
    <div
      style={{ animation: "slideRight 0.5s ease-out both", animationDelay: "500ms" }}
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
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#0d1f13" }}>
            Leaderboard
          </span>
          <a
            href="#"
            className="flex items-center gap-1"
            style={{ fontSize: "11.5px", fontWeight: 600, color: "#16c564" }}
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Top 3 rows */}
        <div className="mt-4 space-y-3">
          {TOP.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center"
              style={{ gap: 10 }}
            >
              <span style={{ fontSize: "14px", width: 20, textAlign: "center" }}>
                {entry.medal}
              </span>
              <Avatar initials={entry.initials} bg={entry.avatarBg} />
              <span
                className="flex-1 truncate"
                style={{ fontSize: "12.5px", fontWeight: 600, color: "#0d1f13" }}
              >
                {entry.name}
              </span>
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: entry.xpColor }}>
                {entry.xp}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-3" style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />

        {/* You row */}
        <div
          className="flex items-center"
          style={{
            gap: 10,
            padding: "8px 10px",
            borderRadius: 10,
            background: "rgba(22,197,100,0.06)",
            border: "1px solid rgba(22,197,100,0.12)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#16c564",
              width: 20,
              textAlign: "center",
            }}
          >
            #42
          </span>
          <Avatar
            initials="UK"
            bg="linear-gradient(135deg, #16c564, #0d9444)"
          />
          <span
            className="flex-1"
            style={{ fontSize: "12.5px", fontWeight: 700, color: "#0d1f13" }}
          >
            You
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#16c564" }}>
            320 XP
          </span>
        </div>
      </div>
    </div>
  );
}
