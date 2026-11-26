# On-Premises / Self-Hosted Recommendations

For environments where data must remain inside your own datacenter (regulated,
air-gapped, or private cloud).

## Recommended stack (Linux)

| Layer | Recommendation |
|---|---|
| OS | Ubuntu 22.04/24.04 LTS, RHEL/Rocky 9, or Debian 12 |
| Runtime | Docker Engine + Docker Compose (small) or Kubernetes (k3s/RKE2/OpenShift) |
| Web / app | Next.js container (`node:22-alpine`) behind Nginx/Traefik reverse proxy |
| DB | PostgreSQL 16 (self-managed) with automated backups/PITR |
| Auth | Integrate with corporate IdP (OIDC/SAML) via the app or an identity proxy |
| TLS | Internal CA or Let's Encrypt via reverse proxy; mTLS for service-to-service |

## Quick start with Docker Compose (GRC database)

```bash
cd hosting
cp .env.example .env            # set a strong POSTGRES_PASSWORD
docker compose up -d db
```

The compose file binds Postgres to `127.0.0.1:5432` only — do not expose it publicly.

## Running the Next.js app on-prem

```bash
# Build once on a connected machine, then transfer the image
docker build -t executive-notes:local .
# Run behind your reverse proxy
docker run -d --name execnotes -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... \
  executive-notes:local
```

For **fully offline** installs, mirror the base images and npm packages into your
internal registry, and use Local Demo mode (no Supabase) if no external services
are permitted.

## Kubernetes notes
- Deploy the Next.js app as a `Deployment` + `Service` (ClusterIP) behind an
  `Ingress` (Nginx/Traefik) with TLS.
- Run PostgreSQL via an operator (e.g., CloudNativePG) or a managed internal DB.
- Store secrets in Kubernetes `Secret`s / external secret manager, not in images.
- Add liveness/readiness probes on `/` and resource requests/limits.

## Air-gapped / high-security
- No egress: vendor all images and dependencies into an internal mirror.
- Enable audit logging to a write-once store; keep `audit_events` append-only.
- Scan images (Trivy/Grype) and enforce signed images (cosign) in CI.
- Network segmentation: app, DB, and management planes on separate VLANs.

## Production hardening checklist (on-prem)
- [ ] TLS everywhere; strong DB passwords; no default credentials.
- [ ] Automated Postgres backups with tested restore.
- [ ] Reverse proxy rate limiting + WAF for public endpoints.
- [ ] Append-only audit log shipping to SIEM.
- [ ] Patching cadence for OS, Node, Postgres, and base images.
- [ ] FastAPI scaffold completed (auth, authz, tenant isolation) before exposure.