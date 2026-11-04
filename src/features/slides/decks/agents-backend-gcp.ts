import type { DeckInput } from "../schema";

/**
 * "De Endpoints a Enjambres de Agentes", a 45-minute talk on backend patterns for autonomous systems on Google Cloud,
 * first given in Spanish at Universidad Indoamérica (13 November 2026). The English translation is kept for a later
 * DevFest. The live demo is CodeSentry Swarm (github.com/listerineh/codesentry-swarm).
 * Platform facts were checked against Google's docs on 3 November 2026; review them the week of the event. Ships as a
 * draft: the first save from the editor stores it, and opening each diagram slide in each language draws its SVG.
 */
export const agentsBackendGcp: DeckInput = {
  slug: "agents-backend-gcp",
  title: "De Endpoints a Enjambres de Agentes",
  description:
    "Patrones de arquitectura backend en GCP para sistemas autónomos: cómo desacoplar el caos probabilístico de los agentes del core de tu backend.",
  lang: "es",
  status: "draft",
  accent: "#1a73e8",
  event: {
    name: "Universidad Indoamérica",
    date: "2026-11-13",
  },
  updatedAt: "2026-11-03T00:00:00.000Z",
  version: 1,
  slides: [
    // ── Fase 1 · Diagnóstico ──────────────────────────────────
    {
      id: "cover",
      layout: "title",
      eyebrow: "13 de noviembre de 2026 · Universidad Indoamérica",
      title: "De APIs REST a Sistemas Autónomos",
      subtitle:
        "Patrones de arquitectura backend en GCP para desacoplar el *caos probabilístico* de tu core.",
      notes:
        "Tesis: un backend clásico asume Request → DB → Response en unos 200 ms, como regla práctica. Un agente rompe ese contrato: latencia variable, bucles probabilísticos, código no confiable y estado masivo. Hoy salimos con un plano, no con una lista de productos. Tiempos para 45 minutos: diagnóstico 6, patrones 14, demo y enjambre 13, producción 5, preguntas 7.",
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
      id: "wrapper",
      layout: "code",
      title: "La falsa promesa del wrapper",
      language: "python",
      code: '@app.post("/api/chat")\ndef chat(body: ChatRequest):\n    # Un worker bloqueado mientras el modelo piensa\n    reply = llm.generate(body.message)\n    # Código del modelo, dentro de tu proceso\n    result = exec_tool(reply.code)\n    # Un reintento del cliente cobra todo otra vez\n    return db.save(reply, result)',
      caption:
        "Timeouts, *thread starvation*, costos sin techo y cero idempotencia.",
      notes:
        "Todos escribimos esto y funciona en la demo. En producción, cuando el agente tarda, los workers se agotan y cae también lo que no tiene IA. El cliente reintenta y pagas dos veces. Y el código del modelo corre con tus credenciales.",
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
          heading: "Agente (ReAct)",
          items: [
            "Razona, actúa, observa y repite",
            "==N pasos==: no sabes cuántos",
            "Código que nadie revisó",
            "Contexto que crece en cada paso",
          ],
        },
      ],
      notes:
        "ReAct: Reason, Act, Observe, en bucle. El número de pasos es una variable aleatoria, así que latencia y costo también. El backend no se vuelve probabilístico: lo que hacemos es poner una frontera. Los siguientes cuatro patrones son esa frontera.",
    },

    // ── Fase 2 · Patrones ─────────────────────────────────────
    {
      id: "async-reply",
      layout: "diagram",
      title: "Patrón 1: nunca bloquees, encola",
      source:
        "flowchart LR\n  c[Cliente] -->|POST| a[API Cloud Run]\n  a -->|202 + task_id| c\n  a --> p[[Pub/Sub]]\n  p --> w[Agente]\n  w -->|progreso| f[(Firestore)]\n  f -.-> a\n  a -.->|SSE| c\n  p -.->|sin más reintentos| d[[Dead letter]]",
      caption:
        "Push espera máx. 600 s y Cloud Run hasta 60 min. [Pub/Sub](https://docs.cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions), [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/request-timeout)",
      notes:
        "Async Request-Reply. En la demo el cliente es el webhook de GitHub, firmado con HMAC. El 202 protege al core. Pub/Sub entrega al menos una vez, así que cada handler debe ser idempotente: en la demo el task_id sale del commit. Eventarc conecta el resto: cuando el sandbox deja su resultado en Cloud Storage, Eventarc avisa. Mito: el balanceador no te corta a los 30 s en Cloud Run; ese es el default de backends normales, con NEG serverless son 60 min.",
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
        "Cloud Run **Jobs** corren en microVM (gen2); gVisor es gen1 y GKE",
        "**Cloud Run sandboxes** añaden `sandbox do` dentro del contenedor ([Preview](https://docs.cloud.google.com/run/docs/code-execution))",
      ],
      notes:
        "Actualización importante: mucha guía antigua dice 'Cloud Run usa gVisor'. Hoy gen1 es gVisor y gen2 es una microVM, y los jobs solo corren en gen2. Para código generado, Google ofrece Cloud Run sandboxes, en Preview, sin egress y sin acceso al metadata server; Code Execution, totalmente gestionado; y Agent Sandbox en GKE, que admite gVisor o microVM. En la demo combino job más sandbox: el job guarda URLs firmadas y el código no las ve. Lo probé en mi despliegue el 4 de noviembre: desde dentro, metadata e internet salen bloqueados y no se ve ninguna credencial.",
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
        "Dos problemas distintos: qué estoy haciendo ahora y qué sé de antes. Si los mezclas, cada paso arrastra todo el historial y pagas ese contexto una y otra vez. Ojo con los nombres: Vector Search 2.0 ahora se llama Agent Retrieval. Embeddings de distintos modelos no se comparan entre sí, así que migrar es volver a generar todo. Aclaración: la demo solo implementa la working memory en Firestore, con el estado de cada iteración y escalada a un humano. No tiene memoria de largo plazo.",
    },
    {
      id: "structured",
      layout: "code",
      title: "Patrón 4: Structured Outputs como barrera",
      language: "python",
      code: 'response = await client.aio.models.generate_content(\n    model="gemini-3.5-flash-lite",\n    contents=prompt,\n    config=GenerateContentConfig(\n        response_mime_type="application/json",\n        response_schema=Verdict,\n    ),\n)',
      caption:
        "El schema da JSON válido, no la verdad. [Docs de Gemini](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)",
      notes:
        "Sin schema, el modo JSON es solo una pista. Con schema y application/json, Google documenta JSON válido. Eso es sintaxis. `approved: true` puede ser perfectamente válido y perfectamente falso. Por eso en la demo vuelvo a validar con Pydantic, por si la respuesta se corta o cambia el modelo, y la decisión final la toma código: el modelo no puede aprobar un test en rojo.",
    },

    // ── Fase 3 · Demo ─────────────────────────────────────────
    {
      id: "swarm",
      layout: "diagram",
      title: "Anatomía del enjambre",
      source:
        "flowchart LR\n  pr[PR de GitHub] -->|webhook| api[API Cloud Run]\n  api --> q[[Pub/Sub]]\n  q --> t[1. Triage<br/>Flash]\n  t --> s[2. Runner<br/>Job + sandbox]\n  s -->|GCS + Eventarc| j[3. Judge<br/>Flash-Lite]\n  j -->|verde| c[Comenta el fix]\n  j -->|rojo, máx. 3| t\n  j -->|sin intentos| h[Humano]",
      caption:
        "`gemini-3.8-flash` y `gemini-3.5-flash-lite`: una tarea por modelo, no un gigante con todas.",
      notes:
        "CodeSentry Swarm. Tres etapas, y solo dos usan modelo. Triage lee el diff y un resumen del AST, y devuelve hipótesis, test y fix. Runner no piensa: corre el test contra el PR, que debe fallar, y luego toda la suite con el fix, que debe pasar. Judge recibe los exit codes y escribe el veredicto; el reporte JSON lo arma el código. Cada salto es un mensaje de Pub/Sub, y el resultado del sandbox vuelve por Cloud Storage y Eventarc. Regla: nunca hace push, solo comenta. El merge es humano.",
    },
    {
      id: "eval-loop",
      layout: "code",
      title: "Eval loop en vivo",
      language: "text",
      code: "iter 1  hipótesis: el signo está invertido, usa abs()\n        antes del fix  exit 1  assert 110.0 == 100\n        con el fix     exit 1  assert 90.0 == 100\n        juez           rechaza\n\niter 2  hipótesis: el porcentaje no tiene rango, limítalo a 0..100\n        antes del fix  exit 1  assert 110.0 == 100\n        con el fix     exit 0  4 passed",
      caption:
        "`uv run codesentry demo`: pytest real, respuestas del modelo guionizadas.",
      notes:
        "Plan A: `scripts/open-demo-pr.sh` abre un PR real y el enjambre comenta en 2 a 5 minutos. Plan B: el modo replay no necesita red, y el pytest sigue siendo real. Di en voz alta que las respuestas del modelo están guionizadas si usas replay. Lo interesante no es el acierto, es el fallo: la primera hipótesis es razonable y es incorrecta, el test la tumba y la retroalimentación corrige el rumbo. Antes de subir, abre un PR para calentar el job: el primer arranque tardó 1 min 32 s. Medido el 4 de noviembre en 3 PRs: de 1 min 46 s a 4 min 22 s, de 0,011 a 0,016 USD. Dos acertaron a la primera y uno necesitó 2 iteraciones, así que esta lámina muestra la corrida guionizada. Si queda tiempo: scripts/open-escape-pr.sh.",
    },
    {
      id: "trace",
      layout: "diagram",
      title: "Si no lo ves, no es un sistema",
      source:
        "flowchart LR\n  a[task.submit] -->|traceparent en el mensaje| b[agent.triage]\n  b --> c[chat gemini<br/>tokens in/out]\n  b -->|traceparent| d[agent.run]\n  d --> e[sandbox.execute]\n  e -->|Eventarc| r[sandbox.result<br/>exit codes]\n  r -->|traceparent| f[agent.judge]\n  f --> g[chat gemini<br/>tokens in/out]",
      caption:
        "OpenTelemetry a Cloud Trace por [OTLP](https://cloud.google.com/blog/products/management-tools/opentelemetry-now-in-google-cloud-observability), con atributos `gen_ai.*`.",
      notes:
        "Una tarea, una traza, de punta a punta. El detalle: la propagación es tu trabajo. El cliente de Pub/Sub crea una traza por mensaje, y el modelo es una llamada hoja, no propaga nada. Por eso traceparent viaja en cada mensaje, se guarda antes de lanzar el sandbox y cada llamada al modelo es un span con tokens. Sin eso, el resultado que llega por Eventarc abre una traza nueva: me pasó en la demo. Las convenciones gen_ai aún son experimentales, pero ya permiten responder qué paso costó más y dónde se fue la latencia.",
    },

    // ── Fase 4 · Producción ───────────────────────────────────
    {
      id: "guardrails",
      layout: "icons-grid",
      title: "Costos y guardrails",
      items: [
        {
          icon: "coins",
          title: "Presupuesto por tarea",
          body: "Tokens contados antes de cada llamada.",
        },
        {
          icon: "repeat",
          title: "Máximo 3 iteraciones",
          body: "Después escala a un humano.",
        },
        {
          icon: "timer",
          title: "Timeouts duros",
          body: "En cada llamada al modelo y en cada ejecución.",
        },
        {
          icon: "zap-off",
          title: "Circuit breakers",
          body: "Si el modelo falla, deja de insistir.",
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
        "Un bucle sin límites es una factura sin techo. La demo añade una política: un fix solo toca archivos fuente que ya existen, nunca tests ni CI, y los PRs de forks se ignoran. Todo esto vive en código, no en el prompt: un prompt no es un control de seguridad. Si te preguntan por modelos: gemini-3.6-flash se retira el 19 de noviembre y 2.5 ya no está. Revisa la página de ciclo de vida antes de fijar un ID.",
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
      ],
      notes:
        "Si te llevas una sola cosa: ponle a tu agente el mismo trato que a una API de un tercero que no controlas. Timeouts, reintentos, validación y ninguna confianza. Elige un endpoint de IA de tu sistema y aplica el primer punto esta semana.",
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
          label: "Cloud Run sandboxes",
          href: "https://docs.cloud.google.com/run/docs/code-execution",
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
        "Backend architecture patterns on GCP for autonomous systems: how to decouple the probabilistic chaos of agents from your backend's core.",
      slides: {
        cover: {
          eyebrow: "DevFest 2026",
          title: "From REST APIs to Autonomous Systems",
          subtitle:
            "Backend architecture patterns on GCP to decouple *probabilistic chaos* from your core.",
          notes:
            "Thesis: a classic backend assumes Request → DB → Response in about 200 ms, as a rule of thumb. An agent breaks that contract: variable latency, probabilistic loops, untrusted code and massive state. Today we leave with a blueprint, not a product list. Timing for 45 minutes: diagnosis 6, patterns 14, demo and swarm 13, production 5, questions 7.",
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
        wrapper: {
          title: "The false promise of the wrapper",
          code: '@app.post("/api/chat")\ndef chat(body: ChatRequest):\n    # A worker blocked while the model thinks\n    reply = llm.generate(body.message)\n    # The model\'s code, inside your process\n    result = exec_tool(reply.code)\n    # A client retry bills everything again\n    return db.save(reply, result)',
          caption:
            "Timeouts, *thread starvation*, uncapped costs and zero idempotency.",
          notes:
            "We have all written this, and it works in the demo. In production, when the agent takes long, workers run out and everything without AI goes down too. The client retries and you pay twice. And the model's code runs with your credentials.",
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
              heading: "Agent (ReAct)",
              items: [
                "Reason, act, observe, repeat",
                "==N steps==: you don't know how many",
                "Code nobody reviewed",
                "Context that grows at every step",
              ],
            },
          ],
          notes:
            "ReAct: Reason, Act, Observe, in a loop. The number of steps is a random variable, so latency and cost are too. The backend doesn't become probabilistic: we put a boundary around it. The next four patterns are that boundary.",
        },
        "async-reply": {
          title: "Pattern 1: never block, enqueue",
          source:
            "flowchart LR\n  c[Client] -->|POST| a[Cloud Run API]\n  a -->|202 + task_id| c\n  a --> p[[Pub/Sub]]\n  p --> w[Agent]\n  w -->|progress| f[(Firestore)]\n  f -.-> a\n  a -.->|SSE| c\n  p -.->|out of retries| d[[Dead letter]]",
          caption:
            "Push waits 600 s at most and Cloud Run up to 60 min. [Pub/Sub](https://docs.cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions), [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/request-timeout)",
          notes:
            "Async Request-Reply. In the demo the client is GitHub's webhook, signed with HMAC. The 202 protects the core. Pub/Sub delivers at least once, so every handler must be idempotent: in the demo the task_id comes from the commit. Eventarc connects the rest: when the sandbox leaves its result in Cloud Storage, Eventarc reports it. Myth: the load balancer doesn't cut you off at 30 s on Cloud Run; that's the default for regular backends, serverless NEGs get 60 min.",
        },
        sandbox: {
          title: "Pattern 2: all LLM code is hostile",
          items: [
            "**Every run in its own environment**, ephemeral and disposable",
            "**No network:** egress denied by default",
            "**No identity:** no credentials, variables or metadata server",
            "**Hard quotas:** CPU, memory and time",
            "Cloud Run **Jobs** run on a microVM (gen2); gVisor means gen1 and GKE",
            "**Cloud Run sandboxes** add `sandbox do` inside the container ([Preview](https://docs.cloud.google.com/run/docs/code-execution))",
          ],
          notes:
            "Important update: a lot of older guidance says 'Cloud Run uses gVisor'. Today gen1 is gVisor and gen2 is a microVM, and jobs only run on gen2. For generated code, Google offers Cloud Run sandboxes, in Preview, with no egress and no metadata server access; Code Execution, fully managed; and Agent Sandbox on GKE, which supports gVisor or microVMs. In the demo I combine a job and a sandbox: the job holds signed URLs and the code never sees them. I tested it on my deployment on 4 November: from inside, metadata and the internet are blocked and no credential is visible.",
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
            "Two different problems: what am I doing now, and what do I know from before. Mix them and every step drags the whole history along, and you pay for that context again and again. Watch the names: Vector Search 2.0 is now Agent Retrieval. Embeddings from different models aren't comparable, so migrating means generating everything again. To be clear: the demo only implements working memory in Firestore, with each iteration's state and escalation to a human. It has no long-term memory.",
        },
        structured: {
          title: "Pattern 4: Structured Outputs as a barrier",
          caption:
            "A schema gives you valid JSON, not the truth. [Gemini docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)",
          notes:
            "Without a schema, JSON mode is only a hint. With a schema and application/json, Google documents valid JSON. That's syntax. `approved: true` can be perfectly valid and perfectly false. So in the demo I validate again with Pydantic, in case a response gets cut off or the model changes, and code makes the final call: the model can't approve a red test.",
        },
        swarm: {
          title: "Anatomy of the swarm",
          source:
            "flowchart LR\n  pr[GitHub PR] -->|webhook| api[Cloud Run API]\n  api --> q[[Pub/Sub]]\n  q --> t[1. Triage<br/>Flash]\n  t --> s[2. Runner<br/>Job + sandbox]\n  s -->|GCS + Eventarc| j[3. Judge<br/>Flash-Lite]\n  j -->|green| c[Comments the fix]\n  j -->|red, max 3| t\n  j -->|out of attempts| h[Human]",
          caption:
            "`gemini-3.8-flash` and `gemini-3.5-flash-lite`: one job per model, not one giant doing it all.",
          notes:
            "CodeSentry Swarm. Three stages, and only two use a model. Triage reads the diff and an AST outline, and returns a hypothesis, a test and a fix. Runner doesn't think: it runs the test against the PR, which must fail, then the whole suite with the fix, which must pass. Judge receives the exit codes and writes the verdict; code builds the JSON report. Each hop is a Pub/Sub message, and the sandbox result comes back through Cloud Storage and Eventarc. Rule: it never pushes, it only comments. Merging is human.",
        },
        "eval-loop": {
          title: "Live eval loop",
          code: "iter 1  hypothesis: the sign is flipped, use abs()\n        before the fix  exit 1  assert 110.0 == 100\n        with the fix    exit 1  assert 90.0 == 100\n        judge           rejects\n\niter 2  hypothesis: the percent has no range, clamp it to 0..100\n        before the fix  exit 1  assert 110.0 == 100\n        with the fix    exit 0  4 passed",
          caption:
            "`uv run codesentry demo`: real pytest, scripted model answers.",
          notes:
            "Plan A: `scripts/open-demo-pr.sh` opens a real PR and the swarm comments in 2 to 5 minutes. Plan B: replay mode needs no network, and pytest is still real. Say out loud that the model answers are scripted if you use replay. The interesting part isn't the hit, it's the miss: the first hypothesis is reasonable and wrong, the test knocks it down and the feedback corrects course. Before going on stage, open a PR to warm up the job: the first start took 1 min 32 s. Measured on 4 November across 3 PRs: 1 min 46 s to 4 min 22 s, USD 0.011 to 0.016. Two got it right the first time and one needed 2 iterations, so this slide shows the scripted run. If there's time: scripts/open-escape-pr.sh.",
        },
        trace: {
          title: "If you can't see it, it isn't a system",
          source:
            "flowchart LR\n  a[task.submit] -->|traceparent in the message| b[agent.triage]\n  b --> c[chat gemini<br/>tokens in/out]\n  b -->|traceparent| d[agent.run]\n  d --> e[sandbox.execute]\n  e -->|Eventarc| r[sandbox.result<br/>exit codes]\n  r -->|traceparent| f[agent.judge]\n  f --> g[chat gemini<br/>tokens in/out]",
          caption:
            "OpenTelemetry to Cloud Trace over [OTLP](https://cloud.google.com/blog/products/management-tools/opentelemetry-now-in-google-cloud-observability), with `gen_ai.*` attributes.",
          notes:
            "One task, one trace, end to end. The catch: propagation is your job. The Pub/Sub client creates a trace per message, and the model is a leaf call that propagates nothing. So traceparent travels in every message, is saved before the sandbox starts, and every model call is a span with tokens. Without that, the result arriving through Eventarc opens a new trace: it happened to me in the demo. The gen_ai conventions are still experimental, but they already answer which step cost the most and where the latency went.",
        },
        guardrails: {
          title: "Costs and guardrails",
          items: [
            {
              icon: "coins",
              title: "Budget per task",
              body: "Tokens counted before each call.",
            },
            {
              icon: "repeat",
              title: "3 iterations at most",
              body: "Then it escalates to a human.",
            },
            {
              icon: "timer",
              title: "Hard timeouts",
              body: "On every model call and every run.",
            },
            {
              icon: "zap-off",
              title: "Circuit breakers",
              body: "When the model fails, stop insisting.",
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
            "A loop with no limits is an invoice with no ceiling. The demo adds a policy: a fix only touches existing source files, never tests or CI, and pull requests from forks are ignored. All of this lives in code, not in the prompt: a prompt isn't a security control. If asked about models: gemini-3.6-flash retires on 19 November and 2.5 is already gone. Check the lifecycle page before pinning an ID.",
        },
        monday: {
          title: "Your Monday checklist",
          items: [
            "Treat the agent as an **untrusted external service**",
            "**Isolate** all dynamic compute",
            "Build on **events**, never on blocking HTTP",
            "**Type and validate** every input and output",
          ],
          notes:
            "If you take one thing away: treat your agent like a third-party API you don't control. Timeouts, retries, validation and no trust. Pick one AI endpoint in your system and apply the first point this week.",
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
