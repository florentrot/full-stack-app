package com.organizer.media.dao;

import com.organizer.media.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> getUserByVerificationCode(String verificationCode);
}
