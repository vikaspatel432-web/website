# SP Consultants — Website

Marketing website for **SP Consultants** — reality capture, 360° laser scanning,
Scan-to-BIM and a collaborative cloud BIM viewer. _Transforming visions into reality._

Built with **React + TypeScript + Vite + Tailwind CSS**. Multi-page, fully
responsive, dark/glass aesthetic with a full-screen video hero.

## Pages

| Route         | Page        | Content                                                      |
| ------------- | ----------- | ------------------------------------------------------------ |
| `/`           | Home        | Video hero, what we do, services overview, process, CTA      |
| `/services`   | Services    | Laser scanning, 2D CAD, point clouds, Scan-to-BIM, BIM viewer |
| `/technology` | Technology  | Leica RTC360 hardware + cloud BIM viewer features            |
| `/projects`   | Projects    | Case studies (stadium, hotel, interiors, infrastructure)     |
| `/about`      | About       | Mission, values, leadership                                  |
| `/contact`    | Contact     | Contact details + Netlify-powered enquiry form               |

## Local development

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
index.html              Fonts (Inter), meta tags, hidden Netlify form stub
src/
  main.tsx              App entry + BrowserRouter
  App.tsx               Routes + scroll-to-top
  index.css             Global styles + .liquid-glass
  components/
    Hero.tsx            Full-screen video hero (exact spec)
    Navbar.tsx          Glass navbar, adapts over hero / inner pages
    Footer.tsx
    FadeIn.tsx          Configurable fade-in wrapper
    AnimatedHeading.tsx Character-by-character heading animation
    ui.tsx              PageHeader, SectionHeading, Card, CTASection
  pages/                Home, Services, Technology, Projects, About, Contact, NotFound
public/
  favicon.svg
  _redirects            SPA fallback for Netlify
netlify.toml            Build + redirect config
```

## Deploying to Netlify

1. Push this repo to GitHub (already configured).
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. The `_redirects` / `netlify.toml` rule sends all routes to
   `index.html` so client-side routing works.

### Contact form

The contact form uses **Netlify Forms**. The hidden `<form name="contact">` in
`index.html` lets Netlify detect it at build time; the live React form posts to
the same name. Submissions appear under **Site → Forms** in the Netlify
dashboard. Add a notification there to forward enquiries to
`admin@spconsultants.info`.

## Connecting the Namecheap domain (spconsultants.info)

1. In Netlify: **Domain settings → Add a domain** → enter `spconsultants.info`.
2. Netlify will show DNS records. Easiest option — point Namecheap nameservers
   to Netlify:
   - In **Namecheap → Domain List → Manage → Nameservers**, choose **Custom DNS**
     and enter the Netlify nameservers shown (e.g. `dns1.p0X.nsone.net`, …).
   - _Or_ keep Namecheap DNS and add an `A` record `@ → 75.2.60.5` and a
     `CNAME` `www → <your-site>.netlify.app`.
3. Netlify provisions a free **Let's Encrypt SSL** certificate automatically
   once DNS resolves (HTTPS).

## Notes / assumptions

- Brand styling follows the supplied hero spec: black background, white text,
  `gray-300/400` secondary text, glass surfaces — no purple/indigo. The logo is
  rendered as a clean **SP CONSULTANTS** wordmark; drop in an SVG/PNG logo later
  if preferred.
- Hero background video is the reference CloudFront URL from the brief. Swap the
  `VIDEO_URL` constant in `src/components/Hero.tsx` for an SP-owned clip when
  available.
- Project case studies are written from the shared marketing decks (Lemon Tree
  hotel, stadium, Empire Interiors UK, roads). Add photos/point-cloud renders to
  the project cards to strengthen them further.
