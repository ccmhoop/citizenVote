package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/v1/auth/auth")
public class ProjectController {

    @Autowired
    private ImageDataService service;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private final ProjectRepository projectRepository;

    @PostMapping(value = "/project/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProject(@RequestPart("project") Project project, @RequestPart("image") MultipartFile[] file) throws IOException {
        projectRepository.save(project);
        String status = service.uploadImage(file,project,"project");
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }
    @PostMapping("/project")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloProject() {
        return ResponseEntity.ok("hello projects!");
    }
    @GetMapping ("/project/all/{progress}")
    public List<ProjectResponse> fetchAllProducts(@PathVariable("progress") String progress ) {
        return projectService.projectPackage(progress);
    }
    @GetMapping("/project/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/project/id")
    public ResponseEntity<ProjectResponse> getProjectById(@RequestBody ProjectRequest request) {

       ProjectResponse response = projectService.getProjectOverviewDetails(request.getId(), request.getToken());
        System.out.println("id: " + request.getId() + "");
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/project/progress/{progress}")
    public ResponseEntity<Set<ProjectResponse>> getProjectByProgress(@PathVariable(name = "progress") String progress){
        return ResponseEntity.ok(projectService.getProjectByProgress(progress));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
