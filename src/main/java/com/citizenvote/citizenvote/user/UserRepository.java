package com.citizenvote.citizenvote.user;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {

    User getById(Long id);
    Optional<User> findByUsername(String email);
}
