# InFrame Frontend

This is a [Next.js](https://nextjs.org) project for the InFrame face-recognition attendance system.

## Setup

### 1. Local Development Setup

Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/stream
```

**Note:** The backend runs locally only (camera dependency). `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WS_URL` default to localhost and do not need to be changed for development.

### 2. Install Dependencies

```bash
npm ci
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Live Deployment

**Production:** https://frontend-blush-five-ezyftppj51.vercel.app/

The app is automatically deployed to Vercel on every push to the `main` branch via GitHub Actions.

## Testing

Run the test suite with:

```bash
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests and generate coverage report
```

See [TESTING.md](./TESTING.md) for detailed test documentation.

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment to Vercel.

### Build & Test Job (`build-test`)
- Runs on: every push and pull request
- Steps:
  1. Installs dependencies
  2. Runs unit tests with coverage (`npm test -- --coverage --forceExit`)
  3. Builds the Next.js app (`npm run build`)

### Deploy Job (`deploy`)
- Runs on: push to `main` branch only (not on PRs)
- Steps:
  1. Installs Vercel CLI
  2. Pulls environment variables from Vercel dashboard
  3. Runs production build (`vercel build --prod`)
  4. Deploys to Vercel (`vercel deploy --prebuilt --prod`)

### Required GitHub Secrets

To set up the CI/CD pipeline, configure these secrets in your GitHub repo (Settings → Secrets and variables → Actions):

| Secret Name | Description | Where to get |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Your Supabase project dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Your Supabase project dashboard |
| `VERCEL_TOKEN` | Vercel API token | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel organization ID | `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | Vercel project ID | `.vercel/project.json` after running `vercel link` |

## Vercel Deployment Setup

### First-time Setup

1. **Create a Vercel project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub → select `comp7082-InFrame/frontend`
   - Vercel auto-detects Next.js (no additional config needed)

2. **Set environment variables in Vercel:**
   - In your Vercel project dashboard: Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

3. **Link project locally:**
   ```bash
   cd frontend
   npx vercel link
   ```
   Follow the prompts to connect to your Vercel organization and project.

4. **Get project IDs:**
   ```bash
   cat .vercel/project.json
   ```
   Copy the `orgId` and `projectId` values.

5. **Create Vercel token:**
   - Go to [vercel.com/account/settings/tokens](https://vercel.com/account/settings/tokens)
   - Click "Create"
   - Copy the token

6. **Add GitHub secrets:**
   - Go to your GitHub repo: Settings → Secrets and variables → Actions
   - Add all 5 secrets listed in the table above

7. **Deploy:**
   Push to `main` → GitHub Actions runs → Vercel deploys automatically

## Building for Production

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features
- [Vercel Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) - deployment details
- [TESTING.md](./TESTING.md) - comprehensive testing guide
