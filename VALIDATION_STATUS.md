# Validation Status

_Last verified: 2026-11-26_

## Executive Notes (Next.js app)

- [x] **Dependencies**: Installed via `npm install` (`node_modules` present, `package-lock.json` generated).
- [x] **TypeScript**: `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
- [x] **Production Build**: `npm run build` (`next build`) compiles and prerenders static routes cleanly.
- [x] **Note Allocation Feature**: Implemented across UI and database schema (`supabase/schema.sql`).
- [x] **Dev server smoke test**: `next dev` serves `GET /` → HTTP 200 with correct title/content.
- [x] **Structure documented**: See [`STRUCTURE.md`](STRUCTURE.md).

### Environment notes

- Verified on Node.js v20.19.2.
- Node.js 22 LTS is recommended: `@supabase/supabase-js` deprecates Node.js 20 for future releases.
- `npm install` reports engine warnings on Node 20; these are non-fatal.

## GRC archive

- [x] **Catalog integrity**: `python3 scripts/validate_catalog.py` → `PASS: 11 domains, 169 controls, unique IDs`.
- [x] **Backend tests**: `python3 -m pytest backend/tests/test_catalog.py` → 1 passed.

## How to reproduce

```bash
./check-linux.sh            # typecheck + production build
python3 scripts/validate_catalog.py
python3 -m pytest backend/tests/test_catalog.py -q
```