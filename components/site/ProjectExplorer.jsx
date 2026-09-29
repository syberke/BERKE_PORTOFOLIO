"use client";

import { useEffect, useState } from "react";

const categories = ["All", "Web", "Mobile", "Security"];

export default function ProjectExplorer({ projects }) {
  const [category, setCategory] = useState("All");
  const [openedProject, setOpenedProject] = useState(null);

  useEffect(() => {
    function revealProject() {
      const id = window.location.hash.replace("#project-", "");
      if (projects.some((project) => project.id === id)) {
        setCategory("All");
        setOpenedProject(id);
        requestAnimationFrame(() =>
          document.getElementById(`project-${id}`)?.scrollIntoView(),
        );
      }
    }
    function followProjectLink(event) {
      const anchor = event.target.closest("a[href^='#project-']");
      if (!anchor) return;
      event.preventDefault();
      window.history.pushState(null, "", anchor.getAttribute("href"));
      revealProject();
    }
    revealProject();
    window.addEventListener("hashchange", revealProject);
    document.addEventListener("click", followProjectLink);
    return () => {
      window.removeEventListener("hashchange", revealProject);
      document.removeEventListener("click", followProjectLink);
    };
  }, [projects]);

  const visibleProjects = projects.filter(
    (project) => category === "All" || project.category === category,
  );

  return (
    <>
      <div className="project-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setOpenedProject(null);
              }}
            >
              {item}
              <span className="filter-count">
                {item === "All"
                  ? projects.length
                  : projects.filter((project) => project.category === item)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <span className="project-count" role="status">
          {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="project-list">
        {visibleProjects.length === 0 ? (
          <p className="empty-state">
            No projects in this category yet. Choose another category.
          </p>
        ) : (
          visibleProjects.map((project) => (
            <article
              className="project"
              id={`project-${project.id}`}
              key={project.id}
            >
              <button
                type="button"
                className="project-trigger"
                aria-expanded={openedProject === project.id}
                aria-controls={`brief-${project.id}`}
                onClick={() =>
                  setOpenedProject(
                    openedProject === project.id ? null : project.id,
                  )
                }
              >
                <span className="project-number">{project.number}</span>
                <span className="project-name">
                  <strong>{project.name}</strong>
                  <span>{project.context}</span>
                </span>
                <span className="project-category">{project.category}</span>
                <span className="project-year">{project.year}</span>
                <span className="expand-symbol" aria-hidden="true">
                  {openedProject === project.id ? "−" : "+"}
                </span>
              </button>
              <div
                id={`brief-${project.id}`}
                hidden={openedProject !== project.id}
                className="project-brief"
              >
                <div>
                  <p className="section-kicker">{project.organization}</p>
                  <h3>{project.description}</h3>
                  <p>{project.focus}</p>
                </div>
                <div>
                  <h4>Project scope</h4>
                  <ul>
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4>Built with</h4>
                  <p className="project-tools">{project.tools.join(" / ")}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
