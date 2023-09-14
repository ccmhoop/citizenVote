package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ProductImageData extends ImageData {

    @JsonIgnore
    @ManyToOne
    private Product product;

    @Override
    void setLink(Object object) {
        product = (Product) object;
    }

}
