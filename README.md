# Executive Notes — Linux Edition

A focused, private workspace for executive notes, board decisions, strategy, and task delegation.

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

This script verifies your Node.js version, ensures dependencies are installed, runs TypeScript typechecking (`tsc --noEmit`), and executes a production build (`next build`).

---

## Manual Setup & Commands

If you prefer running commands manually:

```bash
# Ensure /usr/bin is in your PATH
export PATH="/usr/bin:/usr/local/bin:$PATH"

# Install project dependencies
npm install

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

- [x] **Dependencies**: Fully installed (`node_modules` present, audited).
- [x] **TypeScript**: Verified (`tsc --noEmit` passes with 0 errors).
- [x] **Production Build**: Verified (`next build` compiles and prerenders static routes cleanly).
- [x] **Note Allocation Feature**: Implemented, styled, and validated across UI and database schema.
- [x] **Pipeline Verification**: Executed `./check-linux.sh` successfully with exit code `0`.
- See [`VALIDATION_STATUS.md`](VALIDATION_STATUS.md) and [`TODAY_LAUNCH_CHECKLIST.md`](TODAY_LAUNCH_CHECKLIST.md) for complete verification gates.

## Recent changes

- Refactored C‑Suite member definitions and helper into a dedicated module **`app/csuite.ts`**, and updated imports in `app/page.tsx` to resolve the extra‑export TypeScript error.
- Added quick‑allocate chip tray and C‑Suite filter UI enhancements.
- Updated documentation to reflect the new module structure and the successful production build.
- Noted the Supabase client warning about Node.js 20 deprecation (upgrade to Node.js 22 recommended).
