package com.citizenvote.citizenvote.projects;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;


@Component
public class ProjectSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository; // Injecteer de ProjectRepository.

    public ProjectSeeder(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Hier voeg je de code toe om projecten aan de database toe te voegen.
        // Je kunt hier zoveel Project-entiteiten toevoegen als nodig is.

        Project project1 = Project.builder()
                .title("Project 1")
                .description("Beschrijving van Project 1")
                .requiredVotes(50)
                .amountVotes(0)
                .startDate(LocalDate.of(2023,9,12))
                .endDate(LocalDate.of(2023,9,12).plusMonths(1))
                .progress(ProjectProgress.APPROVED)
                .category(ProjectCategory.SPORTS)
                .build();

        Project project2 = Project.builder()
                .title("Project 2")
                .description("Beschrijving van Project 2")
                .requiredVotes(100)
                .amountVotes(0)
                .startDate(LocalDate.of(2023,10,20))
                .endDate(LocalDate.of(2023,10,20).plusMonths(2))
                .progress(ProjectProgress.PROPOSED)
                .category(ProjectCategory.EDUCATION)
                .build();

        Project project3 = Project.builder()
                .title("Project 3")
                .description("Beschrijving van Project 3")
                .requiredVotes(50)
                .amountVotes(50)
                .startDate(LocalDate.of(2023,7,3))
                .endDate(LocalDate.of(2023,7,3).plusMonths(1))
                .progress(ProjectProgress.HAVE_ENOUGH_VOTES)
                .category(ProjectCategory.SUSTAINABILITY)
                .build();

        // Voeg de projecten toe aan de database.
        projectRepository.save(project1);
        projectRepository.save(project2);
        projectRepository.save(project3);
    }
}
