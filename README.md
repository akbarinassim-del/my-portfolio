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

This final UI refinement continues the existing **`feat/readable-atmospheric-mist`** branch from **`fd576fa`**, the reviewed version with the transparent olive-outfit portrait and continuous page-wide smoke. That version has not been merged into main; no older main-branch implementation was substituted.

All original assets/PDFs, project descriptions/contributions/team credits, service/process content, biography, employers, education/certification, exact recommendation/attribution, and contact URLs are preserved. The revised bilingual copy is limited to a concise mobile-only introduction, the Selected Work headline, and the closing contact headline/supporting sentence. The decorative About value row is removed. There is still one header Let's Talk control and two CV downloads (header and About). English remains `/`; Persian remains `/fa` with RTL.

The smoke renderer/CSS, scroll-reveal component, header/contact/mobile-navigation interactions, portrait asset, site config, and deployment settings are unchanged from the reviewed baseline.

## Creative compositions

This is an original asymmetric editorial implementation using existing content and assets:

- **Hero:** the desktop composition is preserved exactly. Below 600px, the identity is followed by a centered 208–252px portrait, one concise introduction, View My Work, and existing contact links. Full shoulders/arms/pose and alpha transparency are preserved with `object-fit: contain`. Header placement and actions are unchanged.
- **Selected Work:** BeatPass is image-dominant and full width. EcoGold integrates text beside a right-hand cover; Shipply reverses the image/text relationship and shifts the composition inward. Tablet/mobile collapse these arrangements into a clear reading order. All original project copy, contributions, team credit, artwork proportions, and Behance links remain intact.
- **Services:** numbered editorial rows replace repeated cards. The middle row is inset on larger screens; mobile follows a consistent readable single-column flow.
- **About:** the open two-column editorial biography and actions remain; the decorative slogan row is removed. Design Process keeps its top rule but loses the redundant bottom rule, leaving the intentional About top divider with a shorter transition gap.
- **Experience:** a compact margin-led timeline, clearly separating dates, company, role, and responsibilities.
- **Education:** offset open degree/certification entries retain the asymmetric positions, dates, and certificate verification link; the filled green certification rectangle is removed.
- **Recommendation:** a quieter charcoal quote panel with softened corners, comfortable typography, exact recommendation/attribution, and the original-source link.
- **Contact:** an open editorial ending headed “Let’s work together,” with a restrained type scale, concise supporting sentence, and directly clickable email/phone/LinkedIn links. Desktop uses offset columns; mobile stacks the details with 44px link targets.

Logical grid placement and inline spacing mirror layouts in Persian. Real images are not retouched, regenerated, distorted, or cropped. The portrait's generic caption is hidden on small screens to avoid unnecessary height; all factual content remains available.

## Width, readability, and atmosphere

The main shell now grows to **1360px** (about **1344px at a 1440px viewport**), with responsive desktop gutters of 32–64px per side before reaching the maximum width. Tablet gutters are 24px; mobile gutters are 18px. Featured imagery uses the expanded width while prose is capped at 680px (section introductions at 640px). Secondary project columns retain their intentional narrower compositions rather than stretching all text.

Main supporting copy is **18px on desktop and 16px on mobile**; secondary labels and contribution tags are 15px/14px. Body line height is 1.7 in English and 1.85 in Persian. Name/title prominence and the asymmetric image/text relationships remain intact. Project images reserve their original 1672:941 ratio, avoiding fractional layout changes when optimized lazy images finish loading. Decorative name dots, heading end periods, subtitle dashes, and ornamental bullets were removed; meaningful numbering and functional icons remain.

`Atmosphere` is now one decorative **fixed viewport canvas**, mounted once by `Document` behind all page content, including the footer. It replaces the separate section-local cloud layers and the unused cloud SVG. Seven gray-green, translucent trails evolve procedurally: their curved centerlines curl and drift, local ribbon widths stretch and taper, and independent lifetimes gently disperse and reform. The motion changes actual geometry rather than translating an unchanged image. Nested low-opacity fills soften the edges without per-frame blur/noise filters or external animation libraries.

The backing buffer is capped at **960 × 800 pixels**, independent of document height and high-DPI screens. Painting is limited to at most 24fps; points/buffers and the tint gradient are reused. Animation pauses when the document is hidden and stops for reduced motion, including live preference changes. Resize and unmount clean up observers/listeners/animation frames. Without JavaScript or a 2D context, the decorative layer stays empty and the server-rendered portfolio remains readable.

A viewport observer smoothly adjusts one continuous layer: moderate in the Hero, soft in Work/About, very light through Services/Experience/Education, and gentle through Recommendation/Contact/Footer. The open closing section and understated charcoal recommendation panel keep the existing background behind readable content. The canvas is hidden from assistive technology, receives no pointer events, and paints behind all text, images, and controls. Existing scroll reveals remain unchanged.

## Transparent portrait

The approved `public/images/prof.png` remains byte-for-byte unchanged: **1086 × 1448 RGBA**, with genuine transparent background pixels and the full supplied silhouette. Its blob hash is `1be01a7e6baa5c84531a89e17ba6b76a40acebf2`. No image regeneration, recoloring, retouching, cropping, stretching, frame, or opaque background is introduced. Mobile uses larger responsive image candidates; desktop image dimensions/placement and appearance are preserved.

## Source organization

- `src/app/globals.css`: retained shared typography, readability tokens, accessibility, and existing UI controls.
- `src/app/art-direction.css`: the focused composition layer, imported after the shared stylesheet by `Document`; includes responsive and RTL art direction.
- `src/components/portfolio.tsx`: preserved desktop structure, with identity/portrait/introduction in logical reading order and a mobile-only supporting introduction; the About slogan row is removed.
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

Browser validation covers both languages at 1920, 1440, 1024, 768, 430, 390, 375, and 320px: intended asymmetric/stacked composition, name/title/tagline hierarchy, no overflow, natural image ratios, preserved project/link/tag content, action counts, contact accessibility, mobile navigation, language persistence, and actual CV downloads. Automated WCAG A/AA scans run with both the page and dialog open.

Separate ordinary-motion tests scroll desktop and mobile without hovering, verify varied animation frames/timing/stagger, ensure every ready target reveals once, and confirm no replay, stranded hidden content, height changes, or reveal-induced layout shifts. Failure and reduced-motion fallbacks are exercised independently.

Pixel comparisons against the saved `fd576fa` baseline verify identical desktop Hero output at **1440px and 1920px in both languages**, and unchanged mobile/tablet headers. Structural checks verify that the larger mobile portrait is centered below the title, followed by one introduction and View My Work, without overlap or overflow. The process end rule is absent, About's top divider remains, certification is open, recommendation is charcoal, and Contact is unboxed.

Smoke and scroll-animation source files are byte-for-byte unchanged. Normal-motion browser checks retain time-varying background pixels, one-time varied/staggered reveals, and reduced-motion stopping; the portrait is rendered above the background with genuine alpha. All four supplied image files and factual portfolio dictionaries are checked for unintended changes. Screenshots are captured from the rendered local production build; the live Vercel Preview address is retrieved separately from the commit's GitHub deployment status.

External Behance, XGen, and LinkedIn requests are blocked by this environment's outbound proxy (HTTP 403). Exact rendered destinations and safe new-tab attributes are checked locally, but remote availability cannot be established here. No missing portrait or other unsupported endorsement was invented.

Vercel settings, GitHub integration, and deployment configuration remain unchanged. Review the feature branch before merging; no deployment command or automatic merge is performed.
