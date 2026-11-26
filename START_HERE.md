# Complete Enterprise Technology, Security & GRC Project

This consolidated archive brings together the original CIO/CTO/CISO checklist materials, both standalone application builds, the extended 169-control catalogue, project documentation, corrected workbook, database schema, API starter and deployment scaffold.

## Start here

1. Read `README.md` for project scope, control counts and setup notes.
2. Open `app/index.html` for the current extended web application (standalone HTML; no server required).
3. See `app/releases/` for the original v1 and standalone v2 application files.
4. Review `docs/` for project charter, requirements, enterprise architecture, security architecture, IT audit, GRC, compliance, hardening, threat model, data model, operating model and roadmap.
5. Use `data/control_catalog.json` as the canonical structured catalogue and `data/control_catalog.csv` for spreadsheet-friendly use.
6. See `deliverables/` for the corrected Excel workbook. Original source documents are retained under `source/` and `original_inputs/`.

## Included scope

- Original checklist: 95 items across CIO, CTO, CISO, IT Infrastructure and Cross-Functional.
- Extended library: 74 additional controls across Enterprise Architecture, Security Architecture, IT Audit, GRC & Enterprise Risk, Security & Compliance and System Hardening.
- Combined catalogue: 169 controls across 11 domains.

## Important implementation boundary

The HTML application is a local browser application. Browser storage is local to that browser and does not provide multi-user synchronization. The FastAPI/PostgreSQL components are starter scaffolding, not a production-ready service. Authentication, authorization enforcement, multi-tenant isolation, assessment persistence, evidence handling, audit logging, integrations, security testing and production operations must be completed before enterprise deployment. Framework mappings are reference guidance, not certification or legal advice.
