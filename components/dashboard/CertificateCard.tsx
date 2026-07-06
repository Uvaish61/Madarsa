import { Award, Link as LinkIcon, Pencil } from "lucide-react";
import BrandLogo from "@/components/auth/BrandLogo";

const DARK_GREEN = "#0d4f20";
const GOLD = "#c9a84c";

const CERT = {
  id: "MTA-2026-7F3A9",
  name: "Uvaish Khan",
  course: "React & Next.js Development",
  verifyUrl: "verify.madarsatech.com/MTA-2026-7F3A9",
};

// ─── Small ornament primitives ────────────────────────────────────────────────

function GoldLine({ reverse = false }: { reverse?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 40,
        height: 1,
        background: reverse
          ? "linear-gradient(90deg, rgba(180,140,28,0.4), transparent)"
          : "linear-gradient(90deg, transparent, rgba(180,140,28,0.4))",
      }}
    />
  );
}

function FourPetalFlower() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 0C6 3 9 4 6 6C9 8 6 9 6 12C6 9 3 8 6 6C3 4 6 3 6 0Z" fill={GOLD} />
    </svg>
  );
}

function Diamond() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <rect x="1.2" y="1.2" width="5.6" height="5.6" transform="rotate(45 4 4)" fill={GOLD} />
    </svg>
  );
}

function Ornament({ icon = "flower" }: { icon?: "flower" | "diamond" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <GoldLine />
      {icon === "flower" ? <FourPetalFlower /> : <Diamond />}
      <GoldLine reverse />
    </div>
  );
}

function Laurel({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M13 24C11 18 11 10 15 2" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="14.5" cy="18" rx="4" ry="2" fill={GOLD} transform="rotate(-35 14.5 18)" />
      <ellipse cx="13.5" cy="11.5" rx="3.6" ry="1.9" fill={GOLD} transform="rotate(-25 13.5 11.5)" />
      <ellipse cx="14.5" cy="5.5" rx="3.2" ry="1.7" fill={GOLD} transform="rotate(-12 14.5 5.5)" />
    </svg>
  );
}

// ─── Gold seal medallion ───────────────────────────────────────────────────────

function starPath(cx: number, cy: number, outerR: number, innerR: number, points = 5) {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return `${d}Z`;
}

function GoldSeal() {
  const scallops = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return { x: 36 + 31 * Math.cos(angle), y: 36 + 31 * Math.sin(angle) };
  });
  const dots = [
    { x: 36, y: 12 },
    { x: 36, y: 60 },
    { x: 12, y: 36 },
    { x: 60, y: 36 },
  ];

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="cert-seal">
      <defs>
        <radialGradient id="sealOuter" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="55%" stopColor="#C9A020" />
          <stop offset="100%" stopColor="#7A5500" />
        </radialGradient>
        <radialGradient id="sealInner" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFD966" />
          <stop offset="100%" stopColor="#A67C00" />
        </radialGradient>
      </defs>

      {scallops.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="7.5" fill="url(#sealOuter)" />
      ))}
      <circle cx="36" cy="36" r="31" fill="url(#sealOuter)" />
      <circle cx="36" cy="36" r="24" fill="url(#sealInner)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" />
      <circle cx="36" cy="36" r="17" fill="#8a6200" />

      <path d={starPath(36, 36, 9.5, 4)} fill="#fff" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="#fff" />
      ))}
    </svg>
  );
}

// ─── Corner ornaments (single SVG overlay) ────────────────────────────────────

function CornerArt() {
  const petals = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return { x: 850 + 70 * Math.cos(angle), y: 620 + 70 * Math.sin(angle), angle };
  });

  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="cornerGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8c766" />
          <stop offset="100%" stopColor="#a9822f" />
        </linearGradient>
        <pattern id="latticePattern" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="26" stroke={DARK_GREEN} strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
      </defs>

      {/* top-left: cream ogee arch, traced in gold, faint lattice inside */}
      <path
        d="M0 0 H260 C168 70 118 150 78 240 C48 300 20 350 0 392 Z"
        fill="url(#latticePattern)"
      />
      <path
        d="M0 0 H260 C168 70 118 150 78 240 C48 300 20 350 0 392"
        stroke="url(#cornerGold)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M0 14 H244 C158 82 112 158 74 244 C46 302 20 350 14 388"
        stroke="rgba(212,175,55,0.22)"
        strokeWidth="1"
        fill="none"
      />

      {/* top-right: small dark green wedge + gold accent + dot grid */}
      <path d="M1000 0 L1000 130 L865 0 Z" fill={DARK_GREEN} />
      <path d="M905 0 L1000 0 L1000 82" stroke="url(#cornerGold)" strokeWidth="2" fill="none" />
      {Array.from({ length: 12 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <circle
            key={i}
            cx={760 + col * 14}
            cy={16 + row * 13}
            r="2.6"
            fill={DARK_GREEN}
            opacity="0.32"
          />
        );
      })}

      {/* bottom-right: pale arabesque rosette */}
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x}
          cy={p.y}
          rx="26"
          ry="9"
          fill="none"
          stroke={DARK_GREEN}
          strokeOpacity="0.1"
          strokeWidth="1"
          transform={`rotate(${(p.angle * 180) / Math.PI} ${p.x} ${p.y})`}
        />
      ))}
      <circle cx="850" cy="620" r="46" fill="none" stroke={DARK_GREEN} strokeOpacity="0.1" strokeWidth="1" />
      <circle cx="850" cy="620" r="94" fill="none" stroke={DARK_GREEN} strokeOpacity="0.08" strokeWidth="1" />

      {/* bottom-left: thin gold accent tracing the paper edge */}
      <path d="M0 640 L0 700 L64 700" stroke="url(#cornerGold)" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Certificate ───────────────────────────────────────────────────────────────

export default function CertificateCard() {
  return (
    <div className="cert-card-wrap relative rounded-[14px]">
      {/* dark-green ribbon backing peeking from the bottom-left corner */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          left: -6,
          bottom: -6,
          width: 46,
          height: 46,
          background: DARK_GREEN,
          borderRadius: "0 0 0 14px",
          boxShadow: "1px -1px 0 0 rgba(212,175,55,0.6)",
        }}
      />

      <div
        className="relative z-[1] overflow-hidden rounded-[13px]"
        style={{
          background: "linear-gradient(150deg, #faf9f2, #f7f3e4, #faf9f2, #f5f1e0)",
        }}
      >
        <CornerArt />

        {/* inner gold border */}
        <div
          className="pointer-events-none absolute z-[2] rounded-[8px]"
          style={{ inset: 8, border: "1px solid rgba(196,160,28,0.32)" }}
        />

        {/* content */}
        <div
          className="relative z-[4] flex flex-col items-center"
          style={{ padding: "30px 56px 26px" }}
        >
          {/* logo + institution */}
          <BrandLogo className="h-14 w-14" />
          <p
            className="mt-2 text-center font-sans"
            style={{ fontSize: 20, fontWeight: 800, color: DARK_GREEN }}
          >
            Madarsa Tech Academy
          </p>
          <p
            className="font-lora text-center italic"
            style={{ fontSize: 11.5, color: "#7a8c81" }}
          >
            Deeni Excellence. Digital Future.
          </p>

          {/* certificate title */}
          <p
            className="cert-gold-text mt-6 font-cinzel text-center"
            style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "0.3em" }}
          >
            CERTIFICATE OF COMPLETION
          </p>
          <div className="mt-2.5">
            <Ornament icon="flower" />
          </div>

          {/* certify line */}
          <p className="font-lora mt-5 text-center italic" style={{ fontSize: 12, color: "#6b7b70" }}>
            This is to certify that
          </p>

          {/* name */}
          <div className="mt-3 flex w-full max-w-[380px] items-center justify-center gap-3">
            <span
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(180,140,28,0.35))",
              }}
            />
            <Diamond />
            <span
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(180,140,28,0.35), transparent)",
              }}
            />
          </div>
          <p
            className="mt-2 text-center font-sans"
            style={{ fontSize: 22, fontWeight: 800, color: "#0d1a0d" }}
          >
            {CERT.name}
          </p>
          <p className="font-lora mt-1 text-center italic" style={{ fontSize: 12, color: "#6b7b70" }}>
            has successfully completed
          </p>

          {/* course name with laurels */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <Laurel />
            <p className="text-center font-sans" style={{ fontSize: 19, fontWeight: 800, color: DARK_GREEN }}>
              {CERT.course}
            </p>
            <Laurel mirrored />
          </div>

          {/* divider */}
          <div className="mt-4 w-full max-w-[300px]">
            <Ornament icon="diamond" />
          </div>

          {/* commendation */}
          <p
            className="font-lora mt-4 max-w-[420px] text-center italic"
            style={{ fontSize: 11.5, color: "#7a8c81", lineHeight: 1.75 }}
          >
            We commend your dedication, hard work and achievement. Keep learning, keep growing.
          </p>

          {/* footer */}
          <div
            className="mt-6 grid w-full items-center"
            style={{ gridTemplateColumns: "1fr 2px 1fr 2px 1fr" }}
          >
            {/* Certificate ID */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(13,79,32,0.07)",
                  border: "1px solid rgba(13,79,32,0.15)",
                }}
              >
                <Award style={{ width: 18, height: 18, color: DARK_GREEN }} />
              </div>
              <p
                className="uppercase"
                style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", color: "#a0aea4" }}
              >
                Certificate ID
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0d1a0d" }}>{CERT.id}</p>
              <Ornament icon="diamond" />
            </div>

            {/* Vertical divider */}
            <div
              style={{
                width: 1,
                height: 72,
                justifySelf: "center",
                background: "linear-gradient(180deg, transparent, rgba(180,140,28,0.3), transparent)",
              }}
            />

            {/* Gold seal */}
            <div className="flex flex-col items-center">
              <GoldSeal />
            </div>

            {/* Vertical divider */}
            <div
              style={{
                width: 1,
                height: 72,
                justifySelf: "center",
                background: "linear-gradient(180deg, transparent, rgba(180,140,28,0.3), transparent)",
              }}
            />

            {/* Signature */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(13,79,32,0.07)",
                  border: "1px solid rgba(13,79,32,0.15)",
                }}
              >
                <Pencil style={{ width: 18, height: 18, color: DARK_GREEN }} />
              </div>
              <span style={{ width: 78, height: 1, background: "rgba(180,140,28,0.3)" }} />
              <p
                className="uppercase"
                style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", color: "#a0aea4" }}
              >
                Signature
              </p>
              <p className="font-lora italic" style={{ fontSize: 10.5, color: "#7a8c81" }}>
                (Authorized Signatory)
              </p>
              <Ornament icon="diamond" />
            </div>
          </div>

          {/* verify bar */}
          <div
            className="mt-5 flex w-full items-center"
            style={{
              gap: 10,
              padding: "9px 16px",
              borderRadius: 10,
              background: "rgba(13,79,32,0.05)",
              border: "1px solid rgba(13,79,32,0.1)",
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-[8px]"
              style={{ width: 26, height: 26, background: "rgba(13,79,32,0.07)" }}
            >
              <LinkIcon style={{ width: 13, height: 13, color: DARK_GREEN }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#3a6b50" }}>{CERT.verifyUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
