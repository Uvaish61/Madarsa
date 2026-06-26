import { Code2, Paintbrush, Smartphone } from "lucide-react";

/**
 * Flat-vector brand illustration evoking the reference 3D render:
 * a glowing mihrab (mosque arch) framing a laptop dashboard, with a
 * floating graduation cap, a stack of books and a potted plant.
 *
 * Production note: to use a real 3D render instead, drop a PNG/WebP in
 * `assets/` and replace this component's body with a single <Image />.
 */
export default function BrandScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* ── ambient glow + particles ── */}
      <div className="absolute left-1/2 top-[42%] h-[70%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,235,175,0.55),transparent_66%)] blur-2xl" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-green-200/70"
          style={{ left: p.x, top: p.y, height: p.s, width: p.s, opacity: p.o }}
        />
      ))}

      {/* ── mihrab arch ── */}
      <svg viewBox="0 0 240 300" className="absolute left-1/2 top-[6%] h-[80%] w-auto -translate-x-1/2" fill="none">
        <defs>
          <linearGradient id="archEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="1" stopColor="rgba(180,235,205,0.2)" />
          </linearGradient>
          <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(95,210,155,0.34)" />
            <stop offset="1" stopColor="rgba(16,70,48,0.04)" />
          </linearGradient>
        </defs>
        <path d="M38 296 V118 C38 56 76 18 120 18 C164 18 202 56 202 118 V296 Z" fill="url(#archFill)" stroke="url(#archEdge)" strokeWidth="2.5" />
        <path d="M62 296 V122 C62 74 88 44 120 44 C152 44 178 74 178 122 V296" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
        {/* lattice */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={74 + i * 16} y1="96" x2={74 + i * 16} y2="280" stroke="rgba(185,235,205,0.16)" strokeWidth="0.7" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="68" y1={112 + i * 22} x2="172" y2={112 + i * 22} stroke="rgba(185,235,205,0.14)" strokeWidth="0.7" />
        ))}
        {/* keystone star */}
        <path d="M120 70 l4 8 9 1 -6.5 6.5 1.5 9 -8-4.5 -8 4.5 1.5-9 -6.5-6.5 9-1 z" fill="rgba(245,210,120,0.85)" />
      </svg>

      {/* ── floating graduation cap ── */}
      <div className="absolute right-[18%] top-[26%] animate-floatY2">
        <svg viewBox="0 0 120 90" className="h-[78px] w-auto drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)]">
          <path d="M60 8 L112 30 L60 52 L8 30 Z" fill="#1f7a4d" />
          <path d="M60 8 L112 30 L60 52 L8 30 Z" fill="url(#capTop)" opacity="0.4" />
          <defs>
            <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M30 38 V58 C30 68 90 68 90 58 V38 L60 52 Z" fill="#155f3b" />
          <circle cx="112" cy="30" r="3.5" fill="#f3c14d" />
          <path d="M112 30 V58" stroke="#f3c14d" strokeWidth="2.2" />
          <path d="M112 58 l-4 10 8 0 z" fill="#f3c14d" />
        </svg>
      </div>

      {/* ── laptop dashboard ── */}
      <div className="absolute bottom-[14%] left-1/2 w-[80%] -translate-x-1/2 animate-floatY">
        <div className="rounded-t-2xl border border-white/15 bg-[#0a2a20]/85 p-3.5 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="mb-0.5 text-[13px] font-extrabold text-white">Welcome back!</div>
          <div className="mb-3 text-[10.5px] text-white/55">Keep learning, keep growing.</div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {COURSES.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] px-1.5 py-2.5 text-center">
                <Icon className="mx-auto mb-1 h-4 w-4 text-green-200" />
                <div className="text-[8.5px] font-semibold leading-tight text-white/70">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-white/55">
            <span>Your progress</span>
            <span className="font-bold text-green-200">75%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-green-400 to-gold" />
          </div>
        </div>
        {/* laptop base */}
        <div className="mx-auto h-2.5 w-[112%] -translate-x-[5.5%] rounded-b-md bg-gradient-to-b from-[#cfd6da] to-[#9aa3a8] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.6)]" />
        <div className="mx-auto h-1 w-[40%] rounded-b-lg bg-[#7c858a]" />
      </div>

      {/* ── stack of books ── */}
      <div className="absolute bottom-[10%] right-[8%] w-[26%]">
        <div className="h-3.5 rounded-[3px] bg-gradient-to-r from-green-600 to-green-700 shadow-[0_6px_10px_-5px_rgba(0,0,0,0.5)]" />
        <div className="mt-1 h-3.5 w-[88%] rounded-[3px] bg-gradient-to-r from-amber-300 to-amber-400 shadow-[0_6px_10px_-5px_rgba(0,0,0,0.5)]" />
        <div className="mt-1 h-3.5 w-[94%] rounded-[3px] bg-gradient-to-r from-[#e6ddc7] to-[#cfc4a6] shadow-[0_6px_10px_-5px_rgba(0,0,0,0.5)]" />
      </div>

      {/* ── potted plant ── */}
      <div className="absolute bottom-[12%] left-[8%]">
        <svg viewBox="0 0 60 70" className="h-16 w-auto drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)]">
          <path d="M30 38 C18 36 12 22 16 10 C26 14 32 24 30 38 Z" fill="#2f9e63" />
          <path d="M30 40 C42 36 50 24 46 12 C34 16 28 28 30 40 Z" fill="#23864f" />
          <path d="M30 42 C28 30 30 18 36 8 C34 22 34 32 30 42 Z" fill="#3cb574" />
          <path d="M18 40 h24 l-3 24 h-18 z" fill="#c08a5a" />
          <path d="M18 40 h24 l-1 6 h-22 z" fill="#a9764b" />
        </svg>
      </div>
    </div>
  );
}

const COURSES = [
  { icon: Code2, label: "Web Dev" },
  { icon: Paintbrush, label: "UI/UX" },
  { icon: Smartphone, label: "Flutter" },
];

const PARTICLES = [
  { x: "12%", y: "18%", s: 6, o: 0.6 },
  { x: "82%", y: "12%", s: 5, o: 0.5 },
  { x: "88%", y: "44%", s: 8, o: 0.4 },
  { x: "6%", y: "52%", s: 5, o: 0.5 },
  { x: "70%", y: "60%", s: 4, o: 0.6 },
  { x: "22%", y: "70%", s: 6, o: 0.4 },
];
