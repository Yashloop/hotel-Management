package com.hotel.booking.repository;

import com.hotel.booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Room entity CRUD operations.
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHotelId(Long hotelId);

    List<Room> findByHotelIdAndAvailabilityTrue(Long hotelId);

    List<Room> findByRoomTypeContainingIgnoreCase(String roomType);

    List<Room> findByPriceBetween(Double minPrice, Double maxPrice);
}
