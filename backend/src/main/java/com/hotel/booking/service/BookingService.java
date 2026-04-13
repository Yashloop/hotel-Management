package com.hotel.booking.service;

import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.entity.*;
import com.hotel.booking.exception.BadRequestException;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for booking operations - create, cancel, and view booking history.
 * 
 * Backend Dev 1 Responsibility
 */
@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    /**
     * Create a new booking.
     */
    @Transactional
    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        logger.info("Creating booking for user: {} | Room ID: {}", userEmail, request.getRoomId());

        // Validate dates
        if (request.getCheckOutDate().isBefore(request.getCheckInDate()) ||
            request.getCheckOutDate().isEqual(request.getCheckInDate())) {
            throw new BadRequestException("Check-out date must be after check-in date");
        }

        // Fetch user and room
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", request.getRoomId()));

        // Check room availability
        if (!room.getAvailability()) {
            throw new BadRequestException("Room is not available for booking");
        }

        // Calculate total price (price per night × number of nights)
        long numberOfNights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        double totalPrice = room.getPrice() * numberOfNights;

        // Create booking
        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.CONFIRMED)
                .build();

        booking = bookingRepository.save(booking);

        // Update room availability
        room.setAvailability(false);
        roomRepository.save(room);

        logger.info("✅ Booking created successfully | Booking ID: {} | Total: ₹{}", booking.getId(), totalPrice);

        // Send booking confirmation email
        try {
            emailService.sendBookingConfirmationEmail(
                    user.getEmail(),
                    user.getName(),
                    room.getHotel().getName(),
                    room.getRoomType(),
                    request.getCheckInDate().toString(),
                    request.getCheckOutDate().toString(),
                    totalPrice
            );
        } catch (Exception e) {
            logger.warn("Failed to send booking confirmation email: {}", e.getMessage());
        }

        return mapToResponse(booking);
    }

    /**
     * Cancel a booking.
     */
    @Transactional
    public BookingResponse cancelBooking(Long bookingId, String userEmail) {
        logger.info("Cancelling booking id: {} by user: {}", bookingId, userEmail);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        // Verify the booking belongs to the user (or user is admin)
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        if (!booking.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new BadRequestException("You can only cancel your own bookings");
        }

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }

        // Update booking status
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Make room available again
        Room room = booking.getRoom();
        room.setAvailability(true);
        roomRepository.save(room);

        logger.info("✅ Booking cancelled successfully: {}", bookingId);

        // Send cancellation email
        try {
            emailService.sendBookingCancellationEmail(
                    user.getEmail(),
                    user.getName(),
                    room.getHotel().getName(),
                    booking.getId()
            );
        } catch (Exception e) {
            logger.warn("Failed to send cancellation email: {}", e.getMessage());
        }

        return mapToResponse(booking);
    }

    /**
     * Get all bookings for a specific user.
     */
    public List<BookingResponse> getUserBookings(Long userId) {
        logger.info("Fetching bookings for user id: {}", userId);
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get booking history for the logged-in user.
     */
    public List<BookingResponse> getBookingHistory(String userEmail) {
        logger.info("Fetching booking history for user: {}", userEmail);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all bookings (Admin only).
     */
    public List<BookingResponse> getAllBookings() {
        logger.info("Fetching all bookings (Admin)");
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map Booking entity to BookingResponse DTO.
     */
    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .roomId(booking.getRoom().getId())
                .roomType(booking.getRoom().getRoomType())
                .hotelName(booking.getRoom().getHotel().getName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus().name())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
