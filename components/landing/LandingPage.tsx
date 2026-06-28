"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, BadgeCheck, BarChart2, Check, Cloud, Code2,
  Globe, GraduationCap, Hammer, Languages, Link2, Menu,
  Paintbrush, Search, Server, SlidersHorizontal, Smartphone,
  Sparkles, Star, UserCheck, Wifi, X,
  type LucideIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import heroStudentGreen from "../../assets/images/hero-student-green.png";
import CourseLogo from "@/components/CourseLogo";
import { floatDots, pulseOrb } from "@/lib/animations";

const LottieWidget = dynamic(() => import("@/components/LottieWidget"), { ssr: false });
import {
  certificationBullets,
  courses,
  features,
  footerLinks,
  heroBadge,
  heroBadges,
  heroDescription,
  heroTitle,
  navigation,
  steps,
  stories,
  stats,
  tracks,
  type Copy,
  type Locale,
} from "@/lib/landing-data";

const text = (copy: Copy, locale: Locale) => copy[locale];

const ICONS: Record<string, LucideIcon> = {
  Languages, Wifi, Smartphone, Hammer, UserCheck, BadgeCheck, GraduationCap,
  Code2, BarChart2, Paintbrush, Server, Sparkles, Cloud,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name];
  return C ? <C className={className} /> : null;
}

const SKILL_DOT_COLORS: Record<string, string> = {
  React: "#61DAFB", "Next.js": "#aaaaaa", JavaScript: "#F7DF1E",
  Python: "#4B8BBE", Flutter: "#54C5F8", TensorFlow: "#FF6F00",
  SQL: "#e04d2f", Figma: "#F24E1E", "Node.js": "#68A063",
  Cloud: "#FF9900", AI: "#8B5CF6", GitHub: "#6e5494",
};

function SectionHeading({ eyebrow, title, description, locale }: { eyebrow: Copy; title: Copy; description?: Copy; locale: Locale }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-green-600">{text(eyebrow, locale)}</div>
      <h2 className="font-serif text-[clamp(2rem,3.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">{text(title, locale)}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{text(description, locale)}</p> : null}
    </div>
  );
}

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Course search & filters ──
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"all" | string>("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  // Distinct levels present in the catalogue, ordered Beginner → Intermediate → Advanced.
  const levels = useMemo(() => {
    const order = ["Beginner", "Intermediate", "Advanced"];
    const present = Array.from(new Set(courses.map((c) => c.level.en)));
    return present.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, []);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.tags.some((t) => t.toLowerCase().includes(q));
      const matchesLevel = level === "all" || course.level.en === level;
      const isFree = course.price === "Free";
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && isFree) ||
        (priceFilter === "paid" && !isFree);
      return matchesQuery && matchesLevel && matchesPrice;
    });
  }, [query, level, priceFilter]);

  const filtersActive = query.trim() !== "" || level !== "all" || priceFilter !== "all";
  const clearFilters = () => {
    setQuery("");
    setLevel("all");
    setPriceFilter("all");
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // #4 Hero entrance — badge → h1 → p → CTAs → badges → stats
    gsap.from("[data-hero-item]", {
      y: 26,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "all",
    });

    // #5 Stats counter — green banner
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const raw = el.dataset.count ?? "";
      const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
      const suffix = raw.replace(/[0-9,.]/g, "");
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: num,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              el.textContent =
                (num >= 1000 ? Math.round(obj.val).toLocaleString() : Math.round(obj.val)) + suffix;
            },
          });
        },
      });
    });

    // #6 Track cards stagger
    const trackCards = document.querySelectorAll("[data-track-card]");
    if (trackCards.length) {
      gsap.from(trackCards, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: { trigger: trackCards[0], start: "top 85%" },
      });
    }

    // #6 Course cards stagger
    const courseCards = document.querySelectorAll("[data-course-card]");
    if (courseCards.length) {
      gsap.from(courseCards, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: { trigger: courseCards[0], start: "top 85%" },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const pageText = useMemo(
    () => ({
      navCta: locale === "en" ? "Get Started" : "شروع کریں",
      signIn: locale === "en" ? "Sign In" : "سائن اِن",
      startFree: locale === "en" ? "Start Learning Free" : "مفت سیکھنا شروع کریں",
      explore: locale === "en" ? "Explore Tracks" : "ٹریکس دیکھیں",
      featuredCourses: locale === "en" ? "Featured Courses" : "نمایاں کورسز",
      allCourses: locale === "en" ? "View all courses" : "تمام کورسز دیکھیں",
      certTitle: locale === "en" ? "A certificate that carries weight" : "ایک سرٹیفکیٹ جو معنی رکھتا ہے",
      ctaTitle: locale === "en" ? "Start your tech journey today" : "آج ہی اپنا ٹیک سفر شروع کریں",
      ctaDescription:
        locale === "en"
          ? "Your first course is free. Learn in Urdu and English, build real projects, and prepare for a modern career."
          : "آپ کا پہلا کورس مفت ہے۔ اردو اور انگلش میں سیکھیں، حقیقی پروجیکٹ بنائیں، اور جدید کیریئر کی تیاری کریں۔",
    }),
    [locale],
  );

  return (
    <div
      dir={locale === "ur" ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-paper text-ink antialiased"
      style={{
        backgroundImage:
          "radial-gradient(1100px_640px_at_50%_-280px, var(--green-50), transparent 62%), radial-gradient(760px_520px_at_100%_6%, color-mix(in oklab, var(--green-500) 8%, transparent), transparent 58%), radial-gradient(680px_520px_at_0%_30%, color-mix(in oklab, var(--green-500) 5%, transparent), transparent 60%)",
      }}
    >
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 md:px-6">
          <a href="#top" className="mr-auto flex items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-[11px_11px_11px_3px] bg-gradient-to-br from-green-500 to-green-700 shadow-[0_6px_14px_-6px_var(--green-600)]">
              <span className="h-4 w-4 rotate-45 rounded-[9px_9px_9px_0] border-2 border-white border-b-transparent border-r-transparent" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[16px] font-extrabold tracking-[-0.02em]">Madarsa Tech Academy</span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-green-600">Tech Mastery · Deeni Excellence</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-semibold text-muted transition-colors hover:text-green-700">
                {text(item.label, locale)}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ur" : "en")}
              className="inline-flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-[12.5px] font-bold text-green-700 transition hover:translate-y-[-1px]"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "en" ? "اردو" : "English"}
            </button>
            <Link href="/login" className="text-sm font-semibold text-muted transition hover:text-ink">
              {pageText.signIn}
            </Link>
            <Link href="/signup" className="rounded-lg bg-gradient-to-br from-green-500 to-green-700 px-4 py-2 text-sm font-bold text-white shadow-[0_8px_18px_-9px_var(--green-600)] transition hover:translate-y-[-1px]">
              {pageText.navCta}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-green-100 bg-green-50 text-green-700 lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-700 shadow-[0_0_12px_var(--green-500)]" />

        {menuOpen ? (
          <div className="border-t border-line bg-paper px-5 pb-5 pt-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-line py-3 text-sm font-semibold">
                  {text(item.label, locale)}
                </a>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setLocale(locale === "en" ? "ur" : "en")}
                className="flex-1 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700"
              >
                {locale === "en" ? "اردو" : "English"}
              </button>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg border border-line bg-white px-4 py-3 text-center text-sm font-bold text-green-700">
                {pageText.signIn}
              </Link>
            </div>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="mt-3 block rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-bold text-white">
              {pageText.navCta}
            </Link>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 md:px-6 md:pt-20">
          <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 end-[-60px] h-[520px] w-[420px] rounded-[210px_210px_30px_30px] border border-green-100/80 opacity-55" />
            <div className="absolute top-5 end-0 h-[380px] w-[300px] rounded-[150px_150px_22px_22px] border border-green-100/70 opacity-40" />
            <div className="absolute top-28 start-[-70px] h-[200px] w-[160px] rounded-[80px_80px_14px_14px] border border-green-100/60 opacity-30" />
            {/* Lottie floating dots — subtle tech-particle background */}
            <div className="absolute bottom-0 start-[8%] h-[300px] w-[300px] opacity-35">
              <LottieWidget animationData={floatDots} />
            </div>
          </div>

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div data-hero-item className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[12.5px] font-bold text-green-700 shadow-soft-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulseSoft" />
                {text(heroBadge, locale)}
              </div>

              <h1 data-hero-item className="mb-5 max-w-2xl whitespace-pre-line font-serif text-[clamp(2.6rem,5.4vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.025em] text-ink">
                {text(heroTitle, locale)}
              </h1>

              <p data-hero-item className="max-w-2xl text-[17.5px] leading-7 text-muted md:text-[18px]">{text(heroDescription, locale)}</p>

              <div data-hero-item className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-6 py-3.5 text-[15.5px] font-bold text-white shadow-[0_12px_26px_-12px_var(--green-600)] transition hover:translate-y-[-1px]">
                  {pageText.startFree}
                </Link>
                <a href="#tracks" className="rounded-xl border border-line bg-white px-6 py-3.5 text-[15.5px] font-bold text-green-700 shadow-soft-sm transition hover:translate-y-[-1px]">
                  {pageText.explore}
                </a>
              </div>

              <div data-hero-item className="mt-6 flex flex-wrap gap-2.5">
                {heroBadges.map((badge) => (
                  <span key={badge.en} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-soft-sm">
                    <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                    {text(badge, locale)}
                  </span>
                ))}
              </div>

              <div data-hero-item className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6">
                {stats.map((stat, index) => (
                  <div key={stat.value} className="flex items-center gap-2.5">
                    {index > 0 && <span className="hidden h-5 w-px bg-line sm:block" />}
                    <div>
                      <div className="font-serif text-[1.35rem] font-semibold leading-none text-ink" data-count={stat.value}>{stat.value}</div>
                      <div className="mt-0.5 text-[11.5px] font-semibold text-muted">{text(stat.label, locale)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -end-8 -top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_32%_32%,color-mix(in_oklab,var(--green-500)_60%,transparent),transparent_68%)] blur-[18px] opacity-50 animate-aurora" />
              <div className="absolute -bottom-8 -start-4 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--gold),transparent_70%)] blur-[22px] opacity-25 animate-aurora [animation-direction:reverse]" />

              <div className="relative overflow-hidden rounded-[24px] border border-line bg-white shadow-soft animate-floatY">
                <Image src={heroStudentGreen} alt="Madrasa student learning tech on a laptop and mobile" priority className="h-auto w-full object-cover" />
              </div>

              <div className="absolute -bottom-4 end-0 z-10 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft animate-floatY2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-white">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-extrabold">Certificate ready</div>
                  <div className="text-xs text-muted">Shareable · verified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-8">
          <div className="mx-auto mb-4 max-w-7xl px-5 text-center md:px-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted">{locale === "en" ? "Skills you'll master" : "جو مہارتیں آپ سیکھیں گے"}</span>
          </div>
          <div className="overflow-hidden [mask:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
            <div className="flex w-max gap-3 px-1.5 py-1 animate-marquee">
              {Array.from({ length: 2 })
                .flatMap(() => ["React", "Next.js", "JavaScript", "Python", "Flutter", "TensorFlow", "SQL", "Figma", "Node.js", "Cloud", "AI", "GitHub"])
                .map((skill, index) => (
                  <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-soft-sm">
                    <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: SKILL_DOT_COLORS[skill] ?? "#16a34a" }} />
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-20 md:px-6">
          <SectionHeading eyebrow={{ en: "How It Works", ur: "طریقہ کار" }} title={{ en: "Four simple steps", ur: "چار آسان مراحل" }} locale={locale} />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.number} className="rounded-[18px] border border-line bg-white p-6 shadow-soft-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-600 text-[13px] font-extrabold text-white">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mb-1.5 text-base font-extrabold">{text(step.title, locale)}</h3>
                <p className="text-[13px] leading-6 text-muted">{text(step.description, locale)}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tracks" className="mx-auto max-w-7xl px-5 pt-20 md:px-6">
          <SectionHeading
            eyebrow={{ en: "Learning Tracks", ur: "سیکھنے کے ٹریکس" }}
            title={{ en: "A clear path — from the basics to a career", ur: "ایک واضح راستہ — بنیادی باتوں سے کیریئر تک" }}
            description={{ en: "Pick a track and progress step by step, at your own pace.", ur: "ایک ٹریک منتخب کریں اور قدم بہ قدم آگے بڑھیں۔" }}
            locale={locale}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track) => (
              <article
                key={track.index}
                data-track-card
                className={`overflow-hidden rounded-[18px] border bg-white p-6 shadow-soft-sm transition-transform duration-300 hover:-translate-y-1 ${track.featured ? "border-green-700 bg-gradient-to-br from-green-700 to-green-600 text-white shadow-soft" : "border-line"}`}
              >
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-[13px_13px_13px_4px] border font-extrabold ${track.featured ? "border-white/20 bg-white/15 text-white" : "border-green-100 bg-green-50 text-green-700"}`}>
                  {track.index}
                </div>
                <h3 className="mb-1 text-[17px] font-extrabold">{text(track.title, locale)}</h3>
                <p className={`mb-4 text-[13.5px] leading-6 ${track.featured ? "text-white/85" : "text-muted"}`}>{text(track.description, locale)}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {track.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${track.featured ? "bg-white/15 text-white" : "bg-green-50 text-green-700"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#courses" className={`flex items-center justify-between border-t pt-3.5 text-[13.5px] font-bold ${track.featured ? "border-white/20 text-white" : "border-line text-green-700"}`}>
                  <span>{text(track.courses, locale)}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
            <article className="flex flex-col justify-center rounded-[18px] border border-dashed border-green-100 bg-green-50 p-6">
              <h3 className="mb-2 font-serif text-[21px] font-medium leading-tight text-ink">{locale === "en" ? "Not sure where to start?" : "یقین نہیں کہاں سے شروع کریں؟"}</h3>
              <p className="mb-4 text-[13.5px] leading-6 text-muted">
                {locale === "en" ? "Take a 2-minute quiz and we'll recommend a track for you." : "2 منٹ کا کوئز لیں اور ہم آپ کے لیے ٹریک تجویز کریں گے۔"}
              </p>
              <a href="#cta" className="inline-flex self-start rounded-xl bg-green-600 px-4.5 py-2.5 text-[13.5px] font-bold text-white">
                {locale === "en" ? "Find my track" : "میرا ٹریک تلاش کریں"}
              </a>
            </article>
          </div>
        </section>

        <section id="courses" className="mt-16 border-y border-line bg-paper-2 bg-grid-subtle">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-green-600">{pageText.featuredCourses}</div>
                <h2 className="font-serif text-[clamp(2rem,3.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
                  {locale === "en" ? "Start learning today" : "آج ہی سیکھنا شروع کریں"}
                </h2>
              </div>
              <a href="#tracks" className="inline-flex items-center gap-1 text-sm font-bold text-green-700">
                {pageText.allCourses}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* ── Search + filters ── */}
            <div className="mb-8 rounded-2xl border border-line bg-white p-4 shadow-soft-sm md:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Search box */}
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={locale === "en" ? "Search courses or skills…" : "کورس یا مہارت تلاش کریں…"}
                    aria-label={locale === "en" ? "Search courses" : "کورس تلاش کریں"}
                    className="w-full rounded-xl border border-line bg-paper-2 py-2.5 ps-10 pe-4 text-[14px] font-medium text-ink outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Filter chip groups */}
                <div className="flex flex-wrap items-center gap-2">
                  <SlidersHorizontal className="hidden h-4 w-4 text-muted sm:block" />

                  {/* Price */}
                  {([
                    { key: "all", label: { en: "All", ur: "تمام" } },
                    { key: "free", label: { en: "Free", ur: "مفت" } },
                    { key: "paid", label: { en: "Paid", ur: "ادائیگی" } },
                  ] as const).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPriceFilter(opt.key)}
                      className={`rounded-lg px-3 py-1.5 text-[12.5px] font-bold transition ${
                        priceFilter === opt.key
                          ? "bg-green-600 text-white shadow-[0_5px_14px_-6px_var(--green-600)]"
                          : "border border-line bg-white text-muted hover:border-green-200 hover:text-green-700"
                      }`}
                    >
                      {text(opt.label, locale)}
                    </button>
                  ))}

                  <span className="hidden h-5 w-px bg-line sm:block" />

                  {/* Level */}
                  <button
                    type="button"
                    onClick={() => setLevel("all")}
                    className={`rounded-lg px-3 py-1.5 text-[12.5px] font-bold transition ${
                      level === "all"
                        ? "bg-green-600 text-white shadow-[0_5px_14px_-6px_var(--green-600)]"
                        : "border border-line bg-white text-muted hover:border-green-200 hover:text-green-700"
                    }`}
                  >
                    {locale === "en" ? "All levels" : "تمام درجے"}
                  </button>
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`rounded-lg px-3 py-1.5 text-[12.5px] font-bold transition ${
                        level === lvl
                          ? "bg-green-600 text-white shadow-[0_5px_14px_-6px_var(--green-600)]"
                          : "border border-line bg-white text-muted hover:border-green-200 hover:text-green-700"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result count + clear */}
              <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[12.5px]">
                <span className="font-semibold text-muted">
                  {filteredCourses.length}{" "}
                  {locale === "en"
                    ? `course${filteredCourses.length === 1 ? "" : "s"} found`
                    : "کورس ملے"}
                </span>
                {filtersActive && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 font-bold text-green-700 hover:text-green-800"
                  >
                    <X className="h-3.5 w-3.5" />
                    {locale === "en" ? "Clear filters" : "فلٹر صاف کریں"}
                  </button>
                )}
              </div>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white py-16 text-center">
                <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-green-50 text-green-600">
                  <Search className="h-6 w-6" />
                </span>
                <h3 className="mb-1 text-[17px] font-extrabold text-ink">
                  {locale === "en" ? "No courses match your filters" : "کوئی کورس آپ کے فلٹر سے میل نہیں کھاتا"}
                </h3>
                <p className="mb-5 max-w-sm text-[13.5px] text-muted">
                  {locale === "en"
                    ? "Try a different search term or clear the filters to see everything."
                    : "مختلف لفظ آزمائیں یا سب کچھ دیکھنے کے لیے فلٹر صاف کریں۔"}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl bg-green-600 px-5 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-green-700"
                >
                  {locale === "en" ? "Clear filters" : "فلٹر صاف کریں"}
                </button>
              </div>
            ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <article
                  key={course.title}
                  data-course-card
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line/60 bg-white shadow-[0_2px_20px_-6px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-[0_24px_52px_-14px_rgba(0,0,0,0.18)]"
                >
                  {/* ── Tall header: logo fills bg, title overlaid at bottom ── */}
                  <div className="relative h-48 overflow-hidden">
                    <CourseLogo title={course.title} />

                    {/* dark gradient veil at bottom so white text is legible */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                    {/* badge pill — top left */}
                    <span className="absolute left-3.5 top-3.5 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {course.badge[locale]}
                    </span>

                    {/* course title on the dark bg — premium feel */}
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
                      <h3 className="text-[15.5px] font-extrabold leading-snug tracking-[-0.01em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">

                    {/* Skill tags */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {course.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats row: rating · lessons · duration · level */}
                    <div className="mb-5 flex items-center gap-2 text-[12px] text-muted">
                      <span className="flex items-center gap-1 font-semibold">
                        <Star className="h-3.5 w-3.5 fill-current text-gold" />
                        {course.rating}
                      </span>
                      <span className="h-3 w-px bg-line" />
                      <span>{course.lessons} {locale === "en" ? "lessons" : "اسباق"}</span>
                      <span className="h-3 w-px bg-line" />
                      <span>{course.duration}</span>
                      <span className="h-3 w-px bg-line" />
                      <span>{text(course.level, locale)}</span>
                    </div>

                    {/* Price row */}
                    <div className="mb-4 mt-auto flex items-baseline gap-2 border-t border-line pt-4">
                      <span className={`text-[20px] font-extrabold leading-none ${course.price === "Free" ? "text-green-600" : "text-ink"}`}>
                        {course.price === "Free" ? (locale === "en" ? "Free" : "مفت") : course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-[12px] text-muted line-through">{course.originalPrice}</span>
                      )}
                      {course.originalPrice && (
                        <span className="ml-auto rounded-md bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-bold text-amber-700">
                          {Math.round((1 - parseInt(course.price.replace(/\D/g,"")) / parseInt(course.originalPrice.replace(/\D/g,""))) * 100)}% off
                        </span>
                      )}
                    </div>

                    {/* Two CTA buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={`/courses/${course.slug}`}
                        className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-line py-2.5 text-[12.5px] font-bold text-ink transition-all duration-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                      >
                        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="2" y1="4" x2="14" y2="4" />
                          <line x1="2" y1="8" x2="10" y2="8" />
                          <line x1="2" y1="12" x2="7" y2="12" />
                        </svg>
                        {locale === "en" ? "Curriculum" : "نصاب"}
                      </a>
                      <a
                        href="#cta"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-2.5 text-[12.5px] font-bold text-white shadow-[0_5px_14px_-5px_var(--green-600)] transition-all duration-200 hover:shadow-[0_8px_20px_-6px_var(--green-600)] hover:opacity-95"
                      >
                        {locale === "en"
                          ? course.price === "Free" ? "Enroll Free" : "Enroll Now"
                          : course.price === "Free" ? "مفت داخلہ" : "ابھی داخلہ"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            )}
          </div>
        </section>

        <section id="why" className="mx-auto max-w-7xl px-5 pt-20 md:px-6">
          <SectionHeading
            eyebrow={{ en: "Why This Platform", ur: "یہ پلیٹ فارم کیوں" }}
            title={{ en: "Built for madrasa learners", ur: "مدرسہ کے طلبہ کے لیے بنایا گیا" }}
            locale={locale}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <article key={feature.title.en} className={`rounded-[16px] border bg-white p-5 shadow-soft-sm ${index >= 4 ? "xl:col-span-1" : ""}`}>
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-[11px] bg-green-50 text-green-700">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </div>
                <h3 className="mb-1 text-[15px] font-extrabold">{text(feature.title, locale)}</h3>
                <p className="text-[13px] leading-6 text-muted">{text(feature.description, locale)}</p>
              </article>
            ))}
            <article className="flex flex-col justify-center rounded-[16px] bg-green-600 p-5 text-white shadow-soft-sm md:col-span-2 xl:col-span-1">
              <div className="font-serif text-xl leading-tight">{locale === "en" ? "First course free" : "پہلا کورس مفت"}</div>
              <p className="mt-2 text-[13px] leading-6 text-white/85">{locale === "en" ? "No card needed. Start today." : "بغیر کارڈ کے، آج ہی شروع کریں۔"}</p>
            </article>
          </div>
        </section>

        <section id="stories" className="mt-16 border-y border-line bg-paper-2 bg-grid-subtle">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6">
            <SectionHeading eyebrow={{ en: "Success Stories", ur: "کامیابی کی کہانیاں" }} title={{ en: "Students across India, real results", ur: "بھارت بھر کے طلبہ، حقیقی نتائج" }} locale={locale} />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stories.map((story) => (
                <article key={story.name} className="flex flex-col rounded-[18px] border border-line bg-white p-6 shadow-soft-sm">
                  <div className="mb-3 flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mb-5 flex-1 text-[14.5px] leading-7 text-ink">“{text(story.quote, locale)}”</p>
                  <div className="flex items-center gap-3 border-t border-line pt-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-green-100 font-extrabold text-green-800">{story.initials}</span>
                    <div>
                      <div className="text-[13.5px] font-extrabold text-ink">{story.name}</div>
                      <div className="text-xs text-muted">
                        {story.role} · {story.city}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-20 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-green-600">{locale === "en" ? "Certification" : "سرٹیفکیشن"}</div>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">{pageText.certTitle}</h2>
              <p className="mt-4 text-[15.5px] leading-7 text-muted">
                {locale === "en"
                  ? "Each certificate has a unique ID and a shareable link, ready for your resume and LinkedIn profile."
                  : "ہر سرٹیفکیٹ کی منفرد آئی ڈی اور شیئر ایبل لنک ہوتا ہے — ریزیومے اور LinkedIn کے لیے تیار۔"}
              </p>
              <div className="mt-6 space-y-3">
                {certificationBullets.map((bullet) => (
                  <div key={bullet.en} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-green-50 text-green-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[14.5px] font-semibold">{text(bullet, locale)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-line bg-white p-7 shadow-soft">
              <div className="overflow-hidden rounded-[14px] border border-green-100 bg-[repeating-linear-gradient(45deg,var(--green-50)_0_2px,transparent_2px_18px)] p-6 text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-[9px_9px_9px_2px] bg-gradient-to-br from-green-500 to-green-700">
                    <span className="h-3 w-3 rotate-45 rounded-[7px_7px_7px_0] border-2 border-white border-b-transparent border-r-transparent" />
                  </span>
                  <span className="text-sm font-extrabold text-ink">Madarsa Tech Academy</span>
                </div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Certificate of Completion</div>
                <div className="mb-1 font-serif text-[26px] text-ink">Ahmad Raza</div>
                <div className="mb-4 text-[13px] text-muted">has successfully completed</div>
                <div className="mb-5 text-[16px] font-extrabold text-green-700">React &amp; Next.js Development</div>
                <div className="flex items-end justify-between border-t border-line pt-4 text-left">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.1em] text-muted">Certificate ID</div>
                    <div className="font-mono text-[12px] font-bold">MTA-2026-7F3A9</div>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-white shadow-[0_6px_14px_-6px_var(--gold)]">
                    <Star className="h-5 w-5 fill-current" />
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-green-700">
                <Link2 className="h-4 w-4 flex-none" />
                <span className="truncate font-mono text-[11.5px]">verify.madarsatech.com/MTA-2026-7F3A9</span>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-5 pb-20 pt-20 md:px-6">
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-green-700 to-green-600 px-6 py-14 text-center text-white shadow-[0_30px_60px_-30px_var(--green-700)] md:px-8">
            <div className="absolute inset-x-1/2 top-[-60px] h-[440px] w-[360px] -translate-x-1/2 rounded-[180px_180px_24px_24px] border border-white/15" />
            <div className="absolute inset-y-0 start-0 z-0 w-[38%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)] animate-shine" />
            {/* Lottie pulsing orb — bottom-right corner accent */}
            <div className="pointer-events-none absolute bottom-[-30px] end-[-30px] h-[180px] w-[180px] opacity-25">
              <LottieWidget animationData={pulseOrb} />
            </div>
            {/* Lottie pulsing orb — top-left echo */}
            <div className="pointer-events-none absolute top-[-20px] start-[-20px] h-[140px] w-[140px] opacity-15">
              <LottieWidget animationData={pulseOrb} />
            </div>
            <div className="relative z-10">
              <h2 className="font-serif text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]">{pageText.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-7 text-white/90">{pageText.ctaDescription}</p>
              <Link href="/signup" className="mt-7 inline-flex rounded-xl bg-white px-8 py-4 text-base font-extrabold text-green-700 shadow-[0_12px_26px_-10px_rgba(0,0,0,.3)] transition hover:translate-y-[-1px]">
                {locale === "en" ? "Create Free Account" : "مفت اکاؤنٹ بنائیں"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-green-800 text-white/80">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-[10px_10px_10px_3px] bg-gradient-to-br from-green-500 to-green-700">
                  <span className="h-3.5 w-3.5 rotate-45 rounded-[8px_8px_8px_0] border-2 border-white border-b-transparent border-r-transparent" />
                </span>
                <span className="text-[15px] font-extrabold text-white">Madarsa Tech Academy</span>
              </div>
              <p className="max-w-xs text-[13.5px] leading-7">{locale === "en" ? "Bridging traditional Islamic education and modern digital careers." : "روایتی اسلامی تعلیم اور جدید ڈیجیٹل کیریئر کے درمیان ایک پل۔"}</p>
            </div>
            <div>
              <div className="mb-3 text-[13px] font-bold text-white">{locale === "en" ? "Platform" : "پلیٹ فارم"}</div>
              <div className="flex flex-col gap-2 text-[13.5px]">
                {footerLinks.platform.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-white">
                    {text(item.label, locale)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-[13px] font-bold text-white">{locale === "en" ? "Company" : "کمپنی"}</div>
              <div className="flex flex-col gap-2 text-[13.5px]">
                {footerLinks.company.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-white">
                    {text(item.label, locale)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-[13px] font-bold text-white">{locale === "en" ? "Get in touch" : "رابطہ کریں"}</div>
              <div className="flex flex-col gap-2 text-[13.5px]">
                <span>hello@madarsatech.com</span>
                <span>Lucknow, India</span>
              </div>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-[12.5px]">
            <span>© 2026 Madarsa Tech Academy. All rights reserved.</span>
            <span>{locale === "en" ? "Made with care in India." : "بھارت میں محبت سے بنایا گیا"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}