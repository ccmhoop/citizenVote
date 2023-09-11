package com.citizenvote.citizenvote.projects;

import com.citizenvote.citizenvote.user.Role;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    // user_id, hoe moet dit, want dit komt van de user...
    private String description;
    // project image, needs to be added but have to figure it out
    @Enumerated(EnumType.STRING)
    private Progress progress;
    // enum  progress, needs to be added but have to figure it out
    private int requiredVotes;
    private int amountVotes;

    private LocalDate startDate;
    private LocalDate endDate;

    // enum category, needs to be added but have to figure it out



}
