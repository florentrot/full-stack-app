package com.organizer.media.service.impl;

import com.organizer.media.dao.UserDao;
import com.organizer.media.entity.User;
import com.organizer.media.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    // todo: no need email as parameter
    // we will get it from token
    @Override
    public User getUserByEmail(String email) {
        Optional<User> userOptional = userDao.findByEmail(email);
        return userOptional.orElse(null);
    }
}
