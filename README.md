# Ethan's Blog

Personal blog built with [Astro](https://astro.build), hosted on GitHub Pages at
**https://eschwelling.github.io**.

## One-time setup

1. Create a **public** repo on GitHub named exactly `eschwelling.github.io` (leave it empty).
2. Push this folder to it:
   ```sh
   git init -b master
   git add .
   git commit -m "Initial blog"
   git remote add origin git@github.com:eschwelling/eschwelling.github.io.git
   git push -u origin master
   ```
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Watch the **Actions** tab. When the run goes green (about a minute), the site is live.

## Writing a post

Add a Markdown file to `src/content/blog/`. The file name becomes the URL
(`my-post.md` → `/blog/my-post/`).

```md
---
title: 'My post title'
description: 'One-line summary for the list page and link previews.'
pubDate: 'Oct 10 2026'
# heroImage: '../../assets/my-image.jpg'   # optional
# tags: ['laravel', 'aws']                  # optional; builds /tags/ pages
# featured: true                            # optional; lists it under "Start here" on the homepage
---

Post body in Markdown. Footnotes work too.[^1]

[^1]: Like this.
```

Commit and push to `master`. The site rebuilds automatically.
You can also do this straight from github.com: open `src/content/blog/`, click **Add file → Create new file**, and commit.

## Running it locally (optional)

Requires Node 22.12+.

```sh
npm install      # first time; commit the package-lock.json it creates
npm run dev      # http://localhost:4321, live-reloads as you edit
npm run build    # production build into ./dist
```

## Where things live

| What | File |
| --- | --- |
| Site title & description | `src/consts.ts` |
| Site URL | `astro.config.mjs` (`site`) |
| Homepage | `src/pages/index.astro` |
| About page | `src/pages/about.astro` |
| Header / footer | `src/components/Header.astro`, `Footer.astro` |
| Colors & fonts | `src/styles/global.css` |
| Deploy pipeline | `.github/workflows/deploy.yml` |

RSS is at `/rss.xml`, topics are at `/tags/`, and a sitemap is generated automatically.

## Custom domain later

Add a file `public/CNAME` containing your domain (e.g. `blog.example.com`), point a DNS
CNAME record at `eschwelling.github.io`, set the domain under **Settings → Pages**, and
update `site` in `astro.config.mjs`.
