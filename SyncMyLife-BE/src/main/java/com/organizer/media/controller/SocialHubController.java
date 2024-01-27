package com.organizer.media.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.service.FileService;
import com.organizer.media.service.SocialHubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            String userEmail = authenticationService.getEmailFromToken(bearer).replaceAll("@.*", "");
            HubPersonDTO hubPersonDTO = objectMapper.readValue(personCardDTO, HubPersonDTO.class);
            String filePath = fileService.saveFile(picture, userEmail);
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

    private ResponseEntity<String> internalServerError() {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred");
    }
}
