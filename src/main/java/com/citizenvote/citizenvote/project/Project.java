package com.citizenvote.citizenvote.project;


import com.citizenvote.citizenvote.imageData.ProjectImageData;
import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micrometer.common.lang.Nullable;
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
    @Nullable
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Nullable
    @Getter
    @JsonIgnore
    @ManyToOne
    @JoinColumn( name= "user_id")
    private User user;


    private String title;


    private String description;

    @Nullable
    @OneToMany(mappedBy = "project",fetch = FetchType.EAGER)
    private List<ProjectImageData> ProjectImageData;

    @Nullable
    private Integer requiredVotes;

    @Nullable
    private Integer amountVotes;

    @Nullable
    private LocalDate startDate;

    @Nullable
    private LocalDate endDate;

    @Nullable
    @Enumerated(EnumType.STRING)
    private ProjectProgress progress;

    @Nullable
    @Enumerated(EnumType.STRING)
    private ProjectCategory category;


}
