package com.organizer.media.service.impl;

import com.organizer.media.dao.HubPersonDao;
import com.organizer.media.dao.UserDao;
import com.organizer.media.entity.HubPerson;
import com.organizer.media.entity.User;
import com.organizer.media.service.FileService;
import com.organizer.media.utils.Constants;
import com.organizer.media.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final UserDao userDao;
    private final HubPersonDao hubPersonDao;

    @Value("${persons.photo.path}")
    public String photoPath;

    @Override
    public String handleFile(MultipartFile file, String userEmail) throws IOException {
        String folderPath = photoPath + getUserId(userEmail) + "/";
        Path path = Paths.get(folderPath);
        preparePath(path);

        String uniqueFileName = Utils.generateUniqueFilename(file.getOriginalFilename());
        String filePath = folderPath + uniqueFileName;
        saveFile(file, filePath);

        return filePath;
    }

    private void preparePath(Path path) throws IOException {
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                System.out.println("Failed to create folder: " + e.getMessage());
                throw e;
            }
        }
    }

    private void saveFile(MultipartFile file, String filePath) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(file.getBytes());
            System.out.println("File saved successfully: " + filePath);
        } catch (IOException e) {
            System.out.println("Failed to save file: " + e.getMessage());
            throw e;
        }
    }

    private Integer getUserId(String email) {
        Optional<User> user = userDao.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException(Constants.EMAIL_DOES_NOT_EXIST);
        }
        return user.get().getId();
    }


    @Override
    public List<Resource> getImages(String userEmail) {
        List<Resource> imageResources = new ArrayList<>();

        User user = userDao.findByEmail(userEmail).get();
        List<HubPerson> hubPersons = hubPersonDao.findAllByUser(user).get();

        for (HubPerson hubPerson : hubPersons) {
            hubPerson.setImgUrl(hubPerson.getImgUrl().replace("src/main/resources/", ""));
            Path path = Paths.get(hubPerson.getImgUrl());

            Resource imageResource = new ClassPathResource(path.toString());
            imageResources.add(imageResource);
        }

        return imageResources;
    }

}