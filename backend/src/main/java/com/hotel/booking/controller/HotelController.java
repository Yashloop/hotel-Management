package com.hotel.booking.controller;

import com.hotel.booking.dto.HotelRequest;
import com.hotel.booking.dto.HotelResponse;
import com.hotel.booking.service.HotelService;
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
 * Hotel Controller - handles hotel CRUD and search operations.
 * 
 * GET endpoints are public, POST/PUT/DELETE require ADMIN role.
 */
@RestController
@RequestMapping("/api/hotels")
@Tag(name = "Hotels", description = "Hotel management endpoints")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class HotelController {

    private static final Logger logger = LoggerFactory.getLogger(HotelController.class);

    @Autowired
    private HotelService hotelService;

    @GetMapping
    @Operation(summary = "Get all hotels", description = "Retrieve list of all hotels (Public)")
    public ResponseEntity<List<HotelResponse>> getAllHotels() {
        logger.info("GET /api/hotels");
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hotel by ID", description = "Retrieve hotel details by ID (Public)")
    public ResponseEntity<HotelResponse> getHotelById(@PathVariable Long id) {
        logger.info("GET /api/hotels/{}", id);
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }

    @GetMapping("/search")
    @Operation(summary = "Search hotels", description = "Search hotels by location or name keyword (Public)")
    public ResponseEntity<List<HotelResponse>> searchHotels(@RequestParam String keyword) {
        logger.info("GET /api/hotels/search?keyword={}", keyword);
        return ResponseEntity.ok(hotelService.searchHotels(keyword));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create hotel (Admin)", description = "Create a new hotel listing (Admin only)")
    public ResponseEntity<HotelResponse> createHotel(@Valid @RequestBody HotelRequest request) {
        logger.info("POST /api/hotels - Name: {}", request.getName());
        return new ResponseEntity<>(hotelService.createHotel(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update hotel (Admin)", description = "Update existing hotel details (Admin only)")
    public ResponseEntity<HotelResponse> updateHotel(@PathVariable Long id,
                                                      @Valid @RequestBody HotelRequest request) {
        logger.info("PUT /api/hotels/{}", id);
        return ResponseEntity.ok(hotelService.updateHotel(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete hotel (Admin)", description = "Delete a hotel listing (Admin only)")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        logger.info("DELETE /api/hotels/{}", id);
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}
