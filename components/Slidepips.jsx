"use client";
import { useCallback } from "react";
import { SCENES } from "@/lib/data";

export function SlidePips({ active }) {
  const go = useCallback((id) => {
    const { gsap } = require("gsap");
    const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, { scrollTo: "#" + id, duration: 1.4, ease: "power3.inOut" });
  }, []);

  return (
    <div className="slide-pips">
      {SCENES.map((sc, i) => (
        <div
          key={sc.id}
          className={`pip${i === active ? " active" : ""}`}
          title={sc.label}
          onClick={() => go(sc.id)}
        />
      ))}
    </div>
  );
}

export function SceneLabel({ active }) {
  const sc = SCENES[active];
  return (
    <div className="scene-label">
      0{active + 1} / 0{SCENES.length} — {sc?.label}
    </div>
  );
}