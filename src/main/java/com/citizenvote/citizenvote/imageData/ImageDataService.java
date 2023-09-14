package com.citizenvote.citizenvote.imageData;

import com.citizenvote.citizenvote.product.Product;
import com.citizenvote.citizenvote.project.Project;
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


    public String uploadImage(MultipartFile[] files, Object object) throws IOException {
        Long objectId = object instanceof Product ? ((Product) object).getId() : ((Project) object).getId();
        for (MultipartFile image : files) {
            ImageData imageData = object instanceof Project ? new ProjectImageData() : new ProductImageData();
            imageData.setName(image.getOriginalFilename());
            imageData.setType(image.getContentType());
            imageData.setImageData(ImageDataUtils.compressImage(image.getBytes()));
            imageData.setUrl("http://localhost:8080/api/v1/auth/auth/image/" + objectId);
            imageData.setLink(object);
            imageDataRepository.save(imageData);
        }
        return "Saved";
    }
        @Transactional
        public byte[] downloadImage (String fileName){
            Optional<ImageData> dbImageData = imageDataRepository.findById(Long.parseLong(fileName));
            return ImageDataUtils.decompressImage(dbImageData.get().getImageData());
        }
    }

