package com.organizer.media.auth;

import com.organizer.media.dto.*;
import com.organizer.media.dao.UserDao;
import com.organizer.media.entity.Role;
import com.organizer.media.entity.User;
import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.exception.ValidationCodeException;
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
        return getToken(user);
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
                    User user = inactiveUser.get();
                    getToken(user);
                }
            }
        }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        return getToken(user);
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
            throw new ValidationCodeException(Constants.INVALID_VALIDATION_CODE);
        }
        LocalDateTime registrationDateTime = user.get().getRegistrationDate();
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(registrationDateTime, now);
        long minutes = duration.toMinutes();
        if (minutes >= Integer.parseInt(validationDuration)) {
            throw new ValidationCodeException(Constants.EXPIRED_VALIDATION_CODE);
        }

        User confirmedUser = user.get();
        confirmedUser.setActive(true);
        confirmedUser.setVerificationCode(null);
        userRepository.save(confirmedUser);
        notificationService.sendWelcomeNotification(confirmedUser);
        return getToken(confirmedUser);
    }

    private AuthenticationResponseDTO getToken(User user) {
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    public String resendValidationCode(String bearer) {
        String emailTo = getEmailFromToken(bearer);
        User user = getUserByEmail(emailTo);
        handleResendValidationCode(user);
        return null;
    }

    public String getEmailFromToken(String bearer) {
        String jwt = jwtService.getJWT(bearer);
        return jwtService.extractUsername(jwt);
    }

    public User getUser(String token) {
        String userEmail = getEmailFromToken(token);
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            return null;
        }
        return userOptional.get();
    }

    private User getUserByEmail(String emailTo) {
        return userRepository.findByEmail(emailTo)
                .orElseThrow(() -> new ValidationCodeException(Constants.EMAIL_DOES_NOT_EXIST));
    }

    private void handleResendValidationCode(User user) {
        LocalDateTime lastCodeRequestTimestamp = user.getCodeRequestTimestamp();

        if (lastCodeRequestTimestamp == null || hasElapsedMoreThan10Minutes(lastCodeRequestTimestamp)) {
            sendValidationCode(user);
        } else {
            throw new ValidationCodeException(Constants.WAIT_10_MINUTES);
        }
    }


    private boolean hasElapsedMoreThan10Minutes(LocalDateTime requestCodeTimestamp) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        Duration duration = Duration.between(requestCodeTimestamp, currentDateTime);
        return duration.toMinutes() > 10;
    }

    private void sendValidationCode(User user) {
        String verificationCode = generateCode();
        user.setVerificationCode(verificationCode);
        LocalDateTime codeRequestTimestamp = LocalDateTime.now();
        user.setCodeRequestTimestamp(codeRequestTimestamp);
        userRepository.save(user);
        notificationService.resendConfirmationNotification(user.getEmail(), verificationCode);
    }

    private String generateCode() {
        return Utils.generateConfirmationCode();
    }
}
