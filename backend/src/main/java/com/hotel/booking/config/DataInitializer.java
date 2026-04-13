package com.hotel.booking.config;

import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Role;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Data Initializer - seeds default admin/user accounts and sample hotel data on startup.
 * Only creates data if it doesn't already exist (idempotent).
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        logger.info("========== Initializing Default Data ==========");

        // Create default ADMIN user
        if (!userRepository.existsByEmail("admin@gmail.com")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("9876543210")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            logger.info("✅ Default ADMIN user created: admin@gmail.com / admin123");
        }

        // Create default USER
        if (!userRepository.existsByEmail("user@gmail.com")) {
            User user = User.builder()
                    .name("Regular User")
                    .email("user@gmail.com")
                    .password(passwordEncoder.encode("user123"))
                    .phone("9876543211")
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            logger.info("✅ Default USER created: user@gmail.com / user123");
        }

        // Create sample hotels if none exist
        if (hotelRepository.count() == 0) {
            Hotel hotel1 = Hotel.builder()
                    .name("Grand Palace Hotel")
                    .location("Chennai")
                    .description("A luxurious 5-star hotel in the heart of Chennai with world-class amenities, rooftop pool, and fine dining restaurants.")
                    .rating(4.5)
                    .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800")
                    .build();
            hotel1 = hotelRepository.save(hotel1);

            Hotel hotel2 = Hotel.builder()
                    .name("Ocean View Resort")
                    .location("Mumbai")
                    .description("Beautiful beachfront resort with stunning ocean views, spa facilities, and adventure activities.")
                    .rating(4.2)
                    .imageUrl("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800")
                    .build();
            hotel2 = hotelRepository.save(hotel2);

            Hotel hotel3 = Hotel.builder()
                    .name("Mountain Retreat")
                    .location("Bangalore")
                    .description("A peaceful retreat in the tech hub of India, perfect for business and leisure travelers.")
                    .rating(4.0)
                    .imageUrl("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800")
                    .build();
            hotel3 = hotelRepository.save(hotel3);

            // Create sample rooms for Hotel 1
            roomRepository.save(Room.builder()
                    .hotel(hotel1).roomType("Deluxe").price(5000.0).capacity(2)
                    .availability(true).amenities("WiFi, AC, TV, Mini Bar, Room Service")
                    .imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800")
                    .build());
            roomRepository.save(Room.builder()
                    .hotel(hotel1).roomType("Suite").price(10000.0).capacity(4)
                    .availability(true).amenities("WiFi, AC, TV, Mini Bar, Jacuzzi, Living Room, Room Service")
                    .imageUrl("https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800")
                    .build());
            roomRepository.save(Room.builder()
                    .hotel(hotel1).roomType("Standard").price(2500.0).capacity(2)
                    .availability(true).amenities("WiFi, AC, TV")
                    .imageUrl("https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800")
                    .build());

            // Create sample rooms for Hotel 2
            roomRepository.save(Room.builder()
                    .hotel(hotel2).roomType("Sea View Deluxe").price(7000.0).capacity(2)
                    .availability(true).amenities("WiFi, AC, TV, Balcony, Sea View, Room Service")
                    .imageUrl("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800")
                    .build());
            roomRepository.save(Room.builder()
                    .hotel(hotel2).roomType("Standard").price(3500.0).capacity(2)
                    .availability(true).amenities("WiFi, AC, TV")
                    .imageUrl("https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800")
                    .build());

            // Create sample rooms for Hotel 3
            roomRepository.save(Room.builder()
                    .hotel(hotel3).roomType("Business Suite").price(6000.0).capacity(2)
                    .availability(true).amenities("WiFi, AC, TV, Work Desk, Meeting Room Access")
                    .imageUrl("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800")
                    .build());
            roomRepository.save(Room.builder()
                    .hotel(hotel3).roomType("Family Room").price(4500.0).capacity(4)
                    .availability(true).amenities("WiFi, AC, TV, Extra Bed, Kids Play Area")
                    .imageUrl("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800")
                    .build());

            logger.info("✅ Sample hotels and rooms created successfully");
        }

        logger.info("========== Data Initialization Complete ==========");
    }
}
