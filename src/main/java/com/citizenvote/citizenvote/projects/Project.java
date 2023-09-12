package com.citizenvote.citizenvote.projects;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "project")

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    // @manytomany user_id, hoe moet dit, want dit komt van de user...
    private String description;
    // project image, needs to be added but have to figure it out
    private Integer requiredVotes;
    private Integer amountVotes;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private ProjectProgress progress;
    @Enumerated(EnumType.STRING)
    private ProjectCategory category;




}
