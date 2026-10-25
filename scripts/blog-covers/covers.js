/**
 * One cover per post: its theme (light for practical guides, dark for human and serious topics), a short phrase in
 * each language (not the title: the page already shows it) and the objects from the post's world, given the cover's
 * language. The phrase sits bottom left; objects fill the top band and the bottom right. See kit.js for the objects.
 */

const k = require("./kit");

/** The cover's language picks the string: t(lang, english, spanish). */
const t = (lang, en, es) => (lang === "es" ? es : en);

const editorBody = (lang) => `<div style="display:flex;height:100%">
  <div style="width:62px;border-right:1px solid var(--line);display:grid;align-content:start;gap:18px;padding:20px 0;justify-items:center;color:var(--muted)">
    ${["brush", "eraser", "pipette", "type", "crop"].map((n) => k.icon(n, 22)).join("")}</div>
  <div style="flex:1;display:grid;place-items:center;background:var(--fill)">
    <div style="width:230px;height:170px;border-radius:22px;background:radial-gradient(circle at 30% 30%, #F59E0B, #D97706 55%, #7C2D12)"></div></div>
  <div style="width:150px;border-left:1px solid var(--line);padding:18px;display:grid;align-content:start;gap:12px">
    ${[
      t(lang, "Layer 3", "Capa 3"),
      t(lang, "Curves", "Curvas"),
      t(lang, "Background", "Fondo"),
    ]
      .map(
        (n, i) =>
          `<span style="font-size:15px;font-weight:500;padding:8px 10px;border-radius:10px;${i === 0 ? "background:var(--amber-soft);color:var(--amber-ink)" : "color:var(--muted)"}">${n}</span>`,
      )
      .join("")}</div>
</div>`;

/** A five-line music staff with a few notes, for the practice app. */
const staffBody = () => {
  const lines = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<line x1="20" x2="560" y1="${60 + i * 22}" y2="${60 + i * 22}" stroke="var(--line)" stroke-width="2"/>`,
    )
    .join("");
  const notes = [
    [90, 126],
    [170, 104],
    [250, 115],
    [330, 82],
    [410, 93],
    [490, 71],
  ]
    .map(
      ([x, y], i) =>
        `<ellipse cx="${x}" cy="${y}" rx="13" ry="10" fill="${i === 3 ? "var(--amber)" : "var(--ink)"}" transform="rotate(-18 ${x} ${y})"/><line x1="${x + 12}" x2="${x + 12}" y1="${y}" y2="${y - 62}" stroke="${i === 3 ? "var(--amber)" : "var(--ink)"}" stroke-width="3"/>`,
    )
    .join("");
  return `<svg width="100%" height="100%" viewBox="0 0 580 210">${lines}${notes}</svg>`;
};

/** A chat between the developer and an AI assistant. */
const chatBody = (messages) =>
  `<div style="display:grid;gap:14px;padding:24px">${messages.map(([who, text]) => `<div class="bubble ${who}">${k.esc(text)}</div>`).join("")}</div>`;

/** A type specimen with a scale and the accent swatch, for design systems. */
const specimenBody = (
  lang,
) => `<div style="padding:28px 32px;display:grid;gap:10px">
  <div style="display:flex;align-items:baseline;gap:18px"><span style="font-size:92px;font-weight:700;letter-spacing:-0.05em;line-height:1">Aa</span><span class="label">Geist · 700</span></div>
  ${[
    [44, t(lang, "Display", "Display")],
    [30, t(lang, "Section", "Sección")],
    [21, t(lang, "Body text", "Texto")],
  ]
    .map(
      ([size, name]) =>
        `<div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:${size}px;font-weight:${size > 25 ? 650 : 400};letter-spacing:-0.03em">${name}</span><span class="label">${size}px</span></div>`,
    )
    .join("")}
  <div style="display:flex;gap:12px;margin-top:10px">${["#D97706", "#1D1D1F", "#6E6E73", "#D2D2D7", "#F5F5F7"].map((c) => `<i style="width:46px;height:46px;border-radius:14px;background:${c};display:block;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.06)"></i>`).join("")}</div>
</div>`;

/** A Markdown file next to how it renders. */
const renderedBody = (
  lang,
) => `<div style="padding:30px 34px;display:grid;gap:16px">
  <span style="font-size:38px;font-weight:700;letter-spacing:-0.04em">${t(lang, "Why Markdown", "Por qué Markdown")}</span>
  ${[1, 0.92, 0.97, 0.6].map((w) => `<i style="height:14px;width:${w * 100}%;border-radius:999px;background:var(--fill);display:block"></i>`).join("")}
  <span style="margin-top:8px;font-size:24px;font-weight:650;letter-spacing:-0.03em">${t(lang, "How it renders", "Cómo se ve")}</span>
  ${[0.95, 0.8].map((w) => `<i style="height:14px;width:${w * 100}%;border-radius:999px;background:var(--fill);display:block"></i>`).join("")}
</div>`;

module.exports = {
  "when-ai-can-clone-your-app": {
    theme: "dark",
    phrase: {
      en: ["Shipping a binary", "never protected us."],
      es: ["Entregar un binario", "nunca nos protegió."],
    },
    objects: (lang) => [
      `<div class="panel ghost" style="left:610px;top:118px;width:690px;height:450px;transform:rotate(4deg);z-index:2"></div>`,
      k.window({
        title: t(lang, "Image Editor", "Editor de imágenes"),
        body: editorBody(lang),
        x: 560,
        y: 72,
        w: 690,
        h: 450,
        rot: -2,
        z: 3,
      }),
      k.terminal({
        x: 236,
        y: 300,
        w: 560,
        rot: -1.5,
        z: 4,
        lines: [
          '$ agent "how does the brush engine work?"',
          "inspecting editor.bin",
          "recovered: brushes, layers, filters",
          "{a:writing} brush/engine.rs",
        ],
      }),
      k.badge({ icon: "lock-open", x: 1130, y: 640, w: 170, z: 5 }),
    ],
  },

  "visual-language-design-systems": {
    theme: "light",
    phrase: {
      en: ["We eat", "with our eyes first."],
      es: ["Se come con", "los ojos primero."],
    },
    objects: (lang) => [
      k.window({
        title: t(lang, "Type & color", "Tipografía y color"),
        body: specimenBody(lang),
        x: 236,
        y: 70,
        w: 560,
        h: 450,
        rot: -2.5,
        z: 3,
      }),
      k.chips({
        x: 840,
        y: 150,
        w: 470,
        rot: 2,
        z: 4,
        items: [
          { text: "Button", icon: "mouse-pointer-click", on: true },
          { text: "Input", icon: "text-cursor-input" },
          { text: "Card", icon: "panel-top" },
          { text: "Badge", icon: "tag" },
        ],
      }),
      k.list({
        title: t(lang, "Design system", "Sistema de diseño"),
        x: 880,
        y: 330,
        w: 420,
        rot: 2,
        z: 2,
        items: [
          { text: t(lang, "Tokens", "Tokens"), state: "done" },
          { text: t(lang, "Components", "Componentes"), state: "done" },
          { text: t(lang, "Patterns", "Patrones"), state: "active" },
        ],
      }),
    ],
  },

  "floci-aws-local-development-revolution": {
    theme: "light",
    phrase: {
      en: ["AWS on your laptop,", "ready in 24 ms."],
      es: ["AWS en tu laptop,", "listo en 24 ms."],
    },
    objects: () => [
      k.terminal({
        x: 236,
        y: 80,
        w: 560,
        rot: -2,
        z: 4,
        lines: [
          "$ floci start",
          "S3, Lambda, DynamoDB, SQS",
          "ready in {a:24ms}",
          "$ terraform apply -auto-approve",
          "{a:Apply complete!}",
        ],
      }),
      k.code({
        title: "main.tf",
        x: 760,
        y: 170,
        w: 540,
        rot: 2,
        z: 3,
        lines: [
          '{k:provider} {s:"aws"} {',
          "  s3_use_path_style = {k:true}",
          "}",
          "",
          '{k:resource} {s:"aws_s3_bucket"} {s:"assets"} {',
          '  bucket = {s:"assets-dev"}',
          "}",
        ],
      }),
      k.chips({
        x: 1060,
        y: 560,
        w: 240,
        z: 5,
        items: [
          { text: "$0", icon: "badge-dollar-sign", on: true },
          { text: "MIT", icon: "scale" },
        ],
      }),
    ],
  },

  "ai-security-double-edged-sword": {
    theme: "dark",
    phrase: {
      en: ["Same model,", "both sides."],
      es: ["El mismo modelo,", "en los dos lados."],
    },
    objects: (lang) => [
      k.terminal({
        x: 236,
        y: 92,
        w: 540,
        rot: -2.5,
        z: 3,
        lines: [
          "$ ai-audit ./server",
          "scanning 1,204 files",
          "found: bug in parser.c",
          "{a:patch ready for review}",
        ],
      }),
      k.terminal({
        x: 760,
        y: 190,
        w: 540,
        rot: 2,
        z: 4,
        lines: [
          "$ ai-scan target.example",
          "fingerprinting services",
          "found: bug in parser.c",
          "{a:exploit drafted}",
        ],
      }),
      k.notice({
        icon: "shield-alert",
        title: t(lang, "Critical vulnerability", "Vulnerabilidad crítica"),
        body: t(
          lang,
          "Found by AI · on both sides",
          "Encontrada por IA · en los dos lados",
        ),
        x: 900,
        y: 620,
        w: 400,
        rot: 1,
        z: 5,
      }),
    ],
  },

  "controlled-observability-modern-development": {
    theme: "dark",
    phrase: { en: ["2 AM,", "payments down."], es: ["2 AM,", "pagos caídos."] },
    objects: (lang) => [
      k.bars({
        label: t(lang, "p95 latency · checkout", "Latencia p95 · checkout"),
        values: [
          0.18, 0.22, 0.2, 0.24, 0.21, 0.26, 0.23, 0.92, 0.88, 0.3, 0.24,
        ],
        spike: 7,
        x: 236,
        y: 84,
        w: 600,
        rot: -2,
        z: 3,
      }),
      k.terminal({
        x: 780,
        y: 150,
        w: 520,
        rot: 2,
        z: 4,
        lines: [
          "02:07 INFO  payment.authorize ok",
          "02:08 {a:ERROR payment.capture timeout}",
          "02:08 {a:ERROR payment.capture timeout}",
          "02:09 WARN  retry queue growing",
        ],
      }),
      k.notice({
        icon: "bell-ring",
        title: t(lang, "Checkout errors", "Errores en checkout"),
        body: t(lang, "Paging on-call engineer", "Avisando a la guardia"),
        x: 920,
        y: 600,
        w: 380,
        rot: -1,
        z: 5,
      }),
    ],
  },

  "vibe-coding-cursor-workshop": {
    theme: "dark",
    phrase: {
      en: ["A landing page", "in under an hour."],
      es: ["Una landing page", "en menos de 1 hora."],
    },
    objects: (lang) => [
      k.window({
        title: "Cursor",
        x: 236,
        y: 70,
        w: 600,
        h: 420,
        rot: -2,
        z: 3,
        body: chatBody([
          [
            "me",
            t(
              lang,
              "Build the hero with the brand's skills",
              "Arma el hero con las skills de la marca",
            ),
          ],
          [
            "ai",
            t(
              lang,
              "Using design-tokens and layout skills…",
              "Usando las skills de tokens y layout…",
            ),
          ],
          [
            "me",
            t(lang, "Now the pricing section", "Ahora la sección de precios"),
          ],
        ]),
      }),
      k.list({
        title: t(lang, "Plan", "Plan"),
        x: 880,
        y: 140,
        w: 420,
        rot: 2,
        z: 4,
        items: [
          {
            text: t(lang, "Architect with Gemini", "Arquitectura con Gemini"),
            state: "done",
          },
          { text: t(lang, "Seven skills", "Siete skills"), state: "done" },
          { text: t(lang, "Eight prompts", "Ocho prompts"), state: "active" },
          t(lang, "Deploy", "Desplegar"),
        ],
      }),
      k.badge({ icon: "timer", x: 1140, y: 640, w: 160, z: 5 }),
    ],
  },

  "firebase-vs-supabase": {
    theme: "light",
    phrase: {
      en: ["Documents", "or tables?"],
      es: ["¿Documentos", "o tablas?"],
    },
    objects: (lang) => [
      k.code({
        title: "Firestore",
        x: 236,
        y: 84,
        w: 560,
        rot: -3,
        z: 3,
        lines: [
          t(lang, "{c:// a document}", "{c:// un documento}"),
          "users/{a:sebastian} {",
          '  name: {s:"Sebastian"},',
          '  settings: { theme: {s:"dark"} },',
          "  posts: [ … ]",
          "}",
        ],
      }),
      k.code({
        title: "PostgreSQL",
        x: 720,
        y: 236,
        w: 590,
        rot: 2,
        z: 4,
        lines: [
          t(lang, "{c:-- a table}", "{c:-- una tabla}"),
          "{k:select} name, count(*)",
          "{k:from} users",
          "{k:join} posts {k:on} posts.user_id = users.id",
          "{k:group by} name;",
        ],
      }),
      k.chips({
        x: 1010,
        y: 690,
        w: 300,
        z: 5,
        items: [
          { text: "NoSQL", icon: "file-json" },
          { text: "SQL", icon: "table-2", on: true },
        ],
      }),
    ],
  },

  "the-first-digital-death": {
    theme: "dark",
    phrase: {
      en: ["Within ten years,", "a computer virus."],
      es: ["En diez años,", "un virus informático."],
    },
    objects: (lang) => [
      k.signal({
        label: t(lang, "Neural link · signal", "Enlace neuronal · señal"),
        value: t(lang, "live", "en vivo"),
        glitch: true,
        x: 420,
        y: 80,
        w: 880,
        rot: -1,
        z: 3,
      }),
      k.notice({
        icon: "triangle-alert",
        title: t(lang, "Unexpected packet", "Paquete inesperado"),
        body: t(
          lang,
          "implant firmware · 03:12",
          "firmware del implante · 03:12",
        ),
        x: 236,
        y: 330,
        w: 540,
        rot: -2,
        z: 5,
      }),
      k.list({
        title: t(lang, "Integrity checks", "Verificaciones"),
        x: 870,
        y: 360,
        w: 430,
        rot: 2,
        z: 4,
        items: [
          {
            text: t(lang, "Wireless link", "Enlace inalámbrico"),
            state: "done",
          },
          {
            text: t(lang, "Firmware signature", "Firma del firmware"),
            state: "warn",
          },
          { text: t(lang, "Signal timing", "Sincronía"), state: "active" },
        ],
      }),
    ],
  },

  "python-renaissance-ai-era": {
    theme: "light",
    phrase: {
      en: ["Python ended up", "everywhere."],
      es: ["Python terminó", "en todas partes."],
    },
    objects: (lang) => [
      k.code({
        title: "train.py",
        x: 236,
        y: 80,
        w: 590,
        rot: -2,
        z: 3,
        lines: [
          "{k:from} dataclasses {k:import} dataclass",
          "",
          "@dataclass",
          "{k:class} {a:Run}:",
          "    model: str",
          "    epochs: int = {s:10}",
          "",
          "{k:def} train(run: Run) -> float: ...",
        ],
      }),
      k.chips({
        x: 860,
        y: 140,
        w: 440,
        rot: 2,
        z: 4,
        items: [
          { text: t(lang, "AI", "IA"), icon: "sparkles", on: true },
          { text: t(lang, "Data", "Datos"), icon: "database" },
          { text: "Web", icon: "globe" },
          { text: "DevOps", icon: "server" },
          { text: t(lang, "Scripts", "Scripts"), icon: "terminal" },
        ],
      }),
      k.terminal({
        x: 900,
        y: 420,
        w: 400,
        rot: 1.5,
        z: 5,
        lines: ["$ uv run train.py", "epoch 10/10", "{a:done}"],
      }),
    ],
  },

  "adapting-to-new-jobs": {
    theme: "light",
    phrase: {
      en: ["Watch first,", "then act."],
      es: ["Primero observa,", "después actúa."],
    },
    objects: (lang) => [
      k.list({
        title: t(lang, "First two weeks", "Primeras dos semanas"),
        x: 236,
        y: 80,
        w: 520,
        rot: -2,
        z: 3,
        items: [
          {
            text: t(lang, "Meet the team", "Conocer al equipo"),
            state: "done",
          },
          {
            text: t(lang, "Read the runbooks", "Leer los runbooks"),
            state: "done",
          },
          {
            text: t(lang, "Map who decides", "Entender quién decide"),
            state: "active",
          },
          t(lang, "Ship a small fix", "Entregar un fix pequeño"),
        ],
      }),
      k.chips({
        x: 820,
        y: 130,
        w: 480,
        rot: 2,
        z: 4,
        items: [
          { text: t(lang, "Structured", "Estructurado"), icon: "layers" },
          { text: t(lang, "Chaos", "Caos"), icon: "shuffle", on: true },
        ],
      }),
      k.quote({
        text: t(
          lang,
          "We're like a family here.",
          "Aquí somos como una familia.",
        ),
        who: t(
          lang,
          "Red flag in the interview",
          "Alerta roja en la entrevista",
        ),
        x: 840,
        y: 300,
        w: 460,
        rot: 2.5,
        z: 2,
      }),
    ],
  },

  "terraform-scaling-infrastructure": {
    theme: "light",
    phrase: {
      en: ["Same code,", "three environments."],
      es: ["El mismo código,", "tres entornos."],
    },
    objects: () => [
      k.code({
        title: "main.tf",
        x: 236,
        y: 80,
        w: 580,
        rot: -2,
        z: 3,
        lines: [
          '{k:module} {s:"app"} {',
          '  source        = {s:"./modules/app"}',
          "  environment   = var.env",
          "  instance_type = var.sizes[var.env]",
          "  replicas      = var.replicas[var.env]",
          "}",
        ],
      }),
      k.chips({
        x: 860,
        y: 170,
        w: 440,
        rot: 2,
        z: 4,
        items: [
          { text: "dev", icon: "laptop" },
          { text: "staging", icon: "flask-conical" },
          { text: "prod", icon: "server", on: true },
        ],
      }),
      k.terminal({
        x: 860,
        y: 380,
        w: 440,
        rot: 1.5,
        z: 5,
        lines: [
          "$ terraform plan -var env=prod",
          "Plan: {a:2 to add}, 0 to change,",
          "0 to destroy.",
        ],
      }),
    ],
  },

  "from-junior-to-senior-engineer": {
    theme: "light",
    phrase: {
      en: ["From doing", "to deciding."],
      es: ["De hacer", "a decidir."],
    },
    objects: (lang) => [
      k.code({
        title: t(lang, "Pull request · review", "Pull request · revisión"),
        x: 236,
        y: 80,
        w: 590,
        rot: -2,
        z: 3,
        lines: [
          "{c:  def notify(user):}",
          "{a:-     send_email(user)}",
          '{a:+     queue.publish("notify", user.id)}',
          "",
          t(
            lang,
            "{c:  # Why a queue and not a retry here?}",
            "{c:  # ¿Por qué una cola y no un reintento?}",
          ),
        ],
      }),
      k.list({
        title: t(lang, "Decision record", "Registro de decisión"),
        x: 870,
        y: 160,
        w: 430,
        rot: 2,
        z: 4,
        items: [
          { text: t(lang, "Context", "Contexto"), state: "done" },
          { text: t(lang, "Options", "Opciones"), state: "done" },
          { text: t(lang, "Decision", "Decisión"), state: "active" },
          t(lang, "Consequences", "Consecuencias"),
        ],
      }),
    ],
  },

  "lets-talk-microservices": {
    theme: "light",
    phrase: {
      en: ["Split it", "only where it hurts."],
      es: ["Divídelo", "solo donde duele."],
    },
    objects: (lang) => [
      k.diagram({
        x: 236,
        y: 70,
        w: 1064,
        h: 470,
        rot: -1,
        z: 3,
        nodes: [
          { id: "g", x: 532, y: 70, label: "API gateway", on: true },
          { id: "a", x: 170, y: 250, label: t(lang, "Accounts", "Cuentas") },
          {
            id: "p",
            x: 420,
            y: 250,
            label: t(lang, "Payments", "Pagos"),
            on: true,
          },
          {
            id: "t",
            x: 660,
            y: 250,
            label: t(lang, "Transfers", "Transferencias"),
          },
          {
            id: "n",
            x: 900,
            y: 250,
            label: t(lang, "Notifications", "Notificaciones"),
          },
          { id: "d1", x: 170, y: 400, label: "db" },
          { id: "d2", x: 420, y: 400, label: "db" },
          { id: "d3", x: 660, y: 400, label: "db" },
        ],
        edges: [
          ["g", "a"],
          ["g", "p"],
          ["g", "t"],
          ["g", "n", true],
          ["a", "d1"],
          ["p", "d2"],
          ["t", "d3"],
        ],
      }),
    ],
  },

  "coding-through-burnout": {
    theme: "light",
    phrase: { en: ["Play", "just to play."], es: ["Tocar", "solo por tocar."] },
    objects: (lang) => [
      k.window({
        title: "Cadenza",
        body: staffBody(),
        x: 236,
        y: 80,
        w: 600,
        h: 290,
        rot: -2,
        z: 3,
      }),
      k.notice({
        icon: "moon",
        title: t(lang, "Do not disturb", "No molestar"),
        body: t(lang, "Until tomorrow, 9:00", "Hasta mañana, 9:00"),
        x: 880,
        y: 120,
        w: 420,
        rot: 2,
        z: 4,
      }),
      k.badge({ icon: "cat", x: 900, y: 330, w: 170, z: 5 }),
      k.badge({ icon: "guitar", x: 1110, y: 400, w: 170, z: 4 }),
    ],
  },

  "from-chaos-to-clarity-kanban": {
    theme: "light",
    phrase: {
      en: ["Less in progress,", "more done."],
      es: ["Menos en curso,", "más terminado."],
    },
    objects: (lang) => [
      k.kanban({
        x: 236,
        y: 70,
        w: 1064,
        rot: -1,
        z: 3,
        columns: [
          {
            title: t(lang, "To do", "Por hacer"),
            cards: [
              t(lang, "Write the post", "Escribir el post"),
              t(lang, "Fix the login", "Arreglar el login"),
              t(lang, "Plan the release", "Planear el release"),
            ],
          },
          {
            title: t(lang, "Doing", "En curso"),
            limit: "WIP 2",
            cards: [
              {
                text: t(lang, "Design the board", "Diseñar el tablero"),
                on: true,
              },
              t(lang, "Drag and drop", "Arrastrar y soltar"),
            ],
          },
          {
            title: t(lang, "Done", "Hecho"),
            cards: [
              t(lang, "Columns", "Columnas"),
              t(lang, "Dark mode", "Modo oscuro"),
            ],
          },
        ],
      }),
    ],
  },

  "why-markdown-for-blogs": {
    theme: "light",
    phrase: {
      en: ["Plain text", "that lasts."],
      es: ["Texto plano", "que perdura."],
    },
    objects: (lang) => [
      k.code({
        title: "post.md",
        x: 236,
        y: 80,
        w: 560,
        rot: -2,
        z: 3,
        lines: [
          "---",
          `title: {s:"${t(lang, "Why Markdown", "Por qué Markdown")}"}`,
          "date: {s:2026-03-01}",
          "---",
          "",
          `{a:##} ${t(lang, "How it renders", "Cómo se ve")}`,
          t(
            lang,
            "Plain text, **in the repo**.",
            "Texto plano, **en el repo**.",
          ),
        ],
      }),
      k.window({
        title: t(lang, "Preview", "Vista previa"),
        body: renderedBody(lang),
        x: 800,
        y: 180,
        w: 500,
        h: 380,
        rot: 2,
        z: 4,
      }),
    ],
  },
};
