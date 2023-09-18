package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;


@Component
@RequiredArgsConstructor
public class ProjectSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final ImageDataService service;

//    public ProjectSeeder(ProjectRepository projectRepository) {
//        this.projectRepository = projectRepository;
//    }

    @Override
    public void run(String... args) throws Exception {
        seedProjects();
    }
    // Hier voeg je de code toe om projecten aan de database toe te voegen.
    // Je kunt hier zoveel Project-entiteiten toevoegen als nodig is.

    private void seedProjects() throws IOException {
        if (projectRepository.count() == 0) {
            MultipartFile[] image;
            Project project1 = Project.builder()
                    .title("Project 1")
                    .description("Beschrijving van Project 1")
                    .requiredVotes(50)
                    .amountVotes(0)
                    .startDate(LocalDate.of(2023, 9, 12))
                    .endDate(LocalDate.of(2023, 9, 12).plusMonths(1))
                    .progress(ProjectProgress.APPROVED)
                    .category(ProjectCategory.SPORTS)
//                    .user();
                    .build();
            image = new MultipartFile[]{
                   service.seedImage("src\\main\\resources\\ProjectImages\\project1\\sport.jpg")
            };
            projectRepository.save(project1);
            service.uploadImage(image, project1, "project");

            Project project2 = Project.builder()
                    .title("Project 2")
                    .description("Beschrijving van Project 2")
                    .requiredVotes(100)
                    .amountVotes(0)
                    .startDate(LocalDate.of(2023, 10, 20))
                    .endDate(LocalDate.of(2023, 10, 20).plusMonths(2))
                    .progress(ProjectProgress.PROPOSED)
                    .category(ProjectCategory.SUSTAINABILITY)
//                    .user();
                    .build();
            image = new MultipartFile[]{
                    service.seedImage("src\\main\\resources\\ProjectImages\\project2\\sustainability.jpg")
            };
            projectRepository.save(project2);
            service.uploadImage(image, project2, "project");

            Project project3 = Project.builder()
                    .title("Project 3")
                    .description("How do you introduce children to municipal politics and democratic decision-making in their own city in a fun and educational way? By letting them play the role-playing game Democracy at city hall.")
                    .requiredVotes(50)
                    .amountVotes(50)
                    .startDate(LocalDate.of(2023, 7, 3))
                    .endDate(LocalDate.of(2023, 7, 3).plusMonths(1))
                    .progress(ProjectProgress.HAVE_ENOUGH_VOTES)
                    .category(ProjectCategory.EDUCATION)
//                    .user();
                    .build();
            image = new MultipartFile[]{
                    service.seedImage("src\\main\\resources\\ProjectImages\\project3\\education.jpg")
            };
            projectRepository.save(project3);
            service.uploadImage(image, project3, "project");

            // Voeg de projecten toe aan de database.



        }
    }
}
