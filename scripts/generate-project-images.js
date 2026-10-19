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

// ─── Runner ────────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
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
