package com.organizer.media.auth;

import com.organizer.media.dto.AuthenticationRequest;
import com.organizer.media.dto.AuthenticationResponse;
import com.organizer.media.dto.RegisterRequest;
import com.organizer.media.dao.UserRepository;
import com.organizer.media.entity.Role;
import com.organizer.media.entity.User;
import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.utils.Constants;
import com.organizer.media.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) throws EmailAlreadyUsedException {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .isActive(false)
                .verificationCode(generateCode())
                .registrationDate(LocalDateTime.now())
                .build();

        checkEmailAvailable(request);
        repository.save(user);
        return AuthenticationResponse.builder()
                .token(Constants.EMAIL_NOT_CONFIRMED)
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
                return AuthenticationResponse.builder()
                        .token(Constants.EMAIL_NOT_CONFIRMED)
                        .build();
            }
        }

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void checkEmailAvailable(RegisterRequest request) {
       if (repository.findByEmail(request.getEmail()).isPresent()) {
           throw new EmailAlreadyUsedException(Constants.UNAVAILABLE_EMAIL);
       }
    }

    private String generateCode() {
        return Utils.generateUUID().replace("-","");
    }

}
