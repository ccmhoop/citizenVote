package com.citizenvote.citizenvote.projects;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
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
        LocalDate startDate1 = LocalDate. of(2023, 9, 12);
        LocalDate endDate1 = LocalDate. of(2023, 10, 12);
        LocalDate startDate2 = LocalDate. of(2023, 9, 20);
        LocalDate endDate2 = LocalDate. of(2023, 10, 20);
        LocalDate startDate3 = LocalDate. of(2023, 7, 25);
        LocalDate endDate3 = LocalDate. of(2023, 8, 25);
        Project project1 = new Project(,"title","description", 50, 0, startDate1, endDate1, ProjectProgress.APPROVED, ProjectCategory.SPORTS);
        Project project2 = new Project();
        Project project3 = new Project();

        projectRepository.saveAll(List.of(project1, project2, project3));

    }
}