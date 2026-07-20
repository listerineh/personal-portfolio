#!/usr/bin/env node

/**
 * generate-og-images.js
 *
 * Generates custom Open Graph images for key pages (about, blog).
 * Uses Playwright to render HTML/CSS templates → PNG → WebP via sharp.
 *
 * Usage:
 *   node scripts/generate-og-images.js          # all pages
 *   node scripts/generate-og-images.js about    # single page
 *   node scripts/generate-og-images.js blog
 */

const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images');
const WIDTH = 1200;
const HEIGHT = 630;
const FILTER = process.argv[2] || null;

// ─── Shared base styles ───────────────────────────────────────────────────

function baseStyles() {
  return `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(145deg, #14141c 0%, #1a1a26 60%, #1c1830 100%);
        color: #fff; position: relative;
      }
      .dot-grid {
        position: absolute; inset: 0; pointer-events: none;
        background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
        background-size: 32px 32px;
      }
      .glow {
        position: absolute; border-radius: 50%; pointer-events: none;
        filter: blur(90px);
      }
      .top-border {
        position: absolute; top: 0; left: 0; right: 0; height: 3px;
        background: linear-gradient(90deg, transparent 0%, rgba(98,114,212,0.75) 30%, rgba(140,60,190,0.55) 70%, transparent 100%);
        z-index: 10;
      }
      .badge {
        display: inline-block;
        background: rgba(98,114,212,0.14); border: 1px solid rgba(98,114,212,0.4);
        border-radius: 100px; padding: 8px 22px;
        color: #8b9ae8; font-size: 13px; font-weight: 700;
        letter-spacing: 0.13em; text-transform: uppercase;
      }
      .tag {
        background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.09);
        border-radius: 6px; padding: 6px 14px;
        color: #8a90aa; font-size: 13px; font-weight: 500;
      }
      .domain { color: #3a4070; font-size: 17px; font-weight: 500; letter-spacing: 0.03em; }
    </style>
  `;
}

// ─── 1. About ─────────────────────────────────────────────────────────────

function htmlAbout() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    .layout {
      position: relative; z-index: 1; display: flex;
      align-items: center; height: 100%;
      padding: 64px 72px 64px 80px; gap: 48px;
    }
    .left { flex: 0 0 60%; display: flex; flex-direction: column; }
    .right { flex: 1; display: flex; align-items: center; justify-content: center; }
    .name {
      font-size: 64px; font-weight: 800; color: #eaedf5;
      line-height: 1.05; letter-spacing: -0.025em;
      margin-top: 24px; margin-bottom: 14px;
    }
    .role {
      font-size: 24px; color: #7880d0; font-weight: 600;
      margin-bottom: 36px; line-height: 1.35;
    }
    .tags { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 48px; }
    .photo-ring {
      width: 228px; height: 228px; border-radius: 50%;
      border: 3px solid rgba(98,114,212,0.5);
      overflow: hidden;
    }
    .photo-ring img { width: 228px; height: 228px; object-fit: cover; }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:520px;height:520px;top:-160px;right:-80px;background:radial-gradient(circle, rgba(98,114,212,0.3), transparent 70%);"></div>
  <div class="glow" style="width:400px;height:400px;bottom:-140px;left:180px;background:radial-gradient(circle, rgba(140,60,190,0.18), transparent 70%);"></div>

  <div class="layout">
    <div class="left">
      <span class="badge">About Me</span>
      <div class="name">Sebastian Alvarez</div>
      <div class="role">Senior Fullstack &amp; Platform Engineer</div>
      <div class="tags">
        <span class="tag">React &amp; Next.js</span>
        <span class="tag">Python</span>
        <span class="tag">Cloud &amp; DevOps</span>
        <span class="tag">AI &amp; Agents</span>
        <span class="tag">GDG Organizer</span>
      </div>
      <span class="domain">listerineh.dev/about</span>
    </div>

    <div class="right">
      <div class="photo-ring">
        <img src="http://local-assets/profile-photo.jpg" />
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 2. Blog ──────────────────────────────────────────────────────────────

function htmlBlog() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body { display: flex; align-items: center; justify-content: center; }
    .content {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 80px;
    }
    .title {
      font-size: 82px; font-weight: 800; color: #eaedf5;
      line-height: 1.0; letter-spacing: -0.03em;
      margin-top: 26px; margin-bottom: 18px;
    }
    .tagline {
      font-size: 22px; color: #6870a8; font-weight: 500;
      margin-bottom: 40px; line-height: 1.4;
    }
    .topics { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
    .topic {
      background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 6px; padding: 7px 18px;
      color: #8a90aa; font-size: 14px; font-weight: 500;
    }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:560px;height:560px;top:-160px;right:-100px;background:radial-gradient(circle, rgba(98,114,212,0.25), transparent 68%);"></div>
  <div class="glow" style="width:480px;height:480px;bottom:-140px;left:-80px;background:radial-gradient(circle, rgba(140,60,190,0.18), transparent 70%);"></div>

  <div class="content">
    <span class="badge">Technical Blog</span>
    <div class="title">Engineering Insights</div>
    <div class="tagline">Web Development · Cloud · AI · System Design · DevOps</div>
    <div class="topics">
      <span class="topic">React</span>
      <span class="topic">Next.js</span>
      <span class="topic">Python</span>
      <span class="topic">AWS</span>
      <span class="topic">Kubernetes</span>
      <span class="topic">AI Agents</span>
    </div>
    <span class="domain">listerineh.dev/blog</span>
  </div>
</body></html>`;
}

// ─── 3. Home ─────────────────────────────────────────────────────────────

function htmlHome() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body { display: flex; align-items: center; }
    .layout {
      position: relative; z-index: 1; display: flex;
      align-items: center; height: 100%;
      padding: 56px 60px 56px 80px; gap: 52px; width: 100%;
    }
    .left { flex: 0 0 52%; display: flex; flex-direction: column; }
    .right { flex: 1; display: flex; align-items: center; justify-content: center; }
    .site-url { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #5e6eb8; margin-bottom: 22px; }
    .name { font-size: 76px; font-weight: 800; color: #eaedf5; line-height: 0.98; letter-spacing: -0.035em; margin-bottom: 18px; }
    .role { font-size: 21px; color: #7880d0; font-weight: 600; margin-bottom: 28px; line-height: 1.4; }
    .tagline { font-size: 15px; color: #484e72; font-weight: 400; margin-bottom: 36px; line-height: 1.6; }
    .stack { display: flex; gap: 8px; flex-wrap: wrap; }
    .pill { padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.11); background: rgba(255,255,255,0.055); color: rgba(255,255,255,0.6); }
    .pill.p { background: rgba(98,114,212,0.14); border-color: rgba(98,114,212,0.35); color: #8b9ae8; }
    .panel { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 24px; width: 100%; display: flex; flex-direction: column; gap: 0; }
    .row { display: flex; align-items: center; gap: 14px; padding: 15px 14px; border-radius: 12px; }
    .row:hover { background: transparent; }
    .ico { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0; }
    .val { font-size: 26px; font-weight: 800; color: #eaedf5; line-height: 1; }
    .lbl { font-size: 11.5px; color: rgba(255,255,255,0.4); margin-top: 2px; }
    .sep { height: 1px; background: rgba(255,255,255,0.05); margin: 0 4px; }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:620px;height:620px;top:-200px;right:-80px;background:radial-gradient(circle, rgba(98,114,212,0.24), transparent 68%);"></div>
  <div class="glow" style="width:420px;height:420px;bottom:-160px;left:-40px;background:radial-gradient(circle, rgba(140,60,190,0.14), transparent 70%);"></div>

  <div class="layout">
    <div class="left">
      <div class="site-url">listerineh.dev</div>
      <div class="name">Sebastian<br>Alvarez</div>
      <div class="role">Senior Fullstack &amp;<br>Platform Engineer</div>
      <div class="tagline">Building fast, scalable systems from Ecuador<br>for the global tech ecosystem.</div>
      <div class="stack">
        <span class="pill p">React</span>
        <span class="pill p">Next.js</span>
        <span class="pill p">Python</span>
        <span class="pill">AWS</span>
        <span class="pill">Kubernetes</span>
        <span class="pill">AI Agents</span>
        <span class="pill">GDG Organizer</span>
      </div>
    </div>

    <div class="right">
      <div class="panel">
        <div style="font-size:10.5px;color:rgba(255,255,255,0.28);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;padding:0 4px;">Highlights</div>

        <div class="row">
          <div class="ico" style="background:rgba(98,114,212,0.14);border:1px solid rgba(98,114,212,0.25);">⚡</div>
          <div><div class="val">6+</div><div class="lbl">Years of professional engineering</div></div>
        </div>
        <div class="sep"></div>
        <div class="row">
          <div class="ico" style="background:rgba(52,168,83,0.12);border:1px solid rgba(52,168,83,0.22);">🌍</div>
          <div><div class="val">4.6K+</div><div class="lbl">GDG Quito community members</div></div>
        </div>
        <div class="sep"></div>
        <div class="row">
          <div class="ico" style="background:rgba(251,188,4,0.12);border:1px solid rgba(251,188,4,0.22);">🚀</div>
          <div><div class="val">6+</div><div class="lbl">Open source projects shipped</div></div>
        </div>
        <div class="sep"></div>
        <div class="row">
          <div class="ico" style="background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.22);">☁️</div>
          <div><div class="val">Multi-cloud</div><div class="lbl">AWS · Azure · GCP</div></div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 4. Why ──────────────────────────────────────────────────────────────

function htmlWhy() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body {
      background: #080808;
      display: flex; align-items: center;
    }
    .top-border {
      background: linear-gradient(90deg, transparent 0%, rgba(29,185,84,0.8) 30%, rgba(129,140,248,0.5) 70%, transparent 100%);
    }
    .dot-grid {
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
      background-size: 28px 28px;
    }
    .layout {
      position: relative; z-index: 1;
      display: flex; align-items: center;
      width: 100%; height: 100%;
      padding: 60px 72px 60px 80px;
      gap: 56px;
    }
    .left { flex: 0 0 54%; display: flex; flex-direction: column; }
    .right { flex: 1; display: flex; flex-direction: column; gap: 16px; justify-content: center; }
    .badge {
      background: rgba(29,185,84,0.12);
      border: 1px solid rgba(29,185,84,0.4);
      color: #1DB954;
      margin-bottom: 28px;
      width: fit-content;
    }
    .title {
      font-size: 72px; font-weight: 800; line-height: 0.95;
      letter-spacing: -0.04em; margin-bottom: 20px;
      background: linear-gradient(90deg, #1DB954 0%, #86efac 50%, #1DB954 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-size: 19px; color: rgba(255,255,255,0.45);
      font-weight: 400; line-height: 1.5; margin-bottom: 36px;
    }
    .genres { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 44px; }
    .genre {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px; padding: 5px 14px;
      color: rgba(255,255,255,0.4); font-size: 13px; font-weight: 500;
    }
    .domain { color: rgba(29,185,84,0.45); font-size: 15px; font-weight: 600; letter-spacing: 0.04em; }
    .band-card {
      border-radius: 14px; padding: 18px 22px;
      display: flex; align-items: center; gap: 16px;
    }
    .band-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .band-name { font-size: 20px; font-weight: 700; }
    .band-role { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; margin-top: 2px; }
    .band-mn {
      background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
      color: #f59e0b;
    }
    .band-ss {
      background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.22);
      color: #818cf8;
    }
    .band-solo {
      background: rgba(29,185,84,0.08); border: 1px solid rgba(29,185,84,0.22);
      color: #1DB954;
    }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:640px;height:640px;top:-200px;right:-60px;background:radial-gradient(circle, rgba(29,185,84,0.15), transparent 68%);"></div>
  <div class="glow" style="width:440px;height:440px;bottom:-160px;left:-40px;background:radial-gradient(circle, rgba(245,158,11,0.10), transparent 70%);"></div>
  <div class="glow" style="width:360px;height:360px;top:-80px;left:30%;background:radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%);"></div>

  <div class="layout">
    <div class="left">
      <span class="badge">Music &amp; Software Engineering</span>
      <div class="title">Why<br>Listerineh?</div>
      <div class="subtitle">The story behind the alias — music producer,<br>engineer, and collaborator from Ecuador.</div>
      <div class="genres">
        <span class="genre">Lo-Fi Hip-Hop</span>
        <span class="genre">Electronic</span>
        <span class="genre">Ambient</span>
        <span class="genre">Indie Rock</span>
        <span class="genre">Funk</span>
      </div>
      <span class="domain">listerineh.dev/why</span>
    </div>

    <div class="right">
      <div class="band-card band-mn">
        <div class="band-dot" style="background:#f59e0b;"></div>
        <div>
          <div class="band-name">Margarita Nugget</div>
          <div class="band-role">Indie Rock · Funk · Cumbia</div>
        </div>
      </div>
      <div class="band-card band-ss">
        <div class="band-dot" style="background:#818cf8;"></div>
        <div>
          <div class="band-name">Sofones Solares</div>
          <div class="band-role">Electronic · Dream Pop</div>
        </div>
      </div>
      <div class="band-card band-solo">
        <div class="band-dot" style="background:#1DB954;"></div>
        <div>
          <div class="band-name">Listerineh</div>
          <div class="band-role">Lo-Fi Hip-Hop · Ambient</div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── Runner ────────────────────────────────────────────────────────────────

const PAGE_IDS = ['home', 'about', 'blog', 'why'];

async function generateImages() {
  const ALL_PAGES = [
    { id: 'home',  filename: 'home-og.webp',  html: htmlHome() },
    { id: 'about', filename: 'about-og.webp', html: htmlAbout() },
    { id: 'blog',  filename: 'blog-og.webp',  html: htmlBlog() },
    { id: 'why',   filename: 'why-og.webp',   html: htmlWhy() },
  ];

  const pages = FILTER
    ? ALL_PAGES.filter(p => p.id === FILTER)
    : ALL_PAGES;

  if (pages.length === 0) {
    console.error(`❌  No page found with id "${FILTER}"`);
    console.log(`    Available: ${PAGE_IDS.join(', ')}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('🚀  Launching Chromium…');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  // Serve local profile photo via route interception (avoids base64 color distortion)
  const photoPath = path.join(__dirname, '../public/images/sebastian_alvarez_photo.webp');
  await page.route('**/profile-photo.jpg', async (route) => {
    try {
      const jpegBuffer = await sharp(photoPath).resize(228, 228).jpeg({ quality: 95 }).toBuffer();
      await route.fulfill({ status: 200, contentType: 'image/jpeg', body: jpegBuffer });
    } catch {
      await route.abort();
    }
  });

  for (const item of pages) {
    process.stdout.write(`  ⏳  ${item.id}… `);
    const html = item.html;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    const pngBuffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    const outputPath = path.join(OUTPUT_DIR, item.filename);
    await sharp(pngBuffer)
      .webp({ quality: 90 })
      .toFile(outputPath);

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`✅  ${item.filename} (${sizeKB} KB)`);
  }

  await browser.close();
  console.log('\n✨  All OG images generated!');
}

generateImages().catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
