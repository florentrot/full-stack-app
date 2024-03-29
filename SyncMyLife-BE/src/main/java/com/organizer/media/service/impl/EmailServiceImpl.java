package com.organizer.media.service.impl;

import com.organizer.media.dto.RegisterRequestDTO;
import com.organizer.media.entity.User;
import com.organizer.media.service.NotificationService;
import com.organizer.media.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    @Value("${sender.email}")
    private String appEmail;

    @Override
    @Async
    public void sendNotification(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(appEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    public void sendConfirmationNotification(RegisterRequestDTO request, String confirmationCode) {
        String fullName = request.getFirstName() + " " + request.getLastName();

        String emailContent = """
                Welcome %s!
                Here is your confirmation code: %s
                It will expire after 24 hours.
                """.formatted(fullName, confirmationCode);

        sendNotification(request.getEmail(), Constants.VALIDATION_EMAIL_TITLE, emailContent);
    }

    public void resendConfirmationNotification(String emailTo, String confirmationCode) {
        String emailContent = """
                This is your new confirmation code: %s
                It will expire after 24 hours.
                """.formatted(confirmationCode);

        sendNotification(emailTo, Constants.VALIDATION_EMAIL_TITLE, emailContent);
    }

    public void sendWelcomeNotification(User user) {
        String fullName = user.getFirstName() + " " + user.getLastName();

        String emailContent = """
                Yey!
                You are the best %s!
                Your account is active!
                """.formatted(fullName);

        sendNotification(user.getEmail(), Constants.WELCOME_EMAIL, emailContent);
    }
}
