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

    private int requiredVotes;
    private int amountVotes;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Category category;




}
