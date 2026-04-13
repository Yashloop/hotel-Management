package com.hotel.booking.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for hotel creation/update requests.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {

    @NotBlank(message = "Hotel name is required")
    @Size(min = 2, max = 150)
    private String name;

    @NotBlank(message = "Location is required")
    @Size(min = 2, max = 200)
    private String location;

    private String description;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "5.0")
    private Double rating;

    private String imageUrl;
}
