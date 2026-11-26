# Threat Model (Starter)

## Assets
Assessment records, evidence files, risk register, audit workpapers, user identities, framework mappings, integration secrets, audit events and management reports.

## Threat actors
External attacker; malicious/compromised user; compromised supplier; insider with excessive privileges; ransomware operator; compromised integration; accidental disclosure.

## Threat scenarios and mitigations
- Cross-tenant data access → tenant-scoped queries, object-level authorization, isolation tests.
- Evidence exfiltration → classification, least privilege, signed URLs, download audit, DLP where appropriate.
- Assessment tampering → immutable audit events, versioned assessments, separation of duties and approvals.
- Account takeover → SSO, MFA, conditional access, session protection and anomaly detection.
- Malicious file upload → allowlisted formats, malware scanning, content disarm/reconstruction where suitable, quarantine.
- API abuse → rate limits, schema validation, WAF, authz on every endpoint and monitoring.
- Integration compromise → scoped credentials, vault, rotation, webhook signatures and egress restrictions.
- Availability attack/data loss → backups, tested restore, resilience and incident response.

## Residual risk
Threat model must be revisited at design changes, new integrations, new evidence classes and material incidents. Risk acceptance must be owned by management, not by the platform team alone.
