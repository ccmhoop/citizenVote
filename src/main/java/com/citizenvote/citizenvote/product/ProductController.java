package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth/auth")
public class ProductController {

    @Autowired
    private ImageDataService service;

    @Autowired
    private ProductService productService;

    @Autowired
    ProductRepository productRepository;

    @PostMapping(value = "/product/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postProduct(@RequestPart("product") Product product, @RequestPart("image") MultipartFile[] file) throws IOException {
        productRepository.save(product);
        String status = service.uploadImage(file,product,"product");
        return ResponseEntity.status(HttpStatus.OK)
                .body(status);
    }

    @GetMapping ("/product/{id}")
    public ResponseEntity<ProductResponse> fetchProductInfo(@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(productService.productInfoPackage(id));
    }

    @GetMapping ("/shop/all")
    public List<ProductResponse> fetchAllProducts() {
        return productService.productPackage();
    }


    @GetMapping("/{id}")
    public Optional<Product> findById(@PathVariable("id") Long id) {
        return productRepository.findById(id);
    }

}
