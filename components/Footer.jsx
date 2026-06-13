"use client";
export default function Footer() {
  const base = { fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 500, color: "var(--text-muted)" };
  return (
    <footer
      style={{
        background: "var(--bg-void)", borderTop: "1px solid var(--border)",
        padding: "1.8rem 3rem", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 3,
      }}
    >
      <p style={base}>© 2026 <span style={{ color: "var(--text-main)" }}>Berke Jaisyurrohman</span>. Bekasi, Indonesia.</p>
      <p style={base}>
        Built with <span style={{ color: "var(--accent)" }}>Next.js</span> ·{" "}
        <span style={{ color: "var(--gold)" }}>GSAP</span> ·{" "}
        <span style={{ color: "var(--cyan)" }}>20 Animations ✓</span>
      </p>
      <p style={{ ...base, display: "flex", alignItems: "center", gap: ".5rem" }}>
        <span style={{ color: "var(--sage)" }}>●</span> Available for collaboration
      </p>
    </footer>
  );
}