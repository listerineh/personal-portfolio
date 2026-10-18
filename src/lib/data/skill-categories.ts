import type { SkillCategory } from '@/types';

/** Display order of skill categories. Kept apart from the skill list so client code can import it cheaply. */
export const skillCategoryOrder: SkillCategory[] = [
  'languages',
  'frontend',
  'backend',
  'mobile',
  'database',
  'ai',
  'devops',
  'testing',
  'tools',
  'management',
];
