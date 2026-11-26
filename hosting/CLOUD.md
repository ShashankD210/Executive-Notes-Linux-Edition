# Cloud Hosting Recommendations

Two deployment targets: the **Next.js Executive Notes app** and the **GRC archive**
(static HTML + FastAPI + PostgreSQL).

## Recommended platforms (ranked)

### 1. Vercel + Supabase — *recommended for fastest launch*
- **Next.js app**: Vercel (native Next.js, zero-config, global CDN, preview deploys).
- **Auth + DB**: Supabase (managed Postgres, Auth, Row-Level Security).
- **GRC static app**: deploy `app/index.html` to Vercel static or any CDN.
- **Pros**: minimal ops, built-in TLS, generous free tier, git-based deploys.
- **Cons**: less control over runtime; data resides with Supabase region you pick.
- **Setup**:
  1. Import the repo into Vercel; framework preset = Next.js.
  2. Add env vars `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
  3. In Supabase SQL editor, run `supabase/schema.sql`.

### 2. AWS — *recommended for one-account / enterprise fit*
- **Next.js app**: AWS Amplify Hosting (or ECS Fargate behind ALB, or Lambda via OpenNext).
- **DB/Auth**: Amazon RDS for PostgreSQL + Amazon Cognito (or Aurora Serverless v2).
- **GRC backend**: ECS Fargate / App Runner running the FastAPI image.
- **Storage**: S3 for evidence objects; CloudFront for the static HTML app.
- **Pros**: broad service catalog, IAM, VPC isolation, compliance attestations.
- **Cons**: more configuration and cost management.

### 3. Microsoft Azure — *recommended for Microsoft shops*
- **Next.js app**: Azure App Service (Node 20/22) or Azure Static Web Apps.
- **DB/Auth**: Azure Database for PostgreSQL Flexible Server + Microsoft Entra ID.
- **GRC backend**: Azure Container Apps / App Service (Python).
- **Pros**: Entra SSO, native hybrid/AD integration, strong enterprise governance.
- **Cons**: SKU/region capacity planning needed for some models.

### 4. Google Cloud — *alternative*
- **Next.js app**: Cloud Run (container) or Firebase Hosting.
- **DB**: Cloud SQL for PostgreSQL; Identity Platform for auth.
- **GRC backend**: Cloud Run (Python/FastAPI).

## Managed Supabase (cross-cloud)
Supabase is cloud-agnostic and works with any of the above as the app tier. Choose
a region close to users; enable RLS (already defined in `supabase/schema.sql`).

## Minimum production checklist (cloud)
- [ ] HTTPS enforced; HSTS at the edge.
- [ ] Env vars set in the platform secret store (never in git).
- [ ] Supabase RLS policies applied; anon key not used for privileged writes.
- [ ] CORS restricted to the app domain (FastAPI currently allows localhost only).
- [ ] Database backups / PITR enabled.
- [ ] Centralized logging + health checks wired to platform monitors.