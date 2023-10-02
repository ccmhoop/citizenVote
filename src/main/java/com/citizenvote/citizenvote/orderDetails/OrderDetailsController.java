package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.authentication.AuthenticationService;
import com.citizenvote.citizenvote.config.JwtService;
import com.citizenvote.citizenvote.orderItems.OrderItemsService;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.user.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/shop/basket")
public class OrderDetailsController {


    private final OrderDetailsRepository orderDetailsRepository;


    private final UserRepository userRepository;


    private final OrderDetailsService service;


    private final OrderItemsService orderItemsService;


    private final AuthenticationService authService;

    private final JwtService jwtService;

    @PostMapping("/checkout")
    ResponseEntity<?> orderInformation(@RequestBody OrderDetailsResponse[] orderDetails) {
        var authUser = authService.getUser(orderDetails[0].getToken());
        var user = UserResponse.builder()
                .firstname(authUser.getFirstname())
                .lastname(authUser.getLastname())
                .adress(authUser.getAdress())
                .phoneNumber(authUser.getPhoneNumber())
                .points(authUser.getPoints())
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.fetchTotal(orderDetails[0], user));
    }

    @PostMapping(value = "/checkout/complete")
    ResponseEntity<?> completeOrder(@RequestBody OrderDetailsResponse[] orderDetails) throws IOException {
        String username = jwtService.extractUserName(orderDetails[0].getUserId());
        User user = userRepository.findByUsername(username).get();
        int total = service.calculateTotal(orderDetails[0]);

        if (user.getPoints() - total > 0 && orderDetails[0].getOrderItems().size() > 0) {
            user.setPoints(user.getPoints() - total);
            var order = OrderDetails.builder()
                    .total(total)
                    .user(user)
                    .build();
            orderDetailsRepository.save(order);
            orderItemsService.saveOrderedItem(orderDetails[0], order);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(HttpStatus.CONFLICT);
    }
}
