# Changelog

Dated record of shipped work on this portfolio site. Newest first.


## 2026-10-30
- README: SEO bullet now states the sitemap size (15 URLs: 8 pages + 7 posts), counted from sitemap.xml
- Re-verified the showcase ban: no calculator projects in any page or post; all 47 cache-busting references still share one version (v=20261006a); blog list still matches all 7 files in posts/

## 2026-10-29
- README: structure table now names the custom domain from CNAME (saurabshrestha.com.np) instead of the generic "Custom domain"
- Re-verified the showcase ban: no calculator projects in any page or post; all 47 cache-busting references still share one version (v=20261006a); blog list still matches all 7 files in posts/

## 2026-10-28
- README: cache-busting note clarified - the version letter goes in every content HTML file; the Search Console verification file carries no assets and has none
- Re-verified the showcase ban: no calculator projects in any page or post; blog list still matches all 7 files in posts/

## 2026-10-27
- README: Features now names ToolNest as the featured project, matching the 2026-10-24 site change that put its card first on the Projects page
- Re-verified the showcase ban: no calculator projects in any page or post; blog list still matches all 7 files in posts/; llms.txt lists all 7 posts

## 2026-10-26
- README: added the missing structure-table rows for `privacy.html`, `terms.html` (both in the sitemap) and `ads.txt` — previously only the SEO trio was listed
- Re-verified the showcase ban: no calculator projects (TakeHomeCalc, ArthaCalc, AbroadCalc) in any page or post; ToolNest remains the featured project card

## 2026-10-25
- Fixed stale sitemap lastmod dates: all 14 pages except projects.html were edited on 2026-10-23 by the dead-link fix but still showed older dates; they now read 2026-10-23 (projects.html stays 2026-10-24)
- Re-verified internal links across all pages and posts: no broken local hrefs or asset references; the earlier link-check misses were query-string and root-absolute false positives

## 2026-10-24
- Featured ToolNest (toolnest-sage.vercel.app) as the first card on the Projects page — the portfolio now reflects Saurav's current flagship product; tagged "Live on Vercel" and "Open source" (github.com/saurav73/ToolNest)
- Re-verified the showcase ban: still no calculator projects (TakeHomeCalc, ArthaCalc, AbroadCalc) anywhere on the site; blog list matches posts/; footer year remains JS-driven; sitemap unchanged (404.html and GSC verification file correctly excluded)

## 2026-10-23
- Fixed dead LinkedIn and Instagram buttons: every page's navbar social group and the contact page's social row linked them to `href="#"` — they now point to the real profiles (same URLs as the GitHub profile's Connect section) and open in a new tab
- README: added the branded `404.html` (shipped 2026-10-21) to the project-structure table
- Re-verified the showcase ban: no calculator projects (TakeHomeCalc, ArthaCalc, AbroadCalc) in projects.html, work.html, or anywhere else; sitemap URLs all resolve to real files

## 2026-10-22
- Lengthened the privacy.html and terms.html `<title>` tags to 48/50 chars ("...for Saurav Shrestha's Portfolio") to meet the 50-60 char SEO title rule
- Re-verified the showcase ban: no calculator projects (TakeHomeCalc, ArthaCalc, AbroadCalc) in projects.html, work.html, or anywhere else

## 2026-10-21

- UX: added a branded 404.html so mistyped or dead links land on a styled
  page (reuses the site theme, root-absolute asset paths, noindex) instead of
  GitHub Pages' default error page; links visitors back to home, work, blog
  and contact
- Verified showcase ban still clean: no TakeHomeCalc/ArthaCalc/AbroadCalc
  references anywhere on projects.html, work.html, index.html, or about.html

## 2026-10-20

- SEO hygiene: trimmed the about.html `<title>` (and matching og:title) from 63
  to 52 chars per the 50-60 char rule; bumped the about.html sitemap lastmod to
  2026-10-20
- Verified showcase ban still clean: no TakeHomeCalc/ArthaCalc/AbroadCalc
  references anywhere on projects.html, work.html, index.html, or about.html

## 2026-10-19

- SEO hygiene: trimmed meta descriptions to at or under 145 chars on the three
  remaining blog posts that exceeded it (spring-boot-rest-api-best-practices,
  react-spring-boot-cors-errors, spring-boot-jwt-authentication-react)
- sitemap.xml: bumped lastmod to 2026-10-19 for the three posts whose meta
  descriptions were trimmed

## 2026-10-18

- SEO hygiene: trimmed meta descriptions to at or under 145 chars on about,
  contact, projects, and four blog posts (about, contact, esp32-home-automation,
  java-mysql-book-marketplace, react-beginners-poetry-platform,
  spring-boot-mysql-connection-errors)
- sitemap.xml: set work.html and projects.html lastmod to 2026-10-16,
  matching the day the calculator cards were removed from those pages

## 2026-10-16

- llms.txt: added the two free downloadable checklists
  (`5-money-traps-checklist.pdf`, `thumbnail-checklist.pdf`) to the site map
- assets/js/main.js: header docblock now documents the localStorage keys
  (`ss-theme`, `ss-anime-sub-v2`) and the theme behavior contract
- projects.html, work.html: removed the calculator project cards
  (TakeHomeCalc, ArthaCalc, AbroadCalc) per the showcase policy —
  calculator projects are never presented on this portfolio
- README.md: structure table now lists this changelog
- Started this changelog

## 2026-10-14

- README structure table: documented the freebie PDFs and the Google Search
  Console ownership verification file
- llms.txt: added the four missing blog posts to the site map
- sitemap.xml: fixed the contact.html lastmod date (page changed 2026-10-12
  by the place-name fix)

## 2026-10-12

- Fixed place-name spelling site-wide: Bungmati to Bungamati
- sitemap.xml: lastmod dates refreshed to the actual page change dates
- Bumped stale cache-bust versions for anime.css and main.js to ?v=20261006a

## 2026-10-09

- privacy.html: added Google's "how Google uses data from partner sites"
  link (AdSense policy requirement)

## 2026-10-08

- README.md: full rewrite covering the live site, features, project
  structure, and deploy notes

## 2026-10-06

- Added the thumbnail checklist freebie PDF
- Installed Google Analytics 4 on all pages; disclosed in the privacy policy
- Removed all em dashes site-wide (152 occurrences across 34 files)
- GEO upgrade: key-takeaway boxes on tutorials, entity sameAs links,
  llms.txt refresh
- Added Privacy Policy and Terms of Service pages
- Added three problem-solving tutorials: React+Spring CORS, JWT auth,
  MySQL connection errors

## 2026-10-05

- Added the 5 Money Traps Checklist freebie PDF

## 2026-10-04

- robots.txt: explicitly welcome AI crawlers (GPTBot, ClaudeBot, and others)
- SEO: robots meta tags on all pages; Expertise section on the homepage
- Homepage title retargeted: "Full Stack Developer in Nepal"
- Repositioned the portfolio to rank for "Full Stack Developer"
