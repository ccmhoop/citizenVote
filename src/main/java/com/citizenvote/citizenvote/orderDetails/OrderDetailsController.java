package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.authentication.AuthenticationService;
import com.citizenvote.citizenvote.orderItems.OrderItemsService;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/shop/basket")
public class OrderDetailsController {

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderDetailsService service;

    @Autowired
    OrderItemsService orderItemsService;

    @Autowired
    AuthenticationService authService;

//    @PostMapping("/checkout")
//    public Integer fetchTotal(@RequestPart("checkout") OrderDetailsResponse[] orderTotal){
//        System.out.println(Arrays.toString(orderTotal));
//    return service.fetchTotal(orderTotal);
//    }


    @PostMapping("/checkout")
    OrderDetailsResponse fetchTotal(@RequestBody OrderDetailsResponse[] orderTotal) {
//        System.out.println(Arrays.toString(orderTotal));
        return service.fetchTotal(orderTotal);
    }

    @PostMapping(value = "/checkout/complete")
    public void completeOrder(@RequestBody OrderDetailsResponse[] orderDetails) throws IOException {

        var userResponse = authService.getUser(orderDetails[0].getUserId());
        var user = User.builder()
                .adress(userResponse.getAdress())
                .email(userResponse.getEmail())
                .firstname(userResponse.getFirstname())
                .lastname(userResponse.getLastname())
                .role(userResponse.getRole())
                .phoneNumber(userResponse.getPhoneNumber())
                .id(userResponse.getId())
                .points(userResponse.getPoints())
                .username(userResponse.getUsername())
                .build();

        var order = OrderDetails.builder()
                .total(orderDetails[0].getTotal())
                .user(user)
                .build();
        orderDetailsRepository.save(order);
        orderItemsService.saveOrderedItem(orderDetails[0], order);
    }


}
