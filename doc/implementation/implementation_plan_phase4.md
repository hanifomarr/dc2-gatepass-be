# Implementation Plan - Phase 4: School Parent Integration

## Goal Description
Enable school parents to register, link their children (students), and generate long-term recurring passes for school pickup/drop-off.

## User Review Required
> [!NOTE]
> **Recurring Passes**:
> For now, "Recurring Passes" will be implemented as passes with a long validity period (e.g., 1 academic year) to simplify the logic. We can add specific time-of-day restrictions in a future enhancement.

## Proposed Changes

### Database Schema Updates
#### [MODIFY] [prisma/schema.prisma](file:///Users/hanifomar/Documents/express-scaffold/prisma/schema.prisma)
-   **New Model**:
    -   `Student`: Represents a child attending the school.
        -   `id`, `name`, `grade`, `parentId` (relation to User).
-   **Update User**:
    -   Add `students` relation (One-to-Many).

### Core Features
#### [NEW] [src/services/student.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/student.service.ts)
-   `addStudent(parentId, data)`: Link a student to a parent.
-   `getStudents(parentId)`: Get all students for a parent.

#### [NEW] [src/services/parent.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/parent.service.ts)
-   `generateSchoolPass(parentId)`: Generate a pass valid for the current school year (e.g., until Dec 31st). Uses `visitor.service.createPass` logic but with long validity and potentially a specific "PARENT" visitor type (or just link Pass directly to User? Current Pass model links to Visitor. We might need to create a "Self-Visitor" record for the parent or adjust Pass model. *Decision: Create a Visitor record representing the Parent themselves for consistency with Pass model*).

#### [NEW] [src/controllers/parent.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/parent.controller.ts)
-   `addStudent`: Link child.
-   `getStudents`: View children.
-   `getSchoolPass`: Generate/Retrieve the parent's school pass.

#### [NEW] [src/routes/parent.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/parent.route.ts)
-   `POST /students` (Protected: Parent only)
-   `GET /students` (Protected: Parent only)
-   `POST /pass` (Protected: Parent only) - Generates/Returns the QR pass.

#### [MODIFY] [src/routes/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/index.ts)
-   Mount `parentRoute` at `/parents`.

## Verification Plan

### Automated Tests
-   **Prisma Push**: Update DB schema.
-   **Lint**: Check code quality.

### Manual Verification
-   **Parent Flow**:
    -   Register a new user with role `PARENT`.
    -   `POST /api/v1/parents/students` to add a child.
    -   `POST /api/v1/parents/pass` to get the school pass.
    -   Verify the pass has long validity.
    -   Scan the pass using `POST /api/v1/gate/scan` to ensure it works.
