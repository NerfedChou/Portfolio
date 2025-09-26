# Jan Rhian Angulo — Portfolio

A modern, high-contrast personal portfolio for Mr. Jan Rhian Angulo (Fullstack Developer).  
Built with semantic HTML, responsive CSS, and small vanilla JavaScript utilities for animations, a typewriter, glassy sheen effects, and interactive skill details.

## Features
- Full-screen hero with overlay and animated typewriter roles.
- Glassy navigation and CTA sheen animation (reusable via `.glassy` + `startGlassyCycle()`).
- Accessible header and mobile hamburger (ARIA, skip link, focus-visible).
- About card with portrait and interactive skills:
  - Hover/tap a skill to reveal a portrait-side panel with typed description.
  - Progress bars animate when the skills enter the viewport (IntersectionObserver).
- Respect for `prefers-reduced-motion`.

## Quick start
1. Clone or copy the project into your environment:
   - Project root: `/home/chef/WebstormProjects/Portfolio`
2. Serve the folder or open `index.html` in a browser:
   - Simple local server: `npx http-server` or `python -m http.server` from the project folder.
3. Ensure `assets/me.jpeg` exists and the path matches `/assets/me.jpeg` (or update CSS).

## Important files
- index.html — page markup (logo, hero, about card, skills).
- css/base.css — color variables and basic tokens (edit `--accent` for orange).
- css/styles.css — core styles and components.
- css/responsive.css — all breakpoint rules (centralized).
- js/animation.js — animations and interactive behaviors:
  - `startGlassyCycle(selector, intervalMs)` — starts sheen cycle on elements.
  - Typing routine for the hero and portrait panel (cancellable).
  - IntersectionObserver to reveal skill progress bars when visible.
  - Skill → portrait wiring (pointer/click/hover handling with suppression to avoid accidental closes).
- assets/me.jpeg — hero/about portrait (replace with your photo).

## Customization
- Change accent color:
  - Edit `--accent` in `css/base.css`.
- Change hero image:
  - Replace `/assets/me.jpeg` or update the `background-image` in `.hero-section` (styles.css).
- Edit roles/typewriter:
  - Modify roles array in `js/animation.js` (typewriter setup).
- Edit skills:
  - In `index.html`, update each `<li class="skill">`:
    - `data-detail` — description shown in portrait panel.
    - `.skill-fill` inline `--skill-percent` — fill percentage (e.g., `--skill-percent:90%`).

## Accessibility
- Skip link (`.skip-link`) to jump to main content.
- Landmark roles: `<main role="main">`, `<nav role="navigation">`.
- Keyboard support:
  - Hamburger responds to Enter/Space and ArrowDown.
  - Skills are `tabindex="0"` and reveal panel on focus.
- Reduced motion:
  - If `prefers-reduced-motion: reduce` is set, typing and sheen animations are simplified or skipped.

## Developer notes / troubleshooting
- If hero image does not appear:
  - Check the path `/assets/me.jpeg` and the server root.
- If the hamburger menu appears offset:
  - The header/nav use z-index and positioning; ensure responsive.css is loaded after styles.css.
- Skill progress not filling:
  - Confirm `--skill-percent` is set on `.skill-fill`.
  - IntersectionObserver reveals fills when the items enter the viewport.
- If panel closes unexpectedly on mobile when switching skills:
  - The script uses a short suppression window to avoid accidental document-level clicks; increase `SUPPRESS_MS` in `js/animation.js` if needed.

## Contributing / extending
- To reuse the glassy sheen: add `class="glassy"` to any element and call `startGlassyCycle('.glassy', 2000)` or with a custom selector/interval.
- The typing utility is cancellable — use the pattern in `js/animation.js` when adding other typed elements.

## License & Credits
Project created by Mr. Jan Rhian Angulo. Update attribution or license as needed.


