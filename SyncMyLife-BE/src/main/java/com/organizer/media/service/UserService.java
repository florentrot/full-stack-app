package com.organizer.media.service;

import com.organizer.media.dto.UserDTO;
import com.organizer.media.entity.User;
import org.springframework.stereotype.Service;

public interface UserService {
    UserDTO getUserByEmail(String email);
}
