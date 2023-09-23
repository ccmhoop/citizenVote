package com.citizenvote.citizenvote.orderDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/shop/basket")
public class OrderDetailsController {

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @Autowired
    OrderDetailsService service;

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


}
