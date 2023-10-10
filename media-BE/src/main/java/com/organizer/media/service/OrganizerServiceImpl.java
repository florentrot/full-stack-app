package com.organizer.media.service;

import org.springframework.stereotype.Service;

@Service
public class OrganizerServiceImpl implements OrganizerService{
    @Override
    public void changeMediaType(String mediaType) {
        System.out.println("Media type changed");
    }
}
