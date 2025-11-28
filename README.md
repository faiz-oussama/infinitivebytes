<div align="center">
  
# Agency Intelligence Dashboard

**Modern full-stack application for agency & contact data management with intelligent daily limits**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://infinitivebytes.vercel.app) · [Report Bug](https://github.com/faiz-oussama/infinitivebytes/issues)

</div>

---

## ✨ Features

- 🔐 **Authentication** – Clerk-powered OAuth with session management
- 📊 **Analytics Dashboard** – Real-time stats with interactive charts (Recharts)
- 🏢 **Agency Management** – Advanced table with search, sort, and pagination
- 👥 **Contact Tracking** – Daily view limits (50/day) with usage analytics
- 🎨 **3D Landing Page** – WebGL animations using Three.js & React Three Fiber
- 🌙 **Theme Support** – Light/dark modes with Tailwind CSS
- ⚡ **Performance** – Server Components, React Compiler, edge-optimized
- 📱 **Responsive** – Mobile-first design with glassmorphism UI

## 🏗️ Architecture

![Architecture Diagram](./architecture.png)

### Tech Stack

```
Frontend          Backend           Database          Auth
─────────         ─────────         ─────────         ─────────
Next.js 16        API Routes        PostgreSQL        Clerk
React 19          Prisma ORM        Neon Serverless   OAuth
TypeScript        Server Actions    Connection Pool   Sessions
Tailwind CSS 4    Edge Runtime      Query Cache       Protected Routes
Three.js          Serverless        Prisma Accelerate User Management
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) free tier)
- [Clerk](https://clerk.com) account

### Installation

```bash
# Clone repository
git clone https://github.com/faiz-oussama/infinitivebytes.git
cd infinitivebytes

# Install dependencies
npm install

# Set up environment variables
cp env.template .env.local
# Add your Clerk & Database credentials

# Push database schema
npm run db:push

# (Optional) Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@clerk/nextjs` | Authentication & user management |
| `@prisma/client` | Type-safe database ORM |
| `@neondatabase/serverless` | Serverless PostgreSQL connection |
| `@tanstack/react-table` | Advanced table functionality |
| `@react-three/fiber` | 3D WebGL rendering |
| `recharts` | Data visualization & charts |
| `shadcn/ui` | Accessible UI components |


## 🗄️ Database Schema

```prisma
User ────┐
         │ 1:N
         ▼
    ContactView
         │ N:1
         ▼
    Contact ───N:1──▶ Agency
```

**Models**: User, Agency, Contact, ContactView

## 🔑 Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@host/db
DIRECT_URL=postgresql://user:pass@host/db
```

## 📁 Project Structure

```
dashboard-app/
├── app/
│   ├── (dashboard)/       # Protected routes (SSR)
│   │   ├── dashboard/     # Overview with analytics
│   │   ├── agencies/      # Agency table view
│   │   └── contacts/      # Contact management
│   ├── api/               # Backend API routes
│   ├── features/          # Public features page
│   ├── pricing/           # Pricing page
│   └── layout.tsx         # Root layout + Clerk
├── components/
│   ├── charts/            # Recharts visualizations
│   ├── tables/            # TanStack tables
│   └── ui/                # shadcn components
├── lib/
│   ├── db.ts              # Prisma client
│   └── daily-limit.ts     # View tracking logic
└── prisma/
    └── schema.prisma      # Database schema
```

## 🎯 Core Features

### Daily Limit System
- Server-side enforcement (50 views/day)
- Real-time counter with badge UI
- Auto-reset at midnight UTC
- Indexed queries for performance

### Authentication Flow
- OAuth providers (Google, GitHub, etc.)
- Protected routes via middleware
- Session management with Clerk
- Custom post-login redirects

### Data Management
- Server-side pagination
- Advanced search & filtering
- Real-time updates
- Optimistic UI with React Server Components

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Deploy to production
vercel --prod

# Environment variables required:
# - All Clerk keys
# - DATABASE_URL
# - DIRECT_URL (for migrations)
```

### Environment Setup

Add these in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`

## 🛠️ Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Database management
npm run db:push      # Push schema
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma Client

# Linting
npm run lint
```

## 🎨 Design System

- **Colors**: HSL-based Tailwind tokens
- **Typography**: Geist font family
- **Components**: Radix UI primitives
- **Animations**: Tailwind CSS animations
- **Icons**: Lucide React

## 📈 Performance

- **Server Components** – Reduced client bundle
- **React Compiler** – Auto optimization
- **Edge Runtime** – Global low-latency
- **Query Caching** – Prisma Accelerate
- **Connection Pooling** – Neon serverless

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

<div align="center">

**Built with ❤️ using Next.js, React, and TypeScript**

[⭐ Star this repo](https://github.com/faiz-oussama/infinitivebytes) · [🐛 Report Issues](https://github.com/faiz-oussama/infinitivebytes/issues)

</div>
