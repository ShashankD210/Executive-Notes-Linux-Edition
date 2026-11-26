# Security Architecture

## Security objectives
Confidentiality, integrity, availability, accountability, tenant isolation, evidence integrity and least-privilege administration. Treat uploaded evidence and exported reports as potentially sensitive business records.

## Trust boundaries and controls
1. User/browser to edge: TLS 1.2+ (prefer TLS 1.3), WAF, secure headers, rate limiting, bot protection where appropriate.
2. Edge to API: private service networking, authenticated service identity, strict CORS, request size limits.
3. API to data: private database subnet, TLS, parameterized queries, scoped service accounts, connection secrets from a vault.
4. API to evidence store: private endpoints, encryption, malware scanning, content-type validation, size limits, short-lived signed URLs and object-level authorization.
5. Integrations: OAuth2 client credentials or signed webhooks, allowlisted endpoints, secret rotation, replay protection and connector-specific scopes.

## Identity and authorization
- Federate with enterprise IdP using OIDC or SAML; require MFA for privileged and remote access.
- RBAC roles: ExecutiveViewer, DomainOwner, ControlOwner, Auditor, GRCAdmin, TenantAdmin, PlatformAdmin.
- Add attribute-based checks for tenant, domain, assignment, evidence classification and engagement scope.
- Deny by default; enforce authorization on every API request and object lookup.
- Separate platform administration from control attestation and audit approval.
- Use short-lived sessions, secure/HttpOnly/SameSite cookies, CSRF protection where cookie auth is used, and re-authentication for sensitive actions.

## Data protection
- Classify evidence (Public / Internal / Confidential / Restricted) and define handling rules.
- Encrypt databases, backups and object storage; manage keys in KMS/HSM with rotation and separation of duties.
- Minimize personal data; define retention, legal hold and verified deletion.
- Record evidence hash (e.g., SHA-256), uploader, timestamp, source and version; do not treat hash alone as proof of truth.
- Never store passwords, API keys or secrets in checklist notes or evidence attachments.

## Secure engineering
Threat model changes; SAST, SCA, secret scanning, IaC scanning, DAST and penetration tests; signed build artifacts; SBOM; protected branches; peer review; dependency pinning; vulnerability SLAs; secure error handling; output encoding; parameterized database access.

## Detection and response
Centralize authentication, authorization, evidence access, exports, admin changes and integration events in SIEM. Alert on privilege escalation, repeated failures, mass export, unusual evidence access and audit-log tampering. Maintain incident playbooks and test them.

## Required release gates
No production release until SSO/MFA, tenant/object authorization, audit logging, encryption, backup restore, vulnerability remediation, penetration testing, privacy review and incident response ownership are verified.
