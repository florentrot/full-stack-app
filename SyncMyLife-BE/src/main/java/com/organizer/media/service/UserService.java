package com.organizer.media.service;

import com.organizer.media.entity.User;
import org.springframework.data.jpa.repository.Modifying;

public interface UserService {
    User getUserByEmail(String email);
    User upsertUser(User user);
}
