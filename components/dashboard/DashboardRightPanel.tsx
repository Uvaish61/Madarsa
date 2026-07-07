import CalendarWidget from "@/components/dashboard/CalendarWidget";
import DailyGoalWidget from "@/components/dashboard/DailyGoalWidget";
import LeaderboardWidget from "@/components/dashboard/LeaderboardWidget";
import RankWidget from "@/components/dashboard/RankWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";

export default function DashboardRightPanel() {
  return (
    <div
      className="flex flex-col gap-4 p-4 lg:h-full lg:overflow-y-auto lg:border-l lg:border-black/6 lg:px-4 lg:py-6"
      style={{ background: "rgba(237,241,237,0.5)" }}
    >
      <CalendarWidget />
      <StreakWidget />
      <RankWidget />
      <DailyGoalWidget />
      <LeaderboardWidget />
    </div>
  );
}
