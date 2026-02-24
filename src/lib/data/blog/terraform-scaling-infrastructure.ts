import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const terraformScalingInfrastructure: Record<Locale, BlogPost> = {
  en: {
    slug: 'terraform-scaling-infrastructure',
    title: 'Terraform: Scaling Infrastructure Without Breaking the Bank',
    date: 'January 14, 2026',
    excerpt: "How Terraform helped me build scalable, cost-effective infrastructure by cloning environments, creating reusable modules, and growing systems gradually from dev to production.",
    imageUrl: '/blog/terraform-scaling-infrastructure.webp',
    imageAiHint: 'terraform infrastructure as code visualization: three parallel cloud environments (dev, staging, production) flowing from left to right, each showing infrastructure components like servers, databases, load balancers; terraform code blocks and git version control symbols; cost optimization graph showing decreasing expenses; professional tech illustration with blue and green colors',
    content: `
## Introduction

When I first started working with cloud infrastructure, deployments felt like walking through a minefield. One wrong click in the AWS console, one misconfigured security group, and suddenly production was down.

Then I discovered **Terraform** — and everything changed.

Terraform isn't just about "infrastructure as code." It's about **building systems that scale intelligently**, environments that clone effortlessly, and infrastructure that grows with your needs instead of your budget.

In this post, I'll share how Terraform transformed the way I build and manage infrastructure: from rapid environment creation to cost optimization, reusable modules, and gradual scaling strategies.

---

## The Problem: Manual Infrastructure is a Nightmare

Before Terraform, setting up a new environment meant:

- Clicking through cloud consoles for hours
- Copy-pasting configurations and hoping nothing broke
- Inconsistencies between dev, staging, and production
- No version control for infrastructure changes
- Fear of touching anything in production

**The result?** Slow deployments, expensive mistakes, and infrastructure that was impossible to replicate.

---

## The Solution: Infrastructure as Code

Terraform changed the game by treating infrastructure the same way we treat application code:

- **Version controlled** — every change is tracked in Git
- **Reproducible** — spin up identical environments with one command
- **Testable** — validate changes before applying them
- **Collaborative** — teams can review infrastructure changes like code reviews

But the real power comes from how you **architect** your Terraform setup.

---

## Environment Cloning: Dev → Staging → Production

One of the biggest wins with Terraform is how easy it becomes to clone environments.

### The Strategy

**1. Start with Dev**

Build your infrastructure in a development environment first:
- Minimal resources (smaller instances, lower limits)
- Fast iteration
- Safe to break

**2. Clone to Staging**

Once dev is stable, clone it to staging:

\`\`\`hcl
# Simply change the environment variable
terraform workspace select staging
terraform apply
\`\`\`

Same architecture, different namespace. Perfect for testing deployments.

**3. Enhance for Production**

Clone staging to production, but with upgrades:
- Larger instances
- Auto-scaling enabled
- Enhanced monitoring
- Stricter security rules
- Multi-AZ redundancy

### The Beauty of This Approach

You're not maintaining three separate infrastructures — you're maintaining **one codebase with environment-specific variables**.

Changes flow naturally: Dev → Staging → Production, with confidence at each step.

---

## Resource Versioning: Right-Sized for Each Environment

Not every environment needs production-grade resources. Terraform makes it easy to scale resources based on the environment.

### Example: Database Sizing

\`\`\`hcl
variable "db_instance_class" {
  type = map(string)
  default = {
    dev        = "db.t3.micro"    # Cheap, minimal
    staging    = "db.t3.small"    # Mid-tier
    production = "db.r5.large"    # High performance
  }
}

resource "aws_db_instance" "main" {
  instance_class = var.db_instance_class[var.environment]
  # ... other config
}
\`\`\`

### Why This Matters

- **Dev** runs on cheap resources → saves money during development
- **Staging** mirrors production architecture but at lower scale
- **Production** gets the performance it needs

This approach saved me **thousands of dollars** by not over-provisioning dev and staging.

---

## Complete Infrastructure Configuration

Terraform isn't just for compute instances. I use it to configure **everything**:

### Microservices Architecture
- Container orchestration (ECS, Kubernetes)
- Service discovery
- Load balancers
- Auto-scaling groups

### API Gateways
- Route configurations
- Request/response transformations
- CORS policies
- Custom domain mappings

### Security
- Security groups and firewall rules
- IAM roles and policies
- Secrets management
- VPC configurations

### Traffic Management
- Rate limiting
- Throttling policies
- WAF rules
- DDoS protection

### Domains & DNS
- Route53 configurations
- SSL/TLS certificates
- CDN distributions

### Redundancy
- Multi-AZ deployments
- Failover configurations
- Backup policies

**Everything in code. Everything versioned. Everything reproducible.**

---

## Reusable Modules: The Real Power Move

After building a few environments, patterns emerge. That's where **Terraform modules** shine.

### Example: Microservice Module

\`\`\`hcl
module "user_service" {
  source = "./modules/microservice"
  
  service_name     = "user-service"
  environment      = var.environment
  container_image  = "myapp/user-service:latest"
  cpu              = var.environment == "production" ? 1024 : 256
  memory           = var.environment == "production" ? 2048 : 512
  
  enable_autoscaling = var.environment == "production"
  min_instances      = var.environment == "production" ? 2 : 1
  max_instances      = var.environment == "production" ? 10 : 2
}
\`\`\`

### Benefits

- **DRY principle** — write once, use everywhere
- **Consistency** — every microservice follows the same pattern
- **Rapid deployment** — spin up new services in minutes
- **Centralized updates** — fix a bug in the module, all services benefit

I built modules for:
- Microservices (ECS/Fargate)
- Databases (RDS, DynamoDB)
- API Gateways
- Monitoring & Logging
- Networking (VPC, Subnets, NAT)

Now deploying a new microservice takes **5 minutes instead of 5 hours**.

---

## Testing Infrastructure Changes

One of the scariest parts of infrastructure work is applying changes to production. Terraform makes this safer.

### The Workflow

**1. Plan Before Apply**

\`\`\`bash
terraform plan -out=tfplan
\`\`\`

See exactly what will change before it happens.

**2. Review Changes**

Terraform shows you:
- Resources to be created (green +)
- Resources to be modified (yellow ~)
- Resources to be destroyed (red -)

**3. Apply with Confidence**

\`\`\`bash
terraform apply tfplan
\`\`\`

**4. Automated Testing**

I use \`terraform validate\` and \`tflint\` in CI/CD to catch errors before they reach production.

---

## Gradual Scaling: Start Small, Grow Smart

Here's the strategy that saved me the most money: **start small and scale gradually**.

### The Approach

**Phase 1: MVP (Minimal Viable Production)**
- Single instance
- Basic monitoring
- Manual scaling
- Cost: ~$50/month

**Phase 2: Growth (When Traffic Increases)**
- Auto-scaling enabled
- Load balancer added
- Enhanced monitoring
- Cost: ~$200/month

**Phase 3: Scale (When Revenue Justifies It)**
- Multi-AZ deployment
- CDN integration
- Advanced caching
- Cost: ~$800/month

### How Terraform Enables This

\`\`\`hcl
variable "scaling_tier" {
  type    = string
  default = "mvp"  # or "growth" or "scale"
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

Change one variable, run \`terraform apply\`, and your infrastructure scales.

**No over-provisioning. No wasted money. Just right-sized infrastructure.**

---

## Real-World Example: Microservices Platform

Let me share a real project where Terraform transformed our workflow.

### The Challenge

Build a microservices platform with:
- 8 microservices
- API Gateway
- 3 databases
- Message queue
- Monitoring stack
- 3 environments (dev, staging, prod)

### The Terraform Solution

**1. Created Reusable Modules**
- \`modules/microservice\`
- \`modules/database\`
- \`modules/api-gateway\`
- \`modules/monitoring\`

**2. Environment-Specific Variables**
- \`environments/dev/terraform.tfvars\`
- \`environments/staging/terraform.tfvars\`
- \`environments/prod/terraform.tfvars\`

**3. One Command Deployment**

\`\`\`bash
cd environments/dev
terraform apply
\`\`\`

### The Results

- **Setup time**: 2 hours (vs. 2 weeks manually)
- **Consistency**: 100% identical across environments
- **Cost savings**: 60% reduction by right-sizing resources
- **Deployment speed**: New microservice in 10 minutes
- **Confidence**: Every change reviewed and tested

---

## Best Practices I Learned

### 1. Use Remote State

Store Terraform state in S3 with DynamoDB locking:

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

### 2. Separate Environments

Don't mix dev and prod in the same state file. Use workspaces or separate directories.

### 3. Version Your Modules

Pin module versions to avoid breaking changes:

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.0"
}
\`\`\`

### 4. Use Variables for Everything

Never hardcode values. Everything should be configurable.

### 5. Document Your Modules

Good documentation makes modules reusable across teams.

---

## Conclusion

Terraform isn't just a tool — it's a **mindset shift** in how you approach infrastructure.

Instead of clicking through consoles and hoping for the best, you:
- **Write code** that defines your infrastructure
- **Version control** every change
- **Test** before applying
- **Scale gradually** as needs grow
- **Reuse modules** to move faster

The result? Infrastructure that's:
- ✅ Reproducible
- ✅ Scalable
- ✅ Cost-effective
- ✅ Testable
- ✅ Collaborative

If you're still managing infrastructure manually, you're leaving money and time on the table.

**Start small:**
1. Pick one service
2. Write Terraform for it
3. Clone it to staging
4. Refine and promote to production
5. Extract patterns into modules
6. Repeat

Before you know it, you'll have infrastructure that scales with your business, not your budget.

Infrastructure as code isn't the future — it's the present. And Terraform makes it accessible.
`,
    author: 'Sebastian Alvarez',
    tags: ['Terraform', 'Infrastructure as Code', 'DevOps', 'Cloud', 'AWS', 'Scaling', 'Cost Optimization']
  },
  es: {
    slug: 'terraform-scaling-infrastructure',
    title: 'Terraform: Escalando Infraestructura Sin Romper el Banco',
    date: 'January 14, 2026',
    excerpt: "Cómo Terraform me ayudó a construir infraestructura escalable y rentable clonando entornos, creando módulos reutilizables y haciendo crecer sistemas gradualmente desde desarrollo hasta producción.",
    imageUrl: '/blog/terraform-scaling-infrastructure.webp',
    imageAiHint: 'visualización de terraform infraestructura como código: tres entornos cloud paralelos (dev, staging, producción) fluyendo de izquierda a derecha, cada uno mostrando componentes de infraestructura como servidores, bases de datos, balanceadores de carga; bloques de código terraform y símbolos de control de versiones git; gráfico de optimización de costos mostrando gastos decrecientes; ilustración técnica profesional con colores azul y verde',
    content: `
## Introducción

Cuando comencé a trabajar con infraestructura en la nube, los despliegues se sentían como caminar por un campo minado. Un clic equivocado en la consola de AWS, un grupo de seguridad mal configurado, y de repente producción estaba caída.

Entonces descubrí **Terraform** — y todo cambió.

Terraform no se trata solo de "infraestructura como código". Se trata de **construir sistemas que escalan inteligentemente**, entornos que se clonan sin esfuerzo, e infraestructura que crece con tus necesidades en lugar de con tu presupuesto.

En este post, compartiré cómo Terraform transformó la forma en que construyo y gestiono infraestructura: desde la creación rápida de entornos hasta la optimización de costos, módulos reutilizables y estrategias de escalado gradual.

---

## El Problema: La Infraestructura Manual es una Pesadilla

Antes de Terraform, configurar un nuevo entorno significaba:

- Hacer clic en consolas cloud durante horas
- Copiar y pegar configuraciones esperando que nada se rompiera
- Inconsistencias entre dev, staging y producción
- Sin control de versiones para cambios de infraestructura
- Miedo de tocar cualquier cosa en producción

**¿El resultado?** Despliegues lentos, errores costosos e infraestructura imposible de replicar.

---

## La Solución: Infraestructura como Código

Terraform cambió el juego al tratar la infraestructura de la misma manera que tratamos el código de aplicación:

- **Control de versiones** — cada cambio se rastrea en Git
- **Reproducible** — crea entornos idénticos con un comando
- **Testeable** — valida cambios antes de aplicarlos
- **Colaborativo** — los equipos pueden revisar cambios de infraestructura como revisiones de código

Pero el verdadero poder viene de cómo **arquitecturas** tu configuración de Terraform.

---

## Clonación de Entornos: Dev → Staging → Producción

Una de las mayores ventajas con Terraform es lo fácil que se vuelve clonar entornos.

### La Estrategia

**1. Comienza con Dev**

Construye tu infraestructura en un entorno de desarrollo primero:
- Recursos mínimos (instancias más pequeñas, límites más bajos)
- Iteración rápida
- Seguro para romper

**2. Clona a Staging**

Una vez que dev es estable, clónalo a staging:

\`\`\`hcl
# Simplemente cambia la variable de entorno
terraform workspace select staging
terraform apply
\`\`\`

Misma arquitectura, diferente namespace. Perfecto para probar despliegues.

**3. Mejora para Producción**

Clona staging a producción, pero con mejoras:
- Instancias más grandes
- Auto-escalado habilitado
- Monitoreo mejorado
- Reglas de seguridad más estrictas
- Redundancia multi-AZ

### La Belleza de Este Enfoque

No estás manteniendo tres infraestructuras separadas — estás manteniendo **un código base con variables específicas por entorno**.

Los cambios fluyen naturalmente: Dev → Staging → Producción, con confianza en cada paso.

---

## Versionado de Recursos: Tamaño Adecuado para Cada Entorno

No todos los entornos necesitan recursos de grado producción. Terraform facilita escalar recursos según el entorno.

### Ejemplo: Dimensionamiento de Base de Datos

\`\`\`hcl
variable "db_instance_class" {
  type = map(string)
  default = {
    dev        = "db.t3.micro"    # Económico, mínimo
    staging    = "db.t3.small"    # Nivel medio
    production = "db.r5.large"    # Alto rendimiento
  }
}

resource "aws_db_instance" "main" {
  instance_class = var.db_instance_class[var.environment]
  # ... otra configuración
}
\`\`\`

### Por Qué Esto Importa

- **Dev** corre en recursos económicos → ahorra dinero durante el desarrollo
- **Staging** refleja la arquitectura de producción pero a menor escala
- **Producción** obtiene el rendimiento que necesita

Este enfoque me ahorró **miles de dólares** al no sobre-aprovisionar dev y staging.

---

## Configuración Completa de Infraestructura

Terraform no es solo para instancias de cómputo. Lo uso para configurar **todo**:

### Arquitectura de Microservicios
- Orquestación de contenedores (ECS, Kubernetes)
- Descubrimiento de servicios
- Balanceadores de carga
- Grupos de auto-escalado

### API Gateways
- Configuraciones de rutas
- Transformaciones de request/response
- Políticas CORS
- Mapeos de dominios personalizados

### Seguridad
- Grupos de seguridad y reglas de firewall
- Roles y políticas IAM
- Gestión de secretos
- Configuraciones VPC

### Gestión de Tráfico
- Limitación de tasa
- Políticas de throttling
- Reglas WAF
- Protección DDoS

### Dominios y DNS
- Configuraciones Route53
- Certificados SSL/TLS
- Distribuciones CDN

### Redundancia
- Despliegues multi-AZ
- Configuraciones de failover
- Políticas de respaldo

**Todo en código. Todo versionado. Todo reproducible.**

---

## Módulos Reutilizables: El Verdadero Poder

Después de construir algunos entornos, emergen patrones. Ahí es donde los **módulos de Terraform** brillan.

### Ejemplo: Módulo de Microservicio

\`\`\`hcl
module "user_service" {
  source = "./modules/microservice"
  
  service_name     = "user-service"
  environment      = var.environment
  container_image  = "myapp/user-service:latest"
  cpu              = var.environment == "production" ? 1024 : 256
  memory           = var.environment == "production" ? 2048 : 512
  
  enable_autoscaling = var.environment == "production"
  min_instances      = var.environment == "production" ? 2 : 1
  max_instances      = var.environment == "production" ? 10 : 2
}
\`\`\`

### Beneficios

- **Principio DRY** — escribe una vez, usa en todas partes
- **Consistencia** — cada microservicio sigue el mismo patrón
- **Despliegue rápido** — levanta nuevos servicios en minutos
- **Actualizaciones centralizadas** — corrige un bug en el módulo, todos los servicios se benefician

Construí módulos para:
- Microservicios (ECS/Fargate)
- Bases de datos (RDS, DynamoDB)
- API Gateways
- Monitoreo y Logging
- Redes (VPC, Subnets, NAT)

Ahora desplegar un nuevo microservicio toma **5 minutos en lugar de 5 horas**.

---

## Probando Cambios de Infraestructura

Una de las partes más aterradoras del trabajo de infraestructura es aplicar cambios a producción. Terraform hace esto más seguro.

### El Flujo de Trabajo

**1. Planifica Antes de Aplicar**

\`\`\`bash
terraform plan -out=tfplan
\`\`\`

Ve exactamente qué cambiará antes de que suceda.

**2. Revisa los Cambios**

Terraform te muestra:
- Recursos a crear (verde +)
- Recursos a modificar (amarillo ~)
- Recursos a destruir (rojo -)

**3. Aplica con Confianza**

\`\`\`bash
terraform apply tfplan
\`\`\`

**4. Pruebas Automatizadas**

Uso \`terraform validate\` y \`tflint\` en CI/CD para detectar errores antes de que lleguen a producción.

---

## Escalado Gradual: Comienza Pequeño, Crece Inteligentemente

Esta es la estrategia que me ahorró más dinero: **comienza pequeño y escala gradualmente**.

### El Enfoque

**Fase 1: MVP (Producción Mínima Viable)**
- Instancia única
- Monitoreo básico
- Escalado manual
- Costo: ~$50/mes

**Fase 2: Crecimiento (Cuando el Tráfico Aumenta)**
- Auto-escalado habilitado
- Balanceador de carga agregado
- Monitoreo mejorado
- Costo: ~$200/mes

**Fase 3: Escala (Cuando los Ingresos lo Justifican)**
- Despliegue multi-AZ
- Integración CDN
- Caché avanzado
- Costo: ~$800/mes

### Cómo Terraform Habilita Esto

\`\`\`hcl
variable "scaling_tier" {
  type    = string
  default = "mvp"  # o "growth" o "scale"
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

Cambia una variable, ejecuta \`terraform apply\`, y tu infraestructura escala.

**Sin sobre-aprovisionamiento. Sin dinero desperdiciado. Solo infraestructura del tamaño justo.**

---

## Ejemplo del Mundo Real: Plataforma de Microservicios

Déjame compartir un proyecto real donde Terraform transformó nuestro flujo de trabajo.

### El Desafío

Construir una plataforma de microservicios con:
- 8 microservicios
- API Gateway
- 3 bases de datos
- Cola de mensajes
- Stack de monitoreo
- 3 entornos (dev, staging, prod)

### La Solución Terraform

**1. Creé Módulos Reutilizables**
- \`modules/microservice\`
- \`modules/database\`
- \`modules/api-gateway\`
- \`modules/monitoring\`

**2. Variables Específicas por Entorno**
- \`environments/dev/terraform.tfvars\`
- \`environments/staging/terraform.tfvars\`
- \`environments/prod/terraform.tfvars\`

**3. Despliegue con Un Comando**

\`\`\`bash
cd environments/dev
terraform apply
\`\`\`

### Los Resultados

- **Tiempo de configuración**: 2 horas (vs. 2 semanas manualmente)
- **Consistencia**: 100% idéntico entre entornos
- **Ahorro de costos**: 60% de reducción al dimensionar recursos correctamente
- **Velocidad de despliegue**: Nuevo microservicio en 10 minutos
- **Confianza**: Cada cambio revisado y probado

---

## Mejores Prácticas que Aprendí

### 1. Usa Estado Remoto

Almacena el estado de Terraform en S3 con bloqueo DynamoDB:

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

### 2. Separa los Entornos

No mezcles dev y prod en el mismo archivo de estado. Usa workspaces o directorios separados.

### 3. Versiona tus Módulos

Fija versiones de módulos para evitar cambios que rompan:

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.0"
}
\`\`\`

### 4. Usa Variables para Todo

Nunca hardcodees valores. Todo debe ser configurable.

### 5. Documenta tus Módulos

Buena documentación hace que los módulos sean reutilizables entre equipos.

---

## Conclusión

Terraform no es solo una herramienta — es un **cambio de mentalidad** en cómo abordas la infraestructura.

En lugar de hacer clic en consolas y esperar lo mejor, tú:
- **Escribes código** que define tu infraestructura
- **Controlas versiones** de cada cambio
- **Pruebas** antes de aplicar
- **Escalas gradualmente** a medida que crecen las necesidades
- **Reutilizas módulos** para moverte más rápido

¿El resultado? Infraestructura que es:
- ✅ Reproducible
- ✅ Escalable
- ✅ Rentable
- ✅ Testeable
- ✅ Colaborativa

Si todavía estás gestionando infraestructura manualmente, estás dejando dinero y tiempo sobre la mesa.

**Comienza pequeño:**
1. Elige un servicio
2. Escribe Terraform para él
3. Clónalo a staging
4. Refina y promueve a producción
5. Extrae patrones en módulos
6. Repite

Antes de que te des cuenta, tendrás infraestructura que escala con tu negocio, no con tu presupuesto.

La infraestructura como código no es el futuro — es el presente. Y Terraform la hace accesible.
`,
    author: 'Sebastian Alvarez',
    tags: ['Terraform', 'Infraestructura como Código', 'DevOps', 'Cloud', 'AWS', 'Escalado', 'Optimización de Costos']
  }
};
