package com.hotel.booking.service;

import com.hotel.booking.dto.HotelRequest;
import com.hotel.booking.dto.HotelResponse;
import com.hotel.booking.dto.RoomResponse;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.HotelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for hotel CRUD operations and search functionality.
 * 
 * Backend Dev 1 Responsibility
 */
@Service
public class HotelService {

    private static final Logger logger = LoggerFactory.getLogger(HotelService.class);

    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Get all hotels.
     */
    public List<HotelResponse> getAllHotels() {
        logger.info("Fetching all hotels");
        return hotelRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get hotel by ID.
     */
    public HotelResponse getHotelById(Long id) {
        logger.info("Fetching hotel with id: {}", id);
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));
        return mapToResponse(hotel);
    }

    /**
     * Search hotels by location or name keyword.
     */
    public List<HotelResponse> searchHotels(String keyword) {
        logger.info("Searching hotels with keyword: {}", keyword);
        return hotelRepository.searchHotels(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Create a new hotel (Admin only).
     */
    public HotelResponse createHotel(HotelRequest request) {
        logger.info("Creating new hotel: {}", request.getName());
        Hotel hotel = Hotel.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .rating(request.getRating() != null ? request.getRating() : 0.0)
                .imageUrl(request.getImageUrl())
                .build();

        hotel = hotelRepository.save(hotel);
        logger.info("✅ Hotel created successfully with id: {}", hotel.getId());
        return mapToResponse(hotel);
    }

    /**
     * Update an existing hotel (Admin only).
     */
    public HotelResponse updateHotel(Long id, HotelRequest request) {
        logger.info("Updating hotel with id: {}", id);
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));

        hotel.setName(request.getName());
        hotel.setLocation(request.getLocation());
        hotel.setDescription(request.getDescription());
        if (request.getRating() != null) hotel.setRating(request.getRating());
        if (request.getImageUrl() != null) hotel.setImageUrl(request.getImageUrl());

        hotel = hotelRepository.save(hotel);
        logger.info("✅ Hotel updated successfully: {}", hotel.getId());
        return mapToResponse(hotel);
    }

    /**
     * Delete a hotel (Admin only).
     */
    public void deleteHotel(Long id) {
        logger.info("Deleting hotel with id: {}", id);
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", id));
        hotelRepository.delete(hotel);
        logger.info("✅ Hotel deleted successfully: {}", id);
    }

    /**
     * Map Hotel entity to HotelResponse DTO.
     */
    private HotelResponse mapToResponse(Hotel hotel) {
        List<RoomResponse> roomResponses = null;
        if (hotel.getRooms() != null) {
            roomResponses = hotel.getRooms().stream()
                    .map(room -> RoomResponse.builder()
                            .id(room.getId())
                            .hotelId(hotel.getId())
                            .hotelName(hotel.getName())
                            .roomType(room.getRoomType())
                            .price(room.getPrice())
                            .capacity(room.getCapacity())
                            .availability(room.getAvailability())
                            .amenities(room.getAmenities())
                            .imageUrl(room.getImageUrl())
                            .build())
                    .collect(Collectors.toList());
        }

        return HotelResponse.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .location(hotel.getLocation())
                .description(hotel.getDescription())
                .rating(hotel.getRating())
                .imageUrl(hotel.getImageUrl())
                .createdAt(hotel.getCreatedAt())
                .rooms(roomResponses)
                .build();
    }
}
