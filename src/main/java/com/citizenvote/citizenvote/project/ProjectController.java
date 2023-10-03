package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.authentication.AuthenticationService;
import com.citizenvote.citizenvote.config.JwtService;
import com.citizenvote.citizenvote.imageData.ImageDataService;
import com.citizenvote.citizenvote.user.Role;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.user.UserResponse;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final JwtService jwtService;

    @PostMapping(value = "/project/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProject(@RequestPart("project") ProjectRequest request, @RequestPart("image") MultipartFile[] file) throws IOException {
        Project project = projectService.requestToProject(request);
        projectRepository.save(project);
        String status = service.uploadImage(file,project,"project");
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }

    @PostMapping("/project")
    public ResponseEntity createProject(@RequestBody ProjectRequest request) {
        Project project = projectService.requestToProject(request);
        projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.OK)
                .body(HttpStatus.OK)
                ;
    }



    @PostMapping(value = "/project/image/edit", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> editProject(@RequestPart("project") ProjectRequest request, @RequestPart("image") MultipartFile[] file) throws IOException {
        User auth_user = userRepository.findByUsername(jwtService.extractUserName(request.getToken())).get();
        if(auth_user.getRole() == Role.CITIZEN){
            return ResponseEntity.status(403).build();
        }
        Project project = projectService.stageProject(request);
        projectRepository.save(project);
        String status = service.uploadImage(file,project,"project");
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }




    @PostMapping("/project/edit")
    public ResponseEntity<?> stageProject(@RequestBody ProjectRequest request) {
        System.out.println("project Edit: " + request.getTitle());
        User auth_user = userRepository.findByUsername(jwtService.extractUserName(request.getToken())).get();
        if(auth_user.getRole() == Role.CITIZEN){
            return ResponseEntity.status(403).build();
        }
        Project project = projectService.stageProject(request);
        projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.OK)
              .body(HttpStatus.OK)
              ;
    }

      @GetMapping ("/project/all/{progress}")
    public List<ProjectResponse> fetchAllProducts(@PathVariable String progress ) {
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


    @Transactional
    @PostMapping("/project/progress/list")
    public ResponseEntity<Set<ProjectResponse>> getProjectByProgress(@RequestBody ProjectListRequest request){
        System.out.println(request.getProgress() + " : " + request.getByRole() + " : " + request.getToken());
        System.out.println("test 0");
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
