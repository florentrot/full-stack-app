package com.organizer.media.mappers;

import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.entity.HubPerson;
import com.organizer.media.entity.User;

import java.util.List;

public interface HubPersonMapper{
    HubPersonDTO mapToHubPersonDTO(HubPerson hubPerson);
    List<HubPersonDTO> mapToHubPersonListDTO(List<HubPerson> hubPersonList);
    HubPerson mapToHubPerson(User user, HubPersonDTO hubPerson);
}
