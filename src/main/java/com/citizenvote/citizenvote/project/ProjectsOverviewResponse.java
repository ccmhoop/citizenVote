package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ProjectImageData;
import lombok.*;


@Builder
public class ProjectsOverviewResponse {

    private Long id;
    private String title;
    private Integer requiredVotes;
    private Integer amountVotes;
    private ProjectImageData image;
}
