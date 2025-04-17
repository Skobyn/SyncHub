# GrocerySync Hub – Status Review (2025‑04‑17)

## 1. Architectural Fit

✅ **Stack selection:** Django + DRF backend and Next.js (React 18) frontend is solid for a SaaS control-plane.

❌ **Missing layers:** Client Agent & Plugin system, RBAC details, audit trail, notifications, and advanced monitoring are not yet implemented.

## 2. Backend Review (`hub-backend`)

### Models
* Retailer, Agent, Destination, Job, and a custom User model exist.
* **Gaps vs PRD**
  * Destination missing *connection test* workflow & status fields.
  * Agent lacks version, OS, heartbeat interval, revocation fields.
  * Job lacks schedule validation, filtering options, run-now flag, and run-status history.
  * No models for `Log`, `AuditTrail`, `NotificationRule`, `PluginCatalog`.
  * Multi-tenant isolation not enforced (any user can read all retailers).

### API / ViewSets
* Plain `ModelViewSet` with `IsAuthenticated`. Needs:
  * Role-based permissions (Admin vs Technician).
  * Automatic queryset scoping to the user's retailer.
  * Pagination, search, ordering filters.
  * Throttling / rate limiting.

### Settings / Auth
* Uses env-vars—good.
* CORS only for localhost; will need dynamic origins for Cloud Run.
* TokenAuth present; consider JWT (dj-rest-auth simple-jwt) for stateless scale.

### Database & Performance
* No custom indexes → add where appropriate.
* Add `select_related`/`prefetch_related` on heavy querysets.

### Background Jobs / Scheduler
* Not implemented. Recommend Celery + Redis (or Cloud Tasks) & a beat scheduler.

### Testing & Quality
* `tests.py` empty. Need model & API tests; set up CI.

### Security
* Enforce strong password validators, 2FA, login-lockouts.
* Encrypt destination credentials (e.g., `django-fernet-fields` or KMS).

## 3. Frontend Review (`hub-frontend`)

* Only `RetailerList` & `AuthButton` exist.
* Needs CRUD UI for Retailers, Agents, Destinations, Jobs.
* Dashboards (global & per-retailer) with charts.
* Logs viewer with virtualized table for performance.
* Adopt TanStack Query (React Query) for caching & retries.
* Ensure env-driven API base URL in all environments.
* Accessibility: apply semantic HTML + ARIA.

## 4. Missing Layers

| Layer            | Key Requirements |
|------------------|------------------|
| **Client Agent** | API key auth, heartbeat, plugin loader, service installer, retry logic |
| **Plugin System**| ABC interfaces, versioning, connector & adapter sub-packages |
| **Notifications**| `NotificationRule` model, background task evaluation |
| **Audit Trail**  | Middleware or `django-simple-history` for user actions |

## 5. Cloud & DevOps

* Dockerfile & Cloud Build YAML already present.
* Plan: Postgres (Cloud SQL), Redis/MemoryStore, Cloud Run.
* Add health checks & structured (JSON) logging for Cloud Operations.
* Adopt Terraform/Pulumi for repeatable infra.

## 6. Recommendations / Next Steps

1. **Complete Data Model** – add missing tables and fields.
2. **Enforce RBAC & Multi-Tenant Isolation** – custom DRF permissions.
3. **Introduce Background Workers** – Celery Beat for job execution & heartbeats.
4. **Implement Plugin Interfaces** – base classes and reference implementations.
5. **Build Client Agent MVP** – CLI installer → background service.
6. **Expand Frontend** – sidebar navigation, React Query, form validation.
7. **Performance Hardening** – DB indexes, caching, API pagination.
8. **CI/CD & Quality Gates** – GitHub Actions, coverage thresholds.
9. **Security Enhancements** – JWT auth, Secret Manager, CSP headers.

---

Implementing these steps will align the codebase with the PRD and optimize for ease-of-use, scalability, and performance. 