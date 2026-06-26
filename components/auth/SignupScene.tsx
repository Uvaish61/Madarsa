import Image from "next/image";
import capImg from "../../assets/images/decor/cap.png";
import plantImg from "../../assets/images/decor/plant.png";
import booksImg from "../../assets/images/login/books.png";
import archImg from "../../assets/images/signup/arch.png";
import laptopImg from "../../assets/images/signup/laptop.png";

export default function SignupScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* ambient center glow */}
      <div className="absolute left-1/2 top-[36%] h-[62%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,235,175,0.42),transparent_68%)] blur-3xl" />

      {PARTICLES.map((p, i) => (
        <span key={i} className="absolute rounded-full bg-green-200/70" style={{ left: p.x, top: p.y, height: p.s, width: p.s, opacity: p.o }} />
      ))}

      {/* ── Platform / Floor ── */}
      {/* 1. dark contact shadow — deepest layer */}
      <div className="absolute bottom-[5%] left-1/2 z-[3] h-[8%] w-[76%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62),transparent_70%)] blur-md" />
      {/* 2. glossy emerald platform glow */}
      <div className="absolute bottom-[6%] left-1/2 z-[4] h-[20%] w-[92%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_24%,rgba(52,211,153,0.54),rgba(16,110,55,0.28)_52%,transparent_74%)] blur-[10px]" />
      {/* 3. faint laptop surface reflection */}
      <div className="absolute bottom-[5%] left-1/2 z-[5] h-[7%] w-[48%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(180,240,210,0.14),transparent_68%)] blur-[4px]" />
      {/* 4. crisp gloss rim line at floor contact */}
      <div className="absolute bottom-[9%] left-1/2 z-[6] h-[2px] w-[62%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-emerald-200/80 to-transparent" />

      {/* mihrab arch — taller, centered, slightly turned for 3D depth */}
      <Image src={archImg} alt="" priority sizes="(min-width: 1280px) 360px, 0px"
        style={{ transform: "translateX(-50%) perspective(1200px) rotateY(-8deg)" }}
        className="absolute left-1/2 top-[0%] z-0 h-[88%] w-auto origin-center drop-shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]" />

      {/* floating graduation cap — only aerial accent */}
      <Image src={capImg} alt="" priority sizes="(min-width: 1280px) 135px, 0px"
        className="absolute right-[18%] top-[10%] z-30 w-[28%] -rotate-6 drop-shadow-[0_24px_40px_-16px_rgba(0,0,0,0.6)] animate-floatY2" />

      {/* books — bottom-right of laptop, partially overlapping */}
      <Image src={booksImg} alt="" sizes="(min-width: 1280px) 115px, 0px"
        className="absolute bottom-[10%] right-[2%] z-10 w-[25%] drop-shadow-[0_18px_22px_-10px_rgba(0,0,0,0.85)]" />

      {/* laptop — grounded hero, overlaps lower arch ~35% */}
      <Image src={laptopImg} alt="Course dashboard preview" priority sizes="(min-width: 1280px) 335px, 0px"
        className="absolute bottom-[9%] left-1/2 z-20 w-[68%] -translate-x-1/2 drop-shadow-[0_22px_26px_-12px_rgba(0,0,0,0.85)]" />

      {/* plant — bottom-left for visual balance, with floor reflection */}
      <Image src={plantImg} alt="" sizes="(min-width: 1280px) 105px, 0px"
        style={{ WebkitBoxReflect: "below 1px linear-gradient(transparent 56%, rgba(255,255,255,0.18))" }}
        className="absolute bottom-[13%] left-[1%] z-10 w-[22%] drop-shadow-[0_14px_18px_-8px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

const PARTICLES = [
  { x: "12%", y: "16%", s: 6, o: 0.6 },
  { x: "84%", y: "12%", s: 5, o: 0.5 },
  { x: "90%", y: "46%", s: 8, o: 0.4 },
  { x: "5%",  y: "50%", s: 5, o: 0.5 },
  { x: "72%", y: "64%", s: 4, o: 0.6 },
  { x: "20%", y: "72%", s: 6, o: 0.4 },
];
