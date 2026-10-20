import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const aiSecurityDoubleEdgedSword: Record<Locale, BlogPost> = {
  en: {
    slug: 'ai-security-double-edged-sword',
    title: 'AI and Security: The Same Tool on Both Sides',
    date: 'May 18, 2026',
    excerpt: "AI helped find critical bugs in GitHub, NGINX and the Linux kernel, and attackers have the same models. Plus the Ecuador breach that exposed almost every adult's biometrics, and what I would do about all of it.",
    imageUrl: '/blog/ai-security-double-edged-sword.webp',
    imageAiHint: 'cybersecurity visualization showing AI as double-edged sword: one side showing AI defending systems with shields and security locks, other side showing AI attacking with red warning symbols; center displays code vulnerabilities being discovered; background shows GitHub, NGINX, Linux logos with security breach indicators; Ecuador map with data leak visualization; binary code flowing; dramatic contrast between blue (defense) and red (attack) colors; professional tech illustration',
    content: `
## AI finds the bugs now. For both sides.

Over the last few months, AI has helped find a remote code execution flaw in GitHub's git infrastructure, an 18-year-old vulnerability in NGINX, a zero-day in the Linux kernel and critical holes in Grafana Enterprise.

That's great news for defenders. It's also the problem: if AI can find these bugs so we can fix them, attackers can use the same models to find them first. And they already do.

While most of us were excited about AI writing code faster, we didn't spend much time on the obvious follow-up question: what happens when the same tools are pointed at the systems they helped build?

This post goes through the most important AI-discovered vulnerabilities of 2025 and 2026, the breach in Ecuador that exposed close to 15 million people, and what I think it means for how we build software.

## Three bugs AI found

### GitHub, CVE-2026-3854: RCE with a \`git push\`

In early 2026, researchers at Wiz used AI to find a critical remote code execution bug in GitHub's internal git infrastructure:

- **CVSS:** 8.7 (high)
- **Impact:** RCE on GitHub.com and GitHub Enterprise Server
- **How they found it:** AI-assisted reverse engineering of closed-source binaries

It's one of the first critical bugs found this way in closed-source code. The researchers said they'd been "chasing this target since September 2024" but couldn't justify the effort of traditional reverse engineering, which would have taken weeks or months. With AI, they got there.

The exploit was almost embarrassingly simple: an authenticated user could run arbitrary commands on GitHub's backend with a \`git push\`. On GitHub.com that meant code execution on shared storage nodes holding repositories from millions of other users and organizations. On GitHub Enterprise Server, it meant full server compromise: every repository and every internal secret.

GitHub mitigated it on GitHub.com within six hours of the report. But at disclosure, 88% of Enterprise Server instances were still vulnerable, which is the part that should worry anyone running self-hosted infrastructure.

### NGINX, CVE-2026-42945: hiding since 2008

In April 2026, the AI security company DepthFirst found a critical buffer overflow in NGINX that had been there since 2008:

- **Affected versions:** 0.6.27 (November 2008) through 1.30.0 (April 2026)
- **Impact:** remote code execution and denial of service
- **How they found it:** AI-driven code analysis

Nobody found it in eighteen years because it needs a very specific setup: a configuration that combines the \`rewrite\` and \`set\` directives in particular patterns, plus ASLR turned off, which is rare but happens in some VMs and embedded deployments. With that in place, a single unauthenticated request could trigger the overflow.

NGINX runs a big share of the world's busiest sites, banks, e-commerce and cloud providers included. The AI's advantage here was patience: reasoning through combinations of configuration and edge cases that normal testing never explores.

### Linux kernel, CVE-2025-37899: a zero-day found with o3

In May 2025, security researcher Sean Heelan published how he used OpenAI's o3 model to find a zero-day in the Linux kernel, in \`ksmbd\`, the in-kernel SMB3 server. It was a use-after-free: when several connections bind to the same session, one thread handling a LOGOFF frees \`sess->user\` while another thread is still using it.

Heelan gave o3 about 12,000 lines of the \`ksmbd\` code and asked it to look for use-after-free bugs. What's interesting is how it found it. It didn't just match a pattern; it reasoned about concurrency, followed the logic across threads and proposed an unsafe interleaving that most linters would never flag.

The uncomfortable implication: if a researcher can find a kernel zero-day with a publicly available model, so can an attacker.

## Ecuador: when bad security meets national ID data

While AI was finding bugs in software, Ecuador was going through one of the worst data breaches I've seen, and it had nothing to do with clever AI.

In May 2026, dark web monitoring picked up a massive breach of the Dirección General de Registro Civil, Identificación y Cedulación (DIGERCIC), the national civil registry. A group calling itself "L4TAMFUCKERS" claimed a "joint operation" and published:

- **14.8 million records** (10.8 GB of SQL)
- **10.6 million high-resolution ID card images** (165 GB)
- full names and national ID numbers
- **biometric data:** fingerprints and face images
- digital signatures

Ecuador has roughly 12 to 13 million adults. In practice, this is almost every adult in the country.

### Why it's so bad

A password can be changed. A credit card can be cancelled. Your fingerprint and your face can't. Once they're out, they're out for good, and that changes the risk completely:

- **Deepfakes for KYC bypass.** High-resolution ID photos are exactly what you need to fool identity checks on financial platforms.
- **Identity theft at scale.** Photo, signature, ID number and biometrics: everything needed to impersonate someone.
- **A very long tail.** This data will keep circulating for years, maybe decades.
- **Broken trust.** Everything that relies on the civil registry as the source of truth, from social security to electronic voting, is now built on compromised data.

### How it probably happened

The Registro Civil denied a direct breach of its current systems and said the data came from "external sources" or "historical records". At the same time, the institution reported more than 3.5 million attack attempts between 2024 and 2025, mostly around elections.

We don't know the exact entry point. The usual suspects in cases like this are SQL injection, compromised admin accounts, misconfigured cloud storage, no encryption at rest and weak access control. The data showed up on Dark Forums, with a free sample published to prove it was real. The Superintendencia de Protección de Datos opened an investigation, but the damage was done.

The "L4TAM" in the name suggests an actor focused on Latin American governments, and it isn't the first case: Ecuador's Agencia Nacional de Tránsito (ANT) has had leaks too, and other countries in the region have seen similar attacks. Poor security in critical government systems isn't just negligence. It's a national security problem.

## The same tool on both sides

AI doesn't care which side it's on. Copilot helps you write code faster, ChatGPT suggests whole functions, agents refactor a codebase in seconds. The same models can look at the authentication logic they wrote and find the hole in it.

Attackers are already using AI to:

1. **dig through legacy code** looking for patterns humans missed, like that 18-year-old NGINX bug
2. **turn a vulnerability description into a working exploit** quickly
3. **automate reconnaissance:** map the attack surface, find weak spots and prioritize targets
4. **write phishing** that's very hard to tell apart from a real email
5. **brute-force defenses**, trying thousands of payloads to get past a WAF or input validation

So we're in an arms race where both sides have the same tools, and the real question is who's faster. Right now attackers have an edge for a simple reason: defenders have to protect everything, and attackers only need one gap.

## The holes AI leaves in your own code

There's also a quieter problem: AI-generated code often ships with security bugs, because the models learned from a lot of public code full of bad habits. The ones I see most:

**Unsafe deserialization.**

\`\`\`python
import pickle
data = pickle.load(open("user_data.pkl", "rb"))  # runs arbitrary code if the file isn't trusted
\`\`\`

**No input validation.**

\`\`\`javascript
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query(\`SELECT * FROM users WHERE id = \${userId}\`); // SQL injection
});
\`\`\`

**Secrets in the code.**

\`\`\`python
API_KEY = "sk-1234567890abcdef"  # now it's in Git forever
\`\`\`

Also common: concurrent code without proper synchronization (the same family of bug as the kernel one above) and error handling that leaks stack traces or internal details to the user.

If you use AI to write code faster, you also ship vulnerabilities faster. Without real security review, it becomes a very efficient way to produce them.

## What I'd actually do

The good news is that defense can use AI too. This is what I'd put in place:

**Audit your code with AI before someone else does.** CodeQL with GitHub code scanning and Copilot Autofix, Snyk, Semgrep. Run them in CI on every pull request, not once a year:

\`\`\`bash
semgrep --config=auto --json > security-report.json
\`\`\`

**Ask for security explicitly.** "Write a login function" gets you a login function. "Write a login function with bcrypt, rate limiting, CSRF protection, parameterized queries, input validation and secure sessions" gets you something you can ship.

**Never trust generated code blindly.** Review it for input validation, authentication and authorization, secret handling, error handling and injection (SQL, XSS, commands).

**Use AI for threat modeling.** "Look at this auth flow and tell me how you'd attack it, considering the OWASP Top 10" is a surprisingly useful prompt.

**Layer your defenses.** A WAF, rate limiting, encryption at rest and in transit, zero trust between services, MFA, and monitoring that catches anomalies in real time. No single layer is enough.

**Keep dependencies updated.** Bugs found by AI are being patched constantly, and \`npm audit\` or \`pip-audit\` only help if you actually run them.

**Train the team.** Security is a people problem as much as a technical one: secure coding practices, regular reviews, pentests, phishing drills and a culture where raising a concern is normal.

**If you build AI features, secure them too.** Follow the OWASP guidance for LLM applications, defend against prompt injection and data poisoning, protect your training data and watch how the model behaves in production.

**Encrypt sensitive data properly.** The Ecuador lesson: keys in an HSM, TLS 1.3 in transit, fine-grained access control (ABAC) and logs of who accesses what.

**Assume you'll be breached.** Have an incident response plan, a notification process, tested backups and the ability to investigate what happened.

## Can we win this?

AI is finding vulnerabilities faster than we can patch them, and attackers are using it to exploit systems faster than we can secure them. Eighteen-year-old NGINX bugs, an RCE in GitHub found through AI-assisted reverse engineering, a kernel zero-day found with a public model, and 15 million people exposed by basic security failures.

The optimistic view is that AI can also be our best defense: scanning at scale, real-time detection, finding risks before they're exploited and helping write patches faster. The pessimistic view is that attackers only need one bug, have no ethical constraints, have money as a motive and work in the dark.

What I actually believe is in between: security is a continuous process, not something you finish. Invest in AI-assisted defense, teach people to write secure code, build security into the development process, share threat intelligence across companies and countries, and regulate how AI is used in this space.

If AI writes your code, it can also break it. The same tools that make us faster make us more exposed. So start now: audit your systems, train your team and use AI for defense before someone uses it against you. Breaches will happen. The worst case is one you never find out about.
`,
    author: 'Sebastian Alvarez',
    tags: ['Cybersecurity', 'AI', 'Vulnerabilities', 'Data Breach', 'Security', 'GitHub', 'NGINX', 'Linux', 'Ecuador']
  },
  es: {
    slug: 'ai-security-double-edged-sword',
    title: 'IA y seguridad: la misma herramienta en los dos lados',
    date: 'May 18, 2026',
    excerpt: 'La IA ayudó a encontrar bugs críticos en GitHub, NGINX y el kernel de Linux, y los atacantes tienen los mismos modelos. Además, la filtración en Ecuador que expuso la biometría de casi todos los adultos, y lo que yo haría al respecto.',
    imageUrl: '/blog/ai-security-double-edged-sword.webp',
    imageAiHint: 'visualización de ciberseguridad mostrando IA como espada de doble filo: un lado mostrando IA defendiendo sistemas con escudos y candados de seguridad, otro lado mostrando IA atacando con símbolos de advertencia rojos; centro muestra vulnerabilidades de código siendo descubiertas; fondo muestra logos de GitHub, NGINX, Linux con indicadores de brecha de seguridad; mapa de Ecuador con visualización de fuga de datos; código binario fluyendo; contraste dramático entre colores azul (defensa) y rojo (ataque); ilustración técnica profesional',
    content: `
## Ahora la IA encuentra los bugs. Para los dos lados.

En los últimos meses, la IA ayudó a encontrar una falla de ejecución remota de código en la infraestructura git de GitHub, una vulnerabilidad de 18 años en NGINX, un zero-day en el kernel de Linux y huecos críticos en Grafana Enterprise.

Para quienes defienden, es una gran noticia. También es el problema: si la IA puede encontrar estos bugs para que los arreglemos, los atacantes pueden usar los mismos modelos para encontrarlos primero. Y ya lo hacen.

Mientras casi todos estábamos entusiasmados con que la IA escribiera código más rápido, no le dedicamos mucho tiempo a la pregunta obvia que venía después: ¿qué pasa cuando esas mismas herramientas apuntan contra los sistemas que ayudaron a construir?

Este post repasa las vulnerabilidades más importantes descubiertas con IA en 2025 y 2026, la filtración en Ecuador que expuso a casi 15 millones de personas y lo que creo que significa para cómo construimos software.

## Tres bugs que encontró la IA

### GitHub, CVE-2026-3854: RCE con un \`git push\`

A inicios de 2026, investigadores de Wiz usaron IA para encontrar un bug crítico de ejecución remota de código en la infraestructura git interna de GitHub:

- **CVSS:** 8,7 (alta)
- **Impacto:** RCE en GitHub.com y GitHub Enterprise Server
- **Cómo lo encontraron:** ingeniería inversa de binarios de código cerrado asistida por IA

Es uno de los primeros bugs críticos encontrados así en código cerrado. Los investigadores contaron que venían "persiguiendo este objetivo desde septiembre de 2024", pero no podían justificar el esfuerzo de una ingeniería inversa tradicional, que habría tomado semanas o meses. Con IA, llegaron.

El exploit era casi vergonzosamente simple: un usuario autenticado podía ejecutar comandos arbitrarios en el backend de GitHub con un \`git push\`. En GitHub.com, eso significaba ejecución de código en nodos de almacenamiento compartido con repositorios de millones de otros usuarios y organizaciones. En GitHub Enterprise Server, significaba comprometer el servidor entero: todos los repositorios y todos los secretos internos.

GitHub lo mitigó en GitHub.com en seis horas desde el reporte. Pero cuando se publicó, el 88% de las instancias de Enterprise Server seguían vulnerables, que es lo que debería preocupar a cualquiera que tenga infraestructura propia.

### NGINX, CVE-2026-42945: escondido desde 2008

En abril de 2026, la empresa de seguridad con IA DepthFirst encontró un buffer overflow crítico en NGINX que llevaba ahí desde 2008:

- **Versiones afectadas:** de la 0.6.27 (noviembre de 2008) a la 1.30.0 (abril de 2026)
- **Impacto:** ejecución remota de código y denegación de servicio
- **Cómo lo encontraron:** análisis de código con IA

Nadie lo encontró en dieciocho años porque necesita una configuración muy específica: combinar las directivas \`rewrite\` y \`set\` con ciertos patrones, más ASLR desactivado, algo raro pero que pasa en algunas VMs y despliegues embebidos. Con eso, una sola petición sin autenticar podía disparar el overflow.

NGINX está detrás de buena parte de los sitios más visitados del mundo, incluidos bancos, e-commerce y proveedores cloud. La ventaja de la IA aquí fue la paciencia: razonar combinaciones de configuración y casos borde que las pruebas normales nunca exploran.

### Kernel de Linux, CVE-2025-37899: un zero-day encontrado con o3

En mayo de 2025, el investigador de seguridad Sean Heelan publicó cómo usó el modelo o3 de OpenAI para encontrar un zero-day en el kernel de Linux, en \`ksmbd\`, el servidor SMB3 del kernel. Era un use-after-free: cuando varias conexiones se asocian a la misma sesión, un hilo que procesa un LOGOFF libera \`sess->user\` mientras otro hilo todavía lo está usando.

Heelan le pasó a o3 unas 12.000 líneas del código de \`ksmbd\` y le pidió buscar bugs de tipo use-after-free. Lo interesante es cómo lo encontró. No se limitó a reconocer un patrón; razonó sobre concurrencia, siguió la lógica entre hilos y propuso un entrelazado inseguro que la mayoría de los linters nunca marcaría.

La implicación incómoda: si un investigador puede encontrar un zero-day en el kernel con un modelo público, un atacante también.

## Ecuador: cuando la mala seguridad se cruza con los datos de identidad de un país

Mientras la IA encontraba bugs en software, Ecuador vivía una de las peores filtraciones de datos que he visto, y no tuvo nada que ver con IA sofisticada.

En mayo de 2026, el monitoreo de la dark web detectó una filtración masiva de la Dirección General de Registro Civil, Identificación y Cedulación (DIGERCIC). Un grupo que se hace llamar "L4TAMFUCKERS" se atribuyó una "operación conjunta" y publicó:

- **14,8 millones de registros** (10,8 GB de SQL)
- **10,6 millones de imágenes de cédulas en alta resolución** (165 GB)
- nombres completos y números de cédula
- **datos biométricos:** huellas dactilares e imágenes del rostro
- firmas digitales

Ecuador tiene alrededor de 12 a 13 millones de adultos. En la práctica, son casi todos los adultos del país.

### Por qué es tan grave

Una contraseña se puede cambiar. Una tarjeta de crédito se puede anular. Tu huella y tu cara, no. Una vez que salen, salen para siempre, y eso cambia el riesgo por completo:

- **Deepfakes para saltarse el KYC.** Las fotos de cédula en alta resolución son justo lo que hace falta para engañar verificaciones de identidad en plataformas financieras.
- **Robo de identidad a escala.** Foto, firma, número de cédula y biometría: todo lo necesario para hacerse pasar por alguien.
- **Una cola muy larga.** Estos datos van a seguir circulando durante años, quizá décadas.
- **Confianza rota.** Todo lo que usa al Registro Civil como fuente de verdad, desde la seguridad social hasta el voto electrónico, ahora se apoya en datos comprometidos.

### Cómo pudo haber pasado

El Registro Civil negó un hackeo directo a sus sistemas actuales y dijo que los datos venían de "fuentes externas" o de "registros históricos". Al mismo tiempo, la institución reportó más de 3,5 millones de intentos de ataque entre 2024 y 2025, sobre todo en épocas electorales.

No sabemos el punto exacto de entrada. Los sospechosos de siempre en casos así son inyección SQL, cuentas de administrador comprometidas, almacenamiento en la nube mal configurado, nada de cifrado en reposo y controles de acceso débiles. Los datos aparecieron en Dark Forums, con una muestra gratis publicada para demostrar que eran reales. La Superintendencia de Protección de Datos abrió una investigación, pero el daño ya estaba hecho.

El "L4TAM" del nombre sugiere un actor enfocado en gobiernos latinoamericanos, y no es el primer caso: la Agencia Nacional de Tránsito (ANT) de Ecuador también tuvo filtraciones, y otros países de la región han visto ataques parecidos. La mala seguridad en sistemas críticos del Estado no es solo negligencia. Es un problema de seguridad nacional.

## La misma herramienta en los dos lados

A la IA no le importa de qué lado está. Copilot te ayuda a escribir código más rápido, ChatGPT te sugiere funciones enteras, los agentes refactorizan un proyecto en segundos. Los mismos modelos pueden mirar la lógica de autenticación que escribieron y encontrarle el hueco.

Los atacantes ya usan IA para:

1. **escarbar en código legacy** buscando patrones que se le pasaron a la gente, como ese bug de 18 años en NGINX
2. **convertir la descripción de una vulnerabilidad en un exploit que funciona**, rápido
3. **automatizar el reconocimiento:** mapear la superficie de ataque, encontrar puntos débiles y priorizar objetivos
4. **escribir phishing** muy difícil de distinguir de un correo real
5. **forzar las defensas**, probando miles de payloads para pasar un WAF o una validación de entrada

Así que estamos en una carrera armamentista donde los dos lados tienen las mismas herramientas, y la pregunta real es quién es más rápido. Hoy los atacantes llevan ventaja por una razón simple: quien defiende tiene que proteger todo, y quien ataca solo necesita un hueco.

## Los huecos que la IA deja en tu propio código

Hay además un problema más silencioso: el código generado con IA muchas veces sale con bugs de seguridad, porque los modelos aprendieron de mucho código público lleno de malas costumbres. Los que más veo:

**Deserialización insegura.**

\`\`\`python
import pickle
data = pickle.load(open("user_data.pkl", "rb"))  # ejecuta código arbitrario si el archivo no es confiable
\`\`\`

**Sin validación de entrada.**

\`\`\`javascript
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query(\`SELECT * FROM users WHERE id = \${userId}\`); // inyección SQL
});
\`\`\`

**Secretos en el código.**

\`\`\`python
API_KEY = "sk-1234567890abcdef"  # ahora vive en Git para siempre
\`\`\`

También son comunes el código concurrente sin la sincronización correcta (la misma familia de bug que el del kernel) y el manejo de errores que le muestra al usuario stack traces o detalles internos.

Si usas IA para escribir código más rápido, también subes vulnerabilidades más rápido. Sin una revisión de seguridad de verdad, se vuelve una forma muy eficiente de producirlas.

## Lo que yo haría

La buena noticia es que la defensa también puede usar IA. Esto es lo que pondría en marcha:

**Audita tu código con IA antes de que lo haga otro.** CodeQL con el code scanning de GitHub y Copilot Autofix, Snyk, Semgrep. Córrelos en CI en cada pull request, no una vez al año:

\`\`\`bash
semgrep --config=auto --json > security-report.json
\`\`\`

**Pide seguridad de forma explícita.** "Escribe una función de login" te da una función de login. "Escribe una función de login con bcrypt, rate limiting, protección CSRF, consultas parametrizadas, validación de entrada y sesiones seguras" te da algo que puedes subir a producción.

**Nunca confíes a ciegas en código generado.** Revísalo buscando validación de entrada, autenticación y autorización, manejo de secretos, manejo de errores e inyecciones (SQL, XSS, comandos).

**Usa la IA para modelar amenazas.** "Mira este flujo de autenticación y dime cómo lo atacarías, considerando el OWASP Top 10" es un prompt sorprendentemente útil.

**Defensa en capas.** Un WAF, rate limiting, cifrado en reposo y en tránsito, zero trust entre servicios, MFA y monitoreo que detecte anomalías en tiempo real. Ninguna capa sola alcanza.

**Mantén las dependencias al día.** Los bugs que encuentra la IA se parchean todo el tiempo, y \`npm audit\` o \`pip-audit\` solo sirven si de verdad los corres.

**Capacita al equipo.** La seguridad es tanto un problema de personas como técnico: prácticas de código seguro, revisiones periódicas, pentests, simulacros de phishing y una cultura donde levantar una alerta sea normal.

**Si construyes funciones con IA, asegúralas también.** Sigue las guías de OWASP para aplicaciones con LLMs, defiéndete de la inyección de prompts y del envenenamiento de datos, protege tus datos de entrenamiento y vigila cómo se comporta el modelo en producción.

**Cifra bien los datos sensibles.** La lección de Ecuador: llaves en un HSM, TLS 1.3 en tránsito, control de acceso fino (ABAC) y registros de quién accede a qué.

**Asume que te van a vulnerar.** Ten un plan de respuesta a incidentes, un proceso de notificación, backups probados y la capacidad de investigar qué pasó.

## ¿Podemos ganar esta carrera?

La IA encuentra vulnerabilidades más rápido de lo que podemos parchearlas, y los atacantes la usan para explotar sistemas más rápido de lo que podemos asegurarlos. Bugs de dieciocho años en NGINX, un RCE en GitHub encontrado con ingeniería inversa asistida por IA, un zero-day en el kernel encontrado con un modelo público y 15 millones de personas expuestas por fallas de seguridad básicas.

La visión optimista es que la IA también puede ser nuestra mejor defensa: escaneo a escala, detección en tiempo real, encontrar riesgos antes de que se exploten y ayudar a escribir parches más rápido. La pesimista es que a los atacantes les basta un bug, no tienen restricciones éticas, el dinero los motiva y trabajan en la sombra.

Lo que de verdad creo está en el medio: la seguridad es un proceso continuo, no algo que se termina. Hay que invertir en defensa asistida por IA, enseñar a escribir código seguro, meter la seguridad dentro del proceso de desarrollo, compartir información de amenazas entre empresas y países, y regular cómo se usa la IA en este terreno.

Si la IA escribe tu código, también lo puede romper. Las mismas herramientas que nos hacen más rápidos nos dejan más expuestos. Así que empieza ya: audita tus sistemas, capacita a tu equipo y usa la IA para defenderte antes de que alguien la use en tu contra. Las filtraciones van a pasar. El peor caso es una de la que nunca te enteras.
`,
    author: 'Sebastian Alvarez',
    tags: ['Ciberseguridad', 'IA', 'Vulnerabilidades', 'Brecha de Datos', 'Seguridad', 'GitHub', 'NGINX', 'Linux', 'Ecuador']
  }
};
