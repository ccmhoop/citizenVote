package com.citizenvote.citizenvote.project;

import com.citizenvote.citizenvote.imageData.ProductImageData;
import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.User;
import com.citizenvote.citizenvote.vote.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String description;

    @OneToMany(mappedBy = "project",fetch = FetchType.EAGER)
    private List<ProjectImageData> ProjectImageData;

    @OneToMany(mappedBy = "project")
    @JsonManagedReference
    private List<Vote> votes;

    private Integer requiredVotes;
    private Integer amountVotes;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private ProjectProgress progress;

    @Enumerated(EnumType.STRING)
    private ProjectCategory category;


}
