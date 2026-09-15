# BrandForge API Docs

Static docs site for the BrandForge Provisioning API. Served by nginx (see
`Dockerfile` / `nginx.conf`) — no build step.

- `index.html` — docs home (integrations, quick start, browse by product)
- `provisioning-api.html` — Swagger UI, served at `/provisioning-api`
- `whmcs-onboarding.html` — reseller + WHMCS setup guide, served at `/whmcs-onboarding`
- `upmind.html` — Upmind integration guide, served at `/upmind` (not linked from the
  main nav — handed directly to the Upmind team, not for general/public browsing)
- `assets/tokens.css` — design tokens mirrored from `brand-forge-frontend/app/globals.css`;
  update by hand if the product tokens change, there's no shared build step
- `partials/_nav.html` — the one shared header, included on every page via nginx SSI
  (`ssi on;` in `nginx.conf`) so there's a single nav implementation, not one per page

`nginx.conf` also serves clean URLs (`/provisioning-api` → `provisioning-api.html`) and
301-redirects the old filenames (`swagger.html`, `onboarding.html`) to their new
clean paths.
