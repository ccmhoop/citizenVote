package com.citizenvote.citizenvote.project;


import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Nullable
@Builder
public class ProjectResponse {

    private String id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private User user;

    private String title;
    private String description;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String labelImage;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ArrayList<String> image;

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
