"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const NEXT_LOGO =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg";
const VERCEL_LOGO =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg";

const DOCKER_SKILL = {
  name: "Docker",
  type: "Containerization & DevOps",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  color: "#2496ed",
  description:
    "I use Docker to containerize applications, keep development environments consistent, and prepare services for more reliable deployment.",
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
      <rect width="128" height="128" rx="26" fill="#0A0B12"/>
      <rect x="1" y="1" width="126" height="126" rx="25" fill="none" stroke="#E8A34F" stroke-opacity=".7"/>
      <text x="64" y="73" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#FFFFFF">${initials}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setLogoFallback(image, label) {
  if (image.dataset.fallbackReady === "true") return;

  image.dataset.fallbackReady = "true";
  image.addEventListener("error", () => {
    if (image.dataset.usingFallback === "true") return;
    image.dataset.usingFallback = "true";
    image.src = fallbackLogo(label);
  });

  if (image.complete && image.naturalWidth === 0) {
    image.dataset.usingFallback = "true";
    image.src = fallbackLogo(label);
  }
}

function decorateSkillLogo(image) {
  const button = image.closest("button");
  const label = button?.getAttribute("aria-label") || "Technology";
  const normalizedLabel = label.toLowerCase();

  image.alt = `${label} logo`;
  image.loading = "lazy";
  image.decoding = "async";

  if (normalizedLabel.includes("next.js")) {
    image.src = NEXT_LOGO;
    image.classList.add("monochrome-skill-logo");
    button?.classList.add("monochrome-skill-node");
  }

  if (normalizedLabel.includes("vercel")) {
    image.src = VERCEL_LOGO;
    image.classList.add("monochrome-skill-logo");
    button?.classList.add("monochrome-skill-node");
  }

  setLogoFallback(image, label);
}

function makeLogosResilient() {
  document.querySelectorAll(".node-img-logo").forEach(decorateSkillLogo);

  document.querySelectorAll(".premium-sidebar-drawer img").forEach((image) => {
    const source = image.getAttribute("src")?.toLowerCase() || "";
    const isNext = source.includes("nextjs");
    const isVercel = source.includes("vercel");

    if (!isNext && !isVercel) return;

    image.alt = isNext ? "Next.js logo" : "Vercel logo";
    image.src = isNext ? NEXT_LOGO : VERCEL_LOGO;
    image.classList.add("monochrome-drawer-logo");
    image.parentElement?.classList.add("monochrome-drawer-logo-shell");
    setLogoFallback(image, isNext ? "Next.js" : "Vercel");
  });
}

function makeProjectsHeadingInteractive() {
  const heading = document.querySelector("#projects h2");
  if (!heading) return;

  heading.classList.add("projects-title-interactive");
  heading.tabIndex = 0;
  heading.setAttribute("aria-label", "Projects and Case Studies");

  if (heading.dataset.interactionReady === "true") return;
  heading.dataset.interactionReady = "true";

  heading.addEventListener("pointermove", (event) => {
    const bounds = heading.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    heading.style.setProperty("--title-x", `${x}%`);
    heading.style.setProperty("--title-y", `${y}%`);
  });

  heading.addEventListener("pointerleave", () => {
    heading.style.setProperty("--title-x", "50%");
    heading.style.setProperty("--title-y", "50%");
  });
}

function fixYearsCoding() {
  const cards = document.querySelectorAll("#skills-languages .two-col > div");

  cards.forEach((card) => {
    const label = Array.from(card.querySelectorAll("div")).find(
      (node) => node.textContent?.trim() === "Years Coding"
    );

    if (!label) return;

    const counter = card.querySelector(".counter-anim");
    if (!counter) return;

    counter.dataset.to = "3";
    counter.dataset.suffix = "";
    if (counter.textContent !== "3") counter.textContent = "3";
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
  if (
    skillHeading &&
    !skillHeading.textContent?.includes("Tech Stack Ecosystem")
  ) {
    skillHeading.innerHTML =
      "Tech Stack<br/><em style='color:var(--accent);font-style:italic'>Ecosystem</em>";
  }

  const languageLabel = languageSection?.querySelector(".scramble-text");
  if (languageLabel && languageLabel.textContent !== "Communication") {
    languageLabel.textContent = "Communication";
  }

  const languageHeading = languageSection?.querySelector("h2");
  if (languageHeading && !languageHeading.textContent?.includes("Languages I Use")) {
    languageHeading.innerHTML =
      "Languages<br/><em style='color:var(--accent);font-style:italic'>I Use</em>";
  }

  makeProjectsHeadingInteractive();
  fixYearsCoding();
}

export default function PortfolioEnhancer() {
  const [dockerMount, setDockerMount] = useState(null);
  const [showDocker, setShowDocker] = useState(false);
  const dockerFallback = useMemo(() => fallbackLogo("Docker"), []);

  useLayoutEffect(() => {
    let animationFrame = 0;

    const polish = () => {
      replaceCopy();
      makeLogosResilient();

      const grid = document.querySelector(
        "#skills-tech .pyramid-freestyle-grid"
      );
      const rows = grid?.querySelectorAll(".freestyle-tier-row");
      const lastRow = rows?.[rows.length - 1];

      if (grid && lastRow) {
        let mountNode = grid.querySelector(".docker-skill-slot");

        if (!mountNode) {
          mountNode = document.createElement("span");
          mountNode.className = "docker-skill-slot";
        }

        if (mountNode.parentElement !== lastRow) {
          lastRow.appendChild(mountNode);
        }

        setDockerMount(mountNode);
      }
    };

    const schedulePolish = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(polish);
    };

    polish();

    const observer = new MutationObserver(schedulePolish);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const timers = [350, 1000, 2500, 5000].map((delay) =>
      window.setTimeout(polish, delay)
    );

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useLayoutEffect(() => {
    if (!showDocker) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setShowDocker(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
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
              if (event.currentTarget.dataset.usingFallback === "true") return;
              event.currentTarget.dataset.usingFallback = "true";
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
              ✕
            </button>

            <div className="portfolio-skill-dialog-content">
              <div className="portfolio-skill-dialog-logo">
                <img
                  src={DOCKER_SKILL.logo}
                  alt="Docker logo"
                  onError={(event) => {
                    if (event.currentTarget.dataset.usingFallback === "true") return;
                    event.currentTarget.dataset.usingFallback = "true";
                    event.currentTarget.src = dockerFallback;
                  }}
                />
              </div>

              <h3 id="docker-skill-title">{DOCKER_SKILL.name}</h3>
              <div className="skill-type">{DOCKER_SKILL.type}</div>
              <div className="portfolio-skill-dialog-divider" />
              <p>{DOCKER_SKILL.description}</p>

              <div className="portfolio-skill-dialog-status">
                <span className="portfolio-status-label">Status</span>
                <strong>
                  <span className="portfolio-status-dot" /> Active Skill
                </strong>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
