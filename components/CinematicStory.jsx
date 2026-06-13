"use client";
/**
 * CinematicStory.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Pinned ScrollTrigger sequencer that choreographs FluidBlobCanvas with
 * left/right narrative blocks across 4 scroll beats:
 *
 *   beat 0  blob centered, both texts hidden
 *   beat 1  blob → right (+22vw, rotate 15°), LEFT text in
 *   beat 2  blob → left (-22vw, rotate -15°), LEFT text out, RIGHT text in
 *   beat 3  blob → center, scale 1.25, rotate 0, BOTH texts framing it
 *
 * All animation lives in a gsap.context() that ctx.revert()s on unmount, so
 * Three.js' WebGL context survives theme/route swaps without leaks.
 */
import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Lazy-load the WebGL canvas so SSR never touches `window`. */
const FluidBlobCanvas = dynamic(() => import("./FluidBlobCanvas"), {
  ssr: false,
});

const DEFAULT_STORY = {
  left: {
    eyebrow: "01 — origin",
    title: "Code as material.",
    body: "Every interface starts as a fluid idea. I shape it with the same patience a sculptor reserves for clay.",
  },
  right: {
    eyebrow: "02 — craft",
    title: "Motion with intent.",
    body: "Animation is never decoration. It is the grammar that turns a screen into a place worth lingering in.",
  },
  finale: "Built with care, shipped with conviction.",
};

export default function CinematicStory({ story = DEFAULT_STORY }) {
  const sectionRef = useRef(null);
  const stageRef   = useRef(null);
  const blobRef    = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const finaleRef  = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Initial states */
      gsap.set([leftRef.current, rightRef.current, finaleRef.current], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3200",
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut" },
      });

      const getGroup = () => blobRef.current?.group;

      /* Beat 1: blob → right, left text in */
      tl.addLabel("beat1")
        .to(getGroup()?.position || {}, { x: 2.2, duration: 1 }, "beat1")
        .to(getGroup()?.rotation || {}, { z: -0.26, duration: 1 }, "beat1")
        .to(leftRef.current,
            { opacity: 1, y: 0, x: 0, duration: 0.8 }, "beat1+=0.15")

      /* Beat 2: left out, blob → left, right text in */
        .addLabel("beat2", "+=0.6")
        .to(leftRef.current,
            { opacity: 0, y: -20, duration: 0.5 }, "beat2")
        .to(getGroup()?.position || {}, { x: -2.2, duration: 1 }, "beat2")
        .to(getGroup()?.rotation || {}, { z: 0.26, duration: 1 }, "beat2")
        .to(rightRef.current,
            { opacity: 1, y: 0, duration: 0.8 }, "beat2+=0.15")

      /* Beat 3 (finale): blob → center, scale up, both texts frame it */
        .addLabel("finale", "+=0.6")
        .to(getGroup()?.position || {}, { x: 0, y: 0, duration: 1 }, "finale")
        .to(getGroup()?.rotation || {}, { z: 0, duration: 1 }, "finale")
        .to(getGroup()?.scale    || {}, { x: 1.25, y: 1.25, z: 1.25, duration: 1 }, "finale")
        .to(leftRef.current,
            { opacity: 1, y: 0, x: 0, duration: 0.7 }, "finale+=0.1")
        .to(rightRef.current,
            { opacity: 1, y: 0, duration: 0.7 }, "finale+=0.1")
        .to(finaleRef.current,
            { opacity: 1, y: 0, duration: 0.6 }, "finale+=0.35");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cinematic" aria-label="Cinematic story">
      <div ref={stageRef} className="cinematic-stage">
        {/* 3D layer (zIndex 1, pointer-events none) */}
        <FluidBlobCanvas ref={blobRef} />

        {/* Narrative layer */}
        <div className="cinematic-grid">
          <article ref={leftRef} className="cinematic-text cinematic-left">
            <p className="eyebrow">{story.left.eyebrow}</p>
            <h3 className="t">{story.left.title}</h3>
            <p className="b">{story.left.body}</p>
          </article>

          <article ref={rightRef} className="cinematic-text cinematic-right">
            <p className="eyebrow">{story.right.eyebrow}</p>
            <h3 className="t">{story.right.title}</h3>
            <p className="b">{story.right.body}</p>
          </article>
        </div>

        <p ref={finaleRef} className="cinematic-finale">{story.finale}</p>
      </div>

      <style jsx>{`
        .cinematic {
          position: relative;
          width: 100%;
        }
        .cinematic-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          color: #fff;
        }
        .cinematic-grid {
          position: relative;
          z-index: 2;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 0 clamp(24px, 6vw, 96px);
          gap: clamp(24px, 8vw, 120px);
          pointer-events: none;
        }
        .cinematic-text { max-width: 360px; }
        .cinematic-right { justify-self: end; text-align: right; }
        .eyebrow {
          font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); margin: 0 0 14px;
        }
        .t {
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.05; letter-spacing: -0.02em;
          margin: 0 0 16px; font-weight: 600;
        }
        .b {
          font-size: 15px; line-height: 1.6;
          color: rgba(255,255,255,0.68); margin: 0;
        }
        .cinematic-finale {
          position: absolute;
          left: 50%; bottom: 7vh; transform: translateX(-50%);
          z-index: 2;
          font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-align: center; margin: 0;
        }
        @media (max-width: 720px) {
          .cinematic-grid { grid-template-columns: 1fr; }
          .cinematic-right { justify-self: start; text-align: left; }
        }
      `}</style>
    </section>
  );
}
