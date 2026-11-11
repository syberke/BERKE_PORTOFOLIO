"use client";

import { useEffect, useRef, useState } from "react";

const roles = ["Full-stack Developer", "Creative Technologist", "Digital Experience Maker"];

export default function Hero() {
  const portraitRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3500);
    return () => clearInterval(timer);
  }, []);

  function movePortrait(event) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = portraitRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width;
    const y = (event.clientY - r.top) / r.height;
    el.style.setProperty("--tilt-x", `${((.5 - y) * 9).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((x - .5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
  }

  function resetPortrait() {
    const el = portraitRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  }

  function shootWeb(event) {
    setPulse((v) => v + 1);
    const rect = event.currentTarget.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent("berke:webshot", { detail: { x: rect.left + rect.width * .5, y: rect.top + rect.height * .44 } }));
  }

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true"><span className="ambient ambient-one"/><span className="ambient ambient-two"/><span className="hero-grid" /></div>
      <div className="hero-overline hero-enter"><span className="red-cross">✳</span> INDEPENDENT DEVELOPER <span className="hero-overline-divider">—</span> BEKASI, INDONESIA</div>
      <div className="hero-stage">
        <div className="hero-lettering" aria-hidden="true"><span className="hero-letter hero-letter-one">CREATIVE</span><span className="hero-letter hero-letter-two">DEVELOPER</span></div>
        <div className="portrait-scene" id="portrait-scene">
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-orbit orbit-outer" aria-hidden="true"><i/><i/><i/></div>
          <div className="portrait-orbit orbit-inner" aria-hidden="true" />
          <div className="portrait-flare" aria-hidden="true" />
          <div className="portrait-transform" id="portrait-transform">
            <button
              ref={portraitRef}
              className="portrait-interactive"
              type="button"
              aria-label="Play Spider-Man web interaction on portrait"
              onPointerMove={movePortrait}
              onPointerLeave={resetPortrait}
              onClick={shootWeb}
            >
              <span className="portrait-cutout">
                <img src="/images/portrait-placeholder.svg" alt="Artistic portrait placeholder for Berke; replace this local asset with a personal photo" draggable="false" />
                <span className="portrait-light" aria-hidden="true" />
              </span>
              {pulse > 0 && <span className="portrait-ripple" key={pulse} aria-hidden="true" />}
              <span className="portrait-hint" aria-hidden="true">HOVER / TAP TO INTERACT <span>↗</span></span>
            </button>
          </div>
          <span className="orbit-coordinate coord-top" aria-hidden="true">X.01—094</span>
          <span className="orbit-coordinate coord-bottom" aria-hidden="true">EXPLORE THE UNKNOWN / 001</span>
        </div>
      </div>
      <div className="hero-content hero-enter">
        <div className="hero-identity">
          <span className="eyebrow"><span className="micro-line" /> THE PERSON BEHIND THE PIXELS</span>
          <h1 id="hero-heading">QIAGENG <span>BERKE</span><br/>JAISYURROHMAN<span className="hero-stop">.</span></h1>
          <p className="hero-role"><span className="role-icon">↳</span> <span key={roleIndex} className="role-current">{roles[roleIndex]}</span></p>
        </div>
        <div className="hero-description">
          <p>Code meets curiosity.<br/>I create digital experiences where <em>technology, purpose & imagination</em> come together.</p>
          <div className="hero-ctas"><a href="#projects" className="button button-primary magnetic">EXPLORE MY WORK <span aria-hidden="true">↗</span></a><a href="#contact" className="button button-ghost magnetic">LET’S CONNECT <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
      <div className="hero-bottom hero-enter"><span>SCROLL TO EXPLORE <span className="scroll-down">↓</span></span><span className="hero-index">PORTFOLIO / 2026</span><span className="hero-bottom-right">DESIGN <b>×</b> DEVELOPMENT</span></div>
    </section>
  );
}