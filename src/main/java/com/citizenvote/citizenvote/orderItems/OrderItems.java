package com.citizenvote.citizenvote.orderItems;

import com.citizenvote.citizenvote.orderDetails.OrderDetails;
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

    @ManyToOne
    private OrderDetails orderDetails;

}
