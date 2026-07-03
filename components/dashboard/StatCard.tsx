import type { LucideIcon } from "lucide-react";
import { theme } from "@/constants/theme";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  badge?: string;
}

export default function StatCard({ icon: Icon, label, value, badge }: StatCardProps) {
  return (
    <div
      style={{ borderColor: theme.border }}
      className="rounded-2xl border bg-white p-6 transition-shadow duration-150 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          style={{ backgroundColor: theme.accentBg }}
          className="flex h-10 w-10 items-center justify-center rounded-xl"
        >
          <Icon style={{ color: theme.accent }} size={18} />
        </div>
        {badge && (
          <span
            style={{ backgroundColor: theme.accentBg, color: theme.accent }}
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-4xl font-bold text-[#111111]">{value}</p>
      <p className="mt-1 text-sm text-[#888888]">{label}</p>
    </div>
  );
}
