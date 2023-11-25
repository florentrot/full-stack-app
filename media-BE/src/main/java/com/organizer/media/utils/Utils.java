package com.organizer.media.utils;

import java.util.Base64;
import java.util.UUID;

public class Utils {

    public static String encodeConfirmationToken(String toEncode) {
        return Base64.getEncoder().encodeToString(toEncode.getBytes());
    }

    public static String decodeConfirmationToken(String toDecode) {
        byte[] decodedBytes = Base64.getDecoder().decode(toDecode);
        return new String(decodedBytes);
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
