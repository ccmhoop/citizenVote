package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItems;
import com.citizenvote.citizenvote.user.User;
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

    private Integer total;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "orderDetails",fetch = FetchType.EAGER)
    private List<OrderItems> orderItems;

}
