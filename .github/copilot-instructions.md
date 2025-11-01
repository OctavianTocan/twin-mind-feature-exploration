# AI agent instructions — TwinMind Improvements Project

Purpose: Make agents productive in this repo by capturing the real patterns used here.

## What this repo is

- Static HTML + Tailwind via CDN + small inline JS. No bundlers/frameworks/build step.
- Key files: `connectors.html` (connectors list), `dictionary.html` (dictionary CRUD).
- Assets: `icons/` (PNG via <img>), `reference-screenshots/` (design refs; not shipped).

## Architecture & conventions

- Page-scoped `<style>` and `<script>` per HTML; keep JS minimal and local.
- Mobile-first centered card: `w-full max-w-md bg-white p-5 rounded-lg shadow-lg`.
- Tokens: blue `#0B4F75` in `.btn-primary`, `.text-blue-primary`, toggle tracks; font Inter. `dictionary.html` body text is `#646464`.
- A11y: preserve `role`, `aria-checked`, `tabindex`; add Enter/Space key handlers. State is in-memory only.

## Interaction patterns

- Toggles
  - Connectors: `<button class="toggle-switch-container" role="switch" aria-checked>` with `.toggle-track` + `.toggle-ball`. Use `updateToggleVisuals(buttonEl, isChecked)`; move ball `translateX(1.25rem)`; stop propagation so card click doesn't fire; add keydown (Enter/Space).
  - Dictionary: same look; button wraps hidden `.toggle-checkbox`. Call `updateFormInputs(isReplacement, "modal"|"inline")` which switches inputs and updates visuals (`translateX(1.5rem)`).
- Cards: `.connector-card` with `role="button"`, `tabindex="0"`, `data-connector`. On click/keydown call `onCardActivate(card)` (logs to console). Keep right-side toggle + chevron.

## Dictionary data model & flow

- State: `dictionaryItems` of either `{ id, type: "word", word }` or `{ id, type: "replacement", from, to }`.
- Rendering: `renderList()` rebuilds list; newest first via `unshift`; ids via `crypto.randomUUID()`.
- Add/Edit: desktop modal (`openAddModal`, `openEditModal`), mobile inline form. Save updates or prepends; Delete removes.
- Keep section headers: `--- STATE ---`, `--- SELECTORS ---`, `--- FUNCTIONS ---`, `--- EVENT LISTENERS ---`, `--- INITIAL RENDER ---`.

## UI tokens & assets

- Header: Back (inline SVG), centered title, right-aligned Save.
- Icons: `<img src="icons/<name>.png" alt="…" loading="lazy" class="w-8 h-8 object-contain">`. Prefer Tailwind utilities; minimal page-specific CSS in `<style>`.

## Workflows

- Preview: open `*.html` in a browser or use VS Code “Live Server”.
- Debug: DevTools console (e.g., connector card logs). GitHub Pages-ready; no env vars.

## Extending examples

- New connector: duplicate `.connector-card`, set `data-connector`, icon/text, wire inner toggle listeners.
- New toggle: reuse structure/listeners; for dictionary, adjust `updateFormInputs` if behavior differs.

## Do / Don’t

- Do keep ARIA + keyboard; keep scripts page-local; use `crypto.randomUUID()`; `unshift` for new items.
- Don’t add frameworks/build steps or split CSS/JS unless the project is reorganized.

If something conflicts with the live HTML, follow the code and update this doc.
