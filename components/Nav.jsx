"use client";
import { useCallback } from "react";

const LINKS = [
  { href: "#scene-hero",    label: "Home"    },
  { href: "#scene-about",   label: "About"   },
  { href: "#scene-proj-1",  label: "Work"    },
  { href: "#scene-skills",  label: "Skills"  },
  { href: "#scene-contact", label: "Contact" },
];

export default function Nav() {
  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    // Dynamic require keeps GSAP client-only
    const { gsap } = require("gsap");
    const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, { scrollTo: href, duration: 1.4, ease: "power3.inOut" });
  }, []);

  return (
    <nav className="nav">
      <div className="nav-logo">Berke.dev</div>
      <ul className="nav-links">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={(e) => scrollTo(e, l.href)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}