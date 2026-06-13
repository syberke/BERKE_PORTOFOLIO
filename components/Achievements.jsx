"use client";
import { ACHIEVEMENTS, SHead, W } from "../app/shared-data";
export default function Achievements() {
  return (
    <section id="achievements" style={{ position: "relative", padding: "8rem 3rem", background: "var(--bg-space)" }}>
      <div style={W}>
        <SHead label="Recognition" title="Achievements &<br/><em style='color:var(--accent);font-style:italic'>Milestones</em>" />
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="ach-card tilt-card reveal-card">
              <div style={{ fontSize: "2.2rem", marginBottom: "1.2rem" }}>{a.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".5rem" }}>{a.title}</div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".86rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "1.2rem" }}>{a.desc}</p>
              <span className="ach-badge">{a.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
