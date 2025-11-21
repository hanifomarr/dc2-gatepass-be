‰# ✅ **DC2 GatePass – API List by Module**

---

# **1. Authentication Module (/auth)**

### **User Registration & Login**

| Method | Endpoint              | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| POST   | `/auth/register`      | Register user (resident/parent/admin/guard) |
| POST   | `/auth/login`         | Login user & return JWT                     |
| POST   | `/auth/logout`        | Logout user                                 |
| POST   | `/auth/refresh-token` | Refresh JWT                                 |
| GET    | `/auth/profile`       | Get current authenticated user              |

### **Optional: OTP**

| Method | Endpoint |
| POST | `/auth/send-otp` |
| POST | `/auth/verify-otp` |

---

# **2. Resident Module (/residents)**

### **Visitor Pass**

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| POST   | `/residents/visitor-pass`     | Create visitor pass          |
| GET    | `/residents/visitor-pass`     | List resident visitor passes |
| GET    | `/residents/visitor-pass/:id` | View visitor pass details    |
| DELETE | `/residents/visitor-pass/:id` | Delete/revoke visitor pass   |

### **Visitor Pass QR**

| GET | `/residents/visitor-pass/:id/qr` | Get QR code for visitor pass |

---

# **3. Parent/School Module (/parents)**

### **Parent Registration**

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/parents/register` | Register parent + student |
| GET    | `/parents/profile`  | Get parent profile        |

### **Daily Pickup Pass**

| Method | Endpoint                      | Description                                   |
| ------ | ----------------------------- | --------------------------------------------- |
| POST   | `/parents/pickup-pass`        | Generate daily pickup QR                      |
| GET    | `/parents/pickup-pass`        | Get today’s QR pass                           |
| GET    | `/parents/pickup-pass/status` | Get pickup status (waiting/entered/collected) |

---

# **4. Guard Module (/guard)**

### **Scan QR**

| Method | Endpoint      | Description                           |
| ------ | ------------- | ------------------------------------- |
| POST   | `/guard/scan` | Scan QR, validate pass, approve entry |
| POST   | `/guard/exit` | Mark visitor exit                     |

### **Manual Search**

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | `/guard/search` | Search by name/phone/plate number |

### **Daily Visitor Queue**

| Method | Endpoint                | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/guard/today-visitors` | List today’s visitor passes              |
| GET    | `/guard/today-parents`  | List parents coming for school pickup    |
| POST   | `/guard/fast-scan`      | Fast approve (for peak school hour mode) |

---

# **5. Admin Module (/admin)**

### **Residents Management**

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| GET    | `/admin/residents`     | List residents  |
| POST   | `/admin/residents`     | Create resident |
| PUT    | `/admin/residents/:id` | Update resident |
| DELETE | `/admin/residents/:id` | Delete resident |

### **Guards Management**

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/admin/guards`     |
| POST   | `/admin/guards`     |
| PUT    | `/admin/guards/:id` |
| DELETE | `/admin/guards/:id` |

### **Student/School Management**

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | `/admin/students`     |
| POST   | `/admin/students`     |
| PUT    | `/admin/students/:id` |
| DELETE | `/admin/students/:id` |

---

# **6. Visitor Pass Module (/visitor-pass)**

### **Visitor Pass Validation**

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| GET    | `/visitor-pass/:id`      | Get pass details (guard/admin only) |
| POST   | `/visitor-pass/validate` | Validate QR data                    |

---

# **7. Logs Module (/logs)**

### **Visitor Logs**

| Method | Endpoint          | Description                            |
| ------ | ----------------- | -------------------------------------- |
| GET    | `/logs/visitors`  | Get visitor logs (filter by type/date) |
| GET    | `/logs/parents`   | Parent pickup logs                     |
| GET    | `/logs/analytics` | Dashboard statistics                   |
| GET    | `/logs/export`    | Export logs (CSV/PDF)                  |

---

# **8. QR Module (/qr)**

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| POST   | `/qr/generate` | Generate QR for visitor/pass |
| POST   | `/qr/decode`   | Decode QR scanned by guard   |

---

# **9. System Module (/system)** (Optional)

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/system/health`   | API health check    |
| GET    | `/system/settings` | Get system settings |
| PATCH  | `/system/settings` | Update settings     |

---

# 🎉 Summary (API List by Modules)

### **Auth APIs**

Login, register, OTP, profile

### **Resident APIs**

Create visitor passes, list passes, QR

### **Parent APIs**

Student registration, daily pickup QR

### **Guard APIs**

Scan QR, manual search, mark entry/exit, queue list

### **Admin APIs**

CRUD users/guards/students, settings

### **Logs APIs**

Visitor logs, parent logs, analytics, export

### **QR APIs**

Generate, decode
