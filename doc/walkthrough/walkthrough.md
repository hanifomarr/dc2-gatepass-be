# Gatepass Backend System - Project Walkthrough

## Overview

This walkthrough documents the complete implementation of the **Gatepass Backend System** - a production-grade Node.js backend for managing community gate access. The system digitalizes guard house operations, enabling visitor registration, QR code verification, and comprehensive access management.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Prisma 5.10.2
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Logging**: Pino
- **QR Code Generation**: qrcode library

## Project Structure

```
express-scaffold/
├── doc/
│   ├── main-idea.md          # Product Requirements Document
│   └── roadmap.md             # Development roadmap
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── index.ts           # Environment configuration
│   ├── controllers/           # Request handlers
│   ├── middlewares/           # Auth, error handling
│   ├── routes/                # API route definitions
│   ├── services/              # Business logic
│   ├── utils/                 # Logger, Prisma client
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── docker-compose.yml         # MySQL + Adminer containers
└── package.json
```

## Database Schema

### Core Models

#### User
- **Purpose**: Represents all system users (Admin, Resident, Guard, Parent)
- **Key Fields**: `id`, `email`, `password`, `name`, `role`
- **Relations**: `units`, `visitors`, `passes`, `logs`, `students`

#### Visitor
- **Purpose**: Represents guests visiting the community
- **Key Fields**: `id`, `name`, `vehicleNumber`, `type`, `residentId`
- **Relations**: `resident` (User), `passes`

#### Pass
- **Purpose**: Entry passes with QR codes
- **Key Fields**: `id`, `code`, `validFrom`, `validTo`, `status`
- **Relations**: `visitor`, `resident`, `logs`

#### EntryLog
- **Purpose**: Tracks all check-in/check-out events
- **Key Fields**: `id`, `passId`, `guardId`, `action`, `timestamp`
- **Relations**: `pass`, `guard` (User)

#### Student
- **Purpose**: Children linked to parent accounts
- **Key Fields**: `id`, `name`, `grade`, `parentId`
- **Relations**: `parent` (User)

#### Unit
- **Purpose**: Residential units in the community
- **Key Fields**: `id`, `unitNumber`, `residentId`
- **Relations**: `resident` (User)

## API Endpoints

### Health Check
- `GET /api/v1/health` - System health status

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and receive JWT token

### Visitor Management (Resident)
- `POST /api/v1/visitors/invite` - Create visitor and generate pass
- `GET /api/v1/visitors/history` - View visitor history

### Gate Operations (Guard)
- `POST /api/v1/gate/scan` - Validate QR code
- `POST /api/v1/gate/check-in` - Record entry
- `POST /api/v1/gate/check-out` - Record exit

### Parent Operations
- `POST /api/v1/parents/students` - Link student to parent
- `GET /api/v1/parents/students` - View linked students
- `POST /api/v1/parents/pass` - Generate school pass

### Admin Dashboard
- `GET /api/v1/admin/stats` - System statistics
- `GET /api/v1/admin/users?role=RESIDENT` - List users
- `GET /api/v1/admin/logs?limit=20&offset=0` - Entry logs

## Implementation Phases

### Phase 1: Foundation & Authentication ✅

**Completed**: Database setup, User authentication with JWT

**Key Files**:
- [schema.prisma](file:///Users/hanifomar/Documents/express-scaffold/prisma/schema.prisma) - Initial User model
- [auth.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/auth.service.ts) - Registration and login logic
- [auth.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/auth.controller.ts) - Auth request handlers
- [auth.ts](file:///Users/hanifomar/Documents/express-scaffold/src/middlewares/auth.ts) - JWT verification middleware

**Example**: Register and Login
```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secret", "name": "John Doe", "role": "RESIDENT"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secret"}'
```

### Phase 2: Core Resident & Visitor Flow ✅

**Completed**: Visitor invitation, QR code generation, pass management

**Key Files**:
- [visitor.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/visitor.service.ts) - Visitor and pass creation
- [qr.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/qr.service.ts) - QR code generation
- [visitor.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/visitor.controller.ts) - Visitor endpoints

**Example**: Invite Visitor
```bash
curl -X POST http://localhost:3000/api/v1/visitors/invite \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Jane Visitor",
    "vehicleNumber": "ABC123",
    "validFrom": "2025-11-25T10:00:00Z",
    "validTo": "2025-11-25T18:00:00Z"
  }'
```

**Response**: Includes `pass` object and `qrCodeImage` (base64 data URL)

### Phase 3: Guard Operations & Entry Management ✅

**Completed**: QR scanning, check-in/check-out, entry logging

**Key Files**:
- [gate.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/gate.service.ts) - Pass validation, entry logic
- [gate.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/gate.controller.ts) - Gate operation handlers

**Example**: Guard Workflow
```bash
# 1. Scan QR code
curl -X POST http://localhost:3000/api/v1/gate/scan \
  -H "Authorization: Bearer <GUARD_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"code": "uuid-from-qr-code"}'

# 2. Check-in
curl -X POST http://localhost:3000/api/v1/gate/check-in \
  -H "Authorization: Bearer <GUARD_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"code": "uuid-from-qr-code"}'

# 3. Check-out (later)
curl -X POST http://localhost:3000/api/v1/gate/check-out \
  -H "Authorization: Bearer <GUARD_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"passId": 1}'
```

### Phase 4: School Parent Integration ✅

**Completed**: Student linking, school pass generation

**Key Files**:
- [student.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/student.service.ts) - Student management
- [parent.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/parent.service.ts) - School pass generation
- [parent.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/parent.controller.ts) - Parent endpoints

**Example**: Parent Workflow
```bash
# 1. Link student
curl -X POST http://localhost:3000/api/v1/parents/students \
  -H "Authorization: Bearer <PARENT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Tommy", "grade": "3A"}'

# 2. Get school pass (valid until end of year)
curl -X POST http://localhost:3000/api/v1/parents/pass \
  -H "Authorization: Bearer <PARENT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Phase 5: Admin Dashboard & Reporting ✅

**Completed**: User management, system statistics, entry logs

**Key Files**:
- [admin.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/admin.service.ts) - Admin data queries
- [admin.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/admin.controller.ts) - Admin endpoints
- [admin.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/admin.route.ts) - Admin-only routes

**Example**: Admin Dashboard
```bash
# System stats
curl -X GET http://localhost:3000/api/v1/admin/stats \
  -H "Authorization: Bearer <ADMIN_TOKEN>"

# Response: {"totalResidents":5,"totalVisitors":12,"activePasses":8,"entriesToday":3}

# List all users
curl -X GET http://localhost:3000/api/v1/admin/users \
  -H "Authorization: Bearer <ADMIN_TOKEN>"

# Entry logs
curl -X GET http://localhost:3000/api/v1/admin/logs?limit=10 \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

## Key Features

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes with middleware
- ✅ Role-based access control (Admin-only routes)

### Data Validation
- ✅ Zod schemas for request validation
- ✅ Type-safe database queries with Prisma
- ✅ Centralized error handling

### Pass Management
- ✅ UUID-based unique pass codes
- ✅ QR code generation (base64 images)
- ✅ Time-based validity (validFrom/validTo)
- ✅ Status tracking (ACTIVE, USED, EXPIRED, CANCELLED)

### Logging & Monitoring
- ✅ Structured logging with Pino
- ✅ Entry/Exit event tracking
- ✅ System statistics dashboard

## Running the Project

### Prerequisites
- Node.js 18+
- Docker (for MySQL)

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Start database
docker compose up -d

# 3. Push schema to database
npx prisma@5.10.2 db push

# 4. Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Required in `.env`:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://root:password@localhost:3306/gatepass
JWT_SECRET=your-secret-key-here
JWT_ACCESS_EXPIRATION_MINUTES=30
```

## Testing Summary

All phases were manually verified:

1. ✅ **Authentication**: Login/Register flows tested
2. ✅ **Visitor Flow**: Pass creation and QR generation verified
3. ✅ **Guard Operations**: Scan, check-in, check-out tested with valid/invalid passes
4. ✅ **Parent Integration**: Student linking and school pass generation verified
5. ✅ **Admin Dashboard**: Stats, user lists, and logs confirmed accurate

## Future Enhancements

Based on [roadmap.md](file:///Users/hanifomar/Documents/express-scaffold/doc/roadmap.md), potential next phases:

- **Email/SMS Notifications**: Visitor arrival alerts
- **Blacklist Management**: Restrict specific visitors
- **Analytics Dashboard**: Charts and trends
- **Mobile App Integration**: QR display on mobile
- **Overstay Alerts**: Automatic notifications for expired passes

## Production Readiness Checklist

- [x] TypeScript for type safety
- [x] Environment-based configuration
- [x] Centralized error handling
- [x] Structured logging
- [x] Database migrations via Prisma
- [x] Password hashing
- [x] JWT authentication
- [ ] Rate limiting (recommended)
- [ ] CORS configuration review
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit/Integration tests
- [ ] CI/CD pipeline

## Conclusion

The Gatepass Backend System is now feature-complete for core operations. The modular architecture allows for easy extension, and the TypeScript + Prisma combination ensures type safety throughout the codebase. All 5 development phases have been successfully implemented and verified.
