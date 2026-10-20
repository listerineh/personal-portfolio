# Tests

End-to-end tests with Playwright. They check what a visitor relies on: the content is there in both languages, controls have the right names and states (tabs, pressed toggles, expanded menu), keyboard paths work, and the forms behave. Email delivery and third-party APIs are out of scope; those routes are mocked.

## Structure

```
tests/
├── support/setup.ts            open(page, path, locale): language cookie + cookie banner already answered
├── home/                       one spec per home section (hero, career, projects, skills, articles + contact)
├── layout/header.spec.ts       navigation, phone menu, language switch, theme
├── lib/email.spec.ts           code only: ISO week keys, digest and follow-up email contents; the cron route refuses without CRON_SECRET
└── pages/
    ├── pages.spec.ts           every route in EN and ES: status, <html lang>, h1, <title>; 404; noindex on the newsletter link pages
    ├── flows.spec.ts           contact form, newsletter double opt-in and unsubscribe, blog search (API routes mocked with page.route)
    ├── related.spec.ts         after an article: related posts (same in EN/ES), previous/next by date, first and last post
    ├── locale.spec.ts          first visit follows the browser's language, the visitor's choice wins, unsupported → English
    ├── og.spec.ts              each post's share card: og/twitter image in EN/ES, 1200×630 PNG, 404s
    └── csp.spec.ts             CSP header and fresh nonce, exclusions, report endpoint, no violations on any page in EN and ES
```

Each spec runs on every project in `playwright.config.ts` (desktop Chromium, Firefox, WebKit; Pixel 5; iPhone 12). Specs that only make sense on one form factor branch on the `isMobile` fixture. Most specs run with `reducedMotion: 'reduce'` so content is still and assertions don't wait on animations; the marquee pause test opts back into motion.

Selectors are roles, accessible names and visible text (the same English copy as `messages/en.json`), not CSS classes, so a restyle doesn't break them but a copy change does.

## Device Coverage

All tests run on:
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12

## Running Tests

```bash
# Once: install browsers
npm run test:setup

# Run all tests (Playwright starts the app on port 3001 itself via `npm run test:server`;
# don't start it by hand, reuseExistingServer is off)
npm run test

# Run specific test file
npm run test -- tests/home/hero.spec.ts

# One browser only
npm run test -- --project=chromium

# Run with UI
npm run test:ui

# View report
npm run test:report
```

## CI

`.github/workflows/e2e.yml` runs the suite on every pull request to `main` or `develop` and on every push to `develop`:
Chromium desktop and Pixel 5 (`chromium`, `Mobile Chrome`) against the production build (`npm run build`, then
`npm run start -- -p 3001`). Run it by hand from the Actions tab to cover every browser. Failures show up as annotations
on the PR; the HTML report (with traces for retried tests) is uploaded as the `playwright-report` artifact.

## Best Practices

1. Open pages with `open()` from `tests/support/setup.ts`, never a bare `page.goto`, so language and cookie consent are fixed
2. Select by role, accessible name or visible text; avoid CSS classes and fixed waits (`waitForTimeout`)
3. Mock `/api/*` with `page.route` when a flow would send email or write data
4. Name tests after the behavior a visitor relies on
5. Keep tests independent: each one runnable on its own
