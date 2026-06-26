import { Award, Globe, GraduationCap, Settings, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import quranImg from "../../assets/images/decor/quran.png";
import BrandLogo from "./BrandLogo";

const FEATURES = [
  { icon: GraduationCap, title: "First course free", sub: "No card needed" },
  { icon: Award, title: "Shareable certificates", sub: "Boost your skills" },
  { icon: Globe, title: "Bilingual learning", sub: "Urdu & English" },
];

const SOCIAL_PROOF = ["AR", "FK", "SM", "ZH"];

export default function AuthShell({
  activeTab,
  title,
  subtitle,
  scene,
  children,
}: {
  activeTab: "signup" | "login";
  title: string;
  subtitle: string;
  scene: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper-2 lg:grid lg:h-screen lg:max-h-screen lg:grid-cols-[1.04fr_1fr] lg:overflow-hidden">
      {/* ════════ Brand panel ════════ */}
      <aside className="relative isolate hidden overflow-hidden bg-gradient-to-br from-[#0a3326] via-green-800 to-[#061b14] px-10 py-8 text-white lg:flex lg:flex-col xl:px-14">
        {/* starfield + organic curved right edge */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] opacity-60" />
        <svg className="absolute -right-1 top-0 -z-10 h-full w-32" viewBox="0 0 100 600" preserveAspectRatio="none" fill="var(--paper-2)">
          <path d="M100 0 H60 C40 120 90 200 70 300 C50 400 90 480 64 600 H100 Z" />
        </svg>

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <BrandLogo className="h-11 w-11 flex-none drop-shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)]" />
          <span className="flex flex-col leading-none">
            <span className="text-[16px] font-extrabold tracking-[-0.02em]">Madarsa Tech Academy</span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-green-100/70">Deeni Excellence · Digital Future</span>
          </span>
        </Link>

        <div className="relative z-10 mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-green-300/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-200">
            Learn • Build • Grow
          </span>
          <h2 className="mt-4 max-w-md font-serif text-[clamp(2.2rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            From madarsa to a modern <span className="text-green-300">future.</span>
          </h2>
          <p className="mt-3 max-w-sm text-[14.5px] leading-6 text-green-50/80">
            Join thousands of students learning tech skills, building projects and earning verified certificates.
          </p>
        </div>

        {/* illustration */}
        <div className="relative z-0 my-1 hidden min-h-0 flex-1 items-center justify-center xl:flex">
          {scene}
        </div>

        <div className="relative z-10 mt-5 space-y-3">
          {FEATURES.map(({ icon: Icon, title: t, sub }) => (
            <div key={t} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-green-600/90 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-white" />
              </span>
              <div className="leading-tight">
                <div className="text-[14.5px] font-extrabold text-white">{t}</div>
                <div className="text-[12.5px] text-green-100/65">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* social proof */}
        <div className="relative z-10 mt-5 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 backdrop-blur-sm">
          <div className="flex -space-x-2.5">
            {SOCIAL_PROOF.map((initials, i) => (
              <span
                key={initials}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-green-800 bg-gradient-to-br from-green-500 to-green-700 text-[11px] font-extrabold text-white"
                style={{ zIndex: SOCIAL_PROOF.length - i }}
              >
                {initials}
              </span>
            ))}
          </div>
          <div className="leading-tight">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <div className="mt-0.5 text-[12.5px] font-semibold text-white/85">10,000+ students are growing with us</div>
          </div>
        </div>
      </aside>

      {/* ════════ Form panel ════════ */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-8 sm:px-8 lg:h-full lg:min-h-0 lg:overflow-y-auto">
        {/* ambient decor — dots grid, cream + green circles */}
        <div className="pointer-events-none absolute right-8 top-8 h-20 w-28 bg-[radial-gradient(circle,var(--green-100)_1.5px,transparent_1.5px)] [background-size:13px_13px] opacity-70" />
        <div className="pointer-events-none absolute -right-16 top-1/4 h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)] opacity-50" />
        <div className="pointer-events-none absolute -left-20 bottom-4 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--green-100),transparent_72%)] opacity-70" />
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-green-50" />

        {/* Quran-on-rehal — bottom-right corner accent */}
        <Image
          src={quranImg}
          alt=""
          sizes="200px"
          className="pointer-events-none absolute -bottom-8 -right-3 z-10 hidden w-[195px] drop-shadow-[0_24px_40px_-18px_rgba(0,0,0,0.35)] lg:block xl:w-[225px]"
        />

        {/* mobile brand bar */}
        <Link href="/" className="relative z-10 mb-6 flex items-center gap-3 lg:hidden">
          <BrandLogo className="h-10 w-10 flex-none" />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">Madarsa Tech Academy</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-green-600">Deeni Excellence · Digital Future</span>
          </span>
        </Link>

        <div className="relative z-10 w-full max-w-md rounded-[24px] border border-line bg-white p-5 shadow-soft sm:p-6">
          {/* tabs */}
          <div className="grid grid-cols-2 border-b border-line">
            <TabLink href="/signup" active={activeTab === "signup"}>Create Account</TabLink>
            <TabLink href="/login" active={activeTab === "login"}>Sign In</TabLink>
          </div>

          {/* heading */}
          <div className="mt-4 text-center">
            <h1 className="text-[clamp(1.4rem,2.2vw,1.7rem)] font-extrabold tracking-[-0.02em] text-ink">{title}</h1>
            <div className="mx-auto my-2 flex w-24 items-center gap-2">
              <span className="h-px flex-1 bg-line" />
              <Settings className="h-3.5 w-3.5 text-green-500" />
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="text-[13.5px] leading-5 text-muted">{subtitle}</p>
          </div>

          {/* form */}
          <div className="mt-5">{children}</div>

          {/* social */}
          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[12px] font-semibold text-muted">or continue with</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SOCIAL.map((s) => (
              <button
                key={s.label}
                type="button"
                aria-label={`Continue with ${s.label}`}
                className="grid place-items-center rounded-xl border border-line bg-white py-2.5 text-ink shadow-soft-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50"
              >
                {s.svg}
              </button>
            ))}
          </div>
        </div>

        {/* safe-learning strip */}
        <div className="relative z-10 mt-4 flex items-center gap-2.5 text-muted">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <p className="text-[13px] leading-5">
            <span className="font-bold text-ink">Safe learning environment.</span> No spam. Just knowledge.
          </p>
        </div>
      </main>
    </div>
  );
}

function TabLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`-mb-px border-b-2 pb-3 text-center text-[15px] font-bold transition ${
        active ? "border-green-600 text-green-700" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

const SOCIAL = [
  {
    label: "Google",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
        <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.71-.23.71-.5v-1.76c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.55-1.17-1.55-.95-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.1-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.96 9.96 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.68.74 1.08 1.67 1.08 2.82 0 4.02-2.45 4.9-4.79 5.16.38.33.71.97.71 1.96v2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];
