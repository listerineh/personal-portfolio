#!/usr/bin/env node

/**
 * generate-og-images.js
 *
 * Generates every social-share image and app icon for listerineh.dev, in the site's Lumen style
 * (white ground, warm amber halos, rounded white panels, Geist, one amber accent).
 *
 * Outputs (PNG/JPG: WebP is not reliably shown by LinkedIn, Facebook, iMessage or Slack):
 *   public/og/<page>.png            1200×630  one per page (Playwright)
 *   public/og/projects/<slug>.png   1200×630  one per project, with its product shot (Playwright)
 *   public/og/blog/<slug>.jpg       1200×630  each post cover, re-encoded (sharp only)
 *   public/icons/*.png              apple-touch-icon 180, icon 192/512, maskable 512 (sharp only)
 *
 * Usage:
 *   node scripts/generate-og-images.js            # everything
 *   node scripts/generate-og-images.js pages      # page images only
 *   node scripts/generate-og-images.js projects   # project images only
 *   node scripts/generate-og-images.js covers     # post covers only (no browser needed)
 *   node scripts/generate-og-images.js icons      # app icons only (no browser needed)
 *   node scripts/generate-og-images.js about      # a single page
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OG_DIR = path.join(PUBLIC, "og");
const ICON_DIR = path.join(PUBLIC, "icons");
const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2; // render at 2x, downsample for crisp type
const FILTER = process.argv[2] || null;

// Local files are served to the page through a fake origin (see the route below).
const asset = (publicPath) => `https://assets.local${publicPath}`;

// ─── Data from the site (read, not duplicated) ────────────────────────────

/** English projects from src/lib/data/projects.ts: slug, title, description, imageUrl. */
function readProjects() {
  const source = fs.readFileSync(
    path.join(ROOT, "src/lib/data/projects.ts"),
    "utf8",
  );
  const en = source.slice(source.indexOf("en: ["), source.indexOf("es: ["));
  const field = (block, name) => {
    const match = block.match(
      new RegExp(`${name}:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, "s"),
    );
    return match ? match[2].replace(/\\(['"`])/g, "$1") : "";
  };
  return en
    .split(/\n\s{4}\{/)
    .slice(1)
    .map((block) => ({
      slug: field(block, "slug"),
      title: field(block, "title"),
      description: field(block, "description"),
      imageUrl: field(block, "imageUrl"),
    }))
    .filter((project) => project.slug && project.title);
}

// ─── Shared frame ──────────────────────────────────────────────────────────

const MARK = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#D97706"/><path fill="#fff" d="M42.5,42c-0.7,0-1.3-0.3-1.7-1c-0.6-0.9-0.3-2.2,0.7-2.8l10.1-6.2l-10.1-6.2c-0.9-0.6-1.2-1.8-0.7-2.8c0.6-0.9,1.8-1.2,2.8-0.7l10.6,6.6l0.2,0.2c1.6,1.6,1.6,4.3,0,6l-0.2,0.2l-10.6,6.6C43.2,41.9,42.8,42,42.5,42z M21.5,42c-0.4,0-0.7-0.1-1-0.3L9.9,35.1L9.7,35c-1.6-1.6-1.6-4.3,0-6l0.2-0.2l10.6-6.6c0.9-0.6,2.2-0.3,2.8,0.7c0.6,0.9,0.3,2.2-0.7,2.8l-10.1,6.2l10.1,6.2c0.9,0.6,1.2,1.8,0.7,2.8C22.9,41.7,22.2,42,21.5,42z M25.5,51c-0.2,0-0.5,0-0.7-0.1c-1-0.4-1.5-1.6-1.2-2.6l13-34c0.4-1,1.6-1.5,2.6-1.2c1,0.4,1.5,1.6,1.2,2.6l-13,34C27.1,50.5,26.3,51,25.5,51z"/></svg>`;

/**
 * One OG card: brand top-left, a two-tone title, a byline, and a visual on the right.
 * @param {{ title: string, subtitle: string, visual: string, css?: string, dark?: boolean, byline?: string }} o
 */
function card({
  title,
  subtitle,
  visual,
  css = "",
  dark = false,
  byline = "Sebastian Alvarez · Full-Stack Engineer · Applied AI",
}) {
  const theme = dark
    ? "--bg:#000;--ink:#F5F5F7;--muted:#A1A1A6;--panel:#1C1C1E;--fill:#2C2C2E;--line:#38383A;--amber-ink:#E8890C;"
    : "--bg:#FFFFFF;--ink:#1D1D1F;--muted:#6E6E73;--panel:#FFFFFF;--fill:#F5F5F7;--line:#E5E5EA;--amber-ink:#A84B0A;";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { ${theme} --amber: #D97706; --amber-soft: rgba(217,119,6,0.14); }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; position: relative;
    font-family: 'Geist', -apple-system, system-ui, sans-serif; color: var(--ink); background: var(--bg);
    letter-spacing: -0.01em; -webkit-font-smoothing: antialiased;
  }
  .halo { position: absolute; border-radius: 50%; pointer-events: none; }
  .halo.a { width: 900px; height: 900px; top: -480px; right: -260px; background: radial-gradient(closest-side, rgba(217,119,6,${dark ? 0.3 : 0.2}), transparent); }
  .halo.b { width: 700px; height: 700px; bottom: -460px; left: -220px; background: radial-gradient(closest-side, rgba(245,158,11,${dark ? 0.16 : 0.12}), transparent); }
  .grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(${dark ? "rgba(255,255,255,0.10)" : "rgba(29,29,31,0.09)"} 1px, transparent 1.2px);
    background-size: 26px 26px;
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 70% 45%, #000 20%, transparent 75%);
  }
  .copy { position: absolute; left: 72px; top: 64px; bottom: 64px; width: 560px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; }
  .brand svg { width: 40px; height: 40px; }
  .title { margin-top: auto; font-size: 76px; line-height: 1; font-weight: 700; letter-spacing: -0.045em; }
  .title .muted { display: block; color: var(--muted); font-size: 40px; line-height: 1.12; letter-spacing: -0.035em; margin-top: 18px; font-weight: 600; }
  .byline { margin-top: 36px; display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 500; color: var(--muted); }
  .byline .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--amber); }
  .visual { position: absolute; right: 56px; top: 50%; transform: translateY(-50%); width: 500px; height: 500px; }
  .panel { position: absolute; background: var(--panel); border-radius: 26px; box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 24px 56px -18px rgba(0,0,0,${dark ? 0.7 : 0.22}); }
  .label { font-size: 15px; font-weight: 500; color: var(--muted); }
  .chip { display: inline-flex; align-items: center; height: 34px; padding: 0 16px; border-radius: 999px; background: var(--fill); font-size: 16px; font-weight: 500; }
  .chip.amber { background: var(--amber-soft); color: var(--amber-ink); }
  .row { display: flex; align-items: center; gap: 12px; }
  .lights { display: flex; gap: 8px; }
  .lights i { width: 12px; height: 12px; border-radius: 50%; background: var(--line); display: block; }
  ${css}
</style></head><body>
  <span class="halo a"></span><span class="halo b"></span><span class="grid"></span>
  <div class="copy">
    <div class="brand">${MARK}<span>listerineh.dev</span></div>
    <h1 class="title">${title}<span class="muted">${subtitle}</span></h1>
    <p class="byline"><span class="dot"></span>${byline}</p>
  </div>
  <div class="visual">${visual}</div>
</body></html>`;
}

// ─── Page visuals ──────────────────────────────────────────────────────────

const deck = (images) =>
  images
    .map(
      (
        src,
        i,
      ) => `<div class="panel" style="width:430px;height:323px;left:${10 + i * 34}px;top:${118 - i * 46}px;transform:rotate(${-4 + i * 5}deg);overflow:hidden;z-index:${3 - i};opacity:${1 - i * 0.08}">
        <img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block"></div>`,
    )
    .reverse()
    .join("");

function pages(projects) {
  const shots = projects.slice(0, 3).map((p) => asset(p.imageUrl));
  const covers = fs
    .readdirSync(path.join(PUBLIC, "blog"))
    .filter((f) => /\.(webp|png|jpe?g)$/.test(f))
    .slice(0, 3)
    .map((f) => asset(`/blog/${f}`));
  const devicon = (slug, file = `${slug}-original`) =>
    `https://raw.githubusercontent.com/devicons/devicon/master/icons/${slug}/${file}.svg`;

  return {
    home: card({
      title: "Sebastian Alvarez.",
      subtitle: "I build AI agents, cloud platforms and web products.",
      css: `
        .win .bar { height: 46px; display: flex; align-items: center; gap: 12px; padding: 0 18px; border-bottom: 1px solid var(--line); }
        .win .bar span { font-size: 14px; font-weight: 500; color: var(--muted); }
        .bubble { padding: 10px 14px; border-radius: 18px; font-size: 15px; line-height: 1.35; max-width: 80%; }
        .me { margin-left: auto; background: var(--ink); color: var(--bg); border-bottom-right-radius: 6px; }
        .bot { background: var(--fill); border-bottom-left-radius: 6px; }
        .tool { font-family: 'Geist Mono', monospace; font-size: 13px; color: var(--muted); }
        .tool b { color: var(--amber); font-weight: 500; }`,
      visual: `
        <div class="panel win" style="width:420px;left:70px;top:0;transform:rotate(5deg);opacity:0.92">
          <div class="bar"><div class="lights"><i></i><i></i><i></i></div><span>deploy · production</span></div>
          <div style="padding:20px;display:grid;gap:12px">
            ${["Build", "Tests", "Infrastructure"].map((l) => `<div class="row" style="font-size:16px;font-weight:500"><span style="width:22px;height:22px;border-radius:50%;background:var(--ink)"></span>${l}</div>`).join("")}
            <div style="height:8px;border-radius:999px;background:var(--fill);overflow:hidden"><div style="width:75%;height:100%;background:var(--amber);border-radius:999px"></div></div>
          </div>
        </div>
        <div class="panel win" style="width:440px;left:20px;top:150px;transform:rotate(-3deg)">
          <div class="bar"><div class="lights"><i></i><i></i><i></i></div><span>agent · support-triage</span></div>
          <div style="padding:20px;display:grid;gap:12px">
            <div class="bubble me">Classify ticket #4821 and draft a reply</div>
            <div class="tool"><b>→</b> search_kb("refund policy")</div>
            <div class="tool"><b>→</b> crm.get_customer(4821)</div>
            <div class="bubble bot">Drafted. Priority: high, refund eligible.</div>
          </div>
        </div>`,
    }),

    about: card({
      title: "Hey, I'm Sebastian.",
      subtitle: "Full-stack engineer from Quito, Ecuador.",
      css: `.stat { width: 232px; height: 232px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; }
            .stat b { font-size: 64px; font-weight: 700; letter-spacing: -0.05em; line-height: 1; }
            .stat span { font-size: 17px; line-height: 1.3; color: var(--muted); }
            .stat.lead { background: var(--amber); } .stat.lead span { color: #1D1D1F; font-weight: 500; } .stat.lead b { color: #1D1D1F; }`,
      visual: [
        ["6+", "Years building software", "lead"],
        ["4.6K+", "Developers in the GDG community", ""],
        ["3+", "Years organizing GDG Quito", ""],
        ["4", "Instruments I play", ""],
      ]
        .map(
          ([n, l, c], i) =>
            `<div class="panel stat ${c}" style="left:${(i % 2) * 252 + 8}px;top:${Math.floor(i / 2) * 252 + 8}px"><b>${n}</b><span>${l}</span></div>`,
        )
        .join(""),
    }),

    projects: card({
      title: "Projects",
      subtitle: "Things I've built and shipped.",
      visual: deck(shots),
    }),

    blog: card({
      title: "Blog",
      subtitle: "Notes on engineering, cloud and applied AI.",
      visual: deck(covers),
    }),

    skills: card({
      title: "Skills",
      subtitle: "The stack I reach for, and how fast I pick up the next one.",
      css: `.tile { width: 150px; height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; font-size: 16px; font-weight: 600; }
            .disc { width: 64px; height: 64px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.06); display: grid; place-items: center; }
            .disc img { width: 36px; height: 36px; }`,
      visual: [
        ["TypeScript", devicon("typescript")],
        ["React", devicon("react")],
        ["Next.js", devicon("nextjs")],
        ["Python", devicon("python")],
        ["FastAPI", devicon("fastapi")],
        ["Go", devicon("go", "go-original-wordmark")],
        [
          "AWS",
          devicon("amazonwebservices", "amazonwebservices-plain-wordmark"),
        ],
        ["Docker", devicon("docker")],
        ["PostgreSQL", devicon("postgresql")],
      ]
        .map(
          ([name, icon], i) =>
            `<div class="panel tile" style="left:${(i % 3) * 170}px;top:${Math.floor(i / 3) * 170}px"><span class="disc"><img src="${icon}"></span>${name}</div>`,
        )
        .join(""),
    }),

    contact: card({
      title: "Let's talk.",
      subtitle: "Projects, collaborations, or just tech.",
      visual: `
        <div class="panel" style="left:0;top:60px;width:470px;padding:30px;display:grid;gap:18px">
          <span style="width:52px;height:52px;border-radius:50%;background:var(--amber-soft);color:var(--amber-ink);display:grid;place-items:center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
          </span>
          <span class="label">Email</span>
          <span style="font-size:24px;font-weight:600;letter-spacing:-0.02em;margin-top:-10px">sebask8er.alvarez@gmail.com</span>
        </div>
        <div class="panel row" style="left:40px;top:300px;padding:18px 24px;font-size:18px;font-weight:600">
          <span style="width:12px;height:12px;border-radius:50%;background:var(--amber)"></span>Usually replies within a day
        </div>
        <div class="panel" style="left:230px;top:390px;padding:20px 26px">
          <span class="label">Local time in Quito</span>
          <div style="font-size:30px;font-weight:700;letter-spacing:-0.03em;margin-top:4px">UTC−5</div>
        </div>`,
    }),

    why: card({
      dark: true,
      title: 'Why <span style="color:var(--amber-ink)">Listerineh?</span>',
      subtitle: "The artist behind the code: three music projects, one name.",
      byline: "Indie Funk · Experimental · Lo-Fi",
      css: `.vinyl { position: absolute; border-radius: 50%; box-shadow: 0 24px 56px -18px rgba(0,0,0,0.8);
              background: repeating-radial-gradient(circle, #0d0d0e 0 2px, #18181a 3px, #0d0d0e 4px); }
            .vinyl::after { content: ''; position: absolute; inset: 34%; border-radius: 50%; background: var(--label); }
            .eq { position: absolute; right: 10px; bottom: 6px; display: flex; gap: 6px; align-items: flex-end; height: 70px; }
            .eq i { width: 8px; border-radius: 999px; background: var(--amber); display: block; }`,
      visual: `
        <span class="vinyl" style="--label:#1DB954;width:250px;height:250px;left:240px;top:20px"></span>
        <span class="vinyl" style="--label:#5A7799;width:290px;height:290px;left:120px;top:110px"></span>
        <span class="vinyl" style="--label:#D97706;width:330px;height:330px;left:0;top:170px"></span>
        <div class="eq">${[40, 70, 30, 85, 55, 95, 45, 75, 35, 60].map((h) => `<i style="height:${h}%"></i>`).join("")}</div>`,
    }),

    privacy: card({
      title: "Privacy Policy",
      subtitle: "What is collected, why, and what you can do about it.",
      visual: legalDoc([
        "Information collected",
        "Cookies",
        "How it is used",
        "Your rights",
        "Contact",
      ]),
    }),

    terms: card({
      title: "Terms of Use",
      subtitle: "The rules for using this site and its content.",
      visual: legalDoc([
        "Agreement",
        "License",
        "Disclaimer",
        "Blog content",
        "Governing law",
      ]),
    }),
  };
}

function legalDoc(sections) {
  return `<div class="panel" style="left:30px;top:20px;width:440px;padding:30px;display:grid;gap:16px">
    <span class="label">On this page</span>
    ${sections
      .map(
        (
          s,
          i,
        ) => `<div class="row" style="gap:16px;padding:10px 14px;border-radius:14px;${i === 1 ? "background:var(--fill);" : ""}">
          <span style="font-size:15px;font-weight:600;color:${i === 1 ? "var(--amber)" : "var(--muted)"};width:24px">${String(i + 1).padStart(2, "0")}</span>
          <span style="font-size:19px;font-weight:500">${s}</span></div>`,
      )
      .join("")}
  </div>`;
}

/** A project's card: its name and one line on the left, its product shot on the right. */
function projectCard(project) {
  const description =
    project.description.length > 120
      ? `${project.description.slice(0, 117).trimEnd()}…`
      : project.description;
  return card({
    title: project.title,
    subtitle: description,
    byline: "A project by Sebastian Alvarez",
    css: `.title { font-size: ${project.title.length > 14 ? 64 : 76}px; } .title .muted { font-size: 28px; line-height: 1.3; letter-spacing: -0.02em; font-weight: 500; }
          .visual { width: 520px; height: 390px; right: 48px; }`,
    visual: `<div class="panel" style="inset:0;overflow:hidden;transform:rotate(-2deg)">
      <img src="${asset(project.imageUrl)}" style="width:100%;height:100%;object-fit:cover;display:block"></div>`,
  });
}

// ─── Renderers ─────────────────────────────────────────────────────────────

async function renderWithBrowser(jobs) {
  if (jobs.length === 0) return;
  const { chromium } = require("playwright");
  console.log("🚀  Launching Chromium…");
  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });

  // Serve files from /public under https://assets.local, re-encoded to PNG so Chromium shows them faithfully.
  await tab.route("https://assets.local/**", async (route) => {
    const file = path.join(
      PUBLIC,
      decodeURIComponent(new URL(route.request().url()).pathname),
    );
    try {
      const body = await sharp(file).png().toBuffer();
      await route.fulfill({ status: 200, contentType: "image/png", body });
    } catch {
      await route.abort();
    }
  });

  for (const job of jobs) {
    process.stdout.write(`  ⏳  ${job.out.replace(PUBLIC, "")}… `);
    await tab.setContent(job.html, { waitUntil: "networkidle" });
    await tab.evaluate(() => document.fonts.ready);
    await tab.waitForTimeout(150);
    const png = await tab.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    await sharp(png)
      .resize(WIDTH, HEIGHT)
      .png({ compressionLevel: 9, palette: false })
      .toFile(job.out);
    console.log(`✅  ${Math.round(fs.statSync(job.out).size / 1024)} KB`);
  }
  await browser.close();
}

/**
 * Post covers → 1200×630 JPG. Covers are 3:2, so cropping would cut their titles: instead the whole cover sits
 * centred over a blurred, slightly dimmed copy of itself that fills the sides. No browser needed.
 */
async function renderBlogCovers() {
  const dir = path.join(PUBLIC, 'blog');
  const out = path.join(OG_DIR, 'blog');
  fs.mkdirSync(out, { recursive: true });
  for (const file of fs.readdirSync(dir).filter((f) => /\.(webp|png|jpe?g)$/.test(f))) {
    const source = path.join(dir, file);
    const target = path.join(out, file.replace(/\.(webp|png|jpe?g)$/, '.jpg'));
    const backdrop = await sharp(source).resize(WIDTH, HEIGHT, { fit: 'cover' }).blur(40).modulate({ brightness: 0.85 }).toBuffer();
    const inset = Math.round(HEIGHT * 0.9);
    const cover = await sharp(source).resize({ height: inset }).png().toBuffer();
    const { width: coverWidth = inset, height: coverHeight = inset } = await sharp(cover).metadata();
    const rounded = await sharp(cover)
      .composite([
        {
          input: Buffer.from(
            `<svg width="${coverWidth}" height="${coverHeight}"><rect width="100%" height="100%" rx="22" ry="22"/></svg>`,
          ),
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();
    await sharp(backdrop)
      .composite([{ input: rounded, gravity: 'centre' }])
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(target);
    console.log(`  ✅  /og/blog/${path.basename(target)} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
  }
}

/** App icons from public/favicon.svg. No browser needed. */
async function renderIcons() {
  fs.mkdirSync(ICON_DIR, { recursive: true });
  const svg = fs.readFileSync(path.join(PUBLIC, "favicon.svg"));
  const plain = [
    ["apple-touch-icon.png", 180],
    ["icon-192.png", 192],
    ["icon-512.png", 512],
  ];
  for (const [name, size] of plain) {
    // iOS draws its own rounded mask: give the mark a white square ground with breathing room.
    const inner = Math.round(size * 0.78);
    const mark = await sharp(svg, { density: 512 })
      .resize(inner, inner)
      .png()
      .toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: "#FFFFFF" },
    })
      .composite([{ input: mark, gravity: "centre" }])
      .png()
      .toFile(path.join(ICON_DIR, name));
    console.log(`  ✅  /icons/${name}`);
  }
  // Maskable: the mark inside the safe zone (80%) on amber, so any launcher mask keeps it whole.
  const safe = Math.round(512 * 0.62);
  const mark = await sharp(svg, { density: 512 })
    .resize(safe, safe)
    .png()
    .toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: "#D97706" },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(path.join(ICON_DIR, "maskable-512.png"));
  console.log("  ✅  /icons/maskable-512.png");
}

// ─── Runner ────────────────────────────────────────────────────────────────

async function main() {
  const projects = readProjects();
  const pageHtml = pages(projects);
  const pageIds = Object.keys(pageHtml);
  const groups = ["pages", "projects", "covers", "icons"];

  if (FILTER && !groups.includes(FILTER) && !pageIds.includes(FILTER)) {
    console.error(
      `❌  Unknown target "${FILTER}". Use one of: ${[...groups, ...pageIds].join(", ")}`,
    );
    process.exit(1);
  }

  const want = (group) => !FILTER || FILTER === group;
  const jobs = [];
  if (want("pages") || pageIds.includes(FILTER)) {
    for (const id of pageIds) {
      if (FILTER && FILTER !== "pages" && FILTER !== id) continue;
      jobs.push({ out: path.join(OG_DIR, `${id}.png`), html: pageHtml[id] });
    }
  }
  if (want("projects")) {
    for (const project of projects) {
      if (!project.imageUrl) continue;
      jobs.push({
        out: path.join(OG_DIR, "projects", `${project.slug}.png`),
        html: projectCard(project),
      });
    }
  }

  await renderWithBrowser(jobs);
  if (want("covers")) await renderBlogCovers();
  if (want("icons")) await renderIcons();
  console.log("\n✨  Done.");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
