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

The initial width/readability refinement started from `origin/main` at `f72aa90`. This portrait/global-smoke follow-up continues the **same** `feat/readable-atmospheric-mist` branch at `e351e5a`; it does not replace its reviewed asymmetric layout or scroll reveals. The only new uploaded asset was copied byte-for-byte from `origin/main` at `610f0f3`. No main-branch merge, branch reset, or deployment was performed.

All original portrait/project images, PDFs, factual copy, SEO metadata, identity/contact values, contact dialog, and mobile navigation logic remain unchanged. The portrait source now points to the supplied `public/images/profile.png`. Only ornamental terminal periods were removed from bilingual headings; sentence punctuation and the exact recommendation remain intact. English is the default at `/`; Persian is at `/fa`. Routes preserve language through navigation and refresh. The native contact dialog retains keyboard containment, focus restoration, Escape/outside-click closing, touch handling, and its mobile bottom sheet. There is one header Let's Talk control and two CV downloads (header and About).

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

## Width, readability, and atmosphere

The main shell now grows to **1360px** (about **1344px at a 1440px viewport**), with responsive desktop gutters of 32–64px per side before reaching the maximum width. Tablet gutters are 24px; mobile gutters are 18px. Featured imagery uses the expanded width while prose is capped at 680px (section introductions at 640px). Secondary project columns retain their intentional narrower compositions rather than stretching all text.

Main supporting copy is **18px on desktop and 16px on mobile**; secondary labels and contribution tags are 15px/14px. Body line height is 1.7 in English and 1.85 in Persian. Name/title prominence and the asymmetric image/text relationships remain intact. Project images reserve their original 1672:941 ratio, avoiding fractional layout changes when optimized lazy images finish loading. Decorative name dots, heading end periods, subtitle dashes, and ornamental bullets were removed; meaningful numbering and functional icons remain.

`Atmosphere` is now one decorative **fixed viewport canvas**, mounted once by `Document` behind all page content, including the footer. It replaces the separate section-local cloud layers and the unused cloud SVG. Seven gray-green, translucent trails evolve procedurally: their curved centerlines curl and drift, local ribbon widths stretch and taper, and independent lifetimes gently disperse and reform. The motion changes actual geometry rather than translating an unchanged image. Nested low-opacity fills soften the edges without per-frame blur/noise filters or external animation libraries.

The backing buffer is capped at **960 × 800 pixels**, independent of document height and high-DPI screens. Painting is limited to at most 24fps; points/buffers and the tint gradient are reused. Animation pauses when the document is hidden and stops for reduced motion, including live preference changes. Resize and unmount clean up observers/listeners/animation frames. Without JavaScript or a 2D context, the decorative layer stays empty and the server-rendered portfolio remains readable.

A viewport observer smoothly adjusts one continuous layer: moderate in the Hero, soft in Work/About, very light through Services/Experience/Education, and gentle through Recommendation/Contact/Footer. The latter surfaces retain their dark colors with slight translucency so the background can continue beneath them. The canvas is hidden from assistive technology, receives no pointer events, and paints behind all text, images, and controls. Existing scroll reveals remain unchanged.

## Uploaded portrait: source limitation

`public/images/profile.png` is **1086 × 1448, RGB, fully opaque**. Its apparent transparency checkerboard is baked into the pixels; it has no alpha channel. Its Git blob hash matches the uploaded source (`754220b027a634682ec785bc8e71df0ff94cbd50`). It is used as supplied, with `object-fit: contain`, natural proportions, zero CSS border/radius/background/shadow, and no clipping or retouching. The full supplied shoulder/arm silhouette and pose are retained on desktop and mobile.

A seamless transparent cutout **cannot be verified or delivered from this file while preserving it unchanged**. Replace that asset with a genuinely transparent PNG at the same path to complete the intended integration. No substitute portrait, background-removal operation, or invented missing body detail was introduced.

## Source organization

- `src/app/globals.css`: retained shared typography, readability tokens, accessibility, and existing UI controls.
- `src/app/art-direction.css`: the focused composition layer, imported after the shared stylesheet by `Document`; includes responsive and RTL art direction.
- `src/components/portfolio.tsx`: preserved editorial content structure; section-local atmosphere placements removed in favor of the single global layer.
- `src/components/atmosphere.tsx`, `src/app/atmosphere.css`: bounded procedural Canvas 2D motion, density transitions, and visibility/reduced-motion lifecycle.
- `src/components/document.tsx`: mounts the one global decorative background for both languages.
- `src/components/section-motion.tsx`: one-time scroll reveals and progressive enhancement.
- `src/components/contact-menu.tsx`, `mobile-navigation.tsx`: existing interactions, unchanged.
- `src/content/en.ts`, `src/content/fa.ts`: preserved factual translations; ornamental heading end periods removed.
- `src/config/site.ts`: verified identity/contact/project/XGen values preserved; portrait updated to the actual uploaded path.
- `src/content/metadata.ts`: unchanged SEO and language alternates.

## Motion and accessibility

Headings enter from the reading direction; projects use subtle translate/scale depth; services and timeline entries use small directional motion; credentials fade/slide; the recommendation uses a softer fade; Contact has a gentle closing entrance. Durations are 500–650ms, with small 0/50/100ms group delays. Hero entrances are soft and short.

The existing IntersectionObserver/Web Animations pattern reveals elements once, with no CSS-hidden pending content. Reduced motion, live preference changes, JavaScript disabled, missing APIs, animation failure, and keyboard-focus cancellation retain visible content. Only transform/opacity animate, avoiding layout shifts. No animation library dependency was introduced.

## Validation and limits

Browser validation covers both languages at 1920, 1440, 1024, 768, 390, and 320px: intended asymmetric/stacked composition, name/title/tagline hierarchy, no overflow, natural image ratios, preserved project/link/tag content, action counts, contact accessibility, mobile navigation, language persistence, and actual CV downloads. Automated WCAG A/AA scans run with both the page and dialog open.

Separate ordinary-motion tests scroll desktop and mobile without hovering, verify varied animation frames/timing/stagger, ensure every ready target reveals once, and confirm no replay, stranded hidden content, height changes, or reveal-induced layout shifts. Failure and reduced-motion fallbacks are exercised independently.

Global smoke verification captures normal-motion browser frames in English/Persian at desktop, tablet, and mobile sizes. It checks stationary time-separated captures throughout Hero, Work, Services, About, Experience, Education, Recommendation, Contact, and Footer; verifies that trail geometry deforms, canvas pixels change, and the background remains visible beyond the Hero/footer; and checks reduced-motion stopping, bounded allocation, no overflow, and no motion-induced layout shifts. Hero screenshots retain the supplied opaque portrait so the source limitation is visible rather than concealed. Existing contact/CV/navigation regressions and one-time scroll reveals are verified separately.

External Behance, XGen, and LinkedIn requests are blocked by this environment's outbound proxy (HTTP 403). Exact rendered destinations and safe new-tab attributes are checked locally, but remote availability cannot be established here. No missing portrait or other unsupported endorsement was invented.

Vercel settings, GitHub integration, and deployment configuration remain unchanged. Review the feature branch before merging; no deployment command or automatic merge is performed.
