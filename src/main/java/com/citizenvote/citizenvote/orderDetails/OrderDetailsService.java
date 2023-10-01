package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItems;
import com.citizenvote.citizenvote.product.ProductRepository;
import com.citizenvote.citizenvote.product.ProductResponse;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailsService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> fetchTotal(OrderDetailsResponse items, UserResponse userDetails) {
        int userPoints = userDetails.getPoints();
        int total = 0;

        List<ProductResponse> response = new ArrayList<>();

        for (OrderItems product : items.getOrderItems()) {
            total += Integer.parseInt(productRepository.findById(product.getId()).get().getPoints()) * product.getQuantity();
            var item = ProductResponse.builder()
                    .name(productRepository.findById(product.getId()).get().getName())
                    .build();
            response.add(item);
        }
//        if (userPoints - total < 0) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(HttpStatus.BAD_REQUEST);
//        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(OrderDetailsResponse.builder()
                        .total(total)
                        .pointsAfterDeduction(userPoints - total)
                        .productResponse(response)
                        .userResponse(userDetails)
                        .build());
    }

    public int calculateTotal(OrderDetailsResponse items){
        int total = 0;
        for (OrderItems product : items.getOrderItems()) {
            total += Integer.parseInt(productRepository.findById(product.getId()).get().getPoints()) * product.getQuantity();
        }
        return total;
    }


    public boolean completeOrderCheck(OrderDetailsResponse items, User user) {
        int total = calculateTotal(items);
//        for (OrderItems product : items.getOrderItems()) {
//            total += Integer.parseInt(productRepository.findById(product.getId()).get().getPoints()) * product.getQuantity();
//        }
        if (user.getPoints() - total < 0){
            return true ;
        }
        user.setPoints(user.getPoints() - total);
        return false ;
    }
}
