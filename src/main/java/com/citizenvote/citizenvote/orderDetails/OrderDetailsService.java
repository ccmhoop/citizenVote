package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItemsRepository;
import com.citizenvote.citizenvote.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class OrderDetailsService {

    @Autowired
    ProductRepository productRepository;
        public OrderDetailsResponse fetchTotal(OrderDetailsResponse[] items){

            int total =0;
            System.out.println(items[0].getId());

        for(OrderDetailsResponse calculate : items){
          int cost = Integer.parseInt(productRepository.findById(calculate.getId()).get().getPoints())*calculate.getQuantity();
          total += cost;
        }
        return OrderDetailsResponse.builder()
                .totalCost(total)
                .build();
    }

}
