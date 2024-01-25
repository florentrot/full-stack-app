package com.organizer.media.dao;

import com.organizer.media.entity.HubPerson;
import com.organizer.media.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HubPersonDao extends JpaRepository<HubPerson, Integer> {

    @Query("SELECT hp FROM HubPerson hp WHERE hp.user = :user")
    Optional<List<HubPerson>> findAllByUser(@Param("user") User user);

}
