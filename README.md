# Executive Notes — Linux Edition

A focused, private workspace for executive notes, board decisions, strategy, and task delegation. The repository also bundles a **GRC Readiness archive** (169-control governance/risk/compliance catalogue, docs, FastAPI starter, and PostgreSQL schema) — see [`GRC_README.md`](GRC_README.md) and [`START_HERE.md`](START_HERE.md).

For project layout see [`STRUCTURE.md`](STRUCTURE.md); for deployment see the [`hosting/`](hosting/README.md) folder.

---

## Features

- **Executive Note Management**: Create, edit, search, pin, categorize, and prioritize private executive notes.
- **Note Allocation & Delegation**:
  - **Allocate to User**: Assign any note to an executive colleague, board member, or team member via email or name.
  - **Quick Allocate Buttons**: Instant one-click allocation to self, or executive roles (COO, CTO) in demo mode.
  - **Allocation Status Badges**: Note cards in the sidebar clearly display assignment status (`👤 Allocated to you` or `👤 Allocated to: <user>`).
- **Team Member Management**: C‑Suite users can create and assign notes to team members per role; data persists in local demo mode.
  - **Smart Allocation Filters**:
    - **All**: All accessible notes.
    - **My notes**: Notes authored by you that are not delegated away.
    - **Allocated to others**: Notes delegated out to colleagues.
    - **Allocated to me**: Notes assigned/allocated to your account.
  - **Comprehensive Search**: Filters notes by title, body content, category, and assignee/delegator.
- **Dual Mode Support**:
  - **Local Demo Mode**: Zero configuration required. Stores notes and allocations securely in your browser's local storage.
  - **Account-Backed Supabase Mode**: Enterprise-grade multi-user synchronization with strict PostgreSQL Row-Level Security (RLS).

---

## Requirements

- **Operating System**: Linux (Ubuntu, Debian, Parrot Security, Fedora, Linux Mint, or another current distribution)
- **Node.js**: Node.js 20 or newer (Node.js 22 LTS recommended)
- **Package Manager**: npm 9+
- **Internet Access**: Required only for initial `npm install` package downloads

---

## Quick Start

### 1. Run Locally (Development Server)

Run the local development helper:

```bash
./run-local.sh
```

Then visit [http://127.0.0.1:3000](http://127.0.0.1:3000) in Firefox or your browser.

*Note: The helper binds to `127.0.0.1` for local machine access. Keep the terminal window open; press `Ctrl+C` to stop.*

### 2. Verify and Build (Validation Pipeline)

Run the automated Linux validation pipeline:

```bash
./check-linux.sh
```

This script verifies your Node.js version, ensures dependencies are installed, runs ESLint (`eslint .`), TypeScript typechecking (`tsc --noEmit`), and executes a production build (`next build`).

---

## Manual Setup & Commands

If you prefer running commands manually:

```bash
# Ensure /usr/bin is in your PATH
export PATH="/usr/bin:/usr/local/bin:$PATH"

# Install project dependencies
npm install

# Lint the codebase (ESLint flat config)
npm run lint

# Typecheck TypeScript files without emitting output
npm run typecheck

# Create an optimized production build
npm run build

# Start the development server
npm run dev

# Start the production server (after npm run build)
npm run start
```

---

## Note Allocation & Row-Level Security (RLS)

When running in Supabase mode, note allocation is enforced at the database level using PostgreSQL Row-Level Security:

- **Authorship (`user_id`)**: Recorded upon note creation and preserved across edits.
- **Assignee (`allocated_to`)**: Stores the email or user ID of the allocated colleague.
- **Delegator (`allocated_by`)**: Stores the email of the person who delegated the note.
- **Security Policies**:
  - **Read (`SELECT`)**: Users can only access notes they created OR notes explicitly allocated to their email/user ID.
  - **Collaborate (`UPDATE`)**: Both the note owner and the assigned recipient can update content and action items.
  - **Delete (`DELETE`)**: Only the original creator/owner (`auth.uid() = user_id`) is permitted to permanently delete notes.

---

## Connecting Supabase (Account-Backed Storage)

To switch from Local Demo mode to a production or development Supabase project:

1. Copy the environment configuration template:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and configure your project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   # Or legacy anon key:
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
3. In your Supabase SQL Editor, execute [`supabase/schema.sql`](supabase/schema.sql) to apply the table definition, indexes, and RLS policies.
4. Restart the development server (`./run-local.sh`).

---

## Environment & Diagnostics Reference

- **`$PATH` Self-Healing**: On some Debian/Parrot Linux configurations, `/bin/npm` is a relative symlink to `../share/nodejs/...` which fails if `/usr/bin` is not in `$PATH`. Both `run-local.sh` and `check-linux.sh` automatically prepend `/usr/bin:/usr/local/bin` to `$PATH`.
- **Telemetry**: Next.js telemetry is automatically disabled via `NEXT_TELEMETRY_DISABLED=1` in the helper scripts to eliminate network latency and timeouts during offline or sandboxed builds.
- **Node.js Advisory**: `@supabase/supabase-js` deprecates Node.js 20 for future releases; upgrading to Node.js 22 LTS is recommended for future package upgrades.

---

## Validation Status

Verified on 2026-11-26 (Next.js 16.4.6, Node.js v20.19.2):

- [x] **Dependencies**: Installed via `npm install` (`node_modules` present, `package-lock.json` generated).
- [x] **Lint**: `npm run lint` (ESLint flat config) passes with 0 errors / 0 warnings.
- [x] **TypeScript**: `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
- [x] **Production Build**: `npm run build` compiles and prerenders static routes cleanly.
- [x] **Note Allocation Feature**: Implemented across UI and database schema.
- [x] **GRC Catalog**: `python3 scripts/validate_catalog.py` → PASS (11 domains, 169 controls, unique IDs).
- [x] **Backend Tests**: `python3 -m pytest backend/tests/` → 1 passed.
- See [`VALIDATION_STATUS.md`](VALIDATION_STATUS.md) and [`TODAY_LAUNCH_CHECKLIST.md`](TODAY_LAUNCH_CHECKLIST.md) for details.

> Node.js 22 LTS is recommended; `@supabase/supabase-js` deprecates Node.js 20 for future releases.

## Hosting & Deployment

Cloud and on-premises hosting recommendations, plus Docker Compose for local PostgreSQL, live in the [`hosting/`](hosting/README.md) folder:

- **Cloud (fastest)**: Vercel (Next.js) + Supabase (auth/Postgres/RLS).
- **Cloud (enterprise)**: AWS (Amplify/ECS + RDS/Cognito) or Azure (App Service + Entra + Postgres Flexible).
- **On-prem**: Docker Compose / Kubernetes on Linux + self-managed Postgres; air-gapped via internal image mirror.

## Recent changes

- Added ESLint (`eslint.config.mjs`, `npm run lint`) and fixed all lint warnings; lint is now part of `check-linux.sh`.
- Upgraded to **Next.js 16.4.6** and applied the required `tsconfig` changes; lint, typecheck, and build verified.
- Added a dedicated **`hosting/`** folder (cloud + on-premises guides, `docker-compose.yml`, `.env.example`) moved from `deployment/`.
- Added `run-local.sh`, `check-linux.sh`, and `.env.example` referenced by this README.
- Renamed the misnamed `gitignore` to `.gitignore`; removed the dead `pages/_document.tsx`.
- Removed duplicate/unwanted files (duplicate `original_inputs/`, stray screenshot, duplicate release HTML) and regenerated `FILE_INVENTORY.md`.
- Added [`STRUCTURE.md`](STRUCTURE.md) documenting the project layout; renamed GRC readme to `GRC_README.md`.
