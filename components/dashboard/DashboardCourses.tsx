import { ArrowRight, Check } from "lucide-react";

function CodeThumbnail() {
  return (
    <div
      className="font-mono relative flex flex-col justify-center gap-1 overflow-hidden px-4 text-[12px] leading-relaxed"
      style={{ height: 148, background: "#0d1117" }}
    >
      {/* macOS traffic lights */}
      <div className="absolute left-4 top-3.5 flex gap-1.5">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
      </div>

      <p className="mt-4">
        <span style={{ color: "#ff7b72" }}>const</span>{" "}
        <span style={{ color: "#79c0ff" }}>Course</span>{" "}
        <span style={{ color: "#8b949e" }}>= () =&gt; {"{"}</span>
      </p>
      <p className="pl-4">
        <span style={{ color: "#ff7b72" }}>return</span>{" "}
        <span style={{ color: "#8b949e" }}>(</span>
      </p>
      <p className="pl-8" style={{ color: "#8b949e" }}>
        &lt;<span style={{ color: "#79c0ff" }}>div</span>&gt;Learn. Build. Ship.&lt;/
        <span style={{ color: "#79c0ff" }}>div</span>&gt;
      </p>
      <p className="pl-4" style={{ color: "#8b949e" }}>
        );
      </p>
      <p style={{ color: "#8b949e" }}>{"}"}</p>
    </div>
  );
}

export default function DashboardCourses() {
  return (
    <div>
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0d1f13" }}>
          My Courses
        </h2>
        <a
          href="#"
          className="flex items-center gap-1"
          style={{ fontSize: "12.5px", fontWeight: 600, color: "#16c564" }}
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Course card */}
      <div
        style={{ animation: "fadeUp 0.5s ease-out both", animationDelay: "300ms" }}
      >
        <div
          className="course-card overflow-hidden bg-white"
          style={{
            maxWidth: 320,
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <CodeThumbnail />

          {/* Body */}
          <div style={{ padding: "16px 18px" }}>
            <div className="flex items-center justify-between gap-2">
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0d1f13" }}>
                React &amp; Next.js
              </h3>
              <span
                className="flex items-center gap-1"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#14a35a",
                  background: "rgba(22,197,100,0.11)",
                  padding: "3px 8px",
                  borderRadius: 999,
                }}
              >
                <Check className="h-3 w-3" />
                Enrolled
              </span>
            </div>

            {/* Progress */}
            <div className="mt-4 flex items-center gap-2.5">
              <div
                className="flex-1 overflow-hidden rounded-full"
                style={{ height: 4, background: "rgba(0,0,0,0.06)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background: "linear-gradient(90deg, rgba(22,197,100,0.7), #16c564)",
                  }}
                />
              </div>
              <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#7a8c81" }}>
                0%
              </span>
            </div>

            {/* Continue button */}
            <button
              type="button"
              className="continue-btn mt-4 flex w-full items-center justify-center gap-1.5 text-white"
              style={{
                padding: "10px 14px",
                borderRadius: 11,
                fontWeight: 700,
                fontSize: "13.5px",
                background: "linear-gradient(135deg, #16c564, #0d9444)",
              }}
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
