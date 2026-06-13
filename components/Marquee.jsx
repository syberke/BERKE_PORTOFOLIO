"use client";
const ITEMS = ["Web Development", "Mobile Apps", "Cybersecurity", "Laravel", "React", "Flutter", "MySQL", "TypeScript", "AI/ML", "SIOT", "React Native", "Python", "Astro", "Full-Stack"];
export default function Marquee() {
  return (
    <div
      style={{
        padding: "1.5rem 0", background: "var(--bg-card)",
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        overflow: "hidden", position: "relative", zIndex: 2,
      }}
    >
      <div className="mq-track" style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap" }}>
        {[...Array(2)].map((_, r) =>
          ITEMS.map((t, i) => (
            <div key={`${r}-${i}`} style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8rem", fontWeight: 500, color: "var(--text-dim)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{t}</span>
              <div style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", flexShrink: 0 }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
