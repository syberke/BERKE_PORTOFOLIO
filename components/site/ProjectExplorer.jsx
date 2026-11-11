"use client";

import { useEffect, useRef, useState } from "react";

const categories = ["All", "Web", "Mobile", "Security"];

function notifyLayout() {
  requestAnimationFrame(() => window.dispatchEvent(new Event("portfolio:layout")));
}

export default function ProjectExplorer({ projects }) {
  const [filter, setFilter] = useState("All");
  const [opened, setOpened] = useState(null);
  const trackRef = useRef(null);
  const visible = projects.filter((project) => filter === "All" || project.category === filter);

  useEffect(() => {
    function openHash() {
      const hash = window.location.hash;
      if (!hash.startsWith("#project-")) return;
      const id = hash.slice(9);
      if (!projects.some((project) => project.id === id)) return;
      setFilter("All");
      setOpened(id);
      notifyLayout();
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" })));
    }
    function followLink(e) {
      const link = e.target.closest?.('a[href^="#project-"]');
      if (!link) return;
      e.preventDefault();
      history.pushState(null, "", link.getAttribute("href"));
      openHash();
    }
    window.addEventListener("hashchange", openHash);
    document.addEventListener("click", followLink);
    openHash();
    return () => { window.removeEventListener("hashchange", openHash); document.removeEventListener("click", followLink); };
  }, [projects]);

  function chooseFilter(next) {
    setFilter(next);
    setOpened(null);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
    notifyLayout();
  }
  function toggle(id) {
    setOpened((current) => current === id ? null : id);
    notifyLayout();
  }
  function scroll(direction) {
    if (!trackRef.current) return;
    const item = trackRef.current.querySelector(".project-card");
    const amount = (item?.getBoundingClientRect().width || 460) + 22;
    trackRef.current.scrollBy({ left: direction * amount, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div className="project-explorer">
      <div className="project-controls" data-reveal>
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button key={category} type="button" aria-pressed={filter === category} onClick={() => chooseFilter(category)}>
              {category} <sup>{category === "All" ? projects.length : projects.filter((item) => item.category === category).length}</sup>
            </button>
          ))}
        </div>
        <div className="project-arrows" aria-label="Scroll project showcase">
          <span className="project-count" role="status">{String(visible.length).padStart(2, "0")} SELECTED</span>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll to previous projects">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll to next projects">→</button>
        </div>
      </div>
      <div className="project-track" ref={trackRef} tabIndex={0} aria-label="Horizontally scrollable project showcase">
        {visible.map((project) => (
          <article key={project.id} id={`project-${project.id}`} className={`project-card project-${project.id}`}>
            <div className={`project-art art-${project.id}`}>
              <ProjectArt project={project}/>
              <div className="project-art-top"><span>{project.number} / {project.category.toUpperCase()}</span><span>SELECTED WORK © {project.year}</span></div>
              <span className="art-side-label">{project.context.toUpperCase()}</span>
              <span className="art-footnote">CONCEPTUAL PROJECT VISUAL · NOT A SCREENSHOT</span>
            </div>
            <div className="project-card-info">
              <div className="project-card-meta"><span>{project.organization}</span><span>{project.year}</span></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <button className="project-view" type="button" aria-expanded={opened === project.id} aria-controls={`brief-${project.id}`} onClick={() => toggle(project.id)}>
                <span className="project-view-icon">{opened === project.id ? "−" : "↗"}</span><span>{opened === project.id ? "CLOSE PROJECT" : "VIEW PROJECT"}</span>
              </button>
            </div>
            <div className="project-brief" id={`brief-${project.id}`} hidden={opened !== project.id}>
              <div><span className="eyebrow">PROJECT INTENT</span><p>{project.focus}</p></div>
              <div><span className="eyebrow">SCOPE</span><ul>{project.scope.map((s) => <li key={s}>{s}</li>)}</ul></div>
              {(project.github || project.demo) && <div className="project-real-links">
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>}
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">LIVE DEMO ↗</a>}
              </div>}
            </div>
          </article>
        ))}
      </div>
      <div className="showcase-hint"><span>DRAG, SWIPE OR USE ARROWS TO EXPLORE</span><span>← —— →</span></div>
    </div>
  );
}

function ProjectArt({ project }) {
  switch (project.id) {
    case "iqra": return <div className="art-device art-dashboard parallax-art"><div className="mock-title">IQRA <span>↗</span></div><div className="mock-side"/><div className="mock-main"><span className="mock-chip">Overview</span><div className="mock-stat-row"><b>01<span>TEACHERS</span></b><b>02<span>STUDENTS</span></b><b>03<span>PARENTS</span></b></div><div className="mock-progress"><i/><i/><i/><i/></div></div></div>;
    case "bansos": return <div className="art-device art-bansos-device parallax-art"><span className="art-bansos-label">DISTRIBUTION / SYSTEM</span><div className="bansos-columns"><span/><span/><span/><span/><span/></div><div className="bansos-chart"><i/><i/><i/><i/><i/><i/><i/><i/></div><span className="bansos-large">DATA<span>→</span>IMPACT</span></div>;
    case "kajianqu": return <div className="art-phone parallax-art"><div className="phone-notch"/><div className="phone-caption">KAJIANQU <span>•••</span></div><div className="phone-arabic" lang="ar">اقْرَأْ</div><div className="phone-trans">Learn. Reflect. Grow.</div><div className="phone-lines"><span/><span/><span/></div><div className="phone-bottom">◈ &nbsp; ◌ &nbsp; ◇</div></div>;
    case "attendance": return <div className="art-device art-attendance-device parallax-art"><div className="attendance-head">DORMITORY <span>ATTENDANCE</span></div>{["01", "02", "03", "04"].map((i) => <div className="attendance-row" key={i}><b>{i}</b><span/><em>CHECKED</em></div>)}</div>;
    case "commerce": return <div className="commerce-art parallax-art"><span className="commerce-top">COMMERCE / PLATFORM</span><div className="commerce-boxes"><i/><i/><i/></div><span className="commerce-title">THE DIGITAL<br/>STOREFRONT<span>↗</span></span></div>;
    default: return <div className="cipher-art parallax-art"><span className="cipher-head">BAZMA CIPHER</span><span className="cipher-letters">A0F9<br/>X4B2<br/>7D8E</span><span className="cipher-key">ENCRYPT / EXPLORE / UNDERSTAND</span></div>;
  }
}