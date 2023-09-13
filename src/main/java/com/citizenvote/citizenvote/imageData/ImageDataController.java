package com.citizenvote.citizenvote.imageData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth/auth")
public class ImageDataController {

    @Autowired
    private ImageDataService service;

    @Autowired
    ImageDataRepository imageDataRepository;

    @GetMapping("/id/{id}")
    public Optional<ImageData> findById(@PathVariable("id") Long id) {
        return imageDataRepository.findById(id);
    }

    @GetMapping("/image/{fileName}")
    public ResponseEntity<?> fetchImage(@PathVariable("fileName") String fileName){
        byte[] imageData = service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
