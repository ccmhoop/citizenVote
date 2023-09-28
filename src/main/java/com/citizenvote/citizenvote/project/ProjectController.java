package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.authentication.AuthenticationService;
import com.citizenvote.citizenvote.imageData.ImageDataService;
import com.citizenvote.citizenvote.user.Role;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
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
@RequestMapping("api/v1")
public class ProjectController {

    @Autowired
    private ImageDataService service;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private final ProjectRepository projectRepository;

    @Autowired
    private final AuthenticationService authenticationService;

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


    @PostMapping("/project/progress/list")
    public ResponseEntity<Set<ProjectResponse>> getProjectByProgress(@RequestBody ProjectListRequest request){
        System.out.println(request.getProgress() + " : " + request.getByRole() + " : " + request.getToken());
        UserResponse user = authenticationService.getUser(request.getToken());
        return ResponseEntity.ok(projectService.getProjectByProgress(request, user));
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
