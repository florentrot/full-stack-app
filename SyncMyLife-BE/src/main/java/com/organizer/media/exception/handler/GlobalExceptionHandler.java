package com.organizer.media.exception.handler;

import com.organizer.media.exception.EmailAlreadyUsedException;
import com.organizer.media.exception.InvalidValidationCodeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<?> handleEmailAlreadyUsedException(EmailAlreadyUsedException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
    }

    @ExceptionHandler(InvalidValidationCodeException.class)
    public ResponseEntity<?> handleInvalidValidationCodeException(InvalidValidationCodeException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
    }
}
