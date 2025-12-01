# Product Requirements Document (PRD): Gatepass Backend System

## 1. Introduction

### 1.1 Problem Statement

The current guard house system relies on manual processes for tracking residents and visitors. This is inefficient, prone to errors, and lacks real-time visibility. Additionally, the community includes a school, requiring a specific flow for parents dropping off/picking up children, which adds complexity to the standard visitor management.

### 1.2 Goals

- **Digitalize** the entry/exit process for residents, visitors, and school parents.
- **Enhance Security** by verifying identities via QR codes and maintaining digital logs.
- **Streamline Operations** for guards and administrators.
- **Improve User Experience** for residents and parents through a dedicated mobile/web interface.

## 2. User Personas

1.  **Resident**: Lives in the community. Needs to invite guests and manage their own access.
2.  **Visitor**: Enters the community for a specific purpose (delivery, social visit, contractor).
3.  **Guard**: Manages the entry/exit points. Verifies QR codes and identities.
4.  **Parent**: Non-resident who enters specifically to drop off/pick up school children.
5.  **Admin**: Manages the entire system, users, reports, and security settings.

## 3. Functional Requirements

### 3.1 Resident Module

- **Login/Authentication**: Secure login via email/phone.
- **Register Visitor**:
  - Input visitor details (Name, Vehicle Number, Purpose, Date/Time).
  - Generate a unique QR code for the visitor.
  - Share QR code via WhatsApp/Email.
- **View History**: See a log of past visitors.
- **Emergency Alert**: Trigger a panic button to notify guards/admin.

### 3.2 Visitor Module (Web Link/App)

- **Receive Pass**: View the QR code shared by the resident.
- **Pre-registration**: (Enhancement) Fill in details via a link before arrival to speed up entry.

### 3.3 Parent Module (School Access)

- **Registration**: One-time registration verified by the school/admin.
- **Permanent/Recurring QR**: Get a static or recurring QR code for school hours (e.g., Mon-Fri, 7 AM - 5 PM).
- **Child Association**: Link QR code to specific student details.

### 3.4 Guard Module (Mobile/Tablet App)

- **Scan QR**: Scan visitor/parent QR codes for validation.
  - _Valid_: Show details, allow check-in.
  - _Invalid/Expired_: Deny entry.
- **Manual Entry**: Register visitors who don't have a QR code (walk-ins) by capturing ID photo and details.
- **Check-in/Check-out**: Record entry and exit times.
- **Overstay Alert**: (Enhancement) View list of visitors still inside past their expected exit time.

### 3.5 Admin Dashboard (Web)

- **Dashboard Overview**: Real-time stats (Total Visitors, Current Visitors, School Parents Inside).
- **User Management**: Manage residents, guards, and parents.
- **Reports**: Generate PDF/Excel reports on visitor traffic, security incidents.
- **Broadcast**: (Enhancement) Send announcements to all residents (e.g., "Main gate maintenance").
- **Blacklist**: (Enhancement) Block specific vehicle numbers or IDs from generating passes.

## 4. Non-Functional Requirements

- **Performance**: QR scan response time < 1 second.
- **Scalability**: Support high concurrency during school drop-off/pick-up hours.
- **Security**:
  - Data encryption in transit (HTTPS) and at rest.
  - Role-Based Access Control (RBAC).
  - GDPR/PDPA compliance for personal data handling.
- **Availability**: 99.9% uptime.

## 5. Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL (Relational data is better for structured logs and relationships) OR MongoDB (Flexible schema for varying visitor types). _Recommendation: MySQL for strict relational integrity between Residents, Units, and Visitors._
- **ORM**: Prisma or TypeORM (if MySQL), Mongoose (if MongoDB).
- **Authentication**: JWT (JSON Web Tokens).

## 6. Proposed Database Schema (High-Level Entities)

- **Users**: `id`, `name`, `email`, `password_hash`, `role` (ADMIN, RESIDENT, GUARD, PARENT), `phone`.
- **Units/Houses**: `id`, `unit_number`, `resident_id` (FK).
- **Visitors**: `id`, `name`, `vehicle_number`, `type` (GUEST, DELIVERY, PARENT).
- **Passes**: `id`, `visitor_id` (FK), `resident_id` (FK, nullable for parents), `qr_code_string`, `valid_from`, `valid_to`, `status` (ACTIVE, USED, EXPIRED).
- **Logs**: `id`, `pass_id` (FK), `guard_id` (FK), `action` (CHECK_IN, CHECK_OUT), `timestamp`.

## 7. API Endpoints (Core)

- `POST /auth/login`
- `POST /auth/register`
- `POST /passes/generate` (Resident generates pass)
- `GET /passes/:id` (View pass details)
- `POST /gate/scan` (Guard scans QR)
- `POST /gate/checkout` (Guard checks out visitor)
- `GET /admin/stats`

## 8. Future Enhancements

- **License Plate Recognition (LPR)**: Integrate camera AI to auto-open gates for registered vehicles.
- **Billing Integration**: Charge for overnight parking or facility usage.
- **Kiosk Mode**: Self-service kiosk for visitors to register at the gate.
