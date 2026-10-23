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

This refinement starts from `origin/main` at `f72aa90` (PR #12 merged), which already includes the reviewed asymmetric art direction (`1e5b1f0`) and the latest element-level scroll reveals. Every existing remote feature branch was fetched and checked for ancestry; all are included in that main commit. The working tree was clean before creating `feat/readable-atmospheric-mist`. Existing work and branches were not reset, overwritten, or removed.

All original assets, PDFs, factual copy, SEO metadata, identity/contact config, contact dialog, and mobile navigation logic remain unchanged. Only ornamental terminal periods were removed from bilingual headings; sentence punctuation and the exact recommendation remain intact. English is the default at `/`; Persian is at `/fa`. Routes preserve language through navigation and refresh. The native contact dialog retains keyboard containment, focus restoration, Escape/outside-click closing, touch handling, and its mobile bottom sheet. There is one header Let's Talk control and two CV downloads (header and About).

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

`Atmosphere` is a server-rendered decorative component with no client bundle or additional dependency. Three independent Hero wisps use blurred, translucent charcoal/green-gray gradients; Selected Work has one much fainter layer and Contact has two. Calm sections retain clean backgrounds. The bounded layers animate only transforms along closed paths over **38, 46, and 58 seconds**, with different negative delays and eased turnarounds. Opacity stays low and stable rather than pulsing. Paint containment and clipping bound their footprint; isolated negative stacking keeps every layer behind content. They are hidden from assistive technology and cannot intercept pointer input.

CSS motion starts without hovering or JavaScript. Reduced-motion preferences, including a live change, stop all haze animation and soften the remaining static atmosphere. Existing scroll reveals remain unchanged.

## Source organization

- `src/app/globals.css`: retained shared typography, readability tokens, accessibility, and existing UI controls.
- `src/app/art-direction.css`: the focused composition layer, imported after the shared stylesheet by `Document`; includes responsive and RTL art direction.
- `src/components/portfolio.tsx`: preserved editorial content structure, with decorative atmosphere placements and cleaned heading punctuation.
- `src/components/atmosphere.tsx`, `src/app/atmosphere.css`: bounded CSS-only ambient motion, placement variants, and reduced-motion fallback.
- `src/components/section-motion.tsx`: one-time scroll reveals and progressive enhancement.
- `src/components/contact-menu.tsx`, `mobile-navigation.tsx`: existing interactions, unchanged.
- `src/content/en.ts`, `src/content/fa.ts`: preserved factual translations; ornamental heading end periods removed.
- `src/config/site.ts`: unchanged verified identity, real asset paths, and contact/project/XGen URLs.
- `src/content/metadata.ts`: unchanged SEO and language alternates.

## Motion and accessibility

Headings enter from the reading direction; projects use subtle translate/scale depth; services and timeline entries use small directional motion; credentials fade/slide; the recommendation uses a softer fade; Contact has a gentle closing entrance. Durations are 500–650ms, with small 0/50/100ms group delays. Hero entrances are soft and short.

The existing IntersectionObserver/Web Animations pattern reveals elements once, with no CSS-hidden pending content. Reduced motion, live preference changes, JavaScript disabled, missing APIs, animation failure, and keyboard-focus cancellation retain visible content. Only transform/opacity animate, avoiding layout shifts. No animation library dependency was introduced.

## Validation and limits

Browser validation covers both languages at 1920, 1440, 1024, 768, 390, and 320px: intended asymmetric/stacked composition, name/title/tagline hierarchy, no overflow, natural image ratios, preserved project/link/tag content, action counts, contact accessibility, mobile navigation, language persistence, and actual CV downloads. Automated WCAG A/AA scans run with both the page and dialog open.

Separate ordinary-motion tests scroll desktop and mobile without hovering, verify varied animation frames/timing/stagger, ensure every ready target reveals once, and confirm no replay, stranded hidden content, height changes, or reveal-induced layout shifts. Failure and reduced-motion fallbacks are exercised independently.

Actual smoke verification samples the running CSS animations and rendered browser pixels **4.2 seconds apart, without pointer interaction**, in both languages at 1920, 1440, 768, and 390px. Each Hero layer advances independently; captures show low-contrast pixel changes in the atmosphere. Tests also cover closed keyframe paths, 25–60s durations, no page-height change or motion-induced layout shift after font loading, background stacking/input safety, unchanged contact destinations, Tab containment, Escape/outside-click closing, focus return, live reduced-motion stopping, and CSS animation with JavaScript disabled.

External Behance, XGen, and LinkedIn requests are blocked by this environment's outbound proxy (HTTP 403). Exact rendered destinations and safe new-tab attributes are checked locally, but remote availability cannot be established here. No missing portrait or other unsupported endorsement was invented.

Vercel settings, GitHub integration, and deployment configuration remain unchanged. Review the feature branch before merging; no deployment command or automatic merge is performed.
