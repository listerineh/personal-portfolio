# 🚀 Personal Portfolio

✨ A modern, high-performance personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth GSAP animations, a technical blog, and a comprehensive showcase of professional experience and projects.

---

## 🌍 Deployment

Deployed on Vercel with automatic CI/CD from the `main` and `develop` branches.

| Environment | URL |
|-------------|-----|
| Production  | [listerineh.dev](https://listerineh.dev) |
| Development | [listerineh.vercel.app](https://listerineh.vercel.app) |

---

## 🛠 Tech Stack

### 🔧 Core Technologies

| Technology | Description |
|------------|-------------|
| ![Next.js](https://img.shields.io/badge/-Next.js_15-000000?logo=next.js) | React framework with App Router and Server Components |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript) | Type-safe JavaScript with strict mode |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css) | Utility-first CSS framework |
| ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react) | JavaScript UI library |

### 🎨 UI & Animations

- ![GSAP](https://img.shields.io/badge/-GSAP-88CE02) - Professional-grade animation library
- ![ScrollTrigger](https://img.shields.io/badge/-ScrollTrigger-88CE02) - Scroll-based animations
- ![Radix UI](https://img.shields.io/badge/-Radix_UI-161618) - Unstyled, accessible UI components
- ![Lucide](https://img.shields.io/badge/-Lucide-FFD43B) - Beautiful, consistent icon set
- ![shadcn/ui](https://img.shields.io/badge/-shadcn/ui-000000) - Re-usable component library

### 📦 Key Dependencies

- ![Zod](https://img.shields.io/badge/-Zod-3E63DD) - TypeScript-first schema validation
- ![Resend](https://img.shields.io/badge/-Resend-3ECF8E) - Email API for contact form
- ![Sharp](https://img.shields.io/badge/-Sharp-99CC00) - High-performance image processing
- ![Vercel Analytics](https://img.shields.io/badge/-Vercel_Analytics-000000) - Web analytics

### 🛠 Development Tools

- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3) - JavaScript linter
- ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E) - Code formatter
- ![Turbopack](https://img.shields.io/badge/-Turbopack-000000) - Next.js bundler for faster builds

---

## ✨ Features

### 🎯 Core Features
✅ Fully responsive design (mobile-first approach)

✅ Dark/light mode toggle with smooth transitions

✅ Contact form with email integration (Resend API)

✅ Technical blog with markdown support

✅ Downloadable resume

✅ SEO optimized with metadata and Open Graph tags

### 🎬 Animations & UX
✅ Smooth scroll-based animations with GSAP

✅ Parallax effects and scroll triggers

✅ Elegant theme toggle with curtain effect

✅ Animated background with mesh gradients

✅ Smooth page transitions

✅ Back to top button with progress indicator

### 📱 Sections
✅ Hero section with animated introduction

✅ Work experience timeline with expandable details

✅ Skills showcase with animated skill cards

✅ Projects gallery with live demos and source code

✅ Blog preview with featured posts

✅ Contact form with validation

### 🚀 Performance
✅ WebP image optimization

✅ Static site generation (SSG) for blog posts

✅ Optimized fonts with Next.js font optimization

✅ Code splitting and lazy loading

✅ Lighthouse score: 95+ on all metrics

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/listerineh/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=your@email.com
   EMAIL_TO=recipient@email.com
   NEXT_PUBLIC_SITE_URL=http://localhost:9002
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack on port 9002 |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run convert-images` | Convert JPEG/PNG images to WebP format recursively in `/public` |

### 🖼️ Image Optimization Script

The project includes a custom script to convert images to WebP format for better performance:

```bash
npm run convert-images
```

**Features:**
- Recursively scans all subdirectories in `/public`
- Converts `.jpg`, `.jpeg`, and `.png` files to `.webp`
- Automatically deletes original files after conversion
- Skips files if WebP version already exists
- Uses Sharp for high-quality compression (85% quality)

See `scripts/README.md` for more details.

---

## 🔄 Customization Guide

### 1. **Update Personal Information**

Edit `src/lib/data.ts` to customize:
- Hero section (name, title, description)
- Work experience
- Skills
- Projects
- Blog posts
- Contact information

### 2. **Customize Design**

Modify `src/app/globals.css` for:
- Color scheme (CSS variables)
- Typography
- Spacing
- Custom animations

### 3. **Update Theme Colors**

Edit the theme colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: "...",
  secondary: "...",
  accent: "...",
}
```

### 4. **Add Blog Posts**

Add new blog posts in `src/lib/data.ts`:
```typescript
{
  slug: 'your-post-slug',
  title: 'Your Post Title',
  date: 'Month Day, Year',
  excerpt: 'Brief description...',
  imageUrl: '/blog/your-image.webp',
  content: `Your markdown content...`,
  author: 'Your Name',
  tags: ['Tag1', 'Tag2']
}
```

### 5. **Configure Contact Form**

Get a free API key from [Resend](https://resend.com) and add it to your `.env.local` file.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically deploy on every push to `main` branch.

### Environment Variables for Production

```bash
RESEND_API_KEY=your_production_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 📁 Project Structure

```
personal-portfolio/
├── public/              # Static assets (images, resume, etc.)
│   ├── blog/           # Blog post images
│   ├── images/         # General images
│   └── projects/       # Project screenshots
├── scripts/            # Utility scripts
│   ├── convert-images-to-webp.js
│   └── README.md
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── blog/       # Blog pages
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── common/     # Shared components
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Page sections
│   │   └── ui/         # UI components (shadcn/ui)
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and data
│   └── types/          # TypeScript type definitions
├── .env.local          # Environment variables (not in git)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📝 License

This project is licensed under the MIT License - feel free to use it for your own portfolio!

---

## 👨‍💻 Author

**Sebastian Alvarez**
- Website: [listerineh.dev](https://listerineh.dev)
- GitHub: [@listerineh](https://github.com/listerineh)

---

⭐ If you found this project helpful, please consider giving it a star!
