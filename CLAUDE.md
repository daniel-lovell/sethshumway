# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for **Elder Seth Shumway**, serving in the **Fort Worth Texas Mission** (April 2025 – April 2027). Hosted on GitHub Pages.

## Stack

Plain HTML/CSS/JS — no build step, no framework, no dependencies.

- `index.html` — single-page site
- `css/styles.css` — all styles
- `js/main.js` — scroll animations, nav, carousel
- `images/` — 7 curated photos (resized from `potentialimages/`)
- `.nojekyll` — disables Jekyll on GitHub Pages

## Running locally

Open `index.html` directly in a browser, or for a proper server:
```bash
npx serve .
```

## Deploying to GitHub Pages

Push to `main`. In repo Settings → Pages → Source: `main` branch, `/ (root)`.

## Design system

All design tokens are CSS custom properties in `css/styles.css` at the top of the `:root` block:
- Colors: `--color-bg`, `--color-primary` (navy), `--color-accent` (gold)
- Typography: Cormorant Garamond (headings) + Inter (body), fluid with `clamp()`
- Spacing: `--space-xs` through `--space-3xl`

## Scroll animations

Elements with `data-animate="fade-up|fade-right|fade-left"` are animated by `IntersectionObserver` in `main.js`. The `.is-visible` class triggers the transition. All animations respect `prefers-reduced-motion`.

## Adding photos

Source photos live in `potentialimages/` (584 files). Copy and resize before adding to `images/`:
```bash
sips --resampleWidth 1800 potentialimages/FILENAME.jpg --out images/NEWNAME.jpg
```

## Content placeholders

Search `index.html` for `<!-- PLACEHOLDER:` comments — these mark text that needs real content (hometown, bio, etc.).
