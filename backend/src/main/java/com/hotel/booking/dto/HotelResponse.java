package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for hotel responses (avoids entity serialization issues).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelResponse {
    private Long id;
    private String name;
    private String location;
    private String description;
    private Double rating;
    private String imageUrl;
    private LocalDateTime createdAt;
    private List<RoomResponse> rooms;
}
