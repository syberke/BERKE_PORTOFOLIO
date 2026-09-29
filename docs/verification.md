# Verification and anti-slop delivery gate

Tested against the local Next.js production build. This is not a claim about the deployed website or real-user Core Web Vitals.

## Build and performance

- PASS: `npm ci` and `npm run build`; Next.js prerenders `/` as a static route.
- PASS: browser console and page-error listeners recorded no errors throughout interaction checks.
- PASS: no GSAP, Spline, WebGL, or continuous animation loops are imported by the active page. The one animation frame in project navigation waits for the expanded content to render before scrolling.
- PASS: a single self-hosted 24.8 KB Manrope Latin variable font; no runtime third-party font or icon CDN requests.
- Measured Lighthouse results are in `performance.json`; these are a single local mobile lab run, not a production SLA or an improvement claim over a measured baseline.

## Recorded interaction checks

- Keyboard Tab exposes the skip link; Enter moves to main content.
- Desktop Projects, Skills, About, Services, and Contact links navigate to their corresponding existing anchors.
- Header wordmark and hero View my projects navigate correctly.
- All/Web/Mobile/Security filters show 6/3/2/1 project records and update their pressed states.
- All six project buttons open and close their corresponding briefs; visibility agrees with `aria-expanded`.
- The featured IQRA link opens the matching brief, including a repeat activation after manually closing it.
- All five skill summaries expand and collapse their content.
- Empty form and malformed email cannot produce a draft.
- Valid input creates the expected URL-encoded recipient, subject, message, name, and reply address.
- The draft handoff link was clicked with its external handler intercepted. Actual email sending is intentionally not part of this test.
- Editing a field removes a stale draft link.
- Copy email produces success feedback; a forced clipboard rejection produces a visible fallback address.
- In both themes the mobile menu opens, Escape closes it and returns focus to Menu, and all five links navigate and close the menu.
- Back to top navigates to the hero.
- The theme control changes both ways, and the selected theme survives reload.
- External GitHub, email, and phone URLs were inspected; GitHub targets use `noopener noreferrer`. Email/call handlers and availability of external services depend on the visitor's device and were not asserted as end-to-end delivery tests.

## Layout and accessibility

- PASS: no page-level horizontal overflow at 320, 375, 390, 768, 1024, and 1440 pixels in light and dark themes.
- PASS: 200% root text size has no page overflow at 390 and 1440 pixels.
- PASS: axe-core 4.13.0 reports zero violations for WCAG 2 A/AA and WCAG 2.1 AA in both mobile themes. Automated checks are not a substitute for a complete manual accessibility audit.
- PASS: native buttons, inputs, links, and disclosures; explicit form labels; visible keyboard focus; minimum 44-pixel primary controls; reduced-motion override.
- Screenshots: `preview-desktop.png`, `preview-desktop-dark.png`, `preview-mobile-light.png`, `preview-mobile-dark.png`.
- Full browser assertions: `browser-checks.json`.

## Anti-slop: hard gates

| Rule | Status | Evidence |
| --- | --- | --- |
| R-02 | PASS | Authored visible page, data, and interactive-component copy contains no em dash. |
| R-03 | PASS | Both themes checked at six viewport widths; text enlargement checked separately. |
| R-17 | PASS | Counts derive directly from the six project records; no invented usage, uptime, or performance counters. |
| R-18 | PASS | No testimonial section or invented customer identities. |
| R-23 | PASS | Existing text wordmark, identity and navigation subjects reused; no fabricated portrait/logo; IQRA figure is an explicitly labeled content diagram. |
| R-24 | PASS | All navigation anchors resolve to rendered sections. |
| R-25 | PASS | Contrast checked by axe in both themes; no violations. |
| R-26 | PASS | Filters, disclosures, themes, navigation, draft and clipboard behavior exercised; external protocol limitations documented above. |
| R-27 | PASS | Project empty state exists; contact validation and clipboard error states verified. Content is local/static, so there is no asynchronous data-fetch loading state to simulate. |
| R-28 | PASS | No invented FAQ. |
| R-32 | PASS | Native keyboard controls, skip-link test, Escape/focus-return test, and visible focus rules. |
| R-33 | PASS | Features implemented directly in JSX/CSS; no source-rewriting helper scripts shipped. |
| R-34 | PASS | Light/dark screenshots, theme persistence test, viewport and axe checks in both themes. |
| R-35 | PASS | Production build and browser click-through recorded above, with external handoff boundaries stated explicitly. |
| R-36 | PASS | No invented security, compliance, customer, or performance guarantees. Lab metrics are labeled as local measurements. |
| R-37 | PASS | Applied the user's explicit clean programming/IT direction during creation; design read and dials documented in design-notes.md. |
| R-38 | PASS | Identity, stack and projects sourced from the previous portfolio. Research/prototype claims are qualified; no fake screenshots or project URLs. |

## Anti-slop: purpose gates

| Rule | Status | Evidence |
| --- | --- | --- |
| R-01 | PASS | Cobalt identifies headline/action hierarchy; no decorative gradients. |
| R-04 | PASS | Sun/moon are functional theme symbols; plus/minus indicates disclosure. |
| R-06 | PASS | Readable self-hosted Manrope chosen for the engineering/editorial direction; no terminal typography. |
| R-07 | PASS | No decorative grid, blueprint, or dot background. |
| R-08 | PASS | Arrows identify direction/external links selectively, not every action. |
| R-09 | PASS | No invented status or promotional badges. |
| R-10 | PASS | No glass or backdrop blur. |
| R-12 | PASS | No blanket elevation/shadow effects. |
| R-13 | PASS | No glow effects. |
| R-14 | PASS | Featured system, project index, skill disclosures and timeline have different content-specific layouts. |
| R-19 | PASS | MOTION 1: feedback and anchor scrolling only, with reduced-motion support. |
| R-22 | PASS | The labeled IQRA relationship diagram uses supplied project content; no generic illustration. |

## Anti-slop: liveliness

- PASS: ENERGY 2 / RHYTHM 3 / MOTION 1 are explicit in the design read.
- PASS: oversized opening typography, a split system feature, compact project index, skill disclosures and biography timeline match the declared varied rhythm.
- PASS: each major section has a clear heading/focal point; subordinate text is differentiated by size and contrast.
- PASS: broad section whitespace and compact row spacing distinguish reading from scanning.
- PASS: one cobalt accent identifies primary hierarchy and interactions.
- PASS: repeated numbered references form the portfolio's work-index motif.
- PASS: design direction and its rationale are documented in design-notes.md.

## Anti-slop: craftsmanship and quality locks

| Rule | Status | Evidence |
| --- | --- | --- |
| C-1 / R-31 | PASS | One-line reasons for palette, type, spacing, composition, icons, motion, diagrams and behavior are documented. |
| C-2 | PASS | Interaction checks recorded; no simulated send-success state. |
| C-3 | PASS | Existing content reorganized around work, capability, background and contact. |
| C-4 | PASS | Responsive, theme, clipboard-error, validation, text-size and keyboard checks completed. |
| C-5 | PASS | No invented testimonials, deployment metrics or audited security claims. |
| R-05 | PASS | Content-led index and system feature, not a generic hero/card/testimonial/pricing template. |
| R-11 | PASS | Compact 3–4px control radii; circular theme button is the functional exception. |
| R-15 | PASS | Specific actions: View my projects, Read the project brief, Prepare email, Copy email address. |
| R-16 | PASS | Descriptions use concrete project subjects; no prohibited marketing buzzwords. |
| R-20 | PASS | Work-index typography and the IQRA system diagram are tied to this developer's actual project subjects. |
| R-21 | PASS | System theme followed by default, with a tested persistent manual toggle. |
| R-29 | PASS | Neutral surfaces plus a cobalt/navy family; no rainbow technology cards. |
| R-30 | PASS | No named-product clone used as the page template. |
