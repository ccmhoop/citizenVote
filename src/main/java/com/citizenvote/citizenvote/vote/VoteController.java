package com.citizenvote.citizenvote.vote;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1")
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/vote")
    private ResponseEntity<String> onVoting(@RequestBody OnVoteRequest request){
            System.out.println("test");
            voteService.onVoting(request);
            return ResponseEntity.ok("Voted");

    }


}
