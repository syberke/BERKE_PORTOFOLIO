# Berke Portfolio

A project-led portfolio for Qiageng Berke Jaisyurrohman, built with Next.js 16 and React 19.

## Development

```sh
npm ci
npm run dev
```

Production:

```sh
npm run build
npm start
```

## Editing content

- `app/portfolio-data.js`: projects, stack groups, and services.
- `app/page.jsx`: biography, education, contact details, and the page sections.
- `app/globals.css`: responsive layout and light/dark tokens.
- `components/site/`: navigation/theme, project filters/briefs, and contact draft form.
- `app/fonts/`: self-hosted Manrope Latin variable font from `@fontsource-variable/manrope@5.3.0`, under the included SIL Open Font License.

The page is statically prerendered. Only interactive areas are client components. There are no runtime third-party font requests, animation engines, pointer-following effects, or canvas loops in the active route. Historical components and styles remain in the repository but are not imported by this page.

The theme follows the system preference until a visitor selects a theme, stored locally as `berke-theme`. Theme selection still works if browser storage is blocked.

## Contact behavior

The contact form validates its fields and prepares a `mailto:` draft. A second, explicit link opens the visitor's email application. It does **not** send mail or claim delivery. No message is stored on a server. Copying the email address has visible success/failure feedback, and the email and phone links are usable directly. A configured email application is needed for `mailto:`; otherwise visitors can copy the address and send manually.

## Content accuracy

Content comes from the previous portfolio. No project-specific repository or demo links were supplied, so the redesign does not invent them. The GitHub profile link is real. Research projects and encryption prototypes are described conservatively; production usage, security guarantees, and outcome metrics are not asserted. The IQRA visual is a labeled structural diagram, not a product screenshot.

See `docs/design-notes.md` for design rationale and `docs/verification.md` for validation evidence.
