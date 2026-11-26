# Product Requirements

## User roles
1. Executive viewer — portfolio status, risk exposure, overdue actions and reports.
2. Domain owner — manage assigned domain assessments and remediation.
3. Control owner — update assigned controls and attach evidence.
4. Assessor / auditor — test design and operating effectiveness, record workpapers and findings.
5. GRC administrator — maintain framework mappings, risks, obligations and review cycles.
6. Platform administrator — users, tenant configuration, integrations and audit configuration.

## Functional requirements
- Browse and search all 11 domains and 169 controls.
- Filter by domain, category, priority, status, owner, framework and due date.
- Record assessment, applicability rationale, evidence reference, assessor, date, notes and remediation action.
- Support risk register, control-to-risk mapping, framework crosswalk, audit engagement, findings and remediation tracking.
- Calculate completion against applicable controls (exclude N/A from denominator); distinguish completed, in-progress, not-started and N/A.
- Track evidence metadata, retention classification, source, integrity hash and access permissions.
- Export authorized data to CSV/PDF/JSON and retain export audit events.
- Maintain immutable or tamper-evident audit events for material changes.

## Non-functional requirements
- SSO/MFA, least privilege, tenant isolation and secure session management.
- Encryption in transit and at rest; managed keys and secrets.
- Accessible responsive interface; keyboard navigation and WCAG 2.2 AA target.
- API validation, rate limits, secure headers, dependency scanning and security testing.
- Backups with tested recovery objectives; monitoring and incident response.
- Data residency, retention and deletion policies configurable by tenant/jurisdiction.

## Acceptance criteria
- Catalogue count and IDs validate against the source baseline.
- Formula tests verify 0%, partial, 100%, and all-N/A calculations.
- Role tests prove users cannot access unassigned tenants/domains/evidence.
- All material assessment and administrative changes are auditable.
- Restore test meets approved RPO/RTO.
