# BNI GROW Visitor Dashboard

Aplikasi CRUD untuk manajemen visitor list BNI GROW Weekly Meeting dengan Next.js, Supabase, dan Tailwind CSS.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete visitors
- ✅ **Real-time Dashboard**: Stats cards, pie chart, PIC workload
- ✅ **Master Data**: Status, PIC, Gender management
- ✅ **Export CSV**: Download visitor list as CSV
- ✅ **WhatsApp Integration**: Click-to-chat links auto-generated
- ✅ **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### Master Tables

- `master_status`: open, followup, not_contacted_yet, confirmed, reschedule, cancel
- `master_pic`: ilham, hans, eva
- `master_gender`: male, female

### Main Table

- `visitors`: Store all visitor data with foreign keys to master tables

### Views

- `visitor_summary`: Aggregated statistics
- `pic_workload`: PIC assignment summary
- `status_distribution`: Status breakdown with percentages

## API Routes

The app uses direct Supabase client calls from components. No separate API routes needed.

## Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

## License

MIT License - Powered by Ilham Kurniawan | WIT.ID