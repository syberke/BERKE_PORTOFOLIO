"use client";
import { sec } from "./data";
export default function Quote() {
  return (
    <section
      id="quote"
      style={{
        ...sec("var(--bg-card)"),
        textAlign: "center", overflow: "hidden",
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "8rem 2rem",
      }}
    >
      <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle,rgba(232,163,79,0.08),transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <p className="q-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,3.2rem)", fontStyle: "italic", fontWeight: 500, color: "var(--text-main)", lineHeight: 1.4, maxWidth: 850, margin: "0 auto 2rem", opacity: 0 }}>
        "Technology should not just be functional — it should create genuine impact for the people who use it."
      </p>
      <p className="q-author" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.18em", opacity: 0 }}>
        — Berke Jaisyurrohman · IT Student & Developer
      </p>
    </section>
  );
}
