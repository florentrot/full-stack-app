package com.organizer.media.utils;

import java.util.Base64;
import java.util.UUID;

public class Utils {

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
}
