package com.organizer.media.controller;

import com.organizer.media.service.OrganizerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Florentin Rotărici
 */

@RestController
@RequestMapping("/api/v1/organizer")
public class OrganizerController {

    private OrganizerService organizerService;

    private OrganizerController(OrganizerService service) {
        this.organizerService = service;
    }

    @GetMapping("/sort")
    public ResponseEntity<String> organizeMedia() {
        return ResponseEntity.ok("Organize");
    }

    @GetMapping("/change/{mediaType}")
    public ResponseEntity<String> changeMedia(@PathVariable("mediaType") String mediaType) {
        try {
            this.organizerService.changeMediaType(mediaType);
            return new ResponseEntity<>(mediaType, HttpStatus.OK);
        } catch (Exception e) {
            e.getStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
