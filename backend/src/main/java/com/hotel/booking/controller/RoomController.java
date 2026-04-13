package com.hotel.booking.controller;

import com.hotel.booking.dto.RoomRequest;
import com.hotel.booking.dto.RoomResponse;
import com.hotel.booking.service.RoomService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Room Controller - handles room CRUD operations.
 * 
 * GET endpoints are public, POST/PUT/DELETE require ADMIN role.
 */
@RestController
@RequestMapping("/api/rooms")
@Tag(name = "Rooms", description = "Room management endpoints")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class RoomController {

    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    private RoomService roomService;

    @GetMapping("/hotel/{hotelId}")
    @Operation(summary = "Get rooms by hotel", description = "Retrieve all rooms for a specific hotel (Public)")
    public ResponseEntity<List<RoomResponse>> getRoomsByHotelId(@PathVariable Long hotelId) {
        logger.info("GET /api/rooms/hotel/{}", hotelId);
        return ResponseEntity.ok(roomService.getRoomsByHotelId(hotelId));
    }

    @GetMapping("/hotel/{hotelId}/available")
    @Operation(summary = "Get available rooms", description = "Retrieve available rooms for a hotel (Public)")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(@PathVariable Long hotelId) {
        logger.info("GET /api/rooms/hotel/{}/available", hotelId);
        return ResponseEntity.ok(roomService.getAvailableRooms(hotelId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room by ID", description = "Retrieve room details by ID (Public)")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        logger.info("GET /api/rooms/{}", id);
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create room (Admin)", description = "Create a new room for a hotel (Admin only)")
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        logger.info("POST /api/rooms - Hotel ID: {}, Type: {}", request.getHotelId(), request.getRoomType());
        return new ResponseEntity<>(roomService.createRoom(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update room (Admin)", description = "Update existing room details (Admin only)")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id,
                                                    @Valid @RequestBody RoomRequest request) {
        logger.info("PUT /api/rooms/{}", id);
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete room (Admin)", description = "Delete a room (Admin only)")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        logger.info("DELETE /api/rooms/{}", id);
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
