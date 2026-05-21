import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

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
    content: `
## Introduction

Let me tell you about the moment I realized local AWS development had changed forever.

It was March 23, 2026. LocalStack — the tool thousands of developers relied on for local AWS emulation — archived its public repository and moved everything behind a paywall. Auth tokens required. Community edition frozen. No more free ride.

I was in the middle of a project. My CI pipeline depended on LocalStack. My team's local development workflow was built around it. And suddenly, we had a choice: **pay up or find an alternative**.

Two days earlier, on March 22, a project called **Floci** had launched.

I gave it a shot. Changed one line in my Docker config. And it just... worked.

**24ms startup time.** 13 MiB memory footprint. 51 AWS services. Zero cost. Zero auth tokens. MIT licensed forever.

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
\`\`\`bash
public.ecr.aws/lambda/python:3.12
\`\`\`

**RDS:** Real PostgreSQL, MySQL, MariaDB
\`\`\`bash
postgres:16-alpine
mysql:8.0
mariadb:11
\`\`\`

**ElastiCache:** Real Redis/Valkey
\`\`\`bash
valkey/valkey:8
\`\`\`

**MSK:** Real Kafka via Redpanda
\`\`\`bash
redpandadata/redpanda:latest
\`\`\`

**EKS:** Real Kubernetes via k3s
\`\`\`bash
rancher/k3s:latest
\`\`\`

**OpenSearch:** Real OpenSearch clusters
\`\`\`bash
opensearchproject/opensearch:2
\`\`\`

**Why this matters:**

You're not testing against mocks. You're testing against **the actual protocols and behaviors** your production code will encounter.

### 3. Full IAM Support

Floci implements **real IAM authentication and SigV4 validation** for:
- Lambda
- ElastiCache
- RDS
- ECS
- EC2
- MSK
- EKS
- OpenSearch
- ECR
- CodeBuild

**What this means:**

Your IAM policies work locally. Your authentication flows work locally. Your security testing works locally.

No more "it works locally but fails in AWS because of IAM."

---

## Terraform Integration: Infrastructure as Code, Locally

Here's where Floci becomes a game-changer for infrastructure teams.

### The Setup

\`\`\`hcl
# provider.tf
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3             = "http://localhost:4566"
    dynamodb       = "http://localhost:4566"
    lambda         = "http://localhost:4566"
    sqs            = "http://localhost:4566"
    sns            = "http://localhost:4566"
    iam            = "http://localhost:4566"
    # ... all 51 services
  }
}
\`\`\`

### The Workflow

**1. Design locally:**

\`\`\`bash
# Start Floci
docker run -d -p 4566:4566 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  floci/floci:latest

# Apply your Terraform
terraform init
terraform apply
\`\`\`

**2. Test the architecture:**

Your entire AWS infrastructure runs **on your laptop**. S3 buckets, Lambda functions, DynamoDB tables, SQS queues — all local, all free.

**3. Iterate rapidly:**

\`\`\`bash
terraform destroy  # Clean slate
# Edit your .tf files
terraform apply    # Test again
\`\`\`

No cloud costs. No waiting for resources to provision. No cleanup headaches.

**4. Deploy to AWS:**

Once you're confident, just change the provider endpoint to real AWS:

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
  # Remove endpoint overrides
}
\`\`\`

Same code. Same resources. Production-ready.

### Real-World Example: Multi-Service Architecture

\`\`\`hcl
# S3 bucket for data
resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
}

# DynamoDB table
resource "aws_dynamodb_table" "users" {
  name         = "users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }
}

# Lambda function
resource "aws_lambda_function" "processor" {
  filename      = "lambda.zip"
  function_name = "data-processor"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.data.id
      TABLE_NAME  = aws_dynamodb_table.users.name
    }
  }
}

# SQS queue
resource "aws_sqs_queue" "events" {
  name = "event-queue"
}

# Lambda trigger from SQS
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.events.arn
  function_name    = aws_lambda_function.processor.arn
}
\`\`\`

**All of this runs locally in Floci.** Test the entire flow:
1. Upload to S3
2. Trigger Lambda
3. Write to DynamoDB
4. Send SQS message
5. Lambda processes event

Zero AWS costs. Infinite iterations.

---

## The Power of Local Architecture Design

Floci unlocks something powerful: **risk-free architecture experimentation**.

### Scenario 1: Learning AWS

**Before Floci:**
- Read documentation
- Hope you understand
- Deploy to AWS
- Get surprised by costs
- Delete everything in panic

**With Floci:**
- Spin up any AWS service locally
- Experiment freely
- Break things without consequences
- Learn by doing
- Zero cost

**For beginners, this is transformative.**

You can learn:
- How S3 event notifications work
- How Lambda integrates with DynamoDB Streams
- How Step Functions orchestrate workflows
- How API Gateway routes requests
- How ECS tasks communicate

All without an AWS account.

### Scenario 2: Architecture Prototyping

**The challenge:**

You need to design a new microservice architecture. Should you use:
- Lambda + API Gateway?
- ECS Fargate + ALB?
- EC2 + Auto Scaling?

**With Floci:**

Build all three. **In parallel.** On your laptop.

\`\`\`bash
# Terminal 1: Lambda architecture
cd lambda-approach
terraform apply

# Terminal 2: ECS architecture  
cd ecs-approach
terraform apply

# Terminal 3: EC2 architecture
cd ec2-approach
terraform apply
\`\`\`

Load test them. Compare performance. Measure complexity. Make an informed decision.

**Cost:** $0
**Time:** Hours instead of days
**Risk:** Zero

### Scenario 3: Complex Environment Replication

**The problem:**

Your production environment has:
- 15 microservices
- 8 databases
- 12 Lambda functions
- 5 SQS queues
- 3 SNS topics
- API Gateway
- CloudFront (via S3)

Replicating this in AWS for testing costs **hundreds of dollars per month**.

**With Floci:**

\`\`\`bash
docker compose up
terraform apply
\`\`\`

**Entire environment running locally in minutes.**

Developers can:
- Test integration flows
- Debug cross-service issues
- Validate deployments
- Run end-to-end tests

All on their laptops. All for free.

---

## Advantages Over LocalStack

Let me be direct about why Floci wins:

### 1. **It's Actually Free**

LocalStack Community is dead. LocalStack Pro costs money. Floci is MIT licensed **forever**.

### 2. **It's Faster**

138× faster startup isn't marketing. It's measurable. Your CI pipeline will feel it.

### 3. **It's Lighter**

13 MiB vs 143 MiB. Run more containers. Use smaller machines. Save money on CI runners.

### 4. **More Services**

Services LocalStack Community doesn't offer:
- ✅ ElastiCache
- ✅ RDS
- ✅ API Gateway v2 + WebSocket
- ✅ Route53
- ✅ Auto Scaling
- ✅ Textract
- ✅ Neptune
- ✅ EKS
- ✅ CodeBuild

All free in Floci.

### 5. **Real Docker Integration**

Floci uses real engines. LocalStack uses mocks. The difference matters when you're testing production workloads.

### 6. **No Auth Tokens**

Pull the image. Run it. Done. No sign-ups. No API keys. No telemetry.

---

## Disadvantages (Let's Be Honest)

Floci isn't perfect. Here's what you should know:

### 1. **Younger Project**

LocalStack has been around since 2017. Floci launched in March 2026. Some edge cases might not be covered yet.

### 2. **Smaller Community**

Fewer Stack Overflow answers. Fewer tutorials. You might need to read the docs more carefully.

### 3. **Not 100% AWS-Compatible**

No local emulator is perfect. Some AWS quirks and edge cases won't be replicated exactly.

### 4. **Requires Docker Socket**

For container-backed services (Lambda, RDS, ECS, etc.), you need to mount `/var/run/docker.sock`. This has security implications in some environments.

### 5. **Learning Curve for Advanced Features**

Multi-account isolation, custom storage modes, and IAM configuration require reading documentation.

**My take:** These are minor compared to the benefits. And the project is improving fast (10,000+ GitHub stars in 2 months).

---

## The Future: What's Possible

Imagine these scenarios in the near future:

### 1. **One-Command Dev Environments**

\`\`\`bash
git clone my-project
cd my-project
make dev-env
\`\`\`

Floci spins up:
- All AWS services
- All databases
- All queues
- All Lambda functions
- Complete architecture

**Ready to code in 30 seconds.**

### 2. **AI-Powered Architecture Design**

AI tools could:
- Generate Terraform configs
- Test them in Floci
- Optimize based on local performance
- Deploy to AWS when ready

**Iterate on architectures at AI speed.**

### 3. **Training Environments for Teams**

Companies could create:
- Sandbox environments for new hires
- Training modules with real AWS services
- Certification prep environments
- Interview coding challenges

**All running locally. All free.**

### 4. **CI/CD Revolution**

Every PR could:
- Spin up full AWS environment
- Run integration tests
- Validate infrastructure changes
- Tear down automatically

**No cloud costs. Unlimited parallelization.**

---

## Getting Started with Floci

### Quick Start

\`\`\`bash
# Pull and run
docker run -d --name floci \
  -p 4566:4566 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  floci/floci:latest

# Test it
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

### With Terraform

See the example in the Terraform section above.

---

## Bonus: Also Need Local Azure? Meet Floci-AZ

Here's where it gets even better: **The same team built a local Azure emulator.**

[Floci-AZ](https://github.com/floci-io/floci-az) brings the same philosophy to Azure development:

**What it emulates:**
- **Blob Storage** (Azure's S3 equivalent)
- **Queue Storage** (message queuing)
- **Table Storage** (NoSQL database)
- **Azure Functions** (serverless compute)

**Same benefits:**
- **Port 4577** (single endpoint for all services)
- **MIT licensed** (truly free forever)
- **No Azure account required**
- **Same native speed** (built with GraalVM)

### Quick Start

\`\`\`bash
# All Azure services on port 4577
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

### Why This Matters

If you're in a **multi-cloud environment** (AWS + Azure), you can now:

**Run both emulators simultaneously:**

\`\`\`bash
# AWS on 4566
docker run -d -p 4566:4566 floci/floci:latest

# Azure on 4577
docker run -d -p 4577:4577 floci/floci-az:latest
\`\`\`

**Test cross-cloud architectures locally:**
- AWS Lambda calling Azure Blob Storage
- Azure Functions writing to AWS DynamoDB
- Multi-cloud disaster recovery scenarios
- Cost comparison between cloud providers

**All on your laptop. All for free.**

This is the future: **cloud-agnostic local development** without vendor lock-in or cloud bills.

---

## Conclusion

Floci represents something bigger than just a LocalStack alternative.

It's a statement: **Local AWS development should be free, fast, and accessible to everyone.**

When LocalStack went paid, the community responded with Floci. Just like when Terraform went BSL, we got OpenTofu. Just like when Docker Desktop added licensing, we got alternatives.

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
`,
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
    content: `
## Introducción

Déjame contarte sobre el momento en que me di cuenta de que el desarrollo local de AWS había cambiado para siempre.

Era el 23 de marzo de 2026. LocalStack — la herramienta en la que miles de desarrolladores confiaban para emulación local de AWS — archivó su repositorio público y movió todo detrás de un muro de pago. Tokens de autenticación requeridos. Edición comunitaria congelada. Se acabó el viaje gratis.

Estaba en medio de un proyecto. Mi pipeline de CI dependía de LocalStack. El flujo de trabajo de desarrollo local de mi equipo estaba construido alrededor de él. Y de repente, teníamos una opción: **pagar o buscar una alternativa**.

Dos días antes, el 22 de marzo, un proyecto llamado **Floci** había lanzado.

Le di una oportunidad. Cambié una línea en mi configuración de Docker. Y simplemente... funcionó.

**Tiempo de inicio de 24ms.** Huella de memoria de 13 MiB. 51 servicios AWS. Costo cero. Cero tokens de autenticación. Licencia MIT para siempre.

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
terraform destroy  # Borrón y cuenta nueva
# Edita tus archivos .tf
terraform apply    # Prueba de nuevo
\`\`\`

Sin costos de nube. Sin esperar que los recursos se aprovisionen. Sin dolores de cabeza de limpieza.

**4. Despliega a AWS:**

Una vez que estés seguro, solo cambia el endpoint del provider a AWS real:

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
  # Remueve los overrides de endpoint
}
\`\`\`

Mismo código. Mismos recursos. Listo para producción.

---

## El Poder del Diseño de Arquitectura Local

Floci desbloquea algo poderoso: **experimentación de arquitectura sin riesgos**.

### Escenario 1: Aprender AWS

**Antes de Floci:**
- Leer documentación
- Esperar entender
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

**El desafío:**

Necesitas diseñar una nueva arquitectura de microservicios. ¿Deberías usar:
- Lambda + API Gateway?
- ECS Fargate + ALB?
- EC2 + Auto Scaling?

**Con Floci:**

Construye las tres. **En paralelo.** En tu laptop.

\`\`\`bash
# Terminal 1: Arquitectura Lambda
cd lambda-approach
terraform apply

# Terminal 2: Arquitectura ECS  
cd ecs-approach
terraform apply

# Terminal 3: Arquitectura EC2
cd ec2-approach
terraform apply
\`\`\`

Haz pruebas de carga. Compara rendimiento. Mide complejidad. Toma una decisión informada.

**Costo:** $0
**Tiempo:** Horas en lugar de días
**Riesgo:** Cero

### Escenario 3: Replicación de Entornos Complejos

**El problema:**

Tu entorno de producción tiene:
- 15 microservicios
- 8 bases de datos
- 12 funciones Lambda
- 5 colas SQS
- 3 topics SNS
- API Gateway
- CloudFront (vía S3)

Replicar esto en AWS para pruebas cuesta **cientos de dólares por mes**.

**Con Floci:**

\`\`\`bash
docker compose up
terraform apply
\`\`\`

**Entorno completo corriendo localmente en minutos.**

Los desarrolladores pueden:
- Probar flujos de integración
- Debuggear problemas entre servicios
- Validar despliegues
- Ejecutar tests end-to-end

Todo en sus laptops. Todo gratis.

---

## Ventajas Sobre LocalStack

Déjame ser directo sobre por qué Floci gana:

### 1. **Es Realmente Gratis**

LocalStack Community está muerto. LocalStack Pro cuesta dinero. Floci tiene licencia MIT **para siempre**.

### 2. **Es Más Rápido**

138× más rápido al iniciar no es marketing. Es medible. Tu pipeline de CI lo sentirá.

### 3. **Es Más Ligero**

13 MiB vs 143 MiB. Ejecuta más contenedores. Usa máquinas más pequeñas. Ahorra dinero en runners de CI.

### 4. **Más Servicios**

Servicios que LocalStack Community no ofrece:
- ✅ ElastiCache
- ✅ RDS
- ✅ API Gateway v2 + WebSocket
- ✅ Route53
- ✅ Auto Scaling
- ✅ Textract
- ✅ Neptune
- ✅ EKS
- ✅ CodeBuild

Todos gratis en Floci.

### 5. **Integración Docker Real**

Floci usa motores reales. LocalStack usa mocks. La diferencia importa cuando pruebas cargas de producción.

### 6. **Sin Tokens de Autenticación**

Descarga la imagen. Ejecútala. Listo. Sin registros. Sin API keys. Sin telemetría.

---

## Desventajas (Seamos Honestos)

Floci no es perfecto. Esto es lo que debes saber:

### 1. **Proyecto Más Joven**

LocalStack existe desde 2017. Floci lanzó en marzo 2026. Algunos casos edge podrían no estar cubiertos aún.

### 2. **Comunidad Más Pequeña**

Menos respuestas en Stack Overflow. Menos tutoriales. Podrías necesitar leer la documentación más cuidadosamente.

### 3. **No es 100% Compatible con AWS**

Ningún emulador local es perfecto. Algunas peculiaridades y casos edge de AWS no se replicarán exactamente.

### 4. **Requiere Docker Socket**

Para servicios respaldados por contenedores (Lambda, RDS, ECS, etc.), necesitas montar \`/var/run/docker.sock\`. Esto tiene implicaciones de seguridad en algunos entornos.

### 5. **Curva de Aprendizaje para Funcionalidades Avanzadas**

Aislamiento multi-cuenta, modos de almacenamiento personalizados, y configuración IAM requieren leer documentación.

**Mi opinión:** Estos son menores comparados con los beneficios. Y el proyecto está mejorando rápido (10,000+ estrellas en GitHub en 2 meses).

---

## El Futuro: Qué es Posible

Imagina estos escenarios en el futuro cercano:

### 1. **Entornos de Dev con Un Comando**

\`\`\`bash
git clone my-project
cd my-project
make dev-env
\`\`\`

Floci levanta:
- Todos los servicios AWS
- Todas las bases de datos
- Todas las colas
- Todas las funciones Lambda
- Arquitectura completa

**Listo para codear en 30 segundos.**

### 2. **Diseño de Arquitectura Potenciado por IA**

Herramientas de IA podrían:
- Generar configs de Terraform
- Probarlas en Floci
- Optimizar basado en rendimiento local
- Desplegar a AWS cuando esté listo

**Iterar en arquitecturas a velocidad de IA.**

### 3. **Entornos de Entrenamiento para Equipos**

Las empresas podrían crear:
- Entornos sandbox para nuevos empleados
- Módulos de entrenamiento con servicios AWS reales
- Entornos de preparación para certificaciones
- Desafíos de código para entrevistas

**Todo corriendo localmente. Todo gratis.**

### 4. **Revolución CI/CD**

Cada PR podría:
- Levantar entorno AWS completo
- Ejecutar tests de integración
- Validar cambios de infraestructura
- Destruir automáticamente

**Sin costos de nube. Paralelización ilimitada.**

---

## Comenzando con Floci

### Inicio Rápido

\`\`\`bash
# Descargar y ejecutar
docker run -d --name floci \\
  -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

# Probarlo
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
- **Blob Storage** (el equivalente de S3 en Azure)
- **Queue Storage** (colas de mensajes)
- **Table Storage** (base de datos NoSQL)
- **Azure Functions** (cómputo serverless)

**Mismos beneficios:**
- **Puerto 4577** (endpoint único para todos los servicios)
- **Licencia MIT** (verdaderamente gratis para siempre)
- **No requiere cuenta de Azure**
- **Misma velocidad nativa** (construido con GraalVM)

### Inicio Rápido

\`\`\`bash
# Todos los servicios Azure en puerto 4577
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

### Por Qué Esto Importa

Si estás en un **entorno multi-nube** (AWS + Azure), ahora puedes:

**Ejecutar ambos emuladores simultáneamente:**

\`\`\`bash
# AWS en 4566
docker run -d -p 4566:4566 floci/floci:latest

# Azure en 4577
docker run -d -p 4577:4577 floci/floci-az:latest
\`\`\`

**Probar arquitecturas cross-cloud localmente:**
- Lambda de AWS llamando a Azure Blob Storage
- Azure Functions escribiendo a AWS DynamoDB
- Escenarios de disaster recovery multi-nube
- Comparación de costos entre proveedores de nube

**Todo en tu laptop. Todo gratis.**

Este es el futuro: **desarrollo local agnóstico a la nube** sin vendor lock-in ni facturas de nube.

---

## Conclusión

Floci representa algo más grande que solo una alternativa a LocalStack.

Es una declaración: **El desarrollo local de AWS debería ser gratuito, rápido y accesible para todos.**

Cuando LocalStack se volvió de pago, la comunidad respondió con Floci. Igual que cuando Terraform se volvió BSL, obtuvimos OpenTofu. Igual que cuando Docker Desktop agregó licenciamiento, obtuvimos alternativas.

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
`,
  }
};
