# Scripts

## Service Worker Cache Management

### Update Service Worker Version

Automatically updates the Service Worker cache version with a timestamp to force cache invalidation for all users.

**Usage:**
```bash
npm run update-sw
```

**What it does:**
- Updates `CACHE_NAME` in `public/sw.js` with current timestamp
- Format: `listerineh-portfolio-2026-03-11T00-40-30`
- Forces all browsers to download fresh content on next visit

**Automatic execution:**
- Runs automatically before every `npm run build` (via `prebuild` script)
- Ensures cache is busted on every deployment

**Manual execution:**
```bash
node scripts/update-sw-version.js
```

**When to use:**
- Automatically: Every deployment (already configured)
- Manually: When you want to force cache refresh without deploying

**Example output:**
```
✅ Service Worker cache version updated
   Old: listerineh-portfolio-v2-2026-03-11
   New: listerineh-portfolio-2026-03-11T00-40-30
```

---

## Blog Notification Scripts

### Extract Blog Data

Extracts metadata from a blog post file for use in notifications.

**Usage:**
```bash
node scripts/extract-blog-data.js <blog-file-path>
```

**Example:**
```bash
node scripts/extract-blog-data.js src/lib/data/blog/my-new-post.ts
```

**Output:** JSON with title, slug, excerpt, and imageUrl

### Send Blog Notification

Manually send a blog notification to all subscribers.

**Usage:**
```bash
npm run notify-blog -- --title "Blog Title" --slug "blog-slug" [--excerpt "Description"] [--image "URL"]
```

**Example:**
```bash
npm run notify-blog -- --title "Building with Next.js" --slug "building-with-nextjs" --excerpt "Learn how to build modern apps"
```

**Note:** This is called automatically by GitHub Actions when a new blog is pushed to main.

## Image Conversion Scripts

### Convert Images to WebP

Converts JPEG, JPG, and PNG images to WebP format for better performance.

**Prerequisites:**
```bash
npm install sharp --save-dev
```

**Usage:**
```bash
node scripts/convert-images-to-webp.js
```

**Features:**
- Converts `.jpg`, `.jpeg`, and `.png` files to `.webp`
- Quality set to 85% (good balance between quality and file size)
- Preserves original files (uncomment lines in script to delete originals)
- Shows progress with emoji indicators

**After Conversion:**
1. Update image references in your code from `.jpeg`/`.jpg`/`.png` to `.webp`
2. Test that all images load correctly
3. Optionally delete original files if everything works
