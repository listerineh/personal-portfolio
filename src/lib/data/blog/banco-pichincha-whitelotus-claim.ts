import type { BlogPost } from "@/types";
import type { Locale } from "@/i18n/config";

const enContent = `## A day without my bank app

Today, November 10, 2026, I couldn't use the Banco Pichincha app for anything. Not for a few minutes: for many hours. No balance, no transfers, no payments. Every attempt ended in an error screen, and the errors were always the same two: \`429 too many requests\` and \`Global rate limit exceeded\`.

I wasn't the only one. Plenty of people were reporting the app as down at the same time. And over the last few days, a group calling itself WhiteLotus has claimed online that it has data from the bank.

I want to be very clear before going on: **nothing I've found confirms that these two things are connected, or even that the breach happened.** This post separates what's confirmed, what WhiteLotus claims and what is speculation, mine included. The useful part, how to protect yourself, applies whether the claim turns out true or not.

## What is confirmed

Very little, at the time of writing.

- **There is a public claim.** On November 8, 2026, the threat intelligence account VECERT Analyzer posted a [prevention alert](https://x.com/VECERTRadar/status/2119252396257710320) about an alleged breach and data exfiltration at Banco Pichincha attributed to an actor called WhiteLotus. The alert itself labels it "ALLEGED / UNCONFIRMED".
- **Local accounts picked it up.** [Usuarios Digitales](https://x.com/usuariosdigital/status/2119816224171593991) (November 9) and [Emergencias Ec](https://x.com/EmergenciasEc/status/2119927058297999671) relayed the claim, and Emergencias Ec calls it a "presunto incidente" (an alleged incident). [Radio Ecuantena](https://www.facebook.com/ecuantena/posts/tendencia-un-actor-de-amenazas-identificado-como-whitelotus-afirma-ofrecer-datos/1803887758406131/) reported it as a trend: a threat actor identified as WhiteLotus *claims* to offer data.
- **No official confirmation.** I found no statement from Banco Pichincha or from Ecuador's Superintendencia de Bancos confirming or denying the breach, and no coverage in established Ecuadorian or cybersecurity outlets yet.

That's it. Everything else is either the attacker's word or guesswork.

## What WhiteLotus claims

According to the posts above, which repeat what the actor published:

- about **100 MB** of information, **compiled over three months**
- **104 files** of identity and financial data
- **1,413 files** containing **7,683 identity numbers**
- **123 files** of biometric data
- **2,840 files** of credentials and sessions

None of this has been verified by the bank, a regulator or an independent researcher. Threat actors exaggerate, recycle old leaks and mix in data from third parties all the time, because the claim itself is the pressure. Treat these numbers as the attacker's pitch, not as facts.

Some summaries circulating online, including AI-generated ones, add other figures and vendor names. I couldn't trace those to any source, so I'm leaving them out.

## What happened to me

Here is exactly what I saw, without interpretation:

- The app was unusable for many hours today.
- The errors it showed were \`429 too many requests\` and \`Global rate limit exceeded\`.
- Other people were reporting the app as down at the same time.

A "rate limit exceeded" message means a system is refusing requests because it's receiving more than it's configured to accept. "Global" suggests the limit applies across the whole service, not just to my account. That tells you the backend was protecting itself from load. It doesn't tell you *why* there was so much load.

## The speculation (labelled as such)

This is where I go beyond the facts, so read it as hypotheses, not conclusions. A global rate limit firing for hours could be:

1. **A traffic spike from people.** News of a possible breach spreads, everyone opens the app at once to check their balance, and the system throttles. Ironically, the rumor alone could cause the outage.
2. **A defensive measure.** If a bank suspects credential abuse or automated attacks, tightening limits globally is a reasonable first move, even if it locks out legitimate customers.
3. **An attack on availability.** A flood of automated requests (credential stuffing with leaked logins, or a denial-of-service attempt) would trigger exactly these limits.
4. **Something unrelated.** A failed deployment, a dependency outage or a misconfigured limit. The bank has had app failures before: in August 2025 its app [stopped allowing transfers and payments](https://www.bloomberglinea.com/latinoamerica/ecuador/autoridades-desmienten-cierre-de-banco-pichincha-pero-que-pasa-con-la-app-movil/) and the Superintendencia de Bancos opened an administrative sanction process.

I don't know which one it is. Neither does anyone posting confident threads about it. What history does show is that this bank is a real target: in October 2021 a [cyberattack disrupted its operations](https://www.bleepingcomputer.com/news/security/cyberattack-shuts-down-ecuadors-largest-bank-banco-pichincha/), taking ATMs and online banking offline while it shut down parts of its network. Earlier that year, a group called Hotarus Corp claimed to have stolen files, and the bank said the breach was at a marketing provider, not its own systems.

## Why it matters even if it isn't confirmed

If the claim is true, or if a similar one is true in the future, the damage goes beyond one outage.

**For customers:**

- **Targeted phishing.** Leaked names, ID numbers and emails make fake messages very convincing: "Due to the recent incident, verify your identity here."
- **Account takeover.** Leaked credentials or session data get tried automatically against the app and against every other service where you reused the password.
- **Biometrics don't rotate.** You can change a password. You can't change your face. Combined with the [2026 civil registry leak](/blog/ai-security-double-edged-sword) that already exposed ID photos and biometrics of most Ecuadorian adults, this makes identity fraud easier.
- **Social engineering by phone.** Someone who knows your ID number and your bank sounds a lot like the bank.

**For the financial system:**

- **Availability is trust.** When the largest private bank's app is down for hours, people can't pay, get paid or move money. Even without a breach, that hurts.
- **Rumors spread faster than statements.** In August 2025 the Superintendencia had to [deny rumors that the bank would be closed](https://www.bloomberglinea.com/latinoamerica/ecuador/autoridades-desmienten-cierre-de-banco-pichincha-pero-que-pasa-con-la-app-movil/). Silence during an incident leaves room for panic.
- **Shared customers, shared risk.** Data from one bank gets used to attack accounts at others, because people reuse emails, phones and passwords everywhere.

## How to protect yourself as a customer

None of this requires the breach to be real. It's good hygiene either way, and a lot more urgent while the question is open.

**Assume every message about "the incident" is phishing.** Calls, SMS, WhatsApp or emails asking you to verify your identity, update your data or unblock your account: don't click and don't reply. Hang up and contact the bank through the official app or the phone number printed on your card.

**Never share codes.** No legitimate bank employee needs your password, your one-time codes or your card's security code. If someone asks, it's a scam, no matter how much they know about you.

**Change your password, and make it unique.** If you use the same password anywhere else, change it there too. A password manager makes this painless.

**Turn on notifications for every movement.** Set up alerts for transfers, payments and logins so you find out within seconds, not at the end of the month.

**Review your movements more often.** Small unknown charges are often a test before a larger one.

**Lower your limits if you can.** If your banking lets you reduce transfer limits or turn off online and international card use when you're not using them, do it. Turn them back on when you need them.

**Only use the official app.** Install it from the official store, never from a link. Don't install remote-access apps because "support" asked you to.

**Be suspicious of video or selfie verification you didn't start.** With biometric data in circulation, a request to "verify your face" from someone who contacted you is a red flag.

**Check if your email was exposed.** Services like Have I Been Pwned tell you whether your email appears in known leaks.

**Keep evidence.** Screenshots of errors, suspicious messages and unknown transactions help if you need to file a claim with the bank and, if it isn't resolved, with the Superintendencia de Bancos.

## What I'll be watching for

The thing that would settle this is an official statement: from the bank about what happened to the app today and whether any data was accessed, and from the Superintendencia de Bancos as the regulator. Until then, the honest answer is that we don't know.

I'll update this post if that changes. In the meantime, the steps above cost you twenty minutes and protect you from this incident, the next one and the one nobody ever reports.
`;

const esContent = `## Un día sin la app de mi banco

Hoy, 10 de noviembre de 2026, no pude usar la app de Banco Pichincha para nada. No por unos minutos: por muchas horas. Ni saldo, ni transferencias, ni pagos. Cada intento terminaba en una pantalla de error, y los errores eran siempre los mismos dos: \`429 too many requests\` y \`Global rate limit exceeded\`.

No era solo yo. Mucha gente reportaba la app caída al mismo tiempo. Y en los últimos días, un grupo que se hace llamar WhiteLotus afirmó en internet que tiene datos del banco.

Quiero dejar algo muy claro antes de seguir: **nada de lo que encontré confirma que estas dos cosas estén relacionadas, ni siquiera que la filtración haya pasado.** Este post separa lo confirmado, lo que afirma WhiteLotus y lo que es especulación, incluida la mía. La parte útil, cómo protegerte, sirve sea cierta o no la afirmación.

## Lo que está confirmado

Muy poco, al momento de escribir esto.

- **Existe una afirmación pública.** El 8 de noviembre de 2026, la cuenta de inteligencia de amenazas VECERT Analyzer publicó una [alerta preventiva](https://x.com/VECERTRadar/status/2119252396257710320) sobre una supuesta brecha y exfiltración de datos en Banco Pichincha atribuida a un actor llamado WhiteLotus. La propia alerta la marca como "ALLEGED / UNCONFIRMED" (supuesta, no confirmada).
- **Cuentas locales la replicaron.** [Usuarios Digitales](https://x.com/usuariosdigital/status/2119816224171593991) (9 de noviembre) y [Emergencias Ec](https://x.com/EmergenciasEc/status/2119927058297999671) difundieron la afirmación, y Emergencias Ec la llama "presunto incidente". [Radio Ecuantena](https://www.facebook.com/ecuantena/posts/tendencia-un-actor-de-amenazas-identificado-como-whitelotus-afirma-ofrecer-datos/1803887758406131/) lo reportó como tendencia: un actor de amenazas identificado como WhiteLotus *afirma* ofrecer datos.
- **No hay confirmación oficial.** No encontré ningún comunicado de Banco Pichincha ni de la Superintendencia de Bancos que confirme o niegue la filtración, y todavía no hay cobertura en medios ecuatorianos serios ni en medios de ciberseguridad reconocidos.

Eso es todo. Lo demás es palabra del atacante o conjetura.

## Lo que afirma WhiteLotus

Según las publicaciones de arriba, que repiten lo que publicó el actor:

- unos **100 MB** de información, **recopilados durante tres meses**
- **104 archivos** con datos de identidad y financieros
- **1.413 archivos** con **7.683 números de identidad**
- **123 archivos** con datos biométricos
- **2.840 archivos** con credenciales y sesiones

Nada de esto lo ha verificado el banco, un regulador ni un investigador independiente. Los actores de amenazas exageran, reciclan filtraciones viejas y mezclan datos de terceros todo el tiempo, porque la afirmación en sí es la presión. Trata estas cifras como el discurso del atacante, no como hechos.

Algunos resúmenes que circulan, incluidos algunos generados con IA, agregan otras cifras y nombres de proveedores. No pude rastrearlos hasta ninguna fuente, así que los dejo fuera.

## Lo que me pasó a mí

Esto es exactamente lo que vi, sin interpretación:

- La app estuvo inutilizable durante muchas horas hoy.
- Los errores que mostraba eran \`429 too many requests\` y \`Global rate limit exceeded\`.
- Otras personas reportaban la app caída al mismo tiempo.

Un mensaje de "rate limit exceeded" significa que un sistema está rechazando peticiones porque recibe más de las que está configurado para aceptar. Que diga "global" sugiere que el límite aplica a todo el servicio, no solo a mi cuenta. Eso dice que el backend se estaba protegiendo de la carga. No dice *por qué* había tanta carga.

## La especulación (marcada como tal)

Aquí voy más allá de los hechos, así que léelo como hipótesis, no como conclusiones. Un límite global que se dispara durante horas podría ser:

1. **Un pico de tráfico de personas.** Se corre la voz de una posible filtración, todos abren la app al mismo tiempo para revisar su saldo y el sistema limita. Irónicamente, el rumor por sí solo podría causar la caída.
2. **Una medida defensiva.** Si un banco sospecha abuso de credenciales o ataques automatizados, endurecer los límites de forma global es un primer paso razonable, aunque deje fuera a clientes legítimos.
3. **Un ataque a la disponibilidad.** Una avalancha de peticiones automatizadas (credential stuffing con logins filtrados, o un intento de denegación de servicio) dispararía exactamente estos límites.
4. **Algo sin relación.** Un despliegue fallido, la caída de una dependencia o un límite mal configurado. El banco ya ha tenido fallas en la app: en agosto de 2025 la app [dejó de permitir transferencias y pagos](https://www.bloomberglinea.com/latinoamerica/ecuador/autoridades-desmienten-cierre-de-banco-pichincha-pero-que-pasa-con-la-app-movil/) y la Superintendencia de Bancos abrió un proceso administrativo sancionador.

No sé cuál es. Tampoco lo sabe nadie que esté publicando hilos muy seguros al respecto. Lo que sí muestra la historia es que este banco es un objetivo real: en octubre de 2021 un [ciberataque interrumpió sus operaciones](https://www.bleepingcomputer.com/news/security/cyberattack-shuts-down-ecuadors-largest-bank-banco-pichincha/) y dejó fuera de servicio los cajeros y la banca en línea mientras apagaba partes de su red. A inicios de ese mismo año, un grupo llamado Hotarus Corp afirmó haber robado archivos, y el banco dijo que el acceso fue a un proveedor de marketing, no a sus propios sistemas.

## Por qué importa aunque no esté confirmado

Si la afirmación es cierta, o si una parecida lo es en el futuro, el daño va más allá de una caída.

**Para los clientes:**

- **Phishing dirigido.** Nombres, cédulas y correos filtrados hacen que los mensajes falsos sean muy convincentes: "Debido al incidente reciente, verifica tu identidad aquí".
- **Robo de cuentas.** Las credenciales o sesiones filtradas se prueban de forma automática contra la app y contra cualquier otro servicio donde hayas repetido la contraseña.
- **La biometría no se cambia.** Una contraseña se cambia. Tu cara no. Sumado a la [filtración del Registro Civil de 2026](/blog/ai-security-double-edged-sword), que ya expuso fotos de cédula y biometría de la mayoría de adultos en Ecuador, esto facilita el fraude de identidad.
- **Ingeniería social por teléfono.** Alguien que sabe tu número de cédula y tu banco suena mucho a tu banco.

**Para el sistema financiero:**

- **La disponibilidad es confianza.** Cuando la app del banco privado más grande del país cae durante horas, la gente no puede pagar, cobrar ni mover su dinero. Aunque no haya filtración, eso duele.
- **Los rumores corren más rápido que los comunicados.** En agosto de 2025 la Superintendencia tuvo que [desmentir rumores de que el banco iba a cerrar](https://www.bloomberglinea.com/latinoamerica/ecuador/autoridades-desmienten-cierre-de-banco-pichincha-pero-que-pasa-con-la-app-movil/). El silencio durante un incidente deja espacio para el pánico.
- **Clientes compartidos, riesgo compartido.** Los datos de un banco se usan para atacar cuentas en otros, porque la gente repite correos, teléfonos y contraseñas en todas partes.

## Cómo protegerte si eres cliente

Nada de esto necesita que la filtración sea real. Es buena higiene de todas formas, y mucho más urgente mientras la pregunta sigue abierta.

**Asume que todo mensaje sobre "el incidente" es phishing.** Llamadas, SMS, WhatsApp o correos que te piden verificar tu identidad, actualizar tus datos o desbloquear tu cuenta: no hagas clic y no respondas. Cuelga y contacta al banco por la app oficial o por el número impreso en tu tarjeta.

**Nunca compartas códigos.** Ningún empleado legítimo de un banco necesita tu contraseña, tus códigos de un solo uso ni el código de seguridad de tu tarjeta. Si alguien te los pide, es una estafa, por mucho que sepa de ti.

**Cambia tu contraseña y que sea única.** Si usas la misma contraseña en otro lado, cámbiala ahí también. Un gestor de contraseñas lo hace fácil.

**Activa notificaciones para cada movimiento.** Configura alertas de transferencias, pagos e inicios de sesión para enterarte en segundos, no a fin de mes.

**Revisa tus movimientos más seguido.** Los cobros pequeños que no reconoces suelen ser una prueba antes de uno más grande.

**Baja tus límites si puedes.** Si tu banca te deja reducir los montos de transferencia o apagar el uso de la tarjeta en internet y en el exterior cuando no lo usas, hazlo. Vuelve a activarlo cuando lo necesites.

**Usa solo la app oficial.** Instálala desde la tienda oficial, nunca desde un enlace. No instales apps de acceso remoto porque "soporte" te lo pidió.

**Desconfía de verificaciones por video o selfie que no iniciaste tú.** Con datos biométricos circulando, que alguien que te contactó te pida "verificar tu rostro" es una señal de alerta.

**Revisa si tu correo fue expuesto.** Servicios como Have I Been Pwned te dicen si tu correo aparece en filtraciones conocidas.

**Guarda evidencia.** Capturas de los errores, de los mensajes sospechosos y de los movimientos que no reconoces te sirven si tienes que presentar un reclamo al banco y, si no se resuelve, a la Superintendencia de Bancos.

## Lo que voy a estar mirando

Lo que resolvería esto es un comunicado oficial: del banco, sobre qué le pasó hoy a la app y si se accedió a algún dato, y de la Superintendencia de Bancos como regulador. Hasta entonces, la respuesta honesta es que no sabemos.

Voy a actualizar este post si eso cambia. Mientras tanto, los pasos de arriba te toman veinte minutos y te protegen de este incidente, del siguiente y del que nadie llega a reportar.
`;

export const bancoPichinchaWhitelotusClaim: Record<Locale, BlogPost> = {
  en: {
    slug: "banco-pichincha-whitelotus-claim",
    title:
      "Banco Pichincha and WhiteLotus: What We Know, What We Don't and What You Can Do",
    date: "November 10, 2026",
    excerpt:
      "I couldn't use my Banco Pichincha app for hours today, while a group called WhiteLotus claims to have the bank's data. Nothing is confirmed yet. Here's what is, what isn't, and how to protect yourself either way.",
    imageUrl: "/blog/banco-pichincha-whitelotus-claim.webp",
    imageAiHint:
      "programmatic Lumen cover: a banking app error screen reading Global rate limit exceeded, an unverified claim notice and a protection checklist on a dark ground",
    content: enContent,
    author: "Sebastian Alvarez",
    tags: [
      "Cybersecurity",
      "Data Breach",
      "Banking",
      "Phishing",
      "Security",
      "Ecuador",
    ],
  },
  es: {
    slug: "banco-pichincha-whitelotus-claim",
    title:
      "Banco Pichincha y WhiteLotus: lo que se sabe, lo que no y qué puedes hacer",
    date: "November 10, 2026",
    excerpt:
      "Hoy no pude usar la app de Banco Pichincha durante horas, mientras un grupo llamado WhiteLotus afirma tener datos del banco. Todavía no hay nada confirmado. Esto es lo que se sabe, lo que no y cómo protegerte en cualquier caso.",
    imageUrl: "/blog/banco-pichincha-whitelotus-claim.es.webp",
    imageAiHint:
      "portada programática Lumen: pantalla de error de una app bancaria con Global rate limit exceeded, un aviso de afirmación no verificada y una lista de protección sobre fondo oscuro",
    content: esContent,
    author: "Sebastian Alvarez",
    tags: [
      "Ciberseguridad",
      "Brecha de Datos",
      "Banca",
      "Phishing",
      "Seguridad",
      "Ecuador",
    ],
  },
};
