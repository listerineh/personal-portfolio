import type { LucideIcon } from 'lucide-react';

export interface Hero {
  href: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Experience {
  company: string;
  logoUrl?: string;
  jobTitle: string;
  employmentDates: string;
  location?: string; 
  responsibilities: string[];
  /** Client or internal projects within the role, shown as sub-blocks after the responsibilities. */
  projects?: ExperienceProject[];
  /** Key technologies of the role, most relevant first. */
  stack?: string[];
}

export interface ExperienceProject {
  name: string;
  role: string;
  summary: string;
  stack?: string[];
}

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'ai'
  | 'devops'
  | 'testing'
  | 'tools'
  | 'management';

export interface Skill {
  name: string;
  icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  iconUrl?: string;
  category: SkillCategory[];
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  imageAiHint: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  tags: string[];
  role?: string;
  status?: 'completed' | 'in-progress' | 'archived' | 'on-hold';
  relevance?: string;
  startDate?: string;
  endDate?: string;
  /** Three or four measured numbers, e.g. { value: '111 s', label: 'From pull request to proposed fix' }. Only real figures. */
  figures?: ProjectFigure[];
  /** How a request or a piece of data moves through the system, in order. */
  flow?: ProjectFlow;
  /** Engineering choices worth explaining: what was chosen, why, and what it cost. */
  decisions?: ProjectDecision[];
}

export interface ProjectFigure {
  /** As shown, e.g. "~40", "0.13 USD", "3". The leading number counts up. */
  value: string;
  label: string;
}

export type ProjectFlowKind = 'actor' | 'client' | 'service' | 'agent' | 'model' | 'queue' | 'store' | 'output';

export interface ProjectFlowStep {
  label: string;
  /** One short line: the technology or what happens here. */
  detail?: string;
  kind?: ProjectFlowKind;
}

export interface ProjectFlow {
  /** Up to six steps, left to right. */
  steps: ProjectFlowStep[];
  /** What happens when a step sends work back, e.g. "A red test returns to Triage, up to 3 times." */
  loop?: string;
}

export interface ProjectDecision {
  title: string;
  why: string;
  tradeoff: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  imageAiHint?: string;
  content: string; 
  author: string;
  tags: string[];
  readingTime?: number;
}

/** A post without its body: what lists and previews need, cheap to send to the client. */
export type BlogPostSummary = Omit<BlogPost, 'content'> & { readingTime: number };

/** A summary plus the distinct words of its body: enough to search posts without shipping them. */
export type BlogListingPost = BlogPostSummary & { searchText: string };

/** A project as lists and the home page need it: no long-form story. */
export type ProjectSummary = Omit<Project, 'longDescription' | 'relevance' | 'figures' | 'flow' | 'decisions'>;

/** Everything the home page shows for one language, assembled on the server. */
export interface HomeLocaleData {
  projects: ProjectSummary[];
  posts: BlogPostSummary[];
  experiences: Experience[];
}

/** A skill as the home marquee needs it: name, icon and the categories it belongs to. */
export interface SkillIconSummary {
  name: string;
  iconUrl: string;
  categories: SkillCategory[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
