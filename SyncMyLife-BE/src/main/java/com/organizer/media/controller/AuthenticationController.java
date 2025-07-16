package com.organizer.media.controller;

import com.organizer.media.dto.AuthenticationRequestDTO;
import com.organizer.media.dto.ConfirmationEmailRequestDTO;
import com.organizer.media.dto.RegisterRequestDTO;
import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.exception.ValidationCodeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {
            return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/confirmAccount")
    public ResponseEntity<?> confirmUserAccount(@RequestBody ConfirmationEmailRequestDTO request) {
            return ResponseEntity.ok(service.confirmAccount(request));
    }

    @PostMapping("/resendValidationCode")
    public ResponseEntity<?> resendValidationCode(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
            if (token != null) {
                return ResponseEntity.ok(service.resendValidationCode(token));
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid or missing Bearer token");
            }
        }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

}
