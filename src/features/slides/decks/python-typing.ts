import type { DeckInput } from "../schema";

/**
 * "Python tipado", the GDG Quito talk at ESPE, rebuilt from its Canva version and brought up to date (Python 3.15,
 * October 2026), in Spanish with an English translation. Ships as a draft like the Git deck: the first save from the
 * editor stores it, and opening the diagram slide in each language draws and saves its SVG.
 */
export const pythonTyping: DeckInput = {
  slug: "python-typing",
  title: "Python tipado",
  description:
    "Qué es el tipado, cómo funcionan los type hints de Python en 2026, buenas prácticas y herramientas, y dónde está Python frente a otros lenguajes.",
  lang: "es",
  status: "draft",
  accent: "#3776ab",
  updatedAt: "2026-10-23T00:00:00.000Z",
  version: 1,
  slides: [
    {
      id: "cover",
      layout: "title",
      eyebrow: "GDG Quito · ESPE",
      title: "Python tipado",
      subtitle:
        "Tipos, buenas prácticas y dónde está Python *hoy* frente a otros lenguajes.",
      notes:
        "Bienvenida. Pregunta rápida: ¿quién escribe Python con type hints? ¿Quién corre un type checker en CI?",
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
      bio: "Construyo backends en Python (FastAPI, Django), infraestructura cloud y productos web. Tipar Python es lo primero que configuro en cada proyecto.",
      highlights: ["GDG Quito", "Quito, Ecuador"],
      handle: "@listerineh",
    },
    {
      id: "agenda",
      layout: "bullets",
      title: "Agenda",
      build: true,
      items: [
        "**01** Sistemas de tipos",
        "**02** Type hints en Python",
        "**03** Buenas prácticas y herramientas",
        "**04** Python hoy frente a otros lenguajes",
        "**05** Ejemplos prácticos",
      ],
    },

    // ── 01 · Sistemas de tipos ────────────────────────────────
    {
      id: "part-types",
      layout: "section",
      number: "01",
      title: "Sistemas de tipos",
      subtitle:
        "Dos preguntas distintas: *cuándo* se comprueba y *qué tan estricto* es.",
    },
    {
      id: "kinds",
      layout: "icons-grid",
      title: "Formas de tipar",
      build: true,
      items: [
        {
          icon: "lock",
          title: "Estático",
          body: "Los tipos se comprueban antes de ejecutar, al compilar o con un type checker.",
        },
        {
          icon: "play",
          title: "Dinámico",
          body: "El tipo de una variable se decide mientras el programa corre.",
        },
        {
          icon: "shield-check",
          title: "Fuerte",
          body: "Restringe qué operaciones se pueden hacer con cada tipo.",
        },
        {
          icon: "shuffle",
          title: "Débil",
          body: "Convierte entre tipos de forma implícita para que la operación funcione.",
        },
      ],
    },
    {
      id: "axes",
      layout: "two-column",
      title: "Dos ejes independientes",
      columns: [
        {
          heading: "¿Cuándo se comprueba?",
          items: [
            "**Estático**: antes de ejecutar",
            "**Dinámico**: durante la ejecución",
            "**Gradual**: tipos opcionales sobre un lenguaje dinámico",
          ],
        },
        {
          heading: "¿Qué tan estricto es?",
          items: [
            "**Fuerte**: sin conversiones sorpresa",
            "**Débil**: el lenguaje convierte por ti",
            "Es un espectro, no un sí o no",
          ],
        },
      ],
      notes:
        "Error común: pensar que estático = fuerte y dinámico = débil. Son ejes distintos; Python es dinámico y fuerte.",
    },
    {
      id: "languages",
      layout: "bullets",
      title: "Dónde cae cada lenguaje",
      build: true,
      items: [
        "**Rust, Java, Go**: estáticos y fuertes",
        "**C y C++**: estáticos, pero con conversiones implícitas: más débiles",
        "**TypeScript**: gradual, con los tipos comprobados al compilar",
        "**Python y Ruby**: dinámicos y fuertes",
        "**JavaScript y PHP**: dinámicos y débiles",
      ],
      notes:
        "En la versión original de la charla puse a C++ como fuerte. Es estático, pero convierte implícitamente entre números, punteros y booleanos, así que está más cerca del lado débil.",
    },
    {
      id: "python-dynamic-strong",
      layout: "code",
      title: "Python: dinámico y fuerte",
      language: "python",
      code: 'x = 1        # x es un int\nx = "uno"    # ahora es un str: dinámico\n\n"1" + 1\n# TypeError: can only concatenate str (not "int") to str',
      caption:
        'En JavaScript, `"1" + 1` da `"11"`: eso es tipado débil. Python prefiere fallar.',
    },

    // ── 02 · Type hints ───────────────────────────────────────
    {
      id: "part-hints",
      layout: "section",
      number: "02",
      title: "Type hints en Python",
      subtitle: "Anotaciones opcionales que leen las herramientas.",
    },
    {
      id: "hints-runtime",
      layout: "statement",
      statement: "Los type hints ==no cambian cómo corre== tu código.",
      emphasis:
        "Python sigue siendo dinámico: los tipos son para las herramientas y para las personas.",
      notes:
        "El intérprete guarda las anotaciones pero no las comprueba. Quien las revisa es un type checker (mypy, pyright, ty) en el editor y en CI, o una librería como Pydantic en runtime.",
    },
    {
      id: "basics",
      layout: "code",
      title: "Lo básico",
      language: "python",
      code: 'def saludar(nombre: str, veces: int = 1) -> str:\n    return f"Hola, {nombre}! " * veces\n\nedades: dict[str, int] = {"ana": 31}\nids: list[int] = [1, 2, 3]\n\ndef buscar(id: int) -> Usuario | None:\n    ...',
      caption:
        "Desde 3.9, `list[int]` y `dict[str, int]`; desde 3.10, `X | None` en lugar de `Optional[X]`.",
    },
    {
      id: "timeline",
      layout: "bullets",
      title: "Una década de tipos",
      build: true,
      items: [
        "**3.5 (2015)**: PEP 484, nacen los type hints y el módulo `typing`",
        "**3.9 y 3.10**: `list[int]` e `int | str`, sin importar nada",
        "**3.11**: `Self`, `LiteralString`, `Required` y `NotRequired`",
        "**3.12**: sintaxis propia para genéricos: `class Caja[T]` y `type`",
        "**3.13**: `TypeIs`, `ReadOnly` y valores por defecto en genéricos",
        "**3.14**: anotaciones evaluadas de forma diferida (PEP 649)",
        "**3.15 (2026)**: `TypedDict` cerrados (PEP 728) y `TypeForm` (PEP 747)",
      ],
      notes:
        "Python 3.15 salió en octubre de 2026. Casi todo lo nuevo de typing también funciona en versiones anteriores con el paquete typing_extensions.",
    },
    {
      id: "generics",
      layout: "code",
      title: "Genéricos: antes y ahora",
      language: "python",
      code: '# Antes (3.5+)\nT = TypeVar("T", bound=str)\nclass Saludo(Generic[T]):\n    def decir(self, texto: T) -> T: ...\n\n# Ahora (3.12+)\nclass Saludo[T: str]:\n    def decir(self, texto: T) -> T: ...',
      caption:
        "La sintaxis de PEP 695 no necesita `TypeVar` ni `Generic`: el parámetro vive en la clase.",
      notes:
        'Es el ejemplo de la versión original, actualizado. Ojo: el original devolvía `hello + "Piotr"`. Eso es un `str`, no un `T`, y un checker en modo estricto lo marca. Buen momento para mostrarlo en vivo.',
    },
    {
      id: "protocols",
      layout: "code",
      title: "Protocol: duck typing con tipos",
      language: "python",
      code: 'class Notificador(Protocol):\n    def enviar(self, mensaje: str) -> None: ...\n\nclass Email:  # no hereda de Notificador\n    def enviar(self, mensaje: str) -> None: ...\n\ndef avisar(n: Notificador) -> None: ...\navisar(Email())  # válido: tiene la forma correcta',
      caption:
        "Tipado estructural: si tiene la forma correcta, encaja. Es el *duck typing* de siempre, comprobado.",
    },
    {
      id: "domain",
      layout: "code",
      title: "Tipos que modelan el dominio",
      language: "python",
      code: 'UserId = NewType("UserId", int)\nEstado = Literal["activo", "suspendido"]\n\nclass Usuario(TypedDict):\n    id: UserId\n    nombre: str\n    estado: Estado',
      caption:
        'Las reglas del negocio quedan en los tipos: un typo en `"suspendido"` se detecta antes de producción.',
    },
    {
      id: "runtime",
      layout: "code",
      title: "Tipos en runtime: Pydantic",
      language: "python",
      code: 'from pydantic import BaseModel, PositiveInt\n\nclass Registro(BaseModel):\n    nombre: str\n    edad: PositiveInt\n\nRegistro(nombre="Ana", edad="31")  # edad=31, convertido\nRegistro(nombre="Ana", edad=-4)    # ValidationError',
      caption:
        "Los mismos type hints, validados al ejecutar: así funcionan FastAPI y buena parte del ecosistema moderno.",
      notes:
        "Diferencia clave: mypy o pyright revisan tu código; Pydantic revisa los datos que entran (requests, archivos, variables de entorno).",
    },

    // ── 03 · Buenas prácticas ─────────────────────────────────
    {
      id: "part-practices",
      layout: "section",
      number: "03",
      title: "Buenas prácticas",
      subtitle: "Cómo tipar sin pelear con los tipos.",
    },
    {
      id: "adoption",
      layout: "diagram",
      title: "Adopción gradual",
      source:
        "flowchart LR\n  a[Código sin tipos] --> b[Tipar funciones públicas]\n  b --> c[Type checker en CI]\n  c --> d[Modo estricto en código nuevo]\n  d --> e[Estricto en todo el proyecto]",
      caption: "No hace falta tiparlo todo el primer día: cada paso ya aporta.",
      notes:
        "Así migramos proyectos grandes: primero las fronteras, después el checker en CI sin bloquear, y el modo estricto módulo a módulo.",
    },
    {
      id: "practices",
      layout: "bullets",
      title: "Buenas prácticas",
      build: true,
      items: [
        "Tipa primero las **fronteras**: funciones públicas, APIs y modelos de datos",
        "Usa `list[int]` y `X | None`; `List` y `Optional` son de código antiguo",
        "Evita `Any`: prefiere `object`, un `Protocol` o un genérico",
        "Valida los datos externos en runtime y confía en los tipos por dentro",
        "Un type checker en CI, con modo estricto en el código nuevo",
        "Cada `# type: ignore` lleva el código del error y un motivo",
      ],
      notes:
        "Ejemplo de ignore bien hecho: `# type: ignore[arg-type]  # la librería X no tiene stubs`. Un ignore sin código esconde cualquier error futuro en esa línea.",
    },
    {
      id: "tools",
      layout: "icons-grid",
      title: "Herramientas",
      build: true,
      items: [
        {
          icon: "shield-check",
          title: "mypy",
          body: "El type checker de referencia, desde 2012.",
        },
        {
          icon: "code",
          title: "Pyright",
          body: "De Microsoft; el motor de Pylance en VS Code.",
        },
        {
          icon: "zap",
          title: "ty",
          body: "De Astral (uv, Ruff), escrito en Rust. En beta.",
        },
        {
          icon: "gauge",
          title: "Pyrefly",
          body: "De Meta, también en Rust y pensado para monorepos.",
        },
        {
          icon: "wrench",
          title: "Ruff",
          body: "Linter y formateador; sus reglas `ANN` exigen anotaciones.",
        },
        {
          icon: "check-check",
          title: "Pydantic",
          body: "Validación en runtime a partir de type hints.",
        },
      ],
      notes:
        "ty y Pyrefly son la gran novedad: revisan proyectos grandes en segundos. ty sigue en versiones 0.0.x en octubre de 2026; para CI, mypy o Pyright siguen siendo la opción estable.",
    },
    {
      id: "config",
      layout: "code",
      title: "Configuración en pyproject.toml",
      language: "toml",
      code: '[tool.mypy]\nstrict = true\n[[tool.mypy.overrides]]\nmodule = "legacy.*"\nignore_errors = true\n\n[tool.ruff.lint]\nextend-select = ["ANN", "UP"]',
      caption:
        "Estricto en todo lo nuevo; el código heredado entra poco a poco. `UP` moderniza `Optional[X]` a `X | None`.",
    },
    {
      id: "pros-cons",
      layout: "two-column",
      title: "Pros y contras de tipar Python",
      build: true,
      columns: [
        {
          heading: "Pros",
          items: [
            "Documenta el código sin comentarios extra",
            "Autocompletado y refactors seguros en el IDE",
            "Errores encontrados antes de producción",
            "Arquitectura más clara y equipos que se entienden",
            "Mejor contexto para asistentes de código con IA",
          ],
        },
        {
          heading: "Contras",
          items: [
            "Más código y una curva de aprendizaje",
            "Por sí solos no validan nada en runtime",
            "Librerías sin tipos o con stubs incompletos",
            "Pueden frenar scripts rápidos y prototipos",
          ],
        },
      ],
      notes:
        'En la versión original los contras eran un meme: "no hay contras". Sí los hay, aunque pesan menos que los pros en cualquier proyecto que viva más de unas semanas.',
    },

    // ── 04 · Python hoy ───────────────────────────────────────
    {
      id: "part-today",
      layout: "section",
      number: "04",
      title: "Python hoy",
      subtitle: "Dónde está frente a otros lenguajes.",
    },
    {
      id: "numbers",
      layout: "stats",
      title: "Python en números",
      stats: [
        { value: 1, prefix: "#", label: "en el índice TIOBE" },
        { value: 19.23, suffix: "%", label: "de cuota en TIOBE" },
        { value: 58, suffix: "%", label: "de devs lo usa" },
      ],
      citation:
        "Fuentes: índice TIOBE, octubre de 2026, y Stack Overflow Developer Survey 2026.",
      notes:
        "Fuentes: índice TIOBE de octubre de 2026 (Python primero, 19,23 %). Stack Overflow Developer Survey 2026: 58,0 % usa Python, cuarto detrás de JavaScript, SQL y HTML/CSS.",
    },
    {
      id: "typed-era",
      layout: "statement",
      statement:
        "En GitHub, ==TypeScript superó a Python y JavaScript== en 2025.",
      emphasis: "Los lenguajes tipados ganan terreno en la era de la IA.",
      notes:
        "GitHub Octoverse 2025: en agosto de 2025 TypeScript pasó a ser el lenguaje con más contribuidores mensuales. GitHub lo atribuye en parte a que el código tipado funciona mejor con asistentes de IA. Python quedó segundo, creció un 48 % en contribuidores y domina IA y datos. Mensaje: tipar Python es la forma de tener lo mejor de los dos mundos.",
    },
    {
      id: "versus",
      layout: "bullets",
      title: "Python frente a otros lenguajes",
      build: true,
      items: [
        "**TypeScript**: el mismo modelo gradual, pero el checker viene con el compilador; en Python es una herramienta aparte",
        "**Go**: tipos estáticos simples, un binario y concurrencia nativa; ideal para servicios e infraestructura",
        "**Rust**: el sistema de tipos más estricto; Python lo usa por dentro (Ruff, uv, ty, el núcleo de Pydantic)",
        "**Java y Kotlin**: tipado estático maduro en empresas; Python gana en datos, IA y prototipos",
        "**Python**: el ecosistema de IA y datos, con un sistema de tipos que hoy cubre casi todo",
      ],
    },
    {
      id: "news",
      layout: "bullets",
      title: "Lo nuevo en Python",
      build: true,
      items: [
        "**3.13**: modo *free-threaded* sin GIL y un compilador JIT, ambos experimentales",
        "**3.14**: free-threading con soporte oficial, anotaciones diferidas y *t-strings*",
        "**3.15**: imports diferidos con `lazy import`, `frozendict` y UTF-8 por defecto",
        "**uv**: instala Python y dependencias en segundos",
        "**ty** y **Pyrefly**: type checkers en Rust para proyectos grandes",
      ],
      notes:
        "Sin GIL, Python puede usar varios núcleos con hilos de verdad. Para tipos importa porque más concurrencia trae más estado compartido, y los tipos ayudan a razonar sobre él.",
    },

    // ── 05 · Ejemplos ─────────────────────────────────────────
    {
      id: "part-examples",
      layout: "section",
      number: "05",
      title: "Ejemplos prácticos",
      subtitle: "Del código sin tipos a `mypy --strict`.",
    },
    {
      id: "refactor-before",
      layout: "code",
      title: "Ejemplo: antes",
      language: "python",
      code: 'def total(items, descuento=None):\n    subtotal = sum(i["precio"] * i["cantidad"] for i in items)\n    return subtotal * (1 - (descuento or 0))',
      caption:
        "¿Qué es `items`? ¿`descuento` es un porcentaje o un monto? El código no lo dice.",
      notes:
        "Demo en vivo: correr `mypy --strict` sobre esta versión; falla por falta de anotaciones.",
    },
    {
      id: "refactor-after",
      layout: "code",
      title: "Ejemplo: después",
      language: "python",
      code: '@dataclass(frozen=True)\nclass Item:\n    precio: Decimal\n    cantidad: int\n\ndef total(items: list[Item], descuento: Decimal = Decimal(0)) -> Decimal:\n    subtotal = sum((i.precio * i.cantidad for i in items), Decimal(0))\n    return subtotal * (1 - descuento)',
      caption:
        "El checker ahora sabe qué es un `Item`, y el dinero deja de usar `float`.",
      notes:
        "Imports omitidos: `dataclass` y `Decimal`. Anotar, volver a correr `mypy --strict` y mostrar el autocompletado en el editor sobre `i.`.",
    },
    {
      id: "thanks",
      layout: "closing",
      title: "¿Preguntas? Conectemos",
      subtitle: "Las diapositivas quedan en listerineh.dev/slides.",
      links: [
        {
          label: "linkedin.com/in/listerineh",
          href: "https://www.linkedin.com/in/listerineh",
        },
        {
          label: "listerineh.dev",
          href: "https://listerineh.dev",
        },
      ],
    },
  ],
  // English: the same slides, translated. Only text that differs is stored (see i18n.ts).
  translations: {
    en: {
      title: "Typed Python",
      description:
        "What typing is, how Python's type hints work in 2026, good practices and tools, and where Python stands against other languages.",
      slides: {
        cover: {
          title: "Typed Python",
          subtitle:
            "Types, good practices and where Python stands *today* against other languages.",
          notes:
            "Welcome. Quick poll: who writes Python with type hints? Who runs a type checker in CI?",
        },
        speaker: {
          photo: {
            src: "/images/sebas-playing.webp",
            alt: "Sebastian Alvarez smiling with an electric guitar",
          },
          greeting: "Hi, I'm",
          bio: "I build Python backends (FastAPI, Django), cloud infrastructure and web products. Typing Python is the first thing I set up in every project.",
        },
        agenda: {
          items: [
            "**01** Type systems",
            "**02** Type hints in Python",
            "**03** Good practices and tools",
            "**04** Python today against other languages",
            "**05** Practical examples",
          ],
        },
        "part-types": {
          title: "Type systems",
          subtitle:
            "Two different questions: *when* types are checked and *how strict* they are.",
        },
        kinds: {
          title: "Kinds of typing",
          items: [
            {
              icon: "lock",
              title: "Static",
              body: "Types are checked before running, by the compiler or a type checker.",
            },
            {
              icon: "play",
              title: "Dynamic",
              body: "A variable's type is decided while the program runs.",
            },
            {
              icon: "shield-check",
              title: "Strong",
              body: "Restricts which operations each type allows.",
            },
            {
              icon: "shuffle",
              title: "Weak",
              body: "Converts between types implicitly so the operation works.",
            },
          ],
        },
        axes: {
          title: "Two independent axes",
          columns: [
            {
              heading: "When is it checked?",
              items: [
                "**Static**: before running",
                "**Dynamic**: while running",
                "**Gradual**: optional types on top of a dynamic language",
              ],
            },
            {
              heading: "How strict is it?",
              items: [
                "**Strong**: no surprise conversions",
                "**Weak**: the language converts for you",
                "It's a spectrum, not a yes or no",
              ],
            },
          ],
          notes:
            "Common mistake: thinking static means strong and dynamic means weak. They're separate axes; Python is dynamic and strong.",
        },
        languages: {
          title: "Where each language falls",
          items: [
            "**Rust, Java, Go**: static and strong",
            "**C and C++**: static, but with implicit conversions: weaker",
            "**TypeScript**: gradual, with types checked at compile time",
            "**Python and Ruby**: dynamic and strong",
            "**JavaScript and PHP**: dynamic and weak",
          ],
          notes:
            "The original version of this talk listed C++ as strong. It's static, but it converts implicitly between numbers, pointers and booleans, so it sits closer to the weak side.",
        },
        "python-dynamic-strong": {
          title: "Python: dynamic and strong",
          code: 'x = 1        # x is an int\nx = "one"    # now it\'s a str: dynamic\n\n"1" + 1\n# TypeError: can only concatenate str (not "int") to str',
          caption:
            'In JavaScript, `"1" + 1` gives `"11"`: that\'s weak typing. Python would rather fail.',
        },
        "part-hints": {
          title: "Type hints in Python",
          subtitle: "Optional annotations that tools read.",
        },
        "hints-runtime": {
          statement: "Type hints ==don't change how== your code runs.",
          emphasis:
            "Python is still dynamic: types are for tools and for people.",
          notes:
            "The interpreter stores annotations but doesn't check them. A type checker does (mypy, pyright, ty) in the editor and in CI, or a library like Pydantic at runtime.",
        },
        basics: {
          title: "The basics",
          code: 'def greet(name: str, times: int = 1) -> str:\n    return f"Hi, {name}! " * times\n\nages: dict[str, int] = {"ana": 31}\nids: list[int] = [1, 2, 3]\n\ndef find(id: int) -> User | None:\n    ...',
          caption:
            "Since 3.9, `list[int]` and `dict[str, int]`; since 3.10, `X | None` instead of `Optional[X]`.",
        },
        timeline: {
          title: "A decade of types",
          items: [
            "**3.5 (2015)**: PEP 484, type hints and the `typing` module are born",
            "**3.9 and 3.10**: `list[int]` and `int | str`, no imports needed",
            "**3.11**: `Self`, `LiteralString`, `Required` and `NotRequired`",
            "**3.12**: dedicated generics syntax: `class Box[T]` and `type`",
            "**3.13**: `TypeIs`, `ReadOnly` and defaults for type parameters",
            "**3.14**: deferred evaluation of annotations (PEP 649)",
            "**3.15 (2026)**: closed `TypedDict`s (PEP 728) and `TypeForm` (PEP 747)",
          ],
          notes:
            "Python 3.15 came out in October 2026. Most new typing features also work on older versions through the typing_extensions package.",
        },
        generics: {
          title: "Generics: then and now",
          code: '# Then (3.5+)\nT = TypeVar("T", bound=str)\nclass Greeting(Generic[T]):\n    def say(self, text: T) -> T: ...\n\n# Now (3.12+)\nclass Greeting[T: str]:\n    def say(self, text: T) -> T: ...',
          caption:
            "PEP 695 syntax needs neither `TypeVar` nor `Generic`: the parameter lives on the class.",
          notes:
            "This is the original version's example, updated. Note: the original returned `hello + \"Piotr\"`. That's a `str`, not a `T`, and a strict checker flags it. A good moment to show it live.",
        },
        protocols: {
          title: "Protocol: duck typing with types",
          code: 'class Notifier(Protocol):\n    def send(self, message: str) -> None: ...\n\nclass Email:  # doesn\'t inherit from Notifier\n    def send(self, message: str) -> None: ...\n\ndef notify(n: Notifier) -> None: ...\nnotify(Email())  # valid: it has the right shape',
          caption:
            "Structural typing: if it has the right shape, it fits. Good old *duck typing*, checked.",
        },
        domain: {
          title: "Types that model the domain",
          code: 'UserId = NewType("UserId", int)\nStatus = Literal["active", "suspended"]\n\nclass User(TypedDict):\n    id: UserId\n    name: str\n    status: Status',
          caption:
            'Business rules live in the types: a typo in `"suspended"` is caught before production.',
        },
        runtime: {
          title: "Types at runtime: Pydantic",
          code: 'from pydantic import BaseModel, PositiveInt\n\nclass SignUp(BaseModel):\n    name: str\n    age: PositiveInt\n\nSignUp(name="Ana", age="31")  # age=31, converted\nSignUp(name="Ana", age=-4)    # ValidationError',
          caption:
            "The same type hints, validated while running: that's how FastAPI and much of the modern ecosystem work.",
          notes:
            "Key difference: mypy or pyright check your code; Pydantic checks the data coming in (requests, files, environment variables).",
        },
        "part-practices": {
          title: "Good practices",
          subtitle: "How to type without fighting the types.",
        },
        adoption: {
          title: "Gradual adoption",
          source:
            "flowchart LR\n  a[Untyped code] --> b[Type public functions]\n  b --> c[Type checker in CI]\n  c --> d[Strict mode for new code]\n  d --> e[Strict across the project]",
          caption:
            "You don't need to type everything on day one: every step already pays off.",
          notes:
            "That's how we migrate large projects: boundaries first, then the checker in CI without blocking, and strict mode one module at a time.",
        },
        practices: {
          title: "Good practices",
          items: [
            "Type the **boundaries** first: public functions, APIs and data models",
            "Use `list[int]` and `X | None`; `List` and `Optional` belong to old code",
            "Avoid `Any`: prefer `object`, a `Protocol` or a generic",
            "Validate external data at runtime and trust the types inside",
            "A type checker in CI, with strict mode on new code",
            "Every `# type: ignore` carries the error code and a reason",
          ],
          notes:
            "A well-written ignore: `# type: ignore[arg-type]  # library X has no stubs`. An ignore without a code hides any future error on that line.",
        },
        tools: {
          title: "Tools",
          items: [
            {
              icon: "shield-check",
              title: "mypy",
              body: "The reference type checker, since 2012.",
            },
            {
              icon: "code",
              title: "Pyright",
              body: "From Microsoft; the engine behind Pylance in VS Code.",
            },
            {
              icon: "zap",
              title: "ty",
              body: "From Astral (uv, Ruff), written in Rust. In beta.",
            },
            {
              icon: "gauge",
              title: "Pyrefly",
              body: "From Meta, also in Rust and built for monorepos.",
            },
            {
              icon: "wrench",
              title: "Ruff",
              body: "Linter and formatter; its `ANN` rules require annotations.",
            },
            {
              icon: "check-check",
              title: "Pydantic",
              body: "Runtime validation from type hints.",
            },
          ],
          notes:
            "ty and Pyrefly are the big news: they check large projects in seconds. ty is still on 0.0.x releases as of October 2026; for CI, mypy or Pyright remain the stable choice.",
        },
        config: {
          title: "Configuration in pyproject.toml",
          caption:
            "Strict for everything new; legacy code joins little by little. `UP` upgrades `Optional[X]` to `X | None`.",
        },
        "pros-cons": {
          title: "Pros and cons of typing Python",
          columns: [
            {
              heading: "Pros",
              items: [
                "Documents the code without extra comments",
                "Autocomplete and safe refactors in the IDE",
                "Errors found before production",
                "Clearer architecture and teams that understand each other",
                "Better context for AI coding assistants",
              ],
            },
            {
              heading: "Cons",
              items: [
                "More code and a learning curve",
                "On their own they validate nothing at runtime",
                "Untyped libraries or incomplete stubs",
                "They can slow down quick scripts and prototypes",
              ],
            },
          ],
          notes:
            'In the original version the cons slide was a meme: "there are no cons". There are, although they weigh less than the pros in any project that lives longer than a few weeks.',
        },
        "part-today": {
          title: "Python today",
          subtitle: "Where it stands against other languages.",
        },
        numbers: {
          title: "Python in numbers",
          stats: [
            { value: 1, prefix: "#", label: "in the TIOBE index" },
            { value: 19.23, suffix: "%", label: "TIOBE share" },
            { value: 58, suffix: "%", label: "of developers use it" },
          ],
          citation: "Sources: TIOBE index, October 2026, and Stack Overflow Developer Survey 2026.",
          notes:
            "Sources: TIOBE index, October 2026 (Python first, 19.23%). Stack Overflow Developer Survey 2026: 58.0% use Python, fourth behind JavaScript, SQL and HTML/CSS.",
        },
        "typed-era": {
          statement:
            "On GitHub, ==TypeScript overtook Python and JavaScript== in 2025.",
          emphasis: "Typed languages are gaining ground in the AI era.",
          notes:
            "GitHub Octoverse 2025: in August 2025 TypeScript became the language with the most monthly contributors. GitHub credits it partly to typed code working better with AI assistants. Python came second, grew 48% in contributors and leads AI and data. Takeaway: typing Python gets you the best of both worlds.",
        },
        versus: {
          title: "Python against other languages",
          items: [
            "**TypeScript**: the same gradual model, but the checker ships with the compiler; in Python it's a separate tool",
            "**Go**: simple static types, a single binary and native concurrency; great for services and infrastructure",
            "**Rust**: the strictest type system; Python uses it under the hood (Ruff, uv, ty, Pydantic's core)",
            "**Java and Kotlin**: mature static typing in enterprises; Python wins in data, AI and prototypes",
            "**Python**: the AI and data ecosystem, with a type system that now covers almost everything",
          ],
        },
        news: {
          title: "What's new in Python",
          items: [
            "**3.13**: a *free-threaded* build without the GIL and a JIT compiler, both experimental",
            "**3.14**: officially supported free-threading, deferred annotations and *t-strings*",
            "**3.15**: deferred imports with `lazy import`, `frozendict` and UTF-8 by default",
            "**uv**: installs Python and dependencies in seconds",
            "**ty** and **Pyrefly**: Rust type checkers for large projects",
          ],
          notes:
            "Without the GIL, Python can use several cores with real threads. It matters for types because more concurrency means more shared state, and types help you reason about it.",
        },
        "part-examples": {
          title: "Practical examples",
          subtitle: "From untyped code to `mypy --strict`.",
        },
        "refactor-before": {
          title: "Example: before",
          code: 'def total(items, discount=None):\n    subtotal = sum(i["price"] * i["qty"] for i in items)\n    return subtotal * (1 - (discount or 0))',
          caption: "What is `items`? Is `discount` a percentage or an amount? The code doesn't say.",
          notes: "Live demo: run `mypy --strict` on this version; it fails on missing annotations.",
        },
        "refactor-after": {
          title: "Example: after",
          code: '@dataclass(frozen=True)\nclass Item:\n    price: Decimal\n    qty: int\n\ndef total(items: list[Item], discount: Decimal = Decimal(0)) -> Decimal:\n    subtotal = sum((i.price * i.qty for i in items), Decimal(0))\n    return subtotal * (1 - discount)',
          caption: "The checker now knows what an `Item` is, and money stops using `float`.",
          notes:
            "Imports left out: `dataclass` and `Decimal`. Annotate, run `mypy --strict` again and show editor autocomplete on `i.`.",
        },
        thanks: {
          title: "Questions? Let's connect",
          subtitle: "The slides stay at listerineh.dev/slides.",
        },
      },
    },
  },
};
