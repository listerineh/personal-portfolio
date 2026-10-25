import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

const contentEN = `## Local AWS was always the annoying part

I've been building on AWS for years, and local development has always been the part I dreaded. LocalStack was the default answer, but it came with its own problems: slow startup, fiddly configuration, a lot of memory, and constant tweaking before things actually worked. Every time I brought up a local environment I knew I was in for a few minutes of waiting and a bit of hoping.

Then, in March 2026, two things happened. LocalStack archived its community edition and went fully paid, and a project called Floci launched.

I tried Floci, changed one line in my Docker setup, and it just worked. 24ms startup, 13 MiB of memory, 51 AWS services, no cost, no auth token, MIT license. My local workflow got dramatically faster, mostly because the waiting disappeared.

This post is about why I think Floci is more than a LocalStack replacement: Terraform, architecture design, learning AWS, testing, and also where it still falls short.

## What happened with LocalStack

On March 23, 2026, LocalStack changed its model. The community edition was archived, auth tokens became mandatory for everyone, security updates stopped for the free tier and many services became paid-only.

A lot of CI pipelines broke overnight, and teams that had built their whole local workflow around LocalStack had to choose between migrating and paying. For reference, LocalStack Pro costs around $50 to $100+ per developer per month. For a team of ten, that's $6,000 to $12,000 a year just to test AWS locally.

The community's answer was Floci.

## What Floci is

Floci (named after [floccus](https://en.wikipedia.org/wiki/Cirrocumulus_floccus), the cloud formation that looks like popcorn) is a free, open-source AWS emulator built with Quarkus Native and GraalVM. Its own pitch: "Light, fluffy, and always free. No account. No auth token. No feature gates. Just \`docker compose up\`."

The numbers it publishes:

- 24ms to start, against roughly 3,300ms for LocalStack
- 13 MiB of memory at idle, against 143 MiB
- 51 AWS services, several of them never available in LocalStack Community
- MIT license, so there's no community edition to sunset
- drop-in replacement: same port (4566), same protocols

And every service is unlocked. No paid tier, no enterprise features, no tokens.

## Why it changed my workflow

### Speed you actually notice

\`\`\`bash
# LocalStack Community
docker run localstack/localstack
# ~3,300ms until ready

# Floci
docker run floci/floci:latest
# ~24ms until ready
\`\`\`

That's about 138 times faster to start. In CI it adds up: if your tests bring up the emulator 50 times a day, that's around 2.7 minutes saved every day, and hours over a month. Using about 91% less memory also means smaller (cheaper) runners and more containers on the same machine.

### Real engines behind the complex services

This is the part I like most. For the heavy services, Floci runs real engines in Docker instead of shallow mocks:

- **Lambda:** the real AWS runtimes, in containers
- **RDS:** real PostgreSQL, MySQL and MariaDB
- **ElastiCache:** real Redis/Valkey
- **MSK:** Kafka, through Redpanda
- **EKS:** Kubernetes, through k3s
- **OpenSearch:** real OpenSearch clusters

So you're testing against the protocols and behavior your code will meet in production, not against an approximation of them.

### IAM that actually checks things

Floci implements real IAM authentication and SigV4 validation for Lambda, ElastiCache, RDS, ECS, EC2, MSK, EKS, OpenSearch, ECR and CodeBuild. Your policies and auth flows behave locally the way they will in AWS, which kills a whole class of "works locally, fails in AWS because of IAM" bugs.

## Terraform, entirely on your laptop

For infrastructure work this is where it really pays off. Point the AWS provider at Floci:

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
    # ...one line per service you use
  }
}
\`\`\`

Then work as usual:

\`\`\`bash
docker run -d -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

terraform init
terraform apply
\`\`\`

Your S3 buckets, Lambda functions, DynamoDB tables and SQS queues run on your laptop. Iterating is \`terraform destroy\` and \`terraform apply\` again, with no cloud bill, no waiting for resources and nothing to clean up. When you're confident, you point the provider back at AWS. Same code, same resources.

## Designing architecture without risk

What Floci really unlocks is experimenting without consequences.

**Learning AWS.** The classic path is reading the docs, deploying to AWS, getting surprised by the bill and deleting everything in a panic. With Floci you bring up whatever service you want, break things and learn by doing, for free. For beginners that's a big deal.

**Prototyping.** You can build two or three versions of an architecture in parallel on your laptop, compare them and decide with data. It costs nothing and takes hours instead of days.

**Replicating big environments.** If production has 15 microservices, 8 databases and 12 Lambda functions, a full copy in AWS for testing can cost hundreds of dollars a month. Locally, it's \`docker compose up\` and \`terraform apply\`, and a few minutes later the whole thing is running.

## Compared with LocalStack

**It's free, and stays free.** LocalStack Community is frozen and Pro is paid. Floci is MIT.

**It's faster and lighter.** 138x faster startup and 13 MiB against 143 MiB are measurable, and your CI will feel both.

**It has more services for free:** ElastiCache, RDS, API Gateway v2 with WebSocket, Route53, Auto Scaling, Textract, Neptune, EKS and CodeBuild, none of which LocalStack Community offered.

**It leans on real engines** for the heavy services, which matters when you test realistic workloads.

**No tokens.** Pull the image and run it. No sign-up, no API keys, no telemetry.

## Where it falls short

It's not perfect, and it's worth saying:

- **It's young.** LocalStack has been around since 2017, Floci since March 2026. Some edge cases won't be covered yet.
- **The community is smaller.** Fewer Stack Overflow answers and tutorials, so you'll read the docs more.
- **It's not 100% AWS.** No emulator is. Some quirks of the real thing won't be reproduced exactly.
- **It needs the Docker socket** for the container-backed services (\`/var/run/docker.sock\`), which is a security concern in some environments.

For me these are small compared to what you get, and the project is moving fast: more than 10,000 GitHub stars in two months.

## What this makes possible

A few things I'd love to see become normal:

- **One-command dev environments.** Clone the repo, run \`make dev-env\`, and every AWS service, database, queue and function is up in about 30 seconds.
- **AI-assisted architecture.** Tools that generate Terraform, test it against Floci, tune it based on what they see locally and only then deploy.
- **Training sandboxes.** Real AWS services for onboarding new hires or preparing certifications, with no risk of a surprise bill.
- **Full environments per pull request.** Bring up the whole stack, run integration tests, validate infra changes and tear it down, with no cloud cost and as much parallelism as your runners allow.

## Getting started

\`\`\`bash
docker run -d --name floci \\
  -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

aws --endpoint-url http://localhost:4566 s3 mb s3://test-bucket
aws --endpoint-url http://localhost:4566 s3 ls
\`\`\`

Or with Docker Compose:

\`\`\`yaml
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

## Bonus: Azure too

The same team built [Floci-AZ](https://github.com/floci-io/floci-az), the same idea for Azure: Blob Storage, Queue Storage, Table Storage and Azure Functions, on port 4577, MIT licensed and without an Azure account.

\`\`\`bash
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

If you work across AWS and Azure, you can run both emulators side by side and test cross-cloud setups locally, without vendor lock-in or cloud bills.

## Why this matters to me

Floci is more than a LocalStack alternative. It's a statement that local AWS development should be free, fast and available to everyone. When LocalStack went paid, the community built Floci, the same way Terraform's move to the BSL license gave us OpenTofu. Open source tends to find a way.

Day to day, it changed how I work: I design architectures locally first, test infrastructure changes without fear, learn new AWS services for free and bring up complex environments in minutes.

If you're still on the frozen LocalStack Community, paying for Pro, or skipping local AWS testing altogether, give it a try. It's one line of config.

**Resources:** [Floci website](https://floci.io/) · [GitHub](https://github.com/floci-io/floci) · [Documentation](https://floci.io/floci/) · [Migrating from LocalStack](https://floci.io/floci/getting-started/migrate-from-localstack/)

`;

const contentES = `## AWS en local siempre fue la parte molesta

Llevo años construyendo sobre AWS, y el desarrollo local siempre fue la parte que más me daba pereza. LocalStack era la respuesta por defecto, pero tenía sus propios problemas: arranque lento, configuración enredada, mucha memoria y ajustes constantes antes de que las cosas funcionaran. Cada vez que levantaba un entorno local sabía que me tocaban unos minutos de espera y un poco de fe.

Entonces, en marzo de 2026, pasaron dos cosas. LocalStack archivó su edición community y pasó a ser completamente de pago, y salió un proyecto llamado Floci.

Probé Floci, cambié una línea en mi configuración de Docker y funcionó a la primera. 24ms de arranque, 13 MiB de memoria, 51 servicios de AWS, gratis, sin token de autenticación y con licencia MIT. Mi flujo local se volvió muchísimo más rápido, sobre todo porque desapareció la espera.

Este post va de por qué creo que Floci es más que un reemplazo de LocalStack: Terraform, diseño de arquitectura, aprender AWS, pruebas, y también dónde todavía se queda corto.

## Qué pasó con LocalStack

El 23 de marzo de 2026, LocalStack cambió su modelo. Archivó la edición community, volvió obligatorio el token de autenticación para todos, congeló las actualizaciones de seguridad del plan gratuito y pasó muchos servicios a solo pago.

Un montón de pipelines de CI se rompieron de la noche a la mañana, y los equipos que tenían todo su flujo local montado sobre LocalStack tuvieron que elegir entre migrar o pagar. Como referencia, LocalStack Pro cuesta entre $50 y más de $100 por desarrollador al mes. Para un equipo de diez, son entre $6.000 y $12.000 al año solo para probar AWS en local.

La respuesta de la comunidad fue Floci.

## Qué es Floci

Floci (por [floccus](https://en.wikipedia.org/wiki/Cirrocumulus_floccus), la formación de nubes que parece canguil) es un emulador de AWS gratuito y open source, hecho con Quarkus Native y GraalVM. Su propia carta de presentación: "Light, fluffy, and always free. No account. No auth token. No feature gates. Just \`docker compose up\`."

Los números que publica:

- 24ms para arrancar, frente a unos 3.300ms de LocalStack
- 13 MiB de memoria en reposo, frente a 143 MiB
- 51 servicios de AWS, varios que LocalStack Community nunca tuvo
- licencia MIT, así que no hay edición community que se pueda archivar
- reemplazo directo: mismo puerto (4566), mismos protocolos

Y todos los servicios están desbloqueados. Sin plan de pago, sin funciones enterprise, sin tokens.

## Por qué me cambió el flujo de trabajo

### Una velocidad que se nota

\`\`\`bash
# LocalStack Community
docker run localstack/localstack
# ~3.300ms hasta estar listo

# Floci
docker run floci/floci:latest
# ~24ms hasta estar listo
\`\`\`

Es unas 138 veces más rápido para arrancar. En CI se acumula: si tus pruebas levantan el emulador 50 veces al día, son unos 2,7 minutos ahorrados cada día, y horas al mes. Usar alrededor de un 91% menos de memoria también significa runners más pequeños (y baratos) y más contenedores en la misma máquina.

### Motores reales detrás de los servicios complejos

Esta es la parte que más me gusta. Para los servicios pesados, Floci corre motores reales en Docker en vez de mocks superficiales:

- **Lambda:** los runtimes reales de AWS, en contenedores
- **RDS:** PostgreSQL, MySQL y MariaDB de verdad
- **ElastiCache:** Redis/Valkey reales
- **MSK:** Kafka, mediante Redpanda
- **EKS:** Kubernetes, mediante k3s
- **OpenSearch:** clusters reales de OpenSearch

Así que pruebas contra los protocolos y el comportamiento que tu código va a encontrar en producción, no contra una aproximación.

### IAM que de verdad valida

Floci implementa autenticación IAM real y validación SigV4 para Lambda, ElastiCache, RDS, ECS, EC2, MSK, EKS, OpenSearch, ECR y CodeBuild. Tus políticas y flujos de autenticación se comportan en local como lo harán en AWS, y eso elimina toda una familia de bugs del tipo "en local funciona, en AWS falla por IAM".

## Terraform, todo en tu laptop

Para trabajo de infraestructura es donde más rinde. Apunta el provider de AWS a Floci:

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
    # ...una línea por cada servicio que uses
  }
}
\`\`\`

Y trabaja como siempre:

\`\`\`bash
docker run -d -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

terraform init
terraform apply
\`\`\`

Tus buckets de S3, funciones Lambda, tablas de DynamoDB y colas de SQS corren en tu laptop. Iterar es \`terraform destroy\` y otra vez \`terraform apply\`, sin factura de la nube, sin esperar a que se creen los recursos y sin nada que limpiar. Cuando estés seguro, vuelves a apuntar el provider a AWS. El mismo código, los mismos recursos.

## Diseñar arquitectura sin riesgo

Lo que Floci realmente desbloquea es experimentar sin consecuencias.

**Aprender AWS.** El camino clásico es leer la documentación, desplegar en AWS, llevarte una sorpresa con la factura y borrar todo con pánico. Con Floci levantas el servicio que quieras, rompes cosas y aprendes haciendo, gratis. Para quien está empezando, es enorme.

**Prototipar.** Puedes armar dos o tres versiones de una arquitectura en paralelo en tu laptop, compararlas y decidir con datos. No cuesta nada y toma horas en vez de días.

**Replicar entornos grandes.** Si producción tiene 15 microservicios, 8 bases de datos y 12 funciones Lambda, una copia completa en AWS para pruebas puede costar cientos de dólares al mes. En local es \`docker compose up\` y \`terraform apply\`, y unos minutos después está todo corriendo.

## Frente a LocalStack

**Es gratis y lo va a seguir siendo.** LocalStack Community está congelado y Pro es de pago. Floci es MIT.

**Es más rápido y más liviano.** Arrancar 138 veces más rápido y usar 13 MiB contra 143 MiB son cosas medibles, y tu CI va a notar las dos.

**Tiene más servicios gratis:** ElastiCache, RDS, API Gateway v2 con WebSocket, Route53, Auto Scaling, Textract, Neptune, EKS y CodeBuild, ninguno disponible en LocalStack Community.

**Se apoya en motores reales** para los servicios pesados, y eso importa cuando pruebas cargas de trabajo realistas.

**Sin tokens.** Bajas la imagen y la corres. Sin registro, sin API keys, sin telemetría.

## Dónde se queda corto

No es perfecto, y vale la pena decirlo:

- **Es joven.** LocalStack existe desde 2017; Floci, desde marzo de 2026. Algunos casos borde todavía no van a estar cubiertos.
- **La comunidad es más pequeña.** Menos respuestas en Stack Overflow y menos tutoriales, así que te va a tocar leer más la documentación.
- **No es 100% AWS.** Ningún emulador lo es. Algunas rarezas del servicio real no se van a reproducir igual.
- **Necesita el socket de Docker** para los servicios que corren en contenedores (\`/var/run/docker.sock\`), y eso es un tema de seguridad en algunos entornos.

Para mí son detalles comparados con lo que ganas, y el proyecto avanza rápido: más de 10.000 estrellas en GitHub en dos meses.

## Lo que esto hace posible

Algunas cosas que me encantaría ver como algo normal:

- **Entornos de desarrollo con un solo comando.** Clonas el repo, corres \`make dev-env\` y en unos 30 segundos tienes arriba todos los servicios de AWS, bases de datos, colas y funciones.
- **Arquitectura asistida por IA.** Herramientas que generen Terraform, lo prueben contra Floci, lo ajusten según lo que ven en local y recién ahí lo desplieguen.
- **Sandboxes de capacitación.** Servicios reales de AWS para el onboarding de gente nueva o para preparar certificaciones, sin riesgo de una factura sorpresa.
- **Entornos completos por pull request.** Levantar todo el stack, correr pruebas de integración, validar cambios de infraestructura y bajarlo, sin costo de nube y con todo el paralelismo que aguanten tus runners.

## Para empezar

\`\`\`bash
docker run -d --name floci \\
  -p 4566:4566 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci:latest

aws --endpoint-url http://localhost:4566 s3 mb s3://test-bucket
aws --endpoint-url http://localhost:4566 s3 ls
\`\`\`

O con Docker Compose:

\`\`\`yaml
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

## Extra: también para Azure

El mismo equipo hizo [Floci-AZ](https://github.com/floci-io/floci-az), la misma idea para Azure: Blob Storage, Queue Storage, Table Storage y Azure Functions, en el puerto 4577, con licencia MIT y sin cuenta de Azure.

\`\`\`bash
docker run --rm -p 4577:4577 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  floci/floci-az:latest
\`\`\`

Si trabajas con AWS y Azure, puedes correr los dos emuladores a la vez y probar arquitecturas multi-nube en local, sin quedar atado a un proveedor ni pagar facturas de nube.

## Por qué me importa

Floci es más que una alternativa a LocalStack. Es una declaración de que el desarrollo local con AWS debería ser gratis, rápido y para todos. Cuando LocalStack pasó a ser de pago, la comunidad construyó Floci, igual que el cambio de Terraform a la licencia BSL nos dio OpenTofu. El open source suele encontrar la forma.

En el día a día, me cambió cómo trabajo: diseño las arquitecturas primero en local, pruebo cambios de infraestructura sin miedo, aprendo servicios nuevos de AWS sin pagar y levanto entornos complejos en minutos.

Si sigues con LocalStack Community congelado, pagando Pro o directamente sin probar AWS en local, dale una oportunidad. Es una línea de configuración.

**Recursos:** [sitio de Floci](https://floci.io/) · [GitHub](https://github.com/floci-io/floci) · [Documentación](https://floci.io/floci/) · [Migrar desde LocalStack](https://floci.io/floci/getting-started/migrate-from-localstack/)

`;

export const flociAwsLocalDevelopmentRevolution: Record<Locale, BlogPost> = {
  en: {
    slug: 'floci-aws-local-development-revolution',
    title: 'Floci: The AWS Local Emulator That Starts in 24ms and Costs $0',
    date: 'May 21, 2026',
    excerpt: 'When LocalStack went paid I tried Floci, a free, MIT-licensed AWS emulator. It starts in 24ms and runs real engines. How I use it with Terraform, and where it still falls short.',
    imageUrl: '/blog/floci-aws-local-development-revolution.webp',
    imageAiHint: 'modern cloud development visualization: laptop with docker containers showing AWS services running locally; speed indicators showing 24ms startup; terraform code flowing into local AWS architecture; comparison chart showing Floci vs LocalStack performance; developer workspace with multiple environments (dev, staging, prod) running simultaneously; professional tech illustration with cloud blue, docker blue, and green success colors; clean modern design',
    author: 'Sebastian Alvarez',
    tags: ['AWS', 'Floci', 'LocalStack', 'Docker', 'Terraform', 'IaC', 'DevOps', 'Local Development'],
    content: contentEN
  },
  es: {
    slug: 'floci-aws-local-development-revolution',
    title: 'Floci: el emulador local de AWS que arranca en 24ms y no cuesta nada',
    date: 'May 21, 2026',
    excerpt: 'Cuando LocalStack pasó a ser de pago probé Floci, un emulador de AWS gratuito y con licencia MIT. Arranca en 24ms y usa motores reales. Cómo lo uso con Terraform y dónde todavía se queda corto.',
    imageUrl: '/blog/floci-aws-local-development-revolution.es.webp',
    imageAiHint: 'visualización moderna de desarrollo en la nube: laptop con contenedores docker mostrando servicios AWS corriendo localmente; indicadores de velocidad mostrando inicio de 24ms; código terraform fluyendo hacia arquitectura AWS local; gráfico de comparación mostrando rendimiento Floci vs LocalStack; espacio de trabajo de desarrollador con múltiples entornos (dev, staging, prod) corriendo simultáneamente; ilustración técnica profesional con azul nube, azul docker, y colores verdes de éxito; diseño moderno limpio',
    author: 'Sebastian Alvarez',
    tags: ['AWS', 'Floci', 'LocalStack', 'Docker', 'Terraform', 'IaC', 'DevOps', 'Desarrollo Local'],
    content: contentES
  }
};
