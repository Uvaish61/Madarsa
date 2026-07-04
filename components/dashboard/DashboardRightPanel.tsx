import CalendarWidget from "@/components/dashboard/CalendarWidget";
import DailyGoalWidget from "@/components/dashboard/DailyGoalWidget";
import RankWidget from "@/components/dashboard/RankWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";

export default function DashboardRightPanel() {
  return (
    <div
      className="flex h-full flex-col overflow-y-auto"
      style={{
        borderLeft: "1px solid rgba(0,0,0,0.06)",
        background: "rgba(237,241,237,0.5)",
        padding: "24px 16px",
        gap: 16,
      }}
    >
      <CalendarWidget />
      <StreakWidget />
      <RankWidget />
      <DailyGoalWidget />
    </div>
  );
}
