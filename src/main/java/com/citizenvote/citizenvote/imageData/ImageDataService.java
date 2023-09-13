package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import com.citizenvote.citizenvote.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageDataService {

    @Autowired
    private ImageDataRepository imageDataRepository;

    @Autowired
    private ProductRepository productRepository;

    public String uploadImage(MultipartFile[] file,Product product) throws IOException {
        if (file != null && product != null) {
            if (product.getId() == null) {
                productRepository.save(product);
            }
            for (MultipartFile image : file) {
                imageDataRepository.save(ImageData.builder()
                        .name(image.getOriginalFilename())
                        .type(image.getContentType())
                        .product(product)
                        .imageData(ImageDataUtils.compressImage(image.getBytes()))
                        .build());
            }
            return "file uploaded successfully";
        }
        return "uploaded failed";
    }

    @Transactional
    public byte[] downloadImage(String fileName) {
        Optional<ImageData> dbImageData;
        if(fileName.matches("^[0-9]*$")){
            dbImageData = imageDataRepository.findById(Long.parseLong(fileName));
        }else{
            dbImageData = imageDataRepository.findByName(fileName);
        }
        return ImageDataUtils.decompressImage(dbImageData.get().getImageData());
    }
}
