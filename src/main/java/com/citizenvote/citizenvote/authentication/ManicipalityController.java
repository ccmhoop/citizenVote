package com.citizenvote.citizenvote.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/manicipalityRegistry")
@CrossOrigin
@RequiredArgsConstructor
public class ManicipalityController {

    private final AuthenticationService authenticationService;
    @PostMapping
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.registerManicipality(request));
    }
}
