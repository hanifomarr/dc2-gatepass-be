# Implementation Plan - Phase 5: Admin Dashboard & Reporting

## Goal Description
Provide administrators with a centralized dashboard to manage users, view system activity (entry logs), and monitor key statistics.

## User Review Required
> [!NOTE]
> **Scope**:
> This phase focuses on *read-only* reporting and basic user listing. Full user lifecycle management (create/edit/delete other users) is considered an enhancement but can be added if requested.

## Proposed Changes

### Core Features
#### [NEW] [src/services/admin.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/admin.service.ts)
-   `getUsers(role?)`: List users, optionally filtered by role.
-   `getEntryLogs(limit, offset)`: List global entry logs with pagination.
-   `getStats()`: Aggregate counts:
    -   Total Residents
    -   Total Visitors
    -   Active Passes
    -   Entries Today

#### [NEW] [src/controllers/admin.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/admin.controller.ts)
-   `getUsers`: Handler for user listing.
-   `getLogs`: Handler for logs.
-   `getStats`: Handler for dashboard stats.

#### [NEW] [src/routes/admin.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/admin.route.ts)
-   `GET /users` (Protected: Admin only)
-   `GET /logs` (Protected: Admin only)
-   `GET /stats` (Protected: Admin only)

#### [MODIFY] [src/routes/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/index.ts)
-   Mount `adminRoute` at `/admin`.

## Verification Plan

### Automated Tests
-   **Lint**: Check code quality.

### Manual Verification
-   **Admin Flow**:
    -   Login as Admin.
    -   `GET /api/v1/admin/stats`: Verify counts match DB.
    -   `GET /api/v1/admin/users`: Verify list of registered users.
    -   `GET /api/v1/admin/logs`: Verify recent entry/exit logs.
