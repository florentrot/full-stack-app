package com.organizer.media.service;

import com.organizer.media.dto.HubPersonDTO;

import java.util.List;

public interface SocialHubService {

    HubPersonDTO saveHubPerson(String bearer, HubPersonDTO hubPersonDTO);

    List<HubPersonDTO> getAllPersons(String bearer);
}
