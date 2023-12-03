package com.organizer.media.service;

import com.organizer.media.entity.User;

public interface UserService {
    User getUserByEmail(String email);
}
