package com.organizer.media.service;

import com.organizer.media.dto.RegisterRequest;
import com.organizer.media.entity.User;

public interface NotificationService {

    void sendNotification(String to, String subject, String content);
    void sendConfirmationNotification(RegisterRequest request, String code);
    void sendWelcomeNotification(User user);
}

