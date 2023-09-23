package com.citizenvote.citizenvote.orderItems;

import com.citizenvote.citizenvote.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth/auth")
public class OrderItemsController {


//   private final OrderItemsRepository orderItemsRepository;
//
//   private final OrderItemsService service;

//    @PostMapping("shop/session")
//    public ResponseEntity<?> saveSession(OrderItems orderItems){
//        String status = service.saveSessionResponse(orderItems);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(status);
//    }

//    @GetMapping("shop/total")
//    public ResponseEntity<OrderItemsResponse> fetchProductInfo(@RequestPart("total") Long id){
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(service.fetchTotal(id));
//    }

}


