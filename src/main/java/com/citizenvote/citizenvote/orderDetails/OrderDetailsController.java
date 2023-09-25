package com.citizenvote.citizenvote.orderDetails;

import com.citizenvote.citizenvote.orderItems.OrderItemsService;
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

//    @PostMapping("/checkout")
//    public Integer fetchTotal(@RequestPart("checkout") OrderDetailsResponse[] orderTotal){
//        System.out.println(Arrays.toString(orderTotal));
//    return service.fetchTotal(orderTotal);
//    }


    @PostMapping("/checkout")
    OrderDetailsResponse fetchTotal(@RequestBody OrderDetailsResponse[] orderTotal){
//        System.out.println(Arrays.toString(orderTotal));
        return service.fetchTotal(orderTotal);
    }

    @PostMapping(value = "/checkout/complete")
    public void completeOrder(@RequestBody OrderDetailsResponse[] orderDetails) throws IOException {
        var order = OrderDetails.builder()
               .total(orderDetails[0].getTotal())
               .user(userRepository.getById(orderDetails[0].getUserId()))
               .build();
       orderDetailsRepository.save(order);
        orderItemsService.saveOrder(orderDetails[0],order);
    }




}
