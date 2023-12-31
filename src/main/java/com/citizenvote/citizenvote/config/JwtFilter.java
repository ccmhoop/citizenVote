package com.citizenvote.citizenvote.config;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {

       final String bearerToken = request.getHeader("Authorization");
       final String bearerPrefix = "Bearer ";
       final String jwtToken;
       final String username;
       if(bearerToken == null || !bearerToken.startsWith(bearerPrefix)){
           filterChain.doFilter(request, response);
           return;
       }

       jwtToken = bearerToken.substring(bearerPrefix.length());
       username = jwtService.extractUserName(jwtToken);
        System.out.println("Username: " + username + " , Token: " + jwtToken + " , auth: " + SecurityContextHolder.getContext().getAuthentication());
       if( username != null && SecurityContextHolder.getContext().getAuthentication() == null){
           UserDetails userDetails = userDetailsService.loadUserByUsername(username);
           if(jwtService.isTokenValid(jwtToken, userDetails)){
               UsernamePasswordAuthenticationToken upaToken = new UsernamePasswordAuthenticationToken(userDetails, null , userDetails.getAuthorities());
               upaToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(upaToken);
           }
       }
       filterChain.doFilter(request, response);
    }
}
