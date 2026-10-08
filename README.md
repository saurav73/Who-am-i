# Who-am-i

Saurav Shrestha's personal portfolio site. Live at **https://saurabshrestha.com.np**

Full Stack Developer from Lalitpur, Nepal — Java / Spring Boot backends, React frontends.

## Features

- **Three themes** — professional light, dark, and a full anime mode (manga-style animated design) with One Piece and Jujutsu Kaisen sub-modes
- **Blog** — classic article list (`posts/`) covering Java, Spring Boot, React, and maker projects
- **Projects & work pages** — selected builds with write-ups
- **SEO + AI-ready** — sitemap, robots.txt, `llms.txt`, per-page meta
- **AdSense** — subtle native ads (`ads.txt` at root)

## Tech

Static HTML / CSS / vanilla JS. No build step, no framework. Hosted on **GitHub Pages** (branch `main`).

## Project structure

| Path | What it is |
|---|---|
| `index.html` | Home |
| `about.html`, `contact.html` | About / contact |
| `blog.html`, `posts/` | Blog list + articles |
| `projects.html`, `work.html` | Projects / work |
| `assets/` | CSS, JS, images |
| `CNAME` | Custom domain |
| `sitemap.xml`, `robots.txt`, `llms.txt` | SEO / AI crawler files |

## Deploying

Push to `main` — GitHub Pages deploys automatically.

> **Cache-busting:** CSS/JS links carry a `?v=YYYYMMDDx` query string. Bump the version letter in every HTML file on each deploy that touches CSS/JS, or visitors on cached copies get silently broken behavior.

## License

All rights reserved — this is a personal portfolio.
