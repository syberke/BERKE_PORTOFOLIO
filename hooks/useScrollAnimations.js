"use client";
import { useEffect } from "react";

export function useScrollAnimations(setActive) {
  useEffect(() => {
    const { gsap } = require("gsap");
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const words = (sel) => gsap.utils.toArray(`${sel} .word`);

    /* ─────────────────────────────────────────────
       INITIAL STATES — set everything before paint
    ───────────────────────────────────────────── */
    const nonHeroScenes = [
      "#scene-about", "#scene-proj-1", "#scene-proj-2",
      "#scene-proj-3", "#scene-skills", "#scene-contact",
    ];

    // Each scene starts clipped fully below
    gsap.set(nonHeroScenes, {
      clipPath: "inset(100% 0% 0% 0%)",
      y: 0,
    });

    // All word elements start hidden
    const allWords = gsap.utils.toArray(
      "#scene-about .word, #scene-proj-1 .word, #scene-proj-2 .word, " +
      "#scene-proj-3 .word, #scene-skills .word, #scene-contact .word"
    );
    gsap.set(allWords, { y: "110%" });
    gsap.set(gsap.utils.toArray(".eyebrow"), { opacity: 0, y: 10 });

    // Hero halves start offset
    gsap.set("#scene-hero .hero-left", { x: -60, opacity: 0 });
    gsap.set("#scene-hero .hero-right", { x: 60, opacity: 0 });

    // Hero elements
    gsap.set([
      "#scene-hero .word", "#hero-sub", "#hero-ghost",
      "#hero-status", "#hero-cta", "#hero-scroll", "#hero-eyebrow",
    ], { opacity: 0 });
    gsap.set("#scene-hero .word", { y: "110%", opacity: 1 });

    /* ─────────────────────────────────────────────
       PROGRESS BAR
    ───────────────────────────────────────────── */
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const bar = document.getElementById("scroll-progress-bar");
        if (bar) bar.style.width = self.progress * 100 + "%";
      },
    });

    /* ─────────────────────────────────────────────
       SCENE TRACKER (pips + label)
    ───────────────────────────────────────────── */
    const SCENE_IDS = [
      "scene-hero", "scene-about", "scene-proj-1",
      "scene-proj-2", "scene-proj-3", "scene-skills", "scene-contact",
    ];
    SCENE_IDS.forEach((id, i) => {
      ScrollTrigger.create({
        trigger: "#" + id,
        start: "top center",
        end: "bottom center",
        onEnter:     () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    /* ═══════════════════════════════════════════════
       SLIDE TRANSITIONS — clip-path wipe upward
       Each scene unclips as it enters the viewport.
       Previous scene fades out simultaneously.
    ═══════════════════════════════════════════════ */
    nonHeroScenes.forEach((sel, i) => {
      const prevSel = i === 0 ? "#scene-hero" : nonHeroScenes[i - 1];

      // Incoming scene: clip opens from bottom to top
      gsap.to(sel, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: sel,
          start: "top 90%",
          end: "top 10%",
          scrub: 1,
        },
      });

      // Outgoing (previous) scene: fades and slides up slightly
      gsap.to(prevSel, {
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sel,
          start: "top 60%",
          end: "top -10%",
          scrub: 0.8,
        },
      });
    });

    /* ═══════════════════════════════════════════════
       HERO — cinematic split entrance
    ═══════════════════════════════════════════════ */
    const heroTL = gsap.timeline({ delay: 0.3 });
    heroTL
      .to("#scene-hero .hero-left",  { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" })
      .to("#scene-hero .hero-right", { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "<0.1")
      .to("#scene-hero .word",       { y: "0%", opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out" }, "<0.2")
      .to("#hero-eyebrow",           { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .to("#hero-sub",               { opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6")
      .to("#hero-ghost",             { opacity: 1, duration: 1.4, ease: "power3.out" }, "-=0.9")
      .to("#hero-status",            { opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.7")
      .to("#hero-cta",               { opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to("#hero-scroll",            { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

    // Hero rule wipe
    gsap.set("#hero-rule", { scaleX: 0, transformOrigin: "left" });
    gsap.to("#hero-rule", {
      scaleX: 1, duration: 1.5, ease: "power3.inOut", delay: 1.2,
    });

    // Hero scroll-out parallax
    gsap.to("#scene-hero .hero-title", {
      y: -80, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to("#hero-sub, #hero-status, #hero-cta", {
      y: -40, opacity: 0, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to("#hero-ghost", {
      y: -100, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1.4 },
    });

    /* ═══════════════════════════════════════════════
       CONTENT ANIMATIONS — fire after scene unclips
    ═══════════════════════════════════════════════ */

    // ABOUT
    gsap.timeline({
      scrollTrigger: {
        trigger: "#scene-about",
        start: "top 55%",
        toggleActions: "play none none none",
      },
    })
    .to(words("#scene-about"),          { y: "0%", duration: 1.1, stagger: 0.1, ease: "power4.out" })
    .to(".about-eyebrow",               { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
    .from("#scene-about .about-text",   { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
    .from(".info-row",                  { y: 16, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.4");

    // PROJECTS
    ["scene-proj-1", "scene-proj-2", "scene-proj-3"].forEach((id) => {
      const sel = "#" + id;

      // Emoji + circles parallax
      gsap.to(`${sel} .proj-emoji`, {
        y: -50, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: sel, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.utils.toArray(`${sel} .proj-circle`).forEach((c, ci) => {
        gsap.to(c, {
          y: -30 * (ci + 1), x: 10 * (ci % 2 === 0 ? 1 : -1), ease: "none",
          scrollTrigger: { trigger: sel, start: "top bottom", end: "bottom top", scrub: 1 + ci * 0.3 },
        });
      });

      // Content stagger
      gsap.timeline({
        scrollTrigger: { trigger: sel, start: "top 55%", toggleActions: "play none none none" },
      })
      .from(`${sel} .proj-accent-bar`, { scaleY: 0, duration: 0.9, ease: "power3.inOut", transformOrigin: "top" })
      .from(`${sel} .proj-num`,        { opacity: 0, x: -18, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-cat`,        { opacity: 0, x: -12, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to(words(sel),                  { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.3")
      .from(`${sel} .proj-org`,        { opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.5")
      .from(`${sel} .proj-desc`,       { opacity: 0, y: 18, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-tech`,       { opacity: 0, y: 8, stagger: 0.05, duration: 0.4, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-link`,       { opacity: 0, x: -12, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .from(`${sel} .proj-ghost-num`,  { opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");

      // Scene rule
      gsap.set(`${sel} .scene-rule`, { scaleX: 0, transformOrigin: "left" });
      gsap.to(`${sel} .scene-rule`, {
        scaleX: 1, duration: 1.3, ease: "power3.inOut",
        scrollTrigger: { trigger: sel, start: "top 20%", toggleActions: "play none none none" },
      });
    });

    // SKILLS
    gsap.timeline({
      scrollTrigger: { trigger: "#scene-skills", start: "top 55%", toggleActions: "play none none none" },
    })
    .to(words("#scene-skills"),          { y: "0%", duration: 1.1, stagger: 0.12, ease: "power4.out" })
    .to(".skills-eyebrow",               { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
    .from(".skill-row",                  { opacity: 0, x: -22, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from(".lang-row",                   { opacity: 0, x:  22, stagger: 0.05, duration: 0.5, ease: "power3.out" }, "-=0.8");

    document.querySelectorAll(".skill-fill").forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar, start: "top 92%", once: true,
        onEnter: () => bar.classList.add("animated"),
      });
    });

    // CONTACT
    gsap.timeline({
      scrollTrigger: { trigger: "#scene-contact", start: "top 55%", toggleActions: "play none none none" },
    })
    .to(words("#scene-contact"),           { y: "0%", duration: 1.1, stagger: 0.12, ease: "power4.out" })
    .to(".contact-eyebrow",                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
    .from(".contact-link-row",             { opacity: 0, x: -18, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from(".cf-group",                     { opacity: 0, y: 14, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.6")
    .from(".cf-submit",                    { opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

    /* ─── mouse parallax per scene ─── */
    document.querySelectorAll(".scene").forEach((sc) => {
      sc.addEventListener("mousemove", (e) => {
        const r = sc.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        const bg = sc.querySelector(".scene-bg");
        if (bg) gsap.to(bg, { x: x * -14, y: y * -10, duration: 1.4, ease: "power2.out" });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setActive]);
}