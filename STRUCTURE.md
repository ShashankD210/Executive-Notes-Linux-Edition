# Project Structure

This repository contains two related deliverables:

1. **Executive Notes** — a Next.js (App Router) application for private executive notes, decisions, and delegation.
2. **GRC Readiness archive** — a 169-control governance/risk/compliance catalogue with docs, database schema, a FastAPI starter, and a standalone HTML app.

## Top-level layout

```
.
├── app/                  # Next.js App Router (Executive Notes)
│   ├── layout.tsx        # Root layout (renders <html><body>)
│   ├── page.tsx          # Main notes workspace (client component)
│   ├── csuite.ts         # C-Suite member definitions + lookup
│   ├── teamMembers.ts    # Per-role team member store (local demo)
│   ├── styles.css        # Global styles
│   ├── index.html        # Standalone GRC HTML app (current build)
│   └── releases/         # Original v1 standalone HTML build
├── lib/
│   └── supabase.ts       # Browser Supabase client (null => Local Demo mode)
├── supabase/
│   └── schema.sql        # Notes table + Row-Level Security policies
├── public/               # (static assets, if added)
├── backend/              # FastAPI starter (GRC control-catalog API)
│   ├── app/main.py
│   ├── requirements.txt
│   └── tests/test_catalog.py
├── data/                 # Canonical control catalogue (JSON + CSV)
├── database/             # PostgreSQL starter schema (multi-tenant)
├── deliverables/         # Corrected Excel workbook
├── deployment/           # docker-compose + env template for Postgres
├── docs/                 # GRC architecture, security, audit, roadmap, etc.
├── scripts/              # Catalog validator + workbook formula repair
├── source/               # Original supplied PDF, workbook, workflow image
├── run-local.sh          # Dev server helper (127.0.0.1:3000)
├── check-linux.sh        # Validation pipeline (typecheck + build)
├── .env.example          # Supabase env template
├── package.json          # Next.js app deps + scripts
├── tsconfig.json         # TypeScript config
├── next.config.ts        # Next.js config
├── README.md             # Executive Notes docs
├── GRC_README.md         # GRC archive docs
├── START_HERE.md         # GRC archive entry point
├── VALIDATION_STATUS.md  # Verified status
├── TODAY_LAUNCH_CHECKLIST.md
├── PROJECT_MANIFEST.json # GRC package manifest
├── FILE_INVENTORY.md     # Generated file inventory (path/size/sha256)
├── SECURITY.md
└── LICENSE
```

## Environment setup

Requirements: Linux, Node.js 20+ (22 LTS recommended), npm 9+.

```bash
export PATH="/usr/bin:/usr/local/bin:$PATH"   # self-heal Debian/Parrot PATH
npm install                                    # install deps (node_modules/)
cp .env.example .env.local                     # optional: enable Supabase mode
./run-local.sh                                 # dev server at http://127.0.0.1:3000
```

With no `.env.local` (or placeholder values), the app runs in **Local Demo mode**
using browser localStorage. Add real Supabase credentials and apply
`supabase/schema.sql` to enable account-backed storage with RLS.

## Verification commands

```bash
./check-linux.sh                                   # typecheck + production build
python3 scripts/validate_catalog.py                # GRC catalogue integrity
python3 -m pytest backend/tests/ -q                # backend tests
```