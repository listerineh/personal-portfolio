import type { Locale } from "@/i18n/config";

/** Everything the CV needs beyond the roles themselves (those come from `experiences.ts`, so web and CV never drift). */
export interface CvContent {
  name: string;
  /** Shown centered under the name, separated by dots. */
  contact: { label: string; href?: string }[];
  /** Company whose role is listed under leadership instead of experience. */
  leadershipCompany: string;
  /** May carry tenure tokens ({careerYears}); the CV route fills them. */
  summary: string;
  education: {
    degree: string;
    school: string;
    location: string;
    activities: string[];
  }[];
  certifications: { name: string; issuer: string }[];
  skills: { label: string; items: string[] }[];
  labels: {
    summary: string;
    experience: string;
    leadership: string;
    education: string;
    certifications: string;
    skills: string;
    stack: string;
    activities: string;
    documentTitle: string;
  };
}

const contact: CvContent["contact"] = [
  { label: "Quito, Ecuador" },
  {
    label: "sebask8er.alvarez@gmail.com",
    href: "mailto:sebask8er.alvarez@gmail.com",
  },
  {
    label: "linkedin.com/in/listerineh",
    href: "https://www.linkedin.com/in/listerineh/",
  },
  { label: "listerineh.dev", href: "https://listerineh.dev" },
];

const languages = ["Python", "TypeScript", "JavaScript", "Go", "Dart", "PHP"];
const frameworks = [
  "FastAPI",
  "Django",
  "Next.js",
  "React",
  "Angular",
  "Flutter",
  "Node.js",
  "Tailwind CSS",
];
const cloud = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Terraform",
  "Docker",
  "Kubernetes",
  "GitLab CI",
  "Jenkins",
  "Datadog",
  "New Relic",
];
const data = ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Kafka"];

export const cvData: Record<Locale, CvContent> = {
  en: {
    name: "Sebastian Alvarez",
    contact,
    leadershipCompany: "Google Developer Groups Quito",
    summary:
      "Senior full-stack engineer with {careerYears}+ years building web products, cloud platforms and backend systems, with a focus on applied AI. Currently at SoFi Tech Solutions, working on the APIs behind its financial infrastructure. Experience across AWS, Azure and GCP with Terraform, Docker and Kubernetes, and hands-on work with computer vision, RAG pipelines and agentic development.",
    education: [
      {
        degree: "Software Engineer (Ingeniero de Software)",
        school: "Universidad de las Fuerzas Armadas ESPE",
        location: "Sangolquí, EC",
        activities: [
          "ESPE Software Club member (2018–2022)",
          "CIS – IEEE ESPE Branch member (2018–2019)",
        ],
      },
    ],
    certifications: [
      { name: "Java Programming", issuer: "Oracle" },
      {
        name: "React – La Guía Completa: Hooks, Context, Redux, MERN",
        issuer: "Udemy",
      },
      {
        name: "Introducción a la Visión Artificial con Python",
        issuer: "IEEE Ecuador, INGLIDEX",
      },
    ],
    skills: [
      { label: "Languages", items: languages },
      { label: "Frameworks", items: frameworks },
      { label: "Cloud & DevOps", items: cloud },
      {
        label: "AI & Data",
        items: [
          "Computer vision (YOLO, CNNs)",
          "RAG pipelines",
          "Agentic development",
          ...data,
        ],
      },
      {
        label: "Spoken languages",
        items: ["Spanish (native)", "English (C1)"],
      },
    ],
    labels: {
      summary: "Professional Summary",
      experience: "Experience",
      leadership: "Leadership & Community",
      education: "Education",
      certifications: "Certifications",
      skills: "Skills & Languages",
      stack: "Stack",
      activities: "Activities",
      documentTitle: "Sebastian Alvarez – CV",
    },
  },
  es: {
    name: "Sebastian Alvarez",
    contact,
    leadershipCompany: "Google Developer Groups Quito",
    summary:
      "Ingeniero full-stack senior con más de {careerYears} años construyendo productos web, plataformas cloud y sistemas backend, con foco en IA aplicada. Actualmente en SoFi Tech Solutions, trabajando en las API detrás de su infraestructura financiera. Experiencia en AWS, Azure y GCP con Terraform, Docker y Kubernetes, y trabajo práctico con visión por computadora, pipelines RAG y desarrollo agéntico.",
    education: [
      {
        degree: "Ingeniero de Software",
        school: "Universidad de las Fuerzas Armadas ESPE",
        location: "Sangolquí, EC",
        activities: [
          "Miembro del Club de Software ESPE (2018–2022)",
          "Miembro de la rama CIS – IEEE ESPE (2018–2019)",
        ],
      },
    ],
    certifications: [
      { name: "Java Programming", issuer: "Oracle" },
      {
        name: "React – La Guía Completa: Hooks, Context, Redux, MERN",
        issuer: "Udemy",
      },
      {
        name: "Introducción a la Visión Artificial con Python",
        issuer: "IEEE Ecuador, INGLIDEX",
      },
    ],
    skills: [
      { label: "Lenguajes", items: languages },
      { label: "Frameworks", items: frameworks },
      { label: "Cloud y DevOps", items: cloud },
      {
        label: "IA y datos",
        items: [
          "Visión por computadora (YOLO, CNN)",
          "Pipelines RAG",
          "Desarrollo agéntico",
          ...data,
        ],
      },
      { label: "Idiomas", items: ["Español (nativo)", "Inglés (C1)"] },
    ],
    labels: {
      summary: "Resumen profesional",
      experience: "Experiencia",
      leadership: "Liderazgo y comunidad",
      education: "Educación",
      certifications: "Certificaciones",
      skills: "Habilidades e idiomas",
      stack: "Stack",
      activities: "Actividades",
      documentTitle: "Sebastian Alvarez – CV",
    },
  },
};
