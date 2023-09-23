package com.citizenvote.citizenvote.orderItems;

import com.citizenvote.citizenvote.orderDetails.OrderDetailsService;
import com.citizenvote.citizenvote.product.Product;
import com.citizenvote.citizenvote.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderItemsService {

    @Autowired
    OrderItemsRepository orderItemsRepository;

    @Autowired
    OrderDetailsService service;

    @Autowired
    ProductService productService;
//    public String saveSessionResponse(OrderItems orderItems){
//        if(orderItems.getId() != null){
//            orderItemsRepository.save(orderItems);
//            return "success";
//        }else{
//            return "failed";
//        }
//    }



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
