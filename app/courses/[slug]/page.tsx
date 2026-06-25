"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  GraduationCap,
  Lock,
  Play,
  Smartphone,
  Star,
  Trophy,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";
import CourseLogo from "@/components/CourseLogo";
import { courses, curricula, courseConfigs } from "@/lib/landing-data";

function discountPercent(price: string, original?: string): number | null {
  if (!original) return null;
  const a = +price.replace(/[^\d]/g, "");
  const b = +original.replace(/[^\d]/g, "");
  if (!a || !b) return null;
  return Math.round((1 - a / b) * 100);
}

export default function CurriculumPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const course = courses.find((c) => c.slug === slug);
  const sections = curricula[slug] ?? [];
  const config = courseConfigs[slug];
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!pageRef.current) return;

      const ctx = gsap.context(() => {
        // Hero entrance — elements slide up on load
        gsap.from(".hero-animate", {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.1,
        });

        // Section cards fade + rise on scroll
        gsap.utils.toArray<Element>(".gsap-reveal").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            y: 40,
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
          });
        });

        // Outcome items stagger from left
        gsap.from(".outcome-item", {
          scrollTrigger: { trigger: ".outcomes-grid", start: "top 85%", once: true },
          x: -18,
          opacity: 0,
          duration: 0.38,
          stagger: 0.045,
          ease: "power1.out",
        });

        // Module cards stagger up
        gsap.from(".module-card", {
          scrollTrigger: { trigger: ".modules-container", start: "top 82%", once: true },
          y: 18,
          opacity: 0,
          duration: 0.38,
          stagger: 0.065,
          ease: "power1.out",
        });
      }, pageRef.current);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  if (!course || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-ink">Course not found.</p>
          <Link href="/" className="text-green-700 underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0);
  const totalMinutes = sections.reduce(
    (s, sec) => s + sec.lessons.reduce((ls, l) => ls + parseInt(l.duration), 0),
    0
  );
  const previewCount = sections.reduce(
    (s, sec) => s + sec.lessons.filter((l) => l.preview).length,
    0
  );
  const totalHours = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
  const allOpen = openSections.size === sections.length;
  const discount = discountPercent(course.price, course.originalPrice);

  function toggle(i: number) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const courseIncludes: { Icon: React.ComponentType<{ className?: string }>; text: string }[] = [
    { Icon: Play, text: `${totalHours} on-demand video` },
    { Icon: BookOpen, text: `${totalLessons} lessons` },
    { Icon: Smartphone, text: "Mobile & desktop access" },
    { Icon: Globe, text: "Urdu + English instruction" },
    { Icon: Trophy, text: "Certificate of completion" },
    { Icon: Wifi, text: "Optimised for slow internet" },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-paper">

      {/* ── Sticky nav ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-3 md:px-6">
          <Link
            href="/#courses"
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-muted transition hover:bg-green-50 hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Courses
          </Link>
          <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted/50" />
          <span className="truncate text-sm font-bold text-ink">{course.title}</span>
          <a
            href="#enroll"
            className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-br from-green-500 to-green-700 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 md:flex"
          >
            {course.price === "Free" ? "Enroll Free" : `Enroll — ${course.price}`}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${config.heroFrom} 0%, ${config.heroTo} 100%)`,
        }}
      >
        {/* Decorative bg watermark logo */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[50%] opacity-[0.06]">
          <CourseLogo title={course.title} />
        </div>
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute left-[-20%] top-[-40%] h-[80vw] w-[80vw] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${config.accentColor}44 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20 lg:py-24">
          {/* Badge + level */}
          <div className="hero-animate mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {course.badge.en}
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11.5px] font-semibold text-white/70">
              {course.level.en}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-animate mb-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            {course.title}
          </h1>

          {/* Tags */}
          <div className="hero-animate mb-6 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="hero-animate mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <span className="flex items-center gap-1.5 font-bold text-yellow-300">
              <Star className="h-4 w-4 fill-current" />
              {course.rating}
              <span className="font-normal text-white/55">
                ({config.instructor.students} enrolled)
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-white/65">
              <BookOpen className="h-4 w-4 text-white/45" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5 text-white/65">
              <Clock className="h-4 w-4 text-white/45" />
              {totalHours} total
            </span>
            <span className="flex items-center gap-1.5 text-white/65">
              <Play className="h-4 w-4 text-white/45" />
              {previewCount} free previews
            </span>
          </div>

          {/* Instructor byline */}
          <div className="hero-animate flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${config.accentColor}55, ${config.accentColor}99)`,
                border: `2px solid ${config.accentColor}50`,
              }}
            >
              {config.instructor.initials}
            </div>
            <p className="text-[13.5px] text-white/80">
              Taught by{" "}
              <span className="font-bold text-white">{config.instructor.name}</span>
              <span className="mx-2 text-white/35">·</span>
              <span className="text-white/55">{config.instructor.role}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Two-column layout ──────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10 xl:grid-cols-[1fr_340px]">

        {/* ── Left: main content ── */}
        <div className="min-w-0">

          {/* What you'll learn */}
          <section className="gsap-reveal mb-8 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <div className="border-b border-line px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-green-600 text-white shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h2 className="text-[17px] font-extrabold text-ink">What you will learn</h2>
              </div>
            </div>
            <div className="outcomes-grid grid grid-cols-1 gap-x-8 gap-y-3.5 p-6 sm:grid-cols-2">
              {config.outcomes.map((outcome, i) => (
                <div key={i} className="outcome-item flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    style={{ width: 17, height: 17 }}
                  />
                  <span className="text-[13.5px] leading-snug text-ink/85">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section className="gsap-reveal mb-8 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <div className="border-b border-line px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-green-600 text-white shadow-sm">
                  <Award className="h-5 w-5" />
                </div>
                <h2 className="text-[17px] font-extrabold text-ink">Your Instructor</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2.5 sm:items-start">
                  <div
                    className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-2xl text-[26px] font-extrabold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(145deg, ${config.heroFrom}, ${config.heroTo})`,
                      border: `2.5px solid ${config.accentColor}40`,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {config.instructor.initials}
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700 ring-1 ring-green-100">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-0.5 text-[17px] font-extrabold text-ink">
                    {config.instructor.name}
                  </div>
                  <div className="mb-4 text-[13px] font-semibold text-green-700">
                    {config.instructor.role}
                  </div>

                  {/* Mini stats */}
                  <div className="mb-5 flex flex-wrap gap-4 text-[12.5px]">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Star className="h-3.5 w-3.5 fill-current text-gold" />
                      <strong className="font-bold text-ink">{config.instructor.rating}</strong>
                      {" "}rating
                    </span>
                    <span className="flex items-center gap-1.5 text-muted">
                      <Users className="h-3.5 w-3.5 text-green-600" />
                      <strong className="font-bold text-ink">{config.instructor.students}</strong>
                      {" "}students
                    </span>
                    <span className="flex items-center gap-1.5 text-muted">
                      <BookOpen className="h-3.5 w-3.5 text-green-600" />
                      <strong className="font-bold text-ink">{config.instructor.courses}</strong>
                      {" "}courses
                    </span>
                    <span className="flex items-center gap-1.5 text-muted">
                      <Zap className="h-3.5 w-3.5 text-green-600" />
                      <strong className="font-bold text-ink">{config.instructor.experience}</strong>
                      {" "}experience
                    </span>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-muted">
                    {config.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section className="gsap-reveal">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[18px] font-extrabold text-ink">Course Curriculum</h2>
                <p className="mt-1 text-[13px] text-muted">
                  {sections.length} modules · {totalLessons} lessons · {totalHours}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setOpenSections(
                    allOpen ? new Set() : new Set(sections.map((_, i) => i))
                  )
                }
                className="shrink-0 rounded-xl border border-green-200 bg-green-50 px-3.5 py-2 text-[12.5px] font-bold text-green-700 transition hover:bg-green-100"
              >
                {allOpen ? "Collapse all" : "Expand all"}
              </button>
            </div>

            <div className="modules-container space-y-2.5">
              {sections.map((section, si) => {
                const isOpen = openSections.has(si);
                const secMinutes = section.lessons.reduce(
                  (s, l) => s + parseInt(l.duration),
                  0
                );
                const freeCount = section.lessons.filter((l) => l.preview).length;

                return (
                  <div
                    key={si}
                    className="module-card overflow-hidden rounded-xl border border-line bg-white shadow-soft-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(si)}
                      className="group flex w-full items-center gap-3.5 px-5 py-4 text-left transition hover:bg-green-50/50"
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[12px] font-extrabold text-white shadow-sm"
                        style={{ background: config.heroTo }}
                      >
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-[14px] font-bold text-ink">
                          {section.title}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-muted">
                          <span>{section.lessons.length} lessons</span>
                          <span>·</span>
                          <span>{secMinutes}m</span>
                          {freeCount > 0 && (
                            <>
                              <span>·</span>
                              <span className="font-semibold text-green-600">
                                {freeCount} free
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 rounded-lg border border-line p-1 text-muted transition group-hover:border-green-200 group-hover:bg-white">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-line/70">
                        {section.lessons.map((lesson, li) => (
                          <div
                            key={li}
                            className="flex items-center gap-3 border-b border-line/40 px-5 py-3 last:border-b-0"
                          >
                            <div
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                                lesson.preview
                                  ? "bg-green-100 text-green-700"
                                  : "bg-paper-2 text-muted"
                              }`}
                            >
                              {lesson.preview ? (
                                <Play className="h-3 w-3" />
                              ) : (
                                <Lock className="h-3 w-3 opacity-60" />
                              )}
                            </div>
                            <span className="flex-1 text-[13px] font-medium text-ink">
                              {lesson.title}
                            </span>
                            {lesson.preview && (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 ring-1 ring-green-200">
                                Preview
                              </span>
                            )}
                            <span className="flex shrink-0 items-center gap-1 text-[11.5px] text-muted">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Right: sticky sidebar ── */}
        <aside className="mt-8 lg:mt-0">
          <div className="sticky top-20 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            {/* Course logo header */}
            <div className="relative h-44 overflow-hidden">
              <CourseLogo title={course.title} />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10.5px] font-bold text-white backdrop-blur-sm">
                {course.badge.en}
              </span>
            </div>

            <div className="p-5">
              {/* Price */}
              <div className="mb-4 flex flex-wrap items-baseline gap-2.5">
                <span className="text-[28px] font-extrabold leading-none text-ink">
                  {course.price === "Free" ? "Free" : course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-[15px] text-muted line-through">
                    {course.originalPrice}
                  </span>
                )}
                {discount && (
                  <span className="rounded-lg bg-green-50 px-2 py-0.5 text-[11px] font-extrabold text-green-700 ring-1 ring-green-100">
                    {discount}% off
                  </span>
                )}
              </div>

              {/* CTA */}
              <a
                href="#enroll"
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-3.5 text-[14.5px] font-extrabold text-white shadow-[0_6px_18px_-6px_var(--green-600)] transition hover:-translate-y-0.5"
              >
                {course.price === "Free" ? "Enroll Free — Start Now" : `Enroll — ${course.price}`}
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mb-5 text-center text-[11.5px] text-muted">
                {course.price === "Free"
                  ? "No credit card required"
                  : "One-time payment · Lifetime access"}
              </p>

              {/* Includes */}
              <div className="border-t border-line pt-4">
                <p className="mb-3 text-[11.5px] font-extrabold uppercase tracking-wider text-muted">
                  This course includes
                </p>
                <ul className="space-y-2.5">
                  {courseIncludes.map(({ Icon, text }, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-ink/80">
                      <Icon className="h-4 w-4 shrink-0 text-green-600" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Mobile sticky enroll bar ── */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <a
          href="#enroll"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-700 py-3.5 text-[14px] font-extrabold text-white shadow-md"
        >
          {course.price === "Free" ? "Enroll Free — Start Now" : `Enroll — ${course.price}`}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <div id="enroll" className="mx-auto max-w-6xl px-5 pb-24 pt-12 md:px-6">
        <div
          className="relative overflow-hidden rounded-2xl px-8 py-14 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${config.heroFrom} 0%, ${config.heroTo} 100%)`,
          }}
        >
          {/* Decorative corner logo */}
          <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 opacity-[0.05]">
            <CourseLogo title={course.title} />
          </div>
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-full w-1/2 -translate-x-1/2"
            style={{
              background: `radial-gradient(ellipse at center top, ${config.accentColor}30 0%, transparent 65%)`,
            }}
          />

          <div className="relative">
            <div className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white/55">
              Ready to begin?
            </div>
            <h2 className="mb-2 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold tracking-tight text-white">
              {course.title}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-[14px] text-white/55">
              Join {config.instructor.students} students learning from{" "}
              {config.instructor.name}
            </p>
            <div className="mb-6 flex items-baseline justify-center gap-3">
              <span className="text-[2rem] font-extrabold">
                {course.price === "Free" ? "Free" : course.price}
              </span>
              {course.originalPrice && (
                <span className="text-[1.1rem] text-white/45 line-through">
                  {course.originalPrice}
                </span>
              )}
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-green-700 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.35)]"
            >
              {course.price === "Free" ? "Enroll Free — Start Today" : `Enroll Now — ${course.price}`}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3.5 text-[12px] text-white/45">
              {course.price === "Free"
                ? "No card required. Start instantly."
                : "One-time payment. Lifetime access."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
