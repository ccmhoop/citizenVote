package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.vote.Vote;
import com.citizenvote.citizenvote.vote.VoteType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectScheduler {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Scheduled(fixedRate = 1000*30)
    public void ScheduleProjectProgress(){
        System.out.println("Scheduling: " + LocalDate.now());
        List<Project> projects = projectRepository.findAll();
        if(projects.isEmpty()){
            System.out.println("projects is empty");
        }
        else{
            System.out.println();
        }

        projects.forEach( project -> {
            System.out.println(project.getEndDate() + " : " + LocalDate.now());

            //tiny addup to the seeder if projects have no user ->
            if(project.getUser() == null){
                Optional<User> o_user_c = userRepository.findByUsername("gordijnmans77");
                Optional<User> o_user_m = userRepository.findByUsername("willem.wasknijper");
                if(o_user_c.isPresent() && o_user_m.isPresent()){
                    if(project.getProgress() == ProjectProgress.SUGGESTED){
                        project.setUser(o_user_c.get());
                    }
                    else {
                        project.setUser(new Random().nextInt(2) == 1 ? o_user_m.get() : o_user_c.get());
                    }
                }
            }

            if(project.getEndDate().isBefore(LocalDate.now()) && project.getProgress() == ProjectProgress.ACCEPTED) {

                int yes = project.getAmountVotes() != null ? project.getAmountVotes() : 0;
                int no = 0;
                int all = project.getAmountVotes() != null ? project.getAmountVotes() : 0;
                for (Vote vote : project.getVotes()) {
                    if (vote.getVoteType() == VoteType.YES) yes++;
                    if (vote.getVoteType() == VoteType.NO) no++;
                    all++;
                }
                if (project.getRequiredVotes() != null && all >= project.getRequiredVotes() && yes > no) {
                    project.setProgress(ProjectProgress.PASSED);
                    System.out.println("Project: " + project.getTitle() + " set to Passed");
                } else {
                    project.setProgress(ProjectProgress.FAILED);
                    System.out.println("Project: " + project.getTitle() + " set to failed");
                }
            }
        });
        }

    }


