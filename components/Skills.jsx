"use client";
import { SKILLS, LANGS, SHead, SLabel, sec, W } from "./data";
const ORBS = [
  ["⚛️", "React", "var(--accent)", { left: "5%", top: "30%" }],
  ["🏗️", "Laravel", "var(--sage)", { left: "18%", top: "55%" }],
  ["📱", "Flutter", "var(--violet)", { left: "32%", top: "20%" }],
  ["📘", "TS", "var(--gold)", { left: "46%", top: "50%" }],
  ["🐍", "Python", "var(--coral)", { left: "60%", top: "18%" }],
  ["🗄️", "MySQL", "var(--cyan)", { left: "72%", top: "55%" }],
  ["📲", "RN", "var(--accent)", { left: "84%", top: "28%" }],
];
const STATS = [
  ["90", "Skills Mastered", "%"],
  ["6", "Projects Shipped", ""],
  ["2", "Years Coding", "+"],
  ["11", "Technologies", ""],
];
function SkillRow({ s, gradient }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".92rem", fontWeight: 500, color: "var(--text-main)" }}>{s.name}</span>
          {s.badge && (
            <span style={{ fontSize: ".58rem", padding: ".2rem .6rem", borderRadius: 50, background: "rgba(212,168,67,0.15)", color: "var(--gold)", fontFamily: "'DM Mono',monospace", border: "1px solid var(--border)" }}>{s.badge}</span>
          )}
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", color: "var(--accent)" }}>{s.lvl}%</span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 50, overflow: "hidden" }}>
        <div className="skill-fill" data-lvl={s.lvl} style={{ height: "100%", width: s.lvl + "%", borderRadius: 50, background: gradient }} />
      </div>
    </div>
  );
}
export default function Skills() {
  return (
    <section id="skills" style={sec("var(--bg-space)")}>
      <div style={W}>
        <div className="skills-pin-label" style={{ marginBottom: "1rem" }}>
          <SLabel text="Expertise" />
        </div>
        <SHead label="" title="Tech Stack &<br/><em style='color:var(--accent);font-style:italic'>Languages</em>" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", marginBottom: "4rem" }} className="two-col">
          {STATS.map(([n, l, s]) => (
            <div key={l} style={{ background: "var(--bg-card)", borderRadius: 20, padding: "1.5rem", textAlign: "center", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
              <div className="counter-anim" data-to={parseInt(n)} data-suffix={s} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", fontWeight: 700, color: "var(--accent)" }}>{n}{s}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: ".4rem" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4.5rem", marginBottom: "5rem" }} className="two-col">
          <div>{SKILLS.slice(0, 6).map((s) => <SkillRow key={s.name} s={s} gradient="linear-gradient(90deg,var(--accent),var(--cyan))" />)}</div>
          <div>{SKILLS.slice(6).map((s) => <SkillRow key={s.name} s={s} gradient="linear-gradient(90deg,var(--sage),var(--cyan))" />)}</div>
        </div>
        {/* DRAGGABLE ORBS */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--text-main)", marginBottom: ".5rem" }}>Drag & Explore Skills</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>These skill orbs are draggable — grab and throw them around!</p>
          <div className="draggable-container">
            {ORBS.map(([ico, name, color, pos]) => (
              <div key={name} className="draggable-orb" style={{ ...pos, background: "var(--bg-card)", borderColor: color }}>
                <div style={{ fontSize: "1.3rem" }}>{ico}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".45rem", color: "var(--text-muted)", marginTop: "2px" }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "2rem" }}>Human Languages</div>
        <div className="lang-grid">
          {LANGS.map((l) => (
            <div key={l.lang} className="lang-card tilt-card reveal-card">
              <div style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{l.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".95rem", fontWeight: 500, color: "var(--text-main)" }}>{l.lang}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 500, color: l.color, marginTop: 2 }}>{l.label}</div>
                </div>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", color: "var(--accent)" }}>{l.lvl}%</span>
              </div>
              <div style={{ height: 5, background: "var(--border)", borderRadius: 50, overflow: "hidden" }}>
                <div className="lang-fill" data-lvl={l.lvl} style={{ height: "100%", width: "0%", borderRadius: 50, background: `linear-gradient(90deg,${l.color},var(--accent))` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
