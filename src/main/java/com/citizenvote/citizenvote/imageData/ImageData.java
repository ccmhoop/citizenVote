package com.citizenvote.citizenvote.imageData;

import jakarta.persistence.*;
import lombok.*;

@Entity
//@Table(name = "ImageData")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class ImageData {

    @Id
    @GeneratedValue()
    private Long id;

    private String name;

    private String type;

    private String url;

    @Lob
    @Column(name = "imageData")
    private byte[] imageData;

    abstract void setLink (Object object);

}
