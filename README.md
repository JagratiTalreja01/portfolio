# Dr. Jagrati Talreja — Personal Portfolio

A production-grade personal portfolio for Dr. Jagrati Talreja, AI Research Scientist & Machine Learning Engineer at North Carolina A&T State University. Built with React, Vite, TypeScript, Tailwind CSS, and Three.js.

Live site: **[https://JagratiTalreja01.github.io/jagrati-talreja-portfolio/](https://JagratiTalreja01.github.io/jagrati-talreja-portfolio/)**

---

## Quick start (local development)

```bash
# 1. Clone the repository
git clone https://github.com/JagratiTalreja01/jagrati-talreja-portfolio.git
cd jagrati-talreja-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server (auto-opens http://localhost:5173/jagrati-talreja-portfolio/)
npm run dev
```

The dev server uses the same base path as the deployed build so all asset links work identically.

---

## Build for production

```bash
npm run build        # outputs to /dist
npm run preview      # preview the /dist build locally
```

---

## Deploy to GitHub Pages (manual)

```bash
npm run build
# Push the /dist folder to the gh-pages branch, or use the GitHub Actions workflow.
```

### Automatic deployment via GitHub Actions

1. Push this repository to `https://github.com/JagratiTalreja01/jagrati-talreja-portfolio`.
2. In repository **Settings → Pages**, set source to **GitHub Actions**.
3. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys automatically.
4. The site will be live at `https://JagratiTalreja01.github.io/jagrati-talreja-portfolio/`.

If you rename the repository, update `VITE_BASE` in the workflow file to match the new name.

---

## Content editing

All editable content lives in `src/data/`. You never need to touch a component file to update factual information.

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, headline, links, SEO metadata, about paragraphs |
| `src/data/publications.ts` | All 16 publications with status, DOI, abstract, BibTeX |
| `src/data/projects.ts` | Six research case studies with metrics, figures, methodology |
| `src/data/experience.ts` | Employment, education, speaking engagements, review service |
| `src/data/portfolio.ts` | Patents, impact metrics, skills, repos, adventure gallery, photo story |

### Adding a publication

Open `src/data/publications.ts` and add an entry to the `publications` array. All fields are typed — TypeScript will warn you if something is missing. Set `status` to exactly `'published'`, `'accepted'`, or `'under-review'`; the UI renders a coloured badge automatically.

### Updating links

Open `src/data/profile.ts` and update the `links` object. The Google Scholar and ORCID fields show on the site only when they do not start with `[`.

---

## Media replacement

All images and videos served from `/public/media/`:

```
public/
  media/
    images/    — WebP portraits and research/adventure photos
    videos/    — Compressed MP4 clips (muted, looped in the adventures section)
    posters/   — First-frame thumbnails for videos
    research/  — Architecture diagrams and result panels from repositories
  docs/        — Résumé and CV PDFs
  data/        — land-points.bin (Natural Earth coastline, powers the 3D globe)
```

**To replace a portrait:**
1. Convert your photo to WebP: `convert photo.jpg -resize 1600x1600 -quality 85 photo.webp`
2. Also make `-800.webp` (resize to 800px) and `-400.webp` (resize to 400px).
3. Drop the three files into `public/media/images/` using the same names as the originals.
4. Rebuild.

**To update a video:**
1. Encode to H.264 MP4 with no audio: `ffmpeg -i original.mp4 -an -vf scale=-2:720 -crf 30 -preset slow -movflags +faststart clip.mp4`
2. Extract a poster frame: `ffmpeg -i clip.mp4 -frames:v 1 poster.png && convert poster.png -quality 70 poster.webp`
3. Replace the file in `public/media/videos/` and the poster in `public/media/posters/`.

**To replace a research figure:**
The architecture diagrams are pulled from public GitHub repositories at build time (via the `prep_media.sh` script). You can also drop WebP files directly into `public/media/research/` and reference them from `src/data/projects.ts`.

---

## Adding Google Scholar and ORCID

In `src/data/profile.ts`:

```ts
links: {
  scholar: 'https://scholar.google.com/citations?user=YOURID',
  orcid:   'https://orcid.org/0000-0000-0000-0000',
}
```

The icons appear in the hero and contact sections automatically once these are set.

---

## Placeholders that still need filling in

These appear in the data files and are not shown on the site until replaced:

| Item | File | Field |
|---|---|---|
| Google Scholar URL | `src/data/profile.ts` | `links.scholar` |
| ORCID URL | `src/data/profile.ts` | `links.orcid` |
| SARGANet DOI / URL / code | `src/data/publications.ts` | id `sarganet` |
| Region8 quantum paper target venue | `src/data/publications.ts` | id `quantum-encoding` |
| STCN-SR target venue | `src/data/publications.ts` | id `stcn-sr` |
| Material review target venue | `src/data/publications.ts` | id `material-review` |
| Medi-Cart patent grant status | `src/data/portfolio.ts` | `patents[1].statusNote` |
| Award name in research gallery | `src/data/portfolio.ts` | `researchLife[4].caption` |
| Geo Week location in adventure caption | `src/data/portfolio.ts` | `adventures[0].caption` (mountain viewpoint) |

---

## Architecture notes

- **Single-page app with hash-free anchor navigation.** GitHub Pages serves `index.html` at the repository root and the `404.html` redirect handles any direct URL visits.
- **Three.js is code-split** and lazy-loaded after the initial paint. The globe has a static SVG fallback for reduced-motion, Save-Data, and 2G connections.
- **All media uses lazy loading** with reserved `aspect-ratio` slots so the page never shifts layout as images arrive.
- **Videos pause when off-screen** via `IntersectionObserver` and never autoplay with sound.
- **Focus management** is handled in every modal and the mobile menu; all keyboard navigation is tested.
- **Error boundaries** wrap every section so a broken component never takes down the whole page.

---

## Technology

| Layer | Stack |
|---|---|
| Framework | React 18, TypeScript 5, Vite 5 |
| Styling | Tailwind CSS 3 with a custom design system |
| Animation | Framer Motion (nav and section reveals) |
| 3D | Three.js (lazy-loaded; React Three Fiber not used to keep the chunk smaller) |
| Fonts | Archivo (sans), Newsreader (serif), IBM Plex Mono |
| Hosting | GitHub Pages (static, no server required) |
| CI | GitHub Actions |

---

## Facts confirmed against the résumé and CV

The following numbers are displayed on the site and are sourced from the documents listed:

- **+2.2 dB PSNR, ~40% reconstruction error reduction, 20,000+ image tiles** — résumé, Postdoctoral Fellow bullet point
- **TCSF metrics (0.5803 / 0.5968 macro IoU, 77.1 ms, 11.02M params)** — TCSF/main/figs/README.md
- **CPF metrics (69.8% IoU, 82.2% F1)** — Cross-Polarization-Fusion/main/README.md
- **Publication DOIs** — CV pages 4–5, cross-checked against IEEE Xplore and Springer
- **Patent numbers and filing dates** — CV page 3

Any displayed figure not in this list has a source comment in the data file.
