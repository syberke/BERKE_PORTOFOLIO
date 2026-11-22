"use client";

import { useEffect } from "react";

/**
 * Decorative, scroll-linked motion only. Never set section content to opacity:0.
 * The existing MotionDirector owns hero entrance and one-time content reveals.
 */
export default function AtelierMotion() {
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let context;
    let reset;

    async function setup() {
      if (!motionOK) return;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        // Scroll-linked decorative motion. Reversible without hiding content.
        gsap.utils.toArray(".atelier-parallax").forEach((element) => {
          gsap.fromTo(element,
            { yPercent: -8 },
            { yPercent: 8, ease: "none", scrollTrigger: {
              trigger: element.closest("section") || element,
              start: "top bottom", end: "bottom top", scrub: 0.7,
            } },
          );
        });
        gsap.utils.toArray(".atelier-side-index").forEach((element) => {
          gsap.fromTo(element, { x: -16 }, { x: 10, ease: "none", scrollTrigger: {
            trigger: element.closest("section") || element,
            start: "top bottom", end: "bottom top", scrub: 1,
          } });
        });
        gsap.to(".atelier-hero-arc", {
          rotate: 55, ease: "none", scrollTrigger: {
            trigger: "#hero", start: "top top", end: "bottom top", scrub: 1,
          },
        });
        gsap.utils.toArray(".section-marker").forEach((element) => {
          const line = element.querySelector(".atelier-marker-line");
          if (!line) return;
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.1, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true } });
        });
      }, document.body);
      ScrollTrigger.refresh();
    }

    // Single passive pointer listener instead of per-card React state.
    let lastCard = null;
    const onPointer = (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const card = event.target.closest?.(".project-card");
      if (lastCard && lastCard !== card) {
        lastCard.style.removeProperty("--card-x");
        lastCard.style.removeProperty("--card-y");
      }
      lastCard = card || null;
      if (card) {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        card.style.setProperty("--card-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty("--card-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
      }
    };
    const resetCard = () => {
      if (lastCard) {
        lastCard.style.removeProperty("--card-x");
        lastCard.style.removeProperty("--card-y");
      }
      lastCard = null;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", resetCard);
    reset = () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", resetCard);
      resetCard();
    };
    setup().catch((error) => {
      if (process.env.NODE_ENV === "development") console.error("Atelier motion initialization failed", error);
    });
    return () => {
      disposed = true;
      context?.revert();
      reset?.();
    };
  }, []);
  return null;
}