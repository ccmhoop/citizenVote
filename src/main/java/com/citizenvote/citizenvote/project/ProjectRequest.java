package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.vote.Vote;
import com.citizenvote.citizenvote.vote.VoteType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {

    private Long id;
    private String token;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String newProgress;


    @JsonInclude(JsonInclude.Include.NON_NULL)
    private User user;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String title;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<com.citizenvote.citizenvote.imageData.ProjectImageData> ProjectImageData;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Vote> Votes;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer requiredVotes;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer amountVotes;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDate startDate;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDate endDate;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ProjectProgress progress;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ProjectCategory category;

}

