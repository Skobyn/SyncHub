# Product Context: GrocerySync Hub - Support Edition

## Why the Project Exists
Support companies for grocery POS systems face challenges managing data exports for many clients, each with unique POS systems and e-commerce destinations. Manual processes are error-prone, time-consuming, and hard to monitor at scale.

## Problems Solved
- Centralizes management of export jobs for hundreds of retailers.
- Automates and standardizes data flows from POS to e-commerce platforms.
- Provides real-time and historical visibility into job status, agent health, and system activity.
- Reduces technician workload and troubleshooting time.
- Ensures secure, auditable handling of sensitive credentials and data.

## User Experience Goals
- Intuitive, role-based web UI for support technicians and admins.
- Easy onboarding of new retailers and agents.
- Simple configuration of POS and destination plugins per client.
- Clear dashboards and actionable error messages.
- Fast access to logs and job history for troubleshooting.

## How It Works (Overview)
- Technicians use the Central Hub UI to configure retailers, agents, jobs, and destinations.
- Each retailer runs a Client Agent, which connects outbound to the Hub, receives job configs, and executes exports using plugins.
- Agents report status and logs back to the Hub for monitoring and troubleshooting.
- The system is extensible via plugins for new POS and destination types. 