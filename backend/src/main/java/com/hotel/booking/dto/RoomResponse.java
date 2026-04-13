package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for room responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String roomType;
    private Double price;
    private Integer capacity;
    private Boolean availability;
    private String amenities;
    private String imageUrl;
}
