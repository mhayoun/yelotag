# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

yeloTag.com — a single-page bilingual (Hebrew/English) marketing site for a web-site-builder product, built with Create React App. The entire UI lives in one component (`src/App.js`); there is no router and no backend beyond a Formspree endpoint for the contact form.

## Commands

- `npm start` — run the dev server at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — run CRA's Jest test runner in interactive watch mode
- `npm test -- --watchAll=false` — run tests once (non-interactive, e.g. in CI)
- `npm test -- -t "test name"` — run a single test by name
- There is no lint script; ESLint runs via `react-scripts` using the `react-app` config in `package.json`.

## Architecture

- **Everything renders from `src/App.js`.** It's one large component containing the navbar, hero, feature grid/detail toggle, portfolio section, and contact form/footer — all styled with Tailwind utility classes. There are no other components or a router; "navigation" between features is just local `activeFeature` state (`null` = grid view, index = detail view).
- **Content and language are decoupled from React state via `src/useWebsiteLogic.js` + `src/content.js`.** `useWebsiteLogic` holds `lang` (`'he'` | `'en'`, defaults to `'he'`) and looks up the matching object from `content.js`, which contains **all** copy for both languages (hero text, feature descriptions, portfolio site list, footer). To change on-page text, edit `content.js`, not JSX in `App.js`. RTL/LTR is applied by toggling `document.body.dir` and a `rtl`/`ltr` class on the root div based on `lang`.
- **`src/i18n.js` (i18next/react-i18next) and `src/locales/*.json` are effectively dead code.** They're initialized in `index.js` but nothing in `App.js` reads from them — all copy actually goes through the `content.js` mechanism above. Don't assume translations added to `locales/en.json`/`he.json` will show up anywhere; add copy to `content.js` instead.
- **Tailwind is loaded via the CDN script tag in `public/index.html`** (`cdn.tailwindcss.com`), not via the `tailwindcss`/`@tailwindcss/postcss`/`postcss`/`autoprefixer` packages in `package.json` — there's no `tailwind.config.js` or `postcss.config.js`, and `src/index.css` is empty. Those npm packages are currently unused.
- **Contact form posts directly to Formspree** (`https://formspree.io/f/xlgzgpoo`) from `handleFormSubmit` in `App.js` — no backend in this repo.
- **Portfolio images** referenced in `content.js` (`site.image`) live in `public/images/`; add new images there and reference by `/images/<file>.png`.
- `src/App.test.js` still contains the CRA boilerplate test asserting a "learn react" link exists, which no longer matches `App.js`'s actual output — expect it to fail until rewritten for real content.
