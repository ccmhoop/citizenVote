package com.citizenvote.citizenvote.vote;

import com.citizenvote.citizenvote.project.Project;
import com.citizenvote.citizenvote.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface VoteRepository extends CrudRepository<Vote, Long> {

}
