# Nasim Akbari — Personal Portfolio

A bilingual portfolio for **Nasim Akbari | Product Designer & AI-Powered Web Creator**, built with Next.js App Router, TypeScript, and Tailwind CSS. The charcoal theme and self-hosted typography are retained in an original minimalist redesign with restrained lime accents, larger typography, oversized project covers, and direct contact access from the first screen.

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

The page follows this order: sticky navigation with a shared contact menu, Hero with portrait and contact actions, Selected Work, Services, About Me, Work Experience, Education & Certification, Professional Recommendation, Contact, Footer. The existing design-process content is preserved in an accessible expandable panel under Services.

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

## Redesign review

This update follows the design principles supplied in the brief: generous balanced whitespace, large confident typography, full-width project imagery, quiet surfaces, subtle hover effects, and direct client contact actions. The requested Proxio reference and Framer marketplace pages were blocked by the cloud proxy (HTTP 403), so their actual visual structure and responsive behavior could not be inspected. No Framer source code, branded assets, or artwork is used.

- The sticky “Let's Talk” button is visible on desktop and mobile and opens contact options instead of launching an email client.
- Hero actions use the shared contact menu, Selected Work anchor, and real CV PDF. The truncated mailto in the brief was resolved to the explicitly supplied `akbari.nassim@gmail.com` address.
- Email, LinkedIn, and international phone links are displayed beside the hero actions. Contact links also remain in the Contact section.
- Every project cover is full width at its original aspect ratio, with a visible Behance case-study link and unchanged descriptions, contributions, and team credits.
- Layout animation and hover transitions are subtle; reduced-motion preferences disable them. Content remains available without JavaScript.
- No dependencies, public assets, professional facts, Vercel settings, or deployment configuration were changed.

Local Chromium checks covered both languages at 1440, 1024, 768, 390, and 320 pixels, including first-screen contact visibility, section order, navigation, language refresh persistence, all local images, safe external-link attributes, and actual PDF downloads. Automated WCAG A/AA scans reported no violations at those combinations. External destination availability remains unverified because of the proxy restriction; in particular, the existing LinkedIn URL is preserved exactly as supplied.

## Hero and contact refinement

The hero hierarchy now reads: small greeting, prominent name as the sole main heading, clearly visible unchanged professional title as a secondary heading, then the smaller supporting tagline. The portrait and all other sections retain their existing design.

`src/components/contact-menu.tsx` supplies the same interaction for the Header, Hero, and bottom Contact section. A real button exposes `aria-haspopup`, `aria-controls`, and expanded state. A native modal dialog anchors near its trigger on desktop and becomes a bottom sheet on narrow screens. It focuses Email on opening, cycles Tab/Shift+Tab within its controls, closes on Escape, outside click, or its close button, locks background scrolling, and restores focus to the originating trigger. Email/phone/LinkedIn only activate their respective destinations when selected. The bottom Contact section no longer displays an oversized email headline.

All contact-menu labels and the revised greeting and contact invitation are translated into Persian. Logical layout and isolated email/phone text support RTL. The dialog transitions respect reduced-motion preferences. Direct hero contact links and a Contact-section noscript fallback remain available if JavaScript is disabled. No package or Vercel configuration change is required.

Validation for this refinement includes all three menu locations in both languages at 1440, 1024, 768, 390, and 320 pixels; typography hierarchy; panel bounds; keyboard focus and dismissal; touch interaction; language switching/refresh; exact destination URLs; and automated accessibility scans. LinkedIn new-tab behavior was tested with a mocked response; this does not establish remote profile availability.
