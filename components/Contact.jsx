"use client";
import { useState } from "react";

export default function Contact() {
  const [sendStatus, setSend] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend("sending");
    setTimeout(() => setSend("success"), 1800);
  };

  return (
    <section id="contact" style={{ padding: "8rem 3rem", background: "var(--bg-void)", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
        
        {/* Left Side Details */}
        <div>
          <div className="scramble-label">
            <span style={{ width: 24, height: 1, background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
            <span className="scramble-text">Get In Touch</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,3.6rem)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.1, marginBottom: "2rem" }}>Let's Create<br />Something <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Great</em></h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "3rem" }}>Whether you need a modern enterprise dashboard, an agile mobile app, or cybersecurity analysis, my terminal is always open for discussion.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[["LinkedIn", "linkedin.com/in/qiageng-berke", "🔗"], ["GitHub", "github.com/berkedev", "💻"], ["Instagram", "@qiageng.berke", "📸"]].map(([plt, link, ico]) => (
              <a key={plt} href={`https://${link}`} target="_blank" rel="noreferrer" className="c-link-row" style={{ display: "flex", alignItems: "center", gap: "1.2rem", textDecoration: "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{ico}</div>
                <div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>{plt}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".95rem", fontWeight: 500, color: "var(--text-main)" }}>{link}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 32, padding: "3rem", boxShadow: "var(--shadow)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase" }}>Your Name</label>
                <input type="text" required placeholder="John Doe" className="c-input" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase" }}>Email Address</label>
                <input type="email" required placeholder="john@example.com" className="c-input" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <label style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase" }}>Subject</label>
              <input type="text" required placeholder="Project Partnership" className="c-input" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <label style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase" }}>Message</label>
              <textarea required rows={5} placeholder="Tell me about your brilliant project idea..." className="c-input" style={{ resize: "none" }} />
            </div>
            
            <button type="submit" disabled={sendStatus !== "idle"} className="c-btn-submit" style={{ cursor: sendStatus === "idle" ? "pointer" : "not-allowed" }}>
              {sendStatus === "idle" && "Transmit Message ↗"}
              {sendStatus === "sending" && "Processing Transmission..."}
              {sendStatus === "success" && "✔ Message Transmitted Successfully!"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}