package com.citizenvote.citizenvote.projects;

import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn( name= "user_id")
    private User user;
    private String title;
//    @Lob gebruiken om een grotere hoeveelheid tekst er in te zetten, maar moet dan ook weer uitgepakt worden
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
