package com.organizer.media.mappers;

import com.organizer.media.dto.UserDTO;
import com.organizer.media.entity.User;

public interface UserMapper {

    UserDTO mapToUserDTO(User user);
}
