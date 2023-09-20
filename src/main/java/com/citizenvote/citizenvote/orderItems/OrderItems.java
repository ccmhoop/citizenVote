package com.citizenvote.citizenvote.orderItems;

import com.citizenvote.citizenvote.orderDetails.OrderDetails;
import com.citizenvote.citizenvote.product.Product;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer sessionId;

    private Integer quantity;

    @ManyToOne
    private OrderDetails orderDetails;

}
