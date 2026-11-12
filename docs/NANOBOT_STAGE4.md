# Stage 4 — Localized Nanobot Cursor Reveal

The hero uses a new original SVG editorial illustration (`public/images/creative-portrait.svg`) instead of showing another person's photograph as Berke. This is a **replaceable illustration, not a photograph of Berke**. It can be replaced with a user-approved photo, but the replacement should use the same framing and dimensions; adapt the clipping paths in `NanoCursorField.jsx` for a different silhouette.

## Interaction

- Fine-pointer / mouse: a small red nanobot suit field is centered on the live pointer. No entire-image takeover is possible.
- Mouse move: the suit material and a 66-particle swarm follow the pointer. The web trail stays clipped to the same localized field.
- Mouse click: an ~620ms pulse briefly grows the reveal circle; no persistent toggle.
- Touch: tap generates a short-lived field at the finger position, then fades back out automatically.
- Keyboard: focus shows a centered field; Enter/Space triggers the same pulse.
- Reduced-motion: texture and focus ring remain, but particle canvas and continuous ring rotation are disabled.

## Performance / maintenance

The `<canvas>` uses `requestAnimationFrame` only while the portrait is visible and active, caps DPR at 1.65, uses a fixed set of particles, and disconnects `IntersectionObserver`, `ResizeObserver`, listeners, RAF, and timeouts on teardown. The rest of the portfolio, its navigation, projects, form, and legacy components remain unchanged.

Stage 3 `SpiderTransformation.jsx` remains in the repository for historical reference but is no longer imported into the active hero.

## Validation

Run `npm ci && npm run lint && npm run build` on a machine with dependency access. Confirm pointer, touch, keyboard, reduced-motion, and resize behavior in a browser before publishing as a finished visual release.