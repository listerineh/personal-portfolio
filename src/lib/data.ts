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
    company: 'Uwigo/Informat',
    logoUrl: '/images/Informat_s_a_logo.jpeg',
    companyAiHint: 'Uwigo/Informat logo',
    jobTitle: 'Senior Fullstack Engineer',
    employmentDates: 'Aug 2025 - Present',
    location: 'Remote',
    responsibilities: [
      'Developed a dynamic and incremental Azure-based infrastructure, enhancing system scalability and reliability.',
      'Designed and implemented a comprehensive authentication and authorization microservice utilized across the company.',
      'Standardized API response formats, improving consistency and efficiency in inter-departmental communications.',
      'Documented process enhancements, contributing to a culture of continuous improvement within the organization.',
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
    company: 'Blue Express',
    logoUrl: '/images/blue_express_s_a_logo.jpeg',
    companyAiHint: 'Blue Express logo',
    jobTitle: 'Senior Fullstack Engineer',
    employmentDates: 'Aug 2024 - Aug 2025',
    location: 'Remote',
    responsibilities: [
      'Developed and maintained a robust event-driven microservices architecture for BlueExpress, enhancing system scalability.',
      'Spearheaded the integration of a native AI model for image recognition, driving innovation in logistics solutions.',
      'Collaborated across backend, frontend, mobile, and infrastructure teams to deliver efficient and effective systems.',
      'Leveraged modern technologies to improve operational efficiency, resulting in significant cost savings.',
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
    description: "This collaborative GDG Ecuador project is a dynamic hub for the Build with AI 2025 event. It comprehensively showcases speakers, schedules, sponsors, and internationalization efforts, providing attendees with all essential details.",
    imageUrl: '/projects/build-with-ai-web.webp',
    imageAiHint: 'Build with AI website',
    liveDemoUrl: 'https://www.gdgecuador.com/',
    tags: ['Next.js', 'React.js', 'Tailwind', 'TypeScript', 'Vercel', 'i18n'],
  },
  {
    id: 'open-kanban-board',
    title: 'OpenKanban Board',
    description: "Effortlessly manage your projects with this Open Source Kanban Board. Create, edit, and delete projects, and organize tasks by adding, moving, or removing them — all stored on Firebase Firestore and synchronized in real-time across all devices.",
    imageUrl: '/projects/open-kanban-board.webp',
    imageAiHint: 'OpenKanban board',
    liveDemoUrl: 'https://open-kanban.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/open-kanban-board',
    tags: ['Next.js', 'React.js', 'Tailwind', 'TypeScript', 'PWA', 'Firebase', 'Firestore', 'Vercel'],
  },
  {
    id: 'cadenza-app',
    title: 'Cadenza App',
    description: 'Discover a world of musical possibilities with our free, interactive tool suite, designed by musicians to empower your creativity. Easily explore new sounds, identify elements within your favorite tracks, and bring your unique musical ideas to life.',
    imageUrl: '/projects/cadenza-app.webp',
    imageAiHint: 'Cadenza app',
    liveDemoUrl: 'https://cadenza-app.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/cadenza-app',
    tags: ['Next.js', 'React.js', 'Tailwind', 'Vercel', 'RadixUI'],
  },
  {
    id: 'pay-plan-app',
    title: 'PayPlan App',
    description: "Easily track and manage shared expenses with friends, family, colleagues or individually. Get instant clarity with easy-to-understand graphs and reports that visualize your financial situation, helping you make smarter decisions and achieve your financial goals effortlessly.",
    imageUrl: '/projects/pay-plan-app.webp',
    imageAiHint: 'PayPlan App',
    liveDemoUrl: 'https://payplay-app.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/payplan-app',
    tags: ['Next.js', 'React.js', 'Tailwind', 'TypeScript', 'Firebase', 'Firestore', 'Vercel'],
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
    id: 'joback-method-app',
    title: 'Joback Method',
    description: 'Efficiently estimate the constant-pressure heat capacity of gaseous substances across specified temperature ranges with our web tool. It generates chemical compounds to streamline your calculations.',
    imageUrl: '/projects/joback-method-web.webp',
    imageAiHint: 'Joback Method app',
    liveDemoUrl: 'https://joback-method.vercel.app/',
    sourceCodeUrl: 'https://github.com/listerineh/joback-method-application',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'Vercel', 'Chemistry', 'Vanilla.js'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'lets-talk-microservices',
    title: 'Let’s Talk Microservices: Lessons Learned in the Real World',
    date: 'September 1, 2025',
    excerpt: 'Microservices can be powerful, but they’re not always the right tool. Using a banking system as an example, let’s explore when they shine, when they fail, and how to design them responsibly.',
    imageUrl: '/blog/lets-talk-microservices.webp',
    imageAiHint: 'distributed banking system diagram, docker containers, api gateway, cloud infrastructure, modern microservices architecture',
    content: `

  ## Introduction

  In my career as a software engineer, I’ve had the chance to work with very different architectures. I’ve refactored legacy CMSs into custom backends that later evolved into microservices. I’ve joined huge companies where microservices are the norm from day one. And I’ve also been part of projects where the choice to go microservices too early was a mistake, and we had to migrate back to a monolith.

  These experiences taught me an important lesson: **microservices can be the right or wrong decision depending on context**. They’re not a silver bullet. Used well, they give flexibility, scalability, and speed. Used badly, they add unnecessary complexity.

  One point I’ve learned through practice: **a system can start as microservices only if it already has a well-defined logical space inside an established industry**. For example, a banking core system, where scalability needs and separation of concerns are clear from the beginning. Otherwise, most projects benefit from starting with a monolith and evolving later.

  In this blog, I want to share an educational perspective: good practices for designing microservices, when they make sense, and how to build them in a way that truly adds value. To make it more visual, I’ll use a banking system as our example throughout.

  ---

  ## The Banking System Analogy

  Think of a digital banking platform. Some modules clearly demand more scalability than others. For instance:

  - **Transactions Module** → Needs to handle millions of transfers and payments in real time. Requires scalability, monitoring, and fault tolerance.
  - **User Profile Module** → Manages user data, preferences, and settings. Important, but less traffic-intensive compared to transactions.
  - **Notifications Module** → Sends alerts, push notifications, and emails. Workload can spike, but is often asynchronous.

  This makes banking a great analogy: not every service has the same scaling needs. Microservices allow you to scale the transaction engine independently without overprovisioning less demanding modules like user profiles.

  ---

  ## Scalability: Vertical vs. Horizontal

  When we talk about scalability in microservices, there are two main strategies:

  - **Vertical scaling**: Giving a single machine more power (CPU, RAM, faster storage). It’s simple, but limited — there’s only so much hardware you can add.  
  - **Horizontal scaling**: Running multiple instances of a service across different machines or containers. This approach is almost infinite in theory, and microservices make it natural: just spin up more containers of the transaction service during peak hours.  

  In our banking system, vertical scaling might be enough for the customer profile service, while the transactions module requires horizontal scaling to ensure uninterrupted performance at high demand.

  ---

  ## Independent Deployments

  One of the strongest arguments for microservices is the ability to **deploy each service independently**.

  In the banking example:

  - You may need to push multiple daily updates to the **Transactions Module** for bug fixes, compliance updates, or new payment features.
  - Meanwhile, the **User Profile Module** may only change once a month.

  Independent deployments avoid bottlenecks and let teams move at different speeds. However, this only works well if CI/CD pipelines, proper testing, and versioning are in place. Otherwise, deployments become chaotic instead of empowering.

  ---

  ## Cloud, Docker, and Portability

  Microservices thrive on portability, and this is where Docker and Kubernetes shine.

  - **Docker** ensures that every service runs in the same environment, from developer laptops to production. No more “it works on my machine”. Each microservice is packaged with its dependencies, which makes onboarding and debugging easier.
  - **Kubernetes** adds orchestration: it manages scaling (more containers for the Transactions Module during peak hours), rolling updates, self-healing, and service discovery. In banking, this means the system can handle Black Friday-like transaction spikes automatically without downtime.

  Together, these tools are the backbone of modern microservices: they make services portable, resilient, and cloud-native.

  ---

  ## Databases: To Share or Not to Share

  A common mistake in microservices is trying to share the same database. This creates tight coupling and coordination nightmares.  

  Instead, each service should own its data. For example:  
  - The **transactions service** owns its transaction history database.  
  - The **customer service** owns customer records. 

  A good practice is to give each service **its own database** to reduce coupling. For example, the Transactions Module might use a high-performance SQL database optimized for financial records, while Notifications could use a NoSQL DB for flexibility.

  Services communicate through APIs or events, not by peeking into each other’s tables. This ensures data consistency, clearer responsibilities, and easier scalability.

  ---

  ## Security and Access Control

  In microservices, **security must be centralized in design, even if distributed in implementation**.

  Instead of each service handling its own authentication logic, most teams use:

  - **OAuth 2.0 / OpenID Connect** for centralized authentication.
  - **API gateways** to enforce policies (rate limits, IP whitelists, etc.).
  - **Service-to-service authorization** (e.g., with OPA or service mesh) for internal trust boundaries.

  In banking, this is critical: a Notifications service should never be able to directly access user balances. Proper token scopes and policies enforce this separation of concerns.

  ---

  ## Standards and Consistency

  Microservices only work well if they follow common standards. Otherwise, integration becomes chaotic.  

  Some best practices include:
  - Consistent **API response formats** across services. For example:

  \`\`\`json
  {
    "data": object | array,
    "count": number, // Just for array-based responses
    "message": string
  }
  \`\`\`

  - Naming conventions for endpoints:
    - Use clear, versioned paths: \`/api/v1/transactions\`, \`/api/v1/customers\`.
    - Use plural nouns for resources, and consistent verbs for actions if necessary (e.g., \`/api/v1/transactions/transfer\`).
  - Standardized error handling:
    - Each error response should include consistent fields, for example:
  \`\`\`json
  {
    "error_code": "INSUFFICIENT_FUNDS",
    "message": "The account balance is too low for this transaction",
    "details": {
      "account_id": "123456789",
      "attempted_amount": 500
    }
  }
  \`\`\`
  - Consistent logging and error-handling formats.
  - Versioning strategies for APIs to avoid breaking clients.

  These standards ensure that different teams can build services independently while still making them interoperable and predictable, reducing surprises during integration and testing.

  ---

  ## Testing in Microservices

  Testing is often underestimated in microservices, but it’s where projects succeed or fail. Unlike monoliths, where you can run a single suite of tests, microservices require **multi-layered testing strategies**:

  1. **Unit Tests** → Validate logic inside each service (e.g., transaction fee calculation).
  2. **Integration Tests** → Validate how services interact. Often requires mocking (e.g., simulate the User Profile service when testing Transactions).
  3. **End-to-End (E2E) Tests** → Validate real-world workflows across multiple services. For a bank: “A user makes a transfer, balance updates, and a notification is sent.”

  To achieve this, teams often spin up **controlled environments** using Docker Compose or Kubernetes namespaces, where services interact in isolation. **Contract testing** tools (like Pact) help ensure that APIs between services remain compatible.

  In my experience, the teams that invested in strong integration and E2E testing saved months of debugging later. Without it, you end up with microservices that work in isolation but fail when combined.


  ---

  ## Organizational Alignment

  Microservices only make sense if your **team structure supports them**. Conway’s Law tells us that software architecture reflects organizational communication.

  - If you have a dedicated Transactions team, a User Profile team, and a Notifications team, microservices can map perfectly to this structure.
  - If you only have a small team of three developers, splitting into 10 microservices will create unnecessary overhead.

  In my career, I’ve seen both extremes:

  - Large organizations where microservices enable parallel work across hundreds of developers.
  - Startups where the microservice dream slowed everything down because there simply weren’t enough hands to manage it.

  ---

  ## Conclusion

  Microservices are not a magic solution — they are a tool. They work best when:

  - The system has parts with very different scalability requirements.
  - Independent deployments accelerate business needs.
  - Teams can enforce consistency, security, and testing discipline.

  From my own journey — migrating CMSs, scaling enterprise systems, and sometimes rolling back to monoliths — I’ve learned that the key is **context**. Microservices shine in large, well-defined domains, but they are overkill for small or rapidly changing products.

  If you design them with scalability, standards, and testing in mind, microservices can transform complex industries like banking into resilient, scalable, and maintainable systems.

  `,
    author: 'Sebastian Alvarez',
    tags: ['Microservices', 'Architecture', 'Cloud', 'API Gateway', 'DevOps', 'Docker']
  },
  {
  slug: 'coding-through-burnout',
  title: 'Coding Through Burnout: How Hobbies Helped Me Heal',
  date: 'July 31, 2025',
  excerpt: 'Burnout is real — especially when code is both your job and your hobby. Here’s how I navigated it using rest, rhythm, and side projects that gave me purpose beyond productivity.',
  imageUrl: '/blog/coding-through-burnout.webp',
  imageAiHint: 'developer relaxing, cat on lap, music notes, burnout recovery, dual life of coder and musician',
  content: `

## Introduction

Being a fullstack developer sounds exciting on paper — and it *is*. But over the years, working across **different projects, stacks, products, industries, and teams**, I found myself teetering on the edge of burnout more than once.

I love what I do, but when your profession is also your hobby, the lines blur dangerously fast. I was coding all day for work… and still coding at night for personal projects. There were weeks where I felt more like a machine than a person.

And yet, what helped me recover wasn’t stepping away from development completely — it was **redefining what coding meant to me**, and reconnecting with the things that remind me why I create in the first place.

---

## When the Burnout Hits

The signs came slowly at first: exhaustion, irritability, brain fog. I’d sit in front of the editor and feel nothing. No curiosity. No drive. Just a mechanical push to “get things done.”

Burnout isn’t just being tired — it’s feeling **disconnected from what used to bring you joy**.

I tried taking weekends off, turning off Slack, muting notifications. But the real shift came when I learned how to **disconnect deeply and with purpose**.

---

## My Cats Were My First Wake-Up Call 🐈

Sounds silly, right? But my cats reminded me how to *exist* without performance.

Watching them nap in sunbeams, chase shadows, demand affection — it grounded me. Pets don’t care about your deadlines. They don’t measure your worth in commits.

They just want you *present*.

In the quiet moments with them, I remembered I was a person first — not just a developer.

---

## Music Helped Me Breathe Again 🎵

I’ve always been an amateur musician. During some of my lowest points, I’d pick up the guitar, not to write songs, but just to *play*. To *feel* again.

Playing music has no backlog, no Jira tickets, no standups. It’s just you and the moment.

And yet, my love for tech snuck back in — in a good way.

---

## Turning Burnout Into Creation: Cadenza 🎹

At some point, I realized: maybe I didn’t need to separate my love for tech and music — maybe I could let them **feed each other**.

That’s how I ended up building [Cadenza](https://cadenza-app.vercel.app), a tool to help me with **musical composition and music theory practice**.

I made it for myself — a simple way to experiment with harmony, discover new voicings, and explore theory in an interactive way. But without even realizing it, I was also building something **genuinely useful for other musicians**.

That moment — when friends and fellow musicians started telling me they found value in it — reminded me **why I started building things** in the first place.

Not for performance. Not for productivity. But to *solve real problems*, to *create tools that matter*, and to *bridge passions through code*.

That realization brought me back to life as a developer.

---

## When Your Hobby Is Also Your Career

This is the paradox a lot of us devs face: code is what we do for a living *and* what we do for fun.

That’s powerful — but also dangerous.

### Here’s what I learned:

- 💡 **Not every side project needs to be “shipped.”** Sometimes, building something just for yourself is enough.
- 😌 **Rest isn’t laziness — it’s fuel.** True rest means *disconnecting completely*, even from side projects.
- 🎯 **Purpose heals.** When I stopped coding for output and started coding for *expression*, I remembered why I fell in love with tech in the first place.

---

## Conclusion

Burnout doesn’t mean you’re broken — it means you’ve been running on empty. As a fullstack dev juggling many roles, it’s easy to forget you’re not just a producer of features. You’re a human with needs, rhythms, and a creative spark that needs care.

So if you’re feeling burned out:

- Pet a cat 🐾  
- Play a chord 🎸  
- Build something just for you 💻

And remember: the same skills that wear you down can also be the ones that lift you back up — if you let them reconnect you with joy.

👉 Try [Cadenza](https://cadenza-app.vercel.app) if you’re into music too — maybe it helps you like it helped me.

`,
  author: 'Sebastian Alvarez',
  tags: ['Burnout', 'Developer Life', 'Mental Health', 'Side Projects', 'Music', 'Productivity']
},
  {
    slug: 'from-chaos-to-clarity-kanban',
    title: 'From Chaos to Clarity: My Journey with Kanban Boards',
    date: 'July 7, 2025',
    excerpt: 'Discover how Kanban boards help organize software projects, increase personal productivity, and why UI/UX — like drag and drop — makes all the difference.',
    imageUrl: '/blog/from-chaos-to-clarity-kanban.webp',
    imageAiHint: 'kanban board, drag and drop, software productivity, organized workspace',
    content: `
  ## Introduction

  Managing tasks as a software developer — whether in freelance gigs, full-time roles, or personal projects — can be overwhelming without a system. I tried to-do lists, spreadsheets, and sticky notes, but they all fell short.

  Everything changed when I embraced **Kanban boards**.

  In this post, I’ll explain **why Kanban boards are essential for software teams and individual developers**, how I built <a href="https://open-kanban.vercel.app/" target="_blank" rel="noopener noreferrer">Open Kanban</a>
  to fit my workflow, and how it helped me level up my productivity — not just in code, but in life.

  ---

  ## Why Kanban Boards Are a Game-Changer

  Kanban isn’t just a fancy to-do list. It’s a visual system for managing work that improves clarity, focus, and flow.

  Here’s why they work:

  ### 1. 🧠 Visual Clarity Over Chaos

  Kanban makes your workload visible. You’re not just writing tasks — you’re watching them **move** through stages:

  - Backlog → In Progress → Review → Done

  This flow mirrors how real software work happens. It helps you **see bottlenecks**, balance priorities, and stay focused.

  Also, you can generate new steps on that flow to increase the control!

  ### 2. 🧩 Flexible for Teams and Solo Devs

  Whether you're collaborating with others or working solo, Kanban adapts. I use it to:

  - Break down features during sprints
  - Track freelance project deliverables
  - Plan personal goals like workouts or reading
  - Organize side projects

  Once you start using columns and cards, it’s hard to go back to plain lists.

  ### 3. ⚡ Encourages Focus and Flow

  Limiting “In Progress” cards forces you to finish what you start. That leads to fewer half-baked features, fewer distractions, and a stronger feeling of progress.

  ---

  ## Why I Built Open Kanban

  There are dozens of Kanban tools out there. But I wanted something **simple**, **fast**, and **customizable**.

  That’s why I built [Open Kanban](https://open-kanban.vercel.app/).

  - ✅ **Easy-to-use Google Authentication**
  - ✅ **Drag and drop cards and columns**
  - ✅ **Customizable columns and project settings**
  - ✅ **Dark mode**
  - ✅ **Firestore storage by default**

  It’s built with Nextjs + Tailwind, focused entirely on UX — so it feels fast and frictionless.

  I created it as a weekend project, and now I use it every single day.

  ---

  ## How It Improved My Workflow

  Here’s how Open Kanban made a difference in my life:

  ### 🧑‍💻 Freelance and Work Projects

  - I track features and bugs with clear visibility
  - No more jumping between Notion, Trello, and email
  - It’s easier to plan sprints and deliver on time

  ### 🧘‍♂️ Personal Life and Daily Goals

  - I organize my day every morning
  - I can drag tasks into "Done" — super satisfying!
  - Planning long-term habits is easier with recurring templates

  ### 🚀 Easy to increase

  As a software engineer, having all the control of this amazing tool is a game-changer. I can easily generate new functionalities to adapt my new requirements to the app in minutes!

  It became my **second brain**, helping me stay clear-headed and productive, even outside of coding.

  ---

  ## The Power of Good UI/UX

  Design isn’t just “nice to have” — it **directly affects productivity**.

  When UI gets out of your way and **feels smooth**, like with:

  - 🖱️ **Drag and drop**
  - 🌙 **Dark mode**
  - 📲 **Responsive Adaptations**

  …it becomes a tool you actually enjoy using.

  I spent time polishing the drag-and-drop experience with libraries like \`dnd-kit\` to make sure it felt intuitive and satisfying. But I consider using native CSS \`draggable\` prop to make the experience easy to understand.

  ---

  ## Conclusion

  Kanban changed how I work, how I plan, and how I finish things. And building my own tool around that idea made me a better developer.

  If you're juggling multiple projects — or just want to finish what you start — **try Open Kanban**:

  👉 <a href="https://open-kanban.vercel.app/" target="_blank" rel="noopener noreferrer">open-kanban.vercel.app</a>

  It’s free, fast, and focused on making productivity feel good.

  And remember: **the best software doesn’t just work — it feels great to use**.
  `,
    author: 'Sebastian Alvarez',
    tags: ['Productivity', 'Developer Tools', 'UI/UX', 'Side Projects', 'Kanban', 'Open Source']
  },
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
