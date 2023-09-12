package com.citizenvote.citizenvote.projects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/api/v1/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public ProjectDTO postProject(@RequestBody ProjectDTO project) {
        return QuestionDTO.Mapper.toDto(questionRepository.save(question));
    }

    @GetMapping("{id}")
    public Optional<QuestionDTO> getById(@PathVariable("id") long id) {
        return questionRepository.findById(id).map(QuestionDTO.Mapper::toDto);
    }

    @GetMapping
    public List<QuestionDTO> getItems() {
        return QuestionDTO.Mapper.toDto(questionRepository.findAll());
    }
}
}

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public ResponseEntity<Project> createRecipe(@RequestBody Project project) {
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
}