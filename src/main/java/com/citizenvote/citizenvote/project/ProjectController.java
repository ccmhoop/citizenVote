package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/v1")
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
    public void createProject(@RequestBody Project project) {
    projectRepository.save(project);
//        return ResponseEntity.ok(savedProject);
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

    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/progress/{progress}")
    public ResponseEntity<Set<Project>> getProjectByProgress(@PathVariable(name = "progress") ProjectProgress progress){
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
