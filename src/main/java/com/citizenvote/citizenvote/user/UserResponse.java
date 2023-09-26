package com.citizenvote.citizenvote.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String phoneNumber;
    private Role role;
    private String adress;
    private String email;
    private Integer points;
}
