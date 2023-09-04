package com.citizenvote.citizenvote.user;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {

       final String bearerToken = request.getHeader("Authorization");
       final String bearerPrefix = "Bearer ";
       final String jwtToken;
       final String username;
       if(bearerToken == null ||bearerToken.startsWith(bearerPrefix)){
           filterChain.doFilter(request, response);
           return;
       }

       jwtToken = bearerToken.substring(bearerPrefix.length());
       email = jwtService.extractUserName();
    }
}
