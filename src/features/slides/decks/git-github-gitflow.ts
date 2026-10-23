import type { DeckInput } from "../schema";

/**
 * "Git, GitHub y GitFlow", the GDG Quito talk, rebuilt from its Canva version in the slide system. Ships as a draft:
 * it appears in /slides/manage for the owner, and the first save from the editor stores it. Diagrams carry only their
 * Mermaid source; opening each diagram slide in the editor draws and saves them.
 */
export const gitGithubGitflow: DeckInput = {
  slug: "git-github-gitflow",
  title: "Git, GitHub y GitFlow",
  description:
    "Primeros pasos con Git: por qué existe, qué aporta GitHub, cómo organizar ramas con GitFlow y los comandos del día a día.",
  lang: "es",
  status: "draft",
  accent: "#f05032",
  theme: "dark",
  updatedAt: "2026-10-24T00:00:00.000Z",
  version: 1,
  slides: [
    {
      id: "cover",
      layout: "title",
      eyebrow: "GDG Quito · Git Demo",
      title: "Git, GitHub y GitFlow",
      subtitle:
        "Primeros pasos para versionar, colaborar y publicar *sin miedo*.",
      notes:
        "Bienvenida. Pregunta rápida: ¿quién ya usa Git todos los días? ¿Quién lo usa solo con botones del editor?",
    },
    {
      id: "speaker",
      layout: "intro",
      photo: {
        src: "/images/sebas-playing.webp",
        alt: "Sebastian Alvarez sonriendo con una guitarra eléctrica",
      },
      greeting: "Hola, soy",
      name: "Sebastian Alvarez",
      role: "Fullstack Software Engineer · GDG Quito Organizer",
      bio: "Construyo backends, infraestructura cloud y productos web. Git es la herramienta que uso todos los días, en todos los proyectos.",
      highlights: ["GDG Quito", "Quito, Ecuador"],
      handle: "@listerineh",
    },
    {
      id: "agenda",
      layout: "bullets",
      title: "Agenda",
      build: true,
      items: [
        "**01** Introducción a Git",
        "**02** Introducción a GitHub",
        "**03** GitFlow: un modelo de ramas",
        "**04** Comandos de Git del día a día",
        "**05** Demo: del `git init` al pull request",
      ],
    },

    // ── 01 · Git ──────────────────────────────────────────────
    {
      id: "part-git",
      layout: "section",
      number: "01",
      title: "Introducción a Git",
      subtitle: "Qué problema resuelve y de dónde viene.",
    },
    {
      id: "problem",
      layout: "statement",
      statement:
        "¿Cómo trabajan cinco personas en el mismo código ==sin pisarse==?",
      emphasis: "El problema antes de Git.",
      notes:
        'Dejar la pregunta en el aire unos segundos. Pedir ejemplos: carpetas "final_v2", archivos por correo, USB.',
    },
    {
      id: "before-after",
      layout: "two-column",
      title: "Sin control de versiones vs. con Git",
      build: true,
      columns: [
        {
          heading: "Sin control de versiones",
          items: [
            "Copias por ZIP y correo",
            "`proyecto_final_v3_ahora_si.zip`",
            "Nadie sabe cuál es la versión buena",
            "Un error y se pierde trabajo",
          ],
        },
        {
          heading: "Con Git",
          items: [
            "Historial completo de cada cambio",
            "Ramas para trabajar en paralelo",
            "Integrar cambios sin copiarlos a mano",
            "Volver atrás en segundos",
          ],
        },
      ],
      notes:
        "Contar la historia de los ZIP por correo: varias personas mandando su versión y alguien integrando a mano.",
    },
    {
      id: "history",
      layout: "bullets",
      title: "Un poco de historia",
      build: true,
      items: [
        "**2005**: el kernel de Linux pierde el acceso gratuito a *BitKeeper*, su sistema de versiones",
        "**Linus Torvalds** decide escribir uno propio: Git",
        "Objetivos: **rápido**, **distribuido** y con la integridad garantizada",
        "Cada commit se identifica por un *hash* de su contenido: si algo cambia, se nota",
        "Hoy es el estándar de facto en la industria",
      ],
      notes:
        "Distribuido = cada clon tiene el historial completo; se puede trabajar sin conexión y no hay un único punto de falla.",
    },
    {
      id: "numbers",
      layout: "stats",
      title: "Git en números",
      stats: [
        { value: 2005, label: "año de nacimiento" },
        { value: 93, suffix: "%", label: "de devs usa Git" },
        { value: 100, suffix: "M+", label: "devs en GitHub" },
      ],
      notes:
        "Fuentes: Stack Overflow Developer Survey 2022 (93,87 % usa Git). GitHub superó los 100 millones de desarrolladores en enero de 2023.",
    },
    {
      id: "concepts",
      layout: "icons-grid",
      title: "Conceptos clave",
      build: true,
      items: [
        {
          icon: "folder-git-2",
          title: "Repositorio",
          body: "El proyecto más todo su historial.",
        },
        {
          icon: "git-commit-horizontal",
          title: "Commit",
          body: "Una foto de los cambios, con autor y mensaje.",
        },
        {
          icon: "git-branch",
          title: "Rama",
          body: "Una línea de trabajo independiente.",
        },
        {
          icon: "git-merge",
          title: "Merge",
          body: "Unir el trabajo de dos ramas.",
        },
        {
          icon: "layers",
          title: "Staging",
          body: "Lo que entrará en el próximo commit.",
        },
        {
          icon: "cloud",
          title: "Remoto",
          body: "Una copia compartida, por ejemplo en GitHub.",
        },
      ],
    },
    {
      id: "team-flow",
      layout: "diagram",
      title: "Cómo fluye el trabajo en equipo",
      source:
        "flowchart LR\n  a[Dev A] --> f1[feature/login]\n  b[Dev B] --> f2[feature/pagos]\n  c[Dev C] --> f3[fix/header]\n  f1 --> v{{Pull request + revisión + CI}}\n  f2 --> v\n  f3 --> v\n  v --> m[main]",
      caption:
        "Cada persona trabaja en su rama; nada llega a `main` sin pasar por revisión.",
      notes:
        'Este es el diagrama de "validación" del Canva: cada uno en su rama, todo pasa por un PR antes de main.',
    },

    // ── 02 · GitHub ───────────────────────────────────────────
    {
      id: "part-github",
      layout: "section",
      number: "02",
      title: "Introducción a GitHub",
      subtitle: "Git en la nube, con herramientas para colaborar.",
    },
    {
      id: "git-vs-github",
      layout: "two-column",
      title: "Git no es GitHub",
      columns: [
        {
          heading: "Git",
          items: [
            "Herramienta de control de versiones",
            "Funciona en tu máquina, sin internet",
            "Open source, creada en 2005",
          ],
        },
        {
          heading: "GitHub",
          items: [
            "Servicio que aloja repositorios Git",
            "Suma colaboración: PRs, issues, Actions",
            "Alternativas: GitLab, Bitbucket",
          ],
        },
      ],
      notes:
        "La confusión más común. Git es la herramienta; GitHub es un lugar donde guardar y compartir repos.",
    },
    {
      id: "github-features",
      layout: "icons-grid",
      title: "Qué aporta GitHub",
      build: true,
      items: [
        {
          icon: "monitor-smartphone",
          title: "Accesibilidad",
          body: "Plataforma visual, interfaz amigable.",
        },
        {
          icon: "layout-dashboard",
          title: "Herramientas",
          body: "Projects, Issues y Wikis.",
        },
        {
          icon: "git-pull-request",
          title: "Colaboración",
          body: "Pull requests, revisiones y forks.",
        },
        {
          icon: "workflow",
          title: "Automatización",
          body: "GitHub Actions: tests y despliegues en cada push.",
        },
        {
          icon: "shield-check",
          title: "Protección",
          body: "Reglas de rama y revisiones obligatorias.",
        },
        {
          icon: "globe",
          title: "Publicación",
          body: "GitHub Pages para sitios estáticos.",
        },
      ],
    },

    // ── 03 · GitFlow ──────────────────────────────────────────
    {
      id: "part-gitflow",
      layout: "section",
      number: "03",
      title: "GitFlow",
      subtitle: "Un modelo de ramas para equipos que publican versiones.",
    },
    {
      id: "gitflow-graph",
      layout: "diagram",
      title: "GitFlow de un vistazo",
      source:
        'gitGraph\n  commit id: "init" tag: "v1.0.0"\n  branch develop\n  checkout develop\n  commit id: "base"\n  branch feature\n  checkout feature\n  commit id: "login"\n  commit id: "tests"\n  checkout develop\n  merge feature\n  checkout main\n  branch hotfix\n  checkout hotfix\n  commit id: "fix"\n  checkout main\n  merge hotfix tag: "v1.0.1"\n  checkout develop\n  merge hotfix\n  branch release\n  checkout release\n  commit id: "bump"\n  checkout main\n  merge release tag: "v1.1.0"\n  checkout develop\n  merge release',
      caption:
        "`main` siempre refleja producción; todo lo demás se integra en `develop`.",
      notes:
        "Recorrer el gráfico de izquierda a derecha: feature vuelve a develop, hotfix sale de main y vuelve a main y develop, release estabiliza y se etiqueta.",
    },
    {
      id: "gitflow-branches",
      layout: "bullets",
      title: "Las ramas de GitFlow",
      build: true,
      items: [
        "`main`: lo que está en producción, etiquetado por versión",
        "`develop`: donde se integra el próximo release",
        "`feature/*`: una funcionalidad; sale de develop y vuelve a develop",
        "`release/*`: estabiliza una versión antes de publicarla",
        "`hotfix/*`: arregla producción desde main y vuelve a main y develop",
        "Con despliegue continuo, **GitHub Flow** o *trunk-based* suelen ser más simples",
      ],
      notes:
        "GitFlow brilla con versiones numeradas (apps, librerías). Para webs que despliegan varias veces al día, menos ramas largas es mejor.",
    },

    // ── 04 · Comandos ─────────────────────────────────────────
    {
      id: "part-commands",
      layout: "section",
      number: "04",
      title: "Comandos de Git",
      subtitle: "Lo que vas a usar todos los días.",
    },
    {
      id: "setup",
      layout: "code",
      title: "Setup",
      language: "bash",
      code: '# Una vez por máquina\ngit config --global user.name "Tu Nombre"\ngit config --global user.email "tu@email.com"\n\n# Solo para este repositorio\ngit config --local user.name "Tu Nombre"\ngit config --local user.email "tu@trabajo.com"',
      caption:
        "`--local` gana sobre `--global`: útil para separar trabajo y proyectos personales.",
    },
    {
      id: "init",
      layout: "code",
      title: "Empezar un repositorio",
      language: "bash",
      code: "# Un proyecto nuevo\ngit init\ngit remote add origin <url>\n\n# Un proyecto que ya existe\ngit clone <url>",
      caption:
        "`git clone` trae el historial completo y deja configurado el remoto `origin`.",
    },
    {
      id: "areas",
      layout: "diagram",
      title: "Las tres áreas de Git",
      source:
        "flowchart LR\n  wd[Directorio de trabajo] -->|git add| st[Staging]\n  st -->|git commit| repo[Repositorio local]\n  repo -->|git push| rem[Remoto]\n  rem -->|git pull| wd",
      caption: "Entender este recorrido explica casi todos los comandos.",
      notes:
        "Clave para principiantes: un archivo modificado no está en el commit hasta que se agrega a staging.",
    },
    {
      id: "branching",
      layout: "code",
      title: "Ramas",
      language: "bash",
      code: "git branch                 # lista las ramas\ngit branch <rama>          # crea una rama\ngit switch <rama>          # cambia de rama\ngit switch -c <rama>       # crea y cambia\n\n# La forma clásica, que sigue funcionando\ngit checkout <rama>\ngit checkout -b <rama>",
      caption:
        "`git switch` (Git 2.23+) separa “cambiar de rama” de lo que hacía `checkout` con archivos.",
    },
    {
      id: "staging",
      layout: "code",
      title: "Staging y commits",
      language: "bash",
      code: 'git status                     # qué cambió\ngit diff                       # cambios sin agregar\ngit add <archivo>              # pasa a staging\ngit diff --staged              # lo que irá en el commit\ngit restore --staged <archivo> # lo saca de staging\ngit commit -m "feat: mensaje descriptivo"',
      caption:
        "`git restore --staged` es la forma moderna de `git reset <archivo>`.",
    },
    {
      id: "syncing",
      layout: "code",
      title: "Sincronizar",
      language: "bash",
      code: "git fetch                  # trae cambios sin aplicarlos\ngit merge <rama>           # une otra rama a la actual\ngit rebase <rama>          # reaplica tus commits encima\ngit pull                   # fetch + merge\ngit push -u origin <rama>  # publica tu rama",
      caption:
        "`git pull --rebase` mantiene el historial lineal cuando trabajas sobre la misma rama.",
    },
    {
      id: "practices",
      layout: "bullets",
      title: "Buenas prácticas",
      build: true,
      items: [
        "Commits **pequeños** con mensajes claros (`feat:`, `fix:`, `docs:`)",
        "Una rama por cambio, con un nombre que lo explique",
        "Haz `pull` antes de empezar y antes de hacer `push`",
        "Nunca reescribas historial compartido; si hace falta, `--force-with-lease`",
        "Un `.gitignore` desde el primer día: nada de secretos ni builds",
        "Todo cambio entra por **pull request**, con revisión",
      ],
      notes:
        "Conventional Commits: feat, fix, docs, refactor, chore. Mencionar que .env y llaves nunca van al repo.",
    },

    // ── 05 · Demo ─────────────────────────────────────────────
    {
      id: "part-demo",
      layout: "section",
      number: "05",
      title: "Demo",
      subtitle: "Del `git init` al pull request.",
      notes:
        "Demo: git init, primer commit, crear rama feature, cambio, push, abrir PR en GitHub, revisar, merge, pull en main.",
    },
    {
      id: "thanks",
      layout: "closing",
      title: "¿Más preguntas? Conectemos",
      subtitle: "Las diapositivas quedan en listerineh.dev/slides.",
      links: [
        {
          label: "linkedin.com/in/listerineh",
          href: "https://www.linkedin.com/in/listerineh",
        },
        {
          label: "GDG Quito",
          href: "https://www.linkedin.com/company/gdg-quito",
        },
      ],
    },
  ],
};
