import type { DeckInput } from "../schema";

/**
 * "De la idea al Micro-SaaS", a university talk for students and professors (11 November 2026), in Spanish with an
 * English translation. Five modules: finding real problems, building with AI as an architect, industry standards with
 * a live case (a pipe head-loss calculator from Excel to a web app), the student Micro-SaaS, and Q&A. Every module
 * has a slide for professors. The case-study code runs as shown (Python 3.12, FastAPI, pytest, Next.js). Ships as a
 * draft; opening the diagram slides in each language draws and saves their SVG.
 */
export const ideaMicroSaas: DeckInput = {
  slug: "idea-micro-saas",
  title: "De la idea al Micro-SaaS",
  description:
    "Innovación real, ingeniería ágil e IA para estudiantes: cómo pasar de un problema de tu comunidad a un producto de software con estándares de la industria, y cobrar por él sin descuidar la carrera.",
  lang: "es",
  status: "draft",
  accent: "#7c3aed",
  event: { name: "Charla universitaria", date: "2026-11-11" },
  updatedAt: "2026-10-23T00:00:00.000Z",
  version: 1,
  slides: [
    {
      id: "cover",
      layout: "title",
      eyebrow: "11 de noviembre de 2026",
      title: "De la idea al Micro-SaaS",
      subtitle:
        "Innovación real, ingeniería ágil e IA para estudiantes en la era del software moderno.",
      notes:
        "Duración objetivo: 60 minutos + preguntas. Módulos de ~12 minutos. Saludar a estudiantes y docentes por separado: esta charla tiene algo para cada uno.",
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
      role: "Sr Full-Stack Engineer · GDG Quito Organizer",
      bio: "Construyo backends, productos web y herramientas con IA aplicada. También fui estudiante intentando construir cosas entre exámenes.",
      highlights: ["GDG Quito", "Quito, Ecuador"],
      handle: "@listerineh",
      notes:
        "Presentación corta (30 segundos). Conectar: yo también estuve sentado ahí, con exámenes y un proyecto a medias.",
    },
    {
      id: "hook",
      layout: "statement",
      statement:
        "La pregunta no es ==qué puedo programar==, sino ==qué problema vale la pena resolver==.",
      emphasis: "Esa es la idea de toda la charla.",
      notes:
        "Pausa de 3 segundos. Pregunta al público: ¿quién tiene un proyecto en un repositorio que nadie usa? Levantar la mano uno mismo.",
    },
    {
      id: "agenda",
      layout: "bullets",
      title: "Agenda",
      build: true,
      items: [
        "**01** El ADN de la innovación: la calle vs. el laboratorio",
        "**02** De programador a director de orquesta",
        "**03** Ingeniería industrializada: skills y estándares",
        "**04** El Micro-SaaS universitario",
        "**05** Preguntas",
      ],
      notes: "Avisar que cada módulo cierra con una diapositiva para docentes.",
    },

    // ── 01 · El ADN de la innovación ─────────────────────────
    {
      id: "part-innovation",
      layout: "section",
      number: "01",
      title: "El ADN de la innovación",
      subtitle: "La calle vs. el laboratorio.",
    },
    {
      id: "street-lab",
      layout: "two-column",
      title: "Dos formas de empezar un proyecto",
      build: true,
      columns: [
        {
          heading: "Desde el laboratorio",
          items: [
            "Empiezo por la tecnología de moda",
            "Busco después a quién le sirve",
            "Nadie lo pidió, nadie lo usa",
            "Termina en un repositorio olvidado",
          ],
        },
        {
          heading: "Desde la calle",
          items: [
            "Empiezo por un dolor que alguien vive",
            "Hay a quién preguntarle",
            "Si funciona, alguien lo usa",
            "Y quizá lo paga",
          ],
        },
      ],
      notes:
        "La falacia del inventor encerrado: crear tecnología buscando un problema. No es culpa de nadie: así se suelen plantear los proyectos de materia.",
    },
    {
      id: "no-market-need",
      layout: "statement",
      statement:
        "Casi ==4 de cada 10== startups que cierran dicen lo mismo: nadie necesitaba lo que construyeron.",
      emphasis:
        "No fallaron por mal código. Fallaron por no partir de un problema real.",
      notes:
        "Fuente: CB Insights, análisis de 101 post-mortems de startups: 'no market need' fue la razón más citada (42 %). En otras actualizaciones del estudio ronda el 35 %. Si un estudiante pregunta: son razones declaradas por los fundadores.",
    },
    {
      id: "where-to-look",
      layout: "icons-grid",
      title: "Dónde están los problemas",
      build: true,
      items: [
        {
          icon: "school",
          title: "Tu facultad",
          body: "Inscripciones, horarios, reservas de laboratorios.",
        },
        {
          icon: "store",
          title: "Comercios del barrio",
          body: "Inventario en un cuaderno, turnos por WhatsApp.",
        },
        {
          icon: "flask-conical",
          title: "Laboratorios",
          body: "Cálculos repetitivos en hojas de Excel.",
        },
        {
          icon: "house",
          title: "Tu familia",
          body: "El negocio de tus padres, tus tíos, tus vecinos.",
        },
        {
          icon: "sheet",
          title: "Procesos manuales",
          body: "Todo lo que alguien copia y pega cada semana.",
        },
        {
          icon: "message-circle",
          title: "Quejas",
          body: "Lo que la gente repite en voz alta es un mapa.",
        },
      ],
      notes:
        "Pedir al público un ejemplo de su propia facultad. Casi siempre aparece la reserva de laboratorios o la inscripción.",
    },
    {
      id: "real-pain",
      layout: "bullets",
      title: "Cómo reconocer un dolor real",
      build: true,
      items: [
        "Alguien lo resuelve **a mano**, todas las semanas",
        "Un Excel o un grupo de WhatsApp sostiene el proceso",
        "Ya pagan por algo peor, o lo pagan con su tiempo",
        "Lo puedes explicar en **una frase**",
        "Puedes hablar esta semana con **5 personas** que lo viven",
      ],
      notes:
        "Si no se cumplen al menos tres, probablemente no es un dolor, es una molestia.",
    },
    {
      id: "purpose-loop",
      layout: "diagram",
      title: "Ingeniería con propósito",
      source:
        "flowchart LR\n  o[Observar] --> e[Entrevistar]\n  e --> p[Prototipar]\n  p --> m[Medir]\n  m -->|aprender| o",
      caption:
        "La tecnología existe para quitar fricción a la vida de alguien. El ciclo no termina en el código.",
      notes: "Cada vuelta del ciclo debería durar días, no meses.",
    },
    {
      id: "teachers-innovation",
      layout: "bullets",
      title: "Para docentes: problemas reales en el aula",
      build: true,
      items: [
        "Proyectos que parten de un problema con **un usuario real**",
        "Evaluar la validación, no solo el código entregado",
        'Tesis de titulación con un "cliente" externo: un comercio, un laboratorio, una ONG',
        "Investigación aplicada con la industria y la comunidad local",
        "Premiar la pregunta correcta, no solo la respuesta correcta",
      ],
      notes:
        "Mensaje para docentes: el pensamiento crítico se entrena detectando problemas, no solo resolviendo ejercicios ya planteados.",
    },

    // ── 02 · Director de orquesta ────────────────────────────
    {
      id: "part-ai",
      layout: "section",
      number: "02",
      title: "De programador a director de orquesta",
      subtitle: "Cómo la IA cambió la forma de construir software.",
    },
    {
      id: "bottleneck",
      layout: "statement",
      statement:
        "El cuello de botella del estudiante: ==estudiar, rendir y emprender== al mismo tiempo.",
      emphasis: "Sin método, eso termina en burnout.",
      notes:
        "Preguntar: ¿cuántos han dejado un proyecto personal por los exámenes? Es normal. La respuesta no es trabajar más horas, es trabajar distinto.",
    },
    {
      id: "ai-numbers",
      layout: "stats",
      title: "La IA ya es parte del oficio",
      stats: [
        { value: 83, suffix: "%", label: "de devs usa herramientas de IA" },
        { value: 66, suffix: "%", label: "usa asistentes o agentes de código" },
        { value: 48, suffix: "%", label: "solo confía si puede verificarlo" },
      ],
      notes:
        "Fuente: Stack Overflow Developer Survey 2026 (unas 30 900 respuestas de 169 países). Solo el 17 % dice no usar IA. El tercer número es el más importante: la mitad confía en la IA solo cuando puede verificar fácilmente el resultado. Verificar es la habilidad.",
    },
    {
      id: "then-now",
      layout: "two-column",
      title: "Cómo cambió el trabajo",
      build: true,
      columns: [
        {
          heading: "Antes",
          items: [
            "Escribir cada línea a mano",
            "Memorizar sintaxis",
            "Buscar la respuesta en foros",
            "Probar al final, si había tiempo",
          ],
        },
        {
          heading: "Ahora",
          items: [
            "Diseñar la arquitectura y los contratos",
            "Describir la intención con buen contexto",
            "Revisar y corregir lo que propone la IA",
            "Tests desde el inicio como red de seguridad",
          ],
        },
      ],
      notes:
        "El enfoque senior: el código se escribe más rápido que nunca; lo escaso es saber qué construir y cómo comprobar que está bien.",
    },
    {
      id: "conductor-flow",
      layout: "diagram",
      title: "El flujo del director de orquesta",
      source:
        "flowchart LR\n  i[Idea] --> s[Especificación]\n  s --> a[Agente de IA]\n  a --> r[Revisión humana]\n  r --> t[Tests y CI]\n  t --> d[Producción]\n  r -->|corregir| s",
      caption:
        "Tú decides qué se construye y qué se acepta. La IA ejecuta dentro de esos límites.",
      notes:
        "Remarcar la flecha de vuelta: revisar y corregir la especificación es parte del trabajo, no un fracaso.",
    },
    {
      id: "stack",
      layout: "icons-grid",
      title: "Un stack pequeño y moderno",
      build: true,
      items: [
        {
          icon: "layout-template",
          title: "Next.js + TypeScript",
          body: "La interfaz web, con tipos estrictos.",
        },
        {
          icon: "code",
          title: "Python",
          body: "Lógica de negocio, datos e IA, con FastAPI.",
        },
        {
          icon: "server",
          title: "Go",
          body: "Servicios rápidos que se despliegan como un solo binario.",
        },
        {
          icon: "database",
          title: "PostgreSQL",
          body: "Los datos, cuando el prototipo se vuelve producto.",
        },
        {
          icon: "cloud",
          title: "Despliegue gestionado",
          body: "Vercel o Cloud Run: sin administrar servidores.",
        },
        {
          icon: "credit-card",
          title: "Pagos",
          body: "Una pasarela local o un merchant of record.",
        },
      ],
      notes:
        "No hace falta todo el primer día. Un MVP puede ser solo Next.js con una base gestionada. Go y Python entran cuando la lógica lo pide.",
    },
    {
      id: "ai-multiplies",
      layout: "statement",
      statement:
        "La IA ==multiplica== lo que sabes. Si no entiendes el código, multiplica tus errores.",
      emphasis: "Usarla bien es una habilidad que se entrena.",
      notes:
        "Dato para el debate: en un ensayo controlado de METR (2025), desarrolladores experimentados tardaron un 19 % más con IA en sus propios proyectos, aunque creían que iban un 20 % más rápido. METR lo considera ya histórico, pero la lección sigue: la percepción engaña, hay que medir y verificar.",
    },
    {
      id: "teachers-ai",
      layout: "bullets",
      title: "Para docentes: IA en el aula",
      build: true,
      items: [
        "Evaluar el razonamiento: **por qué** esta arquitectura y no otra",
        "Pedir que expliquen y defiendan el código que entregan",
        "Enseñar a revisar código ajeno, también el de la IA",
        "Más diseño de sistemas, menos memorización de sintaxis",
        "Reglas claras de uso en lugar de prohibiciones que nadie cumple",
      ],
      notes:
        "Según la misma encuesta de Stack Overflow, solo una de cada cuatro personas dice que su empresa tiene una política oficial de IA. La universidad puede adelantarse.",
    },

    // ── 03 · Ingeniería industrializada ──────────────────────
    {
      id: "part-engineering",
      layout: "section",
      number: "03",
      title: "Ingeniería industrializada",
      subtitle: "Rapidez no significa código basura.",
    },
    {
      id: "skills",
      layout: "bullets",
      title: "¿Qué es una skill?",
      build: true,
      items: [
        "Instrucciones reutilizables que un agente carga **cuando las necesita**",
        "Guardan cómo trabaja tu equipo: estándares, pasos y ejemplos",
        "Se versionan en Git como cualquier otro código",
        "La idea no es nueva: plantillas, generadores y design systems",
      ],
      notes:
        "Una skill es conocimiento de ingeniería empaquetado: lo que un senior le explicaría a un junior, escrito una vez y aplicado siempre.",
    },
    {
      id: "skill-example",
      layout: "code",
      title: "Una skill, por dentro",
      language: "markdown",
      code: "---\nname: nueva-api\ndescription: Crea un endpoint FastAPI con validación, tests y docs.\n---\n1. Define el modelo con Pydantic y tipos estrictos.\n2. Escribe primero el test con pytest.\n3. Implementa el endpoint y corre ruff y pytest antes de terminar.",
      caption:
        "Un archivo de texto: nombre, cuándo usarla y los pasos que siempre sigues.",
    },
    {
      id: "agents-md",
      layout: "code",
      title: "Las reglas del proyecto",
      language: "markdown",
      code: "# AGENTS.md\n- Python 3.12 con FastAPI; Next.js con TypeScript estricto.\n- Nada de `any`: los tipos son la documentación.\n- Todo cambio de comportamiento lleva su test.\n- Nunca subas secretos ni archivos .env al repositorio.",
      caption:
        "El contexto que la IA lee en cada tarea: tus estándares, por escrito.",
      notes:
        "Sirve igual para personas: es lo primero que lee alguien nuevo en el equipo.",
    },
    {
      id: "data-evolution",
      layout: "two-column",
      title: "Del prototipo al producto: los datos",
      columns: [
        {
          heading: "Prototipo: un archivo JSON",
          items: [
            "Cero configuración",
            "Ideal para validar en días",
            "Se rompe con varios usuarios a la vez",
          ],
        },
        {
          heading: "Producto: PostgreSQL",
          items: [
            "Relaciones y transacciones",
            "Migraciones versionadas",
            "Escala cuando llegan los clientes",
          ],
        },
      ],
      notes:
        "El truco no es elegir bien el primer día, sino poder cambiar sin reescribir. Siguiente diapositiva.",
    },
    {
      id: "repository",
      layout: "code",
      title: "Un contrato, dos implementaciones",
      language: "python",
      code: "class TurnoRepo(Protocol):\n    def disponibles(self, dia: date) -> list[Turno]: ...\n\nclass JsonTurnoRepo:  # prototipo: un archivo turnos.json\n    ...\n\nclass SqlTurnoRepo:  # producto: PostgreSQL con SQLAlchemy\n    ...",
      caption:
        "La lógica de negocio no sabe dónde viven los datos: pasar de JSON a SQL es cambiar una línea.",
      notes:
        "Ejemplo de gestión de turnos (barberías, consultorios). El patrón se llama repositorio.",
    },
    {
      id: "case-intro",
      layout: "statement",
      statement:
        "Caso práctico: un laboratorio calcula pérdidas en tuberías ==a mano, en Excel==.",
      emphasis:
        "Lo convertimos en una aplicación web, con estándares, en minutos.",
      notes:
        "Elegido para que conecte con ingeniería civil, mecánica y ambiental. Si el público es de sistemas, sirve igual: es lógica de negocio pura.",
    },
    {
      id: "case-logic",
      layout: "code",
      title: "1. La lógica: una función pura",
      language: "python",
      code: 'def perdida_hazen_williams(caudal: float, diametro: float,\n                           longitud: float, c: float = 130) -> float:\n    """Pérdida de carga en metros (SI): Q en m³/s, D y L en metros."""\n    return 10.67 * longitud * caudal**1.852 / (c**1.852 * diametro**4.87)',
      caption:
        "La fórmula de Hazen-Williams: tipada, documentada y sin efectos secundarios.",
      notes:
        "C = 130 es un valor típico para tuberías de acero nuevas o PVC envejecido. Una función pura es la parte más fácil de probar y de pedirle a la IA.",
    },
    {
      id: "case-test",
      layout: "code",
      title: "2. El test, antes que la interfaz",
      language: "python",
      code: "def test_perdida_crece_con_el_caudal():\n    base = perdida_hazen_williams(0.01, 0.1, 100)\n    assert perdida_hazen_williams(0.02, 0.1, 100) > base\n\ndef test_valor_de_referencia():\n    # 10 L/s en 100 m de tubería de 100 mm\n    perdida = perdida_hazen_williams(0.01, 0.1, 100)\n    assert perdida == pytest.approx(1.90, rel=0.01)",
      caption:
        "Si la IA cambia la fórmula por error, el test lo detecta. Así se verifica.",
      notes:
        "El valor de referencia sale de calcularlo una vez a mano o con el Excel del laboratorio. Ese Excel se convierte en el test.",
    },
    {
      id: "case-api",
      layout: "code",
      title: "3. La API",
      language: "python",
      code: 'class Tramo(BaseModel):\n    caudal: PositiveFloat\n    diametro: PositiveFloat\n    longitud: PositiveFloat\n@app.post("/perdida")\ndef perdida(t: Tramo) -> dict[str, float]:\n    metros = perdida_hazen_williams(t.caudal, t.diametro, t.longitud)\n    return {"perdida_m": metros}',
      caption:
        "FastAPI valida la entrada: un diámetro negativo ni siquiera llega a la fórmula.",
    },
    {
      id: "case-ui",
      layout: "code",
      title: "4. La interfaz",
      language: "typescript",
      code: '"use server";\nexport async function calcular(form: FormData) {\n  const res = await fetch(`${process.env.API_URL}/perdida`, {\n    method: "POST", headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(Object.fromEntries(form)),\n  });\n  return (await res.json()) as { perdida_m: number };\n}',
      caption:
        "Una server action de Next.js: el formulario llama a la API sin exponerla al navegador.",
    },
    {
      id: "case-flow",
      layout: "diagram",
      title: "El flujo completo",
      source:
        "flowchart LR\n  u[Formulario Next.js] --> a[API FastAPI]\n  a --> f[Función tipada]\n  g[git push] --> c[CI: ruff + pytest]\n  c --> d[Despliegue]",
      caption:
        "Arriba lo que ve el usuario; abajo lo que garantiza que nada se rompa en cada cambio.",
      notes:
        "Si hay tiempo, demo en vivo: pedirle al agente que agregue el cálculo de velocidad del flujo, ver cómo escribe el test y correrlo.",
    },
    {
      id: "quality",
      layout: "bullets",
      title: "Calidad desde el primer día",
      build: true,
      items: [
        "Git desde el primer commit, con ramas y pull requests",
        "Contratos claros: tipos, validación y APIs versionadas",
        "Tests que corren solos en cada push (CI)",
        "Linters y formateadores: el estilo no se discute",
        "Variables de entorno: nunca secretos en el código",
        "Un README y las decisiones importantes por escrito",
      ],
      notes:
        "Nada de esto es burocracia: es lo que permite cambiar rápido sin miedo, que es exactamente lo que necesita un Micro-SaaS.",
    },
    {
      id: "teachers-engineering",
      layout: "bullets",
      title: "Para docentes: estándares desde el primer semestre",
      build: true,
      items: [
        "Entregas por pull request, con revisión entre pares",
        "Un pipeline de CI como parte de la nota",
        "Tests como especificación: el enunciado viene con tests",
        "Proyectos que sobreviven al semestre y pasan a otro curso",
      ],
      notes:
        "La brecha academia-industria se cierra más con hábitos que con tecnologías de moda.",
    },

    // ── 04 · Micro-SaaS ──────────────────────────────────────
    {
      id: "part-saas",
      layout: "section",
      number: "04",
      title: "El Micro-SaaS universitario",
      subtitle: "Del prototipo al ingreso real.",
    },
    {
      id: "what-saas",
      layout: "icons-grid",
      title: "¿Qué es un Micro-SaaS?",
      build: true,
      items: [
        {
          icon: "target",
          title: "Nicho",
          body: "Un problema concreto para un grupo concreto.",
        },
        {
          icon: "users",
          title: "Pequeño",
          body: "Lo operan una o pocas personas.",
        },
        {
          icon: "repeat",
          title: "Recurrente",
          body: "Suscripción mensual o anual, no un pago único.",
        },
        {
          icon: "store",
          title: "B2B local",
          body: "Comercios, consultorios y colegios de tu ciudad.",
        },
      ],
      notes:
        "No es una startup que busca inversión: es un negocio pequeño, rentable y manejable, que puede crecer o no.",
    },
    {
      id: "ideas",
      layout: "bullets",
      title: "Ideas para empezar",
      build: true,
      items: [
        "Turnos y recordatorios para barberías y consultorios",
        "Inventario simple para tiendas de barrio",
        "Reservas de laboratorios y equipos de la facultad",
        "Calculadoras técnicas para ingenieros, como la de tuberías",
        "Reportes automáticos para pequeños negocios",
      ],
      notes:
        "Ninguna idea es original, y está bien: lo valioso es ejecutarla para un nicho que conoces mejor que nadie.",
    },
    {
      id: "launch",
      layout: "bullets",
      title: "Lanzamiento exprés",
      build: true,
      items: [
        "**Semana 1**: 10 conversaciones con personas que viven el problema",
        "**Semana 2**: una landing con lista de espera o preventa",
        "**Semanas 3 y 4**: un MVP con una sola funcionalidad",
        "**Semana 5**: 3 usuarios reales usándolo, y cobra aunque sea poco",
        "**Después**: medir, escuchar e iterar",
      ],
      notes:
        "Validar antes de escribir código masivo. Si nadie se anota en la lista de espera, ahorraste meses.",
    },
    {
      id: "math",
      layout: "stats",
      title: "Las cuentas de un Micro-SaaS",
      stats: [
        { value: 30, label: "comercios de tu ciudad" },
        { value: 15, prefix: "$", label: "al mes cada uno" },
        { value: 450, prefix: "$", label: "de ingreso recurrente mensual" },
      ],
      notes:
        "Ejemplo ilustrativo, no una promesa. Los costos al inicio pueden ser casi cero con los planes gratuitos de hosting y base de datos. Treinta clientes locales es un objetivo alcanzable para un estudiante.",
    },
    {
      id: "balance",
      layout: "bullets",
      title: "El balance de vida",
      build: true,
      items: [
        "Bloques fijos de 1 a 2 horas, no maratones de fin de semana",
        "En época de exámenes, la carrera primero: el proyecto espera",
        "Un solo proyecto a la vez",
        "Automatiza lo repetitivo: despliegues, cobros y recordatorios",
        "Busca un socio que venda mientras tú construyes",
        "Duerme: el burnout no escala",
      ],
      notes:
        "La salud mental no es negociable. Un proyecto que te cuesta la carrera o la salud no es un buen negocio.",
    },
    {
      id: "teachers-saas",
      layout: "statement",
      statement: "La universidad puede ser ==el primer cliente==.",
      emphasis:
        "Proyectos de titulación que terminan en productos que usa la comunidad.",
      notes:
        "Para docentes y autoridades: vincular tesis con necesidades de la propia institución y de la comunidad es investigación aplicada con impacto medible.",
    },
    {
      id: "this-week",
      layout: "bullets",
      title: "Tu plan para esta semana",
      build: true,
      items: [
        "Anota 3 problemas que viste hoy",
        "Habla con 5 personas que viven el más fuerte",
        "Escribe en una frase quién lo sufre y cuánto le cuesta",
        "Construye la versión más pequeña que lo resuelva",
        "Muéstrala y pide feedback, o un pago",
      ],
      notes:
        "Cierre del contenido. Que se lleven algo accionable para mañana, no solo inspiración.",
    },

    // ── 05 · Preguntas ───────────────────────────────────────
    {
      id: "qa",
      layout: "closing",
      title: "¿Preguntas?",
      subtitle:
        "Herramientas, primeros proyectos o el futuro de enseñar software con IA: hablemos.",
      links: [
        {
          label: "linkedin.com/in/listerineh",
          href: "https://www.linkedin.com/in/listerineh",
        },
        {
          label: "GDG Quito",
          href: "https://www.linkedin.com/company/gdg-quito",
        },
        {
          label: "listerineh.dev/slides",
          href: "https://listerineh.dev/slides",
        },
      ],
      notes:
        "Preguntas semilla por si nadie empieza: ¿Con qué stack empiezo? ¿Cómo cobro siendo estudiante? Para docentes: ¿cómo evaluamos un trabajo hecho con IA?",
    },
  ],
  // English: the same slides, translated. Only text that differs is stored (see i18n.ts).
  translations: {
    en: {
      title: "From idea to Micro-SaaS",
      description:
        "Real innovation, agile engineering and AI for students: how to go from a problem in your community to a software product built to industry standards, and charge for it without neglecting your degree.",
      slides: {
        cover: {
          eyebrow: "November 11, 2026",
          title: "From idea to Micro-SaaS",
          subtitle:
            "Real innovation, agile engineering and AI for students in the era of modern software.",
          notes:
            "Target length: 60 minutes + questions. Modules of ~12 minutes. Greet students and professors separately: this talk has something for each.",
        },
        speaker: {
          photo: {
            src: "/images/sebas-playing.webp",
            alt: "Sebastian Alvarez smiling with an electric guitar",
          },
          greeting: "Hi, I'm",
          bio: "I build backends, web products and tools with applied AI. I was also a student trying to build things between exams.",
          notes:
            "Short intro (30 seconds). Connect: I also sat where you are, with exams and a half-finished project.",
        },
        hook: {
          statement:
            "The question isn't ==what I can code==, but ==which problem is worth solving==.",
          emphasis: "That's the whole talk in one line.",
          notes:
            "3-second pause. Ask the audience: who has a project in a repository nobody uses? Raise your own hand.",
        },
        agenda: {
          items: [
            "**01** The DNA of innovation: the street vs. the lab",
            "**02** From programmer to conductor",
            "**03** Industrialized engineering: skills and standards",
            "**04** The student Micro-SaaS",
            "**05** Questions",
          ],
          notes: "Mention that each module ends with a slide for professors.",
        },
        "part-innovation": {
          title: "The DNA of innovation",
          subtitle: "The street vs. the lab.",
        },
        "street-lab": {
          title: "Two ways to start a project",
          columns: [
            {
              heading: "From the lab",
              items: [
                "I start with the trendy technology",
                "Then I look for who it's for",
                "Nobody asked for it, nobody uses it",
                "It ends up in a forgotten repository",
              ],
            },
            {
              heading: "From the street",
              items: [
                "I start with a pain someone lives with",
                "There's someone to ask",
                "If it works, someone uses it",
                "And maybe pays for it",
              ],
            },
          ],
          notes:
            "The locked-in inventor fallacy: building technology in search of a problem. It's nobody's fault: that's how course projects are usually framed.",
        },
        "no-market-need": {
          statement:
            "Almost ==4 in 10== startups that shut down say the same thing: nobody needed what they built.",
          emphasis:
            "They didn't fail because of bad code. They failed because they didn't start from a real problem.",
          notes:
            "Source: CB Insights, an analysis of 101 startup post-mortems: 'no market need' was the most cited reason (42%). Other updates of the study put it around 35%. If a student asks: these are reasons stated by the founders.",
        },
        "where-to-look": {
          title: "Where the problems are",
          items: [
            {
              icon: "school",
              title: "Your faculty",
              body: "Enrollment, schedules, lab bookings.",
            },
            {
              icon: "store",
              title: "Neighborhood shops",
              body: "Inventory in a notebook, appointments over WhatsApp.",
            },
            {
              icon: "flask-conical",
              title: "Labs",
              body: "Repetitive calculations in Excel sheets.",
            },
            {
              icon: "house",
              title: "Your family",
              body: "Your parents', uncles' or neighbors' business.",
            },
            {
              icon: "sheet",
              title: "Manual processes",
              body: "Everything someone copies and pastes every week.",
            },
            {
              icon: "message-circle",
              title: "Complaints",
              body: "What people keep repeating out loud is a map.",
            },
          ],
          notes:
            "Ask the audience for an example from their own faculty. Lab bookings or enrollment almost always come up.",
        },
        "real-pain": {
          title: "How to spot a real pain",
          items: [
            "Someone solves it **by hand**, every week",
            "An Excel file or a WhatsApp group holds the process together",
            "They already pay for something worse, or pay with their time",
            "You can explain it in **one sentence**",
            "You can talk this week to **5 people** who live it",
          ],
          notes:
            "If at least three don't apply, it's probably not a pain, just an annoyance.",
        },
        "purpose-loop": {
          title: "Engineering with purpose",
          source:
            "flowchart LR\n  o[Observe] --> e[Interview]\n  e --> p[Prototype]\n  p --> m[Measure]\n  m -->|learn| o",
          caption:
            "Technology exists to remove friction from someone's life. The loop doesn't end at the code.",
          notes: "Each turn of the loop should take days, not months.",
        },
        "teachers-innovation": {
          title: "For professors: real problems in the classroom",
          items: [
            "Projects that start from a problem with **a real user**",
            "Grade the validation, not just the code delivered",
            'Theses with an external "client": a shop, a lab, an NGO',
            "Applied research with local industry and the community",
            "Reward the right question, not just the right answer",
          ],
          notes:
            "Message for professors: critical thinking is trained by spotting problems, not only by solving exercises that are already framed.",
        },
        "part-ai": {
          title: "From programmer to conductor",
          subtitle: "How AI changed the way software is built.",
        },
        bottleneck: {
          statement:
            "The student's bottleneck: ==studying, passing exams and building a business== at the same time.",
          emphasis: "Without a method, that ends in burnout.",
          notes:
            "Ask: how many of you have dropped a personal project because of exams? It's normal. The answer isn't working more hours, it's working differently.",
        },
        "ai-numbers": {
          title: "AI is already part of the job",
          stats: [
            { value: 83, suffix: "%", label: "of developers use AI tools" },
            {
              value: 66,
              suffix: "%",
              label: "use coding assistants or agents",
            },
            {
              value: 48,
              suffix: "%",
              label: "only trust it when they can verify it",
            },
          ],
          notes:
            "Source: Stack Overflow Developer Survey 2026 (about 30,900 responses from 169 countries). Only 17% say they don't use AI. The third number matters most: half trust AI only when they can easily verify the result. Verifying is the skill.",
        },
        "then-now": {
          title: "How the work changed",
          columns: [
            {
              heading: "Before",
              items: [
                "Write every line by hand",
                "Memorize syntax",
                "Search forums for the answer",
                "Test at the end, if there was time",
              ],
            },
            {
              heading: "Now",
              items: [
                "Design the architecture and the contracts",
                "Describe the intent with good context",
                "Review and fix what the AI proposes",
                "Tests from the start as a safety net",
              ],
            },
          ],
          notes:
            "The senior approach: code is written faster than ever; what's scarce is knowing what to build and how to check it's right.",
        },
        "conductor-flow": {
          title: "The conductor's workflow",
          source:
            "flowchart LR\n  i[Idea] --> s[Specification]\n  s --> a[AI agent]\n  a --> r[Human review]\n  r --> t[Tests and CI]\n  t --> d[Production]\n  r -->|fix| s",
          caption:
            "You decide what gets built and what gets accepted. The AI works within those limits.",
          notes:
            "Point at the arrow going back: reviewing and fixing the spec is part of the job, not a failure.",
        },
        stack: {
          title: "A small, modern stack",
          items: [
            {
              icon: "layout-template",
              title: "Next.js + TypeScript",
              body: "The web interface, with strict types.",
            },
            {
              icon: "code",
              title: "Python",
              body: "Business logic, data and AI, with FastAPI.",
            },
            {
              icon: "server",
              title: "Go",
              body: "Fast services that deploy as a single binary.",
            },
            {
              icon: "database",
              title: "PostgreSQL",
              body: "The data, once the prototype becomes a product.",
            },
            {
              icon: "cloud",
              title: "Managed deployment",
              body: "Vercel or Cloud Run: no servers to run.",
            },
            {
              icon: "credit-card",
              title: "Payments",
              body: "A local gateway or a merchant of record.",
            },
          ],
          notes:
            "You don't need all of it on day one. An MVP can be just Next.js with a managed database. Go and Python come in when the logic calls for them.",
        },
        "ai-multiplies": {
          statement:
            "AI ==multiplies== what you know. If you don't understand the code, it multiplies your mistakes.",
          emphasis: "Using it well is a skill you train.",
          notes:
            "A data point for the debate: in a METR controlled trial (2025), experienced developers took 19% longer with AI on their own projects, while believing they were 20% faster. METR now calls it historical, but the lesson holds: perception misleads, so measure and verify.",
        },
        "teachers-ai": {
          title: "For professors: AI in the classroom",
          items: [
            "Grade the reasoning: **why** this architecture and not another",
            "Ask students to explain and defend the code they hand in",
            "Teach how to review other people's code, the AI's included",
            "More systems design, less memorizing syntax",
            "Clear rules of use instead of bans nobody follows",
          ],
          notes:
            "In the same Stack Overflow survey, only one in four people say their employer has an official AI policy. The university can get ahead.",
        },
        "part-engineering": {
          title: "Industrialized engineering",
          subtitle: "Fast doesn't mean garbage code.",
        },
        skills: {
          title: "What is a skill?",
          items: [
            "Reusable instructions an agent loads **when it needs them**",
            "They capture how your team works: standards, steps and examples",
            "They're versioned in Git like any other code",
            "The idea isn't new: templates, generators and design systems",
          ],
          notes:
            "A skill is packaged engineering knowledge: what a senior would explain to a junior, written once and applied every time.",
        },
        "skill-example": {
          title: "A skill, inside",
          code: "---\nname: new-api\ndescription: Creates a FastAPI endpoint with validation, tests and docs.\n---\n1. Define the model with Pydantic and strict types.\n2. Write the test first with pytest.\n3. Implement the endpoint and run ruff and pytest before finishing.",
          caption:
            "A text file: a name, when to use it and the steps you always follow.",
        },
        "agents-md": {
          title: "The project's rules",
          code: "# AGENTS.md\n- Python 3.12 with FastAPI; Next.js with strict TypeScript.\n- No `any`: types are the documentation.\n- Every behavior change comes with its test.\n- Never commit secrets or .env files.",
          caption:
            "The context the AI reads on every task: your standards, in writing.",
          notes:
            "It works for people too: it's the first thing someone new on the team reads.",
        },
        "data-evolution": {
          title: "From prototype to product: the data",
          columns: [
            {
              heading: "Prototype: a JSON file",
              items: [
                "Zero setup",
                "Great for validating in days",
                "Breaks with several users at once",
              ],
            },
            {
              heading: "Product: PostgreSQL",
              items: [
                "Relations and transactions",
                "Versioned migrations",
                "Scales when customers arrive",
              ],
            },
          ],
          notes:
            "The trick isn't choosing right on day one, but being able to switch without rewriting. Next slide.",
        },
        repository: {
          title: "One contract, two implementations",
          code: "class BookingRepo(Protocol):\n    def available(self, day: date) -> list[Booking]: ...\n\nclass JsonBookingRepo:  # prototype: a bookings.json file\n    ...\n\nclass SqlBookingRepo:  # product: PostgreSQL with SQLAlchemy\n    ...",
          caption:
            "The business logic doesn't know where the data lives: going from JSON to SQL is changing one line.",
          notes:
            "An appointment-booking example (barbershops, clinics). The pattern is called a repository.",
        },
        "case-intro": {
          statement:
            "Case study: a lab computes pipe head loss ==by hand, in Excel==.",
          emphasis:
            "We turn it into a web app, to industry standards, in minutes.",
          notes:
            "Chosen to connect with civil, mechanical and environmental engineering. For a computer science audience it works just as well: it's pure business logic.",
        },
        "case-logic": {
          title: "1. The logic: a pure function",
          code: 'def head_loss_hazen_williams(flow: float, diameter: float,\n                             length: float, c: float = 130) -> float:\n    """Head loss in meters (SI): Q in m³/s, D and L in meters."""\n    return 10.67 * length * flow**1.852 / (c**1.852 * diameter**4.87)',
          caption:
            "The Hazen-Williams formula: typed, documented and free of side effects.",
          notes:
            "C = 130 is a typical value for new steel or aged PVC pipe. A pure function is the easiest part to test and to ask the AI for.",
        },
        "case-test": {
          title: "2. The test, before the interface",
          code: "def test_loss_grows_with_flow():\n    base = head_loss_hazen_williams(0.01, 0.1, 100)\n    assert head_loss_hazen_williams(0.02, 0.1, 100) > base\n\ndef test_reference_value():\n    # 10 L/s through 100 m of 100 mm pipe\n    loss = head_loss_hazen_williams(0.01, 0.1, 100)\n    assert loss == pytest.approx(1.90, rel=0.01)",
          caption:
            "If the AI changes the formula by mistake, the test catches it. That's how you verify.",
          notes:
            "The reference value comes from computing it once by hand or with the lab's Excel. That Excel becomes the test.",
        },
        "case-api": {
          title: "3. The API",
          code: 'class Segment(BaseModel):\n    flow: PositiveFloat\n    diameter: PositiveFloat\n    length: PositiveFloat\n@app.post("/head-loss")\ndef head_loss(s: Segment) -> dict[str, float]:\n    meters = head_loss_hazen_williams(s.flow, s.diameter, s.length)\n    return {"head_loss_m": meters}',
          caption:
            "FastAPI validates the input: a negative diameter never reaches the formula.",
        },
        "case-ui": {
          title: "4. The interface",
          code: '"use server";\nexport async function calculate(form: FormData) {\n  const res = await fetch(`${process.env.API_URL}/head-loss`, {\n    method: "POST", headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(Object.fromEntries(form)),\n  });\n  return (await res.json()) as { head_loss_m: number };\n}',
          caption:
            "A Next.js server action: the form calls the API without exposing it to the browser.",
        },
        "case-flow": {
          title: "The full flow",
          source:
            "flowchart LR\n  u[Next.js form] --> a[FastAPI API]\n  a --> f[Typed function]\n  g[git push] --> c[CI: ruff + pytest]\n  c --> d[Deploy]",
          caption:
            "On top, what the user sees; below, what makes sure nothing breaks on every change.",
          notes:
            "If there's time, live demo: ask the agent to add the flow velocity calculation, watch it write the test, and run it.",
        },
        quality: {
          title: "Quality from day one",
          items: [
            "Git from the first commit, with branches and pull requests",
            "Clear contracts: types, validation and versioned APIs",
            "Tests that run on their own on every push (CI)",
            "Linters and formatters: style isn't up for debate",
            "Environment variables: never secrets in the code",
            "A README and the important decisions in writing",
          ],
          notes:
            "None of this is bureaucracy: it's what lets you change things fast without fear, which is exactly what a Micro-SaaS needs.",
        },
        "teachers-engineering": {
          title: "For professors: standards from the first semester",
          items: [
            "Hand-ins through pull requests, with peer review",
            "A CI pipeline as part of the grade",
            "Tests as the specification: the assignment comes with tests",
            "Projects that outlive the semester and pass to the next course",
          ],
          notes:
            "The gap between academia and industry closes more through habits than through trendy technologies.",
        },
        "part-saas": {
          title: "The student Micro-SaaS",
          subtitle: "From prototype to real income.",
        },
        "what-saas": {
          title: "What is a Micro-SaaS?",
          items: [
            {
              icon: "target",
              title: "Niche",
              body: "A specific problem for a specific group.",
            },
            {
              icon: "users",
              title: "Small",
              body: "Run by one or a few people.",
            },
            {
              icon: "repeat",
              title: "Recurring",
              body: "A monthly or yearly subscription, not a one-off payment.",
            },
            {
              icon: "store",
              title: "Local B2B",
              body: "Shops, clinics and schools in your city.",
            },
          ],
          notes:
            "It's not a startup chasing investment: it's a small, profitable, manageable business that may or may not grow.",
        },
        ideas: {
          title: "Ideas to start with",
          items: [
            "Appointments and reminders for barbershops and clinics",
            "Simple inventory for neighborhood shops",
            "Booking labs and equipment at the faculty",
            "Technical calculators for engineers, like the pipe one",
            "Automatic reports for small businesses",
          ],
          notes:
            "No idea is original, and that's fine: what matters is executing it for a niche you know better than anyone.",
        },
        launch: {
          title: "Fast launch",
          items: [
            "**Week 1**: 10 conversations with people who live the problem",
            "**Week 2**: a landing page with a waitlist or presale",
            "**Weeks 3 and 4**: an MVP with a single feature",
            "**Week 5**: 3 real users using it, and charge, even a little",
            "**After that**: measure, listen and iterate",
          ],
          notes:
            "Validate before writing a mountain of code. If nobody joins the waitlist, you just saved months.",
        },
        math: {
          title: "The math of a Micro-SaaS",
          stats: [
            { value: 30, label: "shops in your city" },
            { value: 15, prefix: "$", label: "a month each" },
            { value: 450, prefix: "$", label: "in monthly recurring revenue" },
          ],
          notes:
            "An illustrative example, not a promise. Costs at the start can be close to zero with free hosting and database tiers. Thirty local customers is a reachable goal for a student.",
        },
        balance: {
          title: "Life balance",
          items: [
            "Fixed 1 to 2 hour blocks, not weekend marathons",
            "During exams, your degree comes first: the project can wait",
            "One project at a time",
            "Automate the repetitive: deploys, billing and reminders",
            "Find a partner who sells while you build",
            "Sleep: burnout doesn't scale",
          ],
          notes:
            "Mental health isn't negotiable. A project that costs you your degree or your health isn't a good business.",
        },
        "teachers-saas": {
          statement: "The university can be ==the first customer==.",
          emphasis: "Theses that end up as products the community uses.",
          notes:
            "For professors and leadership: tying theses to the needs of the institution itself and the community is applied research with measurable impact.",
        },
        "this-week": {
          title: "Your plan for this week",
          items: [
            "Write down 3 problems you saw today",
            "Talk to 5 people who live the biggest one",
            "Write in one sentence who suffers it and what it costs them",
            "Build the smallest version that solves it",
            "Show it and ask for feedback, or a payment",
          ],
          notes:
            "End of the content. They should leave with something actionable for tomorrow, not just inspiration.",
        },
        qa: {
          title: "Questions?",
          subtitle:
            "Tools, first projects or the future of teaching software with AI: let's talk.",
          notes:
            "Seed questions in case nobody starts: Which stack do I start with? How do I charge as a student? For professors: how do we grade work done with AI?",
        },
      },
    },
  },
};
