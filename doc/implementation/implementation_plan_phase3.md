# Implementation Plan - Phase 3: Guard Operations & Entry Management

## Goal Description
Empower guards to verify visitors and manage entry/exit flows. This involves scanning QR codes, validating passes, and recording entry/exit logs in the database.

## User Review Required
> [!NOTE]
> **Entry/Exit Logic**:
> - **Check-in**: Validates pass is ACTIVE and within valid time. Sets status to USED (if single use) or keeps ACTIVE (if recurring/multi-entry - *assuming single use for now based on PRD "Passes" entity having USED status*).
> - **Check-out**: Records exit time.

## Proposed Changes

### Database Schema Updates
#### [MODIFY] [prisma/schema.prisma](file:///Users/hanifomar/Documents/express-scaffold/prisma/schema.prisma)
-   **New Model**:
    -   `EntryLog`: Records entry and exit events.
        -   `id`, `passId`, `guardId`, `action` (CHECK_IN, CHECK_OUT), `timestamp`.
-   **Enums**:
    -   `EntryAction`: CHECK_IN, CHECK_OUT.

### Core Features
#### [NEW] [src/services/gate.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/gate.service.ts)
-   `validatePass(code)`: Check if pass exists, is active, and valid time.
-   `checkIn(code, guardId)`: Validate pass -> Create EntryLog (CHECK_IN) -> Update Pass status (if needed).
-   `checkOut(passId, guardId)`: Create EntryLog (CHECK_OUT).

#### [NEW] [src/controllers/gate.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/gate.controller.ts)
-   `scan`: Validate QR code and return pass details.
-   `checkIn`: Execute check-in logic.
-   `checkOut`: Execute check-out logic.

#### [NEW] [src/routes/gate.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/gate.route.ts)
-   `POST /scan` (Protected: Guard only)
-   `POST /check-in` (Protected: Guard only)
-   `POST /check-out` (Protected: Guard only)

#### [MODIFY] [src/routes/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/index.ts)
-   Mount `gateRoute` at `/gate`.

## Verification Plan

### Automated Tests
-   **Prisma Push**: Update DB schema.
-   **Lint**: Check code quality.

### Manual Verification
-   **Scan Pass**:
    -   Login as Guard.
    -   `POST /api/v1/gate/scan` with valid QR code string.
    -   Verify response contains pass details.
-   **Check-in**:
    -   `POST /api/v1/gate/check-in`.
    -   Verify `EntryLog` created in DB.
    -   Verify Pass status updated (if applicable).
