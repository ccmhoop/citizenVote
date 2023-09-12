package com.citizenvote.citizenvote.projects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Optional<Project> updateProject(long id, Project project) {
        Optional<Project> existingProject = projectRepository.findById(id);

        if (existingProject.isPresent()) {
            project.setId(id); // Zorg ervoor dat het ID van het bijgewerkte project correct is ingesteld.
            return Optional.of(projectRepository.save(project));
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteProject(long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
