# Madarsa Tech Academy — Landing Page

Next.js App Router landing page rebuilt with TypeScript and Tailwind CSS.
The page is bilingual EN/Urdu, RTL-ready, mobile-first, and split into a cleaner production-style structure.

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

- `app/page.tsx` — route entry for the landing page
- `app/layout.tsx` — root layout + font loading
- `app/globals.css` — Tailwind layers, tokens, and base reset
- `components/landing/LandingPage.tsx` — full landing page UI
- `lib/landing-data.ts` — structured page copy and content data
- `assets/images/` — image assets used by the landing page
- `assets/fonts/` — reserved for local font files if needed later

## Notes

- Fonts currently load through `next/font/google` in the layout for better performance.
- The main hero image now lives in `assets/images/` instead of `public/`.
- Tailwind is the primary styling system; the old inline-style page was replaced.
