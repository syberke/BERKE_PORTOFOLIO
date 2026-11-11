"use client";

import { useEffect } from "react";

export default function MotionDirector() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let context;
    let timeline;
    let lastMagnet = null;
    let onLayout;
    let onMove;

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from(".hero-atmosphere", { opacity: 0, duration: 0.8 })
          .from(".hero-overline", { opacity: 0, y: -18, duration: 0.55 }, "-=0.4")
          .from(".hero-letter-one", { opacity: 0, x: -130, duration: 1 }, "-=0.35")
          .from(".hero-letter-two", { opacity: 0, x: 130, duration: 1 }, "-=0.82")
          .from(".portrait-transform", { autoAlpha: 0, clipPath: "inset(0% 45% 0% 45%)", scale: 1.12, duration: 1.08 }, "-=0.72")
          .from(".portrait-halo,.portrait-flare", { opacity: 0, scale: 0.72, stagger: 0.08, duration: 0.9 }, "-=0.8")
          .from(".portrait-orbit", { opacity: 0, stagger: 0.15, duration: 1 }, "-=0.75")
          .from(".portrait-sparks span", { opacity: 0, scale: 0, y: 10, stagger: 0.08, duration: 0.5 }, "-=0.72")
          .from(".portrait-aura,.portrait-depth", { opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.72")
          .from(".hero-enter:not(.hero-overline)", { opacity: 0, y: 26, stagger: 0.14, duration: 0.7 }, "-=0.62");

        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 46 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 12%", toggleActions: "play reverse play reverse" } },
          );
        });
        gsap.utils.toArray("[data-word-reveal]").forEach((el) => {
          const words = el.querySelectorAll(".word");
          gsap.from(words, { opacity: 0, yPercent: 110, stagger: 0.055, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play reverse play reverse" } });
        });
        gsap.utils.toArray(".parallax-art").forEach((el) => {
          gsap.fromTo(el, { yPercent: -6 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el.closest(".project-art") || el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.fromTo(".about-visual", { scale: 0.92 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#about", start: "top bottom", end: "center center", scrub: true } });
        gsap.fromTo(".timeline-progress", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: "#journey", start: "top 58%", end: "bottom 50%", scrub: true } });

        const reduceDesktop = window.matchMedia("(min-width: 900px)");
        if (reduceDesktop.matches) {
          const exit = gsap.timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "+=75%", pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } });
          exit.to(".portrait-transform", { scale: 0.73, xPercent: -28, yPercent: 6, ease: "none" }, 0)
            .to(".portrait-aura", { opacity: 0.45, ease: "none" }, 0)
            .to(".hero-letter-one", { xPercent: -11, opacity: 0.12, ease: "none" }, 0)
            .to(".hero-letter-two", { xPercent: 12, opacity: 0.12, ease: "none" }, 0)
            .to(".hero-content", { y: -56, opacity: 0, ease: "none" }, 0.12)
            .to(".hero-bottom", { opacity: 0, ease: "none" }, 0.08);
        }
      }, document.body);

      onLayout = () => ScrollTrigger.refresh();
      window.addEventListener("portfolio:layout", onLayout);
      onMove = (event) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const candidate = event.target.closest?.(".magnetic,.project-view");
        if (lastMagnet && lastMagnet !== candidate) gsap.to(lastMagnet, { x: 0, y: 0, duration: 0.38, ease: "power3.out", overwrite: "auto" });
        lastMagnet = candidate || null;
        if (candidate) {
          const rect = candidate.getBoundingClientRect();
          gsap.to(candidate, { x: (event.clientX - (rect.left + rect.width / 2)) * 0.13, y: (event.clientY - (rect.top + rect.height / 2)) * 0.13, duration: 0.32, ease: "power3.out", overwrite: "auto" });
        }
        if (!window.matchMedia("(min-width: 900px)").matches || window.scrollY > window.innerHeight * 1.9) return;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".hero-letter-one", { x: x * 16, y: y * 10, duration: 0.9, ease: "power2.out", overwrite: "auto" });
        gsap.to(".hero-letter-two", { x: -x * 12, y: -y * 10, duration: 0.9, ease: "power2.out", overwrite: "auto" });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      ScrollTrigger.refresh();
    }

    init().catch((error) => {
      if (process.env.NODE_ENV === "development") console.error("Motion initialization failed", error);
    });

    return () => {
      disposed = true;
      if (onLayout) window.removeEventListener("portfolio:layout", onLayout);
      if (onMove) window.removeEventListener("pointermove", onMove);
      timeline?.kill();
      context?.revert();
    };
  }, []);

  return null;
}