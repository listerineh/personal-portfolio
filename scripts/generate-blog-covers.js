#!/usr/bin/env node

/**
 * generate-blog-covers.js
 *
 * Draws every blog post's cover from scripts/blog-covers/covers.js with the Lumen kit in scripts/blog-covers/kit.js,
 * one per language: public/blog/<slug>.webp (English) and public/blog/<slug>.es.webp (Spanish), 1536×1024.
 *
 * Usage:
 *   node scripts/generate-blog-covers.js                 # every cover (Playwright)
 *   node scripts/generate-blog-covers.js <slug>          # one post, both languages
 *   node scripts/generate-blog-covers.js --html <dir>    # write the HTML only, to review in a browser
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { cover, W, H } = require("./blog-covers/kit");
const covers = require("./blog-covers/covers");

const OUT = path.join(__dirname, "..", "public", "blog");
const SCALE = 2;
const args = process.argv.slice(2);
const htmlDir = args.includes("--html")
  ? args[args.indexOf("--html") + 1]
  : null;
const only = args.find((a) => !a.startsWith("--") && a !== htmlDir);

const jobs = Object.entries(covers)
  .filter(([slug]) => !only || slug === only)
  .flatMap(([slug, spec]) =>
    ["en", "es"].map((lang) => ({
      name: lang === "en" ? `${slug}.webp` : `${slug}.es.webp`,
      html: cover({
        theme: spec.theme,
        halo: spec.halo,
        phrase: spec.phrase[lang],
        objects: spec.objects(lang),
      }),
    })),
  );

if (only && jobs.length === 0) {
  console.error(
    `❌  No cover for "${only}". Known: ${Object.keys(covers).join(", ")}`,
  );
  process.exit(1);
}

async function main() {
  if (htmlDir) {
    fs.mkdirSync(htmlDir, { recursive: true });
    for (const job of jobs)
      fs.writeFileSync(
        path.join(htmlDir, job.name.replace(/\.webp$/, ".html")),
        job.html,
      );
    console.log(`📝  Wrote ${jobs.length} HTML files to ${htmlDir}`);
    return;
  }
  const { chromium } = require("playwright");
  console.log("🚀  Launching Chromium…");
  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: SCALE,
  });
  for (const job of jobs) {
    process.stdout.write(`  ⏳  /blog/${job.name}… `);
    await tab.setContent(job.html, { waitUntil: "networkidle" });
    await tab.evaluate(() => document.fonts.ready);
    await tab.waitForTimeout(150);
    const png = await tab.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: W, height: H },
    });
    const out = path.join(OUT, job.name);
    await sharp(png).resize(W, H).webp({ quality: 84 }).toFile(out);
    console.log(`✅  ${Math.round(fs.statSync(out).size / 1024)} KB`);
  }
  await browser.close();
  console.log("\n✨  Done.");
}

main().catch((error) => {
  console.error("❌ ", error);
  process.exit(1);
});
