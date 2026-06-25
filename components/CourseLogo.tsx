"use client";

import { Sparkles } from "lucide-react";

export default function CourseLogo({ title }: { title: string }) {
  if (title === "React & Next.js") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#020617,#0c1554)" }}>
        <svg viewBox="0 0 80 80" width="62" height="62" aria-hidden="true">
          <circle cx="40" cy="40" r="7" fill="#61DAFB" />
          <ellipse cx="40" cy="40" rx="29" ry="11" fill="none" stroke="#61DAFB" strokeWidth="2.5" opacity="0.9" />
          <ellipse cx="40" cy="40" rx="29" ry="11" fill="none" stroke="#61DAFB" strokeWidth="2.5" opacity="0.9" transform="rotate(60 40 40)" />
          <ellipse cx="40" cy="40" rx="29" ry="11" fill="none" stroke="#61DAFB" strokeWidth="2.5" opacity="0.9" transform="rotate(120 40 40)" />
        </svg>
      </div>
    );
  }
  if (title === "Python for Data Science") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#0d1b2e,#1e3d6e)" }}>
        <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
          <path d="M40 10 C29 10 23 16 23 25 L23 33 L40 33 L40 37 L18 37 C13 37 8 42 8 49 L8 55 C8 64 15 70 24 70 L28 70 L28 62 C28 56 33 51 40 51 C47 51 52 56 52 62 L52 70 L56 70 C65 70 72 64 72 55 L72 49 C72 42 67 37 58 37 L40 37 L40 33 L57 33 L57 25 C57 16 51 10 40 10Z" fill="#4B8BBE" />
          <circle cx="31" cy="22" r="3.5" fill="#FFD43B" />
          <circle cx="49" cy="58" r="3" fill="none" stroke="#FFD43B" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (title === "UI/UX with Figma") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#1a0630,#4a1270)" }}>
        <svg viewBox="0 0 56 80" width="42" height="60" aria-hidden="true">
          <rect x="0" y="0" width="28" height="28" rx="14" fill="#F24E1E" />
          <rect x="28" y="0" width="28" height="28" rx="14" fill="#FF7262" />
          <rect x="0" y="28" width="28" height="28" fill="#A259FF" />
          <circle cx="42" cy="42" r="14" fill="#1ABCFE" />
          <rect x="0" y="56" width="28" height="24" rx="14" fill="#0ACF83" />
        </svg>
      </div>
    );
  }
  if (title === "Node.js Backend") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#071207,#0f3d0f)" }}>
        <svg viewBox="0 0 80 80" width="60" height="60" aria-hidden="true">
          <path d="M40 8 L64 22 L64 58 L40 72 L16 58 L16 22Z" fill="none" stroke="#68A063" strokeWidth="2.5" opacity="0.45" />
          <path d="M40 16 L57 26 L57 54 L40 64 L23 54 L23 26Z" fill="#68A063" opacity="0.12" />
          <text x="40" y="48" textAnchor="middle" fill="#68A063" fontSize="19" fontWeight="800" fontFamily="monospace">JS</text>
          <circle cx="40" cy="40" r="3" fill="#68A063" opacity="0.6" />
        </svg>
      </div>
    );
  }
  if (title === "AI Productivity") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#030014,#1e1040)" }}>
        <svg viewBox="0 0 80 80" width="62" height="62" aria-hidden="true">
          <circle cx="40" cy="40" r="24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.35" />
          <circle cx="40" cy="40" r="15" fill="none" stroke="#A78BFA" strokeWidth="1.5" opacity="0.55" />
          <circle cx="40" cy="40" r="6.5" fill="#C4B5FD" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 40 + 17 * Math.cos(rad), y1 = 40 + 17 * Math.sin(rad);
            const x2 = 40 + 25 * Math.cos(rad), y2 = 40 + 25 * Math.sin(rad);
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />;
          })}
        </svg>
      </div>
    );
  }
  if (title === "AWS Cloud Basics") {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#1a0c00,#7c3500)" }}>
        <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
          <path d="M20 44 Q14 44 12 38 Q10 32 16 29 Q15 20 24 18 Q30 10 40 12 Q50 8 56 16 Q65 16 66 25 Q72 26 70 34 Q68 42 62 44Z" fill="#FF9900" opacity="0.9" />
          <path d="M16 57 Q40 69 64 57" stroke="#FF9900" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M10 52 L16 57" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M70 52 L64 57" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg,#064e3b,#047857)" }}>
      <Sparkles className="h-10 w-10 text-green-300" />
    </div>
  );
}
