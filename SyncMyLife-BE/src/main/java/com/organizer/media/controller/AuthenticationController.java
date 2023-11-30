package com.organizer.media.controller;

import com.organizer.media.dto.AuthenticationRequest;
import com.organizer.media.dto.ConfirmationEmailRequest;
import com.organizer.media.dto.RegisterRequest;
import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.exception.InvalidValidationCodeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (EmailAlreadyUsedException e) {
            throw e;
        } catch (Exception e) {
            return internalServerError();
        }
    }

    @PostMapping("/confirmAccount")
    public ResponseEntity<?> confirmUserAccount(@RequestBody ConfirmationEmailRequest request) {
        try {
            return ResponseEntity.ok(service.confirmAccount(request));
        } catch (InvalidValidationCodeException e) {
            throw e;
        } catch (Exception e) {
            return internalServerError();
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (Exception e) {
            return internalServerError();
        }
    }

    private ResponseEntity<String> internalServerError() {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred");
    }
}
