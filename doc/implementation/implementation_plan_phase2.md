# Implementation Plan - Phase 2: Core Resident & Visitor Flow

## Goal Description
Enable residents to manage their units, invite visitors, and generate QR code passes. This involves updating the database schema to support these entities and implementing the necessary API endpoints.

## User Review Required
> [!NOTE]
> **QR Code**: I will use the `qrcode` library to generate QR code data URLs (base64 images) that can be easily displayed on the frontend or shared.

## Proposed Changes

### Database Schema Updates
#### [MODIFY] [prisma/schema.prisma](file:///Users/hanifomar/Documents/express-scaffold/prisma/schema.prisma)
-   **New Models**:
    -   `Unit`: Represents a house/unit. Linked to a Resident (User).
    -   `Visitor`: Represents a guest. Linked to a Resident.
    -   `Pass`: Represents an entry pass. Linked to Visitor and Resident. Contains QR code data and validity.
-   **Enums**:
    -   `PassStatus`: ACTIVE, USED, EXPIRED, CANCELLED.
    -   `VisitorType`: GUEST, DELIVERY, CONTRACTOR, PARENT.

### Core Features
#### [MODIFY] [package.json](file:///Users/hanifomar/Documents/express-scaffold/package.json)
-   Install `qrcode` and `@types/qrcode`.

#### [NEW] [src/services/qr.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/qr.service.ts)
-   `generateQRCode(data: string)`: Returns a base64 data URL.

#### [NEW] [src/services/visitor.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/visitor.service.ts)
-   `createVisitor(data)`: Create visitor record.
-   `createPass(visitorId, residentId, data)`: Generate unique code, create Pass record, generate QR.
-   `getVisitorHistory(residentId)`: Fetch past visitors/passes.

#### [NEW] [src/controllers/visitor.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/visitor.controller.ts)
-   `inviteVisitor`: Validate input -> Create Visitor -> Create Pass -> Return QR.
-   `getHistory`: Return list of passes.

#### [NEW] [src/routes/visitor.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/visitor.route.ts)
-   `POST /invite` (Protected: Resident only)
-   `GET /history` (Protected: Resident only)

#### [MODIFY] [src/routes/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/index.ts)
-   Mount `visitorRoute` at `/visitors`.

## Verification Plan

### Automated Tests
-   **Prisma Push**: Update DB schema.
-   **Lint**: Check code quality.

### Manual Verification
-   **Invite Visitor**:
    -   Login as Resident.
    -   `POST /api/v1/visitors/invite` with visitor details.
    -   Verify response contains QR code image data.
    -   Verify DB records (Visitor, Pass).
-   **View History**:
    -   `GET /api/v1/visitors/history`.
    -   Verify list of created passes.
