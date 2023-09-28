package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.vote.Vote;
import com.citizenvote.citizenvote.vote.VoteType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectScheduler {

    private final ProjectRepository projectRepository;

    @Scheduled(fixedRate = 1000*60)
    public void ScheduleProjectProgress(){
        System.out.println("Scheduling: " + LocalDate.now());
        List<Project> projects = projectRepository.findByProgress(ProjectProgress.ACCEPTED);
        projects.forEach( project -> {
            if(project.getEndDate().isBefore(LocalDate.now())) {
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


