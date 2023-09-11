package com.citizenvote.citizenvote.projects;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner initDatabase(ProjectRepository projectRepository) {
        return args -> {
            if (projectRepository.count() == 0) {
                seedDatabase(projectRepository);
            }
        };
    }

    private void seedDatabase(ProjectRepository projectRepository) {
        Project project1 = new Project();
        Project project2 = new Project();
        Project project3 = new Project();

        projectRepository.saveAll(List.of(project1, project2, project3));

    }
}