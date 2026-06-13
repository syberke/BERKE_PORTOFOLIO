"use client";
import { PROJ_CATS, SHead, W } from "../app/shared-data";
export default function Projects({ cat, setCat, filtered }) {
  return (
    <section id="projects" style={{ position: "relative", padding: "8rem 3rem", background: "var(--bg-void)" }}>
      <div style={W}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <SHead label="Selected Work" title="Projects &<br/><em style='color:var(--accent);font-style:italic'>Case Studies</em>" />
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "2.8rem" }}>
            {PROJ_CATS.map((c) => (
              <button key={c} className={`pf-btn${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="proj-grid">
          {filtered.map((p) => (
            <div key={p.num} className="proj-card tilt-card reveal-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                <div style={{ width: 50, height: 50, borderRadius: 16, background: "rgba(232,163,79,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", border: "1px solid var(--border)" }}>{p.icon}</div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-void)", border: "1px solid var(--border)", padding: ".3rem .8rem", borderRadius: 50 }}>{p.year}</span>
              </div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: p.color, marginBottom: ".5rem" }}>{p.tag}</div>
              <div className="hover-image-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".4rem", lineHeight: 1.2, display: "inline-block" }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".75rem", color: "var(--text-muted)", marginBottom: ".85rem" }}>{p.org}</div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".86rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "1.2rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1.4rem" }}>
                {p.tech.map((t) => (
                  <span key={t} style={{ padding: ".25rem .75rem", borderRadius: 50, background: "var(--bg-void)", border: "1px solid var(--border)", fontSize: ".65rem", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: "var(--text-dim)" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.2rem" }}>
                {["Demo ↗", "Code ↗"].map((l) => (
                  <a key={l} href="#" style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".8rem", fontWeight: 500, color: "var(--accent)", textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
