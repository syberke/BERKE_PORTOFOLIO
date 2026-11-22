# Berke Portfolio — Art Direction V6

## References

- **The Lonely Pixel**: people-first storytelling, selected-work art direction and a clear path from identity to case studies.
- **Guillaume Zhu**: oversized kinetic typography, dramatic section handoffs and curious creative-development details.
- **nokaji.fr**: source wasn't accessible during research; no specific layout was copied or attributed to it.

All composition, CSS, motion timings, and visual ornament in this version are original.

## System

- Midnight editorial background (`#090a0d`), warm off-white typography, cobalt atmospheric lighting, and scarlet-orange light trails.
- Large Space Grotesk headlines, condensed micro-labels and restrained content density.
- Full-screen hero with original nano-cursor portrait, typographic depth, circular art-direction seal and analog studio details.
- Kinetic ticker between sections, asymmetric About and immersive gallery-like project cards.
- Native track scrolling and arrow navigation retained; GSAP only handles decorative parallax and entrance motion, not scrolling position.
- Motion never fades content away when scroll stops. Existing one-time content reveals remain independent.

## Editing

Data: `app/portfolio-data.js`
Portrait and nano-suit assets: `app/portfolio-media.js`
New art direction overrides: `app/atelier.css`
Decorative motion: `components/site/AtelierMotion.jsx`
Existing project filters, detail panels, email contact form and theme switch remain intact.

## QA

Run `npm ci`, `npm run lint`, and `npm run build` in a network-enabled build environment. Check mobile overflow, reduced motion and touch interactions in a real browser before public deployment.