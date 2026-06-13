"use client";
import { TECH_STACK, SLabel } from "../app/shared-data";
export default function TechStackHorizontal({ horizontalRef }) {
  return (
    <div ref={horizontalRef} className="h-scroll-section">
      <div style={{ position: "absolute", top: "3rem", left: "3rem", zIndex: 5 }}>
        <SLabel text="Tech Stack" />
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 600, color: "var(--text-main)" }}>
          Scroll & Discover →
        </h2>
      </div>
      <div className="h-track" style={{ paddingTop: "10rem" }}>
        {TECH_STACK.map((t) => (
          <div key={t.name} className="h-tech-card tilt-card">
            <div style={{ fontSize: "3rem" }}>{t.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--text-main)" }}>{t.name}</div>
            <div style={{ width: 40, height: 3, borderRadius: 4, background: t.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}
