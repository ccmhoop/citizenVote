package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageData;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    @GeneratedValue
    Long id;

    String productName;

    @OneToMany(mappedBy = "product")
    private List<ImageData> imageData;



}
