package com.hotel.booking.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for room creation/update requests.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {

    @NotNull(message = "Hotel ID is required")
    private Long hotelId;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private Double price;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    private Boolean availability;

    private String amenities;

    private String imageUrl;
}
