package com.organizer.media.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {

    String handleFile(MultipartFile file, String user) throws IOException;
    // DEMO:
    List<Resource> getImages(String userEmail);
}
