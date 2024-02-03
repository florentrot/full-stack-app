package com.organizer.media.service.impl;

import com.organizer.media.dao.UserDao;
import com.organizer.media.dto.UserDTO;
import com.organizer.media.entity.User;
import com.organizer.media.mappers.UserMapper;
import com.organizer.media.service.UserService;
import com.organizer.media.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    private final UserMapper userMapper;

    @Override
    public UserDTO getUserByEmail(String email) {
        Optional<User> userOptional = userDao.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException(Constants.EMAIL_DOES_NOT_EXIST);
        } else {
            UserDTO userDTO = userMapper.mapToUserDTO(userOptional.get());
            return userDTO;
        }
    }
}
