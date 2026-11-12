"use client";

import { useEffect, useRef } from "react";

/**
 * Localized nano-suit reveal. No whole-photo takeover and no permanent transformation.
 * The texture is clipped to a small circle centred on the pointer, while the canvas
 * draws particles ONLY inside a nearby circular field. Touch/keyboard get a brief pulse.
 */
export default function NanoCursorField({ portraitRef }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const target = portraitRef.current;
    if (!root || !canvas || !target) return;
    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const particles = Array.from({ length: 66 }, (_, index) => {
      const theta = ((index * 137.50776) % 360) * Math.PI / 180;
      const radius = 18 + Math.sqrt((index + .5) / 66) * 114;
      return {
        theta,
        radius,
        phase: index * 1.893,
        speed: .25 + (index % 8) * .07,
        size: 1.2 + (index % 5) * .48,
        kind: index % 9,
      };
    });
    const state = {
      x: 0, y: 0, mx: 0, my: 0,
      active: false, visible: true, temporary: false,
      burstStart: 0, touchedAt: 0, frame: 0, timeout: 0,
      width: 0, height: 0,
      trail: [],
    };

    function resize() {
      const r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      state.width = r.width;
      state.height = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, r.width, r.height);
    }

    function setPosition(clientX, clientY) {
      const r = target.getBoundingClientRect();
      if (!r.width || !r.height) return;
      state.x = Math.min(r.width, Math.max(0, clientX - r.left));
      state.y = Math.min(r.height, Math.max(0, clientY - r.top));
      root.style.setProperty("--nano-x", `${state.x.toFixed(1)}px`);
      root.style.setProperty("--nano-y", `${state.y.toFixed(1)}px`);
    }

    function activate() {
      state.active = true;
      root.classList.add("nano-live");
      if (!state.frame && state.visible && !reduceMotion.matches) state.frame = requestAnimationFrame(render);
    }

    function deactivate() {
      if (state.temporary) return;
      state.active = false;
      root.classList.remove("nano-live", "nano-burst");
      state.trail.length = 0;
      if (state.frame) cancelAnimationFrame(state.frame);
      state.frame = 0;
      context.clearRect(0, 0, state.width, state.height);
    }

    function onEnter(event) {
      if (!finePointer.matches) return;
      setPosition(event.clientX, event.clientY);
      state.mx = state.x;
      state.my = state.y;
      activate();
    }

    function onMove(event) {
      if (event.pointerType === "touch") return;
      setPosition(event.clientX, event.clientY);
      if (!state.active) {
        state.mx = state.x;
        state.my = state.y;
        activate();
      }
      if (!reduceMotion.matches) {
        state.trail.push({ x: state.x, y: state.y });
        if (state.trail.length > 8) state.trail.shift();
      }
    }

    function burst(event) {
      if (typeof event?.clientX === "number" && event.clientX > 0 && event.clientY > 0) {
        setPosition(event.clientX, event.clientY);
      } else {
        const r = target.getBoundingClientRect();
        setPosition(r.left + r.width * .5, r.top + r.height * .42);
      }
      state.mx = state.x;
      state.my = state.y;
      state.burstStart = performance.now();
      root.classList.add("nano-burst");
      state.temporary = !finePointer.matches;
      activate();
      clearTimeout(state.timeout);
      state.timeout = window.setTimeout(() => {
        const wasTemporary = state.temporary;
        state.temporary = false;
        root.classList.remove("nano-burst");
        if (wasTemporary || (!target.matches(":hover") && document.activeElement !== target)) deactivate();
      }, 950);
    }

    function onPointerDown(event) {
      if (event.pointerType !== "touch") return;
      // Touch devices have no persistent hover; activate an ephemeral reveal at the tap.
      state.touchedAt = performance.now();
      burst(event);
    }

    function onClick(event) {
      if (performance.now() - state.touchedAt < 420) return;
      burst(event);
    }

    function onFocus() {
      if (finePointer.matches && target.matches(":hover")) return;
      const r = target.getBoundingClientRect();
      setPosition(r.left + r.width * .5, r.top + r.height * .42);
      state.mx = state.x;
      state.my = state.y;
      activate();
    }

    function onBlur() { deactivate(); }

    function render(timestamp) {
      state.frame = 0;
      if (!state.active || !state.visible || reduceMotion.matches) return;
      const { width, height } = state;
      if (!width || !height) return;
      state.mx += (state.x - state.mx) * .26;
      state.my += (state.y - state.my) * .26;
      const { mx, my } = state;
      const t = timestamp * .001;
      context.clearRect(0, 0, width, height);
      context.save();
      context.beginPath();
      context.arc(mx, my, 144, 0, Math.PI * 2);
      context.clip();

      // A fading web trail only near the current pointer, never across the page.
      if (state.trail.length > 1) {
        context.beginPath();
        state.trail.forEach((p, i) => {
          if (i === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        });
        context.strokeStyle = "rgba(251,183,196,.32)";
        context.lineWidth = 1.1;
        context.setLineDash([2, 6]);
        context.stroke();
        context.setLineDash([]);
      }

      // Tiny robotic cells orbit and assemble around the cursor with spring motion.
      particles.forEach((p) => {
        const a = p.theta + Math.sin(t * p.speed + p.phase) * .28;
        const radius = p.radius + Math.sin(t * 1.5 + p.phase) * 5;
        const x = mx + Math.cos(a) * radius;
        const y = my + Math.sin(a) * radius * .89;
        const alpha = Math.max(.04, (1 - radius / 150) * (.45 + Math.sin(t * 3 + p.phase) * .2));
        context.save();
        context.translate(x, y);
        context.rotate(a * .36 + t * .23);
        context.fillStyle = p.kind === 0 ? `rgba(230,244,255,${alpha * 1.3})` : `rgba(255,58,91,${alpha})`;
        const size = p.size;
        context.fillRect(-size / 2, -size / 2, size, size);
        if (p.kind === 3) {
          context.strokeStyle = `rgba(252,155,176,${alpha * .65})`;
          context.lineWidth = .8;
          context.strokeRect(-size * 1.2, -size * 1.2, size * 2.4, size * 2.4);
        }
        context.restore();
      });

      const elapsed = timestamp - state.burstStart;
      if (elapsed >= 0 && elapsed < 620) {
        const progress = elapsed / 620;
        const radius = 20 + progress * 145;
        context.beginPath();
        context.arc(mx, my, radius, 0, Math.PI * 2);
        context.lineWidth = 1.6 * (1 - progress) + .35;
        context.strokeStyle = `rgba(255,158,174,${.85 * (1 - progress)})`;
        context.stroke();
      }
      context.restore();
      state.frame = requestAnimationFrame(render);
    }

    const observer = new IntersectionObserver((entries) => {
      state.visible = Boolean(entries[0]?.isIntersecting);
      if (!state.visible && state.frame) {
        cancelAnimationFrame(state.frame);
        state.frame = 0;
      } else if (state.visible && state.active && !state.frame && !reduceMotion.matches) {
        state.frame = requestAnimationFrame(render);
      }
    }, { threshold: .01 });
    const resizer = new ResizeObserver(resize);
    resizer.observe(root);
    observer.observe(root);
    resize();

    target.addEventListener("pointerenter", onEnter);
    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", deactivate);
    target.addEventListener("pointerdown", onPointerDown, { passive: true });
    target.addEventListener("click", onClick);
    target.addEventListener("focus", onFocus);
    target.addEventListener("blur", onBlur);

    return () => {
      resizer.disconnect();
      observer.disconnect();
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", deactivate);
      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("click", onClick);
      target.removeEventListener("focus", onFocus);
      target.removeEventListener("blur", onBlur);
      clearTimeout(state.timeout);
      if (state.frame) cancelAnimationFrame(state.frame);
      context.clearRect(0, 0, state.width, state.height);
    };
  }, [portraitRef]);

  return (
    <span className="nano-field" ref={rootRef} aria-hidden="true">
      <svg className="nano-suit" viewBox="0 0 600 760" preserveAspectRatio="xMidYMid meet" focusable="false">
        <defs>
          <linearGradient id="nano-red" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f24f71" />
            <stop offset=".36" stopColor="#cb203d" />
            <stop offset=".75" stopColor="#650d26" />
            <stop offset="1" stopColor="#20071e" />
          </linearGradient>
          <radialGradient id="nano-core" cx=".45" cy=".33" r=".69">
            <stop stopColor="#ff8096" stopOpacity=".48"/>
            <stop offset=".7" stopColor="#e31437" stopOpacity=".16"/>
            <stop offset="1" stopColor="#070c16" stopOpacity="0"/>
          </radialGradient>
          <pattern id="nano-hex" width="28" height="24" patternUnits="userSpaceOnUse">
            <path d="M7 1 21 1 28 12 21 23 7 23 0 12Z" fill="none" stroke="#300913" strokeOpacity=".83" strokeWidth="2.2"/>
            <path d="M7 1 21 1 28 12" fill="none" stroke="#ff9cab" strokeOpacity=".45" strokeWidth=".9"/>
          </pattern>
          <clipPath id="nano-figure">
            <path d="M222 452 209 473 145 486Q79 513 55 567L9 748h584l-38-184q-16-48-79-76l-81-26-20-30-41 28-82 10Z" />
            <path d="M183 251q0-103 112-117 117 12 126 110l-8 113q-19 73-91 98-29 8-51-2-63-32-82-102Z" />
            <path d="M190 255Q151 185 214 135q24-65 100-63 99 3 116 84 24 30-8 120l-16-42q-4-36-23-67-44 9-79-9-48 31-100 13l-12 62Z" />
            <path d="M229 422q70 39 140 0l-4 54q-60 52-130 0Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#nano-figure)">
          <rect width="600" height="760" fill="url(#nano-red)" />
          <rect width="600" height="760" fill="url(#nano-core)" />
          <rect width="600" height="760" fill="url(#nano-hex)" />
          <g fill="none" stroke="#1c0617" strokeWidth="3" strokeOpacity=".66">
            <path d="M300 145v420M168 290q130 76 264 0M160 345q135 75 279 0M160 404q145 60 281 0M73 580q231 90 460 0M38 678q260 70 522 0"/>
            <path d="M300 145q-110 130-225 250M300 145q110 130 229 251M300 234 93 566M300 234l212 333M300 325 42 699M300 325l262 379"/>
          </g>
          <path d="M221 253q35-20 66 7-8 35-35 39-34 1-39-31Z" fill="#edf7ff" stroke="#18111f" strokeWidth="7" />
          <path d="M314 260q36-27 68-7l7 15q-7 32-39 31-26-4-36-39Z" fill="#edf7ff" stroke="#18111f" strokeWidth="7"/>
          <path d="M234 270q21-10 37 0m60 0q21-10 38 0" stroke="#a9d7ff" strokeWidth="3" fill="none" />
          <g stroke="#1a0b1a" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M301 553v55m-16-48 16 17 16-17-16-8Z" fill="#190b1b" />
            <path d="m296 565-33-20-17 6m50 26-35-2-21 24m56 1-42 17-13 26m65-78 33-20 17 6m-50 26 35-2 21 24m-56 1 42 17 13 26"/>
          </g>
        </g>
      </svg>
      <canvas className="nano-particles" ref={canvasRef} />
      <span className="nano-reactor" />
      <span className="nano-reactor-ring" />
      <span className="nano-cursor-note">NANO / ACTIVE</span>
    </span>
  );
}