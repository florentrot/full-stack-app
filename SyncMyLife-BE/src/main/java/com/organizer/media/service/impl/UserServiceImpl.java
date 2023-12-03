package com.organizer.media.service.impl;

import com.organizer.media.dao.UserDao;
import com.organizer.media.entity.User;
import com.organizer.media.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Override
    public User getUserByEmail(String email) {
        Optional<User> userOptional = userDao.findByEmail(email);
        return userOptional.orElse(null);
    }
}
