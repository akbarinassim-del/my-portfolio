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
- `src/components/section-motion.tsx`: progressive IntersectionObserver scroll reveals with reduced-motion handling and visible no-JavaScript fallback.
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

## Section rhythm and motion

Major sections now use distinct, quiet black, charcoal, and green-tinted panel surfaces with consistent padding, subtle borders, and rounded corners. The featured BeatPass card has a stronger surface/border than the secondary EcoGold/Shipply cards; original covers remain uncropped. Project cards/images, service cards, credential cards, buttons, and links have restrained hover transitions. The existing name/title/tagline hierarchy and portrait are preserved.

The new header CV download is a visible text action, not an icon-only control. On narrow screens, the header uses two compact rows so language selection, CV, contact, and mobile navigation remain accessible without clipping. The second CV download remains in About.

Scroll motion is progressive enhancement: content is visible by default. Only sections below the viewport are marked pending after IntersectionObserver initializes. Each reveals once with a short opacity/16px translate transition. Sections already visible on load remain visible, keyboard focus reveals pending content, unsupported/no-JavaScript browsers retain all content, and reduced-motion preferences disable reveals. Changing the preference to reduced motion disconnects observation and reveals everything. Print styles also force visible content.

Validation includes both languages at 1440, 1024, 768, 390, and 320px; reduced-motion and ordinary-motion behavior; JavaScript-disabled visibility; surface differentiation; hover motion; sticky header actions; actual header and About PDF downloads; menu keyboard/touch behavior; image proportions; and automated WCAG A/AA scans. Factual dictionaries, public assets, metadata, contact-menu logic, and Vercel settings remain unchanged.
