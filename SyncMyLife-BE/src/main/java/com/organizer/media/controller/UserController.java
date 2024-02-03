package com.organizer.media.controller;

import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.dto.UserDTO;
import com.organizer.media.entity.User;
import com.organizer.media.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final AuthenticationService authenticationService;

    @PostMapping("/userDetails")
    public ResponseEntity<UserDTO> getUserByEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearer){
        String userEmail = authenticationService.getEmailFromToken(bearer);
        UserDTO user = userService.getUserByEmail(userEmail);
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
