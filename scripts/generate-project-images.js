#!/usr/bin/env node

/**
 * generate-project-images.js
 *
 * Generates product-showcase images for portfolio projects.
 * Uses Playwright to render HTML/CSS product cards → PNG → WebP via sharp.
 *
 * Usage:
 *   node scripts/generate-project-images.js          # all projects
 *   node scripts/generate-project-images.js openstage # single project
 */

const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/projects');
const WIDTH = 1200;
const HEIGHT = 675;
const FILTER = process.argv[2] || null;

// ─── HTML Templates ────────────────────────────────────────────────────────

function baseStyles(bg, accent, accent2) {
  return `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: ${bg}; color: #fff; position: relative;
      }
      .dot-grid {
        position: absolute; inset: 0; pointer-events: none;
        background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
        background-size: 30px 30px;
      }
      .glow {
        position: absolute; border-radius: 50%; pointer-events: none;
        filter: blur(90px); opacity: 0.45;
      }
      .layout {
        position: relative; z-index: 1; display: flex;
        align-items: center; height: 100%;
        padding: 52px 64px; gap: 56px;
      }
      .left { flex: 0 0 54%; display: flex; flex-direction: column; gap: 22px; }
      .right { flex: 1; display: flex; align-items: center; justify-content: center; }
      .logo-row { display: flex; align-items: center; gap: 14px; }
      .logo-box {
        width: 56px; height: 56px; border-radius: 14px;
        display: flex; align-items: center; justify-content: center;
        font-size: 26px; flex-shrink: 0;
        background: linear-gradient(135deg, ${accent}, ${accent2});
        box-shadow: 0 0 28px rgba(0,0,0,0.4);
      }
      .project-name { font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${accent}; }
      .title {
        font-size: 48px; font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
        background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.7));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      .subtitle { font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.58); max-width: 480px; }
      .features { display: flex; flex-direction: column; gap: 11px; }
      .feat {
        display: flex; align-items: center; gap: 11px;
        font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 450;
      }
      .feat-icon {
        width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.07); font-size: 14px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 4px; }
      .tag {
        padding: 5px 13px; border-radius: 20px; font-size: 12px; font-weight: 500;
        border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06);
        color: rgba(255,255,255,0.65);
      }
      .tag.accent { background: ${accent}22; border-color: ${accent}55; color: ${accent}; }
      .panel {
        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 18px; overflow: hidden; width: 100%;
      }
      .panel-bar {
        display: flex; align-items: center; gap: 7px; padding: 12px 16px;
        background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
    </style>
  `;
}

// ─── 1. OpenStage ─────────────────────────────────────────────────────────

function htmlOpenStage() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#0D0A1A', '#8B5CF6', '#A855F7')}
  <style>
    .wave-container {
      display: flex; align-items: flex-end; justify-content: center;
      gap: 4px; height: 64px; padding: 0 8px;
    }
    .wave-bar {
      width: 5px; border-radius: 3px;
      background: linear-gradient(to top, #7C3AED, #A855F7);
    }
    .format-btns { display: flex; gap: 8px; padding: 12px 16px; }
    .fmt-btn {
      padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 600;
      border: 1px solid rgba(139,92,246,0.35); background: rgba(139,92,246,0.12);
      color: #A78BFA; cursor: default;
    }
    .fmt-btn.active { background: #7C3AED; border-color: #7C3AED; color: #fff; }
    .timeline-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; font-size: 12px; color: rgba(255,255,255,0.5);
    }
    .clip-badge {
      background: #7C3AED22; border: 1px solid #7C3AED55; border-radius: 6px;
      padding: 4px 10px; font-size: 11px; color: #A78BFA; font-weight: 600;
    }
    .progress-bar {
      height: 3px; background: rgba(255,255,255,0.08); margin: 0 16px 14px;
      border-radius: 2px; overflow: hidden;
    }
    .progress-fill { height: 100%; width: 62%; background: linear-gradient(90deg, #7C3AED, #A855F7); border-radius: 2px; }
    .thumb {
      display: flex; align-items: center; gap: 8px; padding: 10px 14px;
      background: rgba(139,92,246,0.15); margin: 0 12px 12px; border-radius: 10px;
      border: 1px solid rgba(139,92,246,0.25); font-size: 12px; color: rgba(255,255,255,0.8);
    }
    .thumb-icon { font-size: 16px; }
    .thumb-label { font-weight: 600; }
    .thumb-sub { color: rgba(255,255,255,0.45); font-size: 11px; }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:400px;top:-100px;left:-80px;background:radial-gradient(circle, #7C3AED, transparent 70%);"></div>
  <div class="glow" style="width:300px;height:300px;bottom:-80px;right:60px;background:radial-gradient(circle, #A855F7, transparent 70%);opacity:0.25;"></div>

  <div class="layout">
    <div class="left">
      <div class="logo-row">
        <div class="logo-box">🎸</div>
        <span class="project-name">OpenStage</span>
      </div>
      <div class="title">Viral Content<br>for Musicians</div>
      <div class="subtitle">Open-source platform for bands &amp; musicians to generate clips, manage their presence across all social platforms.</div>
      <div class="features">
        <div class="feat"><div class="feat-icon">🎬</div>Browser-based clip generator via FFmpeg WASM</div>
        <div class="feat"><div class="feat-icon">👥</div>Band management with roles &amp; invite codes</div>
        <div class="feat"><div class="feat-icon">📱</div>TikTok, Instagram Reels &amp; YouTube formats</div>
        <div class="feat"><div class="feat-icon">🎙</div>Local audio transcription with Whisper</div>
      </div>
      <div class="tags">
        <span class="tag accent">Next.js 16</span>
        <span class="tag accent">Supabase</span>
        <span class="tag">FFmpeg WASM</span>
        <span class="tag">TypeScript</span>
        <span class="tag">Vercel</span>
      </div>
    </div>

    <div class="right">
      <div class="panel" style="max-width:380px;">
        <div class="panel-bar">
          <div class="dot" style="background:#ff5f57;"></div>
          <div class="dot" style="background:#febc2e;"></div>
          <div class="dot" style="background:#28c840;"></div>
          <span style="font-size:12px;color:rgba(255,255,255,0.4);margin-left:8px;">Clip Generator</span>
        </div>

        <div class="format-btns">
          <div class="fmt-btn active">TikTok 9:16</div>
          <div class="fmt-btn">Instagram</div>
          <div class="fmt-btn">YouTube</div>
        </div>

        <div class="timeline-header">
          <span>Audio Timeline</span>
          <span class="clip-badge">Top 5 moments</span>
        </div>

        <div class="wave-container">
          ${[32,48,22,55,68,40,70,28,64,58,44,72,35,52,60,38,66,30,56,42,75,26,50,62,45,34,58,48,72,36,66,28,54,62,40,70,32,48,60,38].map(h => `<div class="wave-bar" style="height:${h}px;opacity:${0.4 + h/150};"></div>`).join('')}
        </div>

        <div class="progress-bar" style="margin-top:12px;"><div class="progress-fill"></div></div>

        <div class="thumb">
          <div class="thumb-icon">⚡</div>
          <div>
            <div class="thumb-label">moment_05 — 0:42</div>
            <div class="thumb-sub">High energy · 30s clip</div>
          </div>
          <div style="margin-left:auto;background:#7C3AED;border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;">Export</div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 2. VibeArchitect ─────────────────────────────────────────────────────

function htmlVibeArchitect() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#080C14', '#06B6D4', '#10B981')}
  <style>
    .step-row {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: rgba(255,255,255,0.75);
    }
    .step-num {
      width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #06B6D4, #10B981);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; color: #000;
    }
    .arch-cards { display: flex; flex-direction: column; gap: 10px; width: 100%; }
    .arch-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px; padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .arch-card.selected { border-color: #06B6D4; background: rgba(6,182,212,0.08); }
    .arch-radio {
      width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.25);
      flex-shrink: 0;
    }
    .arch-radio.on { border-color: #06B6D4; background: #06B6D4; }
    .arch-name { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.9); }
    .arch-desc { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
    .arch-pros { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
    .pro { font-size: 10px; padding: 2px 8px; border-radius: 4px; background: rgba(16,185,129,0.12); color: #6EE7B7; border: 1px solid rgba(16,185,129,0.2); }
    .gen-progress {
      margin-top: 12px; padding: 12px 16px;
      background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.15);
      border-radius: 12px;
    }
    .gen-bar-bg { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; margin-top: 8px; overflow: hidden; }
    .gen-bar-fill { height: 100%; width: 71%; background: linear-gradient(90deg, #06B6D4, #10B981); border-radius: 3px; }
    .gen-label { font-size: 12px; color: rgba(255,255,255,0.5); display: flex; justify-content: space-between; }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:400px;top:-120px;left:-100px;background:radial-gradient(circle, #06B6D4, transparent 70%);"></div>
  <div class="glow" style="width:350px;height:350px;bottom:-100px;right:30px;background:radial-gradient(circle, #10B981, transparent 70%);opacity:0.3;"></div>

  <div class="layout">
    <div class="left">
      <div class="logo-row">
        <div class="logo-box">🏗</div>
        <span class="project-name">VibeArchitect</span>
      </div>
      <div class="title">AI-First<br>Boilerplate Generator</div>
      <div class="subtitle">Production-ready project boilerplates optimized for AI-assisted development. Multiple architectures, full backend integration.</div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="step-row"><div class="step-num">1</div><span>Describe your project in natural language</span></div>
        <div class="step-row"><div class="step-num">2</div><span>AI proposes 2–4 architecture patterns (MVC, Clean, Hexagonal…)</span></div>
        <div class="step-row"><div class="step-num">3</div><span>Download ~40 production-ready files in seconds</span></div>
      </div>

      <div class="tags">
        <span class="tag accent">FastAPI</span>
        <span class="tag accent">Next.js 15</span>
        <span class="tag">Gemini 2.5</span>
        <span class="tag">Firebase</span>
        <span class="tag">Cloud Run</span>
        <span class="tag">TypeScript</span>
      </div>
    </div>

    <div class="right">
      <div style="width:100%;max-width:370px;display:flex;flex-direction:column;gap:0;">
        <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:10px;letter-spacing:0.08em;text-transform:uppercase;">Select Architecture</div>
        <div class="arch-cards">
          <div class="arch-card selected">
            <div class="arch-radio on"></div>
            <div>
              <div class="arch-name">Clean Architecture</div>
              <div class="arch-desc">Domain, Application, Infrastructure, Presentation layers</div>
              <div class="arch-pros"><span class="pro">Scalable</span><span class="pro">Testable</span><span class="pro">Recommended</span></div>
            </div>
          </div>
          <div class="arch-card">
            <div class="arch-radio"></div>
            <div>
              <div class="arch-name">Feature-Sliced Design</div>
              <div class="arch-desc">Organized by features with shared layers</div>
              <div class="arch-pros"><span class="pro" style="color:#67E8F9;background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.2);">Modern</span><span class="pro" style="color:#67E8F9;background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.2);">Modular</span></div>
            </div>
          </div>
          <div class="arch-card">
            <div class="arch-radio"></div>
            <div>
              <div class="arch-name">MVC Pattern</div>
              <div class="arch-desc">Classic Model-View-Controller structure</div>
            </div>
          </div>
        </div>

        <div class="gen-progress">
          <div class="gen-label"><span>Generating files…</span><span style="color:#06B6D4;font-weight:600;">71%</span></div>
          <div class="gen-bar-bg"><div class="gen-bar-fill"></div></div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 3. OpenKanban Board ──────────────────────────────────────────────────

function htmlOpenKanban() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#0F172A', '#3B82F6', '#60A5FA')}
  <style>
    .kanban-layout {
      position: relative; z-index: 1; display: flex; flex-direction: column;
      align-items: center; height: 100%; padding: 40px 56px 44px; gap: 28px;
    }
    .kanban-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
    .kanban-title { font-size: 38px; font-weight: 800; letter-spacing: -0.02em; }
    .kanban-badges { display: flex; gap: 10px; }
    .kanban-badge {
      padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
      background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.35); color: #93C5FD;
    }
    .kanban-sub { font-size: 16px; color: rgba(255,255,255,0.5); text-align: center; }
    .board { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; width: 100%; }
    .col { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 14px; }
    .col-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
    .col-count {
      width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
    }
    .card {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px; padding: 12px; margin-bottom: 9px; cursor: default;
      border-left: 3px solid;
    }
    .card-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 5px; }
    .card-tags { display: flex; gap: 5px; flex-wrap: wrap; }
    .card-tag { font-size: 10px; padding: 2px 7px; border-radius: 4px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.5); }
    .rt-indicator {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; color: #4ADE80;
    }
    .rt-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:600px;height:400px;top:-150px;left:50%;transform:translateX(-50%);background:radial-gradient(circle, #1E40AF, transparent 70%);"></div>

  <div class="kanban-layout">
    <div class="kanban-header">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#3B82F6,#60A5FA);display:flex;align-items:center;justify-content:center;font-size:22px;">📋</div>
        <div class="kanban-title">OpenKanban</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;">
        <div class="rt-indicator"><div class="rt-dot"></div>Realtime sync</div>
        <div class="kanban-badge">Firebase</div>
        <div class="kanban-badge">PWA</div>
        <div class="kanban-badge">Open Source</div>
      </div>
    </div>

    <div class="board">
      <div class="col">
        <div class="col-header">
          <div class="col-title" style="color:#94A3B8;">To Do</div>
          <div class="col-count">3</div>
        </div>
        <div class="card" style="border-left-color:#64748B;">
          <div class="card-title">Design onboarding flow</div>
          <div class="card-tags"><span class="card-tag">UX</span><span class="card-tag">Design</span></div>
        </div>
        <div class="card" style="border-left-color:#64748B;">
          <div class="card-title">API rate limiting</div>
          <div class="card-tags"><span class="card-tag">Backend</span></div>
        </div>
        <div class="card" style="border-left-color:#64748B;">
          <div class="card-title">Write unit tests</div>
          <div class="card-tags"><span class="card-tag">Testing</span></div>
        </div>
      </div>

      <div class="col" style="border-color:rgba(59,130,246,0.25);background:rgba(59,130,246,0.04);">
        <div class="col-header">
          <div class="col-title" style="color:#60A5FA;">In Progress</div>
          <div class="col-count" style="background:rgba(59,130,246,0.2);color:#93C5FD;">2</div>
        </div>
        <div class="card" style="border-left-color:#3B82F6;background:rgba(59,130,246,0.08);">
          <div class="card-title">Drag &amp; drop tasks</div>
          <div class="card-tags"><span class="card-tag" style="color:#93C5FD;background:rgba(59,130,246,0.15);">Feature</span><span class="card-tag">Frontend</span></div>
        </div>
        <div class="card" style="border-left-color:#3B82F6;background:rgba(59,130,246,0.08);">
          <div class="card-title">Multi-project support</div>
          <div class="card-tags"><span class="card-tag" style="color:#93C5FD;background:rgba(59,130,246,0.15);">Core</span></div>
        </div>
      </div>

      <div class="col">
        <div class="col-header">
          <div class="col-title" style="color:#4ADE80;">Done</div>
          <div class="col-count" style="background:rgba(74,222,128,0.15);color:#4ADE80;">4</div>
        </div>
        <div class="card" style="border-left-color:#16A34A;">
          <div class="card-title">Firebase integration</div>
          <div class="card-tags"><span class="card-tag">Backend</span></div>
        </div>
        <div class="card" style="border-left-color:#16A34A;">
          <div class="card-title">Auth with Google</div>
          <div class="card-tags"><span class="card-tag">Auth</span></div>
        </div>
        <div class="card" style="border-left-color:#16A34A;">
          <div class="card-title">PWA offline support</div>
          <div class="card-tags"><span class="card-tag">PWA</span></div>
        </div>
      </div>
    </div>

    <div class="tags" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
      <span class="tag accent">Next.js</span>
      <span class="tag accent">Firestore</span>
      <span class="tag">TypeScript</span>
      <span class="tag">Tailwind</span>
      <span class="tag">Vercel</span>
    </div>
  </div>
</body></html>`;
}

// ─── 4. Cadenza App ───────────────────────────────────────────────────────

function htmlCadenza() {
  const whiteKeys = [
    { note: 'C', x: 0 }, { note: 'D', x: 50 }, { note: 'E', x: 100 },
    { note: 'F', x: 150 }, { note: 'G', x: 200 }, { note: 'A', x: 250 }, { note: 'B', x: 300 },
    { note: 'C', x: 350 },
  ];
  const blackKeys = [
    { x: 34 }, { x: 84 }, { x: 184 }, { x: 234 }, { x: 284 },
  ];
  const activeWhite = ['A', 'C', 'E', 'G'];

  const whiteKeysHTML = whiteKeys.map(k => `
    <rect x="${k.x}" y="0" width="46" height="130" rx="4"
      fill="${activeWhite.includes(k.note) ? '#A855F7' : 'rgba(255,255,255,0.92)'}"
      stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <text x="${k.x + 23}" y="118" text-anchor="middle" fill="${activeWhite.includes(k.note) ? '#fff' : '#333'}"
      font-size="11" font-weight="600" font-family="-apple-system,sans-serif">${k.note}</text>
  `).join('');

  const blackKeysHTML = blackKeys.map(k => `
    <rect x="${k.x}" y="0" width="32" height="84" rx="3" fill="rgba(10,10,20,0.92)" stroke="rgba(0,0,0,0.5)" stroke-width="1"/>
  `).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#0D0A1A', '#A855F7', '#EC4899')}
  <style>
    .tool-card {
      display: flex; align-items: center; gap: 12px; padding: 12px 14px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
    }
    .tool-card.active { background: rgba(168,85,247,0.12); border-color: rgba(168,85,247,0.3); }
    .tool-icon { font-size: 20px; }
    .tool-name { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); }
    .tool-desc { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
    .chord-badge {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #A855F7, #EC4899);
      padding: 8px 20px; border-radius: 10px; font-size: 24px; font-weight: 800;
      box-shadow: 0 8px 28px rgba(168,85,247,0.5); white-space: nowrap;
    }
    .chord-sub { font-size: 11px; font-weight: 500; margin-top: 2px; opacity: 0.8; }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:400px;top:-120px;left:-80px;background:radial-gradient(circle, #7C3AED, transparent 70%);opacity:0.4;"></div>
  <div class="glow" style="width:300px;height:300px;bottom:-60px;right:40px;background:radial-gradient(circle, #EC4899, transparent 70%);opacity:0.25;"></div>

  <div class="layout">
    <div class="left">
      <div class="logo-row">
        <div class="logo-box">🎵</div>
        <span class="project-name">Cadenza</span>
      </div>
      <div class="title">Musical Tools<br>Suite</div>
      <div class="subtitle">Free, interactive tools designed by musicians to explore chords, scales, and bring your musical ideas to life.</div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="tool-card active">
          <div class="tool-icon">🎹</div>
          <div><div class="tool-name">Chord Finder</div><div class="tool-desc">Identify any chord from notes on the keyboard</div></div>
        </div>
        <div class="tool-card">
          <div class="tool-icon">🎼</div>
          <div><div class="tool-name">Scale Explorer</div><div class="tool-desc">Browse modes, pentatonics, exotic scales</div></div>
        </div>
        <div class="tool-card">
          <div class="tool-icon">🎸</div>
          <div><div class="tool-name">Pitch Detection</div><div class="tool-desc">Real-time note recognition from microphone</div></div>
        </div>
      </div>

      <div class="tags">
        <span class="tag accent">Next.js</span>
        <span class="tag accent">Radix UI</span>
        <span class="tag">TypeScript</span>
        <span class="tag">Web Audio API</span>
        <span class="tag">Vercel</span>
      </div>
    </div>

    <div class="right">
      <div style="display:flex;flex-direction:column;align-items:center;gap:24px;width:100%;">
        <div style="position:relative;padding-top:28px;">
          <div class="chord-badge">
            Am7
            <div class="chord-sub">A Minor 7th</div>
          </div>
          <svg width="396" height="132" viewBox="0 0 396 132" style="display:block;">
            ${whiteKeysHTML}
            ${blackKeysHTML}
          </svg>
        </div>

        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(168,85,247,0.2);border-radius:12px;padding:14px 18px;width:100%;max-width:396px;">
          <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:8px;letter-spacing:0.08em;text-transform:uppercase;">Notes in Am7</div>
          <div style="display:flex;gap:8px;">
            ${['A','C','E','G'].map(n => `<div style="flex:1;text-align:center;background:rgba(168,85,247,0.2);border:1px solid rgba(168,85,247,0.35);border-radius:8px;padding:8px 0;font-size:18px;font-weight:700;color:#D8B4FE;">${n}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 5. GDG Ecuador ───────────────────────────────────────────────────────

function htmlGDGEcuador() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#111827', '#4285F4', '#34A853')}
  <style>
    .gdg-dot { width: 18px; height: 18px; border-radius: 50%; }
    .event-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 14px; padding: 16px; flex: 1;
    }
    .event-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      margin-bottom: 8px;
    }
    .event-title { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 6px; line-height: 1.3; }
    .event-meta { font-size: 11px; color: rgba(255,255,255,0.45); }
    .event-chip {
      display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px;
      border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 8px;
    }
    .stat-item { text-align: center; }
    .stat-num { font-size: 32px; font-weight: 800; }
    .stat-label { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 2px; }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:350px;top:-80px;left:-80px;background:radial-gradient(circle, #1A3A6B, transparent 70%);opacity:0.6;"></div>
  <div class="glow" style="width:350px;height:350px;bottom:-100px;right:40px;background:radial-gradient(circle, #1A4A28, transparent 70%);opacity:0.4;"></div>

  <div class="layout">
    <div class="left">
      <div class="logo-row">
        <div style="display:flex;gap:5px;flex-wrap:wrap;width:56px;height:56px;align-content:center;justify-content:center;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="gdg-dot" style="background:#4285F4;"></div>
          <div class="gdg-dot" style="background:#EA4335;"></div>
          <div class="gdg-dot" style="background:#FBBC04;"></div>
          <div class="gdg-dot" style="background:#34A853;"></div>
        </div>
        <span class="project-name" style="color:#4285F4;">GDG Ecuador</span>
      </div>
      <div class="title">Official Events<br>Hub for Ecuador</div>
      <div class="subtitle">The central platform for Google Developer Groups events across Ecuador — talks, workshops, DevFests &amp; more.</div>

      <div style="display:flex;gap:24px;padding:18px 0;border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07);">
        <div class="stat-item">
          <div class="stat-num" style="background:linear-gradient(135deg,#4285F4,#34A853);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">12+</div>
          <div class="stat-label">Events / Year</div>
        </div>
        <div class="stat-item">
          <div class="stat-num" style="background:linear-gradient(135deg,#EA4335,#FBBC04);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">500+</div>
          <div class="stat-label">Attendees</div>
        </div>
        <div class="stat-item">
          <div class="stat-num" style="background:linear-gradient(135deg,#34A853,#4285F4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">4</div>
          <div class="stat-label">Cities</div>
        </div>
      </div>

      <div class="tags">
        <span class="tag" style="background:rgba(66,133,244,0.15);border-color:rgba(66,133,244,0.35);color:#93C5FD;">Next.js</span>
        <span class="tag" style="background:rgba(52,168,83,0.15);border-color:rgba(52,168,83,0.35);color:#86EFAC;">TypeScript</span>
        <span class="tag">i18n</span>
        <span class="tag">Tailwind</span>
        <span class="tag">Vercel</span>
      </div>
    </div>

    <div class="right">
      <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:380px;">
        <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2px;">Upcoming Events</div>

        <div class="event-card">
          <div class="event-label" style="color:#4285F4;">★ Featured</div>
          <div class="event-title">DevFest Ecuador 2025</div>
          <div class="event-meta">🗓 Oct 18, 2025 · 📍 Quito, Ecuador</div>
          <div style="display:flex;gap:6px;margin-top:10px;">
            <span class="event-chip" style="background:rgba(66,133,244,0.15);border:1px solid rgba(66,133,244,0.3);color:#93C5FD;">Android</span>
            <span class="event-chip" style="background:rgba(52,168,83,0.15);border:1px solid rgba(52,168,83,0.3);color:#86EFAC;">Cloud</span>
            <span class="event-chip" style="background:rgba(251,188,4,0.15);border:1px solid rgba(251,188,4,0.3);color:#FDE68A;">AI/ML</span>
          </div>
        </div>

        <div style="display:flex;gap:10px;">
          <div class="event-card">
            <div class="event-label" style="color:#EA4335;">AI</div>
            <div class="event-title" style="font-size:13px;">Build with AI 2025</div>
            <div class="event-meta">🗓 Jun 2025</div>
            <span class="event-chip" style="background:rgba(234,67,53,0.15);border:1px solid rgba(234,67,53,0.3);color:#FCA5A5;">Gemini</span>
          </div>
          <div class="event-card">
            <div class="event-label" style="color:#34A853;">Study Jam</div>
            <div class="event-title" style="font-size:13px;">Cloud Study Jam</div>
            <div class="event-meta">🗓 Ongoing</div>
            <span class="event-chip" style="background:rgba(52,168,83,0.15);border:1px solid rgba(52,168,83,0.3);color:#86EFAC;">GCP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── 6. Flights ───────────────────────────────────────────────────────────

function htmlFlights() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  ${baseStyles('#0D1B2A', '#14B8A6', '#06B6D4')}
  <style>
    .metric-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 14px; padding: 18px 18px 16px; flex: 1;
    }
    .metric-icon { font-size: 22px; margin-bottom: 10px; }
    .metric-val { font-size: 28px; font-weight: 800; line-height: 1; }
    .metric-label { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 4px; }
    .metric-delta {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 3px 8px;
      border-radius: 6px; margin-top: 8px;
    }
    .flight-row {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 14px; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
    }
    .route { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.9); }
    .route-sep { color: #14B8A6; font-size: 18px; }
    .flight-detail { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
    .co2-pill {
      margin-left: auto; padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 700;
      background: rgba(20,184,166,0.15); border: 1px solid rgba(20,184,166,0.3); color: #5EEAD4;
    }
  </style>
</head><body>
  <div class="dot-grid"></div>
  <div class="glow" style="width:500px;height:400px;top:-100px;left:-80px;background:radial-gradient(circle, #0F4C5C, transparent 70%);opacity:0.7;"></div>
  <div class="glow" style="width:350px;height:350px;bottom:-100px;right:40px;background:radial-gradient(circle, #14B8A6, transparent 70%);opacity:0.2;"></div>

  <div class="layout">
    <div class="left">
      <div class="logo-row">
        <div class="logo-box">✈</div>
        <span class="project-name" style="color:#14B8A6;">Flights</span>
      </div>
      <div class="title">CO₂ &amp; Fuel<br>Flight Analytics</div>
      <div class="subtitle">Improved calculations of CO₂ emissions and fuel consumption for real commercial flights, with search, filtering and live metrics.</div>

      <div class="features">
        <div class="feat"><div class="feat-icon">🌿</div>Precise CO₂ emission estimates per flight</div>
        <div class="feat"><div class="feat-icon">⛽</div>Fuel consumption analysis by aircraft model</div>
        <div class="feat"><div class="feat-icon">🔍</div>Filter by airport, aircraft &amp; date range</div>
        <div class="feat"><div class="feat-icon">📊</div>Real-time dashboard with summary metrics</div>
      </div>

      <div class="tags">
        <span class="tag accent">Next.js</span>
        <span class="tag accent">FastAPI</span>
        <span class="tag">Python</span>
        <span class="tag">Supabase</span>
        <span class="tag">Tailwind</span>
        <span class="tag">Radix UI</span>
      </div>
    </div>

    <div class="right">
      <div style="display:flex;flex-direction:column;gap:14px;width:100%;max-width:390px;">
        <div style="display:flex;gap:10px;">
          <div class="metric-card">
            <div class="metric-icon">🌿</div>
            <div class="metric-val" style="background:linear-gradient(135deg,#14B8A6,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">12.4t</div>
            <div class="metric-label">Total CO₂</div>
            <div class="metric-delta" style="background:rgba(74,222,128,0.1);color:#4ADE80;">↑ Tracked</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">⛽</div>
            <div class="metric-val" style="background:linear-gradient(135deg,#06B6D4,#38BDF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">4,892</div>
            <div class="metric-label">Fuel (liters)</div>
            <div class="metric-delta" style="background:rgba(56,189,248,0.1);color:#38BDF8;">Total</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">✈️</div>
            <div class="metric-val" style="background:linear-gradient(135deg,#A78BFA,#818CF8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">247</div>
            <div class="metric-label">Flights</div>
            <div class="metric-delta" style="background:rgba(167,139,250,0.1);color:#A78BFA;">Indexed</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:9px;">
          <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2px;">Recent Flights</div>
          <div class="flight-row">
            <div>
              <div style="display:flex;align-items:center;gap:6px;" class="route">
                <span>UIO</span><span class="route-sep">→</span><span>JFK</span>
              </div>
              <div class="flight-detail">Boeing 767 · 5h 30m</div>
            </div>
            <div class="co2-pill">2.14t CO₂</div>
          </div>
          <div class="flight-row">
            <div>
              <div style="display:flex;align-items:center;gap:6px;" class="route">
                <span>GYE</span><span class="route-sep">→</span><span>MIA</span>
              </div>
              <div class="flight-detail">Airbus A320 · 4h 10m</div>
            </div>
            <div class="co2-pill">1.87t CO₂</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body></html>`;
}

// ─── Runner ────────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
  { id: 'openstage',        filename: 'openstage.webp',        html: htmlOpenStage() },
  { id: 'vibe-architect',   filename: 'vibe-architect.webp',   html: htmlVibeArchitect() },
  { id: 'open-kanban-board',filename: 'open-kanban-board.webp',html: htmlOpenKanban() },
  { id: 'cadenza-app',      filename: 'cadenza-app.webp',      html: htmlCadenza() },
  { id: 'gdg-ecuador',      filename: 'gdg-ecuador.webp',      html: htmlGDGEcuador() },
  { id: 'flights',          filename: 'flights.webp',          html: htmlFlights() },
];

async function generateImages() {
  const projects = FILTER
    ? ALL_PROJECTS.filter(p => p.id === FILTER)
    : ALL_PROJECTS;

  if (projects.length === 0) {
    console.error(`❌ No project found with id "${FILTER}"`);
    console.log(`   Available: ${ALL_PROJECTS.map(p => p.id).join(', ')}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`🚀 Launching Chromium…`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  for (const project of projects) {
    process.stdout.write(`  ⏳ ${project.id}… `);
    await page.setContent(project.html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    const pngBuffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    const outputPath = path.join(OUTPUT_DIR, project.filename);
    await sharp(pngBuffer)
      .webp({ quality: 90 })
      .toFile(outputPath);

    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`✅  ${project.filename} (${sizeKB} KB)`);
  }

  await browser.close();
  console.log('\n✨  All project images generated!');
}

generateImages().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
