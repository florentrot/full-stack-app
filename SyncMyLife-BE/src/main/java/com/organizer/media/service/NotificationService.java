package com.organizer.media.service;

public interface NotificationService {

    void sendEmail(String to, String subject, String content);
}
