# AI agent instructions — TwinMind Improvements Project

Purpose: Make agents productive in this repo by capturing the real patterns used here.

## What this repo is

- Static HTML + Tailwind via CDN + small inline JS. No bundlers/frameworks/build step.
- Key files: `connectors.html` (connectors list), `dictionary.html` (dictionary CRUD).
- Assets: `icons/` (PNG via <img>), `reference-screenshots/` (design refs; not shipped).

## Architecture & conventions

- Page-scoped `<style>` and `<script>` per HTML; keep JS minimal and local.
- Mobile-first centered card: `w-full max-w-md md:max-w-lg bg-white p-5 rounded-lg`.
- Tokens: blue `#0B4F75` in `.btn-primary`, `.text-blue-primary`, toggle tracks; font Inter. Body text is `#646464`; titles use "Helvetica Neue".
- A11y: preserve `role`, `aria-checked`, `tabindex`; add Enter/Space key handlers. State is in-memory only.
- Background: TwinMind iframe (`pointer-events: none; z-index: 0`) with dark overlay (`rgba(0,0,0,0.35); z-index: 5`); main panel has `.panel-elevated` with strong shadow and `z-index: 10`.

## Interaction patterns

- Toggles
  - Connectors: `<button class="toggle-switch-container" role="switch" aria-checked>` with `.toggle-track` (2.75rem × 1.5rem) + `.toggle-ball` (1.25rem × 1.25rem). Use `updateToggleVisuals(buttonEl, isChecked)`; move ball `translateX(1.25rem)` when checked; stop propagation so card click doesn't fire; add keydown (Enter/Space).
  - Dictionary: same dimensions and behavior; button wraps hidden `.toggle-checkbox`. Call `updateFormInputs(isReplacement, "modal"|"inline")` which switches inputs and updates visuals with `translateX(1.25rem)`. Listen to checkbox `change` event to sync visuals when label is clicked.
- Cards: `.connector-card` with `role="button"`, `tabindex="0"`, `data-connector`, `.btn-elevated` (shadow styling). Two-row grid layout: icon in col 1 row 1; title in col 2 row 1; description paragraph in row 2 spanning both columns (`col-start-1 col-span-2 row-start-2`). On click/keydown call `onCardActivate(card)` (logs to console). Keep right-side toggle + chevron.

## Dictionary data model & flow

- State: `dictionaryItems` of either `{ id, type: "word", word }` or `{ id, type: "replacement", from, to }`.
- Rendering: `renderList()` rebuilds list; newest first via `unshift`; ids via `crypto.randomUUID()`.
- Add/Edit: desktop modal (`openAddModal`, `openEditModal`), mobile inline form. Save updates or prepends; Delete removes.
- Keep section headers: `--- STATE ---`, `--- SELECTORS ---`, `--- FUNCTIONS ---`, `--- EVENT LISTENERS ---`, `--- INITIAL RENDER ---`.

## UI tokens & assets

- Header: Back (inline SVG), centered title (1.75rem, bold, Helvetica Neue, #4F4F4F), right-aligned Save.
- Icons: `<img src="icons/<name>.png" alt="…" loading="lazy" class="w-6 h-6 object-contain">` for connectors (smaller than dictionary examples).
- Buttons:
  - `.btn-primary`: `#0B4F75` background, white text, rounded-lg, hover darker.
  - `.btn-elevated`: Cards only; rounded-xl with inset highlight and layered shadows (not for buttons).
  - `.btn-surface`: Copilot-like translucent style; `rgba(255,255,255,0.3)` background, `0.8px solid rgba(0,0,0,0.08)` border, `12px` radius, `backdrop-filter: blur(10px)`. Used for secondary buttons (Cancel). Primary blue buttons use inline styles to preserve color while applying subtle border and backdrop blur.
  - `.btn-lg`: Larger CTA (desktop "Add new"); `padding: 0.875rem`, `font-size: 1rem`, no bold.
  - `.panel-elevated`: Strong shadow for main panel over dimmed background; `box-shadow: 0 12px 40px rgba(0,0,0,0.28), 0 2px 10px rgba(0,0,0,0.15)`.
- Prefer Tailwind utilities; minimal page-specific CSS in `<style>`.

## Workflows

- Preview: open `*.html` in a browser or use VS Code "Live Server".
- Debug: DevTools console (e.g., connector card logs). GitHub Pages-ready; no env vars.
- Expected console warnings: TwinMind iframe shows auth errors (401/405/Firebase); Tailwind CDN production warning. Both are non-blocking.

## Extending examples

- New connector: duplicate `.connector-card`, set `data-connector`, icon/text, wire inner toggle listeners. Use two-row grid layout for left content.
- New toggle: reuse structure/listeners; for dictionary, adjust `updateFormInputs` if behavior differs. Ensure `translateX(1.25rem)` for checked state.
- New button: For secondary actions use `.btn-surface`; for primary blue actions use inline styles with blue background + subtle border + backdrop blur.

## Do / Don't

- Do keep ARIA + keyboard; keep scripts page-local; use `crypto.randomUUID()`; `unshift` for new items; maintain toggle containment (1.25rem transform).
- Do apply Copilot-like translucent surface to secondary buttons; preserve blue color for primary CTAs with inline styles.
- Don't add frameworks/build steps or split CSS/JS unless the project is reorganized.
- Don't apply `.btn-elevated` to buttons in dictionary (only to connector cards); use `.btn-surface` or inline styles instead.

If something conflicts with the live HTML, follow the code and update this doc.
