package com.citizenvote.citizenvote.user;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/hello")
public class TestController {

    @GetMapping
    public ResponseEntity<String> Hello() {
        return ResponseEntity.ok("Hello");
    }

}
