# Enterprise Technology, Security & GRC Readiness Project

**Project version:** 2.0 (starter project)  
**Control library:** 169 controls across 11 domains  
**Status:** Local browser application + documented production architecture + backend starter scaffold.

## What is included

- `source/` — original supplied PDF, workbook and workflow image.
- `app/index.html` — current extended standalone web application (local browser storage).
- `app/releases/` — original v1 standalone application build.
- `data/control_catalog.json` — canonical structured control library (95 original + 74 extended).
- `data/control_catalog.csv` — flat export of the same control library.
- `docs/` — project charter, requirements, enterprise architecture, security architecture, IT audit, GRC, security & compliance, system hardening, data model, threat model and operating model.
- `database/schema.sql` — PostgreSQL starter schema.
- `backend/` — FastAPI starter service with health and control-catalog endpoints; assessment persistence/authentication are intentionally marked as implementation work.
- `deployment/` — Docker Compose for local PostgreSQL and environment template.
- `scripts/` — catalog validation and corrected workbook formula repair.
- `deliverables/` — corrected workbook copy; original source workbook remains unchanged in `source/`.

## Start the web application (no server required)

Open `app/index.html` in a modern browser. The standalone application stores assessment changes in that browser's local storage. Export a JSON backup regularly. It is not multi-user and does not synchronize between devices.

## Start the API/database scaffold

1. Install Docker Desktop / Docker Engine and Docker Compose.
2. Copy `deployment/.env.example` to `deployment/.env` and change the sample password.
3. From the project root run `docker compose -f deployment/docker-compose.yml --env-file deployment/.env up -d db`.
4. Create a Python virtual environment in `backend/`, install `backend/requirements.txt`, set `DATABASE_URL` and run `uvicorn app.main:app --reload` from `backend/`.
5. Open `/docs` on the local API server for the starter OpenAPI interface.

The API currently exposes health and read-only control-catalog routes. It is a scaffold, not a production-ready identity, authorization, audit-evidence or assessment persistence service. Do not expose it to the internet or load sensitive evidence until the controls in `docs/SECURITY_ARCHITECTURE.md` and `docs/IMPLEMENTATION_ROADMAP.md` are implemented and tested.

## Canonical control counts

| Domain | Count |
|---|---:|
| CIO | 18 |
| CTO | 16 |
| CISO | 19 |
| IT Infrastructure | 36 |
| Cross-Functional | 6 |
| Enterprise Architecture | 12 |
| Security Architecture | 12 |
| IT Audit | 12 |
| GRC & Enterprise Risk | 12 |
| Security & Compliance | 12 |
| System Hardening | 14 |
| **Total** | **169** |

## Source and interpretation notes

The five original checklist domains and their 95 items are retained from the supplied source workbook and PDF. The six additional domains and 74 controls are the extended control library from the preceding application build. Framework references are guidance mappings, not certification, legal advice, or a representation that all framework requirements are covered. Validate applicability with the organization's risk owners, auditors and qualified legal/privacy advisers.

## Important workbook correction

The supplied workbook's `% Complete` summary formula divided `Total Items` by the `Completed` row, which is logically reversed. The corrected deliverable calculates completed divided by applicable items (total less N/A). The High Priority Open count also excludes N/A. The original workbook is preserved unchanged under `source/`.
