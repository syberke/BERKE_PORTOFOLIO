"use client";
import { SLabel, sec, W } from "../app/shared-data";
const INFO = [
  ["✉️", "Email", "berkejaisyurrohman95@gmail.com"],
  ["📱", "Phone", "+62 895-0614-7763"],
  ["📍", "Location", "Bekasi, Indonesia"],
  ["🌐", "Website", "www.jaisyporto.com"],
];
const FIELDS = ["Name", "Email", "Subject"];
export default function Contact({ sendStatus, setSend }) {
  return (
    <section id="contact" style={{ ...sec("var(--bg-card)"), overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle,rgba(232,163,79,0.12),transparent 70%)", top: -150, right: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle,rgba(95,200,155,0.12),transparent 70%)", bottom: -150, left: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <path className="draw-svg-path" d="M0,300 C300,100 600,500 900,300 S1200,100 1500,300" stroke="var(--accent)" strokeWidth="1.5" opacity="0.2" />
        </svg>
      </div>
      <div style={W}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "6rem", alignItems: "start" }} className="two-col">
          {/* INFO */}
          <div>
            <SLabel text="Let's Connect" />
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,4rem)", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.1, marginBottom: "1.8rem" }}>
              Ready to Build<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>Something Great?</em>
            </h2>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", color: "var(--text-dim)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              Always open to opportunities and collaborations. Web system, mobile app, or cybersecurity challenge — let's create together.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {INFO.map(([ico, lbl, val]) => (
                <a key={lbl} href={lbl === "Email" ? `mailto:${val}` : "#"} className="ct-link">
                  <div style={{ width: 40, height: 40, background: "rgba(232,163,79,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.2rem" }}>{ico}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>{lbl}</div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".95rem", fontWeight: 500, color: "var(--text-main)" }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* FORM */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", background: "var(--bg-void)", padding: "2.5rem", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            {FIELDS.map((f) => (
              <div key={f}>
                <label className="cf-label">{f}</label>
                <input
                  suppressHydrationWarning
                  type={f === "Email" ? "email" : "text"}
                  className="cf-in"
                  placeholder={f === "Name" ? "Your name" : f === "Email" ? "your@email.com" : "Project idea..."}
                />
              </div>
            ))}
            <div>
              <label className="cf-label">Message</label>
              <textarea suppressHydrationWarning className="cf-in" rows={5} placeholder="Tell me about your project..." />
            </div>
            <button
              onClick={() => {
                setSend("sending");
                setTimeout(() => setSend("sent"), 1500);
                setTimeout(() => setSend("idle"), 4500);
              }}
              style={{
                padding: "1.1rem 2.5rem",
                background: sendStatus === "sent" ? "var(--sage)" : "var(--text-main)",
                color: "var(--bg-void)", border: "none", borderRadius: 50,
                fontFamily: "'Outfit',sans-serif", fontSize: ".95rem", fontWeight: 600,
                opacity: sendStatus === "sending" ? 0.65 : 1, marginTop: ".5rem",
              }}
            >
              {sendStatus === "idle" ? "Send Message ✦" : sendStatus === "sending" ? "Sending…" : "Sent! ✓"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
