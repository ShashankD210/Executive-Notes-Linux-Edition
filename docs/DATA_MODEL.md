# Data Model & Entity Relationships

## Core entities
- Tenant, User, Role, UserRole, DomainAssignment.
- Domain, Control, Framework, FrameworkControlMapping.
- Assessment, ControlAssessment, EvidenceObject, EvidenceAccessEvent.
- Risk, RiskControl, RiskTreatment, RiskAcceptance.
- AuditEngagement, AuditTest, AuditSample, Finding, RemediationAction.
- Obligation, Policy, PolicyVersion, ComplianceMapping.
- Asset, ConfigurationAssessment, HardeningException.
- WorkflowTask, Notification, AuditEvent, IntegrationConnection.

## Key design rules
- UUID primary keys; tenant_id on all tenant-owned records.
- Stable human-readable control IDs (e.g., CIO-01, EA-01).
- Version control for catalogue and framework mappings; never silently rewrite historic assessment context.
- Assessment records are time-bound snapshots; re-assessment creates a new record.
- Evidence binary content resides in encrypted object storage; database stores metadata, hash and access policy.
- Audit events are append-only and exported to protected immutable storage/SIEM.
- Soft deletion only where policy permits; legal hold and retention take precedence.
