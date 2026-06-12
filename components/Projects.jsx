"use client";
import { useState } from "react";

export default function Projects({ stackedRef, PROJECTS, PROJ_CATS }) {
  const [cat, setCat] = useState("All");

  const filteredProjects = cat === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.cat === cat);

  return (
    <>
      {/* 1. STACKED CARDS SECTION */}
      <div ref={stackedRef} className="stacked-container">
        <div className="st-card sc-1">
          <div className="st-num">01</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem" }}>High Performance</h3>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>Optimized rendering, smooth transitions, and blazing fast loading speeds utilizing cutting-edge Next.js architecture.</p>
        </div>
        <div className="st-card sc-2">
          <div className="st-num">02</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem" }}>Ironclad Security</h3>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>Implementing strict authentication, SQL-injection protections, and secure API gateways for every deployment.</p>
        </div>
        <div className="st-card sc-3">
          <div className="st-num">03</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem" }}>Immersive UX</h3>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>Fluid GSAP animations and responsive design crafted carefully to tell a story while keeping intuitive usability.</p>
        </div>
      </div>

      {/* 2. PROJECTS GRID FILTER SECTION */}
      <section id="projects" style={{ padding: "8rem 3rem", background: "var(--bg-void)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "4rem" }}>
            <div>
              <div className="scramble-label">
                <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span className="scramble-text">Selected Works</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,3.6rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.1 }}>Case Studies &<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>Creations</em></h2>
            </div>
            
            {/* Filter Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", background: "var(--bg-card)", padding: ".4rem", borderRadius: 50, border: "1px solid var(--border)" }}>
              {PROJ_CATS.map(c => (
                <button 
                  key={c} 
                  onClick={() => setCat(c)} 
                  className={`p-tab ${cat === c ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Cards Container */}
          <div className="p-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {filteredProjects.map(p => (
              <div key={p.title} className="p-card tile-item" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow)", position: "relative" }}>
                <div style={{ width: "100%", height: 210, background: `linear-gradient(135deg, ${p.color}, rgba(0,0,0,0.4))`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ fontSize: "4rem", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }}>{p.icon}</div>
                  <span style={{ position: "absolute", top: "1.2rem", right: "1.2rem", padding: ".3rem .9rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: 50, fontSize: ".68rem", fontFamily: "'DM Mono',monospace", fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>{p.cat}</span>
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)", marginBottom: ".5rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".9rem", color: "var(--text-dim)", lineHeight: 1.7, marginBottom: "1.5rem", minHeight: 70 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1.8rem" }}>
                    {p.stack.map(s => <span key={s} style={{ padding: ".25rem .75rem", background: "var(--bg-void)", border: "1px solid var(--border)", borderRadius: 50, fontSize: ".68rem", fontFamily: "'DM Mono',monospace", color: "var(--text-muted)" }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <a href={p.link} target="_blank" rel="noreferrer" className="p-btn-p">View Project ↗</a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="p-btn-s">Source Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}