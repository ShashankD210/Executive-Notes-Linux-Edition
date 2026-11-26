# Today's Launch Checklist

## Build & type safety
- [ ] `./check-linux.sh` exits 0 (typecheck + production build)
- [ ] `npm run build` prerenders `/` and `/_not-found` without errors

## Local run
- [ ] `./run-local.sh` starts the dev server on http://127.0.0.1:3000
- [ ] App loads in Local Demo mode with seeded C-Suite notes

## Supabase (only if account-backed storage is required)
- [ ] `.env.local` created from `.env.example` with real project credentials
- [ ] `supabase/schema.sql` applied in the Supabase SQL editor
- [ ] Sign-up / sign-in / password reset verified
- [ ] RLS: owner can CRUD; allocatee can read/update; only owner can delete

## GRC archive (if in scope)
- [ ] `python3 scripts/validate_catalog.py` → PASS (11 domains, 169 controls)
- [ ] `python3 -m pytest backend/tests/test_catalog.py -q` → passed

## Pre-commit hygiene
- [ ] `.env` / `.env.local` are NOT staged (covered by `.gitignore`)
- [ ] `node_modules/` and `.next/` are ignored