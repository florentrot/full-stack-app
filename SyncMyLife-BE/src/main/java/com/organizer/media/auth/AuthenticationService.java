package com.organizer.media.auth;

import com.organizer.media.dto.AuthenticationRequestDTO;
import com.organizer.media.dto.AuthenticationResponseDTO;
import com.organizer.media.dto.ConfirmationEmailRequestDTO;
import com.organizer.media.dto.RegisterRequestDTO;
import com.organizer.media.dao.UserDao;
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

    private final UserDao userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final NotificationService notificationService;


    public AuthenticationResponseDTO register(RegisterRequestDTO request) throws EmailAlreadyUsedException {
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
        userRepository.save(user);
        notificationService.sendConfirmationNotification(request, verificationCode);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword())
            );
        } catch (AccountStatusException e) {
            if (e instanceof DisabledException) {
                Optional<User> inactiveUser = this.userRepository.findByEmail(request.getEmail());
                if (inactiveUser.isPresent()) {
                    var jwtToken = jwtService.generateToken(inactiveUser.get());
                    return AuthenticationResponseDTO.builder()
                            .token(jwtToken)
                            .build();
                }
            }
        }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    private String generateCode() {
        return Utils.generateConfirmationCode();
    }

    private void checkEmailAvailable(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException(Constants.UNAVAILABLE_EMAIL);
        }
    }

    public AuthenticationResponseDTO confirmAccount(ConfirmationEmailRequestDTO request) {
        String validationCode = request.getValidationCode();
        Optional<User> user = this.userRepository.getUserByVerificationCode(validationCode);
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
        userRepository.save(confirmedUser);
        notificationService.sendWelcomeNotification(confirmedUser);
        var jwtToken = jwtService.generateToken(confirmedUser);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }


    public String resendValidationCode(String bearer) {
        String verificationCode = generateCode();
        String jwt = jwtService.getJWT(bearer);
        String emailTo = jwtService.extractUsername(jwt);
        Optional<User> user = userRepository.findByEmail(emailTo);
        if (user.isEmpty()) {
            throw new InvalidValidationCodeException("Email doesn't exists");
        }
        user.get().setVerificationCode(verificationCode);
        userRepository.save(user.get());
        notificationService.resendConfirmationNotification(user.get().getEmail(), verificationCode);
        return null;
    }
}
