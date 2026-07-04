import {
  ArrowRight,
  GraduationCap,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

type QuickLink = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  rgb: string; // theme "r,g,b"
  color: string; // solid accent
};

const LINKS: QuickLink[] = [
  {
    icon: GraduationCap,
    title: "Explore courses",
    subtitle: "See what else you can learn",
    rgb: "22,197,100",
    color: "#16c564",
  },
  {
    icon: MessageCircle,
    title: "Need help?",
    subtitle: "Talk to our support team",
    rgb: "59,130,246",
    color: "#3b82f6",
  },
];

export default function DashboardQuickLinks() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {LINKS.map(({ icon: Icon, title, subtitle, rgb, color }) => (
        <div
          key={title}
          style={{ animation: "statFadeUp 0.5s ease-out both", animationDelay: "400ms" }}
        >
          <button
            type="button"
            className="quick-link flex w-full cursor-pointer items-center bg-white text-left"
            style={
              {
                gap: 14,
                padding: "16px 18px",
                borderRadius: 15,
                border: "1px solid rgba(0,0,0,0.06)",
                "--ql-glow": `0 10px 30px rgba(${rgb},0.1)`,
              } as React.CSSProperties
            }
          >
            <div
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: `rgba(${rgb},0.11)`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p style={{ fontSize: "13.5px", fontWeight: 700, color: "#0d1f13" }}>
                {title}
              </p>
              <p style={{ fontSize: "11.5px", color: "#7a8c81" }}>{subtitle}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#bbb" }} />
          </button>
        </div>
      ))}
    </div>
  );
}
