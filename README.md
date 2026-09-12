<div align="center">

<img src="docs/brand/banner.svg" alt="FAZ Environmental &amp; Emergency Consulting" width="100%">

Institutional site for an environmental and emergency consultancy serving
offshore and industrial operations: technical training, emergency plans and
incident response.

[![License](https://img.shields.io/badge/license-all%20rights%20reserved-0a1930)](LICENSE) ![Stack](https://img.shields.io/badge/React%2019-Vite%206-16304f) ![API](https://img.shields.io/badge/Express-SSR%20%2B%20prerender-1e3d63) ![Deploy](https://img.shields.io/badge/Docker-Cloudflare%20Tunnel-7ec13f)

**[View the site](https://fazenvironmental.com.br)** · [The screens](#the-screens) · [What it solves](#what-the-project-solves) · [Deployment](#deployment) · [License](#license)

</div>

---

```
apps/
  frontend/   React 19 + Vite, SSR + prerender of the routes at build time
  backend/    Express API that takes leads and serves the built frontend
infra/        docker-compose and Cloudflare tunnel provisioning
```

## What the project solves

FAZ provides environmental consulting and technical training for operations
that have no room to improvise when an emergency hits: oil spills, offshore
response, incident command. The site is the commercial front door. It presents
the nine service lines (IMO and ICS training, hands-on offshore response,
technical reports, emergency plans) and turns the visitor into a qualified
lead.

The contact form validates the data, stores the lead and fires an email
notification, without depending on any third-party service for it. The Express
backend composes and sends the email itself.

## The screens

<div align="center">
<img src="docs/telas/01-home.webp" alt="Site home page, video hero" width="88%">
</div>

<table>
<tr>
<td width="50%"><img src="docs/telas/02-servico.webp" alt="Detail page for a service"><br><sub><b>Service</b>: hero image, scope and a proposal CTA</sub></td>
<td width="50%"><img src="docs/telas/03-mobile.webp" alt="Home on a phone" width="60%"><br><sub><b>Mobile</b>: same content in a single column</sub></td>
</tr>
</table>

---

## Frontend

React 19 with Vite. Routes are prerendered at build time (SSR plus a prerender
step that writes out the HTML for each page), so the first paint does not
depend on JavaScript.

Decisions that hold the performance up:

* **Prerender of every known route**: home, privacy policy and each service
  page become static HTML at build time, served straight from Express.
* **Compressed hero video with a poster**, so it does not block the LCP.
* **Splash screen on the first visit** (once per session, via
  `sessionStorage`), with a fade and a sonar sound, unlocked by a click if the
  browser blocks autoplay.
* **Scroll reveal** through `IntersectionObserver` in a reusable `<Reveal>`
  component, with no animation library.
* Service icons as inline SVG, drawn in the project.

```bash
cd apps/frontend
pnpm install
pnpm dev                  # http://localhost:5173
pnpm build                 # tsc -b + vite build (client/SSR) + prerender
```

### Where to make changes

| What | File |
| --- | --- |
| Services, copy, icons | `src/data/services.ts`, `src/data/serviceDetails.ts` |
| Colors, typography, spacing | `src/styles/global.css` |
| Home page sections | `src/components/*Section.tsx` |
| Per-page SEO | `src/components/Seo.tsx` |

---

## Backend

An Express API that serves two purposes: it takes the contact form and the
cookie consent, and it serves the built frontend (static, with an SPA
fallback) from the same process. There is no separate frontend server in
production.

```bash
cd apps/backend
pnpm install
cp .env.example .env       # fill in the SMTP credentials
pnpm dev                   # http://localhost:3001
```

### Leads and consent

Every form submission is validated and written to `data/leads.json`. If the
SMTP credentials are configured, an email notification goes out as well.
Without SMTP configured, the lead is still saved; only the email is skipped.

Cookie consent (accepting or declining the banner) is logged to
`data/consent-logs/`, by date, for LGPD audit purposes.

---

## Deployment

The site and the tunnel come up together in containers:

```bash
docker compose -f infra/docker-compose.yml up -d --build
docker compose -f infra/docker-compose.yml ps
docker compose -f infra/docker-compose.yml logs -f app
docker compose -f infra/docker-compose.yml down
```

`restart: unless-stopped` keeps the site online: Docker brings the containers
back when they crash and when Docker itself starts, including after a machine
reboot.

The Cloudflare tunnel is the only public way in. The application exposes no
port outside the host. Before the first `up`, run
`node infra/cloudflare-setup.mjs` to provision the dedicated tunnel and the DNS
(idempotent, safe to run again).

Credentials never go into the image: they arrive as environment variables at
startup, and `.dockerignore`/`.gitignore` exclude every secret file.

| What | Where |
| --- | --- |
| Services and restart policy | `infra/docker-compose.yml` |
| Tunnel and DNS provisioning | `infra/cloudflare-setup.mjs` |
| API variables | `apps/backend/.env` (not version-controlled) |

---

## License

**© 2026 NerdResolve. All rights reserved.** See [LICENSE](LICENSE).

The repository is public for technical review and portfolio purposes. The code
may be read and studied; no license to use, copy or redistribute is granted.
The **FAZ Environmental & Emergency Consulting** brand and the institutional
content belong to their owner.

---

<div align="center">

<img src="docs/brand/logo.webp" alt="" width="120">

**FAZ Environmental & Emergency Consulting**, built by [NerdResolve](https://nerdresolve.com)

Want a site like this? **contact@nerdresolve.com**

</div>
