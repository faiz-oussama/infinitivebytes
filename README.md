# Dashboard Application

A Next.js 15 dashboard application with user authentication and daily contact view limits.

## Features

- **User Authentication**: Secure authentication using Clerk
- **Agencies Page**: View and search through all agencies with pagination
- **Contacts Page**: View contact information with daily limit enforcement
- **Daily Limit**: Users can view up to 50 contacts per day (resets at midnight UTC)
- **Upgrade Prompt**: Modal prompt when daily limit is reached
- **Clean UI**: Built with shadcn/ui components for a minimalistic design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **UI Library**: shadcn/ui (Tailwind CSS)
- **Language**: TypeScript

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Clerk account (free tier available)

### 1. Clone and Install

```bash
cd dashboard-app
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables (see `ENV_TEMPLATE.md` for reference):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/agencies
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/agencies

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dashboard_db?schema=public"
```

**Getting Clerk Keys**:
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys from the dashboard

### 3. Database Setup

Push the Prisma schema to your database:

```bash
npx prisma db push
```

### 4. Seed Database (Optional)

To import the CSV data:

```bash
npx tsx scripts/seed.ts
```

This will import agencies and contacts from the CSV files in the parent directory.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

### Agency
- Stores agency information (name, state, type, population, etc.)

### Contact
- Stores contact information (name, email, phone, title, department)
- Links to Agency via `agency_id`

### ContactView
- Tracks each contact view by user
- Used to enforce the 50 views/day limit

## Features Overview

### Authentication
- Sign up and sign in pages powered by Clerk
- Protected routes (cannot access dashboard without authentication)
- User menu with sign-out option

### Agencies Page
- Table view of all agencies
- Search by name, state, type, or county
- Pagination (20 per page)
- Responsive design

### Contacts Page
- Table view of contacts with masked data
- Click "View" button to reveal contact details (counts toward daily limit)
- Real-time limit counter showing remaining views
- Search by name, email, title, or department
- Pagination (20 per page)
- Upgrade prompt when limit is reached

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- Clerk API keys (different from development)
- Production database URL

## Project Structure

```
dashboard-app/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── agencies/         # Agencies page
│   │   ├── contacts/         # Contacts page
│   │   └── layout.tsx        # Dashboard layout with nav
│   ├── api/                  # API routes
│   │   └── contacts/view/    # Contact view tracking endpoint
│   ├── sign-in/              # Sign-in page
│   ├── sign-up/              # Sign-up page
│   └── layout.tsx            # Root layout with Clerk
├── components/
│   ├── tables/               # Table components
│   ├── ui/                   # shadcn/ui components
│   └── upgrade-prompt.tsx    # Upgrade modal
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── daily-limit.ts        # Limit checking utilities
│   └── utils.ts              # General utilities
├── prisma/
│   └── schema.prisma         # Database schema
├── scripts/
│   └── seed.ts               # Database seeding script
└── middleware.ts             # Clerk route protection

```

## License

MIT
