import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/listerineh', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/listerineh', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/__listerineh', icon: Instagram },
  { name: 'Email', url: 'mailto:sebask8er.alvarez@gmail.com', icon: Mail },
];
