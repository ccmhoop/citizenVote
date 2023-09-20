package com.citizenvote.citizenvote.orderItems;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/auth")
public class OrderItemsController {

    @Autowired
    OrderItemsRepository orderItemsRepository;

    OrderItemsService service;

    @PostMapping("shop/session")
    public ResponseEntity<?> saveSession(OrderItems orderItems){
        String status = service.saveSessionResponse(orderItems);
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }



}


