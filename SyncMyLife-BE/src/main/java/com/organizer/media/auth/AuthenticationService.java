package com.organizer.media.auth;

import com.organizer.media.dto.AuthenticationRequest;
import com.organizer.media.dto.AuthenticationResponse;
import com.organizer.media.dto.ConfirmationEmailRequest;
import com.organizer.media.dto.RegisterRequest;
import com.organizer.media.dao.UserRepository;
import com.organizer.media.entity.Role;
import com.organizer.media.entity.User;
import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.exception.InvalidValidationCodeException;
import com.organizer.media.service.NotificationService;
import com.organizer.media.utils.Constants;
import com.organizer.media.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Value("${validation.expire.in.minutes}")
    private String validationDuration;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final NotificationService notificationService;


    public AuthenticationResponse register(RegisterRequest request) throws EmailAlreadyUsedException {
        String verificationCode = generateCode();
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .isActive(false)
                .verificationCode(verificationCode)
                .registrationDate(LocalDateTime.now())
                .build();


        checkEmailAvailable(request);
        repository.save(user);
        notificationService.sendConfirmationNotification(request, verificationCode);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword())
            );
        } catch (AccountStatusException e) {
            if (e instanceof DisabledException) {
                Optional<User> inactiveUser = this.repository.findByEmail(request.getEmail());
                if (inactiveUser.isPresent()) {
                    var jwtToken = jwtService.generateToken(inactiveUser.get());
                    return AuthenticationResponse.builder()
                            .token(jwtToken)
                            .build();
                }
            }
        }

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private String generateCode() {
        return Utils.generateUUID().replace("-", "");
    }

    private void checkEmailAvailable(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException(Constants.UNAVAILABLE_EMAIL);
        }
    }

    public AuthenticationResponse confirmAccount(ConfirmationEmailRequest request) {
        String validationCode = request.getValidationCode();
        Optional<User> user = this.repository.getUserByVerificationCode(validationCode);
        if (user.isEmpty()) {
            throw new InvalidValidationCodeException(Constants.INVALID_VALIDATION_CODE);
        }
        LocalDateTime registrationDateTime = user.get().getRegistrationDate();
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(registrationDateTime, now);
        long minutes = duration.toMinutes();
        if (minutes >= Integer.parseInt(validationDuration)) {
            throw new InvalidValidationCodeException(Constants.EXPIRED_VALIDATION_CODE);
        }

        User confirmedUser = user.get();
        confirmedUser.setActive(true);
        confirmedUser.setVerificationCode(null);
        repository.save(confirmedUser);
        notificationService.sendWelcomeNotification(confirmedUser);
        var jwtToken = jwtService.generateToken(confirmedUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


}
