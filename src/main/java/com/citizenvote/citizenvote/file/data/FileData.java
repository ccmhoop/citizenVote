package com.citizenvote.citizenvote.file.data;

import jakarta.persistence.*;

public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;
    private String type;

    @Lob
    @Column(name = "imageData")
    private byte[] imageData;

}
