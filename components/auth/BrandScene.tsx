import Image from "next/image";
import archImg from "../../assets/images/brand-arch.png";
import laptopImg from "../../assets/images/brand-laptop.png";

/**
 * Brand illustration — real 3D renders (Islamic arch backdrop + laptop
 * dashboard) layered over an ambient glow, matching the reference design.
 * Background was removed from both source assets, so they sit cleanly on
 * the dark brand panel.
 */
export default function BrandScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* ambient glow behind the arch */}
      <div className="absolute left-1/2 top-[38%] h-[64%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,235,175,0.45),transparent_68%)] blur-3xl" />

      {/* floating particles */}
      {PARTICLES.map((p, i) => (
        <span key={i} className="absolute rounded-full bg-green-200/70" style={{ left: p.x, top: p.y, height: p.s, width: p.s, opacity: p.o }} />
      ))}

      {/* arch backdrop */}
      <Image
        src={archImg}
        alt=""
        priority
        sizes="(min-width: 1280px) 480px, 0px"
        className="absolute left-1/2 top-0 w-[82%] -translate-x-1/2 drop-shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
      />

      {/* laptop dashboard in front */}
      <Image
        src={laptopImg}
        alt="Course dashboard preview"
        priority
        sizes="(min-width: 1280px) 380px, 0px"
        className="absolute bottom-[8%] left-1/2 w-[72%] -translate-x-1/2 drop-shadow-[0_36px_60px_-22px_rgba(0,0,0,0.7)] animate-floatY"
      />
    </div>
  );
}

const PARTICLES = [
  { x: "12%", y: "16%", s: 6, o: 0.6 },
  { x: "84%", y: "12%", s: 5, o: 0.5 },
  { x: "90%", y: "46%", s: 8, o: 0.4 },
  { x: "5%", y: "50%", s: 5, o: 0.5 },
  { x: "72%", y: "64%", s: 4, o: 0.6 },
  { x: "20%", y: "72%", s: 6, o: 0.4 },
];
