package com.citizenvote.citizenvote.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {

    @GeneratedValue
    Long id;
    String productName;


}
