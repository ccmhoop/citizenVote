package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItems;
import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Nullable
@Builder
public class OrderDetailsResponse {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;

    private Integer total;

    private Integer sessionId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer quantity;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<OrderItems> orderItems;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private  String userId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private User user;



}
