# Nasim Akbari — Personal Portfolio

A bilingual Next.js App Router portfolio for **Nasim Akbari | Product Designer & AI-Powered Web Creator**, using TypeScript, Tailwind CSS, self-hosted Manrope/Vazirmatn, and a dark charcoal/lime visual identity.

## Development and validation

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

The build generates route types required by the TypeScript check. ESLint uses the Next.js Core Web Vitals and TypeScript rules. No additional dependencies or test runner were introduced by the readability refinement.

## Current presentation

- English is the default at `/`; Persian is at `/fa`, with correct document language, direction, and RTL layout. The selected URL preserves language across navigation and refresh.
- The corrected hero hierarchy remains: greeting, prominent name, visible professional title, smaller supporting tagline, and the real portrait.
- Exactly one **Let's Talk** button appears in the sticky header. The existing `ContactMenu` opens a desktop panel or mobile bottom sheet with Email, Phone, and LinkedIn. Its keyboard focus handling, Escape/outside-click closing, and focus restoration remain unchanged.
- Exactly two **Download CV** actions appear: one in the sticky header and one in About Me. Both download `/Nasim-Akbari-CV.pdf`, the real uploaded PDF. There are no other resume buttons.
- Selected Work features BeatPass above equally sized EcoGold and Shipply cards in a desktop two-column grid; all projects stack on mobile. Responsive images retain natural aspect ratios with no cropping or artwork changes.
- Body text uses a shared 16px desktop / 15px mobile scale. Secondary information uses 14px text; only decorative section indicators remain small.
- Services use consistent outlined icons, readable descriptions, matching padding, and equal desktop card heights. The existing process text stays in an expandable panel.
- Work Experience uses a scannable vertical timeline. Education and Certification use matching cards, with institution, qualification, dates, and certificate link.
- Hossein Rezaei’s supplied recommendation retains its exact Persian text, English translation, attribution, role, and original source link. The oversized decorative quote was removed; no replacement portrait was invented.
- Contact contains neatly grouped clickable email, international telephone, and LinkedIn links, without another contact-menu button or oversized email headline.

## Main files

- `src/components/portfolio.tsx`: server-rendered sections and one instance of the header contact menu.
- `src/components/contact-menu.tsx`: existing accessible native-dialog interaction, unchanged by this refinement.
- `src/components/mobile-navigation.tsx`: mobile-menu closing and Escape handling.
- `src/components/section-motion.tsx`: one-time element-level IntersectionObserver/Web Animations reveals with grouped stagger, reduced-motion handling, and visible failure fallbacks.
- `src/content/en.ts` / `src/content/fa.ts`: typed bilingual factual content, unchanged by this refinement.
- `src/config/site.ts`: verified identity, contact information, real asset paths, and project/XGen links.
- `src/content/metadata.ts`: existing SEO title, localized descriptions, canonical URLs, and language alternates; unchanged.
- `src/app/globals.css`: responsive type/spacing tokens, featured/secondary work grid, timeline, cards, focus states, and reduced-motion support.

## Original assets preserved

All seven files under `public/` are unchanged from main, including all project covers, both portraits, and both PDF filenames. The downloadable `Nasim-Akbari-CV.pdf` remains byte-for-byte identical to the original `Resume-main01.pdf`.

The main portrait is `public/images/nasim-hero-dark.png` (1086 × 1448). It was repaired in an earlier change using the exact original upload from Git history; no retouching or image generation was performed. `nasim-profile.png` remains the backup. Project covers are 1672 × 941 PNGs. Font files and SIL Open Font License notices remain in `src/assets/fonts/`.

## Checks and limitations

Browser validation covers both languages at desktop, tablet, and mobile widths, one contact-menu trigger and exactly two CV actions, responsive typography, project layout and links, image proportions, service-card consistency, menu keyboard/touch behavior, accessibility scans, language switching, and actual CV downloading.

All three Behance URLs match the supplied case studies and use safe new-tab attributes. Remote availability could not be verified because the environment’s outbound proxy returns HTTP 403 for Behance. The same restriction previously prevented fetching the recommender portrait; the site uses the supplied recommendation without a broken or substitute image.

Vercel settings, deployment configuration, SEO, factual content, and existing contact-menu logic are unchanged. Review the feature branch before merging; no production deployment is initiated by these instructions.

## Selective section rhythm and real scroll motion

The Hero, Services, About, Experience, and Education remain open layouts rather than repeated enclosing rectangles. Selected Work has a quiet top divider and a prominent featured BeatPass card above the EcoGold/Shipply grid. Services uses three individual cards, About uses an editorial two-column layout, Experience keeps its clean timeline, Education has two subtle cards, Recommendation has one testimonial card, and Contact retains a complementary dark surface. No factual content or assets change.

The header CV download and the second download in About remain the only resume actions. There is still one unchanged header Let's Talk menu. Header responsiveness, typography hierarchy, portrait, RTL layout, and SEO settings are preserved.

`SectionMotion` observes headings, project/service cards, timeline items, education cards, the testimonial, and Contact content individually. Each reveals once on entry using opacity and 16–18px translation over 560ms. Grouped project/service/timeline/education items use 0/60/120ms delays. The observer disconnects each target immediately after its first trigger; scrolling back does not replay animations.

There is no hidden pending CSS state. Ready elements retain their normal visible styles. Only a successfully started Web Animation temporarily applies its opening frame; completion or cancellation restores the visible baseline. Initial viewport content is skipped to avoid flashing. JavaScript-disabled, missing-observer, unsupported-animation, and thrown-animation cases keep content visible. Reduced-motion preferences skip or cancel reveals, and focusing an animated control immediately cancels its reveal. Only opacity/transform animate, so layout dimensions remain unchanged.

Validation covers both languages at 1440, 1024, 768, 390, and 320px for layout, typography, action counts, links, image proportions, contact keyboard/touch behavior, CV downloads, and automated accessibility checks. Dedicated ordinary-motion tests scrolled desktop/mobile pages without hovering: each recorded 19 one-time element reveals, verified duration/distance/stagger and complete visibility afterward, and observed zero reveal-induced layout shifts. Backtracking did not replay animations. Reduced motion, live preference changes, JavaScript disabled, missing IntersectionObserver, and simulated animation failure were also tested.

No new dependencies, factual content, public assets, deployment configuration, or Vercel settings changed.
