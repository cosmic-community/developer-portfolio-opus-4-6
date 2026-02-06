# Developer Portfolio

![Developer Portfolio](https://imgix.cosmicjs.com/566f1220-0376-11f1-9226-49b3c368cc38-photo-1611224923853-80b023f02d71-1770394221408.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive developer portfolio built with Next.js 16 and Cosmic CMS. Showcases your projects, technical skills, and work experience with an elegant dark-themed design, smooth animations, and dynamic content management.

## Features

- 🚀 **Dynamic Project Showcase** — Feature your best work with images, descriptions, and skill tags
- ⚡ **Skills Grid** — Display your technical proficiencies with visual indicators
- 💼 **Work Experience Timeline** — Present your career progression chronologically
- 📱 **Fully Responsive** — Looks great on all devices from mobile to desktop
- 🎨 **Modern Dark Theme** — Sophisticated design with gradient accents
- 🔗 **Individual Project Pages** — Detailed project views with full markdown content
- ⚡ **Server-Side Rendering** — Fast initial loads and excellent SEO
- 📝 **CMS-Powered Content** — Update everything from your Cosmic dashboard

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=698611bf414ab27bd7648659&clone_repository=6986139d414ab27bd764867a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "A developer portfolio with projects, skills, and work experience"

### Code Generation Prompt

> "Based on the content model I created for 'A developer portfolio with projects, skills, and work experience', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your portfolio content

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd developer-portfolio

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Cosmic SDK Examples

### Fetching Projects with Related Skills

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Project by Slug

```typescript
const { object: project } = await cosmic.objects
  .findOne({ type: 'projects', slug: 'my-project' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills with Proficiency Levels

```typescript
const { objects: skills } = await cosmic.objects
  .find({ type: 'skills' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This portfolio uses three content types from your Cosmic bucket:

| Content Type | Fields | Description |
|---|---|---|
| **Projects** | Description (markdown), Featured Image, Project URL, GitHub URL, Skills Used | Your portfolio projects |
| **Skills** | Name, Proficiency (select-dropdown), Icon | Technical skills with proficiency levels |
| **Work Experience** | Company, Role, Start Date, End Date, Description (markdown), Company Logo | Your professional history |

All content is managed through the Cosmic dashboard and fetched server-side for optimal performance.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->