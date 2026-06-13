"use client";
import { MORPH_SHAPES, MOTION_PATH_D } from "./data";
export default function Hero({ morphSvgRef, morphPathRef, motionBallRef, heroTitleRef, typewriterRef }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "7rem 3rem 4rem", background: "var(--bg-void)",
        overflow: "hidden", position: "relative",
      }}
    >
      <div ref={morphSvgRef} className="morph-bg">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <path ref={morphPathRef} d={MORPH_SHAPES[0]} fill="var(--accent)" />
        </svg>
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="none">
          <path className="draw-svg-path" d="M0 250 Q 400 50 800 250 T 1600 250" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
          <path className="draw-svg-path" d="M0 150 Q 300 350 600 150 T 1200 150 T 1800 150" stroke="var(--sage)" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>
      <div style={{ position: "absolute", width: "100%", height: "200px", top: "20%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <svg width="100%" height="200" style={{ position: "absolute" }}>
          <path id="motion-path-svg" d={MOTION_PATH_D} fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.08" />
        </svg>
        <div
          ref={motionBallRef}
          style={{
            position: "absolute", width: 14, height: 14, background: "var(--accent)",
            borderRadius: "50%", filter: "blur(2px)", boxShadow: "0 0 20px var(--accent)",
            top: 0, left: 0,
          }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(circle at 50% 50%,transparent 20%,rgba(var(--bg-void-rgb),0.75) 80%),linear-gradient(180deg,transparent 0%,rgba(var(--bg-void-rgb),1) 100%)", pointerEvents: "none" }} />
      <div
        className="hero-parallax-wrapper"
        style={{ position: "relative", zIndex: 2, maxWidth: 850, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}
      >
        <div
          className="h-badge"
          style={{
            display: "inline-flex", alignItems: "center", gap: ".7rem",
            padding: ".5rem 1.4rem", background: "var(--bg-card)",
            border: "1px solid var(--border)", borderRadius: 50,
            fontFamily: "'DM Mono',monospace", fontSize: ".75rem", fontWeight: 500,
            color: "var(--text-main)", letterSpacing: "0.12em",
            marginBottom: "1.5rem", opacity: 0, boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ width: 8, height: 8, background: "var(--sage)", borderRadius: "50%", flexShrink: 0, boxShadow: "0 0 10px var(--sage)" }} />
          Available for Collaboration
        </div>
        <div className="h-typewriter typewriter-wrap" style={{ marginBottom: "1rem" }}>
          <span ref={typewriterRef} className="cursor-blink">Full-Stack Developer</span>
        </div>
        <h1
          ref={heroTitleRef}
          className="h-title"
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(3.8rem,8vw,7.2rem)", fontWeight: 700, lineHeight: 1.05,
            color: "var(--text-main)", marginBottom: "1.8rem", letterSpacing: "-.02em",
            opacity: 0, textShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          Qiageng <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 600 }}>Berke</em><br />
          Jaisyurrohman
        </h1>
        <p
          className="h-para"
          style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--text-dim)", lineHeight: 1.8, maxWidth: 600, marginBottom: "3.5rem", opacity: 0 }}
        >
          A passionate <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>Full-Stack Developer & IT Student</strong>. Building web systems, mobile apps, and cybersecurity solutions that create real impact.
        </p>
        <div className="h-btns" style={{ display: "flex", gap: "1.4rem", justifyContent: "center", flexWrap: "wrap", opacity: 0, pointerEvents: "auto" }}>
          <a href="#projects" className="bfill">Explore My Work</a>
          <a href="#about" className="boutl">Read My Story</a>
        </div>
      </div>
      <div
        style={{
          position: "absolute", bottom: "3rem", left: "50%",
          transform: "translateX(-50%)", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, animation: "fadeInUp 1s 2.5s both",
          zIndex: 2, pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 50, background: "linear-gradient(180deg,var(--accent),transparent)" }} />
      </div>
    </section>
  );
}