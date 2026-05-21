import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

const contentEN = `## Introduction

I've been developing with AWS for years. And honestly? **Local development has always been a pain.**

LocalStack was the go-to solution, but it came with its own headaches: slow startup times, complex configuration, memory-hungry processes, and constant tweaking to get things working. Every time I spun up a local environment, I knew I was in for a 5-minute wait and a prayer that everything would actually work.

Then, in March 2026, two things happened:

1. LocalStack archived its community edition and went fully paid
2. A project called **Floci** launched

I gave Floci a shot. Changed one line in my Docker config. And everything just... **clicked**.

**24ms startup time.** 13 MiB memory footprint. 51 AWS services. Zero cost. Zero auth tokens. MIT licensed forever.

Since discovering Floci, my local development workflow has been **10x faster**. No more waiting. No more configuration hell. Just pure, instant AWS emulation.

In this post, I'll show you why Floci isn't just a LocalStack replacement — it's a **complete rethinking of local AWS development**. From Terraform integration to complex architecture design, from learning environments to production-grade testing, Floci changes everything.

---

## The LocalStack Sunset: What Actually Happened

On March 23, 2026, LocalStack made a decision that shocked the developer community:

**What changed:**
- Community edition archived
- Mandatory auth tokens for all users
- Security updates frozen for free tier
- Many services moved to paid-only

**Why it mattered:**

Thousands of CI/CD pipelines broke overnight. Teams that had built their entire local development workflow around LocalStack suddenly faced a choice: migrate or pay.

For context, LocalStack Pro costs **$50-100+ per developer per month**. For a team of 10 developers, that's **$6,000-12,000 per year** just to test AWS services locally.

**The community's response?**

Enter Floci.

---

## What is Floci?

Floci (named after [floccus](https://en.wikipedia.org/wiki/Cirrocumulus_floccus), the cloud formation that looks like popcorn) is a **free, open-source AWS emulator** built with Quarkus Native and GraalVM.

**The pitch:**

> "Light, fluffy, and always free. No account. No auth token. No feature gates. Just \`docker compose up\`."

**The numbers:**

- **24ms startup** (vs ~3,300ms for LocalStack)
- **13 MiB idle memory** (vs 143 MiB)
- **51 AWS services** (many not available in LocalStack Community)
- **MIT licensed** (truly open source, no "community edition" sunset)
- **Drop-in replacement** (same port 4566, same protocols)

**The promise:**

Every service is fully unlocked. No paid tier. No enterprise features. No auth tokens. Ever.

---

## Why Floci Changes Everything

### 1. Performance That Actually Matters

**138× faster startup:**

\`\`\`bash
# LocalStack Community
docker run localstack/localstack
# ~3,300ms to ready

# Floci
docker run floci/floci:latest
# 24ms to ready
\`\`\`

**Why this matters:**

In CI pipelines, every second counts. If your tests spin up LocalStack 50 times a day, that's **2.7 minutes saved per run** with Floci. Over a month? **Hours** of CI time recovered.

**91% less memory:**

Floci uses **13 MiB at idle** vs LocalStack's 143 MiB. That means:
- Smaller CI runners (cheaper)
- More containers on the same machine
- Faster cold starts

### 2. Real Engines, Not Mocks

Here's where Floci gets interesting. Instead of shallow mocks, Floci uses **real Docker-backed engines** for complex services:

**Lambda:** Real AWS runtimes in containers  
**RDS:** Real PostgreSQL, MySQL, MariaDB  
**ElastiCache:** Real Redis/Valkey  
**MSK:** Real Kafka via Redpanda  
**EKS:** Real Kubernetes via k3s  
**OpenSearch:** Real OpenSearch clusters

**Why this matters:**

You're not testing against mocks. You're testing against **the actual protocols and behaviors** your production code will encounter.

### 3. Full IAM Support

Floci implements **real IAM authentication and SigV4 validation** for:
- Lambda, ElastiCache, RDS, ECS, EC2
- MSK, EKS, OpenSearch, ECR, CodeBuild

**What this means:**

Your IAM policies work locally. Your authentication flows work locally. Your security testing works locally.

No more "it works locally but fails in AWS because of IAM."

---

## Terraform Integration: Infrastructure as Code, Locally

Here's where Floci becomes a game-changer for infrastructure teams.

### The Setup

\`\`\`hcl
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3       = "http://localhost:4566"
    dynamodb = "http://localhost:4566"
    lambda   = "http://localhost:4566"
    # ... all 51 services
  }
}
\`\`\`

### The Workflow

**1. Design locally:**

\`\`\`bash
docker run -d -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

terraform init
terraform apply
\`\`\`

**2. Test the architecture:**

Your entire AWS infrastructure runs **on your laptop**. S3 buckets, Lambda functions, DynamoDB tables, SQS queues — all local, all free.

**3. Iterate rapidly:**

\`\`\`bash
terraform destroy
terraform apply
\`\`\`

No cloud costs. No waiting for resources to provision. No cleanup headaches.

**4. Deploy to AWS:**

Once you're confident, just change the provider endpoint to real AWS. Same code. Same resources. Production-ready.

---

## The Power of Local Architecture Design

Floci unlocks something powerful: **risk-free architecture experimentation**.

### Scenario 1: Learning AWS

**Before Floci:**
- Read documentation
- Deploy to AWS
- Get surprised by costs
- Delete everything in panic

**With Floci:**
- Spin up any AWS service locally
- Experiment freely
- Break things without consequences
- Learn by doing
- Zero cost

**For beginners, this is transformational.**

### Scenario 2: Architecture Prototyping

Build multiple architectures in parallel. On your laptop. Compare performance. Make an informed decision.

**Cost:** $0  
**Time:** Hours instead of days  
**Risk:** Zero

### Scenario 3: Complex Environment Replication

Your production environment has 15 microservices, 8 databases, 12 Lambda functions. Replicating this in AWS for testing costs **hundreds of dollars per month**.

**With Floci:**

\`\`\`bash
docker compose up
terraform apply
\`\`\`

**Entire environment running locally in minutes.**

---

## Advantages Over LocalStack

### 1. It's Actually Free

LocalStack Community is dead. LocalStack Pro costs money. Floci is MIT licensed **forever**.

### 2. It's Faster

138× faster startup isn't marketing. It's measurable. Your CI pipeline will feel it.

### 3. It's Lighter

13 MiB vs 143 MiB. Run more containers. Use smaller machines. Save money on CI runners.

### 4. More Services

Services LocalStack Community doesn't offer:
- ✅ ElastiCache, RDS, API Gateway v2 + WebSocket
- ✅ Route53, Auto Scaling, Textract
- ✅ Neptune, EKS, CodeBuild

All free in Floci.

### 5. Real Docker Integration

Floci uses real engines. LocalStack uses mocks. The difference matters when you're testing production workloads.

### 6. No Auth Tokens

Pull the image. Run it. Done. No sign-ups. No API keys. No telemetry.

---

## Disadvantages (Let's Be Honest)

Floci isn't perfect. Here's what you should know:

### 1. Younger Project

LocalStack has been around since 2017. Floci launched in March 2026. Some edge cases might not be covered yet.

### 2. Smaller Community

Fewer Stack Overflow answers. Fewer tutorials. You might need to read the docs more carefully.

### 3. Not 100% AWS-Compatible

No local emulator is perfect. Some AWS quirks and edge cases won't be replicated exactly.

### 4. Requires Docker Socket

For container-backed services, you need to mount \`/var/run/docker.sock\`. This has security implications in some environments.

**My take:** These are minor compared to the benefits. And the project is improving fast (10,000+ GitHub stars in 2 months).

---

## The Future: What's Possible

Imagine these scenarios:

### 1. One-Command Dev Environments

\`\`\`bash
git clone my-project
cd my-project
make dev-env
\`\`\`

Floci spins up all AWS services, databases, queues, Lambda functions. **Ready to code in 30 seconds.**

### 2. AI-Powered Architecture Design

AI tools could generate Terraform configs, test them in Floci, optimize based on local performance, deploy to AWS when ready.

### 3. Training Environments for Teams

Companies could create sandbox environments for new hires, training modules with real AWS services, certification prep environments.

### 4. CI/CD Revolution

Every PR could spin up full AWS environment, run integration tests, validate infrastructure changes, tear down automatically. **No cloud costs. Unlimited parallelization.**

---

## Getting Started with Floci

### Quick Start with Floci

\`\`\`bash
docker run -d --name floci \\
  -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

aws --endpoint-url http://localhost:4566 s3 mb s3://test-bucket
aws --endpoint-url http://localhost:4566 s3 ls
\`\`\`

### With Docker Compose

\`\`\`yaml
version: '3.8'
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - FLOCI_STORAGE_MODE=hybrid
\`\`\`

---

## Bonus: Also Need Local Azure? Meet Floci-AZ

Here's where it gets even better: **The same team built a local Azure emulator.**

[Floci-AZ](https://github.com/floci-io/floci-az) brings the same philosophy to Azure development:

**What it emulates:**
- Blob Storage, Queue Storage, Table Storage, Azure Functions

**Same benefits:**
- Port 4577, MIT licensed, No Azure account required

### Quick Start with Floci-AZ

\`\`\`bash
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

### Why This Matters

If you're in a **multi-cloud environment** (AWS + Azure), you can now run both emulators simultaneously and test cross-cloud architectures locally.

**All on your laptop. All for free.**

This is the future: **cloud-agnostic local development** without vendor lock-in or cloud bills.

---

## Conclusion

Floci represents something bigger than just a LocalStack alternative.

It's a statement: **Local AWS development should be free, fast, and accessible to everyone.**

When LocalStack went paid, the community responded with Floci. Just like when Terraform went BSL, we got OpenTofu.

**Open source always finds a way.**

For me, Floci has changed how I work:
- I design architectures locally first
- I test infrastructure changes without fear
- I learn new AWS services without cost
- I build complex environments in minutes

**The numbers speak for themselves:**
- 24ms startup
- 13 MiB memory
- 51 services
- $0 cost
- MIT license

If you're still using LocalStack Community (frozen), or paying for LocalStack Pro, or avoiding local AWS testing altogether — give Floci a shot.

Change one line. See the difference.

**The future of local AWS development is here. And it's free.**

---

**Resources:**
- [Floci Website](https://floci.io/)
- [GitHub Repository](https://github.com/floci-io/floci)
- [Documentation](https://floci.io/floci/)
- [Migration Guide from LocalStack](https://floci.io/floci/getting-started/migrate-from-localstack/)
`;

const contentES = `## Introducción

He estado desarrollando con AWS durante años. ¿Y honestamente? **El desarrollo local siempre ha sido un dolor de cabeza.**

LocalStack era la solución de referencia, pero venía con sus propios problemas: tiempos de inicio lentos, configuración compleja, procesos que consumen mucha memoria, y ajustes constantes para que las cosas funcionaran. Cada vez que levantaba un entorno local, sabía que me esperaban 5 minutos de espera y una oración para que todo funcionara.

Luego, en marzo de 2026, pasaron dos cosas:

1. LocalStack archivó su edición comunitaria y se volvió completamente de pago
2. Un proyecto llamado **Floci** se lanzó

Le di una oportunidad a Floci. Cambié una línea en mi configuración de Docker. Y todo simplemente... **encajó**.

**Tiempo de inicio de 24ms.** Huella de memoria de 13 MiB. 51 servicios AWS. Costo cero. Cero tokens de autenticación. Licencia MIT para siempre.

Desde que descubrí Floci, mi flujo de desarrollo local ha sido **10x más rápido**. No más esperas. No más infierno de configuración. Solo emulación AWS pura e instantánea.

En este post, te mostraré por qué Floci no es solo un reemplazo de LocalStack — es un **replanteamiento completo del desarrollo local de AWS**. Desde integración con Terraform hasta diseño de arquitecturas complejas, desde entornos de aprendizaje hasta pruebas de grado producción, Floci lo cambia todo.

---

## El Ocaso de LocalStack: Qué Pasó Realmente

El 23 de marzo de 2026, LocalStack tomó una decisión que sorprendió a la comunidad de desarrolladores:

**Qué cambió:**
- Edición comunitaria archivada
- Tokens de autenticación obligatorios para todos los usuarios
- Actualizaciones de seguridad congeladas para el tier gratuito
- Muchos servicios movidos a solo-pago

**Por qué importó:**

Miles de pipelines de CI/CD se rompieron de la noche a la mañana. Equipos que habían construido todo su flujo de desarrollo local alrededor de LocalStack de repente enfrentaron una decisión: migrar o pagar.

Para contexto, LocalStack Pro cuesta **$50-100+ por desarrollador por mes**. Para un equipo de 10 desarrolladores, eso es **$6,000-12,000 por año** solo para probar servicios AWS localmente.

**¿La respuesta de la comunidad?**

Entró Floci.

---

## ¿Qué es Floci?

Floci (nombrado por [floccus](https://es.wikipedia.org/wiki/Cirrocumulus_floccus), la formación de nubes que parece palomitas de maíz) es un **emulador AWS gratuito y de código abierto** construido con Quarkus Native y GraalVM.

**El pitch:**

> "Ligero, esponjoso y siempre gratuito. Sin cuenta. Sin token de autenticación. Sin puertas de funcionalidades. Solo \`docker compose up\`."

**Los números:**

- **Inicio en 24ms** (vs ~3,300ms para LocalStack)
- **13 MiB de memoria idle** (vs 143 MiB)
- **51 servicios AWS** (muchos no disponibles en LocalStack Community)
- **Licencia MIT** (verdadero código abierto, sin ocaso de "edición comunitaria")
- **Reemplazo directo** (mismo puerto 4566, mismos protocolos)

**La promesa:**

Cada servicio está completamente desbloqueado. Sin tier de pago. Sin funcionalidades enterprise. Sin tokens de autenticación. Nunca.

---

## Por Qué Floci Lo Cambia Todo

### 1. Rendimiento Que Realmente Importa

**138× más rápido al iniciar:**

\`\`\`bash
# LocalStack Community
docker run localstack/localstack
# ~3,300ms hasta estar listo

# Floci
docker run floci/floci:latest
# 24ms hasta estar listo
\`\`\`

**Por qué esto importa:**

En pipelines de CI, cada segundo cuenta. Si tus tests levantan LocalStack 50 veces al día, eso son **2.7 minutos ahorrados por ejecución** con Floci. ¿En un mes? **Horas** de tiempo de CI recuperado.

**91% menos memoria:**

Floci usa **13 MiB en idle** vs los 143 MiB de LocalStack. Eso significa:
- Runners de CI más pequeños (más baratos)
- Más contenedores en la misma máquina
- Arranques en frío más rápidos

### 2. Motores Reales, No Mocks

Aquí es donde Floci se pone interesante. En lugar de mocks superficiales, Floci usa **motores reales respaldados por Docker** para servicios complejos:

**Lambda:** Runtimes AWS reales en contenedores  
**RDS:** PostgreSQL, MySQL, MariaDB reales  
**ElastiCache:** Redis/Valkey real  
**MSK:** Kafka real vía Redpanda  
**EKS:** Kubernetes real vía k3s  
**OpenSearch:** Clusters OpenSearch reales

**Por qué esto importa:**

No estás probando contra mocks. Estás probando contra **los protocolos y comportamientos reales** que tu código de producción encontrará.

### 3. Soporte IAM Completo

Floci implementa **autenticación IAM real y validación SigV4** para:
- Lambda, ElastiCache, RDS, ECS, EC2
- MSK, EKS, OpenSearch, ECR, CodeBuild

**Qué significa esto:**

Tus políticas IAM funcionan localmente. Tus flujos de autenticación funcionan localmente. Tus pruebas de seguridad funcionan localmente.

No más "funciona localmente pero falla en AWS por IAM."

---

## Integración con Terraform: Infraestructura como Código, Localmente

Aquí es donde Floci se convierte en un cambio de juego para equipos de infraestructura.

### La Configuración

\`\`\`hcl
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3       = "http://localhost:4566"
    dynamodb = "http://localhost:4566"
    lambda   = "http://localhost:4566"
    # ... los 51 servicios
  }
}
\`\`\`

### El Flujo de Trabajo

**1. Diseña localmente:**

\`\`\`bash
docker run -d -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

terraform init
terraform apply
\`\`\`

**2. Prueba la arquitectura:**

Tu infraestructura AWS completa corre **en tu laptop**. Buckets S3, funciones Lambda, tablas DynamoDB, colas SQS — todo local, todo gratis.

**3. Itera rápidamente:**

\`\`\`bash
terraform destroy
terraform apply
\`\`\`

Sin costos de nube. Sin esperar que los recursos se aprovisionen. Sin dolores de cabeza de limpieza.

**4. Despliega a AWS:**

Una vez que estés seguro, solo cambia el endpoint del provider a AWS real. Mismo código. Mismos recursos. Listo para producción.

---

## El Poder del Diseño de Arquitectura Local

Floci desbloquea algo poderoso: **experimentación de arquitectura sin riesgos**.

### Escenario 1: Aprender AWS

**Antes de Floci:**
- Leer documentación
- Desplegar a AWS
- Sorprenderse con los costos
- Borrar todo en pánico

**Con Floci:**
- Levantar cualquier servicio AWS localmente
- Experimentar libremente
- Romper cosas sin consecuencias
- Aprender haciendo
- Costo cero

**Para principiantes, esto es transformador.**

### Escenario 2: Prototipado de Arquitectura

Construye múltiples arquitecturas en paralelo. En tu laptop. Compara rendimiento. Toma una decisión informada.

**Costo:** $0  
**Tiempo:** Horas en lugar de días  
**Riesgo:** Cero

### Escenario 3: Replicación de Entornos Complejos

Tu entorno de producción tiene 15 microservicios, 8 bases de datos, 12 funciones Lambda. Replicar esto en AWS para pruebas cuesta **cientos de dólares por mes**.

**Con Floci:**

\`\`\`bash
docker compose up
terraform apply
\`\`\`

**Entorno completo corriendo localmente en minutos.**

---

## Ventajas Sobre LocalStack

### 1. Es Realmente Gratis

LocalStack Community está muerto. LocalStack Pro cuesta dinero. Floci tiene licencia MIT **para siempre**.

### 2. Es Más Rápido

138× más rápido al iniciar no es marketing. Es medible. Tu pipeline de CI lo sentirá.

### 3. Es Más Ligero

13 MiB vs 143 MiB. Ejecuta más contenedores. Usa máquinas más pequeñas. Ahorra dinero en runners de CI.

### 4. Más Servicios

Servicios que LocalStack Community no ofrece:
- ✅ ElastiCache, RDS, API Gateway v2 + WebSocket
- ✅ Route53, Auto Scaling, Textract
- ✅ Neptune, EKS, CodeBuild

Todos gratis en Floci.

### 5. Integración Docker Real

Floci usa motores reales. LocalStack usa mocks. La diferencia importa cuando pruebas cargas de producción.

### 6. Sin Tokens de Autenticación

Descarga la imagen. Ejecútala. Listo. Sin registros. Sin API keys. Sin telemetría.

---

## Desventajas (Seamos Honestos)

Floci no es perfecto. Esto es lo que debes saber:

### 1. Proyecto Más Joven

LocalStack existe desde 2017. Floci lanzó en marzo 2026. Algunos casos edge podrían no estar cubiertos aún.

### 2. Comunidad Más Pequeña

Menos respuestas en Stack Overflow. Menos tutoriales. Podrías necesitar leer la documentación más cuidadosamente.

### 3. No es 100% Compatible con AWS

Ningún emulador local es perfecto. Algunas peculiaridades y casos edge de AWS no se replicarán exactamente.

### 4. Requiere Docker Socket

Para servicios respaldados por contenedores, necesitas montar \`/var/run/docker.sock\`. Esto tiene implicaciones de seguridad en algunos entornos.

**Mi opinión:** Estos son menores comparados con los beneficios. Y el proyecto está mejorando rápido (10,000+ estrellas en GitHub en 2 meses).

---

## El Futuro: Qué es Posible

Imagina estos escenarios:

### 1. Entornos de Dev con Un Comando

\`\`\`bash
git clone my-project
cd my-project
make dev-env
\`\`\`

Floci levanta todos los servicios AWS, bases de datos, colas, funciones Lambda. **Listo para codear en 30 segundos.**

### 2. Diseño de Arquitectura Potenciado por IA

Herramientas de IA podrían generar configs de Terraform, probarlas en Floci, optimizar basado en rendimiento local, desplegar a AWS cuando esté listo.

### 3. Entornos de Entrenamiento para Equipos

Las empresas podrían crear entornos sandbox para nuevos empleados, módulos de entrenamiento con servicios AWS reales, entornos de preparación para certificaciones.

### 4. Revolución CI/CD

Cada PR podría levantar entorno AWS completo, ejecutar tests de integración, validar cambios de infraestructura, destruir automáticamente. **Sin costos de nube. Paralelización ilimitada.**

---

## Comenzando con Floci

### Inicio Rápido con Floci

\`\`\`bash
docker run -d --name floci \\
  -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

aws --endpoint-url http://localhost:4566 s3 mb s3://test-bucket
aws --endpoint-url http://localhost:4566 s3 ls
\`\`\`

### Con Docker Compose

\`\`\`yaml
version: '3.8'
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - FLOCI_STORAGE_MODE=hybrid
\`\`\`

---

## Bonus: ¿También Necesitas Azure Local? Conoce Floci-AZ

Aquí es donde se pone aún mejor: **El mismo equipo construyó un emulador local de Azure.**

[Floci-AZ](https://github.com/floci-io/floci-az) trae la misma filosofía al desarrollo de Azure:

**Qué emula:**
- Blob Storage, Queue Storage, Table Storage, Azure Functions

**Mismos beneficios:**
- Puerto 4577, Licencia MIT, No requiere cuenta de Azure

### Inicio Rápido con Floci-AZ

\`\`\`bash
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

### Por Qué Esto Importa

Si estás en un **entorno multi-nube** (AWS + Azure), ahora puedes ejecutar ambos emuladores simultáneamente y probar arquitecturas cross-cloud localmente.

**Todo en tu laptop. Todo gratis.**

Este es el futuro: **desarrollo local agnóstico a la nube** sin vendor lock-in ni facturas de nube.

---

## Conclusión

Floci representa algo más grande que solo una alternativa a LocalStack.

Es una declaración: **El desarrollo local de AWS debería ser gratuito, rápido y accesible para todos.**

Cuando LocalStack se volvió de pago, la comunidad respondió con Floci. Igual que cuando Terraform se volvió BSL, obtuvimos OpenTofu.

**El código abierto siempre encuentra un camino.**

Para mí, Floci ha cambiado cómo trabajo:
- Diseño arquitecturas localmente primero
- Pruebo cambios de infraestructura sin miedo
- Aprendo nuevos servicios AWS sin costo
- Construyo entornos complejos en minutos

**Los números hablan por sí mismos:**
- 24ms de inicio
- 13 MiB de memoria
- 51 servicios
- $0 de costo
- Licencia MIT

Si todavía usas LocalStack Community (congelado), o pagas por LocalStack Pro, o evitas las pruebas locales de AWS por completo — dale una oportunidad a Floci.

Cambia una línea. Ve la diferencia.

**El futuro del desarrollo local de AWS está aquí. Y es gratis.**

---

**Recursos:**
- [Sitio Web de Floci](https://floci.io/)
- [Repositorio GitHub](https://github.com/floci-io/floci)
- [Documentación](https://floci.io/floci/)
- [Guía de Migración desde LocalStack](https://floci.io/floci/getting-started/migrate-from-localstack/)
`;

export const flociAwsLocalDevelopmentRevolution: Record<Locale, BlogPost> = {
  en: {
    slug: 'floci-aws-local-development-revolution',
    title: 'Floci: The AWS Local Emulator That Starts in 24ms and Costs $0',
    date: 'May 21, 2026',
    excerpt: "LocalStack went paid. Floci emerged as the free, MIT-licensed alternative. 138× faster startup, 91% less memory, 51 AWS services, and perfect Terraform integration. Here's why local AWS development just got a massive upgrade.",
    imageUrl: '/blog/floci-aws-local-development-revolution.webp',
    imageAiHint: 'modern cloud development visualization: laptop with docker containers showing AWS services running locally; speed indicators showing 24ms startup; terraform code flowing into local AWS architecture; comparison chart showing Floci vs LocalStack performance; developer workspace with multiple environments (dev, staging, prod) running simultaneously; professional tech illustration with cloud blue, docker blue, and green success colors; clean modern design',
    author: 'Sebastian Alvarez',
    tags: ['AWS', 'Floci', 'LocalStack', 'Docker', 'Terraform', 'IaC', 'DevOps', 'Local Development'],
    content: contentEN,
  },
  es: {
    slug: 'floci-aws-local-development-revolution',
    title: 'Floci: El Emulador AWS Local que Inicia en 24ms y Cuesta $0',
    date: 'May 21, 2026',
    excerpt: "LocalStack se volvió de pago. Floci emergió como la alternativa gratuita con licencia MIT. 138× más rápido, 91% menos memoria, 51 servicios AWS, e integración perfecta con Terraform. Por qué el desarrollo local de AWS acaba de recibir una mejora masiva.",
    imageUrl: '/blog/floci-aws-local-development-revolution.webp',
    imageAiHint: 'visualización moderna de desarrollo en la nube: laptop con contenedores docker mostrando servicios AWS corriendo localmente; indicadores de velocidad mostrando inicio de 24ms; código terraform fluyendo hacia arquitectura AWS local; gráfico de comparación mostrando rendimiento Floci vs LocalStack; espacio de trabajo de desarrollador con múltiples entornos (dev, staging, prod) corriendo simultáneamente; ilustración técnica profesional con azul nube, azul docker, y colores verdes de éxito; diseño moderno limpio',
    author: 'Sebastian Alvarez',
    tags: ['AWS', 'Floci', 'LocalStack', 'Docker', 'Terraform', 'IaC', 'DevOps', 'Desarrollo Local'],
    content: contentES,
  }
};
