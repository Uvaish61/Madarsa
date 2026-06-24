# Madarsa Tech Academy — Landing Page (Next.js)

Next.js (App Router) port of the Madarsa Tech Academy landing page.
Bilingual EN/Urdu (RTL), scroll animations, real tech logos.

## Run it

```bash
npm i
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Structure

- `app/page.jsx` — the whole landing page (client component)
- `app/layout.jsx` — root layout + Google Fonts
- `app/globals.css` — color tokens, keyframes, resets
- `public/hero-student-green.png` — hero image

## Notes
- Brand logos load from the Simple Icons CDN (cdn.simpleicons.org). For fully offline builds, download them into `public/` and update the `src` URLs.
- The language toggle (top-right) switches EN ⇄ Urdu and flips the layout to RTL.
