"use client";
import { useState, useCallback } from "react";
import Cursor from "./Cursor";
import Nav from "./Nav";
import { SlidePips, SceneLabel } from "./SlidePips";
import {
  HeroScene, AboutScene, ProjectScene, SkillsScene, ContactScene,
} from "./Scenes";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { PROJECTS, SKILLS } from "@/lib/data";

export default function Portfolio() {
  const [active, setActive]       = useState(0);
  const [submitStatus, setSubmit] = useState("idle");

  // Register all GSAP ScrollTrigger animations
  useScrollAnimations(setActive);

  const handleSubmit = useCallback(() => {
    setSubmit("sending");
    setTimeout(() => setSubmit("sent"),  1500);
    setTimeout(() => setSubmit("idle"),  4500);
  }, []);

  return (
    <>
      {/* ── Fixed UI ── */}
      <Cursor />
      <Nav />
      <SlidePips active={active} />
      <SceneLabel active={active} />

      {/* ── Noise + Progress ── */}
      <div className="noise-overlay" />
      <div className="scroll-progress">
        <div id="scroll-progress-bar" style={{ height: "100%", background: "var(--paper)", width: "0%" }} />
      </div>

      {/* ── Scenes ── */}
      <main>
        <HeroScene />
        <AboutScene />

        {PROJECTS.map((proj) => (
          <ProjectScene key={proj.num} project={proj} />
        ))}

        <SkillsScene skills={SKILLS} />

        <ContactScene
          onSubmit={handleSubmit}
          submitStatus={submitStatus}
        />
      </main>
    </>
  );
}