package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Booking Controller - handles booking creation, cancellation, and history.
 * 
 * All endpoints require authentication.
 */
@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "Booking management endpoints")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BookingController {

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingService bookingService;

    @PostMapping
    @Operation(summary = "Create booking", description = "Book a hotel room (Authenticated users)")
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request,
                                                          Authentication authentication) {
        logger.info("POST /api/bookings - User: {}", authentication.getName());
        BookingResponse response = bookingService.createBooking(request, authentication.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancel booking", description = "Cancel an existing booking")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id,
                                                          Authentication authentication) {
        logger.info("DELETE /api/bookings/{} - User: {}", id, authentication.getName());
        BookingResponse response = bookingService.cancelBooking(id, authentication.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user bookings", description = "Get all bookings for a specific user")
    public ResponseEntity<List<BookingResponse>> getUserBookings(@PathVariable Long userId) {
        logger.info("GET /api/bookings/user/{}", userId);
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @GetMapping("/history")
    @Operation(summary = "Get booking history", description = "Get booking history for the logged-in user")
    public ResponseEntity<List<BookingResponse>> getBookingHistory(Authentication authentication) {
        logger.info("GET /api/bookings/history - User: {}", authentication.getName());
        return ResponseEntity.ok(bookingService.getBookingHistory(authentication.getName()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all bookings (Admin)", description = "Get all bookings in the system (Admin only)")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        logger.info("GET /api/bookings/all (Admin)");
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
