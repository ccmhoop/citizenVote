package com.citizenvote.citizenvote.orderItems;

import org.springframework.beans.factory.annotation.Autowired;

public class OrderItemsService {

    @Autowired
    OrderItemsRepository orderItemsRepository;

    public String saveSessionResponse(OrderItems orderItems){
        if(orderItems.getId() != null){
            orderItemsRepository.save(orderItems);
            return "success";
        }else{
            return "failed";
        }
    }
}
