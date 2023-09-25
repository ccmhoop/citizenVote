package com.citizenvote.citizenvote.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Override
    List<Project> findAll();
    List<Project> findByProgress(ProjectProgress progress);
}
