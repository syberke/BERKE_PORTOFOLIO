"use client";
import { TIMELINE, SHead, W } from "./data";
export default function Experience() {
  return (
    <section id="experience" style={{ position: "relative", padding: "8rem 3rem", background: "var(--bg-void)" }}>
      <div style={W}>
        <SHead label="Career Timeline" title="My <em style='color:var(--accent);font-style:italic'>Journey</em>" center />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg width="2" height="60" style={{ overflow: "visible" }}>
            <path className="draw-svg-path" d="M1,0 L1,60" stroke="var(--accent)" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ maxWidth: 750, margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", left: 28, top: 10, bottom: 0, width: 2, background: "linear-gradient(180deg,transparent,var(--accent),transparent)" }} />
          {TIMELINE.map((t, i) => (
            <div key={i} className="tl-item">
              <div
                style={{
                  width: 56, height: 56,
                  background: t.active ? "var(--accent)" : "var(--bg-card)",
                  border: `2px solid ${t.active ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem", flexShrink: 0, zIndex: 1,
                  boxShadow: t.active ? "0 0 20px rgba(var(--accent-rgb),0.4)" : undefined,
                }}
              >
                {t.icon}
              </div>
              <div className="tl-content">
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: ".5rem" }}>{t.year}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text-main)", marginBottom: ".3rem" }}>{t.role}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".9rem", color: "var(--text-muted)", marginBottom: "1.2rem" }}>{t.company}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".7rem" }}>
                  {t.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", gap: ".8rem", fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "var(--text-dim)", lineHeight: 1.75 }}>
                      <div style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", flexShrink: 0, marginTop: ".6rem" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}