package com.citizenvote.citizenvote.orderItems;

import com.citizenvote.citizenvote.orderDetails.OrderDetails;
import com.citizenvote.citizenvote.orderDetails.OrderDetailsResponse;
import com.citizenvote.citizenvote.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemsService {

    @Autowired
    OrderItemsRepository orderItemsRepository;

    @Autowired
    ProductRepository productRepository;

    public void saveOrder (OrderDetailsResponse details,OrderDetails order) {
        for (OrderItems item : details.getOrderItems()) {
            orderItemsRepository.save(OrderItems.builder()
                    .orderDetails(order)
                    .product(productRepository.getById(item.getId()))
                    .quantity(item.getQuantity())
                    .build());
        }
    }


//    public Double fetchTotal(s){
//        Double Total;
//        for(OrderItems calculate : items){
//            items.
//
//        }
//
//        return
//    }


}
