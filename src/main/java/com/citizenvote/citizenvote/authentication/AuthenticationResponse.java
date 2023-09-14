package com.citizenvote.citizenvote.authentication;

import com.citizenvote.citizenvote.user.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {

    private String token;
    private String name;

    private Role role;

    //private MultipartFile avatar;
}
