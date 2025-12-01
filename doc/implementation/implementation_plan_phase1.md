# Implementation Plan - Phase 1: Foundation & Authentication

## Goal Description
Set up the database layer using **MySQL** and **Prisma**, and implement a secure **Authentication Module** using JWT. This will allow users (Admin, Resident, Guard) to register and login, forming the backbone of the system.

## User Review Required
> [!IMPORTANT]
> **Database Credential**: You will need a running MySQL instance. Please update the `DATABASE_URL` in the `.env` file after I set it up.
> **JWT Secret**: I will add a `JWT_SECRET` to `.env`. Please change this to a secure random string in production.

## Proposed Changes

### Database Setup
#### [NEW] [docker-compose.yml](file:///Users/hanifomar/Documents/express-scaffold/docker-compose.yml)
-   MySQL 8.0 service.
-   Persistent volume for data.
-   Adminer (optional) for database management.

#### [NEW] [schema.prisma](file:///Users/hanifomar/Documents/express-scaffold/prisma/schema.prisma)
-   Define `User` model (id, email, password, name, role, createdAt, updatedAt).
-   Define `Role` enum (ADMIN, RESIDENT, GUARD, PARENT).
-   Define `RefreshToken` model (optional, for advanced auth) - *Skipping for MVP, using long-lived access tokens or simple expiry for now.*

#### [NEW] [src/utils/prisma.ts](file:///Users/hanifomar/Documents/express-scaffold/src/utils/prisma.ts)
-   Initialize and export global PrismaClient instance.

### Authentication Module
#### [MODIFY] [package.json](file:///Users/hanifomar/Documents/express-scaffold/package.json)
-   Install `prisma`, `@prisma/client`.
-   Install `bcryptjs`, `jsonwebtoken`.
-   Install types: `@types/bcryptjs`, `@types/jsonwebtoken`.

#### [MODIFY] [src/config/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/config/index.ts)
-   Add `jwt.secret` and `jwt.accessExpirationMinutes` to configuration.

#### [NEW] [src/middlewares/auth.ts](file:///Users/hanifomar/Documents/express-scaffold/src/middlewares/auth.ts)
-   Middleware to verify JWT token from `Authorization` header.
-   Attach user to `req.user`.

#### [NEW] [src/services/auth.service.ts](file:///Users/hanifomar/Documents/express-scaffold/src/services/auth.service.ts)
-   `loginUserWithEmailAndPassword(email, password)`
-   `createUser(userBody)`

#### [NEW] [src/controllers/auth.controller.ts](file:///Users/hanifomar/Documents/express-scaffold/src/controllers/auth.controller.ts)
-   `register`: Validate input -> Call service -> Return tokens.
-   `login`: Validate input -> Call service -> Return tokens.

#### [NEW] [src/routes/auth.route.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/auth.route.ts)
-   `POST /register`
-   `POST /login`

#### [MODIFY] [src/routes/index.ts](file:///Users/hanifomar/Documents/express-scaffold/src/routes/index.ts)
-   Mount `authRoute` at `/auth`.

## Verification Plan

### Automated Tests
-   **Prisma Generate**: Run `npx prisma generate` to ensure client is built.
-   **Lint**: Run `npm run lint` to check code quality.

### Manual Verification
-   **Docker**: Run `docker-compose up -d` and verify MySQL is running.
-   **Register**: Send `POST /api/v1/auth/register` with valid data -> Expect 201 Created + Token.
-   **Login**: Send `POST /api/v1/auth/login` with valid creds -> Expect 200 OK + Token.
