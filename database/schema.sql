-- =====================================================
-- HOTEL BOOKING APPLICATION - Database Schema
-- HCLTech Hackathon 2026
-- Database: Aiven MySQL Cloud (hackathon)
-- =====================================================

-- Create database (run this manually on Aiven if needed)
-- CREATE DATABASE IF NOT EXISTS hackathon;
-- USE hackathon;

-- ==================== 1. USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== 2. HOTELS TABLE ====================
CREATE TABLE IF NOT EXISTS hotels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    rating DOUBLE DEFAULT 0.0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_hotels_location (location),
    INDEX idx_hotels_name (name),
    INDEX idx_hotels_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== 3. ROOMS TABLE ====================
CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hotel_id BIGINT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    capacity INT NOT NULL DEFAULT 1,
    availability BOOLEAN DEFAULT TRUE,
    amenities TEXT,
    image_url VARCHAR(500),
    
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    INDEX idx_rooms_hotel (hotel_id),
    INDEX idx_rooms_type (room_type),
    INDEX idx_rooms_availability (availability)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== 4. BOOKINGS TABLE ====================
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DOUBLE NOT NULL,
    booking_status ENUM('CONFIRMED', 'CANCELLED', 'PENDING', 'COMPLETED') NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_bookings_user (user_id),
    INDEX idx_bookings_room (room_id),
    INDEX idx_bookings_status (booking_status),
    INDEX idx_bookings_dates (check_in_date, check_out_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== 5. PAYMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE,
    amount DOUBLE NOT NULL,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_payments_booking (booking_id),
    INDEX idx_payments_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA (Optional - DataInitializer handles this)
-- =====================================================

-- Default Admin User (password: admin123 - BCrypt encoded)
-- INSERT INTO users (name, email, password, phone, role) VALUES 
-- ('Admin User', 'admin@gmail.com', '$2a$10$...', '9876543210', 'ADMIN');

-- Default Regular User (password: user123 - BCrypt encoded)  
-- INSERT INTO users (name, email, password, phone, role) VALUES 
-- ('Regular User', 'user@gmail.com', '$2a$10$...', '9876543211', 'USER');
