package com.organizer.media.service.impl;

import com.organizer.media.dao.UserDao;
import com.organizer.media.entity.User;
import com.organizer.media.service.UserService;
import com.organizer.media.utils.Utils;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
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

    @Modifying
    @Override
    public User upsertUser(User user) {
        Optional<User> userOptional = userDao.findById(user.getId());
        if(userOptional.isPresent()){
            User existingUser = userOptional.get();
            Utils.copyNonNullProperties(user, existingUser, "id");
            return userDao.save(existingUser);
        }else{
            return userDao.save(user);
        }
    }
}
