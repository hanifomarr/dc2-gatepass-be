# **📘 Product Requirements Document (PRD)**

## **DC2 GatePass Web Application**

---

# **1. Overview**

### **1.1 Product Summary**

DC2 GatePass is a digital visitor management system for a guarded residential community with an internal school. The system digitizes the check-in/check-out process for visitors (especially parents dropping off/picking up children), reduces long queues, enhances security, and provides real-time visitor tracking for guards and management.

### **1.2 Target Users**

- **Parents/Visitors (External)**
  Coming to send/pick their children at the school inside the community.
- **Residents**
  Living in the community and inviting personal guests.
- **Security Guards**
  Managing entry/exit approvals at the guard house.
- **Community Admin / Management**
  System oversight, managing schools, houses, users, and analytics.
- **School Staff**
  Verifying student pick-ups and issuing school pickup QR passes.

---

# **2. Goals & Objectives**

### **2.1 Primary Goals**

- Reduce long queues at the guardhouse.
- Digitize and automate visitor registration.
- Improve child safety during school drop-off/pick-up.
- Provide seamless real-time verification for guards.
- Track all visitor movement in the community.

### **2.2 Business Objectives**

- Increase community security.
- Reduce manual guard workload.
- Maintain proper visitor logs for compliance.
- Provide a scalable system for future automation (ANPR, boom gate auto-open, RFID, etc.)

---

# **3. Core Features**

---

## **3.1 Visitor Pass Generation**

### **A. Resident-Initiated Visitor Pass**

Residents can:

- Create visitor entry requests.
- Fill in visitor info:

  - Name, phone, IC/passport
  - Vehicle plate number
  - Purpose of visit

- Select validity time & date.
- System generates:

  - **QR Pass**
  - **Pass Code (Alpha-numeric fallback)**

---

### **B. School Parent Visitor Pass**

Parent (visitor) registers:

- Student name
- Parent name
- Phone
- Vehicle plate
- Number of passengers
- Pickup/drop-off purpose
- Time slot (optional)

System generates:

- One-time QR Code
- Valid for that day only
- Auto-expire after time window

---

## **3.2 Guard Checkpoint Module (Guard App)**

Accessible through tablet or PC in guardhouse.

Guards can:

- Scan QR code (camera/webcam)
- Search manually by:

  - Phone number
  - Name
  - Plate number

- Approve/Reject entry
- View visitor details instantly
- View “school pickup mode” list for upcoming parents

Real-time features:

- Show pending visitors arriving soon
- Display vehicle plate (manual input)
- Log check-in timestamp
- Log check-out timestamp

---

## **3.3 Admin & Management Dashboard**

Admin dashboard includes:

- User/Resident management
- School/student lists
- Visitor logs with filters:

  - Date range
  - Type (Resident guest / School parent / Contractor)
  - Plate number

- Analytics:

  - Peak hours
  - Number of daily visitors

- Security reporting (PDF export)

---

## **3.4 Authentication & Access Control**

- Residents login with phone + OTP
- Guards login with secure pin/password
- Admin login with username/password
- JWT tokens for session
- Role-based access:

  - admin
  - guard
  - resident
  - parent(temporary guest profile)

---

## **3.5 QR Code System**

QR code contains encoded:

- Pass ID
- Visitor type
- Validity window
- Plate number (optional)

Features:

- One-time use OR multiple-use (configurable)
- Auto-expire by:

  - Time range
  - Once scanned

- Retry with manual code if QR unreadable

---

## **3.6 Real-Time Queue Monitoring**

To reduce congestion at school time:

- Display upcoming parents in queue for guards
- Parents see “estimated waiting time”
- Guard can fast-scan during peak hours
- Admin can activate “school pickup mode”:

  - Fast scanning
  - No manual data entry

(Optional v2 feature)

---

## **3.7 Notifications**

Residents receive:

- Visitor arrived notifications
- Visitor left notifications

School parents receive:

- QR pass link
- Entry approved notification
- “Your child has been picked-up” (if integrated with school staff app later)

---

# **4. Technical Requirements**

---

## **4.1 Backend (Node.js + Express)**

### **Tech Stack**

- Node.js (Express)
- PostgreSQL
- Prisma
- JWT Authentication
- Redis (optional for caching)
- Cloud storage (S3/GCP) for logs & images

### **Backend Services**

- Authentication & authorization
- Visitor pass generation
- QR code encoding/decoding
- Guard scanning endpoint
- Visitor logs & analytics
- Admin management module
- Rate limiting & throttling

### **Performance Requirements**

- Handle peak load of parents during school hours
- <300ms response time for scanning endpoints
- Scalable horizontally with load balancer

---

## **4.2 Frontend (Angular)**

### **Modules**

- Resident Portal
- Parent Visitor Portal
- Guard App
- Admin Dashboard

### **Components**

- QR code generator
- QR scanner component
- Visitor form
- Kids registration (school)
- Visitor logs table
- Analytics charts
- Login forms

### **Performance**

- Optimized lazy-loaded modules
- Offline fallback for guardhouse

---

# **5. User Flows**

---

### **5.1 School Parent Flow**

1. Parent receives link/QR from school to register once.
2. Parent registers and receives daily pass QR.
3. On arrival, guard scans QR.
4. System marks “Parent entered”.
5. Optional: School staff confirms pickup inside school.
6. Parent exits → system marks “Exited.”

---

### **5.2 Visitor Flow (Resident Guest)**

1. Resident registers visitor.
2. Sends QR to visitor via WhatsApp.
3. Visitor arrives → guard scans → approved.
4. Visitor exits → guard scans again or auto-logs.

---

### **5.3 Guard Flow**

1. Login in guard tablet.
2. Scan visitor QR.
3. Approve or reject.
4. Check logs.
5. During peak school time:

   - Use fast-scan mode
   - Auto-approve parents

---

# **6. Non-Functional Requirements**

### **Security**

- HTTPS everywhere
- Rate limiting against brute force
- JWT + Refresh tokens
- Data encryption for PII

### **Reliability**

- 99.9% uptime
- Backup DB daily
- Scalable deployment

### **Usability**

- Minimal clicks for guards
- Mobile-friendly for parents
- Offline mode for guardhouse

### **Compliance**

- Follow PDPA Malaysia
- Secure handling of children’s data

---

# **8. MVP Scope**

- Parent pass registration
- Resident guest pass
- Guard scanning (QR + manual)
- Basic guard dashboard
- Admin dashboard (logs)
- Auth (Resident, Guard, Admin)
- Visitor logs
