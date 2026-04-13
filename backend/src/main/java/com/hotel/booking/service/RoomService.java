package com.hotel.booking.service;

import com.hotel.booking.dto.RoomRequest;
import com.hotel.booking.dto.RoomResponse;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.exception.ResourceNotFoundException;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for room CRUD operations.
 * 
 * Backend Dev 1 Responsibility
 */
@Service
public class RoomService {

    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Get all rooms for a specific hotel.
     */
    public List<RoomResponse> getRoomsByHotelId(Long hotelId) {
        logger.info("Fetching rooms for hotel id: {}", hotelId);

        // Verify hotel exists
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", hotelId));

        return roomRepository.findByHotelId(hotelId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get available rooms for a specific hotel.
     */
    public List<RoomResponse> getAvailableRooms(Long hotelId) {
        logger.info("Fetching available rooms for hotel id: {}", hotelId);
        return roomRepository.findByHotelIdAndAvailabilityTrue(hotelId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get room by ID.
     */
    public RoomResponse getRoomById(Long id) {
        logger.info("Fetching room with id: {}", id);
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        return mapToResponse(room);
    }

    /**
     * Create a new room (Admin only).
     */
    public RoomResponse createRoom(RoomRequest request) {
        logger.info("Creating new room for hotel id: {}", request.getHotelId());

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel", "id", request.getHotelId()));

        Room room = Room.builder()
                .hotel(hotel)
                .roomType(request.getRoomType())
                .price(request.getPrice())
                .capacity(request.getCapacity() != null ? request.getCapacity() : 1)
                .availability(request.getAvailability() != null ? request.getAvailability() : true)
                .amenities(request.getAmenities())
                .imageUrl(request.getImageUrl())
                .build();

        room = roomRepository.save(room);
        logger.info("✅ Room created successfully with id: {}", room.getId());
        return mapToResponse(room);
    }

    /**
     * Update an existing room (Admin only).
     */
    public RoomResponse updateRoom(Long id, RoomRequest request) {
        logger.info("Updating room with id: {}", id);

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));

        if (request.getRoomType() != null) room.setRoomType(request.getRoomType());
        if (request.getPrice() != null) room.setPrice(request.getPrice());
        if (request.getCapacity() != null) room.setCapacity(request.getCapacity());
        if (request.getAvailability() != null) room.setAvailability(request.getAvailability());
        if (request.getAmenities() != null) room.setAmenities(request.getAmenities());
        if (request.getImageUrl() != null) room.setImageUrl(request.getImageUrl());

        room = roomRepository.save(room);
        logger.info("✅ Room updated successfully: {}", room.getId());
        return mapToResponse(room);
    }

    /**
     * Delete a room (Admin only).
     */
    public void deleteRoom(Long id) {
        logger.info("Deleting room with id: {}", id);
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room", "id", id));
        roomRepository.delete(room);
        logger.info("✅ Room deleted successfully: {}", id);
    }

    /**
     * Map Room entity to RoomResponse DTO.
     */
    private RoomResponse mapToResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .hotelId(room.getHotel().getId())
                .hotelName(room.getHotel().getName())
                .roomType(room.getRoomType())
                .price(room.getPrice())
                .capacity(room.getCapacity())
                .availability(room.getAvailability())
                .amenities(room.getAmenities())
                .imageUrl(room.getImageUrl())
                .build();
    }
}
