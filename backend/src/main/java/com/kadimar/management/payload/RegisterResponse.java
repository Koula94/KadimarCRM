package com.kadimar.management.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String token;
    private UserDTO user;

    @Data
    @AllArgsConstructor
    public static class UserDTO {
        private String email;
        private String firstName;
        private String lastName;
    }
}
