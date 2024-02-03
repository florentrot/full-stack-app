package com.organizer.media.mappers.impl;

import com.organizer.media.auth.AuthenticationService;
import com.organizer.media.dto.HubPersonDTO;
import com.organizer.media.entity.HubPerson;
import com.organizer.media.entity.User;
import com.organizer.media.mappers.HubPersonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HubPersonMapperImpl implements HubPersonMapper {

    @Override
    public HubPersonDTO mapToHubPersonDTO(HubPerson hubPerson) {
        if (hubPerson == null) {
            return null;
        }
        HubPersonDTO hubPersonDTO = new HubPersonDTO();
        hubPersonDTO.setImgUrl(hubPerson.getImgUrl());
        hubPersonDTO.setName(hubPerson.getName());
        hubPersonDTO.setPseudoName(hubPerson.getPseudoName());
        hubPersonDTO.setBirthday(hubPerson.getBirthday());
        hubPersonDTO.setDetails(hubPerson.getDetails());

        return hubPersonDTO;
    }

    @Override
    public List<HubPersonDTO> mapToHubPersonListDTO(List<HubPerson> hubPersonList) {
        List<HubPersonDTO> allPersons = new ArrayList<>();
        if (hubPersonList !=null) {
            hubPersonList.forEach(person -> {
                HubPersonDTO hubPersonDTO = new HubPersonDTO();
                hubPersonDTO.setId(person.getId());
                hubPersonDTO.setName(person.getName());
                hubPersonDTO.setPseudoName(person.getPseudoName());
                hubPersonDTO.setBirthday(person.getBirthday());
                hubPersonDTO.setImgUrl(person.getImgUrl());
                hubPersonDTO.setDetails(person.getDetails());
                allPersons.add(hubPersonDTO);
            });
        }
        return allPersons;
    }

    @Override
    public HubPerson mapToHubPerson(User user, HubPersonDTO hubPersonDTO) {
        if (hubPersonDTO == null) {
            return null;
        }
        HubPerson hubPerson = new HubPerson();
        hubPerson.setImgUrl(hubPersonDTO.getImgUrl());
        hubPerson.setName(hubPersonDTO.getName());
        hubPerson.setPseudoName(hubPersonDTO.getPseudoName());
        hubPerson.setBirthday(hubPersonDTO.getBirthday());
        hubPerson.setDetails(hubPersonDTO.getDetails());
        hubPerson.setUser(user);

        return hubPerson;
    }
}
