package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Component
@RequiredArgsConstructor
public class ProductSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ImageDataService service;

    @Override
    public void run(String... args) throws Exception {
        seedProcuts();
    }

    private void seedProcuts() throws IOException {

        if (productRepository.count() == 0) {
            MultipartFile[] image;

            Product rug = Product.builder()
                    .name("Play Rug")
                    .description("rug ru ")
                    .points("20")
                    .category("testSeeder")
                    .build();
            image = new MultipartFile[]{
                    service.seedImage("src\\main\\resources\\shopImages\\playRug\\amersfoortRoadRug.jpg")
            };
            productRepository.save(rug);
            service.uploadImage(image, rug, "product");

            Product shirt = Product.builder()
                    .name("Amersfoort Shirt")
                    .description("Represent your hood with this fancy white T")
                    .points("15")
                    .category("shirt")
                    .build();
            image = new MultipartFile[]{
                    service.seedImage("src\\main\\resources\\shopImages\\t-shirt\\shirt.png"),
                    service.seedImage("src\\main\\resources\\shopImages\\t-shirt\\shirtMan.png"),
                    service.seedImage("src\\main\\resources\\shopImages\\t-shirt\\shirtWoman.png"),
            };
            productRepository.save(shirt);
            service.uploadImage(image, shirt, "product");
        }
    }

}
