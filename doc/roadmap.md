# Roadmap: Gatepass Backend System

This roadmap outlines the phased development of the Gatepass Backend, ensuring a structured approach from foundation to advanced features.

## Phase 1: Foundation & Authentication (Week 1-2)

**Goal**: Set up the project structure, database, and secure user management.

- **System Setup**:
  - Initialize Node.js + Express + TypeScript project.
  - Configure ESLint, Prettier, and Git.
  - Set up Database (MySQL/MongoDB) and ORM (Prisma/Mongoose).
- **Authentication Module**:
  - Implement JWT-based authentication strategy.
  - Create User entities (Admin, Resident, Guard, Parent).
  - **Endpoints**:
    - `POST /auth/register` (Admin only initially or self-register for residents with verification).
    - `POST /auth/login`.
    - `GET /auth/me` (Get current user profile).

## Phase 2: Core Resident & Visitor Flow (Week 3-4)

**Goal**: Enable residents to invite visitors and generate passes.

- **Resident Module**:
  - Manage Units/Houses (Link residents to units).
  - **Endpoints**:
    - `POST /visitors/invite` (Create a visitor pass).
    - `GET /visitors/history`.
- **Pass Generation**:
  - Implement QR Code generation logic.
  - Create "Pass" entity with status (ACTIVE, EXPIRED, USED).
  - Shareable link/image generation for QR codes.

## Phase 3: Guard Operations & Entry Management (Week 5)

**Goal**: Empower guards to verify visitors and manage entry/exit.

- **Guard Module**:
  - **Endpoints**:
    - `POST /gate/scan` (Validate QR code).
    - `POST /gate/check-in` (Record entry timestamp).
    - `POST /gate/check-out` (Record exit timestamp).
    - `POST /gate/walk-in` (Manual registration for visitors without passes).
- **Validation Logic**:
  - Check if pass is active and within valid time range.
  - Prevent double entry (if already checked in).

## Phase 4: School Parent Integration (Week 6)

**Goal**: Handle the specific high-volume flow for school drop-offs/pick-ups.

- **Parent Module**:
  - Specialized registration flow for parents.
  - Link parents to Students (new entity).
- **Recurring Passes**:
  - Logic for passes valid on specific days/times (e.g., Mon-Fri, 7am-9am).
  - Fast-track scanning for parents.

## Phase 5: Admin Dashboard & Reporting (Week 7)

**Goal**: Provide visibility and control to administrators.

- **Admin Module**:
  - **Endpoints**:
    - `GET /admin/users` (Manage all user roles).
    - `GET /admin/stats` (Real-time counts).
    - `GET /admin/logs` (Audit trail of all gate activities).
- **Reporting**:
  - Export visitor logs to CSV/PDF.

## Phase 6: Enhancements & Polish (Week 8+)

**Goal**: Add "wow" factors and robust security features.

- **Notifications**: Email/Push notifications to residents when visitor arrives.
- **Emergency Alert**: "Panic Button" endpoint for residents.
- **Blacklist System**: Prevent pass generation for blocked vehicles/persons.
- **Load Testing**: Ensure system handles school rush hour traffic.
- **Documentation**: API documentation (Swagger/OpenAPI).

## Milestones

| Milestone | Deliverable                     | Estimated Timeline |
| :-------- | :------------------------------ | :----------------- |
| **M1**    | Project Skeleton + Auth API     | Week 2             |
| **M2**    | Resident Invite + QR Generation | Week 4             |
| **M3**    | Guard Scanning + Entry Logs     | Week 5             |
| **M4**    | School Parent Flow              | Week 6             |
| **M5**    | Admin Dashboard + Reports       | Week 7             |
| **M6**    | V1.0 Release (Production Ready) | Week 8             |
