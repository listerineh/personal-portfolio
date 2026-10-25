/**
 * The blog cover kit: a Lumen still life. Every cover is a short two-tone phrase and a few objects from the post's
 * world (a window, code, a terminal, a quote, a diagram) laid out as rounded Lumen panels on a plain or night ground.
 * Covers are 1536×1024 (3:2); cards crop them to 16:9, 16:10 and 4:3, so everything that matters stays inside the
 * central safe zone (x 15–85%, y 8–92%).
 */

const fs = require("fs");
const path = require("path");

const W = 1536;
const H = 1024;

// ─── Themes ────────────────────────────────────────────────────────────────

const THEMES = {
  light: {
    vars: "--bg:#FFFFFF;--ink:#1D1D1F;--muted:#6E6E73;--panel:#F5F5F7;--raised:#FFFFFF;--fill:#E8E8ED;--line:#D2D2D7;--amber-ink:#A84B0A;--code-bg:#FFFFFF;--term:#1D1D1F;--term-ink:#F5F5F7;--term-muted:#A1A1A6;",
    halo: 0.3,
    grid: "rgba(29,29,31,0.09)",
    shadow: "0 1px 2px rgba(0,0,0,0.05), 0 28px 64px -24px rgba(0,0,0,0.22)",
  },
  dark: {
    vars: "--bg:#000000;--ink:#F5F5F7;--muted:#A1A1A6;--panel:#1C1C1E;--raised:#242426;--fill:#2C2C2E;--line:#38383A;--amber-ink:#E8890C;--code-bg:#141415;--term:#0A0A0B;--term-ink:#F5F5F7;--term-muted:#8E8E93;",
    halo: 0.3,
    grid: "rgba(255,255,255,0.10)",
    shadow: "0 1px 2px rgba(0,0,0,0.5), 0 32px 72px -24px rgba(0,0,0,0.85)",
  },
};

// ─── Icons (lucide, the same set the site uses) ────────────────────────────

const ICONS = path.join(
  __dirname,
  "../../node_modules/lucide-react/dist/esm/icons",
);

function icon(name, size = 28, stroke = "currentColor") {
  const source = fs.readFileSync(path.join(ICONS, `${name}.js`), "utf8");
  const node = source.match(/const __iconNode = (\[[\s\S]*?\]);\n/)[1];
  // The icon node is plain data: [tag, attributes] pairs.
  const parts = Function(`return ${node}`)();
  const body = parts
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .filter(([k]) => k !== "key")
          .map(([k, v]) => `${k}="${v}"`)
          .join(" ")}/>`,
    )
    .join("");
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

// ─── Placement ─────────────────────────────────────────────────────────────

/** Absolute placement for an object: x, y, width, optional height, rotation and stacking. */
const at = ({ x, y, w, h, rot = 0, z = 1 }) =>
  `left:${x}px;top:${y}px;width:${w}px;${h ? `height:${h}px;` : ""}transform:rotate(${rot}deg);z-index:${z};`;

const esc = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// ─── Objects ───────────────────────────────────────────────────────────────

/** An app window with traffic lights and a title; `body` is any HTML. */
function window({ title, body, tone = "raised", ...box }) {
  return `<div class="panel win" style="${at(box)}background:var(--${tone})">
    <div class="bar"><span class="lights"><i></i><i></i><i></i></span><span class="wtitle">${esc(title)}</span></div>
    <div class="wbody">${body}</div></div>`;
}

/**
 * Code with restrained highlighting. Each line is a string where `{k:…}` marks a keyword, `{s:…}` a string,
 * `{c:…}` a comment and `{a:…}` an accent (amber).
 */
function code({ title, lines, ...box }) {
  const tokens = (line) =>
    esc(line).replace(
      /\{([ksca]):(.*?)\}/g,
      (_, kind, text) => `<span class="t${kind}">${text}</span>`,
    );
  const body = `<pre class="code">${lines.map((line) => `<span class="ln">${tokens(line) || " "}</span>`).join("\n")}</pre>`;
  return title
    ? window({ title, body, tone: "code-bg", ...box })
    : `<div class="panel pad" style="${at(box)}background:var(--code-bg)">${body}</div>`;
}

/** A terminal: `$ ` lines are commands, the rest output; `{a:…}` highlights. */
function terminal({ lines, ...box }) {
  const row = (line) => {
    const html = esc(line).replace(
      /\{a:(.*?)\}/g,
      '<span class="ta">$1</span>',
    );
    return line.startsWith("$ ")
      ? `<span class="cmd">${html}</span>`
      : `<span class="out">${html}</span>`;
  };
  return `<div class="panel term" style="${at(box)}">
    <div class="bar"><span class="lights"><i></i><i></i><i></i></span></div>
    <pre>${lines.map(row).join("\n")}</pre></div>`;
}

/** A quote card. */
function quote({ text, who, ...box }) {
  return `<div class="panel pad quote" style="${at(box)}"><p>“${esc(text)}”</p>${who ? `<span class="label">${esc(who)}</span>` : ""}</div>`;
}

/** A labelled list; `done` items get a check, `active` one is highlighted. */
function list({ title, items, ...box }) {
  const rows = items
    .map((item) => {
      const { text, state } = typeof item === "string" ? { text: item } : item;
      const mark =
        state === "done"
          ? icon("check", 18)
          : state === "warn"
            ? icon("triangle-alert", 18)
            : "";
      return `<div class="li ${state ?? ""}"><span class="mark">${mark}</span><span>${esc(text)}</span></div>`;
    })
    .join("");
  return `<div class="panel pad" style="${at(box)}">${title ? `<span class="label">${esc(title)}</span>` : ""}<div class="lst">${rows}</div></div>`;
}

/** A row of chips; `on` chips use the accent. */
function chips({ items, ...box }) {
  return `<div class="chips" style="${at(box)}">${items
    .map((item) => {
      const {
        text,
        on,
        icon: name,
      } = typeof item === "string" ? { text: item } : item;
      return `<span class="chip${on ? " on" : ""}">${name ? icon(name, 18) : ""}${esc(text)}</span>`;
    })
    .join("")}</div>`;
}

/** A notice: an icon in a soft disc, a title and a line. */
function notice({ icon: name, title, body, tone = "amber", ...box }) {
  return `<div class="panel pad row notice ${tone}" style="${at(box)}"><span class="disc">${icon(name, 26)}</span>
    <span class="ncopy"><b>${esc(title)}</b>${body ? `<span>${esc(body)}</span>` : ""}</span></div>`;
}

/** A small node diagram drawn in SVG: nodes {id, x, y, label, on}, edges [from, to, dashed?]. Coordinates are local. */
function diagram({ nodes, edges, ...box }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const lines = edges
    .map(([a, b, dashed]) => {
      const p = byId[a],
        q = byId[b];
      return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="var(--line)" stroke-width="2.5" ${dashed ? 'stroke-dasharray="8 8"' : ""}/>`;
    })
    .join("");
  const dots = nodes
    .map(
      (
        n,
      ) => `<g><rect x="${n.x - n.label.length * 5.4 - 22}" y="${n.y - 24}" width="${n.label.length * 10.8 + 44}" height="48" rx="24" fill="${n.on ? "var(--amber)" : "var(--raised)"}" stroke="${n.on ? "none" : "var(--line)"}"/>
      <text x="${n.x}" y="${n.y + 6}" text-anchor="middle" font-size="18" font-weight="600" fill="${n.on ? "#1D1D1F" : "var(--ink)"}">${esc(n.label)}</text></g>`,
    )
    .join("");
  return `<div class="panel" style="${at(box)}"><svg width="100%" height="100%" viewBox="0 0 ${box.w} ${box.h}">${lines}${dots}</svg></div>`;
}

/** A signal trace (a heartbeat, a waveform) with an optional disrupted stretch drawn in the accent. */
function signal({ label, value, glitch = false, ...box }) {
  const w = box.w - 60;
  let d = "M0 60";
  for (let x = 0; x <= w; x += 6) {
    const beat = x % 150;
    const y =
      beat > 60 && beat < 72
        ? 60 - (beat - 60) * 6
        : beat >= 72 && beat < 84
          ? -12 + (beat - 72) * 9
          : 60 + Math.sin(x / 9) * 3;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  const g = glitch
    ? `<path d="M${w * 0.62} 60 L${w * 0.65} 8 L${w * 0.68} 104 L${w * 0.71} 20 L${w * 0.74} 92 L${w * 0.77} 52 L${w * 0.8} 60" fill="none" stroke="var(--amber)" stroke-width="4" stroke-linejoin="round"/>`
    : "";
  return `<div class="panel pad" style="${at(box)}"><div class="row between"><span class="label">${esc(label)}</span>${value ? `<span class="label strong">${esc(value)}</span>` : ""}</div>
    <svg width="${w}" height="120" viewBox="-4 -16 ${w + 8} 136" style="margin-top:14px;overflow:visible"><path d="${d}" fill="none" stroke="var(--muted)" stroke-width="3" stroke-linejoin="round"/>${g}</svg></div>`;
}

/** A grid of small person dots, some highlighted: people behind a product or a team. */
function people({ count = 60, cols = 12, on = [], ...box }) {
  const dots = Array.from(
    { length: count },
    (_, i) => `<i class="${on.includes(i) ? "on" : ""}"></i>`,
  ).join("");
  return `<div class="panel pad people" style="${at(box)}grid-template-columns:repeat(${cols},1fr)">${dots}</div>`;
}

/** A big label of the post's world, set in Geist Mono (a file name, a version, a command). */
function tag({ text, ...box }) {
  return `<div class="panel tagp" style="${at(box)}">${esc(text)}</div>`;
}

/** A kanban board: columns {title, limit?, cards: [text or {text, on}]}. */
function kanban({ columns, ...box }) {
  const cols = columns
    .map((col) => {
      const cards = col.cards
        .map((card) => {
          const { text, on } = typeof card === "string" ? { text: card } : card;
          return `<div class="kcard${on ? " on" : ""}">${esc(text)}</div>`;
        })
        .join("");
      return `<div class="kcol"><div class="row between"><span class="label strong2">${esc(col.title)}</span>${col.limit ? `<span class="klimit">${esc(col.limit)}</span>` : ""}</div>${cards}</div>`;
    })
    .join("");
  return `<div class="panel pad kanban" style="${at(box)}grid-template-columns:repeat(${columns.length},1fr)">${cols}</div>`;
}

/** A bar chart: values 0–1, the `spike` index drawn in the accent. */
function bars({ label, values, spike, ...box }) {
  const cols = values
    .map(
      (v, i) =>
        `<i style="height:${Math.round(v * 100)}%;${i === spike ? "background:var(--amber)" : ""}"></i>`,
    )
    .join("");
  return `<div class="panel pad" style="${at(box)}"><span class="label">${esc(label)}</span><div class="bars">${cols}</div></div>`;
}

/** An icon in a large soft disc. */
function badge({ icon: name, ...box }) {
  return `<div class="badge" style="${at(box)}">${icon(name, Math.round(box.w * 0.42))}</div>`;
}

// ─── The frame ─────────────────────────────────────────────────────────────

/** A whole cover: theme, the two-tone phrase (first line ink, second muted) and the objects. */
function cover({ theme, phrase, objects, halo = "right" }) {
  const t = THEMES[theme];
  const [first, second] = phrase;
  const haloPos =
    halo === "right" ? "top:-560px;right:-340px" : "top:-560px;left:-200px";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { ${t.vars} --amber: #D97706; --amber-soft: rgba(217,119,6,${theme === "dark" ? 0.2 : 0.14}); }
  body { width: ${W}px; height: ${H}px; overflow: hidden; position: relative; background: var(--bg); color: var(--ink);
    font-family: 'Geist', system-ui, sans-serif; letter-spacing: -0.01em; -webkit-font-smoothing: antialiased; }
  .halo { position: absolute; border-radius: 50%; pointer-events: none; }
  .halo.a { width: 1180px; height: 1180px; ${haloPos}; background: radial-gradient(closest-side, rgba(217,119,6,${t.halo}), transparent); }
  .halo.b { width: 900px; height: 900px; bottom: -560px; left: 120px; background: radial-gradient(closest-side, rgba(245,158,11,${t.halo * 0.5}), transparent); }
  .grid { position: absolute; inset: 0; background-image: radial-gradient(${t.grid} 1.2px, transparent 1.4px); background-size: 30px 30px;
    -webkit-mask-image: radial-gradient(ellipse 60% 64% at 62% 46%, #000 18%, transparent 76%); }
  .phrase { position: absolute; left: 388px; bottom: 136px; width: 760px; z-index: 20; font-size: 84px; line-height: 0.98; font-weight: 700; letter-spacing: -0.048em; }
  .phrase .m { display: block; color: var(--muted); }
  .stage { position: absolute; inset: 0; }
  .stage > * { position: absolute; }
  .panel { background: var(--panel); border-radius: 30px; box-shadow: ${t.shadow}; overflow: hidden; }
  .pad { padding: 30px 34px; }
  .row { display: flex; align-items: center; gap: 16px; } .between { justify-content: space-between; }
  .label { font-size: 17px; font-weight: 500; color: var(--muted); } .label.strong { color: var(--amber-ink); font-weight: 600; }
  .win .bar, .term .bar { height: 54px; display: flex; align-items: center; gap: 16px; padding: 0 22px; border-bottom: 1px solid var(--line); }
  .lights { display: flex; gap: 9px; } .lights i { width: 13px; height: 13px; border-radius: 50%; background: var(--line); display: block; }
  .wtitle { font-size: 16px; font-weight: 500; color: var(--muted); }
  .wbody { position: relative; height: calc(100% - 54px); }
  pre { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 22px; line-height: 1.65; white-space: pre; }
  .code { padding: 26px 30px; color: var(--ink); }
  .tk { color: var(--amber-ink); font-weight: 500; } .ts { color: var(--ink); } .tc { color: var(--muted); } .ta { color: var(--amber); }
  .term { background: var(--term); } .term .bar { border-color: rgba(255,255,255,0.08); } .term .lights i { background: rgba(255,255,255,0.18); }
  .term pre { padding: 24px 30px; color: var(--term-muted); } .term .cmd { color: var(--term-ink); }
  .quote p { font-size: 30px; line-height: 1.25; font-weight: 600; letter-spacing: -0.03em; } .quote .label { display: block; margin-top: 18px; }
  .lst { display: grid; gap: 12px; margin-top: 16px; } .li { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 500; padding: 10px 14px; border-radius: 14px; }
  .li .mark { width: 26px; height: 26px; border-radius: 50%; background: var(--fill); display: grid; place-items: center; color: var(--muted); flex: none; }
  .li.done .mark { background: var(--amber-soft); color: var(--amber-ink); } .li.active { background: var(--fill); } .li.warn .mark { background: var(--amber); color: #1D1D1F; }
  .chips { display: flex; flex-wrap: wrap; gap: 12px; } .chip { display: inline-flex; align-items: center; gap: 10px; height: 48px; padding: 0 22px; border-radius: 999px; background: var(--raised); box-shadow: ${t.shadow}; font-size: 19px; font-weight: 600; }
  .chip.on { background: var(--amber); color: #1D1D1F; }
  .notice { gap: 20px; } .disc { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; flex: none; background: var(--amber-soft); color: var(--amber-ink); }
  .ncopy { display: grid; gap: 4px; } .ncopy b { font-size: 21px; font-weight: 650; letter-spacing: -0.02em; } .ncopy span { font-size: 17px; color: var(--muted); }
  .people { display: grid; gap: 14px; } .people i { width: 22px; height: 22px; border-radius: 50%; background: var(--fill); display: block; } .people i.on { background: var(--amber); }
  .tagp { padding: 22px 30px; font-family: 'Geist Mono', monospace; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; background: var(--raised); }
  .badge { border-radius: 50%; display: grid; place-items: center; background: var(--raised); box-shadow: ${t.shadow}; color: var(--amber-ink); aspect-ratio: 1; }
  .kanban { display: grid; gap: 18px; } .kcol { display: grid; gap: 12px; align-content: start; } .label.strong2 { color: var(--ink); font-weight: 600; }
  .klimit { font-size: 14px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: var(--amber-soft); color: var(--amber-ink); }
  .kcard { padding: 16px 18px; border-radius: 16px; background: var(--raised); font-size: 18px; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
  .kcard.on { outline: 2px solid var(--amber); }
  .bars { display: flex; align-items: flex-end; gap: 10px; height: 170px; margin-top: 18px; } .bars i { flex: 1; border-radius: 8px 8px 4px 4px; background: var(--fill); display: block; }
  .bubble { padding: 16px 20px; border-radius: 22px; font-size: 19px; line-height: 1.4; max-width: 82%; }
  .bubble.me { background: var(--amber-soft); color: var(--ink); justify-self: end; border-bottom-right-radius: 8px; } .bubble.ai { background: var(--fill); border-bottom-left-radius: 8px; }
  .ghost { border: 2px dashed var(--amber); background: transparent !important; box-shadow: none !important; }
</style></head><body>
  <span class="halo a"></span><span class="halo b"></span><span class="grid"></span>
  <div class="stage">${objects.join("")}</div>
  <h1 class="phrase">${esc(first)}${second ? `<span class="m">${esc(second)}</span>` : ""}</h1>
</body></html>`;
}

module.exports = {
  W,
  H,
  cover,
  window,
  code,
  terminal,
  quote,
  list,
  chips,
  notice,
  diagram,
  signal,
  people,
  tag,
  badge,
  kanban,
  bars,
  icon,
  esc,
};
