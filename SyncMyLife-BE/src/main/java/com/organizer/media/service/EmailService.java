package com.organizer.media.service;

import com.organizer.media.dto.RegisterRequest;
import com.organizer.media.entity.User;
import com.organizer.media.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements NotificationService{

    private final JavaMailSender mailSender;

    @Value("${sender.email}")
    private String appEmail;

    @Override
    @Async
    public void sendEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(appEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    public void sendConfirmationEmail(RegisterRequest request, String confirmationCode) {
        String fullName = request.getFirstName() + " " + request.getLastName();

        String emailContent = """
                Welcome %s!
                Here is your confirmation code: %s
                I will expire after 24 hours.
                """.formatted(fullName, confirmationCode);

        sendEmail(request.getEmail(), Constants.VALIDATION_EMAIL_TITLE, emailContent);
    }

    public void sendWelcomeEmail(User user) {
        String fullName = user.getFirstName() + " " + user.getLastName();

        String emailContent = """
                Yey!
                You are the best %s!
                Your account is active now!
                """.formatted(fullName);

        sendEmail(user.getEmail(), Constants.WELCOME_EMAIL, emailContent);
    }
}
