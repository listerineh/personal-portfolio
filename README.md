# 🚀 Personal Portfolio

✨ A modern, responsive personal portfolio website built with Next.js and Tailwind CSS. Showcases professional experience, projects, and contact information.

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
| ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js) | React framework for SSR and SSG |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript) | Type-safe JavaScript |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css) | Utility-first CSS framework |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react) | JavaScript UI library |

### 📦 Key Dependencies

- ![Radix UI](https://img.shields.io/badge/-Radix_UI-161618) - Unstyled, accessible UI components
- ![Lucide](https://img.shields.io/badge/-Lucide-FFD43B) - Beautiful, consistent icon set
- ![Zod](https://img.shields.io/badge/-Zod-3E63DD) - TypeScript-first schema validation
- ![Resend](https://img.shields.io/badge/-Resend-3ECF8E) - Email API for developers
- ![Vercel](https://img.shields.io/badge/-Vercel-000000) - Cloud platform for deployment

### 🛠 Development Tools

- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3) - JavaScript linter
- ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E) - Code formatter

---

## ✨ Features

✅ Responsive design

✅ Dark/light mode toggle

✅ Contact form with email integration

✅ Blog section with markdown support

✅ Downloadable resume

---

## 🏁 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/listerineh/personal-portfolio.git
   ```
2. Install dependencies:
```bash
npm install
```
3. Run the development server
```bash
npm run dev
```

## 🔄 Replication

If you want to replicate this project, you can fork this repository and modify `src/lib/data.ts` primary to your own data and then `src/app/globals.css` to implement your own design.

Also necessary to set up environment variables for the contact form to work:
```bash
RESEND_API_KEY=your_resend_key
EMAIL_FROM=your@email.com
EMAIL_TO=recipient@email.com
```

### 📝 License

This project is licensed under the MIT License.
