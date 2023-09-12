package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ImageDataService service;
    @Autowired
    ProductRepository productRepository;

    @PostMapping(value = "/product/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProduct(@RequestPart("product") Product request, @RequestPart("image") MultipartFile file) throws IOException {
        String dto = service.uploadImage(file,request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(dto);
    }


//    @GetMapping("/{id}")
//    public Optional<Product> findById(@PathVariable("id") Long id) {
//        downloadImage()
////        service.downloadImage(id.toString());
//        return productRepository.findById(id);
//    }

    @GetMapping("/{id}")
    public Optional<Product> findById(@PathVariable("id") Long id) {
        var product =  productRepository.findById(id);
        downloadImage(product.get().getImageData().get(0).getId().toString());
//        service.downloadImage(id.toString());
        return productRepository.findById(id);
    }

    public ResponseEntity<?> downloadImage(String fileName){
        byte[] imageData = service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }


}
