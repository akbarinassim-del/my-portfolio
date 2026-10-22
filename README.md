# Nasim Akbari — Portfolio

A bilingual portfolio for **Nasim Akbari — Product Designer & AI-Powered Web Creator**, built with Next.js App Router, TypeScript, and Tailwind CSS v4. The dark theme and lime accents frame the real portrait and three collaborative UX/UI projects: BeatPass, EcoGold, and Shipply.

## Run locally

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

English is the default at `/`. Persian is at `/fa`. The EN/FA links navigate between statically rendered pages with correct HTML `lang` and `dir` attributes, so language selection and navigation also work without JavaScript. Separate route-group root layouts intentionally perform a full navigation when changing languages.

## Quality checks and production

```bash
npm run lint
npm run build
npm run typecheck
npm start
```

The build generates route types used by the TypeScript check. ESLint includes the Next.js Core Web Vitals and TypeScript rules. There is no committed automated test suite. Browser validation for this update covers both languages, mobile navigation, language switching, image loading and proportions, and project links.

## Content and configuration

- `src/config/site.ts`: professional identity, the verified image paths, Behance URLs, and contact configuration.
- `src/content/en.ts` and `src/content/fa.ts`: typed English and Persian copy. Keep both dictionaries in sync.
- `src/components/portfolio.tsx`: shared server-rendered sections and navigation.
- `src/components/document.tsx`: document language, text direction, and local fonts.
- `src/content/metadata.ts`: localized SEO and social metadata, with alternate-language links. No production domain or social account is invented; configure an absolute canonical URL/metadata base when a real site domain is known.
- `src/app/globals.css`: responsive styles, logical properties for RTL, focus states, and reduced-motion support.

### Contact details

The email in `src/config/site.ts` is intentionally empty. Add a verified email address to enable the contact email link. While empty, the page displays a localized “contact details coming soon” message and a link to the case studies. No form is presented and no messages are collected. Do not add placeholder email addresses or invented social accounts to the live interface.

### Images

The originals in `public/images/` remain unchanged:

| Image | Dimensions | Usage |
| --- | --- | --- |
| `nasim-profile.png` | 1254 × 1254 | Portrait |
| `beatpass.png` | 1672 × 941 | BeatPass case study |
| `ecogold.png` | 1672 × 941 | EcoGold case study |
| `shipply.png` | 1672 × 941 | Shipply case study |

Next.js Image supplies responsive, optimized delivery without modifying the source files. Images render at their natural aspect ratios, with no cropping, filters, recoloring, or text overlays. Only the hero portrait is preloaded; project images load lazily.

### Fonts

Manrope (English) and Vazirmatn (Persian) are self-hosted from `src/assets/fonts/` through `next/font/local`. Their SIL Open Font License notices are included alongside them. Files were obtained from the official [Google Fonts repository](https://github.com/google/fonts); runtime and builds do not need Google Fonts access.

## Scope

Project descriptions explicitly credit collaborative team work with shared research, UX, UI, user flows, wireframing, and design-system responsibilities. No fictional employers, statistics, testimonials, personal history, or measurable outcomes are included. Deployment configuration is unchanged.
