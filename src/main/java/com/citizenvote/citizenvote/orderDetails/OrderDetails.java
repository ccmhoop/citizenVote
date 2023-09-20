package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItems;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double total;

    @OneToMany(mappedBy = "orderDetails",fetch = FetchType.EAGER)
    private List<OrderItems> orderItems;

}
