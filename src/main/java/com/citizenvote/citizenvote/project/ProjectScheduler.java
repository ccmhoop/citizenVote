package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import com.citizenvote.citizenvote.vote.Vote;
import com.citizenvote.citizenvote.vote.VoteRepository;
import com.citizenvote.citizenvote.vote.VoteType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectScheduler {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    @Scheduled(fixedRate = 1000*30)
    public void ScheduleProjectProgress(){
        System.out.println("Scheduling: " + LocalDate.now());

        List<Project> projects = projectRepository.findAll();
        if(projects.isEmpty()){
            System.out.println("projects is empty");
        }
        else{
            addRandomVotes();
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

        public void addRandomVotes(){
            Iterable<User> IterUsers = userRepository.findAll();
            List<Project> projects = projectRepository.findAll();
            List<User> users = new ArrayList<>();
            Random r = new Random();
            IterUsers.forEach(user -> {
                if(user.getLastname().equals("autouser")){
                    users.add(user);
                }
            });
            for (int i = 0; i < r.nextInt(7) + 4; i++) {
                if(!users.isEmpty() && !projects.isEmpty()){
                    User user = users.get(r.nextInt(users.size()));
                    Project p = projects.get(r.nextInt(projects.size()));

                    long count = user.getVotes().stream().filter(vote -> Objects.equals(vote.getProject().getId(), p.getId())).count();
                    if(count == 0 && p.getProgress() == ProjectProgress.ACCEPTED){
                        Vote vote = Vote.builder()
                                .voteType(r.nextInt(2) == 0 ? VoteType.NO : VoteType.YES)
                                .project(p)
                                .user(user)
                                .build();
                        List<Vote> uVotes = user.getVotes();
                        List<Vote> pVotes = p.getVotes();
                        uVotes.add(vote);
                        pVotes.add(vote);
                        user.setVotes(uVotes);
                        p.setVotes(pVotes);
                        System.out.println("Vote added to " + p.getTitle() + " by " + user.getUsername());
                        voteRepository.save(vote);

                        userRepository.save(user);
                        projectRepository.save(p);
                }

               }
            }

        }

    }


