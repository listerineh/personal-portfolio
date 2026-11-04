import type { DeckInput } from "../schema";

/**
 * "De Endpoints a Enjambres de Agentes", a 45-minute talk on backend patterns for autonomous systems on Google Cloud,
 * first given in Spanish at Universidad Indoamérica (13 November 2026). The English translation is kept for a later
 * DevFest. The demo is CodeSentry Swarm (github.com/listerineh/codesentry-swarm): code samples are shortened from that
 * repo and every measured figure comes from its deployment on 4 November 2026 (docs/verified-facts.md). Review the
 * platform facts the week of the event. Ships as a draft: the first save from the editor stores it, and opening each
 * diagram slide in each language draws its SVG. Diagrams stick to plain rectangles: a stadium or cylinder node adds about
 * 30 KB per SVG, and a save carrying the whole deck has to fit the 1 MB Server Action limit and Firestore's 1 MiB document.
 */
export const agentsBackendGcp: DeckInput = {
  slug: "agents-backend-gcp",
  title: "De Endpoints a Enjambres de Agentes",
  description:
    "Patrones de arquitectura backend en GCP para sistemas autónomos, y cómo CodeSentry Swarm los aplica para auditar pull requests, probar su hipótesis en un sandbox y proponer un fix.",
  lang: "es",
  status: "draft",
  accent: "#1a73e8",
  event: {
    name: "Universidad Indoamérica",
    date: "2026-11-13",
  },
  updatedAt: "2026-11-05T00:00:00.000Z",
  version: 1,
  slides: [
    {
      id: "cover",
      layout: "title",
      eyebrow: "13 de noviembre de 2026 · Universidad Indoamérica",
      title: "De APIs REST a Sistemas Autónomos",
      subtitle:
        "Patrones de arquitectura backend en GCP para desacoplar el *caos probabilístico* de tu core, y un enjambre real que los aplica.",
      notes:
        "Tiempos para 45 minutos: apertura 3, problema 6, patrones 11, CodeSentry 8, demo 6, producción 4, preguntas 7. Si vas justo, salta las láminas marcadas como opcionales en sus notas.",
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
      bio: "Construyo backends en Python, infraestructura cloud y productos con IA aplicada.",
      highlights: ["GDG Quito", "Quito, Ecuador"],
      handle: "@listerineh",
      notes: "Treinta segundos. Lo importante viene ahora.",
    },
    {
      id: "agenda",
      layout: "bullets",
      title: "Qué vamos a ver",
      build: true,
      items: [
        "**01** Por qué un agente rompe un backend clásico",
        "**02** Cuatro patrones para ponerle una frontera",
        "**03** CodeSentry Swarm: los patrones en un sistema real",
        "**04** Demo: un PR real, de punta a punta",
        "**05** Producción: costos, tropiezos y lo que falta",
      ],
      notes:
        "La charla va de lo general a lo concreto. Todo lo que afirme sobre CodeSentry se puede comprobar: el código es público.",
    },
    {
      id: "hook",
      layout: "statement",
      statement:
        "Un agente no es un endpoint lento: ==rompe el contrato== de tu backend.",
      emphasis:
        "Request → DB → Response asume una entrada, un resultado y un tiempo predecible. Un agente no promete ninguno de los tres.",
      notes:
        "Pregunta rápida: ¿quién tiene ya un endpoint que llama a un LLM? ¿Quién sabe cuánto tarda en el peor caso? Esa segunda pregunta es la charla.",
    },

    // ── 01 · El problema ──────────────────────────────────────
    {
      id: "part-problem",
      layout: "section",
      number: "01",
      title: "El problema",
      subtitle: "Lo que funciona en la demo y se cae en producción.",
    },
    {
      id: "wrapper",
      layout: "code",
      title: "La falsa promesa del wrapper",
      language: "python",
      code: '@app.post("/api/chat")\ndef chat(body: ChatRequest):\n    # Un worker bloqueado mientras el modelo piensa\n    reply = llm.generate(body.message)\n    # Código del modelo, dentro de tu proceso\n    result = exec_tool(reply.code)\n    # Un reintento del cliente cobra todo otra vez\n    return db.save(reply, result)',
      caption: "Ocho líneas que pasan cualquier demo y ningún incidente.",
      notes:
        "Todos escribimos esto y funciona en la demo. Lee los tres comentarios: cada uno es una clase de incidente. La siguiente lámina los nombra.",
    },
    {
      id: "failures",
      layout: "icons-grid",
      title: "Qué se rompe en producción",
      build: true,
      items: [
        {
          icon: "timer",
          title: "Timeouts",
          body: "El proxy corta y el trabajo pagado se pierde.",
        },
        {
          icon: "gauge",
          title: "Thread starvation",
          body: "Cada llamada retiene un worker. Cae todo.",
        },
        {
          icon: "coins",
          title: "Costos sin techo",
          body: "Cada paso paga de nuevo todo el contexto.",
        },
        {
          icon: "repeat",
          title: "Sin idempotencia",
          body: "Un reintento repite el cobro y los efectos.",
        },
        {
          icon: "bug",
          title: "Código no confiable",
          body: "Corre en tu proceso, con tus credenciales.",
        },
        {
          icon: "message-square-warning",
          title: "Inyección de prompt",
          body: "Un diff puede traer órdenes para el modelo.",
        },
      ],
      notes:
        "Seis problemas, y ninguno se arregla con un mejor prompt. Los dos primeros son de infraestructura, los dos siguientes de dinero y los dos últimos de seguridad.",
    },
    {
      id: "contract",
      layout: "two-column",
      title: "Cambió el contrato",
      build: true,
      columns: [
        {
          heading: "Backend clásico",
          items: [
            "Una entrada, una salida conocida",
            "Latencia predecible",
            "Código que tú escribiste",
            "El estado vive en tu base de datos",
          ],
        },
        {
          heading: "Agente",
          items: [
            "Razona, actúa, observa y repite",
            "==N pasos==: no sabes cuántos",
            "Código que nadie revisó",
            "Contexto que crece en cada paso",
          ],
        },
      ],
      notes:
        "El backend no se vuelve probabilístico: lo que hacemos es poner una frontera alrededor de la parte que sí lo es.",
    },
    {
      id: "react",
      layout: "diagram",
      title: "El bucle que tu backend no esperaba",
      source:
        "flowchart LR\n  t[Tarea] --> r[Razona]\n  r --> a[Actúa<br/>herramienta o código]\n  a --> o[Observa<br/>el resultado]\n  o -->|sigue| r\n  o -->|terminó| f[Respuesta]",
      caption:
        "ReAct: el número de vueltas decide la latencia y el costo, y no lo conoces de antemano.",
      notes:
        "Reason, Act, Observe. N es una variable aleatoria. Todo lo que dimensionas en un backend, como timeouts, workers o presupuesto, depende de ella.",
    },
    {
      id: "limits",
      layout: "stats",
      title: "Y la plataforma tiene límites",
      stats: [
        { value: 5, suffix: " min", label: "default de Cloud Run" },
        { value: 60, suffix: " min", label: "máximo de Cloud Run" },
        { value: 600, suffix: " s", label: "push máximo de Pub/Sub" },
        { value: 30, suffix: " s", label: "default de un balanceador" },
      ],
      citation:
        "Docs de [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/request-timeout), [Pub/Sub](https://docs.cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions) y [Load Balancing](https://docs.cloud.google.com/load-balancing/docs/backend-service), noviembre de 2026.",
      notes:
        "Mito común: el balanceador no te corta a los 30 s en Cloud Run. Ese es el default de backends normales; con NEG serverless son 60 minutos. Aun así, tener una hora no significa que debas bloquear una hora.",
    },
    {
      id: "thesis",
      layout: "statement",
      statement:
        "No hagas determinista al agente: ==ponle una frontera==.",
      emphasis:
        "El caos vive detrás de una cola y en un sandbox. Las decisiones importantes las toma código.",
      notes:
        "Esta es la tesis. Los cuatro patrones que siguen son esa frontera, y CodeSentry es la prueba de que se puede construir.",
    },

    // ── 02 · Patrones ─────────────────────────────────────────
    {
      id: "part-patterns",
      layout: "section",
      number: "02",
      title: "Cuatro patrones",
      subtitle: "Desacoplar, aislar, recordar y validar.",
    },
    {
      id: "async-reply",
      layout: "diagram",
      title: "Patrón 1: nunca bloquees, encola",
      source:
        "flowchart LR\n  c[Cliente] -->|POST| a[API<br/>Cloud Run]\n  a -->|202 + task_id| c\n  a --> p[Pub/Sub]\n  p --> w[Agente]\n  w -->|progreso| f[Firestore]",
      caption:
        "Async Request-Reply: `202` con un `task_id`, reintentos con backoff, dead letter y progreso por SSE.",
      notes:
        "El 202 protege al core: ningún worker espera al modelo. El progreso se lee de Firestore y la API lo sirve por SSE. En la demo el cliente es el webhook de GitHub, firmado con HMAC. Eventarc conecta el resto: cuando el sandbox deja su resultado en Cloud Storage, Eventarc avisa.",
    },
    {
      id: "idempotency",
      layout: "code",
      title: "Al menos una vez exige idempotencia",
      language: "python",
      code: 'def task_id_for(pr: PullRequestRef) -> str:\n    # Mismo commit, misma tarea\n    key = f"{pr.repo}#{pr.number}@{pr.head_sha}"\n    return uuid.uuid5(NAMESPACE, key).hex\n\nclaim = f"{message.stage.value}-{message.iteration}"\nif not await store.claim(task.id, claim, CLAIM_LEASE_S):\n    return  # otra entrega ya hizo esta etapa',
      caption:
        "Simplificado de `swarm.py`: un webhook o mensaje duplicado no repite trabajo ni cobro.",
      notes:
        "Pub/Sub entrega al menos una vez. Dos cosas lo resuelven: un ID derivado del commit, y un claim por etapa e iteración en Firestore, con transacción y expiración. Hay un test que duplica cada mensaje y comprueba que todo corre una sola vez.",
    },
    {
      id: "failure-modes",
      layout: "two-column",
      title: "No todo fallo merece un reintento",
      columns: [
        {
          heading: "Transitorio: reintenta",
          items: [
            "Timeouts, errores 429 o 5xx y red",
            "Se libera la etapa y Pub/Sub reintenta",
            "Backoff de 10 a 300 s",
            "Tras 5 entregas, dead letter",
          ],
        },
        {
          heading: "Terminal: escala",
          items: [
            "Presupuesto de tokens agotado",
            "El modelo rompe su schema dos veces",
            "3 iteraciones sin un fix que pase",
            "Comenta en el PR y pide a un humano",
          ],
        },
      ],
      notes:
        "Reintentar un fallo terminal es quemar dinero en bucle. En el código son dos caminos: una excepción normal deja que el bus reintente, y TerminalError termina la tarea en needs_human.",
    },
    {
      id: "sandbox",
      layout: "bullets",
      title: "Patrón 2: todo código del LLM es hostil",
      build: true,
      items: [
        "**Cada ejecución en su propio entorno**, efímero y desechable",
        "**Sin red:** egress denegado por defecto",
        "**Sin identidad:** ni credenciales, ni variables, ni metadata server",
        "**Cuotas duras:** CPU, memoria y tiempo",
        "**El código del repo también cuenta:** un PR puede traer sus propios tests",
      ],
      notes:
        "Trata el código generado como un archivo adjunto de un desconocido. Y no solo el generado: en CodeSentry también corren los tests que trae el PR.",
    },
    {
      id: "sandbox-layers",
      layout: "diagram",
      title: "Dos capas, no una",
      source:
        "flowchart LR\n  api[API] -->|2 URLs firmadas| j[Cloud Run Job<br/>microVM gen2]\n  j -->|stdin| s[sandbox do<br/>sin red ni identidad]\n  j -->|resultado| g[Cloud<br/>Storage]",
      caption:
        "Los Jobs corren solo en gen2; gVisor es gen1 y GKE. [Cloud Run sandboxes](https://docs.cloud.google.com/run/docs/code-execution) sigue en Preview.",
      notes:
        "Actualización importante: mucha guía antigua dice que Cloud Run usa gVisor. Hoy gen1 es gVisor, gen2 es una microVM, y los jobs solo corren en gen2. El job lee el paquete y escribe el resultado con 2 URLs firmadas, y su cuenta de servicio no tiene roles. Las URLs firmadas viven en la capa exterior, y el código de la interior no las ve.",
    },
    {
      id: "sandbox-options",
      layout: "icons-grid",
      title: "Dónde correr código generado",
      items: [
        {
          icon: "box",
          title: "Cloud Run sandboxes",
          body: "`sandbox do` en tu contenedor. Preview. La usa la demo.",
        },
        {
          icon: "cloud",
          title: "Code Execution",
          body: "Gestionado por completo, para cualquier framework.",
        },
        {
          icon: "server",
          title: "Agent Sandbox en GKE",
          body: "Autogestionado sobre Kubernetes, con gVisor o microVM.",
        },
        {
          icon: "container",
          title: "Docker en local",
          body: "Modo offline de la demo, ==aún sin probar==.",
        },
      ],
      notes:
        "Opcional si vas justo. Elige por cuánto control quieres. Fuentes en docs/verified-facts.md del repo. Sé honesto con la última: el modo Docker existe, pero no se ha ejecutado de punta a punta.",
    },
    {
      id: "memory",
      layout: "two-column",
      title: "Patrón 3: memoria híbrida",
      columns: [
        {
          heading: "Working memory",
          body: "Firestore o Memorystore. Rápida, por tarea y con TTL.",
          items: [
            "Estado del bucle y checkpoints",
            "Permite pausar para un ==Human-in-the-Loop==",
            "Reanudar sin repetir pasos pagados",
          ],
        },
        {
          heading: "Largo plazo",
          body: "Agent Retrieval, antes Vertex AI Vector Search 2.0.",
          items: [
            "Búsqueda semántica sobre lo aprendido",
            "Embeddings: `gemini-embedding-2`",
            "Cambiar de modelo obliga a re-embeber",
          ],
        },
      ],
      notes:
        "Dos problemas distintos: qué estoy haciendo ahora y qué sé de antes. Si los mezclas, cada paso arrastra todo el historial y lo pagas otra vez. Aclaración: la demo solo implementa la working memory en Firestore, con el estado de cada iteración y escalada a un humano. No tiene memoria de largo plazo.",
    },
    {
      id: "structured",
      layout: "code",
      title: "Patrón 4: Structured Outputs",
      language: "python",
      code: 'response = await client.aio.models.generate_content(\n    model="gemini-3.5-flash-lite",\n    contents=prompt,\n    config=GenerateContentConfig(\n        response_mime_type="application/json",\n        response_schema=Verdict,\n    ),\n)',
      caption:
        "El schema da JSON válido, no la verdad. [Docs de Gemini](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)",
      notes:
        "Sin schema, el modo JSON es solo una pista. Con schema y application/json, Google documenta JSON válido. Eso es sintaxis: `approved: true` puede ser perfectamente válido y perfectamente falso. Por eso la demo vuelve a validar con Pydantic y reintenta una vez si la salida rompe el contrato.",
    },
    {
      id: "gate",
      layout: "code",
      title: "La decisión final es código",
      language: "python",
      code: 'def gate(report: SandboxReport) -> tuple[bool, str]:\n    red, green = report.red, report.green\n    if red.exit_code == 0:\n        return False, "the hypothesis wasn\'t reproduced"\n    if green is None or green.exit_code != 0:\n        return False, "the suite fails with the fix applied"\n    if green.tests_run == 0:\n        return False, "pytest ran no tests"',
      caption:
        "Simplificado de `guardrails.py`: el juez puede rechazar un run verde, pero no aprobar uno rojo.",
      notes:
        "Esta función es el corazón de la charla: unas pocas líneas deterministas deciden. La condición de tests_run existe porque un test puede llamar a os._exit(0) para fingir éxito, y eso tiene su propio test.",
    },

    // ── 03 · CodeSentry Swarm ─────────────────────────────────
    {
      id: "part-swarm",
      layout: "section",
      number: "03",
      title: "CodeSentry Swarm",
      subtitle: "Los cuatro patrones en un sistema que puedes clonar.",
    },
    {
      id: "proposal",
      layout: "statement",
      statement:
        "CodeSentry audita un PR, ==prueba su hipótesis== en un sandbox y propone un fix tipado.",
      emphasis:
        "Un revisor con LLM opina. Este tiene que demostrarlo con un test que falla y luego pasa.",
      notes:
        "La propuesta en una frase. La diferencia con un bot que comenta: aquí nada se publica sin evidencia de ejecución.",
    },
    {
      id: "scope",
      layout: "two-column",
      title: "Qué hace y qué no",
      columns: [
        {
          heading: "Hace",
          items: [
            "Formula una hipótesis sobre el diff",
            "Escribe un test que reproduce el bug",
            "Prueba el fix en un sandbox",
            "Comenta el diff y un reporte JSON",
            "Mide tokens, costo y traza por tarea",
          ],
        },
        {
          heading: "No hace",
          items: [
            "Push ni merge: el merge es humano",
            "Tocar tests, CI o dotfiles",
            "Analizar otros lenguajes: solo Python",
            "Aprender entre tareas",
            "Garantizar el fix: verde es evidencia",
          ],
        },
      ],
      notes:
        "Decir qué no hace es tan importante como lo otro. Es una demo funcional, no un producto. La última línea es clave: un test en verde no prueba que el fix sea correcto.",
    },
    {
      id: "architecture",
      layout: "diagram",
      title: "La arquitectura real: una API y una cola",
      source:
        "flowchart LR\n  gh[GitHub PR] -->|webhook HMAC| api[API FastAPI<br/>Cloud Run]\n  api <-->|estado| fs[Firestore]\n  api <-->|mensaje por etapa| ps[Pub/Sub]\n  api <-->|hipótesis y veredicto| gem[Gemini]",
      caption:
        "Los agentes corren dentro de la API: cada etapa es un mensaje de Pub/Sub que vuelve a ella.",
      notes:
        "Detalle que sorprende: los agentes no son microservicios. Son etapas de una máquina de estados dentro de un solo servicio, y por eso escala a cero. Hay tres topics, triage, run y judge, y Pub/Sub entrega por push con un token OIDC que la API verifica.",
    },
    {
      id: "architecture-sandbox",
      layout: "diagram",
      title: "Lo único que corre aparte: el código no confiable",
      source:
        "flowchart LR\n  api[API] -->|run_job| job[Cloud Run Job<br/>+ sandbox]\n  job -->|resultado| gcs[Cloud Storage]\n  gcs -->|Eventarc| api\n  api -->|OTLP| tr[Cloud Trace]",
      caption:
        "La API no espera al job: el resultado vuelve como un evento. Terraform crea toda esta infraestructura.",
      notes:
        "Aquí se ve el patrón 1 otra vez: lanzar y olvidar. La API arranca el job y termina la petición. Cuando el job deja el resultado en Cloud Storage, Eventarc llama a la API y el flujo sigue. Lo que no vuelve es un job que muera sin escribir resultado: esa tarea se queda en running, y está en la lista de pendientes.",
    },
    {
      id: "swarm",
      layout: "diagram",
      title: "Cómo funciona el enjambre",
      source:
        "flowchart LR\n  pr[PR] --> t[1. Triage<br/>Flash]\n  t --> r[2. Runner<br/>sandbox]\n  r --> j[3. Judge<br/>Flash-Lite]\n  j -->|aprueba| c[Comenta el fix]\n  j -->|rechaza| t\n  j -->|3 intentos| h[Humano]",
      caption:
        "`gemini-3.8-flash` y `gemini-3.5-flash-lite`: varios modelos pequeños, cada uno con una tarea, y código entre ellos.",
      notes:
        "Tres etapas, y solo dos usan modelo. Entre Triage y Runner hay un control de política: si el fix toca tests o CI, se rechaza sin llegar al sandbox ni gastar en el juez. Cada iteración rechazada vuelve a Triage con el motivo y la salida del test. Regla: nunca hace push, solo comenta.",
    },
    {
      id: "agents",
      layout: "icons-grid",
      title: "Cada agente hace una sola cosa",
      items: [
        {
          icon: "brain",
          title: "1. Triage",
          body: "Lee el diff y un resumen del AST. Devuelve `hypothesis`, `test_code` y `edits`.",
        },
        {
          icon: "flask-conical",
          title: "2. Sandbox Runner",
          body: "No usa modelo. Corre pytest y devuelve exit codes, stdout y tests ejecutados.",
        },
        {
          icon: "gavel",
          title: "3. Judge",
          body: "Recibe esos hechos. Devuelve `approved`, `summary`, `risk` y `feedback`.",
        },
      ],
      notes:
        "Cada salida es un modelo de Pydantic, validado al cruzar la frontera. El AST se lee con ast.parse: el código del PR se analiza, nunca se importa en el proceso de confianza. El reporte JSON del PR lo arma el código, no el modelo.",
    },
    {
      id: "red-green",
      layout: "diagram",
      title: "El Runner exige rojo y luego verde",
      source:
        "flowchart LR\n  a[Test nuevo<br/>contra el PR] -->|falla| c[Aplica<br/>el fix]\n  a -->|pasa| x[Rechazo]\n  c --> d[Toda<br/>la suite]\n  d -->|pasa| ok[Gate verde]\n  d -->|falla| x",
      caption:
        "Si el test ya pasa sin el fix, la hipótesis era falsa, aunque el modelo diga lo contrario.",
      notes:
        "TDD como guardrail, y además exige que hayan corrido tests. Paso uno: el test nuevo debe fallar contra el PR. Paso dos: con el fix, debe pasar toda la suite, no solo el test nuevo. Así el modelo no puede arreglar una cosa rompiendo otra.",
    },
    {
      id: "cannot",
      layout: "bullets",
      title: "Lo que el modelo no puede hacer",
      build: true,
      items: [
        "**Saltarse el gate:** un run rojo nunca se aprueba",
        "**Reescribir a su juez:** tests, CI y dotfiles están fuera de la política",
        "**Crear archivos:** solo edita fuente que ya existe",
        "**Obedecer al diff:** el texto del PR va delimitado como dato",
        "**Ver credenciales:** el token de GitHub nunca entra al sandbox",
        "**Publicar código:** comenta en el PR y no hace push",
      ],
      notes:
        "Pregunta típica: ¿y si un PR engaña al modelo? Puede pasar. Por eso ninguna de estas reglas está en el prompt: están en código. Además, los PRs de forks se ignoran, para que un desconocido no gaste tu presupuesto.",
    },

    // ── 04 · Demo ─────────────────────────────────────────────
    {
      id: "part-demo",
      layout: "section",
      number: "04",
      title: "Demo",
      subtitle: "Un PR real contra un sistema desplegado.",
    },
    {
      id: "demo",
      layout: "bullets",
      title: "Qué vamos a ver",
      build: true,
      items: [
        "`scripts/open-demo-pr.sh` abre un PR con un bug real",
        "El webhook responde `202` y encola la tarea",
        "Triage formula la hipótesis con Gemini",
        "El sandbox corre pytest sin red",
        "El juez decide y el enjambre comenta el fix",
        "Cloud Trace muestra toda la tarea en una traza",
      ],
      notes:
        "Tarda de 2 a 5 minutos, así que abre el PR y sigue hablando. Calienta el job antes de subir: el primer arranque tardó 1 min 32 s. Plan B sin red: `uv run codesentry demo`. Si usas el replay, di en voz alta que las respuestas del modelo están guionizadas. El bug: `apply_discount` no maneja un porcentaje negativo.",
    },
    {
      id: "eval-loop",
      layout: "code",
      title: "Cuando la hipótesis falla",
      language: "text",
      code: "iter 1  hipótesis: el signo está invertido, usa abs()\n        antes del fix  exit 1  assert 110.0 == 100\n        con el fix     exit 1  assert 90.0 == 100\n        juez           rechaza\n\niter 2  hipótesis: el porcentaje no tiene rango, limítalo a 0..100\n        antes del fix  exit 1  assert 110.0 == 100\n        con el fix     exit 0  4 passed",
      caption:
        "`uv run codesentry demo`: pytest real, respuestas del modelo ==guionizadas==.",
      notes:
        "Lo interesante no es el acierto, es el fallo: la primera hipótesis es razonable e incorrecta, el test la tumba y la retroalimentación corrige el rumbo. Esta lámina es el modo offline. Con Gemini real, dos de tres PRs acertaron a la primera y uno necesitó dos iteraciones.",
    },
    {
      id: "journey",
      layout: "code",
      title: "El camino de un PR real",
      language: "text",
      code: "06:38:08  task.submit\n06:38:10  agent.triage    gemini-3.8-flash\n06:38:58  agent.run       sandbox.execute\n06:40:42  sandbox.result  llega por Eventarc\n06:40:43  agent.judge     rechaza: iteración 2\n06:40:45  agent.triage    gemini-3.8-flash\n06:42:24  sandbox.result  llega por Eventarc\n06:42:25  agent.judge     aprueba y comenta",
      caption:
        "Spans reales del [PR #5](https://github.com/listerineh/codesentry-demo-shop/pull/5) en Cloud Trace: 2 iteraciones en 4 min 22 s.",
      notes:
        "Esto no es un ejemplo, es la traza real, abreviada. Fíjate dónde se va el tiempo: esperando al job, no al modelo. El juez tarda segundos. El arranque del job domina la latencia.",
    },
    {
      id: "escape",
      layout: "code",
      title: "Probé el sandbox desde dentro",
      language: "text",
      code: "metadata_ip          blocked  Network is unreachable\nmetadata_host        blocked  Network is unreachable\ninternet             blocked  Temporary failure in name resolution\nsigned_urls_visible  []\ncredentials_visible  []",
      caption:
        "`scripts/open-escape-pr.sh` en Cloud Run, 4 de noviembre de 2026. Bloquea lo que probé, no todo lo posible.",
      notes:
        "Opcional si vas justo. Un PR cuyo test intenta salir: servidor de metadatos, internet y variables de entorno. Nada de eso fue accesible. Contraste honesto: el modo local subprocess no aísla la red, y en GitHub Actions ese mismo test sí llegó a 169.254.169.254.",
    },
    {
      id: "trace",
      layout: "diagram",
      title: "Si no lo ves, no es un sistema",
      source:
        "flowchart LR\n  a[task<br/>submit] --> b[agent<br/>triage]\n  b --> d[agent<br/>run]\n  d -->|Eventarc| r[sandbox<br/>result]\n  r --> f[agent<br/>judge]",
      caption:
        "`traceparent` viaja en cada mensaje. OpenTelemetry a Cloud Trace por [OTLP](https://cloud.google.com/blog/products/management-tools/opentelemetry-now-in-google-cloud-observability), con `gen_ai.*`.",
      notes:
        "Dentro de cada agente hay un span por llamada a Gemini, con tokens de entrada y salida. La propagación es tu trabajo. El cliente de Pub/Sub crea una traza por mensaje y el modelo es una llamada hoja. Por eso traceparent viaja en cada mensaje y se guarda antes de lanzar el sandbox. Sin eso, el resultado que llega por Eventarc abre una traza nueva: me pasó en la demo. Las convenciones gen_ai aún son experimentales.",
    },
    {
      id: "measured",
      layout: "stats",
      title: "Lo medido en GCP real",
      stats: [
        { value: 106, suffix: " s", label: "PR más rápido" },
        { value: 262, suffix: " s", label: "PR más lento" },
        { value: 0.016, prefix: "$", label: "costo máximo" },
        { value: 15, suffix: " spans", label: "en una traza" },
      ],
      citation:
        "3 PRs reales en [codesentry-demo-shop](https://github.com/listerineh/codesentry-demo-shop), 4 de noviembre de 2026. Costo según la tabla de precios de la demo.",
      notes:
        "Tres PRs son una anécdota, no un benchmark: dilo. El costo sale de los tokens que reporta Gemini y la tabla de precios del repo, no de la factura.",
    },

    // ── 05 · Producción ───────────────────────────────────────
    {
      id: "part-production",
      layout: "section",
      number: "05",
      title: "Producción",
      subtitle: "Costos, tropiezos y lo que falta.",
    },
    {
      id: "guardrails",
      layout: "icons-grid",
      title: "Guardrails en código, no en el prompt",
      items: [
        {
          icon: "coins",
          title: "Presupuesto por tarea",
          body: "20.000 tokens, contados antes de cada llamada.",
        },
        {
          icon: "repeat",
          title: "Máximo 3 iteraciones",
          body: "Después escala a un humano.",
        },
        {
          icon: "timer",
          title: "Timeouts duros",
          body: "45 s por llamada al modelo y un límite por ejecución.",
        },
        {
          icon: "zap-off",
          title: "Circuit breaker",
          body: "Tras 3 fallos deja de insistir con el modelo principal.",
        },
        {
          icon: "feather",
          title: "Fallback ligero",
          body: "Mejor un modelo Lite que caerte.",
        },
        {
          icon: "user-check",
          title: "Humano al final",
          body: "El agente propone; alguien decide.",
        },
      ],
      notes:
        "Un bucle sin límites es una factura sin techo. Todo esto vive en código: un prompt no es un control de seguridad. Son los valores por defecto de `config.py`. Si te preguntan por modelos: revisa la página de ciclo de vida antes de fijar un ID.",
    },
    {
      id: "costs",
      layout: "two-column",
      title: "Cuánto cuesta y qué lo baja",
      columns: [
        {
          heading: "Cuesta",
          items: [
            "De 0,011 a 0,016 USD por PR medido",
            "La salida de Triage es casi todo: 3.630 de 3.690 tokens en el PR #4",
            "Sin uso, Cloud Run escala a cero",
          ],
        },
        {
          heading: "Lo baja",
          items: [
            "Un modelo ligero para juzgar",
            "Un tope de tokens por tarea",
            "Ignorar los PRs de forks",
            "Sin probar: limitar el razonamiento de Gemini",
          ],
        },
      ],
      notes:
        "El costo real no era el precio por PR, sino que cualquiera pudiera abrir un PR en un repo público y gastar por ti: por eso el filtro de forks. Ojo con los precios: `gemini-3.8-flash` tiene precio introductorio hasta el 31 de diciembre de 2026 y luego se duplica. Revisa la página de precios antes de la charla.",
    },
    {
      id: "deploy-lessons",
      layout: "bullets",
      title: "Lo que rompió el primer despliegue",
      build: true,
      items: [
        "El agente de Cloud Storage no existe hasta el primer uso",
        "El trigger de Eventarc dio 403 mientras se propagaban los permisos",
        "`gcloud` 570 no reconocía `--sandbox-launcher`: tocó usar la API directa",
        "Un cliente gRPC async pertenece al event loop que lo crea",
        "`terraform apply` borraba `sandboxLauncher` del job",
        "La traza se cortaba al volver por Eventarc",
      ],
      notes:
        "Opcional si vas justo. Todo esto pasó el 4 de noviembre y está corregido en el repo. Ningún test con dobles habría encontrado estos fallos: solo aparecieron al desplegar. Esa es la lección.",
    },
    {
      id: "repos",
      layout: "two-column",
      title: "Los repos: clónalo sin nube",
      columns: [
        {
          heading: "codesentry-swarm",
          body: "API, agentes, Terraform y scripts de despliegue. MIT.",
          items: [
            "`uv sync`",
            "`uv run codesentry demo`",
            "Cuatro escenarios, sin red ni cuenta de nube",
          ],
        },
        {
          heading: "codesentry-demo-shop",
          body: "Un checkout pequeño con un bug a propósito.",
          items: [
            "Objetivo de los PRs de la demo",
            "Tiene el webhook conectado",
            "Cada corrida abre un PR nuevo",
          ],
        },
      ],
      notes:
        "Los dos son públicos. El README explica cómo correrlo y desplegarlo, y docs/verified-facts.md tiene las fuentes y lo medido. Aviso: `--scenario hostile` con el modo subprocess por defecto no aísla la red.",
    },
    {
      id: "roadmap",
      layout: "two-column",
      title: "El camino de CodeSentry",
      columns: [
        {
          heading: "Ya funciona",
          items: [
            "Desplegado en GCP con PRs reales",
            "Sandbox probado desde dentro",
            "Una traza de punta a punta",
            "Modo offline con replay",
            "79 tests y CI en verde",
          ],
        },
        {
          heading: "Falta",
          items: [
            "Probar el sandbox Docker local",
            "Limpiar tareas atascadas",
            "Procesar la dead letter",
            "Pipeline de despliegue",
            "Memoria de largo plazo",
          ],
        },
      ],
      notes:
        "Honestidad sobre el estado. Es una demo sólida, no un producto. El filtro de forks solo se probó con tests, no con un fork real. Si alguien quiere contribuir, la columna derecha es la lista.",
    },
    {
      id: "monday",
      layout: "bullets",
      title: "Tu checklist del lunes",
      build: true,
      items: [
        "Trata al agente como un **servicio externo no confiable**",
        "**Aísla** todo cómputo dinámico",
        "Construye sobre **eventos**, nunca sobre HTTP bloqueante",
        "**Tipa y valida** toda entrada y toda salida",
        "Deja la **decisión final en código**",
      ],
      notes:
        "Si te llevas una sola cosa: ponle a tu agente el mismo trato que a una API de un tercero que no controlas. Elige un endpoint de IA de tu sistema y aplica el primer punto esta semana.",
    },
    {
      id: "thanks",
      layout: "closing",
      title: "¿Preguntas?",
      subtitle:
        "La demo es código abierto: clónala, córrela sin nube y rómpela.",
      links: [
        {
          label: "CodeSentry Swarm",
          href: "https://github.com/listerineh/codesentry-swarm",
        },
        {
          label: "Demo shop",
          href: "https://github.com/listerineh/codesentry-demo-shop",
        },
        {
          label: "linkedin.com/in/listerineh",
          href: "https://www.linkedin.com/in/listerineh",
        },
        {
          label: "listerineh.dev/slides",
          href: "https://listerineh.dev/slides",
        },
      ],
      notes:
        "Preguntas semilla: ¿cuándo uso Code Execution en vez de Cloud Run? ¿Cómo pruebo un agente en CI? ¿Qué pasa con la inyección de prompts desde un PR? Respuesta corta a la última: el diff es dato, va delimitado, y aunque engañe al modelo no puede saltarse el gate ni la política de edición.",
    },
  ],
  translations: {
    en: {
      title: "From Endpoints to Agent Swarms",
      description:
        "Backend architecture patterns on GCP for autonomous systems, and how CodeSentry Swarm applies them to audit pull requests, test its hypothesis in a sandbox and propose a fix.",
      slides: {
        cover: {
          eyebrow: "DevFest 2026",
          title: "From REST APIs to Autonomous Systems",
          subtitle:
            "Backend architecture patterns on GCP to decouple *probabilistic chaos* from your core, and a real swarm that applies them.",
          notes:
            "Timing for 45 minutes: opening 3, problem 6, patterns 11, CodeSentry 8, demo 6, production 4, questions 7. If you're short on time, skip the slides marked optional in their notes.",
        },
        speaker: {
          photo: {
            src: "/images/sebas-playing.webp",
            alt: "Sebastian Alvarez smiling with an electric guitar",
          },
          greeting: "Hi, I'm",
          bio: "I build Python backends, cloud infrastructure and products with applied AI.",
          highlights: ["GDG Quito", "Quito, Ecuador"],
          notes: "Thirty seconds. The important part comes next.",
        },
        agenda: {
          title: "What we'll cover",
          items: [
            "**01** Why an agent breaks a classic backend",
            "**02** Four patterns to put a boundary around it",
            "**03** CodeSentry Swarm: the patterns in a real system",
            "**04** Demo: a real PR, end to end",
            "**05** Production: costs, stumbles and what's missing",
          ],
          notes:
            "The talk goes from general to concrete. Everything I claim about CodeSentry can be checked: the code is public.",
        },
        hook: {
          statement:
            "An agent isn't a slow endpoint: it ==breaks your backend's contract==.",
          emphasis:
            "Request → DB → Response assumes one input, one result and a predictable time. An agent promises none of those.",
          notes:
            "Quick question: who already has an endpoint that calls an LLM? Who knows how long it takes in the worst case? That second question is this talk.",
        },
        "part-problem": {
          title: "The problem",
          subtitle: "What works in the demo and falls over in production.",
        },
        wrapper: {
          title: "The false promise of the wrapper",
          code: '@app.post("/api/chat")\ndef chat(body: ChatRequest):\n    # A worker blocked while the model thinks\n    reply = llm.generate(body.message)\n    # The model\'s code, inside your process\n    result = exec_tool(reply.code)\n    # A client retry bills everything again\n    return db.save(reply, result)',
          caption: "Eight lines that pass any demo and no incident.",
          notes:
            "We have all written this, and it works in the demo. Read the three comments: each is a class of incident. The next slide names them.",
        },
        failures: {
          title: "What breaks in production",
          items: [
            {
              icon: "timer",
              title: "Timeouts",
              body: "The proxy cuts off and paid work is lost.",
            },
            {
              icon: "gauge",
              title: "Thread starvation",
              body: "Every call holds a worker. Everything falls.",
            },
            {
              icon: "coins",
              title: "Uncapped costs",
              body: "Each step pays for all the context again.",
            },
            {
              icon: "repeat",
              title: "No idempotency",
              body: "A retry repeats the bill and the effects.",
            },
            {
              icon: "bug",
              title: "Untrusted code",
              body: "It runs in your process, with your credentials.",
            },
            {
              icon: "message-square-warning",
              title: "Prompt injection",
              body: "A diff can carry orders for the model.",
            },
          ],
          notes:
            "Six problems, and none is fixed by a better prompt. The first two are infrastructure, the next two are money and the last two are security.",
        },
        contract: {
          title: "The contract changed",
          columns: [
            {
              heading: "Classic backend",
              items: [
                "One input, one known output",
                "Predictable latency",
                "Code you wrote",
                "State lives in your database",
              ],
            },
            {
              heading: "Agent",
              items: [
                "Reason, act, observe, repeat",
                "==N steps==: you don't know how many",
                "Code nobody reviewed",
                "Context that grows at every step",
              ],
            },
          ],
          notes:
            "The backend doesn't become probabilistic: we put a boundary around the part that is.",
        },
        react: {
          title: "The loop your backend didn't expect",
          source:
            "flowchart LR\n  t[Task] --> r[Reason]\n  r --> a[Act<br/>tool or code]\n  a --> o[Observe<br/>the result]\n  o -->|continue| r\n  o -->|done| f[Answer]",
          caption:
            "ReAct: the number of loops decides latency and cost, and you don't know it up front.",
          notes:
            "Reason, Act, Observe. N is a random variable. Everything you size in a backend, such as timeouts, workers or budget, depends on it.",
        },
        limits: {
          title: "And the platform has limits",
          stats: [
            { value: 5, suffix: " min", label: "Cloud Run default" },
            { value: 60, suffix: " min", label: "Cloud Run maximum" },
            { value: 600, suffix: " s", label: "Pub/Sub push maximum" },
            { value: 30, suffix: " s", label: "load balancer default" },
          ],
          citation:
            "[Cloud Run](https://docs.cloud.google.com/run/docs/configuring/request-timeout), [Pub/Sub](https://docs.cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions) and [Load Balancing](https://docs.cloud.google.com/load-balancing/docs/backend-service) docs, November 2026.",
          notes:
            "Common myth: the load balancer doesn't cut you off at 30 s on Cloud Run. That's the default for regular backends; serverless NEGs get 60 minutes. Still, having an hour doesn't mean you should block for an hour.",
        },
        thesis: {
          statement:
            "Don't make the agent deterministic: ==put a boundary around it==.",
          emphasis:
            "Chaos lives behind a queue and in a sandbox. Code makes the decisions that matter.",
          notes:
            "This is the thesis. The next four patterns are that boundary, and CodeSentry is the proof it can be built.",
        },
        "part-patterns": {
          title: "Four patterns",
          subtitle: "Decouple, isolate, remember and validate.",
        },
        "async-reply": {
          title: "Pattern 1: never block, enqueue",
          source:
            "flowchart LR\n  c[Client] -->|POST| a[API<br/>Cloud Run]\n  a -->|202 + task_id| c\n  a --> p[Pub/Sub]\n  p --> w[Agent]\n  w -->|progress| f[Firestore]",
          caption:
            "Async Request-Reply: `202` with a `task_id`, retries with backoff, dead letter and progress over SSE.",
          notes:
            "The 202 protects the core: no worker waits for the model. Progress is read from Firestore and the API serves it over SSE. In the demo the client is GitHub's webhook, signed with HMAC. Eventarc connects the rest: when the sandbox leaves its result in Cloud Storage, Eventarc reports it.",
        },
        idempotency: {
          title: "At least once demands idempotency",
          code: 'def task_id_for(pr: PullRequestRef) -> str:\n    # Same commit, same task\n    key = f"{pr.repo}#{pr.number}@{pr.head_sha}"\n    return uuid.uuid5(NAMESPACE, key).hex\n\nclaim = f"{message.stage.value}-{message.iteration}"\nif not await store.claim(task.id, claim, CLAIM_LEASE_S):\n    return  # another delivery already did this stage',
          caption:
            "Shortened from `swarm.py`: a duplicate webhook or message repeats neither work nor cost.",
          notes:
            "Pub/Sub delivers at least once. Two things solve it: an ID derived from the commit, and a claim per stage and iteration in Firestore, with a transaction and an expiry. A test duplicates every message and checks that everything runs once.",
        },
        "failure-modes": {
          title: "Not every failure deserves a retry",
          columns: [
            {
              heading: "Transient: retry",
              items: [
                "Timeouts, 429 or 5xx errors and network",
                "The stage is released and Pub/Sub retries",
                "Backoff from 10 to 300 s",
                "After 5 deliveries, dead letter",
              ],
            },
            {
              heading: "Terminal: escalate",
              items: [
                "Token budget exhausted",
                "The model breaks its schema twice",
                "3 iterations without a passing fix",
                "Comments on the PR and asks for a human",
              ],
            },
          ],
          notes:
            "Retrying a terminal failure burns money in a loop. In the code these are two paths: a normal exception lets the bus retry, and TerminalError ends the task in needs_human.",
        },
        sandbox: {
          title: "Pattern 2: all LLM code is hostile",
          items: [
            "**Every run in its own environment**, ephemeral and disposable",
            "**No network:** egress denied by default",
            "**No identity:** no credentials, variables or metadata server",
            "**Hard quotas:** CPU, memory and time",
            "**Repo code counts too:** a PR can bring its own tests",
          ],
          notes:
            "Treat generated code like an attachment from a stranger. And not only generated code: CodeSentry also runs the tests a PR brings.",
        },
        "sandbox-layers": {
          title: "Two layers, not one",
          source:
            "flowchart LR\n  api[API] -->|2 signed URLs| j[Cloud Run Job<br/>gen2 microVM]\n  j -->|stdin| s[sandbox do<br/>no network or identity]\n  j -->|result| g[Cloud<br/>Storage]",
          caption:
            "Jobs only run on gen2; gVisor means gen1 and GKE. [Cloud Run sandboxes](https://docs.cloud.google.com/run/docs/code-execution) is still in Preview.",
          notes:
            "Important update: a lot of older guidance says Cloud Run uses gVisor. Today gen1 is gVisor, gen2 is a microVM, and jobs only run on gen2. The job reads the bundle and writes the result with 2 signed URLs, and its service account has no roles. The signed URLs live in the outer layer, and code in the inner one can't see them.",
        },
        "sandbox-options": {
          title: "Where to run generated code",
          items: [
            {
              icon: "box",
              title: "Cloud Run sandboxes",
              body: "`sandbox do` in your container. Preview. The demo uses it.",
            },
            {
              icon: "cloud",
              title: "Code Execution",
              body: "Fully managed, for any agent framework.",
            },
            {
              icon: "server",
              title: "Agent Sandbox on GKE",
              body: "Self-managed on Kubernetes, with gVisor or microVMs.",
            },
            {
              icon: "container",
              title: "Local Docker",
              body: "The demo's offline mode, ==not yet tested==.",
            },
          ],
          notes:
            "Optional if you're short on time. Choose by how much control you want. Sources are in the repo's docs/verified-facts.md. Be honest about the last one: Docker mode exists, but it hasn't been run end to end.",
        },
        memory: {
          title: "Pattern 3: hybrid memory",
          columns: [
            {
              heading: "Working memory",
              body: "Firestore or Memorystore. Fast, per task, with a TTL.",
              items: [
                "Loop state and checkpoints",
                "Lets you pause for a ==Human-in-the-Loop==",
                "Resume without repeating paid steps",
              ],
            },
            {
              heading: "Long term",
              body: "Agent Retrieval, formerly Vertex AI Vector Search 2.0.",
              items: [
                "Semantic search over what was learned",
                "Embeddings: `gemini-embedding-2`",
                "Changing model means re-embedding",
              ],
            },
          ],
          notes:
            "Two different problems: what am I doing now, and what do I know from before. Mix them and every step drags the whole history along, and you pay for it again. To be clear: the demo only implements working memory in Firestore, with each iteration's state and escalation to a human. It has no long-term memory.",
        },
        structured: {
          title: "Pattern 4: Structured Outputs",
          caption:
            "A schema gives you valid JSON, not the truth. [Gemini docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)",
          notes:
            "Without a schema, JSON mode is only a hint. With a schema and application/json, Google documents valid JSON. That's syntax: `approved: true` can be perfectly valid and perfectly false. So the demo validates again with Pydantic and retries once if the output breaks its contract.",
        },
        gate: {
          title: "The final decision is code",
          caption:
            "Shortened from `guardrails.py`: the judge can reject a green run, but it can't approve a red one.",
          notes:
            "This function is the heart of the talk: a few deterministic lines decide. The tests_run check exists because a test can call os._exit(0) to fake success, and that has its own test.",
        },
        "part-swarm": {
          title: "CodeSentry Swarm",
          subtitle: "The four patterns in a system you can clone.",
        },
        proposal: {
          statement:
            "CodeSentry audits a PR, ==tests its hypothesis== in a sandbox and proposes a typed fix.",
          emphasis:
            "An LLM reviewer has opinions. This one has to prove it with a test that fails and then passes.",
          notes:
            "The pitch in one sentence. The difference from a bot that comments: nothing is published here without evidence from a run.",
        },
        scope: {
          title: "What it does and doesn't do",
          columns: [
            {
              heading: "Does",
              items: [
                "Forms a hypothesis about the diff",
                "Writes a test that reproduces the bug",
                "Tests the fix in a sandbox",
                "Comments the diff and a JSON report",
                "Tracks tokens, cost and a trace per task",
              ],
            },
            {
              heading: "Doesn't",
              items: [
                "Push or merge: merging is human",
                "Touch tests, CI or dotfiles",
                "Analyze other languages: Python only",
                "Learn between tasks",
                "Guarantee the fix: green is evidence",
              ],
            },
          ],
          notes:
            "Saying what it doesn't do matters as much. It's a working demo, not a product. The last line is key: a green test doesn't prove the fix is right.",
        },
        architecture: {
          title: "The real architecture: one API and one queue",
          source:
            "flowchart LR\n  gh[GitHub PR] -->|HMAC webhook| api[FastAPI API<br/>Cloud Run]\n  api <-->|state| fs[Firestore]\n  api <-->|a message per stage| ps[Pub/Sub]\n  api <-->|hypothesis and verdict| gem[Gemini]",
          caption:
            "The agents run inside the API: each stage is a Pub/Sub message that comes back to it.",
          notes:
            "A surprising detail: the agents aren't microservices. They're stages of a state machine inside one service, which is why it scales to zero. There are three topics, triage, run and judge, and Pub/Sub delivers by push with an OIDC token the API verifies.",
        },
        "architecture-sandbox": {
          title: "The only thing running apart: untrusted code",
          source:
            "flowchart LR\n  api[API] -->|run_job| job[Cloud Run Job<br/>+ sandbox]\n  job -->|result| gcs[Cloud Storage]\n  gcs -->|Eventarc| api\n  api -->|OTLP| tr[Cloud Trace]",
          caption:
            "The API doesn't wait for the job: the result comes back as an event. Terraform creates all of this infrastructure.",
          notes:
            "Pattern 1 again: fire and forget. The API starts the job and ends the request. When the job leaves the result in Cloud Storage, Eventarc calls the API and the flow continues. What doesn't come back is a job that dies without writing a result: that task stays running, and it's on the to-do list.",
        },
        swarm: {
          title: "How the swarm works",
          source:
            "flowchart LR\n  pr[PR] --> t[1. Triage<br/>Flash]\n  t --> r[2. Runner<br/>sandbox]\n  r --> j[3. Judge<br/>Flash-Lite]\n  j -->|approves| c[Comments the fix]\n  j -->|rejects| t\n  j -->|3 attempts| h[Human]",
          caption:
            "`gemini-3.8-flash` and `gemini-3.5-flash-lite`: several small models, one job each, with code between them.",
          notes:
            "Three stages, and only two use a model. Between Triage and Runner sits a policy check: if the fix touches tests or CI, it is rejected without reaching the sandbox or spending on the judge. Each rejected iteration goes back to Triage with the reason and the test output. Rule: it never pushes, it only comments.",
        },
        agents: {
          title: "Each agent does one thing",
          items: [
            {
              icon: "brain",
              title: "1. Triage",
              body: "Reads the diff and an AST outline. Returns `hypothesis`, `test_code` and `edits`.",
            },
            {
              icon: "flask-conical",
              title: "2. Sandbox Runner",
              body: "Uses no model. Runs pytest and returns exit codes, stdout and tests run.",
            },
            {
              icon: "gavel",
              title: "3. Judge",
              body: "Receives those facts. Returns `approved`, `summary`, `risk` and `feedback`.",
            },
          ],
          notes:
            "Each output is a Pydantic model, validated as it crosses the boundary. The AST is read with ast.parse: PR code is parsed, never imported into the trusted process. The JSON report on the PR is built by code, not by the model.",
        },
        "red-green": {
          title: "The Runner demands red, then green",
          source:
            "flowchart LR\n  a[New test<br/>against the PR] -->|fails| c[Applies<br/>the fix]\n  a -->|passes| x[Rejected]\n  c --> d[Whole<br/>suite]\n  d -->|passes| ok[Green gate]\n  d -->|fails| x",
          caption:
            "If the test already passes without the fix, the hypothesis was false, whatever the model says.",
          notes:
            "TDD as a guardrail, which also requires that tests ran. Step one: the new test must fail against the PR. Step two: with the fix, the whole suite must pass, not just the new test. So the model can't fix one thing by breaking another.",
        },
        cannot: {
          title: "What the model can't do",
          items: [
            "**Skip the gate:** a red run is never approved",
            "**Rewrite its judge:** tests, CI and dotfiles are off limits",
            "**Create files:** it only edits source that already exists",
            "**Obey the diff:** PR text is fenced as data",
            "**See credentials:** the GitHub token never enters the sandbox",
            "**Publish code:** it comments on the PR and doesn't push",
          ],
          notes:
            "Typical question: what if a PR fools the model? It can happen. That's why none of these rules live in the prompt: they're in code. Pull requests from forks are also ignored, so a stranger can't spend your budget.",
        },
        "part-demo": {
          title: "Demo",
          subtitle: "A real PR against a deployed system.",
        },
        demo: {
          title: "What we'll see",
          items: [
            "`scripts/open-demo-pr.sh` opens a PR with a real bug",
            "The webhook answers `202` and enqueues the task",
            "Triage forms the hypothesis with Gemini",
            "The sandbox runs pytest with no network",
            "The judge decides and the swarm comments the fix",
            "Cloud Trace shows the whole task in one trace",
          ],
          notes:
            "It takes 2 to 5 minutes, so open the PR and keep talking. Warm up the job before going on stage: the first start took 1 min 32 s. Plan B with no network: `uv run codesentry demo`. If you use replay, say out loud that the model answers are scripted. The bug: `apply_discount` doesn't handle a negative percentage.",
        },
        "eval-loop": {
          title: "When the hypothesis fails",
          code: "iter 1  hypothesis: the sign is flipped, use abs()\n        before the fix  exit 1  assert 110.0 == 100\n        with the fix    exit 1  assert 90.0 == 100\n        judge           rejects\n\niter 2  hypothesis: the percent has no range, clamp it to 0..100\n        before the fix  exit 1  assert 110.0 == 100\n        with the fix    exit 0  4 passed",
          caption:
            "`uv run codesentry demo`: real pytest, ==scripted== model answers.",
          notes:
            "The interesting part isn't the hit, it's the miss: the first hypothesis is reasonable and wrong, the test knocks it down and the feedback corrects course. This slide is offline mode. With real Gemini, two of three PRs got it right the first time and one needed two iterations.",
        },
        journey: {
          title: "The journey of a real PR",
          code: "06:38:08  task.submit\n06:38:10  agent.triage    gemini-3.8-flash\n06:38:58  agent.run       sandbox.execute\n06:40:42  sandbox.result  arrives through Eventarc\n06:40:43  agent.judge     rejects: iteration 2\n06:40:45  agent.triage    gemini-3.8-flash\n06:42:24  sandbox.result  arrives through Eventarc\n06:42:25  agent.judge     approves and comments",
          caption:
            "Real spans from [PR #5](https://github.com/listerineh/codesentry-demo-shop/pull/5) in Cloud Trace: 2 iterations in 4 min 22 s.",
          notes:
            "This isn't an example, it's the real trace, shortened. Look at where the time goes: waiting for the job, not for the model. The judge takes seconds. Job startup dominates latency.",
        },
        escape: {
          title: "I tested the sandbox from inside",
          caption:
            "`scripts/open-escape-pr.sh` on Cloud Run, 4 November 2026. It blocks what I tested, not everything possible.",
          notes:
            "Optional if you're short on time. A PR whose test tries to get out: metadata server, internet and environment variables. None of it was reachable. Honest contrast: the local subprocess mode doesn't isolate the network, and on GitHub Actions that same test did reach 169.254.169.254.",
        },
        trace: {
          title: "If you can't see it, it isn't a system",
          source:
            "flowchart LR\n  a[task<br/>submit] --> b[agent<br/>triage]\n  b --> d[agent<br/>run]\n  d -->|Eventarc| r[sandbox<br/>result]\n  r --> f[agent<br/>judge]",
          caption:
            "`traceparent` travels in every message. OpenTelemetry to Cloud Trace over [OTLP](https://cloud.google.com/blog/products/management-tools/opentelemetry-now-in-google-cloud-observability), with `gen_ai.*`.",
          notes:
            "Inside each agent there is a span per Gemini call, with input and output tokens. Propagation is your job. The Pub/Sub client creates a trace per message and the model is a leaf call. So traceparent travels in every message and is saved before the sandbox starts. Without that, the result arriving through Eventarc opens a new trace: it happened to me in the demo. The gen_ai conventions are still experimental.",
        },
        measured: {
          title: "Measured on real GCP",
          stats: [
            { value: 106, suffix: " s", label: "fastest PR" },
            { value: 262, suffix: " s", label: "slowest PR" },
            { value: 0.016, prefix: "$", label: "highest cost" },
            { value: 15, suffix: " spans", label: "in one trace" },
          ],
          citation:
            "3 real PRs on [codesentry-demo-shop](https://github.com/listerineh/codesentry-demo-shop), 4 November 2026. Cost from the demo's price table.",
          notes:
            "Three PRs are an anecdote, not a benchmark: say so. The cost comes from the tokens Gemini reports and the repo's price table, not from the invoice.",
        },
        "part-production": {
          title: "Production",
          subtitle: "Costs, stumbles and what's missing.",
        },
        guardrails: {
          title: "Guardrails in code, not in the prompt",
          items: [
            {
              icon: "coins",
              title: "Budget per task",
              body: "20,000 tokens, counted before each call.",
            },
            {
              icon: "repeat",
              title: "3 iterations at most",
              body: "Then it escalates to a human.",
            },
            {
              icon: "timer",
              title: "Hard timeouts",
              body: "45 s per model call and a limit per run.",
            },
            {
              icon: "zap-off",
              title: "Circuit breaker",
              body: "After 3 failures it stops insisting on the main model.",
            },
            {
              icon: "feather",
              title: "Light fallback",
              body: "Better a Lite model than a crash.",
            },
            {
              icon: "user-check",
              title: "A human at the end",
              body: "The agent proposes; someone decides.",
            },
          ],
          notes:
            "A loop with no limits is an invoice with no ceiling. All of this lives in code: a prompt isn't a security control. These are the defaults in `config.py`. If asked about models: check the lifecycle page before pinning an ID.",
        },
        costs: {
          title: "What it costs and what lowers it",
          columns: [
            {
              heading: "Costs",
              items: [
                "USD 0.011 to 0.016 per measured PR",
                "Triage output is nearly all of it: 3,630 of 3,690 tokens on PR #4",
                "Idle, Cloud Run scales to zero",
              ],
            },
            {
              heading: "Lowers it",
              items: [
                "A light model for judging",
                "A token cap per task",
                "Ignoring pull requests from forks",
                "Not tested yet: limiting Gemini's thinking",
              ],
            },
          ],
          notes:
            "The real cost wasn't the price per PR, but that anyone could open a PR on a public repo and spend for you: hence the fork filter. Watch the prices: `gemini-3.8-flash` has introductory pricing until 31 December 2026 and then doubles. Check the pricing page before the talk.",
        },
        "deploy-lessons": {
          title: "What broke the first deploy",
          items: [
            "The Cloud Storage agent doesn't exist until first use",
            "The Eventarc trigger got a 403 while permissions propagated",
            "`gcloud` 570 didn't recognize `--sandbox-launcher`: I used the API directly",
            "An async gRPC client belongs to the event loop that creates it",
            "`terraform apply` removed `sandboxLauncher` from the job",
            "The trace was cut when coming back through Eventarc",
          ],
          notes:
            "Optional if you're short on time. All of this happened on 4 November and is fixed in the repo. No test with doubles would have found these failures: they only appeared when deploying. That's the lesson.",
        },
        repos: {
          title: "The repos: clone it, no cloud needed",
          columns: [
            {
              heading: "codesentry-swarm",
              body: "API, agents, Terraform and deployment scripts. MIT.",
              items: [
                "`uv sync`",
                "`uv run codesentry demo`",
                "Four scenarios, no network or cloud account",
              ],
            },
            {
              heading: "codesentry-demo-shop",
              body: "A tiny checkout with a bug on purpose.",
              items: [
                "Target of the demo's pull requests",
                "Has the webhook connected",
                "Each run opens a new PR",
              ],
            },
          ],
          notes:
            "Both are public. The README explains how to run and deploy it, and docs/verified-facts.md has the sources and measurements. Warning: `--scenario hostile` with the default subprocess mode doesn't isolate the network.",
        },
        roadmap: {
          title: "The road for CodeSentry",
          columns: [
            {
              heading: "Works today",
              items: [
                "Deployed on GCP with real PRs",
                "Sandbox tested from inside",
                "One trace end to end",
                "Offline mode with replay",
                "79 tests and green CI",
              ],
            },
            {
              heading: "Still missing",
              items: [
                "Test the local Docker sandbox",
                "Clean up stuck tasks",
                "Process the dead letter",
                "A deployment pipeline",
                "Long-term memory",
              ],
            },
          ],
          notes:
            "Honesty about the state. It's a solid demo, not a product. The fork filter was only tested with tests, not a real fork. If someone wants to contribute, the right column is the list.",
        },
        monday: {
          title: "Your Monday checklist",
          items: [
            "Treat the agent as an **untrusted external service**",
            "**Isolate** all dynamic compute",
            "Build on **events**, never on blocking HTTP",
            "**Type and validate** every input and output",
            "Keep the **final decision in code**",
          ],
          notes:
            "If you take one thing away: treat your agent like a third-party API you don't control. Pick one AI endpoint in your system and apply the first point this week.",
        },
        thanks: {
          title: "Questions?",
          subtitle:
            "The demo is open source: clone it, run it without a cloud and break it.",
          notes:
            "Seed questions: when do I use Code Execution instead of Cloud Run? How do I test an agent in CI? What about prompt injection from a PR? Short answer to the last one: the diff is data, it's fenced, and even if it fools the model it can't get past the gate or the edit policy.",
        },
      },
    },
  },
};
