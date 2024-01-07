package com.organizer.media.utils;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.Base64;
import java.util.UUID;
import java.util.function.Consumer;

@Slf4j
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

    public static <T> void executeIfNotNull(T object, Consumer<T> action){
        if (object != null) {
            action.accept(object);
        }
    }

    public static <T> void copyNonNullProperties(T source, T target, String... propertiesToSkip) {
        Class<?> clazz = source.getClass();

        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);

            try {
                Object sourceValue = field.get(source);

                if (sourceValue != null && !shouldSkipProperty(field.getName(), propertiesToSkip)) {
                    field.set(target, sourceValue);
                }
            } catch (IllegalAccessException e) {
                log.error(e.getMessage());
            }
        }
    }

    private static boolean shouldSkipProperty(String propertyName, String[] propertiesToSkip) {
        for (String propertyToSkip : propertiesToSkip) {
            if (propertyName.equals(propertyToSkip)) {
                return true;
            }
        }
        return false;
    }
}
