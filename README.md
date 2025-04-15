# GrocerySync Hub - Support Edition

A centralized, multi-tenant platform for POS support companies to manage, automate, and monitor grocery item data exports from diverse client POS systems to various e-commerce platforms.

## Project Overview
GrocerySync Hub enables support technicians to efficiently configure, deploy, and monitor data integrations for hundreds of retail clients. The system consists of a Central Hub web application and lightweight Client Agents installed at each retailer. It features robust job scheduling, monitoring, logging, and a plugin architecture for extensibility.

## Architecture
- **Central Hub:** Web UI for management, job orchestration, monitoring, and API endpoint for agents. Multi-tenant, RBAC, dashboards, logging, plugin management.
- **Client Agent:** Service/daemon at each retailer, connects outbound to Hub, executes jobs using plugins, reports status/logs.
- **Plugin System:** POS connectors and destination adapters, loaded by Agent as needed.

## Key Features
- Centralized management of retailers, agents, jobs, and destinations
- Secure, outbound agent communication (HTTPS/TLS)
- Role-based access control (Admin, Technician)
- Real-time and historical monitoring, dashboards, and logs
- Extensible via plugin system for new POS and destination types

## Getting Started
1. **Clone the repository** (https://github.com/Skobyn/SyncHub)
2. **Backend Setup:**
   - See `hub-backend/README.md` for Django backend setup instructions.
3. **Directory Structure:**
   - `hub-backend/` - Django backend API (initialized)
   - `hub-frontend/` - Next.js frontend (React, TypeScript)
   - `agent/` - Go-based client agent
   - `plugins/` - POS and destination plugin implementations
   - `memory-bank/` - Project documentation and context
4. **Setup instructions** for each component will be provided in their respective directories.

## Status
- Project setup and documentation in progress.
- **Backend (Django) initialized in `hub-backend/`.**
- **Initial models for Users, Retailers, Agents, Destinations, Jobs defined.**
- **Custom user model configured and migrations applied.**
- **Next: Implement authentication and API structure.**
- See `memory-bank/` for detailed context and planning.

## License
TBD

## Development Workflow

To run the project locally:

1. **Start the backend (Django):**
   - Navigate to `hub-backend/` and activate the virtual environment.
   - Run `python manage.py runserver` (see `hub-backend/README.md` for details).
2. **Start the frontend (Next.js):**
   - Navigate to `hub-frontend/` and run `npm run dev`.
   - The frontend will be available at [http://localhost:3000](http://localhost:3000).
3. **API Communication:**
   - The Next.js frontend is configured to communicate with the Django backend API (CORS is enabled for local development). 