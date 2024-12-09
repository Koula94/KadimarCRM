package com.kadimar.management.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SecurityConfigTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void publicEndpointsShouldBeAccessible() {
        // Test /api/auth/login endpoint
        String loginUrl = String.format("http://localhost:%d/api/auth/login", port);
        ResponseEntity<String> loginResponse = restTemplate.getForEntity(loginUrl, String.class);
        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.METHOD_NOT_ALLOWED); // Because GET is not allowed, but not 403

        // Test /api/auth/register endpoint
        String registerUrl = String.format("http://localhost:%d/api/auth/register", port);
        ResponseEntity<String> registerResponse = restTemplate.getForEntity(registerUrl, String.class);
        assertThat(registerResponse.getStatusCode()).isEqualTo(HttpStatus.METHOD_NOT_ALLOWED); // Because GET is not allowed, but not 403
    }

    @Test
    public void securedEndpointsShouldRequireAuthentication() {
        // Test a secured endpoint
        String securedUrl = String.format("http://localhost:%d/api/projects", port);
        ResponseEntity<String> response = restTemplate.getForEntity(securedUrl, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
