package com.citizenvote.citizenvote.project;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    public Set<Project> getProjectByProgress(ProjectProgress progress){
        return projectRepository.findByProgress(progress);
    }
}
