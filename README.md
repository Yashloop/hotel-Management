# 🏨 Hotel Booking Application

**HCLTech Hackathon 2026 - Use Case 1**

A full-stack Hotel Booking Application with Spring Boot backend and React frontend featuring JWT authentication, role-based access control, and email notifications.

Frontend app files from `frontend-1` now live at the repository root (`src/`, `public/`, `package.json`, `vite.config.js`).

---

## 📁 Project Structure

```
hotel-booking-app/
├── backend/                         # Spring Boot Backend
│   ├── src/main/java/com/hotel/booking/
│   │   ├── HotelBookingApplication.java    # Main entry point
│   │   ├── entity/                         # JPA Entities
│   │   │   ├── User.java
│   │   │   ├── Hotel.java
│   │   │   ├── Room.java
│   │   │   ├── Booking.java
│   │   │   ├── Payment.java
│   │   │   ├── Role.java
│   │   │   ├── BookingStatus.java
│   │   │   └── PaymentStatus.java
│   │   ├── dto/                            # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── AuthResponse.java
│   │   │   ├── HotelRequest.java
│   │   │   ├── HotelResponse.java
│   │   │   ├── RoomRequest.java
│   │   │   ├── RoomResponse.java
│   │   │   ├── BookingRequest.java
│   │   │   ├── BookingResponse.java
│   │   │   └── ErrorResponse.java
│   │   ├── repository/                     # Data Access Layer
│   │   │   ├── UserRepository.java
│   │   │   ├── HotelRepository.java
│   │   │   ├── RoomRepository.java
│   │   │   ├── BookingRepository.java
│   │   │   └── PaymentRepository.java
│   │   ├── service/                        # Business Logic
│   │   │   ├── UserService.java
│   │   │   ├── HotelService.java
│   │   │   ├── RoomService.java
│   │   │   ├── BookingService.java
│   │   │   └── EmailService.java
│   │   ├── controller/                     # REST Controllers
│   │   │   ├── AuthController.java
│   │   │   ├── HotelController.java
│   │   │   ├── RoomController.java
│   │   │   └── BookingController.java
│   │   ├── security/                       # JWT & Spring Security
│   │   │   ├── JwtUtil.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── UserDetailsServiceImpl.java
│   │   ├── config/                         # Configuration
│   │   │   ├── SecurityConfig.java
│   │   │   ├── SwaggerConfig.java
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   └── DataInitializer.java
│   │   └── exception/                      # Custom Exceptions
│   │       ├── ResourceNotFoundException.java
│   │       ├── BadRequestException.java
│   │       ├── UnauthorizedException.java
│   │       └── DuplicateResourceException.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                        # React Frontend (Placeholder)
│   └── README.md                    # Setup instructions for frontend devs
│
├── database/
│   └── schema.sql                   # MySQL Database Schema
│
├── docs/
│   └── POSTMAN_TESTING_GUIDE.md     # Complete Postman testing guide
│
├── .gitignore
└── README.md                        # This file
```

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Programming language |
| Spring Boot | 3.2.0 | Application framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.x | Database ORM |
| MySQL (Aiven Cloud) | 8.x | Relational database |
| JWT (jjwt) | 0.12.3 | Token-based authentication |
| Lombok | 1.18.30 | Boilerplate reduction |
| SpringDoc OpenAPI | 2.3.0 | Swagger API documentation |
| Spring Boot Mail | 3.x | Email notifications |

### Frontend (To be developed)
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | UI framework |
| React Router DOM | 6+ | Client-side routing |
| Axios | 1.x | HTTP client |
| Vite | 5+ | Build tool |

---

## 🚀 Quick Start

### Prerequisites
- Java 21 (JDK)
- Maven 3.8+
- MySQL (Aiven Cloud - pre-configured)
- IntelliJ IDEA (recommended)

### 1. Clone Repository
```bash
git clone <repository-url>
cd hotel-booking-app
```

### 2. Start Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend starts on: **http://localhost:8080**

### 3. Verify
- Swagger UI: **http://localhost:8080/swagger-ui.html**
- API Docs: **http://localhost:8080/v3/api-docs**

---

## 📊 Database Schema

### Entity Relationship

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Users   │     │  Hotels  │     │  Rooms   │
├──────────┤     ├──────────┤     ├──────────┤
│ id (PK)  │     │ id (PK)  │──┐  │ id (PK)  │
│ name     │     │ name     │  └─→│ hotel_id │
│ email    │     │ location │     │ room_type│
│ password │     │ desc     │     │ price    │
│ phone    │     │ rating   │     │ capacity │
│ role     │     │ image_url│     │ available│
│ created  │     │ created  │     │ amenities│
└──────────┘     └──────────┘     └──────────┘
      │                                 │
      │          ┌──────────┐          │
      │          │ Bookings │          │
      │          ├──────────┤          │
      └────────→ │ user_id  │ ←────────┘
                 │ room_id  │
                 │ check_in │     ┌──────────┐
                 │ check_out│     │ Payments │
                 │ total    │────→│booking_id│
                 │ status   │     │ amount   │
                 │ created  │     │ status   │
                 └──────────┘     └──────────┘
```

---

## 🔑 Default Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@gmail.com | admin123 | ADMIN |
| user@gmail.com | user123 | USER |

These users are **automatically created** when the backend starts.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/logout` | Logout | ✅ |

### Hotels
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/hotels` | List all hotels | ❌ |
| GET | `/api/hotels/{id}` | Get hotel details | ❌ |
| GET | `/api/hotels/search?keyword=` | Search hotels | ❌ |
| POST | `/api/hotels` | Create hotel | 🔑 ADMIN |
| PUT | `/api/hotels/{id}` | Update hotel | 🔑 ADMIN |
| DELETE | `/api/hotels/{id}` | Delete hotel | 🔑 ADMIN |

### Rooms
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/rooms/hotel/{hotelId}` | Get hotel rooms | ❌ |
| GET | `/api/rooms/hotel/{hotelId}/available` | Available rooms | ❌ |
| GET | `/api/rooms/{id}` | Get room details | ❌ |
| POST | `/api/rooms` | Create room | 🔑 ADMIN |
| PUT | `/api/rooms/{id}` | Update room | 🔑 ADMIN |
| DELETE | `/api/rooms/{id}` | Delete room | 🔑 ADMIN |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings` | Create booking | ✅ |
| DELETE | `/api/bookings/{id}` | Cancel booking | ✅ |
| GET | `/api/bookings/history` | My booking history | ✅ |
| GET | `/api/bookings/user/{userId}` | User bookings | ✅ |
| GET | `/api/bookings/all` | All bookings | 🔑 ADMIN |

---

## 👥 Team Roles & Responsibilities

### Backend Developer 1
- Entity classes (User, Hotel, Room, Booking, Payment)
- Repository layer
- Service layer (Hotel, Room, Booking)
- Controller layer (Hotel, Room, Booking)

### Backend Developer 2 (Lead)
- Spring Security + JWT Authentication
- Global Exception Handling
- Email Service
- Logging configuration
- Database schema design
- Git repository management

### Frontend Developer 1 (User Side)
- Login, Register, Home pages
- Hotel List, Hotel Details, Room List
- Booking Page, Booking History
- Navbar, Footer components

### Frontend Developer 2 (Admin Side)
- Admin Dashboard
- Add/Edit Hotel, Add Room
- Manage Bookings
- SearchBar, Loader, ErrorPage components

---

## 🔄 Git Workflow

```bash
# Clone
git clone <repo-url>

# Create feature branch
git checkout -b backend1    # Backend Dev 1
git checkout -b backend2    # Backend Dev 2 (Lead)
git checkout -b frontend1   # Frontend Dev 1
git checkout -b frontend2   # Frontend Dev 2

# Daily workflow
git add .
git commit -m "feat: added hotel CRUD APIs"
git push origin backend1

# Merge to main (Lead does this)
git checkout main
git pull origin main
git merge backend1
git push origin main

# Others pull latest
git pull origin main
```

---

## 📧 Email Configuration (Optional)

To enable email notifications, update `application.properties`:

```properties
spring.mail.username=your-actual-email@gmail.com
spring.mail.password=your-app-password
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords → Generate

---

## 🧪 Testing

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Postman Guide**: See `docs/POSTMAN_TESTING_GUIDE.md`
- **Database**: Connect via MySQL Workbench to Aiven Cloud

---

## ✅ Features Implemented

- ✅ JWT-based Authentication
- ✅ Role-based Access Control (ADMIN / USER)
- ✅ BCrypt Password Encryption
- ✅ Hotel Search by Location/Name
- ✅ Room Availability Management
- ✅ Booking with Auto Price Calculation
- ✅ Booking Cancellation
- ✅ Booking History
- ✅ Email Notifications (Registration, Booking, Cancellation)
- ✅ Global Exception Handling
- ✅ Comprehensive Logging
- ✅ Swagger API Documentation
- ✅ CORS Configuration
- ✅ Sample Data Initialization
