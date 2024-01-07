package com.organizer.media.service;

import com.organizer.media.dto.RegisterRequestDTO;
import com.organizer.media.entity.User;

public interface NotificationService {

    void sendNotification(String to, String subject, String content);
    void sendConfirmationNotification(RegisterRequestDTO request, String code);
    void resendConfirmationNotification(String email, String code);
    void sendWelcomeNotification(User user);
}

