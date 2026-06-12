"use client";

export default function Skills({ SKILLS, LANGS }) {
  return (
    <section id="skills" style={{ padding: "8rem 3rem", background: "var(--bg-space)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        
        {/* Sisi Kiri: Daftar Batang Progres Keahlian */}
        <div>
          <div className="scramble-label">
            <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
            <span className="scramble-text">Abilities</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,3.6rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.1, marginBottom: "2rem" }}>
            Technical Expertise &<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>Fluency</em>
          </h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            A breakdown of technical proficiencies across core development tools. Play around with the interactive sandbox items on the right side!
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {/* FIXED: Membaca properti objek (t.name) karena SKILLS menerima array TECH_STACK */}
            {SKILLS.map((t) => (
              <div key={t.name} className="sk-bar-wrap">
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Mono',monospace", fontSize: ".8rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".4rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{t.icon}</span> {t.name}
                  </span>
                  {/* Kita berikan nilai default progres 85% agar baris animasi tetap terisi penuh */}
                  <span>85%</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "var(--bg-card)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <div className="sk-fill" data-width={85} style={{ width: 0, height: "100%", background: `linear-gradient(90deg, var(--accent), ${t.color || "var(--gold)"})`, borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sisi Kanan: Kotak Interaktif Melempar Bola Skill */}
        <div style={{ position: "relative", height: 450, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 32, boxShadow: "var(--shadow)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "1.2rem", left: "1.5rem", fontFamily: "'DM Mono',monospace", fontSize: ".68rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", zIndex: 10 }}>
            Interactive Engine Sandbox
          </div>
          <div id="drag-container" className="drag-zone" style={{ width: "100%", height: "100%", position: "relative" }}>
            {LANGS.map(([txt, c, bg]) => (
              <div key={txt} className="dg-item" style={{ position: "absolute", padding: ".7rem 1.4rem", background: bg, border: `1px solid var(--border)`, borderRadius: 50, display: "inline-flex", alignItems: "center", gap: ".5rem", fontFamily: "'DM Mono',monospace", fontSize: ".85rem", fontWeight: 600, color: c, cursor: "grab", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", userSelect: "none" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />{txt}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}