"use client";

import { useEffect, useRef } from "react";

export default function Page() {
  const rootRef = useRef(null);
  const langRef = useRef("en");

  const applyLang = (lang) => {
    const root = rootRef.current;
    if (!root) return;
    root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    root.querySelectorAll("[data-ur]").forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.textContent;
      if (lang === "ur") { el.textContent = el.getAttribute("data-ur"); el.style.fontFamily = "'Noto Nastaliq Urdu', serif"; el.style.lineHeight = "2.1"; }
      else { el.textContent = el.dataset.en; el.style.fontFamily = ""; el.style.lineHeight = ""; }
    });
    const btn = root.querySelector("[data-langbtn]");
    if (btn) { btn.childNodes.forEach((n) => { if (n.nodeType === 3) n.textContent = lang === "ur" ? "English" : "اردو"; }); }
  };
  const toggleLang = () => { const n = langRef.current === "en" ? "ur" : "en"; langRef.current = n; applyLang(n); };
  const toggleNav = () => {
    const root = rootRef.current; if (!root) return;
    const m = root.querySelector("[data-mobilemenu]");
    if (m) { m.style.display = (m.style.display === "none" || !m.style.display) ? "block" : "none"; }
    applyLang(langRef.current);
  };
  const closeNav = () => { const root = rootRef.current; if (!root) return; const m = root.querySelector("[data-mobilemenu]"); if (m) m.style.display = "none"; };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const menu = root.querySelector("[data-mobilemenu]");
    if (menu) menu.style.display = "none";

    ["[data-trackgrid]","[data-coursegrid]","[data-whygrid]","[data-stepgrid]","[data-storygrid]"].forEach((sel) => {
      const grid = root.querySelector(sel);
      if (!grid) return;
      let i = 0;
      Array.from(grid.children).forEach((ch) => {
        if (ch.hasAttribute("data-reveal") && !ch.hasAttribute("data-delay")) ch.setAttribute("data-delay", String((i % 4) * 70));
        i++;
      });
    });
    const items = Array.from(root.querySelectorAll("[data-reveal]"));
    const EASE = "cubic-bezier(.16,.84,.44,1)";
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px) scale(.985)";
      el.style.filter = "blur(8px)";
      el.style.transition = "opacity .8s " + EASE + ", transform .9s " + EASE + ", filter .8s " + EASE;
      el.style.willChange = "opacity, transform, filter";
    });
    const reveal = (el) => { const d = parseFloat(el.getAttribute("data-delay") || "0"); el.style.transitionDelay = d + "ms"; el.style.opacity = "1"; el.style.transform = "none"; el.style.filter = "none"; };
    const hide = (el) => { el.style.transitionDelay = "0ms"; el.style.opacity = "0"; el.style.transform = "translateY(30px) scale(.985)"; el.style.filter = "blur(8px)"; };
    const inView = (el) => { const r = el.getBoundingClientRect(); const vh = window.innerHeight || document.documentElement.clientHeight; return r.top < vh * 0.95 && r.bottom > 0; };
    let io = null;
    try {
      io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); else hide(e.target); }); }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      items.forEach((el) => io.observe(el));
    } catch (err) { items.forEach(reveal); }
    setTimeout(() => { if (!io) return; items.forEach((el) => { if (inView(el) && getComputedStyle(el).opacity !== "1") reveal(el); }); }, 800);

    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const dur = 1500, start = performance.now();
      const step = (now) => { const p = Math.min((now - start) / dur, 1); const eased = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(target * eased).toLocaleString() + suffix; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } }); }, { threshold: 0.5 });
    root.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    root.querySelectorAll("img[data-logo]").forEach((img) => {
      const fb = () => { if (img.dataset.fellBack) return; img.dataset.fellBack = "1"; const sp = img.parentElement; sp.textContent = img.getAttribute("data-logo"); sp.style.fontWeight = "800"; sp.style.color = "var(--green-700)"; sp.style.fontSize = (sp.offsetWidth > 30 ? 13 : 11) + "px"; };
      if (img.complete) { if (img.naturalWidth === 0) fb(); } else { img.addEventListener("error", fb); }
    });

    const applyResponsive = () => {
      const w = root.clientWidth || window.innerWidth;
      const mobile = w < 920;
      const set = (sel, val) => root.querySelectorAll(sel).forEach((el) => { el.style.display = val; });
      set("[data-desktopnav]", mobile ? "none" : "flex");
      set("[data-desktopcta]", mobile ? "none" : "flex");
      set("[data-burger]", mobile ? "flex" : "none");
      const cols2 = w < 700;
      const grid = (sel, full, two, one) => root.querySelectorAll(sel).forEach((el) => { el.style.gridTemplateColumns = cols2 ? one : (mobile ? two : full); });
      grid("[data-herogrid]", "1.05fr 0.95fr", "1fr", "1fr");
      grid("[data-statgrid]", "repeat(4,1fr)", "repeat(2,1fr)", "repeat(2,1fr)");
      grid("[data-trackgrid]", "repeat(3,1fr)", "repeat(2,1fr)", "1fr");
      grid("[data-coursegrid]", "repeat(3,1fr)", "repeat(2,1fr)", "1fr");
      grid("[data-whygrid]", "repeat(4,1fr)", "repeat(2,1fr)", "repeat(2,1fr)");
      grid("[data-stepgrid]", "repeat(4,1fr)", "repeat(2,1fr)", "1fr");
      grid("[data-storygrid]", "repeat(3,1fr)", "1fr", "1fr");
      grid("[data-certgrid]", "0.85fr 1.15fr", "1fr", "1fr");
      grid("[data-footgrid]", "1.4fr 1fr 1fr 1fr", "repeat(2,1fr)", "1fr");
    };
    applyResponsive();
    const onResize = () => applyResponsive();
    window.addEventListener("resize", onResize);

    ["[data-trackgrid] > div","[data-coursegrid] > div","[data-whygrid] > div","[data-storygrid] > div","[data-stepgrid] > div"].forEach((sel) => root.querySelectorAll(sel).forEach((el) => {
      el.style.transition = "transform .42s cubic-bezier(.2,.8,.2,1), box-shadow .42s ease, border-color .3s ease, opacity .7s ease";
      el.addEventListener("mouseenter", () => { el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 28px 54px -24px rgba(18,60,40,.36)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "none"; el.style.boxShadow = ""; });
    }));

    root.querySelectorAll("a, button").forEach((el) => {
      const c = getComputedStyle(el);
      const grad = c.backgroundImage && c.backgroundImage.indexOf("gradient") !== -1;
      const solid = c.backgroundColor && c.backgroundColor !== "rgba(0, 0, 0, 0)" && c.backgroundColor !== "transparent";
      const r = parseFloat(c.borderTopLeftRadius) || 0;
      if ((grad || solid) && r >= 6 && !el.closest("[data-desktopnav]")) {
        el.style.transition = "transform .2s ease, box-shadow .25s ease, filter .2s ease";
        el.addEventListener("mouseenter", () => { el.style.transform = "translateY(-2px)"; el.style.filter = "brightness(1.06)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "none"; el.style.filter = ""; });
      }
    });

    root.querySelectorAll("[data-desktopnav] a").forEach((a) => {
      a.style.transition = "color .2s ease";
      a.addEventListener("mouseenter", () => { a.style.color = "var(--green-700)"; });
      a.addEventListener("mouseleave", () => { a.style.color = "var(--muted)"; });
    });

    root.querySelectorAll("[data-trackgrid] > div").forEach((card) => {
      const a = card.querySelector("a");
      const arrow = a ? a.querySelector("span:last-child") : null;
      if (arrow) arrow.style.transition = "transform .3s cubic-bezier(.2,.8,.2,1)";
      card.addEventListener("mouseenter", () => { if (arrow) arrow.style.transform = (langRef.current === "ur" ? "translateX(-6px)" : "translateX(6px)"); });
      card.addEventListener("mouseleave", () => { if (arrow) arrow.style.transform = "none"; });
    });

    const mq = root.querySelector("[data-marquee]");
    if (mq && mq.parentElement) {
      mq.parentElement.addEventListener("mouseenter", () => { mq.style.animationPlayState = "paused"; });
      mq.parentElement.addEventListener("mouseleave", () => { mq.style.animationPlayState = "running"; });
    }

    const heroImg = root.querySelector('img[src*="hero-student"]');
    if (heroImg && heroImg.parentElement) {
      const card = heroImg.parentElement;
      heroImg.style.transition = "transform .3s ease";
      card.addEventListener("mousemove", (ev) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        heroImg.style.transform = "perspective(900px) rotateY(" + (px * 6).toFixed(2) + "deg) rotateX(" + (-py * 5).toFixed(2) + "deg) scale(1.05)";
      });
      card.addEventListener("mouseleave", () => { heroImg.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)"; });
    }

    const header = root.querySelector("header");
    const navEl = header ? header.querySelector("nav") : null;
    if (header) header.style.transition = "box-shadow .3s ease";
    if (navEl) navEl.style.transition = "padding-top .3s ease, padding-bottom .3s ease";
    const bar = root.querySelector("[data-progress]");
    const para = root.querySelectorAll("[data-parallax]");
    const onScroll = () => {
      const se = document.scrollingElement || document.documentElement;
      const max = se.scrollHeight - se.clientHeight;
      const p = max > 0 ? (se.scrollTop / max) * 100 : 0;
      if (bar) bar.style.width = p + "%";
      para.forEach((el) => { const sp = parseFloat(el.getAttribute("data-parallax")) || 0; el.style.transform = "translateY(" + (se.scrollTop * sp).toFixed(1) + "px)"; });
      if (header) {
        if (se.scrollTop > 16) { header.style.boxShadow = "0 12px 34px -20px rgba(18,60,40,.45)"; if (navEl) { navEl.style.paddingTop = "9px"; navEl.style.paddingBottom = "9px"; } }
        else { header.style.boxShadow = "none"; if (navEl) { navEl.style.paddingTop = "13px"; navEl.style.paddingBottom = "13px"; } }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (langRef.current === "ur") applyLang("ur");

    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
<div data-mta ref={rootRef} style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", color: "var(--ink)", backgroundColor: "var(--paper)", backgroundImage: "radial-gradient(1100px 640px at 50% -280px, var(--green-50), transparent 62%), radial-gradient(760px 520px at 100% 6%, color-mix(in oklab, var(--green-500) 8%, transparent), transparent 58%), radial-gradient(680px 520px at 0% 30%, color-mix(in oklab, var(--green-500) 5%, transparent), transparent 60%)", minHeight: "100vh", OverflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>

  
  <header style={{ position: "sticky", top: "0", zIndex: "50", background: "color-mix(in oklab, var(--paper) 82%, transparent)", backdropFilter: "saturate(1.2) blur(12px)", borderBottom: "1px solid var(--line)" }}>
    <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "13px 22px", display: "flex", alignItems: "center", gap: "18px" }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: "11px", marginInlineEnd: "auto" }}>
        <span style={{ width: "38px", height: "38px", borderRadius: "11px 11px 11px 3px", background: "linear-gradient(160deg,var(--green-500),var(--green-700))", display: "grid", placeItems: "center", boxShadow: "0 6px 14px -6px var(--green-600)", flex: "none" }}>
          <span style={{ width: "16px", height: "16px", border: "2.4px solid #fff", borderRadius: "9px 9px 9px 0", borderBottomColor: "transparent", borderRightColor: "transparent", transform: "rotate(45deg)" }}></span>
        </span>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.05" }}>
          <span style={{ fontWeight: "800", fontSize: "16px", letterSpacing: "-.02em" }}>Madarsa Tech Academy</span>
          <span style={{ fontSize: "10.5px", fontWeight: "600", color: "var(--green-600)", letterSpacing: ".14em", textTransform: "uppercase" }}>Tech Mastery · Deeni Excellence</span>
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "26px" }} data-desktopnav>
        <a href="#courses" data-ur="کورسز" style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>Courses</a>
        <a href="#tracks" data-ur="ٹریکس" style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>Tracks</a>
        <a href="#how" data-ur="طریقہ کار" style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>How It Works</a>
        <a href="#stories" data-ur="کامیابی کی کہانیاں" style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>Success Stories</a>
        <a href="#contact" data-ur="رابطہ" style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>Contact</a>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }} data-desktopcta>
        <button onClick={toggleLang} data-langbtn title="Switch language" style={{ cursor: "pointer", fontFamily: "inherit", fontSize: "12.5px", fontWeight: "700", color: "var(--green-700)", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "9px", padding: "8px 11px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green-500)" }}></span>اردو
        </button>
        <a href="#contact" data-ur="سائن اِن" style={{ fontSize: "14px", fontWeight: "700", color: "var(--ink)", padding: "9px 14px", borderRadius: "10px", border: "1px solid var(--line)" }}>Sign In</a>
        <a href="#cta" data-ur="شروع کریں" style={{ fontSize: "14px", fontWeight: "700", color: "#fff", padding: "10px 16px", borderRadius: "10px", background: "linear-gradient(160deg,var(--green-500),var(--green-700))", boxShadow: "0 8px 18px -9px var(--green-600)" }}>Get Started</a>
      </div>

      <button onClick={toggleNav} data-burger aria-label="Menu" style={{ display: "none", cursor: "pointer", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "10px", width: "42px", height: "42px", flexDirection: "column", gap: "4px", alignItems: "center", justifyContent: "center" }}>
        <span style={{ width: "18px", height: "2px", background: "var(--green-700)", borderRadius: "2px" }}></span>
        <span style={{ width: "18px", height: "2px", background: "var(--green-700)", borderRadius: "2px" }}></span>
        <span style={{ width: "18px", height: "2px", background: "var(--green-700)", borderRadius: "2px" }}></span>
      </button>
    </nav>
    <div data-progress style={{ height: "3px", width: "0%", background: "linear-gradient(90deg,var(--green-500),var(--green-700))", boxShadow: "0 0 12px var(--green-500)", transition: "width .12s linear" }}></div>

    <div data-mobilemenu>
      <div style={{ borderTop: "1px solid var(--line)", background: "var(--paper)", padding: "10px 22px 18px", display: "flex", flexDirection: "column", gap: "2px" }}>
        <a onClick={closeNav} href="#courses" style={{ padding: "11px 6px", fontWeight: "600", borderBottom: "1px solid var(--line)" }}>Courses</a>
        <a onClick={closeNav} href="#tracks" style={{ padding: "11px 6px", fontWeight: "600", borderBottom: "1px solid var(--line)" }}>Tracks</a>
        <a onClick={closeNav} href="#how" style={{ padding: "11px 6px", fontWeight: "600", borderBottom: "1px solid var(--line)" }}>How It Works</a>
        <a onClick={closeNav} href="#stories" style={{ padding: "11px 6px", fontWeight: "600", borderBottom: "1px solid var(--line)" }}>Success Stories</a>
        <a onClick={closeNav} href="#contact" style={{ padding: "11px 6px", fontWeight: "600", borderBottom: "1px solid var(--line)" }}>Contact</a>
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <a onClick={closeNav} href="#contact" style={{ flex: "1", textAlign: "center", fontWeight: "700", padding: "11px", borderRadius: "10px", border: "1px solid var(--line)" }}>Sign In</a>
          <a onClick={closeNav} href="#cta" style={{ flex: "1", textAlign: "center", fontWeight: "700", color: "#fff", padding: "11px", borderRadius: "10px", background: "var(--green-600)" }}>Get Started</a>
        </div>
      </div>
    </div>
  </header>

  <a id="top"></a>

  
  <section style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "64px 22px 30px" }}>
    
    <div aria-hidden="true" style={{ position: "absolute", inset: "0", pointerEvents: "none", Overflow: "hidden", zIndex: "0" }}>
      <div data-parallax="-0.06" style={{ position: "absolute", top: "-40px", insetInlineEnd: "-60px", width: "420px", height: "520px", border: "1.5px solid var(--green-100)", borderRadius: "210px 210px 30px 30px", Opacity: ".55" }}></div>
      <div data-parallax="0.05" style={{ position: "absolute", top: "18px", insetInlineEnd: "2px", width: "300px", height: "380px", border: "1.5px solid var(--green-100)", borderRadius: "150px 150px 22px 22px", Opacity: ".4" }}></div>
      <div data-parallax="0.12" style={{ position: "absolute", top: "120px", insetInlineStart: "-70px", width: "160px", height: "200px", border: "1.5px solid var(--green-100)", borderRadius: "80px 80px 14px 14px", Opacity: ".32" }}></div>
      <div style={{ position: "absolute", inset: "0", background: "radial-gradient(900px 380px at 80% -5%, var(--green-50), transparent 70%)" }}></div>
    </div>

    <div style={{ position: "relative", zIndex: "1", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "54px", alignItems: "center" }} data-herogrid>
      
      <div data-reveal>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--green-50)", border: "1px solid var(--green-100)", color: "var(--green-700)", fontWeight: "700", fontSize: "12.5px", padding: "7px 13px", borderRadius: "999px", marginBottom: "22px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green-500)", animation: "mtaPulse 2s infinite" }}></span>
          <span data-ur="مدرسہ سے جدید ٹیک کیریئر تک">From the madrasa to a modern tech career</span>
        </div>
        <h1 data-ur="ٹیک مہارت۔ دینی فضیلت۔" style={{ fontFamily: "'Newsreader',Georgia,serif", fontWeight: "500", fontSize: "clamp(40px,5.4vw,62px)", lineHeight: "1.04", letterSpacing: "-.025em", margin: "0 0 18px" }}>
          Tech Mastery.<br /><span style={{ color: "var(--green-600)" }}>Deeni Excellence.</span>
        </h1>
        <p data-ur="اردو بولنے والے طلبہ کے لیے ماہرین کے تیار کردہ ٹیک کورسز — موبائل فرینڈلی، کم بینڈوتھ، دو لسانی، اور دوہرے کیریئر بنانے والے طلبہ کے لیے بنائے گئے۔" style={{ fontSize: "17.5px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "520px", margin: "0 0 28px" }}>
          Expert-led tech courses designed for Urdu-speaking learners — mobile-first, low bandwidth, bilingual, and built for students creating a dual career.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "26px" }}>
          <a href="#cta" data-ur="مفت سیکھنا شروع کریں" style={{ fontWeight: "700", fontSize: "15.5px", color: "#fff", padding: "14px 24px", borderRadius: "12px", background: "linear-gradient(160deg,var(--green-500),var(--green-700))", boxShadow: "0 12px 26px -12px var(--green-600)" }}>Start Learning Free</a>
          <a href="#tracks" data-ur="ٹریکس دیکھیں" style={{ fontWeight: "700", fontSize: "15.5px", color: "var(--green-700)", padding: "14px 24px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>Explore Tracks</a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
          <span data-ur="پہلا کورس مفت" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: "600", color: "var(--ink)", background: "#fff", border: "1px solid var(--line)", padding: "8px 12px", borderRadius: "999px", boxShadow: "var(--shadow-sm)" }}><span style={{ color: "var(--green-600)", fontWeight: "800" }}>✓</span>First course free</span>
          <span data-ur="اردو + انگلش" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: "600", color: "var(--ink)", background: "#fff", border: "1px solid var(--line)", padding: "8px 12px", borderRadius: "999px", boxShadow: "var(--shadow-sm)" }}><span style={{ color: "var(--green-600)", fontWeight: "800" }}>✓</span>Urdu + English</span>
          <span data-ur="موبائل فرینڈلی" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: "600", color: "var(--ink)", background: "#fff", border: "1px solid var(--line)", padding: "8px 12px", borderRadius: "999px", boxShadow: "var(--shadow-sm)" }}><span style={{ color: "var(--green-600)", fontWeight: "800" }}>✓</span>Mobile friendly</span>
          <span data-ur="سرٹیفکیٹ شامل" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: "600", color: "var(--ink)", background: "#fff", border: "1px solid var(--line)", padding: "8px 12px", borderRadius: "999px", boxShadow: "var(--shadow-sm)" }}><span style={{ color: "var(--green-600)", fontWeight: "800" }}>✓</span>Certificate included</span>
        </div>
      </div>

      
      <div data-reveal data-delay="120" style={{ position: "relative" }}>
        
        <div aria-hidden="true" style={{ position: "absolute", top: "-46px", insetInlineEnd: "-30px", width: "330px", height: "330px", borderRadius: "50%", background: "radial-gradient(circle at 32% 32%, color-mix(in oklab,var(--green-500) 60%, transparent), transparent 68%)", filter: "blur(36px)", Opacity: ".5", animation: "mtaAurora 15s ease-in-out infinite", zIndex: "0" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-30px", insetInlineStart: "-20px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, var(--gold), transparent 70%)", filter: "blur(40px)", Opacity: ".22", animation: "mtaAurora 19s ease-in-out infinite reverse", zIndex: "0" }}></div>

        
        <div style={{ position: "relative", zIndex: "1", borderRadius: "24px", Overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow)", background: "#fff", animation: "mtaFloat 8s ease-in-out infinite" }}>
          <img src="/hero-student-green.png" alt="Madrasa student learning tech on a laptop and mobile" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        
        <div style={{ position: "absolute", zIndex: "2", bottom: "-16px", insetInlineEnd: "-12px", background: "#fff", border: "1px solid var(--line)", borderRadius: "13px", boxShadow: "var(--shadow)", padding: "9px 13px", display: "flex", alignItems: "center", gap: "9px", animation: "mtaFloat2 6s ease-in-out infinite" }}>
          <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--gold)", display: "grid", placeItems: "center", color: "#fff", fontWeight: "800" }}>★</span>
          <div style={{ lineHeight: "1.1" }}><div data-ur="سرٹیفکیٹ تیار" style={{ fontWeight: "800", fontSize: "13px" }}>Certificate ready</div><div data-ur="شیئر ایبل · تصدیق شدہ" style={{ fontSize: "11px", color: "var(--muted)" }}>Shareable · verified</div></div>
        </div>
      </div>
    </div>
  </section>

  
  <section style={{ Overflow: "hidden", padding: "30px 0 8px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto 16px", padding: "0 22px", textAlign: "center" }}>
      <span data-ur="جو مہارتیں آپ سیکھیں گے" style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>Skills you'll master</span>
    </div>
    <div style={{ position: "relative", WebkitMask: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", mask: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
      <div data-marquee style={{ display: "flex", gap: "13px", width: "max-content", animation: "mtaMarquee 34s linear infinite", padding: "4px 6px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="React" src="https://cdn.simpleicons.org/react" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />React</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Next.js" src="https://cdn.simpleicons.org/nextdotjs" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Next.js</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="JavaScript" src="https://cdn.simpleicons.org/javascript" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />JavaScript</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Python" src="https://cdn.simpleicons.org/python" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Python</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Flutter" src="https://cdn.simpleicons.org/flutter" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Flutter</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="TensorFlow" src="https://cdn.simpleicons.org/tensorflow" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />TensorFlow</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="SQL" src="https://cdn.simpleicons.org/mysql" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />SQL</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Figma" src="https://cdn.simpleicons.org/figma" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Figma</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Node.js" src="https://cdn.simpleicons.org/nodedotjs" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Node.js</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Cloud" src="https://cdn.simpleicons.org/googlecloud" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Cloud</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="AI" src="https://cdn.simpleicons.org/openai" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />AI</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="GitHub" src="https://cdn.simpleicons.org/github" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />GitHub</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="React" src="https://cdn.simpleicons.org/react" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />React</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Next.js" src="https://cdn.simpleicons.org/nextdotjs" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Next.js</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="JavaScript" src="https://cdn.simpleicons.org/javascript" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />JavaScript</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Python" src="https://cdn.simpleicons.org/python" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Python</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Flutter" src="https://cdn.simpleicons.org/flutter" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Flutter</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="TensorFlow" src="https://cdn.simpleicons.org/tensorflow" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />TensorFlow</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="SQL" src="https://cdn.simpleicons.org/mysql" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />SQL</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Figma" src="https://cdn.simpleicons.org/figma" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Figma</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Node.js" src="https://cdn.simpleicons.org/nodedotjs" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Node.js</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="Cloud" src="https://cdn.simpleicons.org/googlecloud" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />Cloud</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="AI" src="https://cdn.simpleicons.org/openai" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />AI</span>
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid var(--line)", borderRadius: "999px", padding: "9px 17px", fontWeight: "700", fontSize: "14px", boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap" }}><img data-logo="GitHub" src="https://cdn.simpleicons.org/github" alt="" style={{ width: "18px", height: "18px", display: "block", flex: "none" }} />GitHub</span>
      </div>
    </div>
  </section>

  
  <section style={{ maxWidth: "1200px", margin: "18px auto 0", padding: "0 22px" }}>
    <div data-reveal style={{ backgroundColor: "var(--green-700)", backgroundImage: "repeating-linear-gradient(60deg, rgba(255,255,255,.06) 0 1px, transparent 1px 24px), repeating-linear-gradient(-60deg, rgba(255,255,255,.05) 0 1px, transparent 1px 24px), linear-gradient(135deg,var(--green-700),var(--green-600))", borderRadius: "22px", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", boxShadow: "0 26px 50px -28px var(--green-700)" }} data-statgrid>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div data-count="50" data-suffix="+" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(30px,3.5vw,42px)", fontWeight: "600" }}>50+</div>
        <div data-ur="کورسز" style={{ fontSize: "13px", Opacity: ".85", fontWeight: "600", marginTop: "2px" }}>Courses</div>
      </div>
      <div style={{ textAlign: "center", color: "#fff", borderInlineStart: "1px solid rgba(255,255,255,.18)" }}>
        <div data-count="10000" data-suffix="+" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(30px,3.5vw,42px)", fontWeight: "600" }}>10,000+</div>
        <div data-ur="سیکھنے والے" style={{ fontSize: "13px", Opacity: ".85", fontWeight: "600", marginTop: "2px" }}>Learners</div>
      </div>
      <div style={{ textAlign: "center", color: "#fff", borderInlineStart: "1px solid rgba(255,255,255,.18)" }}>
        <div data-count="300" data-suffix="+" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(30px,3.5vw,42px)", fontWeight: "600" }}>300+</div>
        <div data-ur="پروجیکٹس بنائے گئے" style={{ fontSize: "13px", Opacity: ".85", fontWeight: "600", marginTop: "2px" }}>Projects built</div>
      </div>
      <div style={{ textAlign: "center", color: "#fff", borderInlineStart: "1px solid rgba(255,255,255,.18)" }}>
        <div data-count="95" data-suffix="%" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(30px,3.5vw,42px)", fontWeight: "600" }}>95%</div>
        <div data-ur="مکمل کرنے کی شرح" style={{ fontSize: "13px", Opacity: ".85", fontWeight: "600", marginTop: "2px" }}>Completion rate</div>
      </div>
    </div>
  </section>

  
  <section id="tracks" style={{ maxWidth: "1200px", margin: "0 auto", padding: "74px 22px 20px" }}>
    <div data-reveal style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 38px" }}>
      <div data-ur="سیکھنے کے ٹریکس" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>Learning Tracks</div>
      <h2 data-ur="ایک واضح راستہ — بنیادی باتوں سے کیریئر تک" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0 0 12px" }}>A clear path — from the basics to a career</h2>
      <p data-ur="ایک ٹریک منتخب کریں اور قدم بہ قدم آگے بڑھیں۔" style={{ color: "var(--muted)", fontSize: "16px", margin: "0" }}>Pick a track and progress step by step, at your own pace.</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} data-trackgrid>
      
      <div data-reveal style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "22px", boxShadow: "var(--shadow-sm)", Overflow: "hidden" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "13px 13px 13px 4px", background: "var(--green-50)", border: "1px solid var(--green-100)", display: "grid", placeItems: "center", color: "var(--green-700)", fontWeight: "800", marginBottom: "14px" }}>01</div>
        <h3 data-ur="بنیادی ٹریک" style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 6px" }}>Foundation Track</h3>
        <p data-ur="کمپیوٹر کی بنیادی باتیں، ٹائپنگ، انٹرنیٹ اور پروڈکٹیویٹی۔" style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.5", margin: "0 0 14px" }}>Computer basics, typing, internet & productivity.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Computer basics</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Typing</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Internet</span>
        </div>
        <a href="#courses" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "700", fontSize: "13.5px", color: "var(--green-700)", borderTop: "1px solid var(--line)", paddingTop: "13px" }}><span data-ur="6 کورسز">6 courses</span><span style={{ fontSize: "16px" }}>→</span></a>
      </div>
      
      <div data-reveal data-delay="80" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "22px", boxShadow: "var(--shadow-sm)", Overflow: "hidden" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "13px 13px 13px 4px", background: "var(--green-50)", border: "1px solid var(--green-100)", display: "grid", placeItems: "center", color: "var(--green-700)", fontWeight: "800", marginBottom: "14px" }}>02</div>
        <h3 data-ur="ویب ڈویلپمنٹ ٹریک" style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 6px" }}>Web Development Track</h3>
        <p data-ur="HTML، CSS، JavaScript، React اور Next.js۔" style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.5", margin: "0 0 14px" }}>HTML, CSS, JavaScript, React & Next.js.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>HTML / CSS</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>JavaScript</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>React</span>
        </div>
        <a href="#courses" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "700", fontSize: "13.5px", color: "var(--green-700)", borderTop: "1px solid var(--line)", paddingTop: "13px" }}><span data-ur="12 کورسز">12 courses</span><span style={{ fontSize: "16px" }}>→</span></a>
      </div>
      
      <div data-reveal data-delay="160" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "22px", boxShadow: "var(--shadow-sm)", Overflow: "hidden" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "13px 13px 13px 4px", background: "var(--green-50)", border: "1px solid var(--green-100)", display: "grid", placeItems: "center", color: "var(--green-700)", fontWeight: "800", marginBottom: "14px" }}>03</div>
        <h3 data-ur="ڈیٹا ٹریک" style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 6px" }}>Data Track</h3>
        <p data-ur="Excel، SQL، Power BI اور تجزیہ کاری۔" style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.5", margin: "0 0 14px" }}>Excel, SQL, Power BI & analytics.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Excel</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>SQL</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Power BI</span>
        </div>
        <a href="#courses" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "700", fontSize: "13.5px", color: "var(--green-700)", borderTop: "1px solid var(--line)", paddingTop: "13px" }}><span data-ur="9 کورسز">9 courses</span><span style={{ fontSize: "16px" }}>→</span></a>
      </div>
      
      <div data-reveal data-delay="80" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "22px", boxShadow: "var(--shadow-sm)", Overflow: "hidden" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "13px 13px 13px 4px", background: "var(--green-50)", border: "1px solid var(--green-100)", display: "grid", placeItems: "center", color: "var(--green-700)", fontWeight: "800", marginBottom: "14px" }}>04</div>
        <h3 data-ur="اے آئی ٹریک" style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 6px" }}>AI Track</h3>
        <p data-ur="اے آئی ٹولز، پرامپٹ انجینئرنگ اور آٹومیشن۔" style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.5", margin: "0 0 14px" }}>AI tools, prompt engineering & automation.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>AI tools</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Prompting</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--green-700)", background: "var(--green-50)", padding: "4px 9px", borderRadius: "99px" }}>Automation</span>
        </div>
        <a href="#courses" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "700", fontSize: "13.5px", color: "var(--green-700)", borderTop: "1px solid var(--line)", paddingTop: "13px" }}><span data-ur="7 کورسز">7 courses</span><span style={{ fontSize: "16px" }}>→</span></a>
      </div>
      
      <div data-reveal data-delay="160" style={{ position: "relative", background: "linear-gradient(160deg,var(--green-700),var(--green-600))", color: "#fff", borderRadius: "18px", padding: "22px", boxShadow: "var(--shadow)", Overflow: "hidden" }}>
        <div style={{ width: "46px", height: "46px", borderRadius: "13px 13px 13px 4px", background: "rgba(255,255,255,.16)", display: "grid", placeItems: "center", color: "#fff", fontWeight: "800", marginBottom: "14px" }}>05</div>
        <h3 data-ur="کیریئر ٹریک" style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 6px" }}>Career Track</h3>
        <p data-ur="ریزیومے، GitHub، LinkedIn اور انٹرویو کی تیاری۔" style={{ fontSize: "13.5px", color: "rgba(255,255,255,.85)", lineHeight: "1.5", margin: "0 0 14px" }}>Resume, GitHub, LinkedIn & interview prep.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#fff", background: "rgba(255,255,255,.16)", padding: "4px 9px", borderRadius: "99px" }}>Resume</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#fff", background: "rgba(255,255,255,.16)", padding: "4px 9px", borderRadius: "99px" }}>GitHub</span>
          <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#fff", background: "rgba(255,255,255,.16)", padding: "4px 9px", borderRadius: "99px" }}>Interview</span>
        </div>
        <a href="#courses" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "700", fontSize: "13.5px", color: "#fff", borderTop: "1px solid rgba(255,255,255,.22)", paddingTop: "13px" }}><span data-ur="5 کورسز">5 courses</span><span style={{ fontSize: "16px" }}>→</span></a>
      </div>
      
      <div data-reveal data-delay="240" style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--green-50)", border: "1px dashed var(--green-100)", borderRadius: "18px", padding: "22px" }}>
        <h3 data-ur="یقین نہیں کہاں سے شروع کریں؟" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "21px", margin: "0 0 8px", lineHeight: "1.15" }}>Not sure where to start?</h3>
        <p data-ur="2 منٹ کا کوئز لیں اور ہم آپ کے لیے ٹریک تجویز کریں گے۔" style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0 0 16px", lineHeight: "1.5" }}>Take a 2-minute quiz and we'll recommend a track for you.</p>
        <a href="#cta" data-ur="میرا ٹریک تلاش کریں" style={{ alignSelf: "flex-start", fontWeight: "700", fontSize: "13.5px", color: "#fff", background: "var(--green-600)", padding: "11px 18px", borderRadius: "11px" }}>Find my track</a>
      </div>
    </div>
  </section>

  
  <section id="courses" style={{ backgroundColor: "var(--paper-2)", borderBlock: "1px solid var(--line)", marginTop: "64px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "66px 22px" }}>
      <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "18px", marginBottom: "34px", flexWrap: "wrap" }}>
        <div>
          <div data-ur="نمایاں کورسز" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>Featured Courses</div>
          <h2 data-ur="آج ہی سیکھنا شروع کریں" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0" }}>Start learning today</h2>
        </div>
        <a href="#tracks" data-ur="تمام کورسز دیکھیں →" style={{ fontWeight: "700", fontSize: "14px", color: "var(--green-700)" }}>View all courses →</a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} data-coursegrid>
        
        <div data-reveal style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="R" src="https://cdn.simpleicons.org/react" alt="React" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--green-700)", background: "var(--green-50)", padding: "5px 10px", borderRadius: "99px" }}>Free</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>React &amp; Next.js</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="انٹرمیڈیٹ">Intermediate</span> · 8h · 42 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.9</span>
              <a href="#cta" data-ur="کورس دیکھیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>View Course</a>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="60" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="Py" src="https://cdn.simpleicons.org/python" alt="Python" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--ink)", background: "var(--line)", padding: "5px 10px", borderRadius: "99px" }}>₹999</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>Python for Data Science</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="ابتدائی">Beginner</span> · 10h · 56 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.8</span>
              <a href="#cta" data-ur="ابھی داخلہ لیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>Enroll Now</a>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="120" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="Fi" src="https://cdn.simpleicons.org/figma" alt="Figma" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--green-700)", background: "var(--green-50)", padding: "5px 10px", borderRadius: "99px" }}>Free</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>UI/UX with Figma</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="ابتدائی">Beginner</span> · 6h · 38 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.9</span>
              <a href="#cta" data-ur="کورس دیکھیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>View Course</a>
            </div>
          </div>
        </div>

        <div data-reveal style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="Nd" src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--ink)", background: "var(--line)", padding: "5px 10px", borderRadius: "99px" }}>₹1,299</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>Node.js Backend</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="انٹرمیڈیٹ">Intermediate</span> · 9h · 47 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.7</span>
              <a href="#cta" data-ur="ابھی داخلہ لیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>Enroll Now</a>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="60" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="AI" src="https://cdn.simpleicons.org/openai" alt="OpenAI" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--green-700)", background: "var(--green-50)", padding: "5px 10px", borderRadius: "99px" }}>Free</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>AI Productivity</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="ابتدائی">Beginner</span> · 4h · 26 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.9</span>
              <a href="#cta" data-ur="کورس دیکھیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>View Course</a>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="120" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", Overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", Overflow: "hidden" }}><img data-logo="AWS" src="https://cdn.simpleicons.org/amazonwebservices" alt="AWS" style={{ width: "25px", height: "25px", display: "block" }} /></span>
            <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--ink)", background: "var(--line)", padding: "5px 10px", borderRadius: "99px" }}>₹1,499</span>
          </div>
          <div style={{ padding: "14px 18px 16px", flex: "1", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>AWS Cloud Basics</h3>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: "12px" }}><span data-ur="انٹرمیڈیٹ">Intermediate</span> · 7h · 33 lessons</div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700" }}><span style={{ color: "var(--gold)" }}>★</span> 4.7</span>
              <a href="#cta" data-ur="ابھی داخلہ لیں" style={{ fontSize: "13px", fontWeight: "700", color: "#fff", background: "var(--green-600)", padding: "8px 14px", borderRadius: "9px" }}>Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "74px 22px 20px" }}>
    <div data-reveal style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 38px" }}>
      <div data-ur="یہ پلیٹ فارم کیوں" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>Why This Platform</div>
      <h2 data-ur="مدرسہ کے طلبہ کے لیے بنایا گیا" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0" }}>Built for madrasa learners</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }} data-whygrid>
      <div data-reveal style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>ع</div>
        <h3 data-ur="اردو + انگلش تدریس" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Urdu + English teaching</h3>
        <p data-ur="ہر سبق دو زبانوں میں سمجھایا جاتا ہے۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Every lesson explained bilingually.</p>
      </div>
      <div data-reveal data-delay="60" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>▤</div>
        <h3 data-ur="کم بینڈوتھ ویڈیو" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Low-bandwidth video</h3>
        <p data-ur="سست انٹرنیٹ پر بھی آسانی سے چلے۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Smooth even on slow connections.</p>
      </div>
      <div data-reveal data-delay="120" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>▢</div>
        <h3 data-ur="موبائل فرسٹ سیکھنا" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Mobile-first learning</h3>
        <p data-ur="مکمل کورس صرف فون پر مکمل کریں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Complete a course on your phone.</p>
      </div>
      <div data-reveal data-delay="180" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>◷</div>
        <h3 data-ur="پروجیکٹ پر مبنی" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Project-based courses</h3>
        <p data-ur="کرکے سیکھیں، حقیقی پروجیکٹ بنائیں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Learn by building real projects.</p>
      </div>
      <div data-reveal style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>◐</div>
        <h3 data-ur="کیریئر مینٹرشپ" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Career mentorship</h3>
        <p data-ur="راہنمائی برائے نوکری کی تیاری۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Guidance to get job-ready.</p>
      </div>
      <div data-reveal data-delay="60" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>✦</div>
        <h3 data-ur="قابلِ تصدیق سرٹیفکیٹ" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Verifiable certificates</h3>
        <p data-ur="منفرد آئی ڈی کے ساتھ شیئر کریں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Share with a unique verify ID.</p>
      </div>
      <div data-reveal data-delay="120" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "20px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--green-50)", color: "var(--green-700)", display: "grid", placeItems: "center", fontWeight: "800", marginBottom: "12px" }}>♥</div>
        <h3 data-ur="مدرسہ طلبہ کے لیے وظائف" style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 5px" }}>Scholarships</h3>
        <p data-ur="مدرسہ طلبہ کے لیے خصوصی معاونت۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Special support for madrasa students.</p>
      </div>
      <div data-reveal data-delay="180" style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--green-600)", color: "#fff", borderRadius: "16px", padding: "20px" }}>
        <div data-ur="پہلا کورس مفت" style={{ fontFamily: "'Newsreader',serif", fontSize: "20px", lineHeight: "1.15", marginBottom: "6px" }}>First course free</div>
        <p data-ur="بغیر کارڈ کے، آج ہی شروع کریں۔" style={{ fontSize: "13px", color: "rgba(255,255,255,.85)", margin: "0", lineHeight: "1.5" }}>No card needed. Start today.</p>
      </div>
    </div>
  </section>

  
  <section id="how" style={{ maxWidth: "1200px", margin: "0 auto", padding: "74px 22px 20px" }}>
    <div data-reveal style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 38px" }}>
      <div data-ur="طریقہ کار" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>How It Works</div>
      <h2 data-ur="چار آسان مراحل" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0" }}>Four simple steps</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }} data-stepgrid>
      <div data-reveal style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontFamily: "'Newsreader',serif", fontSize: "34px", color: "var(--green-100)", fontWeight: "600", lineHeight: "1", marginBottom: "10px" }}>1</div>
        <h3 data-ur="مفت اکاؤنٹ بنائیں" style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px" }}>Create free account</h3>
        <p data-ur="چند سیکنڈ میں سائن اپ کریں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Sign up in seconds, no card.</p>
      </div>
      <div data-reveal data-delay="80" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontFamily: "'Newsreader',serif", fontSize: "34px", color: "var(--green-100)", fontWeight: "600", lineHeight: "1", marginBottom: "10px" }}>2</div>
        <h3 data-ur="اپنا ٹریک منتخب کریں" style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px" }}>Choose your track</h3>
        <p data-ur="اپنے ہدف کے مطابق راستہ چنیں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Pick a path that fits your goal.</p>
      </div>
      <div data-reveal data-delay="160" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontFamily: "'Newsreader',serif", fontSize: "34px", color: "var(--green-100)", fontWeight: "600", lineHeight: "1", marginBottom: "10px" }}>3</div>
        <h3 data-ur="مختصر اسباق سے سیکھیں" style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px" }}>Learn &amp; build</h3>
        <p data-ur="مختصر اسباق اور پروجیکٹس کے ذریعے۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Short lessons and real projects.</p>
      </div>
      <div data-reveal data-delay="240" style={{ position: "relative", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontFamily: "'Newsreader',serif", fontSize: "34px", color: "var(--green-100)", fontWeight: "600", lineHeight: "1", marginBottom: "10px" }}>4</div>
        <h3 data-ur="سرٹیفکیٹ حاصل کریں" style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px" }}>Earn &amp; apply</h3>
        <p data-ur="سرٹیفکیٹ پائیں اور نوکری کی تیاری کریں۔" style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>Get certified and prep for jobs.</p>
      </div>
    </div>
  </section>

  
  <section id="stories" style={{ backgroundColor: "var(--paper-2)", borderBlock: "1px solid var(--line)", marginTop: "64px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "66px 22px" }}>
      <div data-reveal style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 38px" }}>
        <div data-ur="کامیابی کی کہانیاں" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>Success Stories</div>
        <h2 data-ur="بھارت بھر کے طلبہ، حقیقی نتائج" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0" }}>Students across India, real results</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} data-storygrid>
        <div data-reveal style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "var(--gold)", fontSize: "14px", marginBottom: "12px" }}>★★★★★</div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.6", margin: "0 0 18px", flex: "1" }}>"I came from a madrasa background with almost no English. The Urdu lessons made React finally make sense — I now work as a frontend developer."</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
            <span style={{ width: "46px", height: "46px", borderRadius: "50%", flex: "none", background: "var(--green-100)", color: "var(--green-800)", fontWeight: "800", display: "grid", placeItems: "center" }}>BA</span>
            <div><div style={{ fontWeight: "800", fontSize: "13.5px" }}>Bilal Ahmed</div><div style={{ fontSize: "12px", color: "var(--muted)" }}>Frontend Developer · Mumbai</div></div>
          </div>
        </div>
        <div data-reveal data-delay="80" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "var(--gold)", fontSize: "14px", marginBottom: "12px" }}>★★★★★</div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.6", margin: "0 0 18px", flex: "1" }}>"Everything worked on my phone with weak internet. I finished the Data Track and landed my first analyst role within months."</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
            <span style={{ width: "46px", height: "46px", borderRadius: "50%", flex: "none", background: "var(--green-100)", color: "var(--green-800)", fontWeight: "800", display: "grid", placeItems: "center" }}>HN</span>
            <div><div style={{ fontWeight: "800", fontSize: "13.5px" }}>Hafsa Noor</div><div style={{ fontSize: "12px", color: "var(--muted)" }}>Data Analyst · Hyderabad</div></div>
          </div>
        </div>
        <div data-reveal data-delay="160" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "24px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "var(--gold)", fontSize: "14px", marginBottom: "12px" }}>★★★★★</div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.6", margin: "0 0 18px", flex: "1" }}>"I started from the Foundation Track not knowing how to type. The mentorship and certificate gave me the confidence to apply for jobs."</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
            <span style={{ width: "46px", height: "46px", borderRadius: "50%", flex: "none", background: "var(--green-100)", color: "var(--green-800)", fontWeight: "800", display: "grid", placeItems: "center" }}>UT</span>
            <div><div style={{ fontWeight: "800", fontSize: "13.5px" }}>Usman Tariq</div><div style={{ fontSize: "12px", color: "var(--muted)" }}>Junior Developer · Lucknow</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "74px 22px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "48px", alignItems: "center" }} data-certgrid>
      <div data-reveal>
        <div data-ur="سرٹیفکیشن" style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green-600)", marginBottom: "10px" }}>Certification</div>
        <h2 data-ur="ایک سرٹیفکیٹ جو معنی رکھتا ہے" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(28px,3.6vw,40px)", lineHeight: "1.1", letterSpacing: "-.02em", margin: "0 0 16px" }}>A certificate that carries weight</h2>
        <p data-ur="ہر سرٹیفکیٹ کی منفرد آئی ڈی اور شیئر ایبل لنک ہوتا ہے — ریزیومے اور LinkedIn کے لیے تیار۔" style={{ fontSize: "15.5px", color: "var(--muted)", lineHeight: "1.6", margin: "0 0 22px" }}>Each certificate has a unique ID and a shareable link — ready for your resume and LinkedIn profile.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}><span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "var(--green-50)", color: "var(--green-700)", fontWeight: "800", display: "grid", placeItems: "center", fontSize: "13px" }}>✓</span><span data-ur="منفرد قابلِ تصدیق آئی ڈی" style={{ fontSize: "14.5px", fontWeight: "600" }}>Unique verifiable ID</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}><span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "var(--green-50)", color: "var(--green-700)", fontWeight: "800", display: "grid", placeItems: "center", fontSize: "13px" }}>✓</span><span data-ur="ایک کلک سے شیئر ایبل لنک" style={{ fontSize: "14.5px", fontWeight: "600" }}>One-click shareable link</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}><span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "var(--green-50)", color: "var(--green-700)", fontWeight: "800", display: "grid", placeItems: "center", fontSize: "13px" }}>✓</span><span data-ur="LinkedIn اور ریزیومے کے لیے تیار" style={{ fontSize: "14.5px", fontWeight: "600" }}>LinkedIn &amp; resume ready</span></div>
        </div>
      </div>
      
      <div data-reveal data-delay="120" style={{ position: "relative" }}>
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "20px", boxShadow: "var(--shadow)", padding: "30px", position: "relative", Overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "repeating-linear-gradient(45deg, var(--green-50) 0 2px, transparent 2px 18px)", Opacity: ".5" }}></div>
          <div style={{ position: "relative", border: "1.5px solid var(--green-100)", borderRadius: "14px", padding: "26px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "9px 9px 9px 2px", background: "linear-gradient(160deg,var(--green-500),var(--green-700))", display: "grid", placeItems: "center" }}><span style={{ width: "12px", height: "12px", border: "2px solid #fff", borderRadius: "7px 7px 7px 0", borderBottomColor: "transparent", borderRightColor: "transparent", transform: "rotate(45deg)" }}></span></span>
              <span style={{ fontWeight: "800", fontSize: "13px", letterSpacing: ".02em" }}>Madarsa Tech Academy</span>
            </div>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Certificate of Completion</div>
            <div style={{ fontFamily: "'Newsreader',serif", fontSize: "26px", marginBottom: "4px" }}>Ahmad Raza</div>
            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "18px" }}>has successfully completed</div>
            <div style={{ fontWeight: "800", fontSize: "16px", color: "var(--green-700)", marginBottom: "20px" }}>React &amp; Next.js Development</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
              <div style={{ textAlign: "start" }}>
                <div style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Certificate ID</div>
                <div style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "12px", fontWeight: "700" }}>MTA-2026-7F3A9</div>
              </div>
              <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--gold)", color: "#fff", display: "grid", placeItems: "center", fontWeight: "800", fontSize: "18px", boxShadow: "0 6px 14px -6px var(--gold)" }}>★</span>
            </div>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", background: "var(--green-50)", border: "1px solid var(--green-100)", borderRadius: "10px", padding: "9px 12px" }}>
            <span style={{ color: "var(--green-700)", fontWeight: "800" }}>🔗</span>
            <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "11.5px", color: "var(--green-700)", Overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>verify.madarsatech.com/MTA-2026-7F3A9</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section id="cta" style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px 22px 74px" }}>
    <div data-reveal style={{ position: "relative", Overflow: "hidden", backgroundColor: "var(--green-700)", backgroundImage: "repeating-linear-gradient(60deg, rgba(255,255,255,.05) 0 1px, transparent 1px 26px), repeating-linear-gradient(-60deg, rgba(255,255,255,.045) 0 1px, transparent 1px 26px), linear-gradient(135deg,var(--green-700),var(--green-600))", borderRadius: "26px", padding: "60px 28px", textAlign: "center", color: "#fff", boxShadow: "0 30px 60px -30px var(--green-700)" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-60px", insetInlineStart: "50%", transform: "translateX(-50%)", width: "360px", height: "440px", border: "1.5px solid rgba(255,255,255,.16)", borderRadius: "180px 180px 24px 24px" }}></div>
      <div aria-hidden="true" style={{ position: "absolute", top: "0", bottom: "0", width: "38%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)", animation: "mtaShine 6.5s ease-in-out infinite", pointerEvents: "none", zIndex: "0" }}></div>
      <div style={{ position: "relative" }}>
        <h2 data-ur="آج ہی اپنا ٹیک سفر شروع کریں" style={{ fontFamily: "'Newsreader',serif", fontWeight: "500", fontSize: "clamp(30px,4.2vw,48px)", lineHeight: "1.08", letterSpacing: "-.02em", margin: "0 0 14px" }}>Start your tech journey today</h2>
        <p data-ur="آپ کا پہلا کورس مفت ہے۔ اردو اور انگلش میں سیکھیں، حقیقی پروجیکٹ بنائیں، اور جدید کیریئر کی تیاری کریں۔" style={{ fontSize: "17px", lineHeight: "1.6", color: "rgba(255,255,255,.9)", maxWidth: "560px", margin: "0 auto 28px" }}>Your first course is free. Learn in Urdu and English, build real projects, and prepare for a modern career.</p>
        <a href="#top" data-ur="مفت اکاؤنٹ بنائیں" style={{ display: "inline-block", fontWeight: "800", fontSize: "16px", color: "var(--green-700)", background: "#fff", padding: "16px 32px", borderRadius: "13px", boxShadow: "0 12px 26px -10px rgba(0,0,0,.3)" }}>Create Free Account</a>
      </div>
    </div>
  </section>

  
  <footer id="contact" style={{ background: "var(--green-800)", color: "rgba(255,255,255,.8)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "52px 22px 26px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "30px" }} data-footgrid>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "10px 10px 10px 3px", background: "linear-gradient(160deg,var(--green-500),var(--green-700))", display: "grid", placeItems: "center" }}><span style={{ width: "14px", height: "14px", border: "2px solid #fff", borderRadius: "8px 8px 8px 0", borderBottomColor: "transparent", borderRightColor: "transparent", transform: "rotate(45deg)" }}></span></span>
            <span style={{ fontWeight: "800", fontSize: "15px", color: "#fff" }}>Madarsa Tech Academy</span>
          </div>
          <p data-ur="روایتی اسلامی تعلیم اور جدید ڈیجیٹل کیریئر کے درمیان ایک پل۔" style={{ fontSize: "13.5px", lineHeight: "1.6", maxWidth: "280px", margin: "0" }}>Bridging traditional Islamic education and modern digital careers.</p>
        </div>
        <div>
          <div data-ur="پلیٹ فارم" style={{ fontWeight: "700", color: "#fff", fontSize: "13px", marginBottom: "12px" }}>Platform</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
            <a href="#courses" data-ur="کورسز">Courses</a><a href="#tracks" data-ur="ٹریکس">Tracks</a><a href="#how" data-ur="طریقہ کار">How It Works</a>
          </div>
        </div>
        <div>
          <div data-ur="کمپنی" style={{ fontWeight: "700", color: "#fff", fontSize: "13px", marginBottom: "12px" }}>Company</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
            <a href="#stories" data-ur="کامیابی کی کہانیاں">Success Stories</a><a href="#cta" data-ur="وظائف">Scholarships</a><a href="#contact" data-ur="رابطہ">Contact</a>
          </div>
        </div>
        <div>
          <div data-ur="رابطہ کریں" style={{ fontWeight: "700", color: "#fff", fontSize: "13px", marginBottom: "12px" }}>Get in touch</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
            <span>hello@madarsatech.com</span><span>Lucknow, India</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.14)", marginTop: "36px", paddingTop: "18px", display: "flex", justifyContent: "space-between", gap: "14px", flexWrap: "wrap", fontSize: "12.5px" }}>
        <span>© 2026 Madarsa Tech Academy. All rights reserved.</span>
        <span data-ur="بھارت میں محبت سے بنایا گیا">Made with care in India.</span>
      </div>
    </div>
  </footer>

</div>
  );
}
