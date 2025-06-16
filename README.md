# tyform

A modern waitlist landing page for tyform - the smarter way to build forms.

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Deployment

### Environment Variables Required

When deploying to **Vercel** or **Netlify**, you need to add these environment variables in your deployment platform:

#### Required Environment Variables:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to Set Up Environment Variables:

#### **For Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_anon_key_here`
4. Set environment for: **Production**, **Preview**, and **Development**
5. Deploy!

#### **For Netlify:**
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the same variables as above
4. Deploy!

### Getting Your Supabase Credentials:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **anon/public key** (for `VITE_SUPABASE_ANON_KEY`)

> **⚠️ Important:** Never commit your `.env` file to Git. The `.env` file is already in `.gitignore` for security.

## Features

- Responsive waitlist signup form
- Animated UI with smooth transitions
- Supabase integration for data storage
- Notion API integration for waitlist management
- Optimized for production deployment

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- Notion API

## Project Structure

```
├── src/
│   ├── components/ui/     # Reusable UI components
│   ├── screens/Tyform/    # Main application screen
│   ├── services/          # API services (Notion integration)
│   └── lib/               # Utility functions
├── supabase/functions/    # Supabase Edge Functions
├── public/                # Static assets
└── dist/                  # Build output (auto-generated)
```

## Deployment Configuration

The project includes configuration files for popular deployment platforms:

- **`vercel.json`** - Vercel deployment configuration
- **`netlify.toml`** - Netlify deployment configuration
- **`vite.config.ts`** - Optimized build settings

Both platforms will automatically:
- Install dependencies
- Build the project
- Deploy to CDN
- Handle routing for SPA

## Security Features

- Environment variables are kept secure (not in repository)
- CORS headers configured
- Security headers implemented
- XSS protection enabled