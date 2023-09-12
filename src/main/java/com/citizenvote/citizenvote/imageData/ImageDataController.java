package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import jdk.jfr.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageDataController {

    @Autowired
    private ImageDataService service;

    @Autowired
    ImageDataRepository imageDataRepository;


//    @PostMapping(value = "/product/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity<?> projectTemplate(@RequestPart("product") Product request,@RequestPart("image") MultipartFile file) throws IOException {
//        String uploadImage = service.uploadImage(file,request);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(uploadImage);
//    }

    //Store image in database
//    @PostMapping
//    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
//        String uploadImage = service.uploadImage(file);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(uploadImage);
//    }

    //Json fetch
    @GetMapping("/id/{id}")
    public Optional<ImageData> findById(@PathVariable("id") Long id) {
        return imageDataRepository.findById(id);
    }

    //Visual Image
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData = service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
