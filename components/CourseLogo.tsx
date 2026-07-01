"use client";

// ─── Course thumbnails ─────────────────────────────────────────────────────
// Each course gets a small "screenshot" mockup of what the course actually
// looks like (an editor, a notebook, a canvas, a terminal, a chat, a diagram)
// rather than a centered brand icon floating on a flat gradient.

// Traffic-light dots + optional filename, positioned inside a window frame
// that starts at (24, 24) — matches every mockup's outer rect below.
function WindowChrome({ fill, label }: { fill: string; label?: string }) {
  return (
    <g>
      <circle cx="40" cy="40" r="4" fill={fill} opacity="0.35" />
      <circle cx="54" cy="40" r="4" fill={fill} opacity="0.35" />
      <circle cx="68" cy="40" r="4" fill={fill} opacity="0.35" />
      {label ? (
        <text x="84" y="44" fontFamily="monospace" fontSize="11" fill={fill} opacity="0.55">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function DotGrid({ id, color }: { id: string; color: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={color} />
        </pattern>
      </defs>
      <rect width="400" height="220" fill={`url(#${id})`} />
    </>
  );
}

export default function CourseLogo({ title }: { title: string }) {
  if (title === "React & Next.js") {
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#050b18,#0a1530)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-react" color="#0f2547" />
          <rect x="24" y="24" width="352" height="172" rx="10" fill="#0b1020" stroke="#1e2b4d" />
          <rect x="24" y="24" width="352" height="30" rx="10" fill="#111a33" />
          <WindowChrome fill="#61DAFB" label="App.jsx" />
          <text x="46" y="80" fontFamily="monospace" fontSize="13" fill="#c084fc">function <tspan fill="#61DAFB">App</tspan>() {"{"}</text>
          <text x="62" y="102" fontFamily="monospace" fontSize="13" fill="#c084fc">return (</text>
          <text x="78" y="124" fontFamily="monospace" fontSize="13" fill="#4ade80">&lt;<tspan fill="#61DAFB">Hero</tspan> /&gt;</text>
          <text x="78" y="146" fontFamily="monospace" fontSize="13" fill="#4ade80">&lt;<tspan fill="#61DAFB">Courses</tspan> /&gt;</text>
          <text x="62" y="168" fontFamily="monospace" fontSize="13" fill="#c084fc">);</text>
          <text x="46" y="190" fontFamily="monospace" fontSize="13" fill="#c084fc">{"}"}</text>
          <g transform="translate(322,150)" opacity="0.9">
            <circle cx="0" cy="0" r="5" fill="#61DAFB" />
            <ellipse cx="0" cy="0" rx="22" ry="8.5" fill="none" stroke="#61DAFB" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="22" ry="8.5" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60)" />
            <ellipse cx="0" cy="0" rx="22" ry="8.5" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120)" />
          </g>
        </svg>
      </div>
    );
  }

  if (title === "Python for Data Science") {
    const bars = [34, 58, 42, 70, 50];
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#0a1220,#122443)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-py" color="#152a4a" />
          <rect x="24" y="24" width="352" height="172" rx="10" fill="#0c1526" stroke="#1c2f4d" />
          <text x="42" y="52" fontFamily="monospace" fontSize="11" fill="#FFD43B" opacity="0.75">In [1]: df.plot(kind=&quot;bar&quot;)</text>
          <line x1="42" y1="182" x2="230" y2="182" stroke="#3a4f70" strokeWidth="1.5" />
          <line x1="42" y1="72" x2="42" y2="182" stroke="#3a4f70" strokeWidth="1.5" />
          {bars.map((h, i) => (
            <rect key={h} x={58 + i * 34} y={182 - h} width="20" height={h} rx="3" fill={i % 2 === 0 ? "#4B8BBE" : "#FFD43B"} opacity="0.9" />
          ))}
          <polyline points="68,150 102,130 136,142 170,108 204,120" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <g transform="translate(264,66)">
            <rect width="112" height="118" rx="8" fill="#0f1e36" stroke="#26406b" />
            <text x="10" y="20" fontFamily="monospace" fontSize="10" fill="#8fb3e0">df.head()</text>
            <line x1="0" y1="30" x2="112" y2="30" stroke="#26406b" />
            {[0, 1, 2, 3].map((r) => (
              <line key={r} x1="0" y1={30 + (r + 1) * 21} x2="112" y2={30 + (r + 1) * 21} stroke="#1c2f4d" />
            ))}
            <line x1="38" y1="30" x2="38" y2="118" stroke="#1c2f4d" />
            <line x1="76" y1="30" x2="76" y2="118" stroke="#1c2f4d" />
          </g>
        </svg>
      </div>
    );
  }

  if (title === "UI/UX with Figma") {
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#180a28,#2a0f45)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-figma" color="#3a1a5c" />
          <rect x="0" y="0" width="52" height="220" fill="#150822" opacity="0.85" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x="12" y={26 + r * 26} width="28" height="8" rx="4" fill="#5a3a7a" opacity="0.7" />
          ))}
          <rect x="90" y="34" width="150" height="152" rx="14" fill="#1c0f2e" stroke="#4a2a70" strokeWidth="1.5" />
          <rect x="90" y="34" width="150" height="26" rx="14" fill="#2a1640" />
          <rect x="106" y="76" width="118" height="58" rx="8" fill="#3a1f5c" />
          <rect x="106" y="144" width="80" height="9" rx="4" fill="#7a4fb0" opacity="0.8" />
          <rect x="106" y="160" width="54" height="9" rx="4" fill="#5a3a7a" opacity="0.6" />
          <g transform="translate(272,64)">
            <rect width="26" height="26" rx="13" fill="#F24E1E" />
            <rect x="26" width="26" height="26" fill="#A259FF" />
            <circle cx="52" cy="13" r="13" fill="#1ABCFE" />
            <rect y="26" width="26" height="24" rx="13" fill="#0ACF83" />
          </g>
          <path d="M300 150 L316 168 L300 178 Z" fill="#fff" opacity="0.9" transform="rotate(-15 300 160)" />
        </svg>
      </div>
    );
  }

  if (title === "Node.js Backend") {
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#04140a,#082312)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-node" color="#0f3a1f" />
          <rect x="24" y="24" width="222" height="172" rx="10" fill="#061a0d" stroke="#164023" />
          <rect x="24" y="24" width="222" height="28" rx="10" fill="#0c2818" />
          <WindowChrome fill="#68A063" />
          <text x="40" y="80" fontFamily="monospace" fontSize="12" fill="#68A063">$ node server.js</text>
          <text x="40" y="102" fontFamily="monospace" fontSize="12" fill="#8fd6a8">Server listening on :4000</text>
          <text x="40" y="124" fontFamily="monospace" fontSize="12" fill="#e2b93b">GET /api/courses 200</text>
          <text x="40" y="146" fontFamily="monospace" fontSize="12" fill="#e2b93b">POST /api/enroll 201</text>
          <text x="40" y="168" fontFamily="monospace" fontSize="12" fill="#68A063">_<tspan opacity="0.6">|</tspan></text>
          <g fontFamily="monospace" fontSize="11" fill="#a9d8bb">
            <rect x="272" y="52" width="92" height="34" rx="8" fill="#0d2a17" stroke="#1f5230" />
            <text x="318" y="73" textAnchor="middle">Client</text>
            <rect x="272" y="150" width="92" height="34" rx="8" fill="#0d2a17" stroke="#1f5230" />
            <text x="318" y="171" textAnchor="middle">Server</text>
            <line x1="318" y1="86" x2="318" y2="150" stroke="#3a7a4f" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="330" y="122" fontSize="10" fill="#68A063">JSON</text>
          </g>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#3a7a4f" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  if (title === "AI Productivity") {
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#0a0620,#160b38)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-ai" color="#241454" />
          <rect x="24" y="24" width="352" height="172" rx="10" fill="#0f0930" stroke="#2c1a5c" />
          <rect x="46" y="46" width="180" height="34" rx="17" fill="#231150" />
          <text x="62" y="68" fontFamily="sans-serif" fontSize="12" fill="#c4b5fd">Summarize this lesson</text>
          <rect x="192" y="92" width="182" height="46" rx="18" fill="#5b3fb8" />
          <text x="210" y="112" fontFamily="sans-serif" fontSize="12" fill="#ede9fe">Here are the 3 key</text>
          <text x="210" y="128" fontFamily="sans-serif" fontSize="12" fill="#ede9fe">takeaways ✦</text>
          <g transform="translate(196,72)" fill="#c4b5fd">
            <path d="M6 0 L8 5 L13 6 L8 7 L6 12 L4 7 L-1 6 L4 5 Z" />
          </g>
          <rect x="46" y="158" width="304" height="30" rx="15" fill="#1a1040" stroke="#3b2570" />
          <text x="60" y="178" fontFamily="sans-serif" fontSize="11" fill="#8b7bb8">Ask anything…</text>
          <path d="M326 173 L338 178 L326 183 Z" fill="#a78bfa" />
        </svg>
      </div>
    );
  }

  if (title === "AWS Cloud Basics") {
    return (
      <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#1a0f00,#3a1c00)" }}>
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <DotGrid id="dots-aws" color="#4a2a00" />
          <path
            d="M120 76 Q104 76 100 64 Q96 52 108 46 Q106 30 124 26 Q136 12 156 16 Q172 6 188 16 Q206 16 208 30 Q222 32 218 46 Q214 58 200 60Z"
            fill="#FF9900"
            opacity="0.9"
          />
          <g stroke="#FF9900" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7">
            <line x1="150" y1="74" x2="90" y2="132" />
            <line x1="160" y1="74" x2="160" y2="132" />
            <line x1="172" y1="74" x2="240" y2="132" />
          </g>
          {[{ x: 40, label: "EC2" }, { x: 116, label: "S3" }, { x: 192, label: "Lambda" }].map((n) => (
            <g key={n.label} transform={`translate(${n.x},132)`}>
              <rect width="92" height="46" rx="8" fill="#241206" stroke="#7c4a12" />
              <text x="46" y="28" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffbf5c">
                {n.label}
              </text>
            </g>
          ))}
          <path d="M300 40 Q320 40 322 56 Q332 58 328 70 Q325 80 312 80 L280 80 Q268 80 268 68 Q262 60 270 52 Q272 40 288 40Z" fill="#ffbf5c" opacity="0.25" />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-full w-full" style={{ background: "linear-gradient(160deg,#03231a,#054733)" }}>
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <DotGrid id="dots-fallback" color="#0a5a3f" />
        <rect x="46" y="60" width="200" height="100" rx="12" fill="#03291d" stroke="#0d5c3f" />
        <path d="M96 96 L146 74 L196 96 L146 118 Z" fill="#34d399" opacity="0.85" />
        <path d="M110 104 L110 128 L146 140 L146 116 Z" fill="#10b981" opacity="0.7" />
        <path d="M182 104 L182 128 L146 140 L146 116 Z" fill="#059669" opacity="0.7" />
      </svg>
    </div>
  );
}
