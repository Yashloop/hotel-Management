# 📮 Postman Testing Guide — Hotel Booking API

Complete guide for testing all API endpoints using **Postman**.

---

## 📋 Table of Contents

1. [Setup Postman Environment](#1-setup-postman-environment)
2. [Authentication APIs](#2-authentication-apis)
3. [Hotel APIs](#3-hotel-apis)
4. [Room APIs](#4-room-apis)
5. [Booking APIs](#5-booking-apis)
6. [Swagger UI Alternative](#6-swagger-ui-alternative)
7. [Testing Checklist](#7-testing-checklist)
8. [Common Errors & Fixes](#8-common-errors--fixes)

---

## 1. Setup Postman Environment

### Step 1: Create Environment Variables

1. Open Postman → Click **Environments** → **Create Environment**
2. Name it: `Hotel Booking - Local`
3. Add these variables:

| Variable | Initial Value | Description |
|----------|--------------|-------------|
| `base_url` | `http://localhost:8080` | Backend server URL |
| `token` | _(empty)_ | JWT token (auto-filled after login) |
| `admin_token` | _(empty)_ | Admin JWT token |

### Step 2: Set Authorization Header (Global)

For authenticated requests, add this header:
```
Authorization: Bearer {{token}}
```

Or use Postman's **Authorization** tab → Type: **Bearer Token** → Token: `{{token}}`

---

## 2. Authentication APIs

### 2.1 Register User

```
POST {{base_url}}/api/auth/register
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
}
```

**Expected Response (201 Created):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "role": "USER",
    "message": "Registration successful",
    "userId": 3,
    "name": "John Doe",
    "email": "john@example.com"
}
```

**🔧 Auto-save token:** In Postman **Tests** tab, add:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

---

### 2.2 Login (User)

```
POST {{base_url}}/api/auth/login
```

**Body (raw JSON):**
```json
{
    "email": "user@gmail.com",
    "password": "user123"
}
```

**Expected Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "role": "USER",
    "message": "Login successful",
    "userId": 2,
    "name": "Regular User",
    "email": "user@gmail.com"
}
```

**🔧 Auto-save token:** Same test script as above.

---

### 2.3 Login (Admin)

```
POST {{base_url}}/api/auth/login
```

**Body (raw JSON):**
```json
{
    "email": "admin@gmail.com",
    "password": "admin123"
}
```

**🔧 Auto-save admin token:**
```javascript
var jsonData = pm.response.json();
pm.environment.set("admin_token", jsonData.token);
```

---

### 2.4 Get Current User Profile

```
GET {{base_url}}/api/auth/me
```

**Authorization:** Bearer Token → `{{token}}`

**Expected Response (200 OK):**
```json
{
    "id": 2,
    "name": "Regular User",
    "email": "user@gmail.com",
    "phone": "9876543211",
    "role": "USER",
    "createdAt": "2026-04-16T09:30:00"
}
```

---

### 2.5 Logout

```
POST {{base_url}}/api/auth/logout
```

**Authorization:** Bearer Token → `{{token}}`

**Expected Response (200 OK):**
```json
{
    "message": "Logged out successfully. Please remove the token from client."
}
```

---

## 3. Hotel APIs

### 3.1 Get All Hotels (Public - No Auth)

```
GET {{base_url}}/api/hotels
```

**Expected Response (200 OK):**
```json
[
    {
        "id": 1,
        "name": "Grand Palace Hotel",
        "location": "Chennai",
        "description": "A luxurious 5-star hotel...",
        "rating": 4.5,
        "imageUrl": "https://...",
        "createdAt": "2026-04-16T09:30:00",
        "rooms": [...]
    }
]
```

---

### 3.2 Get Hotel by ID (Public)

```
GET {{base_url}}/api/hotels/1
```

---

### 3.3 Search Hotels (Public)

```
GET {{base_url}}/api/hotels/search?keyword=chennai
```

Try different keywords:
- `?keyword=mumbai`
- `?keyword=palace`
- `?keyword=resort`

---

### 3.4 Create Hotel (Admin Only)

```
POST {{base_url}}/api/hotels
```

**Authorization:** Bearer Token → `{{admin_token}}`

**Body (raw JSON):**
```json
{
    "name": "Taj Mahal Palace",
    "location": "Delhi",
    "description": "Historic luxury hotel near India Gate with colonial architecture.",
    "rating": 4.8,
    "imageUrl": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
}
```

**Expected Response (201 Created):**
```json
{
    "id": 4,
    "name": "Taj Mahal Palace",
    "location": "Delhi",
    ...
}
```

---

### 3.5 Update Hotel (Admin Only)

```
PUT {{base_url}}/api/hotels/4
```

**Authorization:** Bearer Token → `{{admin_token}}`

**Body (raw JSON):**
```json
{
    "name": "Taj Mahal Palace - Updated",
    "location": "New Delhi",
    "description": "Updated description...",
    "rating": 4.9,
    "imageUrl": "https://..."
}
```

---

### 3.6 Delete Hotel (Admin Only)

```
DELETE {{base_url}}/api/hotels/4
```

**Authorization:** Bearer Token → `{{admin_token}}`

**Expected Response:** `204 No Content`

---

## 4. Room APIs

### 4.1 Get Rooms by Hotel (Public)

```
GET {{base_url}}/api/rooms/hotel/1
```

**Expected Response (200 OK):**
```json
[
    {
        "id": 1,
        "hotelId": 1,
        "hotelName": "Grand Palace Hotel",
        "roomType": "Deluxe",
        "price": 5000.0,
        "capacity": 2,
        "availability": true,
        "amenities": "WiFi, AC, TV, Mini Bar, Room Service",
        "imageUrl": "https://..."
    }
]
```

---

### 4.2 Get Available Rooms (Public)

```
GET {{base_url}}/api/rooms/hotel/1/available
```

---

### 4.3 Get Room by ID (Public)

```
GET {{base_url}}/api/rooms/1
```

---

### 4.4 Create Room (Admin Only)

```
POST {{base_url}}/api/rooms
```

**Authorization:** Bearer Token → `{{admin_token}}`

**Body (raw JSON):**
```json
{
    "hotelId": 1,
    "roomType": "Presidential Suite",
    "price": 25000.0,
    "capacity": 4,
    "availability": true,
    "amenities": "WiFi, AC, Smart TV, Jacuzzi, Private Pool, Butler Service",
    "imageUrl": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
}
```

---

### 4.5 Update Room (Admin Only)

```
PUT {{base_url}}/api/rooms/1
```

**Authorization:** Bearer Token → `{{admin_token}}`

**Body (raw JSON):**
```json
{
    "hotelId": 1,
    "roomType": "Deluxe - Renovated",
    "price": 5500.0,
    "capacity": 2,
    "availability": true,
    "amenities": "WiFi, AC, Smart TV, Mini Bar, Room Service, Balcony"
}
```

---

### 4.6 Delete Room (Admin Only)

```
DELETE {{base_url}}/api/rooms/8
```

**Authorization:** Bearer Token → `{{admin_token}}`

---

## 5. Booking APIs

### 5.1 Create Booking (User)

```
POST {{base_url}}/api/bookings
```

**Authorization:** Bearer Token → `{{token}}` (User token)

**Body (raw JSON):**
```json
{
    "roomId": 1,
    "checkInDate": "2026-04-20",
    "checkOutDate": "2026-04-23"
}
```

**Expected Response (201 Created):**
```json
{
    "id": 1,
    "userId": 2,
    "userName": "Regular User",
    "roomId": 1,
    "roomType": "Deluxe",
    "hotelName": "Grand Palace Hotel",
    "checkInDate": "2026-04-20",
    "checkOutDate": "2026-04-23",
    "totalPrice": 15000.0,
    "bookingStatus": "CONFIRMED",
    "createdAt": "2026-04-16T10:30:00"
}
```

> 💡 **Total Price = Room Price × Number of Nights** (5000 × 3 = 15000)

---

### 5.2 Get Booking History (User)

```
GET {{base_url}}/api/bookings/history
```

**Authorization:** Bearer Token → `{{token}}`

---

### 5.3 Get User Bookings by User ID

```
GET {{base_url}}/api/bookings/user/2
```

**Authorization:** Bearer Token → `{{token}}`

---

### 5.4 Cancel Booking (User)

```
DELETE {{base_url}}/api/bookings/1
```

**Authorization:** Bearer Token → `{{token}}`

**Expected Response (200 OK):**
```json
{
    "id": 1,
    "bookingStatus": "CANCELLED",
    ...
}
```

---

### 5.5 Get All Bookings (Admin Only)

```
GET {{base_url}}/api/bookings/all
```

**Authorization:** Bearer Token → `{{admin_token}}`

---

## 6. Swagger UI Alternative

Instead of Postman, you can also test APIs using **Swagger UI**:

1. Start the backend server
2. Open browser: **http://localhost:8080/swagger-ui.html**
3. Click **Authorize** button (🔓)
4. Enter your JWT token: `Bearer <your-token>`
5. Test any endpoint directly from the browser

> **Swagger UI is great for quick testing during development!**

---

## 7. Testing Checklist

### ✅ Sprint 1 - Database & Auth Testing

| # | Test | Endpoint | Expected |
|---|------|----------|----------|
| 1 | Register new user | POST /api/auth/register | 201 + token |
| 2 | Register duplicate email | POST /api/auth/register | 409 Conflict |
| 3 | Login with valid credentials | POST /api/auth/login | 200 + token |
| 4 | Login with wrong password | POST /api/auth/login | 401 Unauthorized |
| 5 | Access protected route without token | GET /api/auth/me | 403 Forbidden |
| 6 | Access protected route with token | GET /api/auth/me | 200 + user data |

### ✅ Sprint 2 - Hotel & Room API Testing

| # | Test | Endpoint | Expected |
|---|------|----------|----------|
| 7 | Get all hotels (no auth) | GET /api/hotels | 200 + list |
| 8 | Search hotels by location | GET /api/hotels/search?keyword=chennai | 200 + filtered |
| 9 | Create hotel as USER | POST /api/hotels | 403 Forbidden |
| 10 | Create hotel as ADMIN | POST /api/hotels | 201 Created |
| 11 | Update hotel as ADMIN | PUT /api/hotels/1 | 200 Updated |
| 12 | Delete hotel as ADMIN | DELETE /api/hotels/4 | 204 No Content |
| 13 | Get rooms for hotel | GET /api/rooms/hotel/1 | 200 + rooms |
| 14 | Create room as ADMIN | POST /api/rooms | 201 Created |

### ✅ Sprint 3 - Booking Testing

| # | Test | Endpoint | Expected |
|---|------|----------|----------|
| 15 | Create booking (valid dates) | POST /api/bookings | 201 + booking |
| 16 | Create booking (past dates) | POST /api/bookings | 400 Bad Request |
| 17 | Create booking (unavailable room) | POST /api/bookings | 400 Bad Request |
| 18 | Cancel own booking | DELETE /api/bookings/1 | 200 + cancelled |
| 19 | Cancel someone else's booking | DELETE /api/bookings/1 | 400 Bad Request |
| 20 | View booking history | GET /api/bookings/history | 200 + list |
| 21 | Admin view all bookings | GET /api/bookings/all | 200 + all |

---

## 8. Common Errors & Fixes

### Error: 403 Forbidden
```
Cause: Missing or invalid JWT token
Fix: Login again and update the token variable
```

### Error: 401 Unauthorized
```
Cause: Wrong credentials or expired token
Fix: Check email/password, or re-login for new token
```

### Error: 409 Conflict
```
Cause: Duplicate email during registration
Fix: Use a different email address
```

### Error: 404 Not Found
```
Cause: Resource (hotel/room/booking) doesn't exist
Fix: Check the ID in the URL
```

### Error: 400 Bad Request
```
Cause: Validation error in request body
Fix: Check required fields and data formats
```

### Error: Connection Refused
```
Cause: Backend server not running
Fix: Start the backend with: mvn spring-boot:run
```

---

## 🔄 Real-Time Monitoring Tips

1. **Watch Logs**: Check `hotel-app.log` in backend root for all API activity
2. **Console Logs**: Spring Boot console shows SQL queries and request details
3. **Swagger Live Docs**: http://localhost:8080/swagger-ui.html
4. **Database Check**: Connect to Aiven MySQL using MySQL Workbench or DBeaver to verify data

---

## 📦 Postman Collection Export

After creating all requests in Postman:
1. Right-click the collection → **Export**
2. Select **Collection v2.1** format
3. Save as `Hotel-Booking-API.postman_collection.json`
4. Share with team via GitHub

---

> **Backend URL:** http://localhost:8080
> **Swagger UI:** http://localhost:8080/swagger-ui.html
> **API Docs:** http://localhost:8080/v3/api-docs
