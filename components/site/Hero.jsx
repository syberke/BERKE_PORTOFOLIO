"use client";

import { useEffect, useRef, useState } from "react";
import SpiderTransformation from "./SpiderTransformation";

const roles = ["Full-stack Developer", "Creative Technologist", "Digital Experience Maker"];

export default function Hero() {
  const portraitRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const isEngaged = isHovered || isTransformed;

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
    el.style.setProperty("--tilt-x", `${((0.5 - y) * 10).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((x - 0.5) * 14).toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--split", `${Math.min(88, Math.max(32, x * 100)).toFixed(1)}%`);
    el.style.setProperty("--drift-x", `${((x - 0.5) * 18).toFixed(1)}px`);
    el.style.setProperty("--drift-y", `${((y - 0.5) * 14).toFixed(1)}px`);
  }

  function resetPortrait() {
    const el = portraitRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
    el.style.setProperty("--split", "48%");
    el.style.setProperty("--drift-x", "0px");
    el.style.setProperty("--drift-y", "0px");
  }

  function shootWeb(event) {
    setPulse((v) => v + 1);
    setIsTransformed((current) => !current);
    const rect = event.currentTarget.getBoundingClientRect();
    const pointX = event.clientX || rect.left + rect.width * 0.52;
    const pointY = event.clientY || rect.top + rect.height * 0.38;
    window.dispatchEvent(new CustomEvent("berke:webshot", { detail: { x: pointX, y: pointY } }));
  }

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="ambient ambient-one" />
        <span className="ambient ambient-two" />
        <span className="hero-grid" />
      </div>
      <div className="hero-overline hero-enter">
        <span className="red-cross">✳</span> INDEPENDENT DEVELOPER <span className="hero-overline-divider">—</span> BEKASI, INDONESIA
      </div>
      <div className="hero-stage">
        <div className="hero-lettering" aria-hidden="true">
          <span className="hero-letter hero-letter-one">CREATIVE</span>
          <span className="hero-letter hero-letter-two">DEVELOPER</span>
        </div>
        <div className="portrait-scene" id="portrait-scene">
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-orbit orbit-outer" aria-hidden="true"><i /><i /><i /></div>
          <div className="portrait-orbit orbit-inner" aria-hidden="true" />
          <div className="portrait-flare" aria-hidden="true" />
          <div className="portrait-sparks" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="portrait-transform" id="portrait-transform">
            <button
              ref={portraitRef}
              className={`portrait-interactive${isEngaged ? " is-engaged" : ""}${isTransformed ? " is-transformed" : ""}`}
              type="button"
              aria-label={isTransformed ? "Return to original portrait" : "Reveal Spider-Man transformation"}
              aria-pressed={isTransformed}
              onPointerEnter={() => setIsHovered(true)}
              onPointerMove={movePortrait}
              onPointerLeave={() => {
                setIsHovered(false);
                resetPortrait();
              }}
              onFocus={() => setIsHovered(true)}
              onBlur={() => {
                setIsHovered(false);
                resetPortrait();
              }}
              onClick={shootWeb}
            >
              <span className="portrait-shell">
                <span className="portrait-cutout">
                  <img src="/images/berke-portrait.png" alt="Portrait of Berke Jaisyurrohman" draggable="false" />
                </span>
                <span className="portrait-depth" aria-hidden="true" />
                <span className="portrait-aura" aria-hidden="true" />
                <SpiderTransformation impact={pulse} />
                <span className="portrait-light" aria-hidden="true" />
                <span className="portrait-shine" aria-hidden="true" />
              </span>
              {pulse > 0 && <span className="portrait-ripple" key={pulse} aria-hidden="true" />}
              <span className="portrait-hint" aria-hidden="true">{isTransformed ? "TAP TO RETURN" : "TAP / CLICK TO TRANSFORM"} <span>✳</span></span>
            </button>
          </div>
          <span className="orbit-coordinate coord-top" aria-hidden="true">X.01—094</span>
          <span className="orbit-coordinate coord-bottom" aria-hidden="true">SPIDER SENSE / INTERACTIVE SIGNATURE</span>
        </div>
      </div>
      <div className="hero-content hero-enter">
        <div className="hero-identity">
          <span className="eyebrow"><span className="micro-line" /> THE PERSON BEHIND THE PIXELS</span>
          <h1 id="hero-heading">QIAGENG <span>BERKE</span><br />JAISYURROHMAN<span className="hero-stop">.</span></h1>
          <p className="hero-role"><span className="role-icon">↳</span> <span key={roleIndex} className="role-current">{roles[roleIndex]}</span></p>
        </div>
        <div className="hero-description">
          <p>Code meets curiosity.<br />I create digital experiences where <em>technology, purpose & imagination</em> come together.</p>
          <div className="hero-ctas"><a href="#projects" className="button button-primary magnetic">EXPLORE MY WORK <span aria-hidden="true">↗</span></a><a href="#contact" className="button button-ghost magnetic">LET’S CONNECT <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
      <div className="hero-bottom hero-enter"><span>SCROLL TO EXPLORE <span className="scroll-down">↓</span></span><span className="hero-index">PORTFOLIO / 2026</span><span className="hero-bottom-right">DESIGN <b>×</b> DEVELOPMENT</span></div>
    </section>
  );
}