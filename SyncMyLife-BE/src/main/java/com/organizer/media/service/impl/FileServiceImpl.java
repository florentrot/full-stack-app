package com.organizer.media.service.impl;

import com.organizer.media.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class FileServiceImpl implements FileService {

    @Value("${persons.photo.path}")
    public String photoPath;

    @Override
    public String saveFile(MultipartFile file, String user) throws IOException {
        // todo: unique fileName pe user
        File savedFile = new File(photoPath + "\\"+ file.getOriginalFilename());

        FileOutputStream fos = new FileOutputStream(savedFile);
        fos.write(file.getBytes());
        fos.close();

        return savedFile.getPath();
    }
}
