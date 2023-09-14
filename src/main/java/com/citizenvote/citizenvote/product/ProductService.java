package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ProductImageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductService{

    @Autowired
    private ProductRepository productRepository;

    public ProductResponse productPackage(Long productId){
        ArrayList<String> imgLink = new ArrayList<>();
        var product = Product.builder()
                .id(productId)
                .productName(productRepository.findById(productId).get().getProductName())
                .ProductImageData(productRepository.findById(productId).get().getProductImageData())
                .build();
        for(ProductImageData pro : product.getProductImageData()){
          imgLink.add("http://localhost:8080/api/v1/auth/auth/image/"+pro.getId());
        }
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getProductName())
                .image(imgLink)
                .build();
    }
}
