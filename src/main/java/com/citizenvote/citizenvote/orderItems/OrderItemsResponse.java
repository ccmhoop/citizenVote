package com.citizenvote.citizenvote.orderItems;

import jakarta.annotation.Nullable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Nullable
@Builder
public class OrderItemsResponse {

    private Long id;

    private  Integer quantity;

    private Double total;





}
