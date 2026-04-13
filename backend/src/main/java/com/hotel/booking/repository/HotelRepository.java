package com.hotel.booking.repository;

import com.hotel.booking.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Hotel entity CRUD operations with search capabilities.
 */
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByLocationContainingIgnoreCase(String location);

    List<Hotel> findByNameContainingIgnoreCase(String name);

    @Query("SELECT h FROM Hotel h WHERE LOWER(h.location) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(h.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Hotel> searchHotels(@Param("keyword") String keyword);

    List<Hotel> findByRatingGreaterThanEqual(Double rating);
}
