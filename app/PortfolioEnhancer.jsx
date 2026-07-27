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

function whiteBrandLogo(label) {
  const isVercel = label.toLowerCase().includes("vercel");
  const svg = isVercel
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#fff" d="M64 18 116 108H12L64 18Z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="51" fill="none" stroke="#fff" stroke-width="8"/><path fill="#fff" d="M39 39h12l38 50V39h10v64H88L49 52v51H39V39Z"/></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function makeLogosResilient() {
  document.querySelectorAll(".node-img-logo").forEach((image) => {
    const button = image.closest("button");
    const label = button?.getAttribute("aria-label") || "Technology";
    const normalizedLabel = label.toLowerCase();

    image.alt = `${label} logo`;
    image.loading = "lazy";
    image.decoding = "async";

    if (normalizedLabel.includes("next.js") || normalizedLabel.includes("vercel")) {
      image.src = whiteBrandLogo(label);
      image.dataset.brandWhite = "true";
    }

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
  const projectsSection = document.querySelector("#projects");

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
      "Tech Stack<br/><em style='color:var(--accent);font-style:italic'>Ecosystem</em>";
  }

  const projectHeading = projectsSection?.querySelector("h2");
  if (projectHeading) {
    projectHeading.classList.add("projects-heading-active");
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

  document.querySelectorAll("#skills-languages [style*='font-size']").forEach((node) => {
    if (node.textContent?.trim() === "2") {
      const parentText = node.parentElement?.textContent || "";
      if (parentText.includes("Years Coding")) node.textContent = "3";
    }
  });
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
      const rows = grid?.querySelectorAll(".freestyle-tier-row");
      const finalRow = rows?.[rows.length - 1];

      if (finalRow && !finalRow.querySelector(".docker-skill-slot")) {
        mountNode = document.createElement("div");
        mountNode.className = "docker-skill-slot";
        finalRow.appendChild(mountNode);
        setDockerMount(mountNode);
      } else if (finalRow) {
        setDockerMount(finalRow.querySelector(".docker-skill-slot"));
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
      <div
        className={`portfolio-skill-dialog-backdrop ${showDocker ? "backdrop-active" : ""}`}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowDocker(false);
        }}
      />
      <aside
        className={`portfolio-skill-dialog ${showDocker ? "drawer-active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!showDocker}
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
        <div className="skill-eyebrow">Technical Skill</div>
        <h3 id="docker-skill-title">{DOCKER_SKILL.name}</h3>
        <div className="skill-type">{DOCKER_SKILL.type}</div>
        <p>{DOCKER_SKILL.description}</p>
      </aside>
    </>
  );
}
