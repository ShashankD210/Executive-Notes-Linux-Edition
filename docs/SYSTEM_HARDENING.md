# System Hardening Standard

## Scope
Servers, workstations, laptops, mobile devices, network devices, hypervisors, containers, Kubernetes, cloud services, databases, identity platforms and security appliances.

## Baseline process
1. Inventory assets and identify owner, environment, business criticality and exposure.
2. Select an approved baseline (CIS Benchmark, vendor security baseline or organization standard) for the exact product/version.
3. Test baseline in a representative non-production environment.
4. Apply configuration through managed policy/configuration tooling.
5. Validate settings with authenticated compliance scans and configuration evidence.
6. Record exceptions with risk, compensating controls, owner, approver and expiry.
7. Monitor drift and revalidate after major changes and on a defined cadence.

## Minimum control families
- Secure boot, firmware/BIOS controls and hardware inventory.
- Supported OS/software versions; remove unsupported components and unnecessary services.
- Patch and vulnerability management with risk-based SLAs.
- Strong authentication, MFA, privileged access management and separate admin accounts.
- Host firewall, endpoint protection/EDR, disk encryption and secure remote access.
- Logging, time synchronization, central monitoring and tamper protection.
- Network segmentation, management-plane isolation and restricted administrative protocols.
- Secure configuration for TLS, cryptographic protocols, certificates and key storage.
- Application allowlisting where appropriate; script and macro controls.
- Backup protection, immutable/offline copies and restore tests.
- Cloud IAM, public exposure controls, metadata service protection, storage encryption and configuration posture monitoring.
- Database least privilege, audit logging, encryption, secure listener configuration and backup protection.
- Container image provenance, minimal base images, non-root execution, read-only filesystems where feasible, secrets management and admission policy.

## Measurement
Track compliant assets / in-scope assets, critical misconfigurations, aged exceptions, unsupported assets, patch SLA attainment, configuration drift and repeat findings. Define coverage and exclusions so percentages are meaningful.

## Safety
Do not apply generic hardening commands blindly to production. Validate vendor guidance, dependencies, operational impact, rollback and maintenance windows. Preserve required availability and recovery paths.
