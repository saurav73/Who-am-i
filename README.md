# Who-am-i

Saurav Shrestha's personal portfolio site. Live at **https://saurabshrestha.com.np**

Full Stack Developer from Lalitpur, Nepal — Java / Spring Boot backends, React frontends.

## Features

- **Three themes** — professional light, dark, and a full anime mode (manga-style animated design) with One Piece and Jujutsu Kaisen sub-modes
- **Blog** — classic article list (`posts/`) covering Java, Spring Boot, React, and maker projects
- **Projects & work pages** — selected builds with write-ups, ToolNest featured first (current flagship product)
- **SEO + AI-ready** — sitemap (15 URLs: 8 pages + 7 posts), robots.txt, `llms.txt`, per-page meta
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
| `assets/` | CSS, JS, images (26 files: 2 CSS, 1 JS, 22 images, plus `Image.jpeg` at the assets root) |
| `CNAME` | Custom domain (`saurabshrestha.com.np`) |
| `sitemap.xml`, `robots.txt`, `llms.txt` | SEO / AI crawler files |
| `privacy.html`, `terms.html` | Privacy policy and terms pages (both in the sitemap) |
| `ads.txt` | AdSense seller authorization file |
| `thumbnail-checklist.pdf`, `5-money-traps-checklist.pdf` | Free downloadable checklists offered to readers |
| `google7c9e2fcdb4f1a882.html` | Google Search Console ownership verification |
| `CHANGELOG.md` | Dated record of shipped work |

## Deploying

Push to `main` — GitHub Pages deploys automatically.

> **Cache-busting:** CSS/JS links carry a `?v=YYYYMMDDx` query string. Bump the version letter in every content HTML file on each deploy that touches CSS/JS (the Search Console verification file carries no assets, so it has none), or visitors on cached copies get silently broken behavior.

## License

All rights reserved — this is a personal portfolio.
