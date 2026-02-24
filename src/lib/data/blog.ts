import type { BlogPost } from '@/types';
import { getBlogPosts, getBlogPost } from './blog/get-blog-posts';

export { getBlogPosts, getBlogPost };

export const blogPosts: BlogPost[] = getBlogPosts('en');
