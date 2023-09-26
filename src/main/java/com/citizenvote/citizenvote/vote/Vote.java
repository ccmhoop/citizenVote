package com.citizenvote.citizenvote.vote;

import com.citizenvote.citizenvote.project.Project;
import com.citizenvote.citizenvote.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JsonBackReference(value = "user")
    private User user;
    @ManyToOne
    @JsonBackReference(value = "project")
    private Project project;
    @Enumerated(EnumType.STRING)
    private VoteType voteType;

}
