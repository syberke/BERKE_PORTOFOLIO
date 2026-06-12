"use client";

export default function About({ SOFT_SKILLS }) {
  return (
    <section id="about" style={{ background: "var(--bg-void)", position: "relative" }}>
      <div id="about-chapters" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 1100, padding: "0 3rem", height: "65vh", display: "flex", alignItems: "center" }}>
          
          {/* Chapter 1 */}
          <div className="ch-1" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem" }}>
            <div style={{ maxWidth: 700 }}>
              <div className="scramble-label">
                <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span className="scramble-text">Chapter 01</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,5vw,4.2rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.05, marginBottom: "1.8rem" }}>The <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Origin</em> Story</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", color: "var(--text-dim)", lineHeight: 1.9, marginBottom: "1.2rem" }}>A highly motivated IT student specializing in <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>Web Development, Mobile Applications, and Cybersecurity</strong>. Berke has built real-world systems serving actual users in production.</p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", color: "var(--text-dim)", lineHeight: 1.9, marginBottom: "2.2rem" }}>Passionate about clean code, data security, and technology that creates <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>real impact for communities</strong>.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
                {[["📍", "Bekasi, Indonesia"], ["📧", "berkejaisyurrohman95@gmail.com"], ["📱", "+62 895-0614-7763"]].map(([ico, val]) => (
                  <div key={val} className="info-item" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                    <div style={{ width: 28, height: 28, background: "rgba(232,163,79,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--accent)" }}>{ico}</div>{val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="ch-2" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
            <div style={{ maxWidth: 700 }}>
              <div className="scramble-label">
                <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span className="scramble-text">Chapter 02</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,5vw,4.2rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.05, marginBottom: "1.8rem" }}>My <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Roots</em></h2>
              <div className="tilt-card" style={{ background: "var(--bg-card)", borderRadius: 24, padding: "2.2rem", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(180deg,var(--accent),var(--gold))", borderRadius: "4px 0 0 4px" }} />
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.14em", marginBottom: ".6rem" }}>JUNE 2023 – PRESENT</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--text-main)", marginBottom: ".4rem" }}>SMK TI Bazma</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", color: "var(--text-muted)", marginBottom: "1.2rem" }}>Network Information Systems & Applications · Bogor</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {["Web Dev", "Database", "Networking", "Cybersecurity"].map(t => (
                    <span key={t} style={{ padding: ".35rem 1rem", background: "var(--bg-void)", border: "1px solid var(--border)", borderRadius: 50, fontSize: ".75rem", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: "var(--text-dim)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="ch-3" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
            <div style={{ maxWidth: 700 }}>
              <div className="scramble-label">
                <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span className="scramble-text">Chapter 03</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,5vw,4.2rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.05, marginBottom: "1.8rem" }}>The <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Arsenal</em></h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", color: "var(--text-dim)", lineHeight: 1.9, marginBottom: "1.8rem" }}>My daily drivers — modern frameworks and robust backend technologies for seamless, secure digital experiences.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "2.5rem" }}>
                {[["var(--accent)", "React"], ["var(--sage)", "Flutter"], ["var(--violet)", "Laravel"], ["var(--gold)", "TypeScript"], ["var(--accent)", "MySQL"], ["var(--sage)", "Python"], ["var(--violet)", "React Native"], ["var(--gold)", "Next.js"], ["var(--accent)", "Astro"]].map(([c, t]) => (
                  <span key={t} style={{ padding: ".45rem 1rem", borderRadius: 50, background: `rgba(232,163,79,0.1)`, fontSize: ".85rem", fontFamily: "'DM Mono',monospace", fontWeight: 500, color: c, border: `1px solid var(--border)` }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }}>
                {[["6", "Projects"], ["2", "Years"], ["4", "Languages"]].map(([n, l]) => (
                  <div key={l} style={{ background: "var(--bg-card)", borderRadius: 16, padding: "1.2rem", textAlign: "center", border: "1px solid var(--border)" }}>
                    <div className="counter-anim" data-to={parseInt(n)} data-suffix="+" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-main)" }}>{n}+</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--text-muted)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter 4 */}
          <div className="ch-4" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
            <div style={{ maxWidth: 700 }}>
              <div className="scramble-label">
                <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
                <span className="scramble-text">Chapter 04</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,5vw,4.2rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.05, marginBottom: "1.8rem" }}>The <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Philosophy</em></h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", color: "var(--text-dim)", lineHeight: 1.9, marginBottom: "2rem" }}>Technology is only as good as the mind wielding it. Clear communication, analytical thinking, and team synergy turn ideas into reality.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
                {SOFT_SKILLS.map(([ico, s]) => (
                  <div key={s} className="soft-item">
                    <span style={{ fontSize: "1.4rem" }}>{ico}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}