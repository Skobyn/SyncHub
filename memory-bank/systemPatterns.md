# System Patterns: GrocerySync Hub - Support Edition

## Architecture Overview
- **Hub-and-Agent Model:**
  - Central Hub: Web app for management, orchestration, monitoring, and API endpoint for agents.
  - Client Agent: Lightweight service/daemon at each retailer, connects outbound to Hub, executes jobs using plugins.
- **Multi-Tenancy:** Strict data isolation per retailer in Hub DB and logic.
- **Plugin System:**
  - POS Connectors and Destination Adapters implement standard interfaces.
  - Agent loads plugins dynamically based on job config.
- **Secure Communication:** All agent-hub comms over HTTPS/TLS. Agent initiates all connections.
- **RBAC:** Admin and Technician roles in Hub, enforced throughout UI and API.
- **Job Orchestration:** Hub defines schedules, agents execute jobs, report status/logs.

## Key Technical Decisions
- Use of relational DB (e.g., PostgreSQL) for multi-tenant data and logs.
- Web-based UI for Hub (React/Vite suggested), scalable backend (Python/Django suggested).
- Agent designed for Windows (cross-platform desirable), lightweight runtime (Go or .NET Core suggested).
- Secure credential storage (encrypted at rest, hashed passwords).
- Modular, extensible codebase for both Hub and Agent.

## Component Relationships
- Hub manages users, retailers, agents, jobs, destinations, plugins.
- Agent registers with Hub, receives config, executes jobs, reports status/logs.
- Plugins encapsulate POS and destination logic, loaded by Agent as needed.
- Dashboards and logs in Hub aggregate and visualize system state for users. 