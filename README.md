# Berke Cinematic Portfolio — Interactive Next.js Redesign

A redesign of `syberke/BERKE_PORTOFOLIO` that retains the existing six projects, five skill groups, six services, factual education/journey, email and phone details, project filters and briefs, contact draft behavior, and light/dark theme switch.

## Run

Prerequisites: Node.js 20.9+ (Node 22 recommended).

```bash
npm install
npm run dev
# Visit http://localhost:3000
npm run build
npm start
```

This project uses Next.js 16, React 19, GSAP and ScrollTrigger. There is no Three.js render loop and no Lenis scroll hijack. The animation system is isolated to `components/site/MotionDirector.jsx`, with GSAP context cleanup on unmount.

## Replace the placeholder with your photo

1. Copy your cutout portrait to `public/images/portrait.webp` (ideally a transparent-background WebP, around 900×1200px, 150–300 KB).
2. In `components/site/Hero.jsx` and `app/page.jsx`, replace the two references to `/images/portrait-placeholder.svg` with `/images/portrait.webp`.
3. Keep the image centered with `object-fit: contain`. The cursor proximity, tilt, spotlight, orbit, and scroll sequence will all work without other changes.

The included SVG is a **clearly labeled illustration**, not a likeness claimed to be you. Original repository content did not identify a portrait file. No fictional project screenshot, repository URL, live demo or experience metric has been fabricated.

## Edit data

- `app/portfolio-data.js` — all original projects, skill groups and services; add verified `github` or `demo` URLs to a project to reveal its external links.
- `app/page.jsx` — biography, contact links, journey, headings, factual statistics (computed directly from data).
- `app/globals.css` — colors, typography, responsive layout.
- `components/site/Header.jsx` — navigation, active section and preserved theme switch.
- `components/site/ProjectExplorer.jsx` — filter, scroll snap, expandable briefs and optional real external links.
- `components/site/ContactForm.jsx` — original form behavior: validates inputs and prepares a mailto draft, never claims to send.

## Interaction & accessibility

- Custom Spider-Man **SVG mask** pointer, delayed magnetic ring, tiny web trail and click shot appear only on fine-pointer desktop devices without reduced motion.
- Native pointer remains normal on touch and for reduced motion.
- Portrait is a focusable, clickable button. Project filters and briefs, mobile nav and skill disclosures are keyboard accessible.
- ScrollTrigger scenes reverse while scrolling up and clean up via `gsap.context(...).revert()`.
- The showcase uses native horizontal scrolling plus explicit arrow controls rather than wheel hijacking.
- Browser tab hidden throttles `requestAnimationFrame` naturally; no page-wide continuous 3D rendering.
- Optimized SVG visual props, responsive CSS, distinct section landmarks and accessible form labels.

## Notes / QA

Dependencies cannot be installed in the current offline generation environment. A production build has **not** been verified here; run `npm install && npm run build` in a network-connected environment before deploying. CSS is checked with PostCSS and JSX syntax with the TypeScript parser in the generation environment. This package contains the **active redesign files**. For the original GitHub repository, copy these files **over the existing checkout** instead of deleting its historical assets/components. The original runtime dependencies are retained in `package.json`.