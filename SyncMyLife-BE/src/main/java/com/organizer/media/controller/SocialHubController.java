package com.organizer.media.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.service.FileService;
import com.organizer.media.service.SocialHubService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1/socialHub")
@RequiredArgsConstructor
public class SocialHubController {

    private final SocialHubService socialHubService;

    private final FileService fileService;

    private final ObjectMapper objectMapper;

    private final AuthenticationService authenticationService;

    @PostMapping("/person")
    public ResponseEntity<?> savePerson(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer,
                                           @RequestParam("personCardDTO") String personCardDTO,
                                           @RequestParam("picture") MultipartFile picture) {
        try {
            String userEmail = authenticationService.getEmailFromToken(bearer);
            HubPersonDTO hubPersonDTO = objectMapper.readValue(personCardDTO, HubPersonDTO.class);
            String filePath = fileService.handleFile(picture, userEmail);
            hubPersonDTO.setImgUrl(filePath);
            return ResponseEntity.ok(socialHubService.saveHubPerson(bearer, hubPersonDTO));
        } catch (Exception e) {
            return internalServerError();
        }
    }


    @GetMapping("/persons")
    public ResponseEntity<?> getAllPersons(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        try {
            return ResponseEntity.ok(socialHubService.getAllPersons(bearer));
        } catch (Exception e) {
            return internalServerError();
        }
    }

    // temporary DEMO:
    @GetMapping("/pictures")
    public ResponseEntity<Resource> getImages(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        try {
            String userEmail = authenticationService.getEmailFromToken(bearer);

            List<Resource> pictures = fileService.getImages(userEmail);
            if (pictures.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            pictures.forEach(picture -> {
            });

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(pictures.get(1));
        } catch (Exception e) {
            // Handle file I/O exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private ResponseEntity<String> internalServerError() {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred");
    }
}
