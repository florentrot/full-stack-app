package com.organizer.media.mappers.impl;

import com.organizer.media.dto.UserDTO;
import com.organizer.media.entity.User;
import com.organizer.media.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapperImpl implements UserMapper {
    @Override
    public UserDTO mapToUserDTO(User user) {
        if (user == null) {
            return null;
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setUsername(user.getUsername());
        userDTO.setRole(user.getRole().name());

        return userDTO;
    }
}
