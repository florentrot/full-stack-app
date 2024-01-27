package com.organizer.media.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String saveFile(MultipartFile file, String user) throws IOException;
}
