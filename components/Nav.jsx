"use client";
export default function Nav({ isDark, setIsDark }) {
  const items = ["About", "Services", "Projects", "Skills", "Contact"];
  return (
    <nav
      id="main-nav"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "1.1rem 3rem", display: "flex", justifyContent: "space-between",
        alignItems: "center", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        borderBottom: "2px solid transparent", background: "transparent",
      }}
    >
      <div
        className="nav-logo-text"
        style={{
          fontSize: "1.5rem", letterSpacing: "-0.5px",
          color: isDark ? "var(--text-main)" : "#251B12",
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 700,
          transition: "color 0.4s ease",
        }}
      >
        Berke<span style={{ color: "var(--accent)" }}>.dev</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
          {items.map((s) => (
            <li key={s}>
              <a
                href={`#${s.toLowerCase()}`}
                className={`nlink ${s === "Contact" ? "ncta" : ""}`}
                style={{ color: s !== "Contact" && !isDark ? "#251B12" : "" }}
              >
                {s === "Contact" ? "Hire Me ↗" : s}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle Theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
