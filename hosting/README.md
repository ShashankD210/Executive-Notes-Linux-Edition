# Hosting & Deployment

This folder covers how to host the two deliverables in this repository:

1. **Executive Notes** — Next.js (App Router) web app. Runs in *Local Demo mode*
   (browser localStorage, no backend) or *Supabase mode* (account-backed storage
   with Row-Level Security).
2. **GRC Readiness archive** — static HTML app, a FastAPI starter API, and a
   PostgreSQL database.

## Contents

| File | Purpose |
|---|---|
| [`README.md`](README.md) | This overview and decision guide. |
| [`CLOUD.md`](CLOUD.md) | Recommended cloud platforms and managed services. |
| [`ON_PREMISES.md`](ON_PREMISES.md) | Self-hosted / on-premises and air-gapped options. |
| [`docker-compose.yml`](docker-compose.yml) | Local/on-prem PostgreSQL for the GRC backend. |
| [`.env.example`](.env.example) | Database env template for docker-compose. |

## Quick decision guide

| Need | Recommended path |
|---|---|
| Fastest public launch, zero ops | **Cloud**: Vercel (Next.js) + Supabase (auth/DB) |
| Everything in one cloud account | **Cloud**: AWS (Amplify/ECS + RDS) or Azure (App Service + Entra/Postgres) |
| Data must stay in your datacenter | **On-prem**: Docker Compose / Kubernetes on Linux + self-managed Postgres |
| Air-gapped / regulated | **On-prem**: offline container images + internal Postgres, no egress |

## Architecture at a glance

```
Browser ──► Next.js app (Vercel / App Service / container)
                 │
                 ├─ Local Demo mode: uses browser localStorage only
                 │
                 └─ Supabase mode: ──► Supabase (Postgres + Auth + RLS)

GRC archive:
Browser ──► app/index.html (static, any static host)
FastAPI backend ──► PostgreSQL (docker-compose / managed)
```

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or legacy
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — enable account-backed mode. See the root
  `.env.example`. With these unset, the app stays in Local Demo mode.
- `POSTGRES_*` / `DATABASE_URL` — GRC database. See [`./.env.example`](.env.example).

## Security notes

- Never commit `.env` / `.env.local`; they are git-ignored.
- Enforce HTTPS/TLS at the edge and restrict CORS to trusted origins.
- The FastAPI service is a **starter scaffold**: add authentication, authorization,
  tenant isolation, audit logging and rate limiting before exposing it.
- Apply least-privilege DB roles and keep `audit_events` append-only.