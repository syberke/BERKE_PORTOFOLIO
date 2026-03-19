"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);

    let animId;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      rng.style.left = ring.current.x + "px";
      rng.style.top  = ring.current.y + "px";
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Expand on interactive elements
    const interactives = document.querySelectorAll(
      "a, button, .s-pip, .nav-logo, .contact-link-row, .proj-link"
    );
    const expand  = () => rng.classList.add("expanded");
    const shrink  = () => rng.classList.remove("expanded");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  />
      <div ref={ringRef} className="c-ring" />
    </>
  );
}