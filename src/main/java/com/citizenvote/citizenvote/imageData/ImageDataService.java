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

    /*
     * UploadImage is being developed to create a full data package.
     * Need to be tested to work properly with table relations
     */


    public String uploadImage(MultipartFile file,Product product) throws IOException {
        //being tested
        productRepository.save(product);

        ImageData imageData = imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .product(product)
                .imageData(ImageDataUtils.compressImage(file.getBytes()))
                .build());

        if (imageData != null){
            return "file uploaded successfully : " +  file.getOriginalFilename();
        }
        return null;
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
