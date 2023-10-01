package com.citizenvote.citizenvote.authentication;

import com.citizenvote.citizenvote.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
       return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
       return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/user")
    public ResponseEntity<UserResponse> getUser(@RequestBody JwtRequest request){
        System.out.println(request.getToken());
        return ResponseEntity.ok(authenticationService.getUser(request.getToken()));
    }

    @PostMapping("/role")
    public ResponseEntity<String> roleCheck(@RequestBody AuthenticationResponse request) {
        if( authenticationService.authRole(request.getToken()).getRole() != null){
            var role = authenticationService.authRole(request.getToken()).getRole();
            if (authenticationService.autherizeUrl(String.valueOf(role),request.getCurrentUrl())) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
