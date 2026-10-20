import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const terraformScalingInfrastructure: Record<Locale, BlogPost> = {
  en: {
    slug: 'terraform-scaling-infrastructure',
    title: 'Terraform: Scaling Infrastructure Without Breaking the Bank',
    date: 'January 14, 2026',
    excerpt: 'How I run dev, staging and prod from one Terraform codebase, size each environment for what it actually needs, and grow infrastructure only when the product does.',
    imageUrl: '/blog/terraform-scaling-infrastructure.webp',
    imageAiHint: 'terraform infrastructure as code visualization: three parallel cloud environments (dev, staging, production) flowing from left to right, each showing infrastructure components like servers, databases, load balancers; terraform code blocks and git version control symbols; cost optimization graph showing decreasing expenses; professional tech illustration with blue and green colors',
    content: `
## The console era

My first real AWS setup was built entirely by clicking. A VPC here, a security group there, an RDS instance configured from memory at 11 PM. It worked, right up until I needed a second environment and realized I couldn't tell you exactly what I had done to build the first one.

That's the problem Terraform actually solves for me. Not "infrastructure as code" as a slogan, but being able to answer "what's running in production, and why?" by opening a folder.

This post is how I use it today: one codebase for dev, staging and prod, resources sized for each environment, modules for whatever repeats, and a habit of starting small that has saved me a lot of money.

## What clicking around costs you

If you've managed infrastructure by hand, you know the list. A new environment takes a day and still ends up slightly different from the last one. Nobody remembers why a security group has that one odd rule. There's no history, so nobody wants to touch prod, so prod slowly drifts away from everything else.

None of that is dramatic on its own. Together it means slow deploys, bugs that only happen in one environment, and a cloud bill you don't fully understand.

## Same code, three environments

The setup I keep coming back to is one set of Terraform files and a folder of variables per environment:

\`\`\`text
infra/
├── modules/
│   ├── microservice/
│   ├── database/
│   └── api-gateway/
└── environments/
    ├── dev/terraform.tfvars
    ├── staging/terraform.tfvars
    └── prod/terraform.tfvars
\`\`\`

I build in dev first, where everything is small and breaking things is fine. Once dev is stable, staging gets the exact same architecture with its own state. Prod is the same code again with bigger numbers: larger instances, autoscaling, Multi-AZ, stricter security groups, more monitoring.

So I'm not maintaining three infrastructures. I'm maintaining one, plus three small files that say how big each copy should be. A change goes dev → staging → prod, and by the time it reaches prod it has already been applied twice.

You can get the same result with \`terraform workspace\` instead of folders. I prefer folders: each environment's state lives somewhere obvious, and it's harder to run \`apply\` against prod by accident.

## Paying for what each environment needs

Dev doesn't need prod's database. Obvious, sure, but when environments are copied by hand it's very common to end up with three identical, expensive setups. With Terraform, size is just a variable:

\`\`\`hcl
variable "db_instance_class" {
  type = map(string)
  default = {
    dev        = "db.t3.micro"    # cheap, good enough to develop against
    staging    = "db.t3.small"    # prod's shape, smaller
    production = "db.r5.large"    # memory-optimized
  }
}

resource "aws_db_instance" "main" {
  instance_class = var.db_instance_class[var.environment]
  # ... other config
}
\`\`\`

Dev runs on something that costs almost nothing, staging keeps prod's shape at a smaller scale, and prod gets the instance it needs. Doing this across every resource is where most of my savings came from. No clever tricks, just not paying for production-sized hardware in an environment three people use.

## Terraform for everything, not just servers

Early on I only managed EC2 and RDS with Terraform and left "the small stuff" to the console. The small stuff is exactly what bites you later. These days pretty much everything lives in code:

- networking: VPCs, subnets, NAT gateways, security groups
- compute: ECS/Fargate services, autoscaling, load balancers
- API Gateway routes, CORS and custom domains
- IAM roles and policies, secrets
- Route53, certificates, CloudFront
- WAF rules and rate limits
- backups and failover

If it can be created in the console, it can drift in the console. Keeping all of it in Git is what makes an environment reproducible for real.

## Modules: where it starts paying off

Around the third service you notice you're writing the same 200 lines every time: task definition, service, target group, alarms. That's when a module is worth it:

\`\`\`hcl
module "user_service" {
  source = "./modules/microservice"

  service_name    = "user-service"
  environment     = var.environment
  container_image = "myapp/user-service:latest"
  cpu             = var.environment == "production" ? 1024 : 256
  memory          = var.environment == "production" ? 2048 : 512

  enable_autoscaling = var.environment == "production"
  min_instances      = var.environment == "production" ? 2 : 1
  max_instances      = var.environment == "production" ? 10 : 2
}
\`\`\`

A new microservice is now a dozen lines, and the decisions (how much CPU in prod, when to autoscale) live in one place. When I fixed a logging setting in the module, every service picked it up on the next apply. I ended up with modules for microservices, databases, API Gateway, monitoring and networking, and adding a service went from most of a day to a few minutes.

One warning from experience: don't extract a module out of a single use. Wait until you've written the thing twice and actually know which parts change.

## Making production changes less scary

Applying changes to production still makes me a little nervous, so the workflow is boring on purpose. First, a saved plan:

\`\`\`bash
terraform plan -out=tfplan
\`\`\`

The plan shows exactly what will be created (+), changed (~) or destroyed (-). I read it every time, and I read the destroys twice: a renamed resource can quietly mean "delete the database and create a new one". Then I apply that same saved plan, so what runs is exactly what I reviewed:

\`\`\`bash
terraform apply tfplan
\`\`\`

In CI, \`terraform fmt -check\`, \`terraform validate\` and \`tflint\` run on every pull request, and the plan is posted to the PR, so infrastructure changes get reviewed like any other code.

## Start small, grow when it's justified

This is the habit that saved me the most. For a new product I don't start with the architecture I'd want at scale. I start with what today's traffic needs and let Terraform make the next step cheap:

- **MVP:** one instance, basic monitoring, scaling by hand. Around $50 a month.
- **Growth:** autoscaling, a load balancer, better monitoring. Around $200 a month.
- **Scale:** Multi-AZ, a CDN, caching. Around $800 a month, once revenue justifies it.

\`\`\`hcl
variable "scaling_tier" {
  type    = string
  default = "mvp" # or "growth" or "scale"
}

locals {
  instance_count = {
    mvp    = 1
    growth = 2
    scale  = 5
  }
}

resource "aws_instance" "app" {
  count = local.instance_count[var.scaling_tier]
  # ... config
}
\`\`\`

Moving up a tier means changing one variable and running \`apply\`. Because the jump is that easy, I don't feel the urge to over-provision "just in case", which is where a lot of cloud money quietly goes.

## A real example

The project that convinced me was a platform with eight microservices, an API Gateway, three databases, a message queue and a monitoring stack, across three environments. With the modules and per-environment variables above, bringing up a complete environment took about two hours. The first time we did it by hand it took around two weeks, and the result wasn't even consistent.

The other numbers I tracked: roughly 60% lower monthly cost after right-sizing dev and staging, and new services live in about ten minutes. Worth more than either: every infrastructure change went through a pull request, so we always knew who changed what, and why.

## What I'd tell myself earlier

**Use remote state from day one.** S3 for the state and DynamoDB for locking, so two people can't apply at the same time:

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
\`\`\`

**Keep environments in separate state.** Dev and prod never share a state file.

**Pin module versions.** A module update you didn't ask for is a nasty surprise in the middle of a plan:

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"
}
\`\`\`

**Don't hardcode.** If a value changes between environments, it's a variable.

**Give every module a README.** Future you, or the next person on the team, won't remember what \`enable_xray\` does.

## If you're starting today

Don't try to import your whole account in one go. Pick one service, write its Terraform, bring it up in dev, copy it to staging, and only then promote it to production. When you catch yourself repeating code, make a module. Then move on to the next service.

It's slower the first week and much faster every week after that. And you finally get to answer "what's running in prod?" by opening a folder instead of a browser tab.
`,
    author: 'Sebastian Alvarez',
    tags: ['Terraform', 'Infrastructure as Code', 'DevOps', 'Cloud', 'AWS', 'Scaling', 'Cost Optimization']
  },
  es: {
    slug: 'terraform-scaling-infrastructure',
    title: 'Terraform: escalar infraestructura sin quemar plata',
    date: 'January 14, 2026',
    excerpt: 'Cómo manejo dev, staging y prod con un solo código de Terraform, dimensiono cada entorno para lo que de verdad necesita y hago crecer la infraestructura solo cuando el producto lo pide.',
    imageUrl: '/blog/terraform-scaling-infrastructure.webp',
    imageAiHint: 'visualización de terraform infraestructura como código: tres entornos cloud paralelos (dev, staging, producción) fluyendo de izquierda a derecha, cada uno mostrando componentes de infraestructura como servidores, bases de datos, balanceadores de carga; bloques de código terraform y símbolos de control de versiones git; gráfico de optimización de costos mostrando gastos decrecientes; ilustración técnica profesional con colores azul y verde',
    content: `
## La época de la consola

Mi primera infraestructura seria en AWS la armé a puro clic. Una VPC por aquí, un security group por allá, una instancia de RDS configurada de memoria a las 11 de la noche. Funcionaba, hasta que necesité un segundo entorno y me di cuenta de que no podía explicar con exactitud qué había hecho para montar el primero.

Ese es el problema que Terraform me resuelve de verdad. No "infraestructura como código" como eslogan, sino poder responder "¿qué está corriendo en producción y por qué?" abriendo una carpeta.

En este post cuento cómo lo uso hoy: un solo código para dev, staging y prod, recursos dimensionados para cada entorno, módulos para todo lo que se repite y la costumbre de empezar pequeño, que me ha ahorrado bastante plata.

## Lo que cuesta hacerlo a mano

Si alguna vez gestionaste infraestructura a mano, conoces la lista. Un entorno nuevo te toma un día y aun así queda un poco distinto al anterior. Nadie se acuerda de por qué ese security group tiene esa regla rara. No hay historial, entonces nadie quiere tocar prod, entonces prod se va alejando poco a poco de todo lo demás.

Nada de eso es grave por separado. Junto significa despliegues lentos, bugs que solo pasan en un entorno y una factura de la nube que no terminas de entender.

## El mismo código, tres entornos

La estructura a la que siempre vuelvo es un solo conjunto de archivos de Terraform y una carpeta de variables por entorno:

\`\`\`text
infra/
├── modules/
│   ├── microservice/
│   ├── database/
│   └── api-gateway/
└── environments/
    ├── dev/terraform.tfvars
    ├── staging/terraform.tfvars
    └── prod/terraform.tfvars
\`\`\`

Construyo primero en dev, donde todo es pequeño y romper cosas no pasa nada. Cuando dev está estable, staging recibe exactamente la misma arquitectura con su propio state. Prod es otra vez el mismo código con números más grandes: instancias más potentes, autoscaling, Multi-AZ, security groups más estrictos y más monitoreo.

O sea, no mantengo tres infraestructuras. Mantengo una, más tres archivitos que dicen qué tan grande debe ser cada copia. Un cambio pasa por dev → staging → prod, y para cuando llega a prod ya se aplicó dos veces.

Puedes lograr lo mismo con \`terraform workspace\` en lugar de carpetas. Yo prefiero las carpetas: el state de cada entorno está en un lugar obvio y es más difícil hacer \`apply\` contra prod sin querer.

## Pagar solo lo que cada entorno necesita

Dev no necesita la base de datos de prod. Suena obvio, pero cuando los entornos se copian a mano es muy común terminar con tres setups idénticos y caros. Con Terraform, el tamaño es solo una variable:

\`\`\`hcl
variable "db_instance_class" {
  type = map(string)
  default = {
    dev        = "db.t3.micro"    # barata, suficiente para desarrollar
    staging    = "db.t3.small"    # la forma de prod, más pequeña
    production = "db.r5.large"    # optimizada para memoria
  }
}

resource "aws_db_instance" "main" {
  instance_class = var.db_instance_class[var.environment]
  # ... resto de la configuración
}
\`\`\`

Dev corre sobre algo que casi no cuesta, staging mantiene la forma de prod a menor escala y prod tiene la instancia que necesita. Hacer esto con cada recurso es de donde salió la mayor parte del ahorro. Nada de trucos, simplemente no pagar hardware de producción para un entorno que usan tres personas.

## Terraform para todo, no solo para servidores

Al principio solo manejaba EC2 y RDS con Terraform y dejaba "las cosas pequeñas" en la consola. Justo esas cosas pequeñas son las que te muerden después. Hoy casi todo vive en código:

- red: VPCs, subnets, NAT gateways, security groups
- cómputo: servicios en ECS/Fargate, autoscaling, load balancers
- rutas, CORS y dominios propios en API Gateway
- roles y políticas de IAM, secretos
- Route53, certificados, CloudFront
- reglas de WAF y rate limits
- backups y failover

Si algo se puede crear en la consola, también puede cambiar en la consola sin que nadie se entere. Tenerlo todo en Git es lo que hace que un entorno sea reproducible de verdad.

## Módulos: donde empieza a valer la pena

Más o menos en el tercer servicio te das cuenta de que estás escribiendo las mismas 200 líneas cada vez: task definition, servicio, target group, alarmas. Ahí es cuando conviene un módulo:

\`\`\`hcl
module "user_service" {
  source = "./modules/microservice"

  service_name    = "user-service"
  environment     = var.environment
  container_image = "myapp/user-service:latest"
  cpu             = var.environment == "production" ? 1024 : 256
  memory          = var.environment == "production" ? 2048 : 512

  enable_autoscaling = var.environment == "production"
  min_instances      = var.environment == "production" ? 2 : 1
  max_instances      = var.environment == "production" ? 10 : 2
}
\`\`\`

Un microservicio nuevo ahora son una docena de líneas, y las decisiones (cuánta CPU en prod, cuándo escalar) están en un solo lugar. Cuando corregí una configuración de logs en el módulo, todos los servicios la tomaron en el siguiente apply. Terminé con módulos para microservicios, bases de datos, API Gateway, monitoreo y red, y agregar un servicio pasó de tomar casi un día a unos minutos.

Un consejo aprendido a golpes: no saques un módulo de algo que usaste una sola vez. Espera a haberlo escrito dos veces y saber de verdad qué partes cambian.

## Que los cambios en producción den menos miedo

Aplicar cambios en producción todavía me pone un poco nervioso, así que el flujo es aburrido a propósito. Primero, un plan guardado:

\`\`\`bash
terraform plan -out=tfplan
\`\`\`

El plan muestra exactamente qué se va a crear (+), modificar (~) o destruir (-). Lo leo siempre, y los destroy los leo dos veces: renombrar un recurso puede significar, sin avisar mucho, "borra la base de datos y crea una nueva". Después aplico ese mismo plan guardado, para que se ejecute exactamente lo que revisé:

\`\`\`bash
terraform apply tfplan
\`\`\`

En CI, \`terraform fmt -check\`, \`terraform validate\` y \`tflint\` corren en cada pull request, y el plan se publica en el PR, así los cambios de infraestructura se revisan como cualquier otro código.

## Empezar pequeño y crecer cuando se justifique

Esta es la costumbre que más plata me ahorró. Para un producto nuevo no arranco con la arquitectura que querría a gran escala. Arranco con lo que necesita el tráfico de hoy y dejo que Terraform haga barato el siguiente paso:

- **MVP:** una instancia, monitoreo básico, escalado a mano. Unos $50 al mes.
- **Crecimiento:** autoscaling, load balancer, mejor monitoreo. Unos $200 al mes.
- **Escala:** Multi-AZ, CDN, caché. Unos $800 al mes, cuando los ingresos lo justifiquen.

\`\`\`hcl
variable "scaling_tier" {
  type    = string
  default = "mvp" # o "growth" o "scale"
}

locals {
  instance_count = {
    mvp    = 1
    growth = 2
    scale  = 5
  }
}

resource "aws_instance" "app" {
  count = local.instance_count[var.scaling_tier]
  # ... configuración
}
\`\`\`

Subir de nivel es cambiar una variable y correr \`apply\`. Como el salto es así de fácil, no siento la tentación de sobredimensionar "por si acaso", que es por donde se va mucha plata en la nube sin que te des cuenta.

## Un caso real

El proyecto que me terminó de convencer fue una plataforma con ocho microservicios, un API Gateway, tres bases de datos, una cola de mensajes y un stack de monitoreo, en tres entornos. Con los módulos y las variables por entorno de arriba, levantar un entorno completo tomaba unas dos horas. La primera vez que lo hicimos a mano nos tomó cerca de dos semanas, y encima no quedó consistente.

Los otros números que medí: alrededor de un 60% menos de costo mensual después de ajustar dev y staging, y servicios nuevos en producción en unos diez minutos. Lo que más valió, igual: cada cambio de infraestructura pasaba por un pull request, así que siempre sabíamos quién cambió qué y por qué.

## Lo que me habría gustado saber antes

**Usa remote state desde el primer día.** S3 para el state y DynamoDB para el bloqueo, así dos personas no pueden aplicar al mismo tiempo:

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
\`\`\`

**Separa el state de cada entorno.** Dev y prod nunca comparten archivo de state.

**Fija las versiones de los módulos.** Una actualización que no pediste es una sorpresa muy fea en medio de un plan:

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"
}
\`\`\`

**No hardcodees.** Si un valor cambia entre entornos, es una variable.

**Cada módulo con su README.** Tú en seis meses, o la siguiente persona del equipo, no se va a acordar de qué hace \`enable_xray\`.

## Si empiezas hoy

No intentes importar toda tu cuenta de una vez. Elige un servicio, escribe su Terraform, levántalo en dev, cópialo a staging y recién ahí pásalo a producción. Cuando te pilles repitiendo código, haz un módulo. Y sigue con el siguiente servicio.

La primera semana es más lento y todas las siguientes mucho más rápido. Y por fin puedes responder "¿qué está corriendo en prod?" abriendo una carpeta en lugar de una pestaña del navegador.
`,
    author: 'Sebastian Alvarez',
    tags: ['Terraform', 'Infraestructura como Código', 'DevOps', 'Cloud', 'AWS', 'Escalado', 'Optimización de Costos']
  }
};
