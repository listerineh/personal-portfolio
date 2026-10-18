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
  companyAiHint?: string; 
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

/** A project as lists and the home page need it: no long-form story. */
export type ProjectSummary = Omit<Project, 'longDescription' | 'relevance'>;

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
