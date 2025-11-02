# AI agent instructions — TwinMind Improvements Project

Purpose: Make agents productive in this repo by capturing the real patterns used here.

## What this repo is

- Static HTML pages using Tailwind via CDN and a shared stylesheet (`styles/site.css`); small inline JS per page. No bundlers/frameworks/build step.
- Key files: `connectors.html` (connectors list), `dictionary.html` (dictionary CRUD).
- Extension: `demo-extension/` injects “Connectors” and “Dictionary” overlays into https://app.twinmind.com via `content.js`.
- Assets: `icons/` (PNG via <img>), shared CSS `styles/site.css` (root) and `demo-extension/styles/site.css` (extension mirror), `reference-screenshots/` (design refs; not shipped).

## Architecture & conventions

- Pages link shared CSS (`styles/site.css`) and Tailwind CDN; keep page-scoped `<style>` minimal and JS small/local.
- Mobile-first centered card: `w-full max-w-md md:max-w-lg bg-white p-5 rounded-lg`.
- Tokens: blue `#0B4F75` in `.btn-primary`, `.text-blue-primary`, toggle tracks; font Inter. Body text is `#646464`; titles use "Helvetica Neue".
- A11y: preserve `role`, `aria-checked`, `tabindex`; add Enter/Space key handlers. State is in-memory only.
- Background: TwinMind iframe (`pointer-events: none; z-index: 0`) with dark overlay (`rgba(0,0,0,0.35); z-index: 5`); main panel has `.panel-elevated` with strong shadow and `z-index: 10`. Standalone pages keep these helpers; the extension strips them inside overlays.

- Extension overlay system
  - `demo-extension/content.js` injects menu items and shows a full-page overlay by loading extension-packaged `connectors.html`/`dictionary.html`.
  - Loader behavior: removes background helpers (`.tm-preview-iframe`, `.bg-dimmed-overlay`) from fetched HTML; rewrites `icons/...` to `chrome-extension://...`; injects Tailwind if missing; injects shared CSS (`styles/site.css`) into the host page head (and cleans up on close); inlines any `<link rel="stylesheet">` from the fetched HTML into the overlay; executes inline scripts (unwraps DOMContentLoaded handlers); close via ESC/backdrop/Back/Save.
  - `demo-extension/manifest.json` `web_accessible_resources`: `connectors.html`, `dictionary.html`, `icons/*`, `styles/site.css`.
  - Keep `styles/site.css` mirrored in `demo-extension/styles/site.css` when adding tokens/utilities.

## Interaction patterns

- Toggles
  - Connectors: `<button class="toggle-switch-container" role="switch" aria-checked>` with `.toggle-track` (2.75rem × 1.5rem) + `.toggle-ball` (1.25rem × 1.25rem). Use `updateToggleVisuals(buttonEl, isChecked)`; move ball `translateX(1.25rem)` when checked; stop propagation so card click doesn't fire; add keydown (Enter/Space).
  - Dictionary: same dimensions and behavior; button wraps hidden `.toggle-checkbox`. Call `updateFormInputs(isReplacement, "modal"|"inline")` which switches inputs and updates visuals with `translateX(1.25rem)`. Listen to checkbox `change` event to sync visuals when label is clicked.
  - CSS-driven state: `[role="switch"][aria-checked=true]` colors the track and moves the ball `translateX(1.25rem)`; keep ARIA in sync.
- Cards: `.connector-card` with `role="button"`, `tabindex="0"`, `data-connector`, `.btn-elevated` (shadow styling). Two-row grid layout: icon in col 1 row 1; title in col 2 row 1; description paragraph in row 2 spanning both columns (`col-start-1 col-span-2 row-start-2`). On click/keydown call `onCardActivate(card)` (logs to console). Keep right-side toggle + chevron.
- Overlay close handlers: Back/Save buttons, backdrop click, and ESC all close overlays (wired by the extension loader).

## Dictionary data model & flow

- State: `dictionaryItems` of either `{ id, type: "word", word }` or `{ id, type: "replacement", from, to }`.
- Rendering: `renderList()` rebuilds list; newest first via `unshift`; ids via `crypto.randomUUID()`.
- Add/Edit: desktop modal (`openAddModal`, `openEditModal`), mobile inline form. Save updates or prepends; Delete removes.
- Keep section headers: `--- STATE ---`, `--- SELECTORS ---`, `--- FUNCTIONS ---`, `--- EVENT LISTENERS ---`, `--- INITIAL RENDER ---`.
- Note: data remains in-memory; no persistence.

## UI tokens & assets

- Header: Back (inline SVG), centered title (1.75rem, bold, Helvetica Neue, #4F4F4F), right-aligned Save.
- Icons: `<img src="icons/<name>.png" alt="…" loading="lazy" class="w-6 h-6 object-contain">` for connectors (smaller than dictionary examples). The extension rewrites these paths to chrome-extension URLs inside overlays.
- Buttons:
  - `.btn-primary`: `#0B4F75` background, white text, rounded-lg, hover darker.
  - `.btn-elevated`: Cards only; rounded-xl with inset highlight and layered shadows (not for buttons).
  - `.btn-surface`: Copilot-like translucent style; `rgba(255,255,255,0.3)` background, `0.8px solid rgba(0,0,0,0.08)` border, `12px` radius, `backdrop-filter: blur(10px)`. Used for secondary buttons (Cancel). Primary blue buttons use inline styles to preserve color while applying subtle border and backdrop blur.
  - `.btn-lg`: Larger CTA (desktop "Add new"); `padding: 0.875rem`, `font-size: 1rem`, no bold.
  - `.panel-elevated`: Strong shadow for main panel over dimmed background; `box-shadow: 0 12px 40px rgba(0,0,0,0.28), 0 2px 10px rgba(0,0,0,0.15)`.
- Prefer Tailwind utilities; minimal page-specific CSS in `<style>`.
- Shared classes from `styles/site.css`: `.btn-primary`, `.btn-surface`, `.btn-lg`, `.btn-elevated`, `.panel-elevated`, `.text-blue-primary`, `.font-helvetica`, `.toggle-switch-container`, `.toggle-track`, `.toggle-ball`, `.bg-dimmed-overlay`, `.tm-preview-iframe`.

## Workflows

- Preview (standalone pages): open `connectors.html` or `dictionary.html` directly, or use VS Code "Live Server".
- Extension flow: load `demo-extension/` as an unpacked extension, open https://app.twinmind.com, open profile menu, click “🔗 Connectors” / “📝 Dictionary”. Close overlays with Back/Save, ESC, or backdrop.
- Debug: Use DevTools. Extension logs are prefixed `[TwinMind Ext]` (menu detection, stylesheet injection, overlay lifecycle). GitHub Pages-ready; no env vars.
- Expected console warnings: TwinMind iframe shows auth errors (401/405/Firebase); Tailwind CDN production warning. Both are non-blocking.
- No local demo server required for overlays; `demo-server/` is not part of the current flow.

## Extending examples

- New connector: duplicate `.connector-card`, set `data-connector`, icon/text, wire inner toggle listeners. Use two-row grid layout for left content. Apply changes in both `connectors.html` (root) and `demo-extension/connectors.html` (extension). Ensure `icons/<name>.png` exists.
- New toggle: reuse structure/listeners; for dictionary, adjust `updateFormInputs` if behavior differs. Ensure `translateX(1.25rem)` for checked state.
- New dictionary UI: reuse `updateFormInputs` and toggle structure; implement in both `dictionary.html` files (root and extension).
- New styles/tokens: add to `styles/site.css` and mirror in `demo-extension/styles/site.css`.
- New button: For secondary actions use `.btn-surface`; for primary blue actions use inline styles with blue background + subtle border + backdrop blur.
- New assets used in overlays: add under `icons/`; if adding new resource types, include them in `web_accessible_resources` in `demo-extension/manifest.json`.

## Do / Don't

- Do keep ARIA + keyboard; keep scripts page-local; use `crypto.randomUUID()`; `unshift` for new items; maintain toggle containment (1.25rem transform).
- Do link `styles/site.css` in pages and keep page-scoped CSS minimal; keep `demo-extension/styles/site.css` in sync.
- Do reference icons as `icons/...` in HTML; the extension will rewrite paths for overlays.
- Do apply Copilot-like translucent surface to secondary buttons; preserve blue color for primary CTAs with inline styles.
- Don't add frameworks/build steps or split CSS/JS unless the project is reorganized.
- Don't apply `.btn-elevated` to buttons in dictionary (only to connector cards); use `.btn-surface` or inline styles instead.
- Don't move/rename overlay HTML or shared CSS without updating `demo-extension/content.js` and `web_accessible_resources` in the manifest.

If something conflicts with the live HTML, follow the code and update this doc.
