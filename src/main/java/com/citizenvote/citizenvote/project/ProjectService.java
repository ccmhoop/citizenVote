package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ImageDataRepository;
import com.citizenvote.citizenvote.imageData.ProjectImageData;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ImageDataRepository imageDataRepository;


    public ProjectResponse projectInfoPackage(Long projectId) {
        ArrayList<String> imgLink = new ArrayList<>();

        for (ProjectImageData pro : projectRepository.findById(projectId).get().getProjectImageData()) {
            imgLink.add(pro.getUrl());
        }
        return ProjectResponse.builder()
                .id(projectId.toString())
                .title(projectRepository.findById(projectId).get().getTitle())
                .category(projectRepository.findById(projectId).get().getCategory())
                .description(projectRepository.findById(projectId).get().getDescription())
                .image(imgLink)
                .build();
    }

    public List<ProjectResponse> projectPackage(String progress) {
        List<ProjectResponse> response = new ArrayList<>();
        for (Project project : projectRepository.findAll()) {
            if (project.getProgress().equals(progress)) {
                response.add(ProjectResponse.builder()
                        .id(project.getId().toString())
                        .title(project.getTitle())
                        .description(project.getDescription())
                        .labelImage(projectRepository.findById(project.getId()).get().getProjectImageData().get(0).getUrl())
                        .requiredVotes(project.getRequiredVotes())
                        .amountVotes(project.getAmountVotes())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .progress(project.getProgress())
                        .category(project.getCategory())
                        .category(project.getCategory())

                        .build());
            }
        }
        return response;
    }


    public Set<ProjectResponse> getProjectByProgress(String progress) {

        Set<ProjectResponse> response = new HashSet<>();
        List<Project> projects = new ArrayList<>();

        if(progress.equals("ALL")){
            projects = projectRepository.findAll();
        }
        else{
            projects = projectRepository.findByProgress(ProjectProgress.valueOf(progress));
        }

        for (Project project : projects){
            response.add(ProjectResponse.builder()
                    .id(project.getId().toString())
                    .title(project.getTitle())
                    .labelImage(projectRepository.findById(project.getId()).get().getProjectImageData().get(0).getUrl())
                    .requiredVotes(project.getRequiredVotes())
                    .amountVotes(project.getAmountVotes())
                    .build());
        }
        return response;
    }
}


