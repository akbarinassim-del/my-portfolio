# Nasim Akbari — Personal Portfolio

A bilingual Next.js App Router portfolio for **Nasim Akbari | Product Designer & AI-Powered Web Creator**, built with TypeScript, Tailwind CSS, self-hosted Manrope/Vazirmatn, and a dark charcoal/lime identity.

## Development

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm run typecheck
npm start
```

The build generates route types required by TypeScript. No dependencies or deployment settings were added for this redesign.

## Branch baseline and preserved work

The redesign starts from `main` at `1fbe694` (PR #9 merged). All preceding feature branches were checked for ancestry and are included in that main commit; the working tree was clean before creating `feat/asymmetric-art-direction`. Existing feature branches were not reset, overwritten, or removed.

All original assets, PDFs, bilingual factual dictionaries, SEO metadata, identity/contact config, contact dialog, and mobile navigation logic remain unchanged. English is the default at `/`; Persian is at `/fa`. Routes preserve language through navigation and refresh. The native contact dialog retains keyboard containment, focus restoration, Escape/outside-click closing, touch handling, and its mobile bottom sheet. There is one header Let's Talk control and two CV downloads (header and About).

## Creative compositions

This is an original asymmetric editorial implementation using existing content and assets:

- **Hero:** prominent two-line name with an offset second line, clearly visible unchanged professional title, an inset supporting-text column, and a portrait aligned off the primary text axis. Mobile retains the bold identity while opening the description/CTA into readable full-width rows.
- **Selected Work:** BeatPass is image-dominant and full width. EcoGold integrates text beside a right-hand cover; Shipply reverses the image/text relationship and shifts the composition inward. Tablet/mobile collapse these arrangements into a clear reading order. All original project copy, contributions, team credit, artwork proportions, and Behance links remain intact.
- **Services:** numbered editorial rows replace repeated cards. The middle row is inset on larger screens; mobile follows a consistent readable single-column flow.
- **About:** smaller left-hand editorial heading with larger right-weighted identity prose, background text, profile link, and CV action.
- **Experience:** a compact margin-led timeline, clearly separating dates, company, role, and responsibilities.
- **Education:** an offset section with a minimal degree entry and a smaller, lower certification surface.
- **Recommendation:** one restrained green-tinted editorial quote block, exact supplied attribution and translation, and the original-source link.
- **Contact:** a larger typographic ending with normal-sized, directly clickable email/phone/LinkedIn information. The email is not used as an oversized headline.

Logical grid placement and inline spacing mirror layouts in Persian. Real images are not retouched, regenerated, distorted, or cropped. The portrait's generic caption is hidden on small screens to avoid unnecessary height; all factual content remains available.

## Source organization

- `src/app/globals.css`: retained shared typography, readability tokens, accessibility, and existing UI controls.
- `src/app/art-direction.css`: the focused composition layer, imported after the shared stylesheet by `Document`; includes responsive and RTL art direction.
- `src/components/portfolio.tsx`: existing content structure with name-line spans, a hero story group, and project-specific composition classes.
- `src/components/section-motion.tsx`: one-time scroll reveals and progressive enhancement.
- `src/components/contact-menu.tsx`, `mobile-navigation.tsx`: existing interactions, unchanged.
- `src/content/en.ts`, `src/content/fa.ts`: unchanged factual translations.
- `src/config/site.ts`: unchanged verified identity, real asset paths, and contact/project/XGen URLs.
- `src/content/metadata.ts`: unchanged SEO and language alternates.

## Motion and accessibility

Headings enter from the reading direction; projects use subtle translate/scale depth; services and timeline entries use small directional motion; credentials fade/slide; the recommendation uses a softer fade; Contact has a gentle closing entrance. Durations are 500–650ms, with small 0/50/100ms group delays. Hero entrances are soft and short.

The existing IntersectionObserver/Web Animations pattern reveals elements once, with no CSS-hidden pending content. Reduced motion, live preference changes, JavaScript disabled, missing APIs, animation failure, and keyboard-focus cancellation retain visible content. Only transform/opacity animate, avoiding layout shifts. No animation library dependency was introduced.

## Validation and limits

Validation covers both languages at 1440, 1280, 1024, 900, 768, 700, 600, 390, and 320px: intended asymmetric/stacked composition, name/title/tagline hierarchy, no overflow, natural image ratios, preserved project/link/tag content, action counts, contact accessibility, mobile navigation, language persistence, and actual CV downloads. Automated WCAG A/AA scans run with both the page and dialog open.

Separate ordinary-motion tests scroll desktop and mobile without hovering, verify varied animation frames/timing/stagger, ensure every ready target reveals once, and confirm no replay, stranded hidden content, height changes, or reveal-induced layout shifts. Failure and reduced-motion fallbacks are exercised independently.

External Behance, XGen, and LinkedIn requests are blocked by this environment's outbound proxy (HTTP 403). Exact rendered destinations and safe new-tab attributes are checked locally, but remote availability cannot be established here. No missing portrait or other unsupported endorsement was invented.

Vercel settings, GitHub integration, and deployment configuration remain unchanged. Review the feature branch before merging; no deployment command or automatic merge is performed.
