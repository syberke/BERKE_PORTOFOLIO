# Design notes

Brief: remake the existing programming and IT portfolio with a clean design and good performance, using the supplied anti-slop rules during design and implementation.

Reading this as a programmer's portfolio for technical recruiters and potential collaborators, in an editorial engineering style. ENERGY 2 / RHYTHM 3 / MOTION 1.

## Decisions and purposes

- Composition: large typographic introduction, one featured system, a project index, expandable technical groups, biography/timeline, service rows, and contact. These organize the existing content by evidence, capability, person, and next action.
- Palette: cool white and charcoal establish readable working surfaces; cobalt emphasizes the main action and second headline. The darker IQRA figure separates the structural diagram from the written brief.
- Typography: Manrope's open forms keep technical descriptions readable; its compact geometric shapes give the large heading a confident developer identity. One self-hosted variable Latin file covers all weights.
- Identity motif: numbered project and section references turn the page into an engineering work index. The numbers are navigation/order, not invented performance statistics.
- Spacing: wide section gaps separate subjects; compact project rows support scanning and comparison. Biography uses a different two-column rhythm.
- Containers: only the featured project needs a grouped panel. Projects and services use rows rather than an interchangeable feature-card grid.
- Diagram: the IQRA roles, school monitoring, and memorization tracking come from the old project's content. The figure explains that relationship and explicitly says it is not a screenshot.
- Icons: only sun and moon for the existing theme control; no generic decorative icon collection. Plus/minus indicates expansion. Direction arrows indicate scrolling or external destinations.
- Motion: hover feedback and native smooth anchor scrolling only, disabled by reduced-motion preference. Content is never hidden until a reveal animation finishes.
- Themes: system preference is respected by default; the existing manual light/dark option persists across visits. No forced dark aesthetic.
- Content: retained existing identity, project subjects, education, stack, services, email, and phone. Removed unsubstantiated mastery, production count, and security claims; made prototype/research status explicit.
- Contact: replaced simulated delivery with an honest email-draft workflow, validation, an explicit email-app handoff, and clipboard failure feedback.
- Performance: server-rendered sections and three client islands; no active GSAP, Spline, WebGL, polling, cursor tracking, or runtime font CDN. The existing package manager and dependency lockfile are preserved.

## Rule source

Applied the core rules supplied by the user from https://github.com/miqdadbadjuber/anti-slop/blob/main/antislop.md (read at commit/blob `3aecf91e84a8575c249f1b1b5deb150acdf9414e`). No installation or changes to project agent instructions were needed. The user explicitly selected use during UI/UX creation and provided clean, programming/IT-oriented direction.
