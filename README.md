# GitWyrm Docs

[![Docs](https://img.shields.io/badge/docs-docs.gitwyrm.com-2dd4a7)](https://docs.gitwyrm.com)
[![Website](https://img.shields.io/badge/site-gitwyrm.com-2dd4a7)](https://gitwyrm.com)

Documentation for [GitWyrm](https://gitwyrm.com), a fast, focused Git client for
Windows and Linux.

Built with **VitePress**, hosted on Cloudflare Pages at **docs.gitwyrm.com**.

The marketing landing page lives in a separate repo:
[GitWyrm-Website](https://github.com/Wutname1/GitWyrm-Website) (gitwyrm.com).

## Local development

Requires [Node.js](https://nodejs.org) 24+.

```bash
npm install
npm run dev      # start the dev server
npm run build    # build the static site to docs/.vitepress/dist
npm run preview  # preview the production build locally
```

## Project layout

```
docs/
  .vitepress/
    config.mts       # nav, sidebar, site metadata
  guide/
    getting-started.md
    install-linux.md
  public/             # static assets (logo, favicon)
  index.md            # homepage
```

This is currently a placeholder scaffold - real content is coming soon.

## Deployment

The site deploys to Cloudflare Pages. The build command is `npm run build` and the
output directory is `docs/.vitepress/dist` (see [wrangler.toml](wrangler.toml)).
Cloudflare Pages deployment is configured directly in the Cloudflare dashboard, not
via GitHub Actions.
