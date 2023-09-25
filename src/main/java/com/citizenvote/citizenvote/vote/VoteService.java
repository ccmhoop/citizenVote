package com.citizenvote.citizenvote.vote;

import com.citizenvote.citizenvote.project.Project;
import com.citizenvote.citizenvote.project.ProjectRepository;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Vote vote = Vote.builder()
                .project(project)
                .user(user)
                .build();
        List<Vote> votes_u = user.getVotes();
        List<Vote> votes_p = project.getVotes();
        votes_u.add(vote);
        votes_p.add(vote);

        user.setVotes(votes_u);
        project.setVotes(votes_p);

        voteRepository.save(vote);
        userRepository.save(user);
        projectRepository.save(project);



    }

    public void onVoteDeclining(OnVoteRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).get();
        Project project = projectRepository.findById(request.getProjectId()).get();

        List<Vote> votes_u = user.getVotes();
        List<Vote> votes_p = project.getVotes();
        Vote vote0 = votes_u.stream().filter(vote -> vote.getUser().getUsername().equals(request.getUsername()) && vote.getProject().getId() == request.getProjectId()).findFirst().get();
        votes_u.removeIf(vote -> vote.getUser().getUsername().equals(request.getUsername()) && vote.getProject().getId() == request.getProjectId());
        votes_p.removeIf(vote -> vote.getUser().getUsername().equals(request.getUsername()) && vote.getProject().getId() == request.getProjectId());

        user.setVotes(votes_u);
        project.setVotes(votes_p);

        userRepository.save(user);
        projectRepository.save(project);
        voteRepository.delete(vote0);

    }
}
