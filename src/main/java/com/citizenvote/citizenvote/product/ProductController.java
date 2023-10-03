package com.citizenvote.citizenvote.product;

import com.citizenvote.citizenvote.imageData.ImageDataService;
import com.citizenvote.citizenvote.orderDetails.OrderDetailsResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

//Needs to be rerouted through security
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

    @PostMapping ("/product/cart/cart")
    public List<ProductResponse> fetchShoppingCart(@RequestBody OrderDetailsResponse[] cart){
        return productService.shoppingCartResponse(cart);
    }

    @PostMapping ("/product/delete/item")
    @Transactional
    public HttpStatus safeDeleteItem(@RequestBody ProductResponse item){
        var product = productRepository.getById(item.getId());
        product.setSoftDelete(item.getSoftDelete());
        productRepository.save(product);
        if(productRepository.getById(item.getId()).getSoftDelete() == item.getSoftDelete()){
            return HttpStatus.OK;
        }
        return HttpStatus.CONFLICT;
    }
    @GetMapping ("/product/management")
    public List<ProductResponse> productManagementPackage() {
        return productService.manageShopPackage();
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
