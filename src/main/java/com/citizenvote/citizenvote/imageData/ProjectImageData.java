package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.project.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ProjectImageData extends ImageData {

    @JsonIgnore
    @ManyToOne
    private Project project;

    @Override
    void setLink(Object object) {
        project = (Project) object;
    }

}
