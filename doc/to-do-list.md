# ✅ **DC2 GatePass – To-Do List (Based on PRD)**

---

# **PHASE 1 — Project Setup (Backend + Frontend)**

### **Backend (Node.js + Express)**

- [ ] Initialize Node.js + Express project
- [ ] Setup folder structure (controllers, routes, services, middleware)
- [ ] Install dependencies:

  - express
  - cors
  - prisma/sequelize
  - jsonwebtoken
  - bcrypt
  - qrcode

- [ ] Setup PostgreSQL/MySQL database
- [ ] Initialize Prisma/Sequelize ORM
- [ ] Setup environment variables (.env)
- [ ] Setup server health check route
- [ ] Setup error handling middleware
- [ ] Setup request validation (zod/yup/joi)

### **Frontend (Angular)**

- [ ] Initialize Angular project
- [ ] Create modules:

  - auth
  - resident
  - parent
  - guard
  - admin

- [ ] Setup Angular routing
- [ ] Setup UI framework (Angular Material / Tailwind)
- [ ] Configure environment.ts for API URLs

---

# **PHASE 2 — Authentication & User Management**

### **Backend**

- [ ] Implement `/auth/register`
- [ ] Implement `/auth/login`
- [ ] Setup JWT authentication
- [ ] Setup role-based access control (RBAC):

  - admin
  - guard
  - resident
  - parent

- [ ] Middleware for JWT + roles

### **Frontend**

- [ ] Login page (guard/resident/admin/parent)
- [ ] JWT store (NgRx or service)
- [ ] Auth guard for routes
- [ ] Logout function

---

# **PHASE 3 — Core Feature: Visitor Pass System**

---

## **3.1 Resident Visitor Pass**

### **Backend**

- [ ] API: Create visitor pass
- [ ] API: Get resident visitor pass list
- [ ] API: Generate QR code
- [ ] API: Validate QR code
- [ ] API: Mark visitor check-in/check-out
- [ ] Auto-expire visitor pass after validity time

### **Frontend**

**Resident Module**

- [ ] Visitor pass creation form
- [ ] List visitor passes
- [ ] Visitor pass details page
- [ ] Display QR code
- [ ] Share QR via WhatsApp button

---

## **3.2 Parent/School Pickup Pass**

### **Backend**

- [ ] API: Parent register (student + parent details)
- [ ] API: Generate daily pickup QR pass
- [ ] API: Auto-expire daily pass after school hours
- [ ] API: Validate QR
- [ ] API: List parent arrivals for guard

### **Frontend**

**Parent Module**

- [ ] Parent registration form
- [ ] Display daily QR code
- [ ] Show pickup status (entered / waiting / completed)

---

# **PHASE 4 — Guard Module**

### **Backend**

- [ ] API: Scan QR code (validate pass)
- [ ] API: Manual search visitor (name/phone/plate)
- [ ] API: List today’s visitors
- [ ] API: Mark visitor exit
- [ ] Fast-scan mode for school hours

### **Frontend**

**Guard App**

- [ ] Login for guard
- [ ] QR scanner component (camera)
- [ ] Manual search input
- [ ] Visitor details popup
- [ ] Approve/reject button
- [ ] Real-time list of incoming parents
- [ ] Fast-scan UI

---

# **PHASE 5 — Admin Dashboard**

### **Backend**

- [ ] API: CRUD residents
- [ ] API: CRUD guards
- [ ] API: CRUD school/students
- [ ] API: Visitor logs (filter by date/type)
- [ ] API: Analytics endpoints
- [ ] Export logs as CSV/PDF

### **Frontend**

**Admin Module**

- [ ] Dashboard analytics page
- [ ] CRUD forms:

  - residents
  - guards
  - students

- [ ] Visitor logs table
- [ ] Filters (date, name, type)
- [ ] Export logs button
- [ ] Charts for analytics

---

# **PHASE 6 — Security & Non-Functional**

### **Backend**

- [ ] Rate limiting on auth
- [ ] CORS configuration
- [ ] Data encryption (PII)
- [ ] Security headers (helmet)
- [ ] Logging (Morgan/winston)
- [ ] Backup scripts (DB dump)

### **Frontend**

- [ ] Error state UI
- [ ] Loader/spinner components
- [ ] Mobile responsiveness
- [ ] Offline fallback mode for guard app (optional)

---

# **PHASE 7 — Deployment & DevOps**

### **Backend**

- [ ] Create Dockerfile
- [ ] Setup production build
- [ ] Setup Nginx reverse proxy
- [ ] Deploy to:

  - DigitalOcean / EC2 / Render

- [ ] Add PM2 process manager
- [ ] Setup CI/CD pipeline

### **Frontend**

- [ ] Setup Angular production build
- [ ] Deploy to:

  - Netlify / Vercel / S3 CloudFront

- [ ] Connect FE to BE endpoints
- [ ] Setup environment configs (dev/staging/prod)

---

# **PHASE 8 — Testing & QA**

### **Backend Tests**

- [ ] Unit tests for key APIs
- [ ] Integration tests
- [ ] Load testing (for school peak hour)

### **Frontend Tests**

- [ ] Page validation test
- [ ] QR scanning test behaviour
- [ ] Form validation tests

---

# **PHASE 9 — Final Launch Deliverables**

- [ ] User manual (Resident & Parent)
- [ ] Guardhouse SOP
- [ ] Admin training slides
- [ ] Soft launch in one block (pilot test)
- [ ] Rollout to entire community
