package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.product.Product;
import com.citizenvote.citizenvote.imageData.ImageDataService;
import com.citizenvote.citizenvote.product.ProductRepository;
import com.citizenvote.citizenvote.product.ProductResponse;
import com.citizenvote.citizenvote.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("api/v1/auth/auth/projects")
public class ProjectController {

    @Autowired
    private final ProjectRepository projectRepository;
    @Autowired
    private ImageDataService service;

    @Autowired
    private ProjectService projectService;



    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PostMapping(value = "/project/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProject(@RequestPart("project") Project project, @RequestPart("image") MultipartFile[] file) throws IOException {
        projectRepository.save(project);
        String status = service.uploadImage(file,project,"project");
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloProject() {
        return ResponseEntity.ok("hello projects!");
    }
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getRecipeById(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
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

    @GetMapping ("/project/all/{progress}")
    public List<ProjectResponse> fetchAllProducts(@PathVariable("progress") String progress ) {
        return projectService.projectPackage(progress);
    }
}
