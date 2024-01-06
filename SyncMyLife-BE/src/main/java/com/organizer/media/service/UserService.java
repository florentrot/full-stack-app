package com.organizer.media.service;

import com.organizer.media.entity.User;
import org.springframework.stereotype.Service;

public interface UserService {
    User getUserByEmail(String email);
}
