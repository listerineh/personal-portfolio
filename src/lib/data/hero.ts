import type { Hero } from '@/types';

export const hero: Hero = {
  href: '/images/sebastian_alvarez_photo.webp',
  title: 'Sebastian Alvarez',
  subtitle: 'Senior Software Engineer & Full-Stack Developer',
  description: 'Specialized in cloud infrastructure, backend architecture, and modern frontend development. I design and build scalable, high-performance applications leveraging cloud-native technologies and best practices across the full stack.',
};

export const heroBadge = '+5 Years Experience';

export const heroButtons = {
  downloadCv: {
    text: 'Download CV',
    fileName: 'CV_SebastianAlvarez_EN.pdf',
    filePath: '/docs/CV_SebastianAlvarez_FS_EN.pdf',
    toastTitle: 'CV Downloaded!',
    toastDescription: 'Thank you for downloading my CV. I hope you find it useful.',
  },
  getInTouch: {
    text: 'Get in Touch',
    href: '#contact',
  },
};
