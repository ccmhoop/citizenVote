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
@RequestMapping("/api/v1/vote")
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/yes")
    private ResponseEntity<String> onVoting(@RequestBody OnVoteRequest request){
//        try {
            voteService.onVoting(request);
            return ResponseEntity.ok("Voted");
//        }
//        catch (Exception e){
//            return ResponseEntity.ok("Error, not voted");
//        }
    }

    @PostMapping("/decline")
    private ResponseEntity<String> onVoteDeclining(@RequestBody OnVoteRequest request){
        try {
            voteService.onVoteDeclining(request);
            return ResponseEntity.ok("Vote Removed");
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}
