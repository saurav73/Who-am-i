# Who-am-i

Saurav Shrestha's personal portfolio site. Live at **https://saurabshrestha.com.np**

Full Stack Developer from Lalitpur, Nepal — Java / Spring Boot backends, React frontends.

## Features

- **Three themes** — professional light, dark, and a full anime mode (manga-style animated design) with One Piece and Jujutsu Kaisen sub-modes
- **Blog** — classic article list (`posts/`) covering Java, Spring Boot, React, and maker projects — 7 posts by filename prefix: 3 `spring-boot-*`, 2 `react-*`, 1 `java-mysql-*`, 1 `esp32-*`, counted from `posts/`
- **Projects & work pages** — selected builds with write-ups, ToolNest featured first (current flagship product); all 7 outbound live-site links on `projects.html` verified returning HTTP 200 on 2026-11-08, counted from `projects.html`
- **SEO + AI-ready** — sitemap (15 URLs: 8 pages + 7 posts), robots.txt, `llms.txt`, per-page meta — every one of the 15 sitemap URLs resolves to a file in the repo, and `blog.html` links all 7 posts, counted from `sitemap.xml` and `blog.html`. `robots.txt` explicitly welcomes 9 named AI crawlers (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, Bytespider, Amazonbot) on top of the wildcard allow, counted from `robots.txt`
- **AdSense** — subtle native ads (`ads.txt` at root)

## Tech

Static HTML / CSS / vanilla JS. No build step, no framework. Hosted on **GitHub Pages** (branch `main`).

## Project structure

| Path | What it is |
|---|---|
| `index.html` | Home |
| `404.html` | Branded 404 page for mistyped or dead links |
| `about.html`, `contact.html` | About / contact |
| `blog.html`, `posts/` | Blog list + articles |
| `projects.html`, `work.html` | Projects / work |
| `assets/` | CSS, JS, images (26 files: 2 CSS, 1 JS, 22 images — 20 JPG + 1 PNG in `img/`, plus `Image.jpeg` at the assets root — and 1 favicon, `favicon.ico`) |
| `CNAME` | Custom domain (`saurabshrestha.com.np`) |
| `sitemap.xml`, `robots.txt`, `llms.txt` | SEO / AI crawler files |
| `privacy.html`, `terms.html` | Privacy policy and terms pages (both in the sitemap) |
| `ads.txt` | AdSense seller authorization file |
| `thumbnail-checklist.pdf`, `5-money-traps-checklist.pdf` | Free downloadable checklists offered to readers |
| `google7c9e2fcdb4f1a882.html` | Google Search Console ownership verification |
| `CHANGELOG.md` | Dated record of shipped work |

10 HTML pages at the root: 8 content pages (`index`, `about`, `blog`, `contact`, `projects`, `work`, `privacy`, `terms`) plus `404.html` and the Search Console verification file, counted from the repo root. In total the repo holds 17 HTML files (10 root + 7 in `posts/`). The repo root holds 19 files in total: the 10 HTML files plus `README.md`, `CHANGELOG.md`, `CNAME`, `ads.txt`, `robots.txt`, `sitemap.xml`, `llms.txt`, and the 2 checklist PDFs, counted from the repo root. Git tracks 52 files in total across the repo, the largest group being `assets/img/` with 22 images, counted with `git ls-files`.

## Deploying

Push to `main` — GitHub Pages deploys automatically.

> **Cache-busting:** CSS/JS links carry a `?v=YYYYMMDDx` query string. Bump the version letter in every content HTML file on each deploy that touches CSS/JS (the Search Console verification file carries no assets, so it has none), or visitors on cached copies get silently broken behavior. The current version is `20261006a`, used by all 9 root content pages and all 7 posts (counted from the repo root and `posts/`).

## License

All rights reserved — this is a personal portfolio.
