"use client";
/**
 * TechStackGrid.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Inverted-triangle (funnel) grid of tech stack cards.
 * - Default: grayscale + dim. Hover: full color + neon glow + scale 1.05.
 * - Glassmorphism card. GSAP back.out inertia on hover.
 * - Uses event delegation + ctx.revert() cleanup to avoid removeChild errors.
 *
 * Drop-in: <TechStackGrid /> inside any client section.
 */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/* Logos rendered as inline SVGs so there are no missing-asset risks.
   Replace `svg` with <img src="/logos/x.svg" /> if you prefer files. */
const TECHS = [
  { name: "React",      color: "#61DAFB", svg: "⚛" },
  { name: "Next.js",    color: "#FFFFFF", svg: "N" },
  { name: "TypeScript", color: "#3178C6", svg: "TS" },
  { name: "Node.js",    color: "#3C873A", svg: "⬢" },
  { name: "Tailwind",   color: "#38BDF8", svg: "~" },
  { name: "GSAP",       color: "#88CE02", svg: "G" },
  { name: "Three.js",   color: "#FFFFFF", svg: "△" },
  { name: "Laravel",    color: "#FF2D20", svg: "L" },
  { name: "Python",     color: "#FFD43B", svg: "py" },
  { name: "MySQL",      color: "#00758F", svg: "DB" },
  { name: "Docker",     color: "#2496ED", svg: "🐳" },
  { name: "Figma",      color: "#A259FF", svg: "F" },
];

/* Inverted-triangle row distribution (sum must equal TECHS.length).
   12 items → 5 / 4 / 2 / 1  (top wide, narrowing to bottom point). */
const ROWS = [5, 4, 2, 1];

export default function TechStackGrid() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Initial entrance — staggered cascade */
      gsap.from(root.querySelectorAll("[data-tech-card]"), {
        opacity: 0,
        y: 24,
        scale: 0.92,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: { each: 0.04, from: "start" },
      });

      /* Delegated hover — one listener, never re-bound per card */
      const onOver = (e) => {
        const card = e.target.closest("[data-tech-card]");
        if (!card || !root.contains(card)) return;
        const color = card.dataset.color || "#fff";
        const icon = card.querySelector("[data-icon]");
        gsap.to(card, {
          scale: 1.05,
          duration: 0.5,
          ease: "back.out(2)",
          boxShadow: `0 0 0 1px ${color}55, 0 0 28px ${color}66, 0 0 60px ${color}33`,
          borderColor: `${color}88`,
        });
        gsap.to(icon, {
          filter: "grayscale(0) brightness(1.15)",
          color,
          textShadow: `0 0 18px ${color}`,
          duration: 0.45,
          ease: "power2.out",
        });
      };
      const onOut = (e) => {
        const card = e.target.closest("[data-tech-card]");
        if (!card || !root.contains(card)) return;
        const icon = card.querySelector("[data-icon]");
        gsap.to(card, {
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.25)",
          borderColor: "rgba(255,255,255,0.08)",
        });
        gsap.to(icon, {
          filter: "grayscale(1) brightness(0.7)",
          color: "rgba(255,255,255,0.7)",
          textShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.4,
          ease: "power2.out",
        });
      };

      root.addEventListener("pointerover", onOver);
      root.addEventListener("pointerout", onOut);

      /* Register custom cleanup so gsap.context().revert() removes listeners */
      return () => {
        root.removeEventListener("pointerover", onOver);
        root.removeEventListener("pointerout", onOut);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  /* Slice TECHS into the configured rows */
  let cursor = 0;
  const rows = ROWS.map((n) => {
    const slice = TECHS.slice(cursor, cursor + n);
    cursor += n;
    return slice;
  });

  return (
    <section className="techstack-section" aria-label="Tech stack">
      <header className="techstack-header">
        <p className="eyebrow">/ TECH STACK</p>
        <h2 className="title">Tools I build with</h2>
        <p className="subtitle">
          Hover to bring each one to life — no levels, no bars, just craft.
        </p>
      </header>

      <div ref={rootRef} className="techstack-funnel" role="list">
        {rows.map((row, i) => (
          <div className="techstack-row" key={i} data-row={i}>
            {row.map((t) => (
              <article
                key={t.name}
                role="listitem"
                data-tech-card
                data-color={t.color}
                className="techstack-card"
              >
                <span data-icon className="techstack-icon" aria-hidden="true">
                  {t.svg}
                </span>
                <span className="techstack-name">{t.name}</span>
              </article>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .techstack-section {
          padding: clamp(64px, 10vw, 140px) clamp(20px, 5vw, 64px);
          color: #fff;
        }
        .techstack-header { text-align: center; margin-bottom: 56px; }
        .eyebrow {
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin: 0 0 14px;
        }
        .title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 600; letter-spacing: -0.02em; margin: 0;
        }
        .subtitle {
          margin-top: 14px; color: rgba(255,255,255,0.55);
          font-size: 15px;
        }
        .techstack-funnel {
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(16px, 2vw, 24px);
          max-width: 1100px; margin: 0 auto;
        }
        .techstack-row {
          display: flex; justify-content: center;
          gap: clamp(14px, 1.6vw, 22px);
          width: 100%;
        }
        .techstack-card {
          --w: clamp(120px, 14vw, 170px);
          width: var(--w); height: calc(var(--w) * 0.9);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          padding: 18px 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(18px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.25);
          cursor: pointer; will-change: transform;
          transition: background 0.3s ease;
        }
        .techstack-card:hover { background: rgba(255,255,255,0.06); }
        .techstack-icon {
          font-size: 34px; font-weight: 700; line-height: 1;
          color: rgba(255,255,255,0.7);
          filter: grayscale(1) brightness(0.7);
          transition: none; /* GSAP drives this */
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }
        .techstack-name {
          font-size: 13px; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.7);
        }
        @media (max-width: 640px) {
          .techstack-row { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
