package com.organizer.media.service.impl;

import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.dao.HubPersonDao;
import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.entity.HubPerson;
import com.organizer.media.entity.User;
import com.organizer.media.mappers.HubPersonMapper;
import com.organizer.media.service.SocialHubService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialHubServiceImpl implements SocialHubService {

    private final HubPersonDao hubPersonDao;

    private final HubPersonMapper hubPersonMapper;

    private final AuthenticationService authenticationService;

    @Override
    public HubPersonDTO saveHubPerson(String token, HubPersonDTO hubPersonDTO) {
        User user = authenticationService.getUser(token);
        HubPerson person = hubPersonMapper.mapToHubPerson(user, hubPersonDTO);
        hubPersonDao.save(person);
        HubPersonDTO personDTO = hubPersonMapper.mapToHubPersonDTO(person);
        return personDTO;
    }

    @Override
    public List<HubPersonDTO> getAllPersons(String token) {
        User user = authenticationService.getUser(token);
        List<HubPersonDTO> allPersons = new ArrayList<>();
        Optional<List<HubPerson>> hubPersonOptional= hubPersonDao.findAllByUser(user);
        if (hubPersonOptional.isPresent()) {
            List<HubPerson> hubPersonList = hubPersonOptional.get();
            allPersons = hubPersonMapper.mapToHubPersonListDTO(hubPersonList);
            return allPersons;
        }
        return allPersons;
    }

}
