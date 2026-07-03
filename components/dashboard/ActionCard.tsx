import { ChevronRight, type LucideIcon } from "lucide-react";
import { theme } from "@/constants/theme";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function ActionCard({ icon: Icon, title, subtitle, onClick }: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      style={{ borderColor: theme.border }}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-5 transition-colors duration-150 hover:border-[#20c997]"
    >
      <div
        style={{ backgroundColor: theme.accentBg }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      >
        <Icon style={{ color: theme.accent }} size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#111111]">{title}</p>
        <p className="mt-0.5 text-xs text-[#888888]">{subtitle}</p>
      </div>
      <ChevronRight className="shrink-0 text-gray-300" />
    </div>
  );
}
