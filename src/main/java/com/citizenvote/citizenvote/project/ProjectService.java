package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.config.JwtService;
import com.citizenvote.citizenvote.imageData.ImageDataRepository;
import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.Role;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.user.UserResponse;
import com.citizenvote.citizenvote.vote.Vote;
import com.citizenvote.citizenvote.vote.VoteType;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ImageDataRepository imageDataRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;


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

    public Set<ProjectResponse> getProjectByProgress(ProjectListRequest request, UserResponse user) {
        Set<ProjectResponse> response = new HashSet<>();
        List<Project> projects = new ArrayList<>();
        System.out.println("test 1");
        if(request.getProgress().equals("ALL")){
            projects = projectRepository.findAll();
        }
        else{
            projects = projectRepository.findByProgress(ProjectProgress.valueOf(request.getProgress()));
        }
            System.out.println("test 2");
            if(!request.getByRole().equals("ALL")){
                projects = filterProjectsByRole(Role.valueOf(request.getByRole()), projects);
            }
            System.out.println("test 3");
            projects = filterProjectByForAuthority(user, projects);

        for (Project project : projects){
            int yesVotes = project.getAmountVotes() + project.getVotes().stream()
                    .filter(vote -> vote.getVoteType() == VoteType.YES).toList().size();

            int noVotes = project.getVotes().stream()
                    .filter(vote -> vote.getVoteType() == VoteType.NO).toList().size();
            System.out.println("test 4");
            response.add(ProjectResponse.builder()
                    .id(project.getId().toString())
                    .title(project.getTitle())
                    .labelImage(projectRepository.findById(project.getId()).get().getProjectImageData().get(0).getUrl())
                    .requiredVotes(project.getRequiredVotes())
                    .progress(project.getProgress())
                    .yesVotes(yesVotes)
                    .noVotes(noVotes)
                    .amountVotes(project.getAmountVotes() + project.getVotes().size())
                    .build());
        }
        return response;
    }

    /**
     * this function is used to filter the role of the proposer
     * */
    public List<Project> filterProjectsByRole(Role role, List<Project> projects){
        List<Project> filteredProjects = new ArrayList<>();

        projects.forEach(project -> {
            if(project.getUser().getRole() == role){
                filteredProjects.add(project);
            }
        });
        return filteredProjects;
    }

    /**
     * this function is used to filter what users may get by their authority level
     * */
    public List<Project> filterProjectByForAuthority(UserResponse user, List<Project> projects) {

        List<Project> filteredProjects = new ArrayList<>();

        projects.forEach(project -> {
            if(project.getProgress() == ProjectProgress.ACCEPTED){
                filteredProjects.add(project);
            }
            else if(user.getRole() == Role.MANICIPALITY || user.getRole() == Role.ADMIN){
                filteredProjects.add(project);
            } else if (Objects.equals(user.getId(), project.getUser().getId())) {
                filteredProjects.add(project);
            }
        });

        return filteredProjects;
    }

    public Project requestToProject(ProjectRequest request){
        User user = userRepository.findByUsername(jwtService.extractUserName(request.getToken())).get();

        return Project.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .ProjectImageData(request.getProjectImageData())
                .requiredVotes(request.getRequiredVotes())
                .amountVotes(request.getAmountVotes())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .progress(request.getProgress())
                .category(request.getCategory())
                .build();
    }

    public ProjectResponse getProjectOverviewDetails(Long projectID, String token){
        Project project = projectRepository.findById(projectID).get();
        VoteType voteType = VoteType.NONE;
        List<Vote> l1 = project.getVotes();
        if(!l1.isEmpty()){
            List<Vote> l = project.getVotes().stream().filter(vote -> vote.getUser().getUsername().equals(jwtService.extractUserName(token))).toList();
            if(!l.isEmpty()){
                voteType = l.get(0).getVoteType();
            }
        }

        return ProjectResponse.builder()
                .id(project.getId().toString())
                .title(project.getTitle())
                .description(project.getDescription())
                .category(project.getCategory())
                .requiredVotes(project.getRequiredVotes())
                .amountVotes(project.getAmountVotes() + project.getVotes().size())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .voteType(voteType)
                .userResponse(UserResponse.builder()
                        .id(project.getUser().getId())
                        .username(project.getUser().getUsername())
                        .build())
                .progress(project.getProgress())
                .labelImage(projectRepository.findById(project.getId()).get().getProjectImageData().get(0).getUrl())
                .build();
    }

    public Project stageProject(ProjectRequest request){
        User user = userRepository.findByUsername(request.getUser().getUsername()).get();
        Project project = projectRepository.findById(request.getId()).get();
        ProjectProgress newProgress = ProjectProgress.valueOf(request.getNewProgress());

        System.out.println("name: " + project.getTitle());
        System.out.println("new Progress: " + newProgress);
        System.out.println("old Progress: " + project.getProgress());

        if(project.getProgress() == ProjectProgress.SUGGESTED){
            if(newProgress == ProjectProgress.ACCEPTED){
                project.setProgress(ProjectProgress.ACCEPTED);
                user.setPoints(user.getPoints() + 20);
                userRepository.save(user);
            }
            if(newProgress == ProjectProgress.DECLINED){
                project.setProgress(ProjectProgress.DECLINED);
            }
        }
        if(project.getProgress() == ProjectProgress.PASSED){
            if(newProgress == ProjectProgress.APPROVED){
                project.setProgress(ProjectProgress.APPROVED);
            }
            if(newProgress == ProjectProgress.DISCARDED){
                project.setProgress(ProjectProgress.DISCARDED);
            }
        }

        return project;
    }


}


