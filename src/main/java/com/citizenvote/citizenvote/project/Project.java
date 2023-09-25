package com.citizenvote.citizenvote.project;


import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @JsonIgnore
    @ManyToOne
    @JoinColumn( name= "user_id")
    private User user;

    private String title;

    private String description;

    @OneToMany(mappedBy = "project",fetch = FetchType.EAGER)
    @Nullable
    private List<ProjectImageData> ProjectImageData;

    @Nullable
    private Integer requiredVotes;

    @Nullable
    private Integer amountVotes;
    @Nullable
    private LocalDate startDate;

    @Nullable
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private ProjectProgress progress;

    @Nullable
    @Enumerated(EnumType.STRING)
    private ProjectCategory category;


}
