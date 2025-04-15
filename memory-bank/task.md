# Task List: GrocerySync Hub - Support Edition

This file tracks the development tasks for the project.

## Status Key
- `[ ]` To Do
- `[/]` In Progress
- `[x]` Done

## Phase 1: Core Infrastructure & MVP Setup (Backlog)

### Project Setup & Foundation
- [ ] Set up Git repository.
- [ ] Define initial project directory structure (Hub Backend, Hub Frontend, Agent, Plugins).
- [ ] Choose and set up Hub backend framework/language (e.g., Python/Django).
- [ ] Choose and set up Hub frontend framework/language (e.g., React/Vite).
- [ ] Choose and set up Agent language/runtime (e.g., Go).
- [ ] Design and implement initial database schema (e.g., PostgreSQL) including core tables for `Users`, `Retailers`, `Agents`, `Destinations`, `Jobs`. Ensure multi-tenancy (`retailer_id`).
- [ ] Set up basic CI/CD pipeline placeholder.

### Central Hub - Backend API & Core Logic
- [ ] Implement User Authentication/Authorization (Tech login, JWT/session handling).
- [ ] Implement basic RBAC (Admin, Tech roles).
- [ ] Implement secure API endpoint for Agent registration (generates unique API Key/Secret per agent).
- [ ] Implement secure API endpoint for Agent check-in & status reporting.
- [ ] Implement secure API endpoint for Agent to submit logs.
- [ ] Implement CRUD API for `Retailers` entity (bound to authenticated user/permissions).
- [ ] Implement CRUD API for `Destinations` entity (per retailer).
- [ ] Implement CRUD API for `Jobs` entity (per retailer, basic definition).
- [ ] Implement API endpoint for Hub to send commands to a waiting Agent (e.g., "Run Job").

### Central Hub - Frontend UI (MVP)
- [ ] Set up basic frontend routing.
- [ ] Create Login page component.
- [ ] Create main application layout (sidebar navigation, header).
- [ ] Create basic Global Dashboard placeholder.
- [ ] Create Retailer List page (fetch and display retailers from API).
- [ ] Create Retailer Detail view placeholder (shows basic info, agent status).
- [ ] Create basic Agent Status display component (using data from API).
- [ ] Create basic UI for viewing logs (initially unfiltered list).

### Client Agent (Core)
- [ ] Implement basic agent structure (run as background service/daemon).
- [ ] Implement loading configuration (Hub URL, API Key/Secret from file/env).
- [ ] Implement secure HTTPS client for Hub API communication.
- [ ] Implement Agent registration sequence with Hub.
- [ ] Implement periodic check-in/heartbeat to Hub.
- [ ] Implement basic status reporting function (send status update to Hub).
- [ ] Implement basic log submission function (send log entries to Hub).
- [ ] Implement basic command polling/receiving mechanism from Hub.

### Plugin System (Foundation)
- [ ] Define initial draft of `IPosConnector` interface (e.g., `Connect()`, `GetItems()`).
- [ ] Define initial draft of `IDestinationConnector` interface (e.g., `Connect()`, `UploadData()`).
- [ ] Implement basic plugin loading mechanism placeholder in Agent (e.g., load from specific directory).

### MVP Feature - Simple CSV to SFTP Export
- [ ] Develop simple POS Plugin: `CsvFileConnector` (reads item data from a predefined local CSV).
- [ ] Develop simple Destination Plugin: `SftpConnector` (connects and uploads a file via SFTP).
- [ ] Enhance Hub Job definition (API, DB, UI) to select POS/Destination plugin types.
- [ ] Enhance Hub Destination definition (API, DB, UI) for SFTP credentials.
- [ ] Implement Agent logic to:
    - Receive "Run Job X" command.
    - Identify required POS and Destination plugins based on job config (fetched from Hub).
    - Load and instantiate the `CsvFileConnector`.
    - Load and instantiate the `SftpConnector` with credentials (fetched from Hub).
    - Execute `CsvFileConnector.GetItems()`.
    - Execute `SftpConnector.UploadData()` with the retrieved items.
    - Report Success/Failure status and basic logs back to Hub.
- [ ] Display basic job status/result in Hub UI (per retailer).

## Phase 2: Core Functionality (Backlog - Requires Phase 1)
- [ ] Implement Job Scheduling in Hub (UI, Backend logic, DB).
- [ ] Implement Hub logic to push scheduled job commands to Agents.
- [ ] Implement robust log viewing/filtering in Hub UI (global & per-retailer).
- [ ] Implement UI for configuring Destinations per retailer (with credential handling).
- [ ] Implement UI for configuring Jobs per retailer (linking POS, Dest, Schedule).
- [ ] Develop additional core POS Plugins (e.g., for 1-2 specific POS DBs/APIs).
- [ ] Develop additional core Destination Plugins (e.g., Shopify API, WooCommerce API).
- [ ] Refine Agent error handling and retries (network, job failures).
- [ ] Implement Hub Configuration Backup mechanism.
- [ ] Implement basic Data Retention policy for logs in Hub DB.
- [ ] Create Agent Installer package (e.g., MSI for Windows).

## Phase 3: Scale & Usability (Backlog)
- ... (Tasks for advanced reporting, dashboards, plugin management UI, RBAC refinement, Agent resilience improvements) ...

## Phase 4: Advanced Features (Backlog)
- ... (Tasks for NLP, advanced mapping, agent self-update) ...

## In Progress
- [/] ... (Move tasks here as they are worked on) ...

## Done
- [x] ... (Move tasks here upon completion) ...