package com.citizenvote.citizenvote.authentication;

import com.citizenvote.citizenvote.config.JwtService;
import com.citizenvote.citizenvote.user.Role;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.user.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .phoneNumber(request.getPhonenumber())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .adress(request.getAdress())
                .points(0)
                .postPrivilege(false)
                .role(Role.CITIZEN)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(new HashMap<>(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .name(request.getUsername())
                .role(Role.CITIZEN)
                .build();
    }

    public String registerManicipality(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .phoneNumber(request.getPhonenumber())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .adress(request.getAdress())
                .points(0)
                .postPrivilege(false)
                .role(Role.MANICIPALITY)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(new HashMap<>(), user);
        return "Manicipality Created";
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(new HashMap<>(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .name(user.getUsername())
                .role(user.getRole())
                .id(user.getId())
                .points(user.getPoints())
                .build();
    }


    public UserResponse getUser(String token) {
        String username = jwtService.extractUserName(token);
        User user = userRepository.findByUsername(username).get();
        return UserResponse.builder()
                .adress(user.getAdress())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole())
                .phoneNumber(user.getPhoneNumber())
                .id(user.getId())
                .points(user.getPoints())
                .username(username)
                .build();
    }

    public Optional<User> findUserByName(String name){
        return userRepository.findByUsername(name);
    }


    public UserResponse authRole(String token) {
        String username = jwtService.extractUserName(token);
        User user = userRepository.findByUsername(username).get();
        return UserResponse.builder()
                .role(user.getRole())
                .build();
    }

    protected boolean autherizeUrl(String role,String url){



        if(role.equals("MANICIPALITY")){
            return switch (url){
                case ("http://localhost:5173/mmenu"),
                        ("http://localhost:5173/editproject"),
                        ("http://localhost:5173/shop_management"),
                        ("http://localhost:5173/project_overview") -> true;
                default -> false;
            };
        }
        if(role.equals("CITIZEN")){
            return switch (url){
                case ("http://localhost:5173/shop"),
                        ("http://localhost:5173/basket"),
                        ("http://localhost:5173/checkout"),
                        ("http://localhost:5173/project_overview")-> true;
                default -> false;
            };
        }



    return false;
    }


}
