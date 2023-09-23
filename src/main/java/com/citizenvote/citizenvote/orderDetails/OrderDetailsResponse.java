package com.citizenvote.citizenvote.orderDetails;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Nullable
@Builder
public class OrderDetailsResponse {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;

    private Integer totalCost;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer quantity;



}
