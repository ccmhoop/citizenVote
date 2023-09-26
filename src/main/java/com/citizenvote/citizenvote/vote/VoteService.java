package com.citizenvote.citizenvote.vote;

import com.citizenvote.citizenvote.project.Project;
import com.citizenvote.citizenvote.project.ProjectRepository;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class VoteService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final VoteRepository voteRepository;

    public void onVoting(OnVoteRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).get();
        Project project = projectRepository.findById(request.getProjectId()).get();
        System.out.println("Test 1");
        Optional<Vote> repos_vote = voteRepository.findByUserAndProject(user,project);
        Vote vote;
        if(repos_vote.isPresent()){
            System.out.println("Test 2a");
            vote = repos_vote.get();
            //not really that hard of a deal, just needed a quick way to change the vote values
            //of the already existing votes in the Project and User Objects
            user.getVotes().forEach(vote1 -> {
                if(Objects.equals(vote1.getProject().getId(), project.getId())){
                    vote1.setVoteType(VoteType.valueOf(request.getVoteType()));
                }
            });
            project.getVotes().forEach(vote1 -> {
                if(Objects.equals(vote1.getUser().getId(), user.getId())){
                    vote1.setVoteType(VoteType.valueOf(request.getVoteType()));
                }
            });
            voteRepository.save(vote);
        }
        else{
            System.out.println("Test 2b");
            vote = Vote.builder()
                    .project(project)
                    .user(user)
                    .voteType(VoteType.valueOf(request.getVoteType()))
                    .build();

            List<Vote> votes_u = user.getVotes();
            List<Vote> votes_p = project.getVotes();
            votes_u.add(vote);
            votes_p.add(vote);
            voteRepository.save(vote);
        }
        System.out.println("Test 3");
        userRepository.save(user);
        projectRepository.save(project);

    }

}
