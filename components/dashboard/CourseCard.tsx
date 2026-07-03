import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { theme } from "@/constants/theme";

interface CourseCardProps {
  title: string;
  progress: number;
  enrolled: boolean;
  thumbnail?: string;
}

function CodeEditorPlaceholder() {
  return (
    <div className="flex h-36 w-full flex-col justify-center gap-1 bg-[#0d1117] px-5 font-mono text-[12px] leading-relaxed">
      <p>
        <span className="text-blue-400">const</span>{" "}
        <span className="text-purple-400">Course</span> = () =&gt; {"{"}
      </p>
      <p className="pl-4">
        <span className="text-blue-400">return</span> (
      </p>
      <p className="pl-8">
        <span className="text-green-400">&lt;div&gt;</span>
      </p>
      <p className="pl-12 text-gray-400">Learn. Build. Ship.</p>
      <p className="pl-8">
        <span className="text-green-400">&lt;/div&gt;</span>
      </p>
      <p className="pl-4">);</p>
      <p>{"}"}</p>
    </div>
  );
}

export default function CourseCard({ title, progress, enrolled, thumbnail }: CourseCardProps) {
  return (
    <div
      style={{ borderColor: theme.border }}
      className="overflow-hidden rounded-2xl border bg-white"
    >
      <div className="relative h-36 w-full">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <CodeEditorPlaceholder />
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-3 font-bold text-[#111111]">{title}</h3>

        <div className="mb-2 h-1 w-full overflow-hidden rounded bg-gray-100">
          <div
            style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: theme.accent }}
            className="h-full rounded"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="text-[#888888]">{progress}% complete</span>
          {enrolled && (
            <span style={{ color: theme.accent }} className="flex items-center gap-1 font-semibold">
              <CheckCircle className="h-3.5 w-3.5" />
              Enrolled
            </span>
          )}
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-[#1a4731] py-2.5 font-semibold text-white transition-colors hover:bg-[#14532d]"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}
