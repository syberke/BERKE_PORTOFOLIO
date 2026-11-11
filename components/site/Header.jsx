"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills-tech"],
  ["Journey", "journey"],
  ["Services", "services"],
  ["Contact", "contact"],
];

export default function Header() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const menuButton = useRef(null);
  const progressBar = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progressBar.current) progressBar.current.style.transform = `scaleX(${Math.min(1, window.scrollY / maxScroll)})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
    const nodes = ["hero", ...links.map(([, id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActive(inView[0].target.id);
      },
      { rootMargin: "-24% 0px -45% 0px", threshold: [0, 0.1, 0.4, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("berke-theme", next); } catch { /* storage optional */ }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" id="site-header">
        <span ref={progressBar} className="page-progress" aria-hidden="true" />
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="wordmark" href="#hero" onClick={() => setOpen(false)} aria-label="Berke.dev — back to home">
            <span className="mark-square">B<span className="mark-period">.</span></span>
            <span className="mark-name">BERKE<span className="mark-divider">/</span>DEV</span>
          </a>
          <div className={`nav-links ${open ? "is-open" : ""}`} id="main-navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>
                <span className="nav-dot" aria-hidden="true" />{label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <span className="availability"><span className="availability-dot" /> OPEN TO COLLABORATE</span>
            <button className="theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggleTheme} type="button">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
              {open ? "CLOSE" : "MENU"}<span className="menu-icon" aria-hidden="true">{open ? "×" : "≡"}</span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

function SunIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>;
}
function MoonIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg>;
}