import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import type { Experience, Skill, Project, BlogPost, NavItem, Hero } from '@/types';

export const hero: Hero = {
  href: '/images/sebastian_alvarez_photo.webp',
  title: 'Sebastian Alvarez',
  subtitle: 'Software Engineer & Full-Stack Developer',
  description: 'Passionate about crafting elegant, efficient solutions to real-world problems. I specialize in modern web technologies to build scalable, user-friendly applications across web and mobile platforms.',
}

export const navItems: NavItem[] = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
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
  { name: 'Amazon Web Services', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: 'Angular', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg" },
  { name: 'Airflow', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/apacheairflow/apacheairflow-original.svg" },
  { name: 'Kafka', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/apachekafka/apachekafka-original.svg" },
  { name: 'Astro', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg" },
  { name: 'Cloudflare', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cloudflare/cloudflare-original.svg" },
  { name: 'CSS', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
  { name: 'Github Actions', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/githubactions/githubactions-original.svg" },
  { name: 'Graphql', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg" },
  { name: 'HTML', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
  { name: 'Java', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
  { name: 'Jira', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg" },
  { name: 'Keras', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original.svg" },
  { name: 'Node', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: 'Playwright', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/playwright/playwright-original.svg" },
  { name: 'Postman', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg" },
  { name: 'Pytest', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytest/pytest-original.svg" },
  { name: 'Redis', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" },
  { name: 'Redux', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" },
  { name: 'Storybook', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/storybook/storybook-original.svg" },
  { name: 'Supabase', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" },
  { name: 'Vercel', iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg" },
];

export const projects: Project[] = [
  {
    id: 'build-with-ai',
    title: 'Build with AI website',
    description: "Collaboration on the GDG Ecuador initiative to dynamically showcase all details of the Build with AI 2025 event, speakers, schedules, sponsors and internationalization. The site was developed collaboratively.",
    imageUrl: '/projects/build-with-ai-web.webp',
    imageAiHint: 'Build with AI website',
    liveDemoUrl: 'https://www.gdgecuador.com/',
    tags: ['Next.js', 'React.js', 'Tailwind', 'TypeScript', 'Vercel', 'i18n'],
  },
  {
    id: 'open-kanban-board',
    title: 'OpenKanban Board',
    description: "Effortlessly manage your projects with this free Kanban Board. Create, edit, and delete projects, and organize tasks by adding, moving, or removing them — all stored locally using your browser's localStorage.",
    imageUrl: '/projects/open-kanban-board.webp',
    imageAiHint: 'OpenKanban board',
    liveDemoUrl: 'https://open-kanban.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/open-kanban-board',
    tags: ['Next.js', 'React.js', 'Tailwind', 'TypeScript', 'LocalStorage', 'Vercel'],
  },
  {
    id: 'classroom-management-app',
    title: 'Classroom Management',
    description: 'Easily manage your classes and students with this intuitive app. Create, edit, and delete classes and student profiles, and assign or remove points as rewards for participation — all seamlessly powered by a Firebase database.',
    imageUrl: '/projects/classroom-management-app.webp',
    imageAiHint: 'Classroom management app',
    liveDemoUrl: 'https://classmanageroom.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/classroom-management',
    tags: ['React.js', 'Tailwind', 'TypeScript', 'Vite', 'Firebase', 'Firestore', 'Vercel'],
  },
  {
    id: 'tennis-duel-app',
    title: 'AI Tennis Duel',
    description: 'Select two famous tennis players and get an AI-powered prediction of the winner using Google Genkit. The app is built with Firebase Studio for a smooth and modern experience.',
    imageUrl: '/projects/tennis-duel-app.webp',
    imageAiHint: 'Tennis duel app',
    liveDemoUrl: 'https://tennis-duel.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/tennis-duel',
    tags: ['Next.js', 'React.js', 'Tailwind', 'Vercel', 'GenAI', 'RadixUI', 'Firebase Studio'],
  },
  {
    id: 'joback-method-app',
    title: 'Joback Method',
    description: 'Generates chemical compounds to efficiently estimate the constant-pressure heat capacity of a gaseous substance across specified temperature ranges. Developed with vanilla JS and simple CSS.',
    imageUrl: '/projects/joback-method-web.webp',
    imageAiHint: 'Joback Method app',
    liveDemoUrl: 'https://joback-method.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/joback-method-application',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'Vercel', 'Chemistry', 'Vanilla.js'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-markdown-for-blogs',
    title: 'Is Markdown the Best Format for Blogs?',
    date: 'June 15, 2025',
    excerpt: 'Explore why Markdown is a powerful and flexible format for blog content — from developer ergonomics to performance and long-term maintainability.',
    imageUrl: '/blog/markdown-basics.webp',
    imageAiHint: 'markdown file, minimal blog, developer writing',
    content: `
## Introduction

When building a developer blog, choosing how to store and write your content matters as much as how you display it. After experimenting with JSON, WYSIWYG editors, and headless CMSes, I found Markdown to be the cleanest, most scalable solution.

In this post, I'll explain **why I use Markdown to structure my blog content**, how it's stored, how it's dynamically rendered in the frontend — and why Markdown solves problems that plain JSON couldn’t.

---

## Why I Store Blog Posts in Markdown

Here’s why Markdown is my go-to format:

### 1. 🧠 Simple, Human-Readable Syntax

Markdown feels natural to write. Headers, lists, code blocks, and links are quick to type, with zero friction. It's like writing an email with formatting superpowers — no UI lag, no weird HTML artifacts.

### 2. 🧱 Easy to Store, Version, and Track

Each post in my blog is stored as a simple JavaScript object that includes a Markdown \`content\` field. This means I can:

- Store content in Git (like code)
- Track changes over time
- Use pull requests for content reviews
- Move fast without external tooling

### 3. 🔄 Dynamic and Flexible Rendering

One major pain point I faced early on was using raw JSON to structure post content. That meant manually defining paragraphs, code blocks, and titles like this:

\`\`\`json
[
  { "type": "h2", "text": "Introduction" },
  { "type": "p", "text": "This post will cover..." },
  { "type": "code", "language": "js", "text": "const x = 42;" }
]
\`\`\`

This quickly became **messy and hard to scale**. Every post had a slightly different structure, and I found myself writing a custom renderer to deal with all the variations. Markdown solved that instantly.

With Markdown, I can write naturally and let a parser like \`marked\` or \`remark\` handle the conversion to HTML, cleanly and consistently.

### 4. ✍️ Developer-First Writing Experience
  
Since my entire blog is code-based, it makes sense that writing should happen in code too. I can write a new blog post in my code editor, commit it with Git, and deploy. No extra UIs or plugins needed.

---

## How I Use It in My Blog

Here’s what a blog post structure looks like in my setup:

\`\`\`ts
{
  slug: 'mastering-async-javascript',
  title: 'Mastering Asynchronous JavaScript',
  date: 'October 26, 2023',
  excerpt: 'A deep dive into Promises, async/await...',
  content: \`## Introduction\\nAsynchronous programming is...\`,
  author: 'Sebastian Alvarez',
  tags: ['JavaScript', 'Async']
}
\`\`\`

The \`content\` is raw Markdown. In the frontend, I convert it using \`marked\`:

\`\`\`tsx
<div
  className="prose dark:prose-invert max-w-none"
  dangerouslySetInnerHTML={{ __html: marked(post.content) }}
/>
\`\`\`

This gives me the freedom of Markdown plus full control of rendering.

---

## Styling with Tailwind (Secondary but Nice)

To make the Markdown look good, I use Tailwind’s \`@tailwindcss/typography\` plugin. It gives me a \`prose\` class that adds consistent styles to elements like \`<h1>\`, \`<p>\`, \`<pre>\`, and more.

Tailwind's utility-based customization lets me tweak the style without touching the HTML. For example:

\`\`\`css
prose-headings:text-primary
prose-a:text-accent hover:prose-a:text-primary
prose-code:font-code
prose-pre:bg-muted
\`\`\`

This means I don’t have to worry about content authors messing up the layout — Markdown handles structure, and Tailwind handles appearance.

---

## Conclusion

Markdown hits the sweet spot for blogging as a developer:

- **Fast to write**
- **Easy to maintain**
- **Dynamic to render**
- **Portable across tech stacks**
- **Perfect for Git-based workflows**

If you're building a blog or dev-focused site, consider Markdown as your foundation — and let styling be a second step, not the first problem to solve.
`,
    author: 'Sebastian Alvarez',
    tags: ['Markdown', 'Blog', 'Content Strategy', 'Developer Tools', 'Developer Experience']
  },  
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/listerineh', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/listerineh', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/__listerineh', icon: Instagram },
  { name: 'Email', url: 'mailto:sebask8er.alvarez@gmail.com', icon: Mail },
];
