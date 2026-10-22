# Personal Portfolio

A responsive, dark-themed portfolio built with Next.js App Router, TypeScript, and Tailwind CSS v4. Includes About Me, Work Experience, Skills, Projects, Education, and Contact sections, plus a mobile navigation menu.

## Development

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser.

## Validation and production

```bash
npm run build
npm run typecheck
npm start
```

`npm start` serves the production build. The site does not require environment variables, a database, or external fonts. No automated test suite is configured.

## Customize

- Edit `src/app/page.tsx` to replace the placeholder name, biography, experience, skills, projects, education, and contact details.
- Replace the example GitHub and LinkedIn URLs and `hello@example.com` before publishing. Project links are explicitly marked as placeholders.
- Edit `src/app/globals.css` to change colors, typography, responsive layouts, and artwork.
- Update the title and description in `src/app/layout.tsx`.

The project artwork is generated entirely with CSS. The contact link opens the visitor’s email client; there is no contact form backend. Navigation works without client-side JavaScript, and reduced-motion preferences and keyboard focus are supported.

## Deployment

Deploy as a Next.js application on Vercel or any Node.js host supporting Next.js 16. Run `npm ci` and `npm run build`, then serve with `npm start`. The server listens on `0.0.0.0`; set `PORT` if your host requires a different port.
