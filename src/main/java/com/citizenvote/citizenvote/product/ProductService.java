package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageDataRepository;
import com.citizenvote.citizenvote.imageData.ProductImageData;
import com.citizenvote.citizenvote.orderDetails.OrderDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageDataRepository imageDataRepository;


    public ProductResponse productInfoPackage(Long productId) {
        ArrayList<String> imgLink = new ArrayList<>();

        for (ProductImageData pro : productRepository.findById(productId).get().getProductImageData()) {
            imgLink.add(pro.getUrl());
        }
        return ProductResponse.builder()
                .id(productId)
                .name(productRepository.findById(productId).get().getName())
                .category(productRepository.findById(productId).get().getCategory())
                .points(productRepository.findById(productId).get().getPoints())
                .description(productRepository.findById(productId).get().getDescription())
                .image(imgLink)
                .build();
    }

    public List<ProductResponse> removeProductPackage(Boolean edit) {
        List<ProductResponse> response = new ArrayList<>();
        for (Product pro : productRepository.findAll()) {
                response.add(ProductResponse.builder()
                        .id(pro.getId())
                        .description(pro.getDescription())
                        .labelImage(productRepository.findById(pro.getId()).get().getProductImageData().get(0).getUrl())
                        .points(pro.getPoints())
                        .name(pro.getName())
                        .softDelete(pro.getSoftDelete())
                        .build());
        }
        return response;
    }

    public List<ProductResponse> productPackage() {
        List<ProductResponse> response = new ArrayList<>();
        for (Product pro : productRepository.findAll()) {
            if (!pro.getSoftDelete()) {
                response.add(ProductResponse.builder()
                        .id(pro.getId())
                        .description(pro.getDescription())
                        .labelImage(productRepository.findById(pro.getId()).get().getProductImageData().get(0).getUrl())
                        .points(pro.getPoints())
                        .category(pro.getCategory())
                        .name(pro.getName())
                        .build());
            }
        }
        return response;
    }

    public List<ProductResponse> shoppingCartResponse(OrderDetailsResponse[] cart) {
        List<ProductResponse> response = new ArrayList<>();
        for (OrderDetailsResponse items : cart) {
            Optional<Product> pro = productRepository.findById(items.getId());
            response.add(ProductResponse.builder()
                    .id(pro.get().getId())
                    .labelImage(pro.get().getProductImageData().get(0).getUrl())
                    .name(pro.get().getName())
                    .points(pro.get().getPoints())
                    .build());
        }
        return response;
    }
}
