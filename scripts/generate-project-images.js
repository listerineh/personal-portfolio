#!/usr/bin/env node

/**
 * generate-project-images.js
 *
 * Generates the product shots used on the portfolio's project cards.
 * Uses Playwright to render HTML/CSS → PNG → WebP via sharp.
 *
 * Style (matches the site's Lumen design): a soft pastel ground in the project's own hue, one white
 * app window with rounded corners and a soft shadow, and one smaller card floating over it for depth.
 * Geist type, no emoji, no glows. The card around the image carries the name, description and stack,
 * so the image shows only the product.
 *
 * Format: 4:3 at 2x (2400×1800).
 *
 * Usage:
 *   node scripts/generate-project-images.js          # all projects
 *   node scripts/generate-project-images.js openstage # single project
 */

const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../public/projects");
const WIDTH = 1200;
const HEIGHT = 900;
const SCALE = 2;
const FILTER = process.argv[2] || null;

// ─── Shared frame ──────────────────────────────────────────────────────────

/**
 * @param {object} theme  ground: pastel background, accent: the project's hue, accentSoft: tinted fill
 * @param {string} extraCss  template-specific styles
 * @param {string} body  the scene: usually .window + .float
 */
function page(theme, extraCss, body) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --ground: ${theme.ground};
    --accent: ${theme.accent};
    --accent-soft: ${theme.accentSoft};
    --ink: #1D1D1F;
    --muted: #6E6E73;
    --line: #E5E5EA;
    --fill: #F5F5F7;
  }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; position: relative;
    font-family: 'Geist', -apple-system, system-ui, sans-serif; color: var(--ink);
    background: var(--ground); letter-spacing: -0.01em; -webkit-font-smoothing: antialiased;
  }
  /* A whisper of light from the top so the ground is not flat. */
  body::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%);
  }
  .scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .window {
    position: relative; width: 780px; background: #fff; border-radius: 24px; overflow: hidden;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 24px -8px rgba(0,0,0,0.08), 0 40px 80px -24px rgba(0,0,0,0.22);
  }
  .bar { display: flex; align-items: center; gap: 14px; height: 52px; padding: 0 20px; border-bottom: 1px solid var(--line); }
  .lights { display: flex; gap: 8px; }
  .lights i { width: 12px; height: 12px; border-radius: 50%; background: var(--line); display: block; }
  .bar-title { font-size: 14px; font-weight: 500; color: var(--muted); }
  .bar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .content { padding: 28px; }
  .float {
    position: absolute; background: #fff; border-radius: 20px; padding: 20px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 24px 48px -12px rgba(0,0,0,0.25);
  }
  .label { font-size: 12px; font-weight: 500; color: var(--muted); }
  .h { font-size: 22px; font-weight: 600; letter-spacing: -0.025em; }
  .chip {
    display: inline-flex; align-items: center; height: 28px; padding: 0 12px; border-radius: 999px;
    font-size: 13px; font-weight: 500; background: var(--fill); color: var(--ink); white-space: nowrap;
  }
  .chip.on { background: var(--accent); color: #fff; }
  .chip.soft { background: var(--accent-soft); color: var(--accent); }
  .btn {
    display: inline-flex; align-items: center; height: 36px; padding: 0 16px; border-radius: 999px;
    background: var(--accent); color: #fff; font-size: 14px; font-weight: 500;
  }
  .row { display: flex; align-items: center; gap: 12px; }
  .mono { font-family: 'Geist Mono', ui-monospace, monospace; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block; }
  .bar-track { height: 8px; border-radius: 999px; background: var(--fill); overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 999px; background: var(--accent); }
  .check {
    width: 20px; height: 20px; border-radius: 50%; background: var(--accent); flex-shrink: 0;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .check::after { content: ''; width: 8px; height: 4px; border-left: 2px solid #fff; border-bottom: 2px solid #fff; transform: rotate(-45deg) translate(1px, -1px); }
  ${extraCss}
</style></head><body><div class="scene">${body}</div></body></html>`;
}

const windowBar = (title, right = "") =>
  `<div class="bar"><div class="lights"><i></i><i></i><i></i></div><span class="bar-title">${title}</span><div class="bar-right">${right}</div></div>`;

// ─── 1. OpenStage: clip generator ─────────────────────────────────────────

function htmlOpenStage() {
  const bars = [
    32, 48, 22, 55, 68, 40, 70, 28, 64, 58, 44, 72, 35, 52, 60, 38, 66, 30, 56,
    42, 75, 26, 50, 62, 45, 34, 58, 48, 72, 36, 66, 28, 54, 62, 40, 70, 32, 48,
    60, 38, 52, 44,
  ];
  const wave = bars
    .map(
      (h, i) =>
        `<i style="height:${h * 1.25}px;opacity:${i >= 14 && i <= 22 ? 1 : 0.28}"></i>`,
    )
    .join("");
  return page(
    { ground: "#ECE8FA", accent: "#7C3AED", accentSoft: "#F1EBFE" },
    `
    .scene { transform: translate(40px, -10px); }
    .wave { display: flex; align-items: center; gap: 5px; height: 110px; padding: 0 4px; }
    .wave i { display: block; width: 8px; border-radius: 999px; background: var(--accent); }
    .moment { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 16px; background: var(--fill); }
    .thumb { width: 44px; height: 44px; border-radius: 12px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; }
    .play { width: 0; height: 0; border-left: 12px solid var(--accent); border-top: 8px solid transparent; border-bottom: 8px solid transparent; margin-left: 3px; }
    .phone { width: 190px; left: 60px; bottom: 120px; padding: 12px; }
    .screen { height: 300px; border-radius: 14px; background: linear-gradient(180deg, #2E1065, #7C3AED); position: relative; overflow: hidden; }
    .caption { position: absolute; left: 12px; right: 12px; bottom: 14px; color: #fff; font-size: 13px; font-weight: 600; line-height: 1.3; }
    .ratio { position: absolute; top: 12px; left: 12px; }
    `,
    `
    <div class="window">
      ${windowBar("Clip Generator", '<span class="chip soft">Top 5 moments</span>')}
      <div class="content" style="display:grid;gap:24px;">
        <div class="row">
          <span class="chip on">TikTok 9:16</span><span class="chip">Instagram Reels</span><span class="chip">YouTube Shorts</span>
        </div>
        <div>
          <div class="label" style="margin-bottom:12px;">Audio timeline</div>
          <div class="wave">${wave}</div>
          <div class="bar-track" style="margin-top:14px;"><div class="bar-fill" style="width:62%"></div></div>
        </div>
        <div class="moment">
          <div class="thumb"><span class="play"></span></div>
          <div>
            <div style="font-size:16px;font-weight:600;">moment_05 · 0:42</div>
            <div class="label" style="margin-top:2px;">High energy · 30s clip</div>
          </div>
          <span class="btn" style="margin-left:auto;">Export</span>
        </div>
      </div>
    </div>
    <div class="float phone">
      <div class="screen">
        <span class="chip ratio" style="background:rgba(255,255,255,0.2);color:#fff;height:24px;font-size:11px;">9:16</span>
        <div class="caption">FFmpeg WASM · rendered in the browser</div>
      </div>
    </div>
    `,
  );
}

// ─── 2. VibeArchitect: architecture picker ────────────────────────────────

function htmlVibeArchitect() {
  const option = (name, desc, pros, on) => `
    <div class="opt ${on ? "on" : ""}">
      <span class="radio"></span>
      <div style="flex:1;">
        <div style="font-size:16px;font-weight:600;">${name}</div>
        <div class="label" style="margin-top:3px;">${desc}</div>
        ${pros.length ? `<div class="row" style="gap:6px;margin-top:10px;">${pros.map((p) => `<span class="chip ${on ? "soft" : ""}" style="height:24px;font-size:12px;">${p}</span>`).join("")}</div>` : ""}
      </div>
    </div>`;
  const file = (name, depth = 0) =>
    `<div class="file" style="padding-left:${depth * 18}px;"><span class="check"></span><span class="mono">${name}</span></div>`;
  return page(
    { ground: "#DFF1EC", accent: "#0F766E", accentSoft: "#E3F4F0" },
    `
    .scene { transform: translate(-50px, 0); }
    .window { width: 720px; }
    .prompt { border-radius: 16px; background: var(--fill); padding: 16px 18px; font-size: 16px; color: var(--ink); }
    .opt { display: flex; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1.5px solid var(--line); }
    .opt.on { border-color: var(--accent); background: var(--accent-soft); }
    .radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #C7C7CC; margin-top: 2px; flex-shrink: 0; }
    .opt.on .radio { border: 6px solid var(--accent); }
    .tree { right: 70px; bottom: 110px; width: 300px; display: grid; gap: 10px; }
    .file { display: flex; align-items: center; gap: 10px; font-size: 13px; }
    `,
    `
    <div class="window">
      ${windowBar("New project")}
      <div class="content" style="display:grid;gap:20px;">
        <div class="prompt">A SaaS to book music lessons, with payments and a teacher dashboard</div>
        <div class="label">Choose an architecture</div>
        <div style="display:grid;gap:10px;">
          ${option("Clean Architecture", "Domain, application, infrastructure, presentation", ["Scalable", "Testable", "Recommended"], true)}
          ${option("Feature-Sliced Design", "Organized by features with shared layers", ["Modern", "Modular"], false)}
          ${option("MVC Pattern", "Classic model-view-controller structure", [], false)}
        </div>
        <div>
          <div class="row" style="justify-content:space-between;margin-bottom:10px;"><span class="label">Generating files…</span><span style="font-size:13px;font-weight:600;color:var(--accent);">71%</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:71%"></div></div>
        </div>
      </div>
    </div>
    <div class="float tree">
      <div class="label" style="margin-bottom:4px;">src/</div>
      ${file("domain/")}${file("booking.entity.ts", 1)}${file("application/")}${file("book-lesson.ts", 1)}${file("infrastructure/")}${file("presentation/")}
    </div>
    `,
  );
}

// ─── 3. OpenKanban: realtime board ────────────────────────────────────────

function htmlOpenKanban() {
  const card = (title, tags, accent = false) => `
    <div class="kcard">
      <div style="font-size:14px;font-weight:600;line-height:1.3;">${title}</div>
      <div class="row" style="gap:6px;margin-top:10px;">${tags.map((t) => `<span class="chip ${accent ? "soft" : ""}" style="height:22px;font-size:11px;padding:0 9px;">${t}</span>`).join("")}</div>
    </div>`;
  const col = (title, count, cards, live = false) => `
    <div class="kcol">
      <div class="row" style="justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:13px;font-weight:600;${live ? "color:var(--accent);" : ""}">${title}</span>
        <span class="count ${live ? "live" : ""}">${count}</span>
      </div>
      <div style="display:grid;gap:10px;">${cards}</div>
    </div>`;
  return page(
    { ground: "#E3EAFB", accent: "#2563EB", accentSoft: "#E8EFFE" },
    `
    .scene { transform: translate(0, 10px); }
    .window { width: 900px; }
    .board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .kcol { background: var(--fill); border-radius: 18px; padding: 14px; }
    .kcard { background: #fff; border-radius: 14px; padding: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .count { min-width: 24px; height: 24px; border-radius: 999px; background: #fff; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
    .count.live { background: var(--accent); color: #fff; }
    .presence { top: 90px; right: 90px; padding: 14px 18px; }
    .avatars { display: flex; }
    .avatars i { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; margin-left: -8px; display: block; }
    .avatars i:first-child { margin-left: 0; }
    .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #34C759; }
    `,
    `
    <div class="window">
      ${windowBar("OpenKanban · Product launch", '<span class="chip">PWA</span><span class="chip">Open source</span>')}
      <div class="content">
        <div class="board">
          ${col("To do", 3, card("Design onboarding flow", ["UX", "Design"]) + card("API rate limiting", ["Backend"]) + card("Write unit tests", ["Testing"]))}
          ${col("In progress", 2, card("Drag &amp; drop tasks", ["Feature", "Frontend"], true) + card("Multi-project support", ["Core"], true), true)}
          ${col("Done", 4, card("Firebase integration", ["Backend"]) + card("Auth with Google", ["Auth"]) + card("PWA offline support", ["PWA"]))}
        </div>
      </div>
    </div>
    <div class="float presence row" style="gap:14px;">
      <div class="avatars"><i style="background:#93C5FD"></i><i style="background:#FDBA74"></i><i style="background:#86EFAC"></i></div>
      <div>
        <div class="row" style="gap:6px;"><span class="live-dot"></span><span style="font-size:14px;font-weight:600;">Realtime sync</span></div>
        <div class="label" style="margin-top:2px;">Firebase</div>
      </div>
    </div>
    `,
  );
}

// ─── 4. Cadenza: chord explorer ───────────────────────────────────────────

function htmlCadenza() {
  // Two octaves from C; Am7 = A C E G highlighted.
  const whites = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ];
  const lit = new Set([5, 7, 9, 11]); // A, C, E, G (second octave C/E/G)
  const kw = 46,
    kh = 190;
  const whiteKeys = whites
    .map(
      (
        n,
        i,
      ) => `<rect x="${i * kw}" y="0" width="${kw - 3}" height="${kh}" rx="8" fill="${lit.has(i) ? "var(--accent)" : "#fff"}" stroke="#E5E5EA"/>
      ${lit.has(i) ? `<text x="${i * kw + (kw - 3) / 2}" y="${kh - 18}" text-anchor="middle" font-size="14" font-weight="600" fill="#fff" font-family="Geist">${n}</text>` : ""}`,
    )
    .join("");
  const blackAfter = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  const blackKeys = blackAfter
    .map(
      (i) =>
        `<rect x="${i * kw + kw - 15}" y="0" width="27" height="118" rx="6" fill="#1D1D1F"/>`,
    )
    .join("");
  return page(
    { ground: "#F8E6EC", accent: "#BE185D", accentSoft: "#FBEAF1" },
    `
    .scene { transform: translate(30px, -20px); }
    .window { width: 740px; }
    .chord { font-size: 56px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
    .notes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .note { height: 56px; border-radius: 14px; background: var(--accent-soft); color: var(--accent); font-size: 20px; font-weight: 600; display: flex; align-items: center; justify-content: center; }
    .metro { left: 70px; bottom: 90px; width: 230px; }
    .beats { display: flex; gap: 8px; margin-top: 14px; }
    .beats i { flex: 1; height: 10px; border-radius: 999px; background: var(--fill); display: block; }
    .beats i.on { background: var(--accent); }
    `,
    `
    <div class="window">
      ${windowBar("Chord explorer", '<span class="chip">Scales</span><span class="chip on">Chords</span>')}
      <div class="content" style="display:grid;gap:24px;">
        <div class="row" style="align-items:flex-end;justify-content:space-between;">
          <div><div class="chord">Am7</div><div class="label" style="margin-top:8px;font-size:14px;">A minor seventh</div></div>
          <span class="chip soft">Key of C major</span>
        </div>
        <svg width="${whites.length * kw}" height="${kh}" viewBox="0 0 ${whites.length * kw} ${kh}" style="display:block;max-width:100%;">${whiteKeys}${blackKeys}</svg>
        <div class="notes">${["A", "C", "E", "G"].map((n) => `<div class="note">${n}</div>`).join("")}</div>
      </div>
    </div>
    <div class="float metro">
      <div class="label">Metronome</div>
      <div style="font-size:32px;font-weight:700;letter-spacing:-0.03em;margin-top:4px;">96 <span style="font-size:15px;font-weight:500;color:var(--muted);">BPM</span></div>
      <div class="beats"><i class="on"></i><i></i><i></i><i></i></div>
    </div>
    `,
  );
}

// ─── 5. GDG Ecuador: events hub ───────────────────────────────────────────

function htmlGDGEcuador() {
  const g = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };
  const tag = (text, color) =>
    `<span class="chip" style="background:${color}1F;color:${color === g.yellow ? "#8A6400" : color};">${text}</span>`;
  return page(
    { ground: "#E6EEFC", accent: "#1A73E8", accentSoft: "#E8F0FE" },
    `
    .scene { transform: translate(-30px, 0); }
    .window { width: 760px; }
    .featured { border-radius: 20px; background: var(--fill); padding: 24px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .ev { border-radius: 18px; border: 1px solid var(--line); padding: 18px; }
    .brand { display: flex; gap: 6px; }
    .brand i { width: 12px; height: 12px; border-radius: 50%; display: block; }
    .kinds { right: 60px; bottom: 100px; width: 260px; display: grid; gap: 12px; }
    `,
    `
    <div class="window">
      ${windowBar("GDG Ecuador · Events", `<div class="brand"><i style="background:${g.blue}"></i><i style="background:${g.red}"></i><i style="background:${g.yellow}"></i><i style="background:${g.green}"></i></div>`)}
      <div class="content" style="display:grid;gap:16px;">
        <div class="featured">
          <span class="chip soft" style="height:24px;font-size:12px;">Featured</span>
          <div class="h" style="font-size:30px;margin-top:14px;">DevFest Ecuador 2025</div>
          <div class="label" style="margin-top:6px;font-size:14px;">Oct 18, 2025 · Quito, Ecuador</div>
          <div class="row" style="gap:8px;margin-top:18px;">${tag("Android", g.green)}${tag("Cloud", g.blue)}${tag("AI/ML", g.yellow)}</div>
        </div>
        <div class="grid2">
          <div class="ev"><div class="label" style="color:${g.red};font-weight:600;">AI</div><div style="font-size:17px;font-weight:600;margin-top:6px;">Build with AI 2025</div><div class="label" style="margin-top:4px;">June 2025</div><div style="margin-top:12px;">${tag("Gemini", g.red)}</div></div>
          <div class="ev"><div class="label" style="color:${g.green};font-weight:600;">Study Jam</div><div style="font-size:17px;font-weight:600;margin-top:6px;">Cloud Study Jam</div><div class="label" style="margin-top:4px;">Ongoing</div><div style="margin-top:12px;">${tag("GCP", g.green)}</div></div>
        </div>
      </div>
    </div>
    <div class="float kinds">
      <div class="label">Across Ecuador</div>
      ${["Talks", "Workshops", "DevFests"].map((k, i) => `<div class="row" style="gap:10px;"><span class="dot" style="background:${[g.blue, g.red, g.green][i]}"></span><span style="font-size:15px;font-weight:500;">${k}</span></div>`).join("")}
    </div>
    `,
  );
}

// ─── 6. Flights: CO₂ and fuel analytics ───────────────────────────────────

function htmlFlights() {
  const metric = (value, label) =>
    `<div class="metric"><div class="label">${label}</div><div style="font-size:30px;font-weight:700;letter-spacing:-0.03em;margin-top:6px;">${value}</div></div>`;
  const flight = (from, to, plane, co2) => `
    <div class="flight">
      <div><div class="row" style="gap:8px;font-size:17px;font-weight:600;"><span>${from}</span><span style="color:var(--muted);font-weight:400;">→</span><span>${to}</span></div><div class="label" style="margin-top:3px;">${plane}</div></div>
      <span class="chip soft" style="margin-left:auto;">${co2} CO₂</span>
    </div>`;
  const heights = [62, 88, 46, 74, 100, 58];
  return page(
    { ground: "#E1EFF8", accent: "#0369A1", accentSoft: "#E3F1FA" },
    `
    .scene { transform: translate(40px, -10px); }
    .window { width: 740px; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .metric { border-radius: 18px; background: var(--fill); padding: 18px; }
    .flight { display: flex; align-items: center; padding: 16px 0; border-top: 1px solid var(--line); }
    .chart { left: 50px; bottom: 90px; width: 250px; }
    .bars { display: flex; align-items: flex-end; gap: 10px; height: 110px; margin-top: 14px; }
    .bars i { flex: 1; border-radius: 8px; background: var(--accent-soft); display: block; }
    .bars i.top { background: var(--accent); }
    `,
    `
    <div class="window">
      ${windowBar("Flight analytics", '<span class="chip">Search</span><span class="chip">Filters</span>')}
      <div class="content" style="display:grid;gap:22px;">
        <div class="metrics">${metric("12.4t", "Total CO₂")}${metric("4,892", "Fuel (liters)")}${metric("247", "Flights")}</div>
        <div>
          <div class="label" style="margin-bottom:4px;">Recent flights</div>
          ${flight("UIO", "JFK", "Boeing 767 · 5h 30m", "2.14t")}
          ${flight("GYE", "MIA", "Airbus A320 · 4h 10m", "1.87t")}
        </div>
      </div>
    </div>
    <div class="float chart">
      <div class="label">CO₂ per route</div>
      <div class="bars">${heights.map((h) => `<i class="${h === 100 ? "top" : ""}" style="height:${h}%"></i>`).join("")}</div>
    </div>
    `,
  );
}

// ─── 7. Kairo: tasks, calendar, focus ─────────────────────────────────────

function htmlKairo() {
  const days = [
    ["Mon", "20"],
    ["Tue", "21"],
    ["Wed", "22"],
    ["Thu", "23"],
    ["Fri", "24", true],
    ["Sat", "25"],
    ["Sun", "26"],
  ];
  const week = days
    .map(
      ([name, n, on]) =>
        `<div class="day ${on ? "on" : ""}"><span>${name}</span><b>${n}</b></div>`,
    )
    .join("");
  const task = (title, meta, color) => `
    <div class="task">
      <span class="prio" style="background:${color}"></span>
      <div style="min-width:0">
        <div class="task-title">${title}</div>
        <div class="label">${meta}</div>
      </div>
    </div>`;
  return page(
    { ground: "#E6F0EA", accent: "#1E5B45", accentSoft: "#E3EEE8" },
    `
    .scene { display: block; }
    .phone {
      position: absolute; left: 276px; top: 46px; width: 430px; background: #fff; border-radius: 48px; padding: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 24px -8px rgba(0,0,0,0.08), 0 40px 80px -24px rgba(0,0,0,0.22);
    }
    .screen {
      border-radius: 38px; background: #F1F2EF; overflow: hidden;
      padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 14px;
    }
    .island { width: 108px; height: 22px; border-radius: 999px; background: #121417; margin: 2px auto 2px; }
    .hello { font-size: 32px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
    .week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
    .day { height: 54px; border-radius: 14px; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; }
    .day span { font-size: 11px; font-weight: 500; color: var(--muted); }
    .day b { font-size: 15px; font-weight: 600; }
    .day.on { background: var(--accent); }
    .day.on span, .day.on b { color: #fff; }
    .ahora { background: #121417; color: #F3F5F2; border-radius: 22px; padding: 16px; display: grid; gap: 8px; }
    .ahora .kicker { font-size: 12px; font-weight: 500; color: #A7AFB7; }
    .ahora .h { font-size: 20px; font-weight: 600; letter-spacing: -0.03em; }
    .lime { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 999px; background: #C6E96F; color: #121417; font-size: 14px; font-weight: 600; }
    .task { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 16px; padding: 12px 14px; }
    .task-title { font-size: 15px; font-weight: 600; letter-spacing: -0.02em; }
    .prio { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .focus { left: 628px; top: 548px; width: 280px; }
    .ring {
      width: 88px; height: 88px; border-radius: 50%; flex-shrink: 0;
      background: conic-gradient(#1E5B45 0 72%, #E6E9E5 72% 100%);
      display: grid; place-items: center;
    }
    .ring i {
      width: 70px; height: 70px; border-radius: 50%; background: #fff;
      display: grid; place-items: center; font-size: 18px; font-weight: 700;
      letter-spacing: -0.03em; font-style: normal;
    }
    `,
    `
    <div class="phone">
      <div class="screen">
        <div class="island"></div>
        <div>
          <div class="hello">Good morning</div>
          <div class="label" style="margin-top:6px;">3 open · one with Ana</div>
        </div>
        <div class="week">${week}</div>
        <div class="ahora">
          <div class="kicker">Now</div>
          <div class="h">Ship the focus timer</div>
          <div class="row" style="justify-content:space-between;margin-top:4px;">
            <span class="kicker">Shared with Ana</span>
            <span class="lime">Focus</span>
          </div>
        </div>
        <div>
          <div class="label" style="margin-bottom:10px;">Pending</div>
          <div style="display:grid;gap:8px;">
            ${task("Write the release notes", "Urgent · today", "#C8323F")}
            ${task("Call the studio", "High · 16:30", "#A9550E")}
            ${task("Grocery run", "Low", "#646C75")}
          </div>
        </div>
      </div>
    </div>
    <div class="float focus">
      <div class="label">Focus</div>
      <div class="row" style="justify-content:space-between;align-items:center;margin-top:8px;">
        <div>
          <div style="font-size:32px;font-weight:700;letter-spacing:-0.04em;line-height:1;">25:00</div>
          <div class="label" style="margin-top:6px;">One task · 25 min</div>
        </div>
        <div class="ring"><i>25</i></div>
      </div>
    </div>
    `,
  );
}

// ─── 8. CodeSentry Swarm: a pull request through three agents ─────────────

function htmlCodeSentry() {
  const stage = (n, name, detail, state) => `
    <div class="stage">
      <span class="num mono">${n}</span>
      <div style="flex:1;min-width:0;">
        <div class="row" style="gap:10px;"><span style="font-size:16px;font-weight:600;">${name}</span>${state}</div>
        <div class="label" style="margin-top:4px;">${detail}</div>
      </div>
    </div>`;
  const pill = (text, cls) => `<span class="chip ${cls}" style="height:24px;font-size:12px;">${text}</span>`;
  return page(
    { ground: "#E4E6F8", accent: "#4338CA", accentSoft: "#ECEDFC" },
    `
    .scene { transform: translate(-40px, -6px); }
    .window { width: 720px; }
    .stage { display: flex; gap: 16px; align-items: flex-start; padding: 16px 18px; border-radius: 16px; background: var(--fill); }
    .num { width: 32px; height: 32px; border-radius: 50%; background: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; color: var(--muted); flex-shrink: 0; }
    .chip.red { background: #FDECEA; color: #B42318; }
    .chip.green { background: #E7F6EC; color: #157F3C; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .metric { border-radius: 16px; border: 1.5px solid var(--line); padding: 14px 16px; }
    .comment { right: 40px; bottom: 96px; width: 330px; display: grid; gap: 12px; }
    .diff { border-radius: 12px; background: var(--fill); padding: 12px 14px; font-size: 12.5px; line-height: 1.7; }
    .del { color: #B42318; } .add { color: #157F3C; }
    `,
    `
    <div class="window">
      ${windowBar("Pull request #18 · checkout", '<span class="chip soft">3 agents</span>')}
      <div class="content" style="display:grid;gap:14px;">
        ${stage("1", "Triage", "Hypothesis: points are counted before the discount", pill("Gemini", "soft"))}
        ${stage("2", "Sandbox", '<span class="mono">test_loyalty_points</span> fails, then 6 tests pass', pill("Red", "red") + pill("Green", "green"))}
        ${stage("3", "Judge", "Exit codes check out. Fix proposed", '<span class="check"></span>')}
        <div class="metrics" style="margin-top:6px;">
          <div class="metric"><div class="label">Time</div><div style="font-size:24px;font-weight:700;letter-spacing:-0.03em;margin-top:4px;">111 s</div></div>
          <div class="metric"><div class="label">Cost</div><div style="font-size:24px;font-weight:700;letter-spacing:-0.03em;margin-top:4px;">0.0026 USD</div></div>
          <div class="metric"><div class="label">Iterations</div><div style="font-size:24px;font-weight:700;letter-spacing:-0.03em;margin-top:4px;">1 of 3</div></div>
        </div>
      </div>
    </div>
    <div class="float comment">
      <div class="row" style="gap:10px;"><span class="dot"></span><span style="font-size:14px;font-weight:600;">codesentry-swarm</span><span class="label">commented</span></div>
      <div style="font-size:15px;font-weight:600;">Fix proposed, a person merges</div>
      <div class="diff mono">
        <div class="del">- points = total // 10</div>
        <div class="add">+ points = (total - discount) // 10</div>
      </div>
    </div>
    `,
  );
}

// ─── 9. Football Altitude Data: matches joined with altitude ──────────────

function htmlFootballData() {
  const row = (year, home, away, diff, score) => `
    <div class="trow">
      <span class="mono muted">${year}</span>
      <span>${home} <span class="muted">vs</span> ${away}</span>
      <span class="chip soft mono" style="height:24px;font-size:12px;">${diff}</span>
      <span class="mono" style="text-align:right;">${score}</span>
    </div>`;
  const city = (name, m, w) => `
    <div style="display:grid;gap:6px;">
      <div class="row" style="justify-content:space-between;font-size:14px;"><span style="font-weight:600;">${name}</span><span class="mono muted">${m} m</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${w}%"></div></div>
    </div>`;
  return page(
    { ground: "#EAF2DC", accent: "#4D7C0F", accentSoft: "#EEF5E1" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 760px; }
    .muted { color: var(--muted); }
    .thead, .trow { display: grid; grid-template-columns: 56px 1fr 92px 48px; gap: 12px; align-items: center; }
    .thead { font-size: 12px; font-weight: 500; color: var(--muted); padding: 0 0 10px; }
    .trow { font-size: 15px; padding: 14px 0; border-top: 1px solid var(--line); }
    .cities { right: 50px; bottom: 60px; width: 290px; display: grid; gap: 14px; }
    `,
    `
    <div class="window">
      ${windowBar("libertadores_analysis.csv", '<span class="chip soft">2014–2024</span>')}
      <div class="content">
        <div class="thead"><span>Year</span><span>Match</span><span>Altitude gap</span><span style="text-align:right;">Score</span></div>
        ${row("2020", "Binacional", "River Plate", "+3,799 m", "0:6")}
        ${row("2019", "San José", "Flamengo", "+3,725 m", "0:1")}
        ${row("2019", "Flamengo", "San José", "−3,725 m", "6:1")}
        ${row("2020", "River Plate", "Binacional", "−3,799 m", "8:0")}
        <div class="label" style="padding-top:18px;border-top:1px solid var(--line);">1,729 matches · altitude from 110 cities</div>
      </div>
    </div>
    <div class="float cities">
      <div class="label">City altitude</div>
      ${city("El Alto", "4,150", 100)}
      ${city("La Paz", "3,640", 88)}
      ${city("Quito", "2,850", 69)}
      ${city("Guayaquil", "9", 2)}
    </div>
    `,
  );
}

// ─── 10. Sign Language Alphabet: test mode ────────────────────────────────

function htmlSignLanguage() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const grid = letters
    .map((l) => `<span class="key ${l === "K" ? "on" : ""}">${l}</span>`)
    .join("");
  return page(
    { ground: "#F8E7DC", accent: "#C2410C", accentSoft: "#FCEEE5" },
    `
    .scene { transform: translate(-50px, -10px); }
    .window { width: 700px; }
    .cam { position: relative; height: 330px; border-radius: 18px; background: linear-gradient(160deg, #2B2420, #4A3A30); overflow: hidden; }
    .roi { position: absolute; right: 48px; top: 46px; width: 200px; height: 200px; border-radius: 16px; border: 2px dashed rgba(255,255,255,0.75); }
    .mask { position: absolute; left: 22px; top: 22px; right: 22px; bottom: 22px; border-radius: 12px; background: #000; display: flex; align-items: center; justify-content: center; }
    .mask svg { width: 120px; height: 120px; }
    .tag { position: absolute; left: 20px; bottom: 20px; }
    .keys { left: 100px; bottom: 70px; width: 300px; }
    .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 12px; }
    .key { height: 32px; border-radius: 9px; background: var(--fill); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: var(--muted); }
    .key.on { background: var(--accent); color: #fff; }
    `,
    `
    <div class="window">
      ${windowBar("Test mode", '<span class="chip soft">Asked: K</span>')}
      <div class="content" style="display:grid;gap:18px;">
        <div class="cam">
          <div class="roi"><div class="mask">
            <svg viewBox="0 0 100 100" fill="#fff"><rect x="30" y="44" width="40" height="44" rx="12"/><rect x="34" y="12" width="9" height="40" rx="4.5"/><rect x="46" y="8" width="9" height="42" rx="4.5"/><rect x="58" y="22" width="9" height="30" rx="4.5" transform="rotate(14 62 37)"/><rect x="16" y="46" width="9" height="26" rx="4.5" transform="rotate(-40 20 59)"/></svg>
          </div></div>
          <span class="chip tag" style="background:rgba(255,255,255,0.16);color:#fff;">Keep your hand inside the box</span>
        </div>
        <div class="row" style="justify-content:space-between;">
          <div><div class="label">You signed</div><div style="font-size:30px;font-weight:700;letter-spacing:-0.03em;margin-top:2px;">K</div></div>
          <span class="row" style="gap:10px;font-size:15px;font-weight:600;"><span class="check"></span>Correct</span>
        </div>
      </div>
    </div>
    <div class="float keys">
      <div class="label">26 letters</div>
      <div class="grid">${grid}</div>
    </div>
    `,
  );
}

// ─── 11. LBPH Face Recognition: live result ───────────────────────────────

function htmlLBPH() {
  const face = (left, top, color, name, dist) => `
    <div style="position:absolute;left:${left}px;top:${top}px;">
      <span class="chip" style="height:26px;font-size:12px;background:${color};color:#fff;position:absolute;top:-36px;left:0;white-space:nowrap;">${name} · ${dist}</span>
      <div class="box" style="border-color:${color};"><span class="head"></span></div>
      <span class="body"></span>
    </div>`;
  const thumbs = Array.from({ length: 8 }, () => `<span class="thumb"><span></span></span>`).join("");
  return page(
    { ground: "#E6E9EE", accent: "#334155", accentSoft: "#EEF1F5" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 720px; }
    .cam { position: relative; height: 360px; border-radius: 18px; background: linear-gradient(170deg, #1F2733, #374151); overflow: hidden; }
    .box { width: 120px; height: 140px; border: 3px solid; border-radius: 14px; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
    .head { width: 74px; height: 92px; border-radius: 50% 50% 46% 46%; background: rgba(255,255,255,0.22); margin-bottom: 14px; }
    .body { position: absolute; left: -30px; top: 150px; width: 180px; height: 140px; border-radius: 90px 90px 0 0; background: rgba(255,255,255,0.12); }
    .capture { right: 40px; bottom: 80px; width: 280px; display: grid; gap: 12px; }
    .thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .thumb { aspect-ratio: 1; border-radius: 10px; background: #D9DEE5; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
    .thumb span { width: 55%; height: 70%; border-radius: 50% 50% 0 0; background: #B7BFCA; }
    `,
    `
    <div class="window">
      ${windowBar("Live recognition", '<span class="chip soft">LBPH · threshold 70</span>')}
      <div class="content">
        <div class="cam">
          ${face(110, 90, "#15803D", "Person 1", "41")}
          ${face(400, 120, "#B42318", "Unknown face", "96")}
        </div>
      </div>
    </div>
    <div class="float capture">
      <div class="row" style="justify-content:space-between;"><span class="label">Capture</span><span class="mono label">300 / 300</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:100%"></div></div>
      <div class="thumbs">${thumbs}</div>
    </div>
    `,
  );
}

// ─── 12. Hand Tracking: landmarks and a square crop ───────────────────────

function htmlHandsTracking() {
  // An open hand, 21 MediaPipe landmarks: wrist, then four points per finger from thumb to little finger.
  const pts = [
    [200, 300], [160, 280], [130, 250], [110, 220], [92, 192],
    [170, 200], [162, 150], [157, 118], [153, 88],
    [200, 194], [200, 140], [200, 104], [200, 72],
    [230, 200], [238, 150], [243, 118], [247, 90],
    [256, 214], [272, 176], [282, 152], [290, 130],
  ];
  const bones = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
  const lines = bones.map(([a, b]) => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" />`).join("");
  const dots = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" />`).join("");
  return page(
    { ground: "#F5EEDB", accent: "#A16207", accentSoft: "#FAF3E1" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 700px; }
    .cam { position: relative; height: 380px; border-radius: 18px; background: linear-gradient(165deg, #2A2418, #4B3F28); overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .cam svg { width: 400px; height: 380px; }
    .cam line { stroke: #fff; stroke-width: 3; stroke-linecap: round; opacity: 0.9; }
    .cam circle { fill: var(--accent); stroke: #fff; stroke-width: 2; }
    .cam rect { fill: none; stroke: #F87171; stroke-width: 3; }
    .legend { right: 50px; bottom: 90px; width: 260px; display: grid; gap: 10px; }
    .lm { display: flex; justify-content: space-between; font-size: 14px; }
    `,
    `
    <div class="window">
      ${windowBar("Lecture", '<span class="chip soft">MediaPipe Hands</span>')}
      <div class="content">
        <div class="cam">
          <svg viewBox="0 0 400 380">${lines}${dots}<rect x="47" y="42" width="288" height="288" rx="6" /></svg>
        </div>
      </div>
    </div>
    <div class="float legend">
      <div class="label">21 landmarks</div>
      <div class="lm"><span>0 · Wrist</span><span class="mono label">bottom</span></div>
      <div class="lm"><span>4 · Thumb tip</span><span class="mono label">left</span></div>
      <div class="lm"><span>12 · Middle tip</span><span class="mono label">top</span></div>
      <div class="lm"><span>20 · Little tip</span><span class="mono label">right</span></div>
    </div>
    `,
  );
}

// ─── 13. RAG Evals: an answer with citations, and the retrieval scores ─────

function htmlRagEvals() {
  const chunk = (id, title, score, on) => `
    <div class="chunk ${on ? "on" : ""}">
      <span class="mono cid">${id}</span>
      <span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${title}</span>
      <span class="mono label">${score}</span>
    </div>`;
  const mode = (name, value, w, on) => `
    <div style="display:grid;gap:6px;">
      <div class="row" style="justify-content:space-between;font-size:14px;"><span style="font-weight:${on ? 600 : 500};">${name}</span><span class="mono ${on ? "" : "label"}">${value}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${w}%;opacity:${on ? 1 : 0.35}"></div></div>
    </div>`;
  return page(
    { ground: "#DFF0F4", accent: "#0E7490", accentSoft: "#E4F3F7" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 740px; }
    .q { border-radius: 16px; background: var(--fill); padding: 14px 18px; font-size: 16px; }
    .answer { font-size: 16px; line-height: 1.6; }
    .cite { display: inline-flex; align-items: center; justify-content: center; min-width: 22px; height: 20px; padding: 0 6px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); font-size: 12px; font-weight: 600; vertical-align: 2px; }
    .chunk { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 12px; font-size: 14px; border: 1.5px solid var(--line); }
    .chunk.on { border-color: var(--accent); background: var(--accent-soft); }
    .cid { font-size: 12px; color: var(--accent); }
    .modes { right: 40px; bottom: 70px; width: 290px; display: grid; gap: 14px; }
    `,
    `
    <div class="window">
      ${windowBar("POST /ask", '<span class="chip soft">mode: vector</span>')}
      <div class="content" style="display:grid;gap:16px;">
        <div class="q">Is the claim supported by the abstracts?</div>
        <div class="answer">The abstracts support it in adults <span class="cite">1</span>, but one trial found no effect in children <span class="cite">2</span>.</div>
        <div style="display:grid;gap:8px;">
          ${chunk("#4812", "Randomized trial in adults, 12-month follow-up", "0.71", true)}
          ${chunk("#2290", "Pediatric cohort, no significant difference", "0.66", true)}
          ${chunk("#0937", "Review of observational studies", "0.58", false)}
        </div>
      </div>
    </div>
    <div class="float modes">
      <div class="label">Recall@10 · SciFact test</div>
      ${mode("Vector", "0.829", 83, true)}
      ${mode("Hybrid", "0.756", 76, false)}
      ${mode("Full text", "0.521", 52, false)}
    </div>
    `,
  );
}

// ─── 14. Payments Ledger: an idempotent transfer, and the benchmark ────────

function htmlLedger() {
  const bench = (accounts, conc, rate, p99) => `
    <div class="brow"><span>${accounts}</span><span class="mono">${conc}</span><span class="mono">${rate}</span><span class="mono" style="text-align:right;">${p99}</span></div>`;
  return page(
    { ground: "#F7E1E7", accent: "#9F1239", accentSoft: "#FBE9EE" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 720px; }
    .code { border-radius: 16px; background: #1D1D1F; color: #E5E5EA; padding: 18px 20px; font-size: 14px; line-height: 1.7; }
    .k { color: #FDA4AF; } .s { color: #A7F3D0; } .m { color: #8E8E93; }
    .resp { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: 16px; background: var(--fill); font-size: 15px; }
    .bench { right: 40px; bottom: 70px; width: 320px; display: grid; gap: 2px; }
    .brow { display: grid; grid-template-columns: 1fr 44px 70px 70px; gap: 8px; font-size: 13px; padding: 8px 0; border-top: 1px solid var(--line); }
    .bhead { display: grid; grid-template-columns: 1fr 44px 70px 70px; gap: 8px; font-size: 11px; color: var(--muted); padding-bottom: 6px; }
    `,
    `
    <div class="window">
      ${windowBar("POST /transactions", '<span class="chip soft">Idempotency-Key: pay-7f3a</span>')}
      <div class="content" style="display:grid;gap:16px;">
        <div class="code mono">
          <div>{</div>
          <div>&nbsp;&nbsp;<span class="k">"entries"</span>: [</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;{ <span class="k">"account"</span>: <span class="s">"cash"</span>, <span class="k">"amount"</span>: -2500 },</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;{ <span class="k">"account"</span>: <span class="s">"merchant"</span>, <span class="k">"amount"</span>: 2500 }</div>
          <div>&nbsp;&nbsp;] <span class="m">// sums to zero, USD</span></div>
          <div>}</div>
        </div>
        <div class="resp"><span class="chip on" style="height:26px;">201</span><span>Posted once</span><span class="label" style="margin-left:auto;">retry → 200 · Idempotent-Replayed</span></div>
      </div>
    </div>
    <div class="float bench">
      <div class="label" style="margin-bottom:8px;">Benchmark · M4 Pro, Postgres 17</div>
      <div class="bhead"><span>Accounts</span><span>Conc.</span><span>Posts/s</span><span style="text-align:right;">p99</span></div>
      ${bench("1,000", "32", "4,004", "18.0 ms")}
      ${bench("1,000", "8", "3,229", "4.2 ms")}
      ${bench("10 (hot)", "32", "2,060", "207.2 ms")}
    </div>
    `,
  );
}

// ─── 15. Football Data Pipeline: a run, and the altitude table ─────────────

function htmlFootballPipeline() {
  const stat = (label, value) => `<div class="stat"><div class="label">${label}</div><div style="font-size:22px;font-weight:700;letter-spacing:-0.03em;margin-top:4px;">${value}</div></div>`;
  const band = (name, pct, n) => `
    <div style="display:grid;gap:6px;">
      <div class="row" style="justify-content:space-between;font-size:13px;"><span>${name}</span><span class="mono label">${pct} · ${n}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}"></div></div>
    </div>`;
  return page(
    { ground: "#E2E7F6", accent: "#1E40AF", accentSoft: "#E8ECFA" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 740px; }
    .steps { display: flex; align-items: center; gap: 8px; }
    .step { flex: 1; text-align: center; padding: 12px 8px; border-radius: 14px; background: var(--fill); font-size: 14px; font-weight: 600; }
    .step .label { font-weight: 500; margin-top: 2px; }
    .arrow { color: var(--muted); font-size: 14px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat { border-radius: 16px; border: 1.5px solid var(--line); padding: 14px 16px; }
    .alt { right: 40px; bottom: 150px; width: 300px; display: grid; gap: 12px; }
    `,
    `
    <div class="window">
      ${windowBar("Run 2026-11-26", '<span class="chip soft">Step Functions · weekly</span>')}
      <div class="content" style="display:grid;gap:18px;">
        <div class="steps">
          <div class="step">Ingest<div class="label">24 pages</div></div><span class="arrow">→</span>
          <div class="step">Quality<div class="label">2 quarantined</div></div><span class="arrow">→</span>
          <div class="step">Transform<div class="label">DuckDB</div></div><span class="arrow">→</span>
          <div class="step">API<div class="label">Parquet</div></div>
        </div>
        <div class="stats">
          ${stat("Valid rows", "3,290")}
          ${stat("Duplicates", "0")}
          ${stat("Parse + validate", "0.28 s")}
        </div>
      </div>
    </div>
    <div class="float alt">
      <div class="label">Home win rate by altitude advantage</div>
      ${band("2,500 m and more", "56.0%", "225")}
      ${band("500–1,499 m", "49.8%", "396")}
      ${band("0–499 m", "41.0%", "542")}
    </div>
    `,
  );
}

// ─── 16. Vector Search in Go: throughput by goroutines, and the build ─────

function htmlVecsearch() {
  const row = (workers, qps, pct, speed) => `
    <div style="display:grid;grid-template-columns:44px 1fr 92px 56px;gap:12px;align-items:center;font-size:14px;">
      <span class="mono">${workers}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}"></div></div>
      <span class="mono" style="text-align:right;">${qps}</span>
      <span class="mono label" style="text-align:right;">${speed}</span>
    </div>`;
  const build = (workers, secs, recall) => `
    <div class="brow"><span class="mono">${workers}</span><span class="mono">${secs}</span><span class="mono" style="text-align:right;">${recall}</span></div>`;
  return page(
    { ground: "#DDF0EA", accent: "#0F766E", accentSoft: "#E6F4F0" },
    `
    .scene { transform: translate(-40px, -10px); }
    .window { width: 740px; }
    .build { right: 40px; bottom: 90px; width: 290px; display: grid; gap: 2px; }
    .brow { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 13px; padding: 8px 0; border-top: 1px solid var(--line); }
    .bhead { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 11px; color: var(--muted); padding-bottom: 6px; }
    `,
    `
    <div class="window">
      ${windowBar("vecbench · SciFact", '<span class="chip soft">5,183 × 384 · ef=64</span>')}
      <div class="content" style="display:grid;gap:16px;">
        <div class="row" style="justify-content:space-between;">
          <span class="label">HNSW queries per second by goroutines</span>
          <span class="chip on" style="height:26px;">recall@10 0.985</span>
        </div>
        ${row("1", "13,593", "11.4%", "1.00×")}
        ${row("4", "55,008", "46.2%", "4.05×")}
        ${row("8", "104,198", "87.6%", "7.67×")}
        ${row("12", "118,993", "100%", "8.75×")}
        <div class="label">No locks on the read path · go test -race passes</div>
      </div>
    </div>
    <div class="float build">
      <div class="label" style="margin-bottom:8px;">Parallel build</div>
      <div class="bhead"><span>Workers</span><span>Seconds</span><span style="text-align:right;">Recall</span></div>
      ${build("1", "0.787", "0.994")}
      ${build("4", "0.199", "0.993")}
      ${build("8", "0.106", "0.990")}
    </div>
    `,
  );
}

// ─── Runner ────────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
  {
    id: "codesentry-swarm",
    filename: "codesentry-swarm.webp",
    html: htmlCodeSentry(),
  },
  { id: "kairo", filename: "kairo.webp", html: htmlKairo() },
  { id: "openstage", filename: "openstage.webp", html: htmlOpenStage() },
  {
    id: "vibe-architect",
    filename: "vibe-architect.webp",
    html: htmlVibeArchitect(),
  },
  {
    id: "open-kanban-board",
    filename: "open-kanban-board.webp",
    html: htmlOpenKanban(),
  },
  { id: "cadenza-app", filename: "cadenza-app.webp", html: htmlCadenza() },
  { id: "gdg-ecuador", filename: "gdg-ecuador.webp", html: htmlGDGEcuador() },
  { id: "flights", filename: "flights.webp", html: htmlFlights() },
  { id: "football-data", filename: "football-data.webp", html: htmlFootballData() },
  {
    id: "sign-language-recognition",
    filename: "sign-language-recognition.webp",
    html: htmlSignLanguage(),
  },
  { id: "lbph-face-recognition", filename: "lbph-face-recognition.webp", html: htmlLBPH() },
  { id: "hands-tracking", filename: "hands-tracking.webp", html: htmlHandsTracking() },
  { id: "rag-evals", filename: "rag-evals.webp", html: htmlRagEvals() },
  { id: "ledger-go", filename: "ledger-go.webp", html: htmlLedger() },
  { id: "vecsearch-go", filename: "vecsearch-go.webp", html: htmlVecsearch() },
  {
    id: "football-data-pipeline",
    filename: "football-data-pipeline.webp",
    html: htmlFootballPipeline(),
  },
];

async function generateImages() {
  const projects = FILTER
    ? ALL_PROJECTS.filter((p) => p.id === FILTER)
    : ALL_PROJECTS;

  if (projects.length === 0) {
    console.error(`❌ No project found with id "${FILTER}"`);
    console.log(`   Available: ${ALL_PROJECTS.map((p) => p.id).join(", ")}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("🚀 Launching Chromium…");
  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });

  for (const project of projects) {
    process.stdout.write(`  ⏳ ${project.id}… `);
    await tab.setContent(project.html, { waitUntil: "networkidle" });
    await tab.evaluate(() => document.fonts.ready);
    await tab.waitForTimeout(150);

    const pngBuffer = await tab.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    const outputPath = path.join(OUTPUT_DIR, project.filename);
    await sharp(pngBuffer).webp({ quality: 86 }).toFile(outputPath);

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`✅  ${project.filename} (${sizeKB} KB)`);
  }

  await browser.close();
  console.log("\n✨  All project images generated!");
}

generateImages().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
