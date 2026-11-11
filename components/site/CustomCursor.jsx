"use client";

import { useEffect, useRef } from "react";

const canUseCursor = () =>
  window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef(null);
  const webShot = useRef(null);
  const state = useRef({ x: -100, y: -100, rx: -100, ry: -100, vx: 0, vy: 0, lastX: -100, angle: 0, mode: false, points: [] });

  useEffect(() => {
    if (!canUseCursor()) return;
    const cursorDot = dot.current;
    const cursorRing = ring.current;
    const trace = trail.current;
    const line = webShot.current;
    if (!cursorDot || !cursorRing || !trace || !line) return;
    const s = state.current;
    let frame = 0;
    let shotTimer = 0;
    let visible = false;
    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e) {
      s.x = e.clientX;
      s.y = e.clientY;
      const photo = document.getElementById("portrait-scene");
      const rect = photo?.getBoundingClientRect();
      // Switch while approaching the actual portrait, not when hovering any link.
      const near = Boolean(rect && e.clientX >= rect.left - 36 && e.clientX <= rect.right + 36 && e.clientY >= rect.top - 28 && e.clientY <= rect.bottom + 28);
      s.mode = near;
      cursorDot.dataset.mode = near ? "spider" : "default";
      cursorRing.dataset.mode = near ? "spider" : "default";
      s.angle = Math.max(-20, Math.min(20, (s.x - s.lastX) * 0.65));
      s.lastX = s.x;
      if (!visible) {
        visible = true;
        cursorDot.style.opacity = "1";
        cursorRing.style.opacity = "1";
      }
    }

    function onLeave() {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
      visible = false;
      s.points = [];
      trace.setAttribute("d", "");
    }

    function onShot(e) {
      const target = e.detail;
      if (!target || !s.mode) return;
      line.setAttribute("d", `M ${s.rx} ${s.ry} Q ${s.rx + 14} ${s.ry - 45} ${target.x} ${target.y}`);
      line.style.opacity = "0.9";
      line.style.strokeDasharray = "3 8";
      line.style.animation = "web-fire 420ms ease-out forwards";
      window.clearTimeout(shotTimer);
      shotTimer = window.setTimeout(() => { line.style.opacity = "0"; line.style.animation = "none"; }, 440);
    }

    function paint() {
      // Position itself is instantaneous; only the decorative ring lags behind.
      cursorDot.style.transform = `translate3d(${s.x}px,${s.y}px,0) translate(-50%,-50%) rotate(${s.angle}deg)`;
      s.vx = (s.vx + (s.x - s.rx) * .11) * .72;
      s.vy = (s.vy + (s.y - s.ry) * .11) * .72;
      s.rx += s.vx;
      s.ry += s.vy;
      cursorRing.style.transform = `translate3d(${s.rx}px,${s.ry}px,0) translate(-50%,-50%)`;
      if (s.mode && visible) {
        s.points.push([s.x, s.y]);
        if (s.points.length > 9) s.points.shift();
        trace.setAttribute("d", s.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" "));
      } else if (s.points.length) {
        s.points.shift();
        trace.setAttribute("d", s.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" "));
      }
      frame = requestAnimationFrame(paint);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("berke:webshot", onShot);
    frame = requestAnimationFrame(paint);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(shotTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("berke:webshot", onShot);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <svg className="cursor-trail" width="100%" height="100%"><path ref={trail} className="trail-line" /><path ref={webShot} className="web-shot" /></svg>
      <div className="cursor-ring" ref={ring} data-mode="default" />
      <div className="cursor-dot" ref={dot} data-mode="default">
        <span className="cursor-core" />
        <svg className="spider-mask" viewBox="0 0 64 70" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 2C12 2 5 19 6 38c1 17 14 28 26 30 12-2 25-13 26-30C59 19 52 2 32 2Z" fill="#c51f32" stroke="#171119" strokeWidth="3"/>
          <path d="M32 4v62M7 31l50 0M11 18l42 35M53 18 11 53M19 7l13 24L45 7M16 60l16-29 16 29" stroke="#15191f" strokeWidth="2.2" fill="none" opacity=".85" />
          <path d="M11 28C17 24 23 25 30 33 26 42 20 45 11 41c-3-4-3-9 0-13ZM53 28C47 24 41 25 34 33c4 9 10 12 19 8 3-4 3-9 0-13Z" fill="white" stroke="#131923" strokeWidth="2.5"/>
          <path d="M12 33c5-1 11 1 15 3M52 33c-5-1-11 1-15 3" stroke="#b8e5ff" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    </div>
  );
}