package com.kadimar.management.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ApiConfigTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void corsHeadersShouldBePresent() {
        String url = String.format("http://localhost:%d/api/auth/login", port);
        
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        
        HttpHeaders headers = response.getHeaders();
        
        assertThat(headers.getAccessControlAllowOrigin())
            .as("CORS Allow-Origin header should be present")
            .isNotNull();
            
        assertThat(headers.getAccessControlAllowMethods())
            .as("CORS Allow-Methods header should be present")
            .isNotNull();
            
        assertThat(headers.getAccessControlAllowHeaders())
            .as("CORS Allow-Headers header should be present")
            .isNotNull();
    }
}
