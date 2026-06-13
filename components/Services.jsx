"use client";
import { SERVICES, SHead, W } from "./data";
export default function Services() {
  return (
    <section id="services" style={{ position: "relative", padding: "8rem 3rem", background: "var(--bg-space)" }}>
      <div style={W}>
        <SHead label="What I Do" title="Services &<br/><em style='color:var(--accent);font-style:italic'>Specializations</em>" />
        <div className="srv-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="srv-card tilt-card reveal-card">
              <div style={{ width: 55, height: 55, borderRadius: 16, background: "rgba(232,163,79,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "1.5rem", border: "1px solid var(--border)" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".6rem" }}>{s.title}</div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".88rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "1.2rem" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                {s.tech.map((t) => (
                  <span key={t} style={{ padding: ".25rem .75rem", borderRadius: 50, background: "var(--bg-void)", border: "1px solid var(--border)", fontSize: ".65rem", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: "var(--text-dim)" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
