"use client";
/**
 * HorizontalShowcase.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Merges Services + Achievements into ONE continuous horizontal-tracking row.
 * Section pins on vertical scroll; the row translates X (no stacked cards).
 * Each panel reveals its title/details with a soft stagger as it enters view.
 *
 * Drop-in: <HorizontalShowcase services={[...]} achievements={[...]} />
 */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SERVICES = [
  { kind: "service", num: "01", tag: "Service",     title: "Web Development",   body: "Full-stack apps from landing pages to SaaS platforms.", meta: ["Laravel", "React", "TypeScript"] },
  { kind: "service", num: "02", tag: "Service",     title: "Mobile Development", body: "Cross-platform apps with native-quality UX.",          meta: ["React Native", "Flutter"] },
  { kind: "service", num: "03", tag: "Service",     title: "AI Integration",    body: "Embedding ML/AI into products — NLP, recommendations.", meta: ["Python", "TensorFlow", "OpenAI"] },
  { kind: "service", num: "04", tag: "Service",     title: "System Architecture", body: "Scalable services, REST/GraphQL APIs, DB design.",  meta: ["Docker", "REST", "MySQL"] },
];
const DEFAULT_ACHIEVEMENTS = [
  { kind: "achievement", num: "05", tag: "Achievement", title: "Hackathon Winner",      body: "1st place — National Dev Olympiad 2024.",     meta: ["Team Lead"] },
  { kind: "achievement", num: "06", tag: "Achievement", title: "Open Source",           body: "300+ stars across released libraries.",        meta: ["GitHub"] },
  { kind: "achievement", num: "07", tag: "Achievement", title: "Speaker",               body: "Featured speaker at 4 regional dev conferences.", meta: ["2023–2024"] },
  { kind: "achievement", num: "08", tag: "Achievement", title: "Mentorship",            body: "Mentored 25+ junior developers to first jobs.",   meta: ["Long-term"] },
];

export default function HorizontalShowcase({
  services = DEFAULT_SERVICES,
  achievements = DEFAULT_ACHIEVEMENTS,
}) {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  const items = [...services, ...achievements];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      /* Horizontal pin */
      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* Per-panel reveal driven by the SAME container scroll, so timing
         stays locked to the horizontal motion. */
      gsap.utils.toArray("[data-panel]", track).forEach((panel) => {
        gsap.from(panel.querySelectorAll("[data-reveal]"), {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="hshow"
      aria-label="Services and achievements"
    >
      <div className="hshow-viewport">
        <div ref={trackRef} className="hshow-track">
          <header className="hshow-intro" data-panel>
            <p className="eyebrow" data-reveal>/ Showcase</p>
            <h2 className="hintro-title" data-reveal>
              Services<br/>&amp; milestones.
            </h2>
            <p className="hintro-sub" data-reveal>
              Scroll → to move through every column.
            </p>
          </header>

          {items.map((it, i) => (
            <article
              key={`${it.kind}-${i}`}
              data-panel
              data-kind={it.kind}
              className="hshow-panel"
            >
              <span className="panel-num"  data-reveal>{it.num}</span>
              <span className="panel-tag"  data-reveal>{it.tag}</span>
              <h3   className="panel-title" data-reveal>{it.title}</h3>
              <p    className="panel-body"  data-reveal>{it.body}</p>
              <ul   className="panel-meta"  data-reveal>
                {it.meta?.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </article>
          ))}

          <div className="hshow-end" data-panel>
            <p className="eyebrow" data-reveal>/ End</p>
            <h3 data-reveal>That’s the highlight reel.</h3>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hshow {
          position: relative;
          background: #0a0a0c;
          color: #fff;
        }
        .hshow-viewport {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .hshow-track {
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          align-items: center;
          will-change: transform;
        }
        .hshow-intro,
        .hshow-panel,
        .hshow-end {
          flex: 0 0 auto;
          height: 70vh;
          padding: 48px;
          margin: 0 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          white-space: normal;
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .hshow-intro { width: 70vw; border-left: 0; padding-left: 8vw; }
        .hshow-panel { width: 36vw; max-width: 520px; }
        .hshow-end   { width: 50vw; padding-right: 8vw; }

        .eyebrow {
          font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin: 0 0 18px;
        }
        .hintro-title {
          font-size: clamp(48px, 7vw, 96px);
          line-height: 0.95; letter-spacing: -0.03em;
          margin: 0 0 24px; font-weight: 600;
        }
        .hintro-sub { color: rgba(255,255,255,0.6); margin: 0; }

        .panel-num {
          font-size: 64px; font-weight: 600; letter-spacing: -0.04em;
          color: rgba(255,255,255,0.18); line-height: 1; margin-bottom: 24px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }
        .panel-tag {
          font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); margin-bottom: 14px;
        }
        .panel-title {
          font-size: clamp(28px, 2.4vw, 36px);
          line-height: 1.1; letter-spacing: -0.02em;
          margin: 0 0 16px; font-weight: 600;
        }
        .panel-body {
          font-size: 15px; line-height: 1.6;
          color: rgba(255,255,255,0.68); margin: 0 0 24px;
        }
        .panel-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          list-style: none; padding: 0; margin: 0;
        }
        .panel-meta li {
          font-size: 11px; letter-spacing: 0.06em;
          padding: 6px 10px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          color: rgba(255,255,255,0.7);
        }

        .hshow-panel[data-kind="achievement"] .panel-num { color: rgba(180,160,255,0.28); }

        .hshow-end h3 {
          font-size: clamp(32px, 4vw, 56px);
          letter-spacing: -0.02em; margin: 0; font-weight: 600;
        }

        @media (max-width: 720px) {
          .hshow-intro { width: 90vw; }
          .hshow-panel { width: 80vw; }
          .hshow-end   { width: 90vw; }
        }
      `}</style>
    </section>
  );
}
