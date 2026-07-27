"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const DOCKER_SKILL = {
  name: "Docker",
  type: "Containerization & DevOps",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  description:
    "Containerizing applications, keeping development environments consistent, and preparing services for reliable deployment.",
};

function fallbackLogo(label) {
  const initials = label
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#171a2b"/>
      <rect x="1" y="1" width="126" height="126" rx="25" fill="none" stroke="#E8A34F" stroke-opacity=".55"/>
      <text x="64" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#E8A34F">${initials}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function makeLogosResilient() {
  document.querySelectorAll(".node-img-logo").forEach((image) => {
    const button = image.closest("button");
    const label = button?.getAttribute("aria-label") || "Technology";

    image.alt = `${label} logo`;
    image.loading = "lazy";
    image.decoding = "async";

    if (image.dataset.fallbackReady === "true") return;
    image.dataset.fallbackReady = "true";

    image.addEventListener("error", () => {
      if (image.dataset.usingFallback === "true") return;
      image.dataset.usingFallback = "true";
      image.src = fallbackLogo(label);
    });
  });
}

function replaceCopy() {
  const skillSection = document.querySelector("#skills-tech");
  const languageSection = document.querySelector("#skills-languages");

  const skillLabel = skillSection?.querySelector(
    ".freestyle-trigger-hook .scramble-text"
  );
  if (skillLabel && skillLabel.textContent !== "Technical Skills") {
    skillLabel.textContent = "Technical Skills";
  }

  const skillHeading = skillSection?.querySelector("h2");
  if (skillHeading && !skillHeading.dataset.copyPolished) {
    skillHeading.dataset.copyPolished = "true";
    skillHeading.innerHTML =
      "Tools &amp; Technologies<br/><em style='color:var(--accent);font-style:italic'>I Work With</em>";
  }

  const languageLabel = languageSection?.querySelector(".scramble-text");
  if (languageLabel && languageLabel.textContent !== "Communication") {
    languageLabel.textContent = "Communication";
  }

  const languageHeading = languageSection?.querySelector("h2");
  if (languageHeading && !languageHeading.dataset.copyPolished) {
    languageHeading.dataset.copyPolished = "true";
    languageHeading.innerHTML =
      "Languages<br/><em style='color:var(--accent);font-style:italic'>I Use</em>";
  }
}

export default function PortfolioEnhancer() {
  const [dockerMount, setDockerMount] = useState(null);
  const [showDocker, setShowDocker] = useState(false);
  const dockerFallback = useMemo(() => fallbackLogo("Docker"), []);

  useEffect(() => {
    let mountNode = null;

    const polish = () => {
      replaceCopy();
      makeLogosResilient();

      const grid = document.querySelector(
        "#skills-tech .pyramid-freestyle-grid"
      );

      if (grid && !grid.querySelector(".docker-skill-slot")) {
        mountNode = document.createElement("div");
        mountNode.className = "docker-skill-slot";
        grid.appendChild(mountNode);
        setDockerMount(mountNode);
      } else if (grid) {
        setDockerMount(grid.querySelector(".docker-skill-slot"));
      }
    };

    polish();
    const timers = [400, 1200, 3200].map((delay) =>
      window.setTimeout(polish, delay)
    );

    return () => {
      timers.forEach(window.clearTimeout);
      if (mountNode?.isConnected) mountNode.remove();
    };
  }, []);

  useEffect(() => {
    if (!showDocker) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setShowDocker(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showDocker]);

  const dockerButton = dockerMount
    ? createPortal(
        <button
          type="button"
          className="pyramid-freestyle-node docker-skill-node"
          aria-label="Docker"
          onClick={() => setShowDocker(true)}
        >
          <img
            className="node-img-logo"
            src={DOCKER_SKILL.logo}
            alt="Docker logo"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = dockerFallback;
            }}
          />
          <span className="node-hover-tag">Docker</span>
        </button>,
        dockerMount
      )
    : null;

  return (
    <>
      {dockerButton}
      {showDocker && (
        <div
          className="portfolio-skill-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowDocker(false);
          }}
        >
          <section
            className="portfolio-skill-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="docker-skill-title"
          >
            <button
              type="button"
              className="portfolio-skill-dialog-close"
              aria-label="Close Docker detail"
              onClick={() => setShowDocker(false)}
            >
              ×
            </button>
            <img
              src={DOCKER_SKILL.logo}
              alt="Docker logo"
              onError={(event) => {
                event.currentTarget.src = dockerFallback;
              }}
            />
            <h3 id="docker-skill-title">{DOCKER_SKILL.name}</h3>
            <div className="skill-type">{DOCKER_SKILL.type}</div>
            <p>{DOCKER_SKILL.description}</p>
          </section>
        </div>
      )}
    </>
  );
}
