package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ProductImageData;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String category;

    private String points;

    private Boolean softDelete;

    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER)
    private List<ProductImageData> ProductImageData;

}
