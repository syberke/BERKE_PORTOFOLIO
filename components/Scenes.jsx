"use client";
import WordReveal from "./WordReveal";
import { ABOUT_INFO, LANGUAGES, SOFT_SKILLS } from "@/lib/data";

/* ══════════════════════════════════════════════════════════════
   SCENE 1 — HERO
══════════════════════════════════════════════════════════════ */
export function HeroScene() {
  return (
    <section className="scene scene-hero" id="scene-hero">
      <div className="scene-bg" />
      <div className="scene-content" style={{ padding: 0 }}>
        <div className="hero-layout">
          <div className="hero-left">
            <div className="eyebrow" id="hero-eyebrow" style={{ color: "rgba(245,240,232,.5)" }}>
              IT Student · Full-Stack Developer · 2025
            </div>
            <h1 className="hero-title">
              <span className="t-line">
                <span className="word-wrap"><span className="word">Berke</span></span>
              </span>
              <span className="t-line">
                <span className="word-wrap"><em className="word">Jaisyur-</em></span>
              </span>
              <span className="t-line">
                <span className="word-wrap"><span className="word">rohman</span></span>
              </span>
            </h1>
            <p className="hero-sub" id="hero-sub">
              Bekasi, Indonesia &nbsp;·&nbsp; Web · Mobile · Cybersecurity<br />
              SMK TI Bazma &nbsp;·&nbsp; Building what matters
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-status" id="hero-status">
              <div className="status-pulse" />
              Available for collaboration
            </div>
            <a href="#scene-contact" className="hero-cta" id="hero-cta">
              Get in touch <span>→</span>
            </a>
          </div>

          <div className="hero-ghost" id="hero-ghost">B</div>

          <div className="hero-scroll-hint" id="hero-scroll">
            Scroll
            <div className="scroll-line" />
          </div>
        </div>
      </div>
      <div className="scene-rule" id="hero-rule" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 2 — ABOUT
══════════════════════════════════════════════════════════════ */
export function AboutScene() {
  return (
    <section className="scene scene-about" id="scene-about">
      <div className="scene-bg" />
      <div className="scene-content">
        <div className="about-layout">
          <div>
            <div className="eyebrow about-eyebrow" style={{ color: "rgba(10,8,6,.4)" }}>
              About Me
            </div>
            <WordReveal
              tag="h2"
              className="about-title"
              lines={["Building", "Impact", "With Code"]}
              italic={[1]}
            />
          </div>
          <div className="about-right">
            <p className="about-text">
              A highly motivated IT student specializing in{" "}
              <strong>Web Development, Mobile Applications,</strong> and{" "}
              <strong>Cybersecurity</strong>. Built real-world systems — from social
              assistance platforms to AI-powered Islamic apps — serving actual users
              in production environments across Indonesia.
            </p>
            <div className="info-list">
              {ABOUT_INFO.map((row) => (
                <div className="info-row" key={row.label}>
                  <span className="info-label">{row.label}</span>
                  <span
                    className="info-val"
                    style={row.highlight ? { color: "var(--sage)" } : {}}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scene-rule" style={{ background: "rgba(10,8,6,.06)" }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 3-5 — PROJECT SCENE (reusable)
══════════════════════════════════════════════════════════════ */
export function ProjectScene({ project }) {
  const {
    num, cat, tag, title, emoji, org, desc, tech,
    accentColor, sceneClass, catColor, linkColor,
    featured, mirror,
  } = project;

  return (
    <section className={`scene ${sceneClass}`} id={sceneClass}>
      <div className="scene-bg" />
      <div className="scene-content" style={{ padding: 0 }}>
        <div className={`project-layout${mirror ? " mirror" : ""}`}>

          {/* Visual side */}
          <div className="proj-visual" style={{ color: accentColor }}>
            {featured && (
              <div className="proj-featured-badge">★ Featured</div>
            )}
            <div className="proj-art-grid">
              {[...Array(9)].map((_, i) => (
                <div className="proj-art-cell" key={i} />
              ))}
            </div>
            <div className="proj-emoji">{emoji}</div>
            <div className="proj-ghost-num">{num}</div>
            <div className="proj-circles">
              <div
                className="proj-circle"
                style={{ width: 300, height: 300, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
              />
              <div className="proj-circle" style={{ width: 160, height: 160, top: "20%", right: "20%" }} />
              <div className="proj-circle" style={{ width: 70, height: 70, bottom: "18%", left: "22%" }} />
            </div>
          </div>

          {/* Info side */}
          <div className="proj-info">
            <div
              className="proj-accent-bar"
              style={{ background: accentColor }}
            />
            <div className="proj-num">{num} of 03</div>
            <div className="proj-cat" style={{ color: catColor }}>{cat}</div>

            <h3 className="proj-title">
              {title.map((line, li) => (
                <span className="t-line" key={li}>
                  <span className="word-wrap">
                    <span className="word" style={{ fontStyle: li === 1 ? "italic" : "normal" }}>
                      {line}
                    </span>
                  </span>
                </span>
              ))}
            </h3>

            <div className="proj-org">{org}</div>
            <p className="proj-desc">{desc}</p>

            <div className="proj-techs">
              {tech.map((t) => (
                <span className="proj-tech" key={t}>{t}</span>
              ))}
            </div>

            <a href="#" className="proj-link" style={{ color: linkColor }}>
              View Project <span>→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="scene-rule" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 6 — SKILLS
══════════════════════════════════════════════════════════════ */
export function SkillsScene({ skills }) {
  return (
    <section className="scene scene-skills" id="scene-skills">
      <div className="scene-bg" />
      <div className="scene-content">
        <div className="skills-layout">

          {/* Left: skill bars */}
          <div>
            <div className="eyebrow skills-eyebrow" style={{ color: "rgba(245,240,232,.35)" }}>
              Tech Stack
            </div>
            <h2 className="skills-title">
              <span className="t-line">
                <span className="word-wrap"><span className="word">Skills &</span></span>
              </span>
              <span className="t-line">
                <span className="word-wrap"><em className="word" style={{ color: "var(--amber)" }}>Languages</em></span>
              </span>
            </h2>
            <div style={{ marginTop: "3rem" }}>
              {skills.map((s) => (
                <div className="skill-row" key={s.name}>
                  <span className="skill-name">{s.name}</span>
                  {s.badge && <span className="skill-badge">{s.badge}</span>}
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      data-pct={s.pct}
                      style={{ width: s.pct + "%" }}
                    />
                  </div>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: languages + soft skills */}
          <div>
            <div style={{ marginBottom: "3rem" }}>
              <div className="lang-col-title">Human Languages</div>
              {LANGUAGES.map((l) => (
                <div className="lang-row" key={l.name}>
                  <span className="lang-name">
                    <span style={{ fontSize: "0.9rem" }}>{l.flag}</span>
                    {l.name}
                  </span>
                  <span className="lang-level">{l.level}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="lang-col-title">Soft Skills</div>
              {SOFT_SKILLS.map((s) => (
                <div className="lang-row" key={s.name}>
                  <span className="lang-name">{s.name}</span>
                  <span className="lang-level">{s.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scene-rule" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 7 — CONTACT
══════════════════════════════════════════════════════════════ */
export function ContactScene({ onSubmit, submitStatus }) {
  return (
    <section className="scene scene-contact" id="scene-contact">
      <div className="scene-bg" />
      <div className="scene-content">
        <div className="contact-layout">

          {/* Left */}
          <div>
            <div className="eyebrow contact-eyebrow" style={{ color: "rgba(10,8,6,.35)" }}>
              Get In Touch
            </div>
            <h2 className="contact-title">
              <span className="t-line">
                <span className="word-wrap"><span className="word">Ready</span></span>
              </span>
              <span className="t-line">
                <span className="word-wrap"><span className="word">to </span></span>
                <span className="word-wrap"><em className="word">Build</em></span>
              </span>
              <span className="t-line">
                <span className="word-wrap"><span className="word">Together?</span></span>
              </span>
            </h2>
            <div className="contact-links">
              {[
                { label: "Email",    val: "berkejaisyurrohman95@gmail.com", href: "mailto:berkejaisyurrohman95@gmail.com" },
                { label: "Phone",    val: "+62 895-0614-7763",             href: "tel:+6289506147763" },
                { label: "Location", val: "Bekasi, Indonesia",             href: "#" },
                { label: "Website",  val: "www.reallygreatsite.com",       href: "https://www.reallygreatsite.com" },
              ].map((row) => (
                <a className="contact-link-row" href={row.href} key={row.label}>
                  <span className="cl-label">{row.label}</span>
                  <span>{row.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="contact-form">
              {[
                { id: "cf-name",    label: "Name",    type: "text",  ph: "Your name" },
                { id: "cf-email",   label: "Email",   type: "email", ph: "your@email.com" },
              ].map((f) => (
                <div className="cf-group" key={f.id}>
                  <label className="cf-label" htmlFor={f.id}>{f.label}</label>
                  <input id={f.id} className="cf-input" type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div className="cf-group">
                <label className="cf-label" htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" className="cf-input cf-textarea" placeholder="Tell me about your project..." />
              </div>
              <button className="cf-submit" onClick={onSubmit}>
                <span className="cf-submit-text">
                  {submitStatus === "sending" ? "Sending…"
                    : submitStatus === "sent" ? "Message Sent ✓"
                    : "Send Message"}
                </span>
                <span className="cf-submit-arr">→</span>
              </button>
            </div>
            <div className="contact-footer">
              © 2025 Berke Jaisyurrohman · Bekasi, Indonesia<br />
              Built with Next.js · GSAP · Framer Motion
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}