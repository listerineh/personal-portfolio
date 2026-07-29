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

export interface Skill {
  name: string;
  icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  iconUrl?: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
