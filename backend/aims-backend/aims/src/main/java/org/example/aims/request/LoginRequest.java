package org.example.aims.request;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    private String email;

    @NotBlank(message = "Username cannot be blank")
    private String username;


    @NotBlank(message = "Password cannot be blank")
    private String password;



}
