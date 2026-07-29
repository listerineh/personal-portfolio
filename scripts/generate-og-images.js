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
        background: linear-gradient(90deg, transparent 0%, #f59e0b 35%, #fcd34d 65%, transparent 100%);
        z-index: 10;
      }
      .badge {
        display: inline-block;
        background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.35);
        border-radius: 100px; padding: 8px 22px;
        color: #f59e0b; font-size: 13px; font-weight: 700;
        letter-spacing: 0.13em; text-transform: uppercase;
      }
      .tag {
        background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.09);
        border-radius: 6px; padding: 6px 14px;
        color: #8a90aa; font-size: 13px; font-weight: 500;
      }
      .domain { color: rgba(255,255,255,0.2); font-size: 17px; font-weight: 500; letter-spacing: 0.03em; }
    </style>
  `;
}

// ─── 1. About ─────────────────────────────────────────────────────────────

function htmlAbout() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body { display: flex; align-items: center; justify-content: center; }
    .content {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 80px;
    }
    .name {
      font-size: 76px; font-weight: 800; color: #eaedf5;
      line-height: 1.0; letter-spacing: -0.03em;
      margin-top: 24px; margin-bottom: 16px;
    }
    .role {
      font-size: 22px; color: rgba(255,255,255,0.42); font-weight: 500;
      margin-bottom: 36px; line-height: 1.4;
    }
    .tags { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 52px; }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:540px;height:540px;top:-180px;right:-80px;background:radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%);"></div>
  <div class="glow" style="width:420px;height:420px;bottom:-150px;left:-60px;background:radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%);"></div>

  <div class="content">
    <span class="badge">About Me</span>
    <div class="name">Sebastian Alvarez</div>
    <div class="role">Senior Fullstack &amp; Platform Engineer · GDG Quito Organizer</div>
    <div class="tags">
      <span class="tag">React &amp; Next.js</span>
      <span class="tag">Python</span>
      <span class="tag">Cloud &amp; DevOps</span>
      <span class="tag">AI &amp; Agents</span>
      <span class="tag">GDG Quito</span>
    </div>
    <span class="domain">listerineh.dev/about</span>
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
      font-size: 22px; color: rgba(255,255,255,0.4); font-weight: 500;
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
  <div class="glow" style="width:560px;height:560px;top:-160px;right:-100px;background:radial-gradient(circle, rgba(245,158,11,0.16), transparent 68%);"></div>
  <div class="glow" style="width:480px;height:480px;bottom:-140px;left:-80px;background:radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%);"></div>

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

// ─── 3. Projects ─────────────────────────────────────────────────────────

function htmlProjects() {
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
      font-size: 22px; color: rgba(255,255,255,0.4); font-weight: 500;
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
  <div class="glow" style="width:560px;height:560px;top:-160px;right:-100px;background:radial-gradient(circle, rgba(245,158,11,0.16), transparent 68%);"></div>
  <div class="glow" style="width:480px;height:480px;bottom:-140px;left:-80px;background:radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%);"></div>

  <div class="content">
    <span class="badge">Portfolio</span>
    <div class="title">Projects</div>
    <div class="tagline">Full Stack Development · AI Tools · Open Source · Web Applications</div>
    <div class="topics">
      <span class="topic">Next.js</span>
      <span class="topic">React</span>
      <span class="topic">Python</span>
      <span class="topic">AI</span>
      <span class="topic">Open Source</span>
      <span class="topic">Cloud</span>
    </div>
    <span class="domain">listerineh.dev/projects</span>
  </div>
</body></html>`;
}

// ─── 4. Privacy ─────────────────────────────────────────────────────────

function htmlPrivacy() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body { display: flex; align-items: center; justify-content: center; }
    .content {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 100px;
    }
    .title {
      font-size: 80px; font-weight: 800; color: #eaedf5;
      line-height: 1.0; letter-spacing: -0.03em;
      margin-top: 24px; margin-bottom: 20px;
    }
    .subtitle {
      font-size: 20px; color: rgba(255,255,255,0.38); font-weight: 400;
      line-height: 1.5; margin-bottom: 52px; max-width: 620px;
    }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:500px;top:-180px;left:-80px;background:radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%);"></div>
  <div class="glow" style="width:400px;height:400px;bottom:-140px;right:-60px;background:radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%);"></div>
  <div class="content">
    <span class="badge">Legal</span>
    <div class="title">Privacy Policy</div>
    <div class="subtitle">How we collect, use, and protect your personal information on listerineh.dev</div>
    <span class="domain">listerineh.dev/privacy</span>
  </div>
</body></html>`;
}

// ─── 4. Terms ────────────────────────────────────────────────────────────

function htmlTerms() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles()}
  <style>
    body { display: flex; align-items: center; justify-content: center; }
    .content {
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 100px;
    }
    .title {
      font-size: 80px; font-weight: 800; color: #eaedf5;
      line-height: 1.0; letter-spacing: -0.03em;
      margin-top: 24px; margin-bottom: 20px;
    }
    .subtitle {
      font-size: 20px; color: rgba(255,255,255,0.38); font-weight: 400;
      line-height: 1.5; margin-bottom: 52px; max-width: 620px;
    }
  </style>
</head><body>
  <div class="top-border"></div>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:500px;top:-180px;right:-80px;background:radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%);"></div>
  <div class="glow" style="width:400px;height:400px;bottom:-140px;left:-60px;background:radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%);"></div>
  <div class="content">
    <span class="badge">Legal</span>
    <div class="title">Terms of Service</div>
    <div class="subtitle">Terms and conditions for using listerineh.dev — your go-to engineering portfolio &amp; blog</div>
    <span class="domain">listerineh.dev/terms</span>
  </div>
</body></html>`;
}

// ─── 5. Home ─────────────────────────────────────────────────────────────

function htmlHome() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #080808; color: #fff; position: relative;
    }
    /* Noise texture */
    .noise {
      position: absolute; inset: 0; opacity: 0.025; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 150px 150px;
    }
    /* Amber glow */
    .glow-amber {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(100px);
    }
    /* Amber top border */
    .top-border {
      position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 10;
      background: linear-gradient(90deg, transparent 0%, #f59e0b 35%, #fcd34d 60%, transparent 100%);
    }
    /* Vertical separator */
    .v-sep {
      position: absolute; left: 55%; top: 64px; bottom: 64px; width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent);
    }
    /* Left column */
    .left {
      position: absolute; left: 80px; top: 0; bottom: 0; width: 46%;
      display: flex; flex-direction: column; justify-content: center;
    }
    .eyebrow {
      font-size: 11px; font-weight: 700; letter-spacing: 0.28em;
      text-transform: uppercase; color: rgba(245,158,11,0.7); margin-bottom: 28px;
    }
    .name-first { font-size: 90px; font-weight: 800; line-height: 0.88; letter-spacing: -0.04em; color: rgba(255,255,255,0.92); }
    .name-last {
      font-size: 90px; font-weight: 800; line-height: 0.88; letter-spacing: -0.04em;
      background: linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .role {
      font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.4);
      margin-top: 28px; line-height: 1.5; letter-spacing: 0.01em;
    }
    .tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 28px; }
    .tag {
      padding: 5px 14px; border-radius: 100px; font-size: 11.5px; font-weight: 600;
      border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.04);
    }
    .tag.amber {
      border-color: rgba(245,158,11,0.3); color: #f59e0b;
      background: rgba(245,158,11,0.08);
    }
    /* Right column – stats */
    .right {
      position: absolute; left: 58%; right: 64px; top: 0; bottom: 0;
      display: flex; flex-direction: column; justify-content: center; gap: 0;
    }
    .stats-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
      text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 24px;
    }
    .stat-row {
      display: flex; align-items: flex-start; gap: 0;
      padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .stat-row:last-child { border-bottom: none; }
    .stat-num {
      font-size: 44px; font-weight: 800; line-height: 1; letter-spacing: -0.03em;
      color: rgba(255,255,255,0.88); min-width: 130px;
    }
    .stat-num.amber { color: #f59e0b; }
    .stat-info { display: flex; flex-direction: column; justify-content: center; padding-top: 6px; }
    .stat-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65); line-height: 1.3; }
    .stat-sub { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.28); margin-top: 3px; }
    .domain {
      position: absolute; bottom: 56px; left: 80px;
      font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
      color: rgba(255,255,255,0.18);
    }
  </style>
</head><body>
  <div class="noise"></div>
  <div class="top-border"></div>
  <div class="glow-amber" style="width:500px;height:500px;top:-180px;left:-60px;background:radial-gradient(circle, rgba(245,158,11,0.12), transparent 68%);"></div>
  <div class="glow-amber" style="width:380px;height:380px;bottom:-140px;right:80px;background:radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%);"></div>
  <div class="v-sep"></div>

  <!-- Left: identity -->
  <div class="left">
    <div class="eyebrow">Full-Stack Engineer</div>
    <div class="name-first">Sebastian</div>
    <div class="name-last">Alvarez</div>
    <div class="role">Senior Platform Engineer &amp;<br>Open Source Contributor</div>
    <div class="tags">
      <span class="tag amber">React &amp; Next.js</span>
      <span class="tag amber">Python</span>
      <span class="tag">AWS · Azure · GCP</span>
      <span class="tag">AI Agents</span>
      <span class="tag">GDG Quito</span>
    </div>
  </div>

  <!-- Right: stats -->
  <div class="right">
    <div class="stats-label">At a glance</div>
    <div class="stat-row">
      <div class="stat-num amber">6+</div>
      <div class="stat-info">
        <div class="stat-title">Years of engineering</div>
        <div class="stat-sub">Production systems at scale</div>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-num">100%</div>
      <div class="stat-info">
        <div class="stat-title">Remote track record</div>
        <div class="stat-sub">US-based companies from Ecuador</div>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-num">4.6K+</div>
      <div class="stat-info">
        <div class="stat-title">GDG Quito community</div>
        <div class="stat-sub">DevFests, workshops, tech talks</div>
      </div>
    </div>
  </div>

  <div class="domain">listerineh.dev</div>
</body></html>`;
}

// ─── 6. Why ──────────────────────────────────────────────────────────────

function htmlWhy() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #080808; color: #fff; position: relative;
    }
    .bg-photo {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover; object-position: center;
    }
    .overlay-lr {
      position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.78) 50%, rgba(8,8,8,0.25) 100%);
    }
    .overlay-tb {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 55%);
    }
    .noise {
      position: absolute; inset: 0; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 150px 150px;
    }
    .content {
      position: relative; z-index: 1;
      height: 100%; display: flex; flex-direction: column;
      justify-content: flex-end; padding: 64px 72px;
      max-width: 660px;
    }
    .eyebrow {
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
    }
    .eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #1DB954; flex-shrink: 0; }
    .eyebrow-text {
      font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
      text-transform: uppercase; color: rgba(255,255,255,0.35);
    }
    .title {
      font-size: 92px; font-weight: 800; line-height: 0.88;
      letter-spacing: -0.045em; margin-bottom: 28px; color: #ffffff;
    }
    .title-accent {
      background: linear-gradient(90deg, #1DB954 0%, #86efac 60%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-size: 17px; color: rgba(255,255,255,0.45);
      font-weight: 400; line-height: 1.55; margin-bottom: 40px;
    }
    .bands { display: flex; gap: 10px; flex-wrap: wrap; }
    .band-pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 18px; border-radius: 100px;
      font-size: 13px; font-weight: 600;
    }
    .band-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .pill-mn { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: #f59e0b; }
    .pill-ss { background: rgba(129,140,248,0.1); border: 1px solid rgba(129,140,248,0.3); color: #818cf8; }
    .pill-solo { background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.3); color: #1DB954; }
  </style>
</head><body>
  <img class="bg-photo" src="http://local-assets/sebas-playing.jpg" />
  <div class="overlay-lr"></div>
  <div class="overlay-tb"></div>
  <div class="noise"></div>

  <div class="content">
    <div class="eyebrow">
      <div class="eyebrow-dot"></div>
      <span class="eyebrow-text">listerineh.dev / why</span>
    </div>

    <div class="title">
      Why<br><span class="title-accent">Listerineh?</span>
    </div>

    <div class="subtitle">Music producer &amp; software engineer.<br>Lo-Fi Hip-Hop · Electronic · Indie Rock · Ambient</div>

    <div class="bands">
      <div class="band-pill pill-mn"><div class="band-dot" style="background:#f59e0b;"></div>Margarita Nugget</div>
      <div class="band-pill pill-ss"><div class="band-dot" style="background:#818cf8;"></div>Sofones Solares</div>
      <div class="band-pill pill-solo"><div class="band-dot" style="background:#1DB954;"></div>Listerineh</div>
    </div>
  </div>
</body></html>`;
}

// ─── Runner ────────────────────────────────────────────────────────────────

const PAGE_IDS = ['home', 'about', 'blog', 'projects', 'why', 'privacy', 'terms'];

async function generateImages() {
  const ALL_PAGES = [
    { id: 'home',    filename: 'home-og.webp',    html: htmlHome() },
    { id: 'about',   filename: 'about-og.webp',   html: htmlAbout() },
    { id: 'blog',    filename: 'blog-og.webp',    html: htmlBlog() },
    { id: 'projects', filename: 'projects-og.webp', html: htmlProjects() },
    { id: 'why',     filename: 'why-og.webp',     html: htmlWhy() },
    { id: 'privacy', filename: 'privacy-og.webp', html: htmlPrivacy() },
    { id: 'terms',   filename: 'terms-og.webp',   html: htmlTerms() },
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

  // Serve hero photo for the Why OG image
  const sebasPlayingPath = path.join(__dirname, '../public/images/sebas-playing.webp');
  await page.route('**/sebas-playing.jpg', async (route) => {
    try {
      const jpegBuffer = await sharp(sebasPlayingPath).resize(1200, 630).jpeg({ quality: 92 }).toBuffer();
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
