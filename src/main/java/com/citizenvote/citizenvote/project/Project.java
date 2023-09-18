package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "projects")

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter
    @JsonIgnore
    @ManyToOne
    @JoinColumn( name= "user_id")
    private User user;
    private String title;

       @OneToMany(mappedBy = "project",fetch = FetchType.EAGER)
    private List<ProjectImageData> project;
//    @Lob gebruiken om een grotere hoeveelheid tekst er in te zetten, maar moet dan ook weer uitgepakt worden
    private String description;
    private Integer requiredVotes;
    private Integer amountVotes;
    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private ProjectProgress progress;

    @Enumerated(EnumType.STRING)
    private ProjectCategory category;


}
