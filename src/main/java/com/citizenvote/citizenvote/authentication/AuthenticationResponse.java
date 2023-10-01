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
    private Long id;
    private Integer points;
    private Role role;
    private String currentUrl;

    //private MultipartFile avatar;
}
