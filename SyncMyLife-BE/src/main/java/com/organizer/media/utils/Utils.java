package com.organizer.media.utils;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

public class Utils {

    private static final int CODE_LENGTH = 6;
    private static final String DIGITS = "0123456789";

    public static String generateConfirmationCode() {
        StringBuilder codeBuilder = new StringBuilder(CODE_LENGTH);
        Random random = new Random();

        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(DIGITS.length());
            char randomDigit = DIGITS.charAt(randomIndex);
            codeBuilder.append(randomDigit);
        }
        return codeBuilder.toString();
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }

    public static String encodeBase64(String toEncode) {
        return Base64.getEncoder().encodeToString(toEncode.getBytes());
    }

    public static String decodeBase64(String toDecode) {
        byte[] decodedBytes = Base64.getDecoder().decode(toDecode);
        return new String(decodedBytes);
    }

    public static String generateUniqueFilename(String originalFilename) {
        String extension = getFileExtension(originalFilename);
        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
        String uniqueName = dateFormat.format(currentDate);
        String newFilename = uniqueName + "." + extension;
        return newFilename;
    }


    private static String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1);
    }
}
