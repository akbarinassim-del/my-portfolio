# Nasim Akbari — Personal Portfolio

A bilingual portfolio for **Nasim Akbari | Product Designer & AI-Powered Web Creator**, built with Next.js App Router, TypeScript, and Tailwind CSS. The existing charcoal theme, lime accents, self-hosted typography, and responsive visual identity are preserved.

## Development

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

English is the default at `/`; Persian is at `/fa`. Each page is statically rendered with the correct HTML `lang` and `dir` attributes. The language choice is represented in the URL, so refreshes, section navigation, and the home link retain the selected language. Switching languages intentionally loads the corresponding root layout. Content and language switching work without JavaScript; the small mobile navigation component adds automatic closing and Escape-key handling.

## Quality checks

```bash
npm run lint
npm run build
npm run typecheck
```

The build generates the route types needed by the TypeScript check. ESLint uses the Next.js Core Web Vitals and TypeScript rules. Serve the production build with `npm start`. No automated test runner or additional runtime dependency was added for this update.

## Site content

The page follows this order: Hero, Services, Selected Work, Work Experience, Education & Certification, Design Process, About Me, Professional Recommendation, Contact, Footer.

- `src/config/site.ts`: verified identity, contact details, project links, portrait dimensions, CV path, XGen links, and the supplied production URL.
- `src/content/en.ts` and `src/content/fa.ts`: matching typed translations, project-specific design contributions, work and education dates, and the supplied recommendation in its original Persian and English translation.
- `src/components/portfolio.tsx`: shared server-rendered page sections.
- `src/components/mobile-navigation.tsx`: mobile-menu behavior and keyboard handling.
- `src/components/document.tsx`: language, direction, and local fonts.
- `src/content/metadata.ts`: the requested page title, localized descriptions, canonical URLs, and language alternates.
- `src/app/globals.css`: responsive layouts, RTL logical properties, focus states, and reduced-motion support.

All project cards explicitly acknowledge collaborative team work. Experience, education, certification, recommendation, and contact details follow the supplied brief. Email and telephone links use `mailto:` and `tel:`; there is no contact form or invented information.

## Real assets

| Asset | Dimensions / format | Usage |
| --- | --- | --- |
| `public/images/nasim-hero-dark.png` | 1086 × 1448 PNG | Main hero portrait |
| `public/images/nasim-profile.png` | 1254 × 1254 PNG | Previous portrait, retained as backup |
| `public/images/beatpass.png` | 1672 × 941 PNG | BeatPass cover |
| `public/images/ecogold.png` | 1672 × 941 PNG | EcoGold cover |
| `public/images/shipply.png` | 1672 × 941 PNG | Shipply cover |
| `public/Nasim-Akbari-CV.pdf` | One-page PDF | Hero and About CV downloads |
| `public/Resume-main01.pdf` | Original uploaded PDF | Retained original |

The hero filename on the starting main commit (`15ddcac`) contained only a blank line. The intact edited portrait was recovered byte-for-byte from that commit’s parent at `public/images/Warm Beige Hijab Portrait with Green Halo.png`. No image generation, retouching, cropping, or recoloring was performed. The cover images and backup portrait remain unchanged. Next.js Image provides responsive delivery while rendering the images at their natural proportions.

The downloadable CV is a byte-for-byte copy of the actual uploaded `Resume-main01.pdf`. Both Hero and About use `/Nasim-Akbari-CV.pdf` with a download attribute. The original document content is not edited.

Manrope and Vazirmatn are self-hosted with `next/font/local`. Their SIL Open Font License notices are retained in `src/assets/fonts/`; no runtime font-provider requests are needed.

## External verification limits

The supplied Behance, XGen, LinkedIn, and live-site URLs are used exactly as provided. This cloud environment’s outbound proxy returned HTTP 403 for these destinations, so their remote availability could not be verified here. The recommender portrait URL was also blocked; the recommendation therefore uses the supplied text, name, title, and original-source link without a broken image or substitute portrait.

Local browser checks verify the rendered link targets, safe new-tab attributes, contact protocols, bilingual layouts, image proportions, language persistence, and real CV download. Vercel project settings and deployment configuration are unchanged. Review and merge the feature branch before deploying through the existing workflow.
