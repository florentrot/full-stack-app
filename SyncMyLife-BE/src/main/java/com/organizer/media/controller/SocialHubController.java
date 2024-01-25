package com.organizer.media.controller;

import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.service.SocialHubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/socialHub")
@RequiredArgsConstructor
public class SocialHubController {

    private final SocialHubService socialHubService;

    @PostMapping("/person")
    public ResponseEntity<?> getAllPersons(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer,
                                           @RequestBody HubPersonDTO hubPersonDTO) {
        try {
            return ResponseEntity.ok(socialHubService.saveHubPerson(bearer, hubPersonDTO));
        } catch (Exception e) {
            return internalServerError();
        }
    }


    @GetMapping("/persons")
    public ResponseEntity<?> savePerson(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        try {
            return ResponseEntity.ok(socialHubService.getAllPersons(bearer));
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
