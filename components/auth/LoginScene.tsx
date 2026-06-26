import Image from "next/image";
import plantImg from "../../assets/images/decor/plant.png";
import booksImg from "../../assets/images/login/books.png";
import windowImg from "../../assets/images/login/window.png";

/**
 * Login brand illustration — a glowing mihrab window backdrop with a stack of
 * books in front (real 3D renders, backgrounds removed) over an ambient glow.
 */
export default function LoginScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute left-1/2 top-[34%] h-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(140,235,180,0.4),transparent_68%)] blur-3xl" />

      {PARTICLES.map((p, i) => (
        <span key={i} className="absolute rounded-full bg-green-200/70" style={{ left: p.x, top: p.y, height: p.s, width: p.s, opacity: p.o }} />
      ))}

      {/* floor + ground contact shadow */}
      <div className="absolute bottom-[6%] left-1/2 z-0 h-[13%] w-[82%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(12,60,42,0.9),transparent_72%)] blur-md" />
      <div className="absolute bottom-[6%] left-[44%] z-[5] h-[7%] w-[58%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)] blur-md" />

      {/* mihrab window backdrop */}
      <Image
        src={windowImg}
        alt=""
        priority
        sizes="(min-width: 1280px) 250px, 0px"
        className="absolute left-1/2 top-[1%] z-0 h-[82%] w-auto -translate-x-1/2 drop-shadow-[0_30px_60px_-26px_rgba(0,0,0,0.6)]"
      />

      {/* potted plant — grounded, beside the books */}
      <Image
        src={plantImg}
        alt=""
        sizes="(min-width: 1280px) 72px, 0px"
        className="absolute bottom-[11%] left-[12%] z-30 w-[16%] drop-shadow-[0_14px_18px_-8px_rgba(0,0,0,0.8)]"
      />

      {/* book stack — grounded hero */}
      <Image
        src={booksImg}
        alt="Stack of books"
        priority
        sizes="(min-width: 1280px) 210px, 0px"
        className="absolute bottom-[7%] left-1/2 z-20 w-[46%] -translate-x-1/2 drop-shadow-[0_20px_26px_-12px_rgba(0,0,0,0.85)]"
      />
    </div>
  );
}

const PARTICLES = [
  { x: "14%", y: "18%", s: 6, o: 0.55 },
  { x: "82%", y: "14%", s: 5, o: 0.5 },
  { x: "88%", y: "48%", s: 7, o: 0.4 },
  { x: "8%", y: "52%", s: 5, o: 0.5 },
  { x: "74%", y: "66%", s: 4, o: 0.55 },
  { x: "22%", y: "74%", s: 6, o: 0.4 },
];
