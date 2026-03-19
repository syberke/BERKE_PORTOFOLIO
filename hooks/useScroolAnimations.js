"use client";
import { useEffect } from "react";

/**
 * useScrollAnimations
 * Registers all GSAP animations after mount — client-only.
 * gsap.registerPlugin is called inside useEffect so it never runs on the server.
 */
export function useScrollAnimations(setActive) {
  useEffect(() => {
    // Dynamic import keeps GSAP fully client-side, preventing SSR/hydration mismatch
    const { gsap } = require("gsap");
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // ── helpers ──────────────────────────────────────────────────────────────
    const words   = (sel) => gsap.utils.toArray(`${sel} .word`);
    const eyebrow = (sel) => document.querySelector(`${sel} .eyebrow`);

    // ── initial state for all non-hero word elements ──────────────────────────
    const allWords = gsap.utils.toArray(
      "#scene-about .word, #scene-proj-1 .word, #scene-proj-2 .word, " +
      "#scene-proj-3 .word, #scene-skills .word, #scene-contact .word"
    );
    gsap.set(allWords, { y: "110%" });
    gsap.set(gsap.utils.toArray(".eyebrow"), { opacity: 0, y: 8 });

    // ── progress bar ────────────────────────────────────────────────────────
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const bar = document.getElementById("scroll-progress-bar");
        if (bar) bar.style.width = self.progress * 100 + "%";
      },
    });

    // ── scene tracker ───────────────────────────────────────────────────────
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

    // ── smooth scene cross-fade ─────────────────────────────────────────────
    SCENE_IDS.slice(1).forEach((id) => {
      gsap.fromTo(
        "#" + id,
        { opacity: 0.35 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: "#" + id,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    });

    // ── mouse parallax per scene ─────────────────────────────────────────────
    document.querySelectorAll(".scene").forEach((sc) => {
      sc.addEventListener("mousemove", (e) => {
        const r = sc.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        const bg = sc.querySelector(".scene-bg");
        if (bg) {
          gsap.to(bg, { x: x * -14, y: y * -10, duration: 1.4, ease: "power2.out" });
        }
      });
    });

    // ════════════════════════════════════════════════════════════════════════
    // SCENE 1 — HERO
    // ════════════════════════════════════════════════════════════════════════
    const heroTL = gsap.timeline({ delay: 0.4 });
    heroTL
      .to("#scene-hero .word",    { y: "0%",  duration: 1.2, stagger: 0.12, ease: "power4.out" })
      .to("#hero-eyebrow",        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
      .to("#hero-sub",            { opacity: 1, duration: 1,   ease: "power3.out" },        "-=0.6")
      .to("#hero-ghost",          { opacity: 1, duration: 1.4, ease: "power3.out" },         "-=0.8")
      .to("#hero-status",         { opacity: 1, duration: 0.8, ease: "power3.out" },         "-=0.8")
      .to("#hero-cta",            { opacity: 1, duration: 0.8, ease: "power3.out" },         "-=0.6")
      .to("#hero-scroll",         { opacity: 1, duration: 0.8, ease: "power3.out" },         "-=0.4");

    // Hero parallax on scroll
    gsap.to("#scene-hero .scene-bg", {
      y: "22%", ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1.5 },
    });
    gsap.to("#scene-hero .hero-title", {
      y: -70, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to("#hero-sub, #hero-status, #hero-cta", {
      y: -35, opacity: 0, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to("#hero-ghost", {
      y: -90, ease: "none",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", end: "bottom top", scrub: 1.4 },
    });
    // Rule wipe
    gsap.to("#hero-rule", {
      scaleX: 1, duration: 1.5, ease: "power3.inOut",
      scrollTrigger: { trigger: "#scene-hero", start: "top top", toggleActions: "play none none none" },
    });

    // ════════════════════════════════════════════════════════════════════════
    // SCENE 2 — ABOUT
    // ════════════════════════════════════════════════════════════════════════
    gsap.to("#scene-about .scene-bg", {
      y: "15%", ease: "none",
      scrollTrigger: { trigger: "#scene-about", start: "top bottom", end: "bottom top", scrub: 1.5 },
    });
    gsap.to("#scene-about .about-title", {
      y: -50, ease: "none",
      scrollTrigger: { trigger: "#scene-about", start: "top bottom", end: "bottom top", scrub: 1.2 },
    });

    gsap.timeline({
      scrollTrigger: { trigger: "#scene-about", start: "top 72%", toggleActions: "play none none none" },
    })
    .to(words("#scene-about"),        { y: "0%",  duration: 1.1, stagger: 0.1,  ease: "power4.out" })
    .to("#scene-about .about-eyebrow",{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
    .from("#scene-about .about-text", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
    .from(".info-row",                { y: 14, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.5");

    // ════════════════════════════════════════════════════════════════════════
    // SCENES 3-5 — PROJECTS
    // ════════════════════════════════════════════════════════════════════════
    ["scene-proj-1", "scene-proj-2", "scene-proj-3"].forEach((id) => {
      const sel = "#" + id;

      // BG parallax
      gsap.to(`${sel} .scene-bg`, {
        y: "18%", ease: "none",
        scrollTrigger: { trigger: sel, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      // Emoji drift
      gsap.to(`${sel} .proj-emoji`, {
        y: -50, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: sel, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      // Circles float
      gsap.utils.toArray(`${sel} .proj-circle`).forEach((c, ci) => {
        gsap.to(c, {
          y: -30 * (ci + 1), x: 10 * (ci % 2 === 0 ? 1 : -1), ease: "none",
          scrollTrigger: { trigger: sel, start: "top bottom", end: "bottom top", scrub: 1 + ci * 0.3 },
        });
      });

      // Content animation
      gsap.timeline({
        scrollTrigger: { trigger: sel, start: "top 65%", toggleActions: "play none none none" },
      })
      .from(`${sel} .proj-accent-bar`, { scaleY: 0, duration: 0.8, ease: "power3.inOut", transformOrigin: "top" })
      .from(`${sel} .proj-num`,        { opacity: 0, x: -15, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-cat`,        { opacity: 0, x: -10, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to(words(sel),                  { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.3")
      .from(`${sel} .proj-org`,        { opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.5")
      .from(`${sel} .proj-desc`,       { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-tech`,       { opacity: 0, y: 8, stagger: 0.05, duration: 0.4, ease: "power3.out" }, "-=0.4")
      .from(`${sel} .proj-link`,       { opacity: 0, x: -10, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .from(`${sel} .proj-ghost-num`,  { opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");

      // Scene rule wipe
      gsap.to(`${sel} .scene-rule`, {
        scaleX: 1, duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: sel, start: "top top", toggleActions: "play none none none" },
      });
    });

    // ════════════════════════════════════════════════════════════════════════
    // SCENE 6 — SKILLS
    // ════════════════════════════════════════════════════════════════════════
    gsap.to("#scene-skills .scene-bg", {
      y: "15%", ease: "none",
      scrollTrigger: { trigger: "#scene-skills", start: "top bottom", end: "bottom top", scrub: 1.5 },
    });

    gsap.timeline({
      scrollTrigger: { trigger: "#scene-skills", start: "top 68%", toggleActions: "play none none none" },
    })
    .to(words("#scene-skills"),            { y: "0%", duration: 1.1, stagger: 0.12, ease: "power4.out" })
    .to("#scene-skills .skills-eyebrow",   { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
    .from(".skill-row",                    { opacity: 0, x: -20, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from(".lang-row",                     { opacity: 0, x:  20, stagger: 0.05, duration: 0.5, ease: "power3.out" }, "-=0.8");

    // Skill bars animate on enter
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: "top 92%",
        once: true,
        onEnter: () => bar.classList.add("animated"),
      });
    });

    // ════════════════════════════════════════════════════════════════════════
    // SCENE 7 — CONTACT
    // ════════════════════════════════════════════════════════════════════════
    gsap.to("#scene-contact .scene-bg", {
      y: "10%", ease: "none",
      scrollTrigger: { trigger: "#scene-contact", start: "top bottom", end: "bottom top", scrub: 1.5 },
    });

    gsap.timeline({
      scrollTrigger: { trigger: "#scene-contact", start: "top 68%", toggleActions: "play none none none" },
    })
    .to(words("#scene-contact"),              { y: "0%", duration: 1.1, stagger: 0.12, ease: "power4.out" })
    .to("#scene-contact .contact-eyebrow",    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
    .from(".contact-link-row",                { opacity: 0, x: -15, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from(".cf-group",                        { opacity: 0, y: 12,  stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.6")
    .from(".cf-submit",                       { opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

    // ── refresh ──────────────────────────────────────────────────────────────
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setActive]);
}