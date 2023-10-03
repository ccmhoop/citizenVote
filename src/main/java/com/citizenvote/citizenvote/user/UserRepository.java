package com.citizenvote.citizenvote.user;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

@Transactional
public interface UserRepository extends CrudRepository<User,Long> {

    Optional<User> findByUsername(String username);
}
