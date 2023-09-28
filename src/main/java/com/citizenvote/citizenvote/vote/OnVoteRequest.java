package com.citizenvote.citizenvote.vote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class OnVoteRequest {
    private String token;
    private Long projectId;
    private String voteType;
}
