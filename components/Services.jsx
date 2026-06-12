"use client";

export default function Services({ SERVICES }) {
  return (
    <section id="services" style={{ position: "relative", padding: "8rem 3rem", background: "var(--bg-space)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "left", marginBottom: "1rem" }}>
          <div className="scramble-label">
            <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
            <span className="scramble-text">What I Do</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,3.6rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.1, marginBottom: "2.8rem" }}>
            Services &<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>Specializations</em>
          </h2>
        </div>
        <div className="srv-grid">
          {SERVICES.map(s => (
            <div key={s.title} className="srv-card tilt-card reveal-card">
              <div style={{ width: 55, height: 55, borderRadius: 16, background: `rgba(232,163,79,0.1)`, display: "flex", alignItems: "center", justifyCenter: "center", fontSize: "1.6rem", marginBottom: "1.5rem", border: `1px solid var(--border)` }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".6rem" }}>{s.title}</div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".88rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "1.2rem" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                {s.tech.map(t => <span key={t} style={{ padding: ".25rem .75rem", borderRadius: 50, background: "var(--bg-void)", border: "1px solid var(--border)", fontSize: ".65rem", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: "var(--text-dim)" }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}