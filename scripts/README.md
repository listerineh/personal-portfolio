# Scripts

Run from the repository root. Scripts that render HTML (`generate-og-images.js` pages/projects, `generate-project-images.js`) need Playwright's Chromium: run `npm run test:setup` once.

## Images

### `generate-og-images.js` — share images and app icons

```bash
node scripts/generate-og-images.js            # everything
node scripts/generate-og-images.js pages      # public/og/<page>.png (one per page in src/lib/metadata.ts)
node scripts/generate-og-images.js projects   # public/og/projects/<slug>.png (from src/lib/data/projects.ts)
node scripts/generate-og-images.js icons      # public/icons/*.png from public/favicon.svg
node scripts/generate-og-images.js about      # a single page by id
```

- 1200×630. Pages and projects are rendered with Playwright and saved as quantized PNG; icons use Sharp only (no browser).
- Blog posts are not here: each post's card is drawn on demand by `src/app/og/blog/[file]/route.tsx` (next/og), so a new post needs nothing.
- Share images stay PNG/JPG on purpose: WebP previews are unreliable on LinkedIn, iMessage and Slack.
- Adding a page: add its copy to `PAGES` in `src/lib/metadata.ts` and a template here, then run it by id.

### `generate-project-images.js` — project product shots

```bash
node scripts/generate-project-images.js            # all projects
node scripts/generate-project-images.js openstage  # one project
```

Writes `public/projects/<slug>.webp` at 2400×1800 (4:3, 2x): a pastel ground per project with a product window and a floating card, in the site's Lumen style.

### `convert-images-to-webp.js` / `convert-heic-to-webp.js`

```bash
npm run convert-images   # .jpg/.jpeg/.png in public/ -> .webp
npm run convert-heic     # .heic -> .webp
```

- **Both delete the original file after converting.** Commit or back up first.
- `convert-images` walks all of `public/` recursively but skips `public/og`, `public/icons` and `public/docs`, which must stay PNG/JPG. Files that already have a `.webp` next to them are skipped.
- Update the code that references a converted image.

## Newsletter

### `send-blog-notification.js`

```bash
NEWSLETTER_SECRET=… npm run notify-blog -- --title "Post title" --slug "post-slug" [--excerpt "Summary"] [--image "https://…"]
```

Calls `POST /api/newsletter/send-blog-notification` on `NEXT_PUBLIC_SITE_URL` (default `http://localhost:9002`; set it to `https://listerineh.dev` for production) with `Authorization: Bearer $NEWSLETTER_SECRET`. The secret must match the one in the deployment. Every subscribed contact gets the post with a personal signed unsubscribe link.

Normally you don't run this by hand: the `notify-new-blog` workflow does it when a new post lands on `main`.

### `extract-blog-data.js`

```bash
node scripts/extract-blog-data.js src/lib/data/blog/my-new-post.ts
```

Prints JSON with `title`, `slug`, `excerpt` and an absolute `imageUrl`; used by the `notify-new-blog` workflow.

## Build and cache

| Script | What it does |
|---|---|
| `update-sw-version.js` (`npm run update-sw`) | Writes a timestamped `CACHE_NAME` into `public/sw.js`. Runs automatically before every `npm run build` (`prebuild`), which is why `public/sw.js` shows up modified after a local build |
| `move-storybook.js` | Moves the Storybook build into `public/docs/components` (part of `npm run build:prod`) |
| `revalidate-cache.sh` | Calls `/api/revalidate` by hand. Needs `REVALIDATE_SECRET`; `SITE_URL` defaults to `https://listerineh.dev`. `./scripts/revalidate-cache.sh` (main pages), `… <slug>` (one post), `… --all` |
| `setup-playwright.js` (`npm run test:setup`) | Installs the Playwright browsers if they are not cached |
