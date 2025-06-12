import type { Experience, Skill, Project, BlogPost, NavItem, Hero } from '@/types';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

export const hero: Hero = {
  href: '/images/sebastian_alvarez_photo.webp',
  title: 'Sebastian Alvarez',
  subtitle: 'Software Engineer & Full-Stack Developer',
  description: 'Passionate about crafting elegant, efficient solutions to real-world problems. I specialize in modern web technologies to build scalable, user-friendly applications across web and mobile platforms.',
}

export const navItems: NavItem[] = [
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export const experiences: Experience[] = [
  {
    company: 'Blue Express',
    logoUrl: '/images/blue_express_s_a_logo.jpeg',
    companyAiHint: 'Blue Express logo',
    jobTitle: 'Senior Fullstack Engineer',
    employmentDates: 'Aug 2024 - Present',
    location: 'Remote',
    responsibilities: [
      'Developed and maintained event-driven microservices architecture for core logistics systems.',
      'Worked across backend, frontend, and mobile platforms to build scalable and efficient solutions.',
      'Implemented infrastructure improvements to support high availability and system reliability.',
      'Led the integration of a native AI model for image recognition to automate and enhance operations.',
      'Collaborated with cross-functional teams to deliver innovative features aligned with business goals.',
    ],
  },
  {
    company: 'Google Developer Groups Quito',
    logoUrl: '/images/gdg_quito_logo.jpeg',
    companyAiHint: 'Google Developer Groups Quito logo',
    jobTitle: 'Organizer | Community Builder | Tech Advocate',
    employmentDates: 'Apr 2023 - Present',
    location: 'Quito, EC',
    responsibilities: [
      'Organized and executed in-person and virtual tech events tailored to community interests.',
      'Fostered an inclusive and welcoming environment to support professional growth and networking.',
      'Moderated virtual sessions to ensure smooth interaction and active participation.',
      'Led community expansion efforts by attracting new members and encouraging active contributions.',
      'Collaborated with team members to align goals and maintain strong internal communication.',
      'Delivered presentations on emerging technologies and industry trends to empower the community.',
    ],
  },
  {
    company: 'IOET',
    logoUrl: '/images/ioet_logo.jpeg',
    companyAiHint: 'IOET logo',
    jobTitle: 'Software Engineer',
    employmentDates: 'Apr 2022 - Jan 2025',
    location: 'Remote',
    responsibilities: [
      'Led development of internal payroll and billing systems to automate financial processes and improve accuracy.',
      'Designed and implemented fullstack web applications with clean, modular architectures and scalable infrastructure.',
      'Created and maintained a shared UI component library to standardize interfaces and accelerate development.',
      'Implemented new features and optimized frontend performance to enhance user experience and engagement.',
      'Developed backend services and automation scripts to streamline workflows and reduce manual effort.',
      'Implemented integration, load, and stress tests to ensure system reliability and performance under scale.',
      'Collaborated with cross-functional teams to align product goals with technical execution and drive efficiency.',
    ],
  },
  {
    company: 'Freelance',
    companyAiHint: 'Freelance logo',
    jobTitle: 'Web Developer',
    employmentDates: 'May 2022 - Oct 2022',
    location: 'Sangolqui, EC',
    responsibilities: [
      'Developed a responsive web application to manage engineering projects for students at Universidad de las Fuerzas Armadas ESPE.',
      'Designed and implemented user-friendly features to streamline project management and resource allocation.',
      'Leveraged fullstack expertise to ensure scalability, performance, and ease of use.',
      'Collaborated closely with stakeholders to align the application with academic needs and enhance the educational experience.',
      'Delivered a comprehensive solution that improved management of vital academic resources for the university community.',
    ],    
  },
  {
    company: 'Prowess EC',
    companyAiHint: 'Prowess EC logo',
    jobTitle: 'Wordpress Development Team Lead',
    employmentDates: 'Jan 2022 - Mar 2022',
    location: 'Remote',
    responsibilities: [
      'Led the development and management of a high-performance e-commerce website using WordPress, WooCommerce, and Dokan.',
      'Orchestrated strategic planning and optimization to enhance site performance and user experience.',
      'Managed a team of developers, ensuring seamless integration of diverse plugins and features.',
      'Focused on delivering a user-friendly, efficient online shopping experience that aligned with business goals.',
      'Collaborated with cross-functional teams to meet and exceed business objectives through continuous platform improvements.',
    ],   
  },
  {
    company: 'Military Applications Research Center (CICTE – ESPE)',
    companyAiHint: 'Military Applications Research Center (CICTE – ESPE) logo',
    jobTitle: 'AI Developer',
    employmentDates: 'Jul 2020 - Dec 2020',
    location: 'Sangolqui, EC',
    responsibilities: [
      'Developed and fine-tuned complex computer vision algorithms using MATLAB for real-time applications.',
      'Integrated AI algorithms with Arduino microcontrollers and servo motors to enable hardware-driven automation.',
      'Pioneered the fusion of AI and hardware to create innovative applications leveraging computer vision for real-world interactions.',
      'Collaborated across disciplines to deliver solutions that combined artificial intelligence with hardware components.',
      'Achieved seamless integration of software and hardware to drive automation and enhance operational efficiency.',
    ],    
  },
];

export const skills: Skill[] = [
  { name: 'JavaScript', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: 'TypeScript', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: 'React', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: 'Next.js', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
  { name: 'Flutter', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
  { name: 'Tailwind CSS', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
  { name: 'Material UI', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" },
  { name: 'Node.js', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: 'Python', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: 'Flask', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" },
  { name: 'FastAPI', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" },
  { name: 'Go', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" },
  { name: 'OpenCV', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg" },
  { name: 'Tensorflow', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
  { name: 'PostgreSQL', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
  { name: 'MongoDB', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: 'Firebase', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
  { name: 'Figma', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
  { name: 'Docker', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
  { name: 'Kubernetes', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-original.svg" },
  { name: 'Dart', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg" },
  { name: 'Terraform', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg" },
  { name: 'GitHub', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
  { name: 'Git', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, shopping cart, and payment integration. Built with Next.js, Stripe, and Prisma.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'online store',
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
    tags: ['Next.js', 'Stripe', 'Prisma', 'TypeScript'],
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, user authentication, and project boards. Developed using React, Firebase, and Material UI.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'productivity app',
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
    tags: ['React', 'Firebase', 'Real-time', 'Collaboration'],
  },
  {
    id: 'project-3',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets, featuring various chart types and data filtering options. Built with D3.js and React.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'charts graphs',
    liveDemoUrl: '#',
    tags: ['D3.js', 'React', 'Data Visualization'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-async-javascript',
    title: 'Mastering Asynchronous JavaScript',
    date: 'October 26, 2023',
    excerpt: 'A deep dive into Promises, async/await, and common patterns for handling asynchronous operations in JavaScript.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'code abstract',
    content: `
## Introduction
Asynchronous programming is a cornerstone of modern JavaScript development...

### Callbacks
The traditional way...

### Promises
A more robust solution...

\`\`\`javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    // ...
  });
}
\`\`\`

### Async/Await
Syntactic sugar over Promises...

## Conclusion
Understanding these concepts is crucial...
    `,
    author: 'Sebastian Alvarez',
    tags: ['JavaScript', 'Async', 'Promises', 'Tutorial']
  },
  {
    slug: 'optimizing-nextjs-performance',
    title: 'Optimizing Next.js Application Performance',
    date: 'November 15, 2023',
    excerpt: 'Tips and tricks for boosting the speed and efficiency of your Next.js applications, from code splitting to image optimization.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'website speed',
    content: `
## Why Performance Matters
User experience and SEO are heavily impacted...

### Code Splitting
Next.js does this automatically, but you can optimize further...

### Image Optimization
Using \`next/image\` is key...

### Server-Side Rendering (SSR) vs Static Site Generation (SSG)
Choosing the right rendering strategy...

## Advanced Techniques
Caching, lazy loading components...
    `,
    author: 'Sebastian Alvarez',
    tags: ['Next.js', 'Performance', 'Optimization', 'Web Development']
  },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/listerineh', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/listerineh', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/__listerineh', icon: Instagram },
  { name: 'Email', url: 'mailto:sebask8er.alvarez@gmail.com', icon: Mail },
];
