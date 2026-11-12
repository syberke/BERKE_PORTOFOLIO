"use client";

import { useEffect, useRef } from "react";
import { portfolioMedia } from "@/app/portfolio-media";

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
      <img className="nano-suit" src={portfolioMedia.spider} alt="" draggable="false" />
      <canvas className="nano-particles" ref={canvasRef} />
      <span className="nano-reactor" />
      <span className="nano-reactor-ring" />
      <span className="nano-cursor-note">NANO / ACTIVE</span>
    </span>
  );
}