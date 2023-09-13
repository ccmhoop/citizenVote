package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ImageData")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;

    //Testing Category with enums if needed
    @Enumerated(EnumType.STRING)
    private ImageDataCategory category;

    @Lob
    @Column(name = "imageData")
    private byte[] imageData;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
